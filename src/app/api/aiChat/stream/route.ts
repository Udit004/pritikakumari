import { readFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase";

export const runtime = "nodejs";

type IncomingMessage = {
  role?: "user" | "assistant";
  content?: string;
};

type IncomingPayload = {
  message?: string;
  messages?: IncomingMessage[];
};

type GeminiSseChunk = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
    finishReason?: string;
  }>;
  promptFeedback?: {
    blockReason?: string;
  };
  error?: {
    message?: string;
  };
};

const textEncoder = new TextEncoder();
const knowledgeBasePath = path.join(process.cwd(), "GEMINI_PORTFOLIO_KNOWLEDGE.md");
let knowledgeBaseCache: string | null = null;

function toSseData(payload: unknown) {
  return textEncoder.encode(`data: ${JSON.stringify(payload)}\n\n`);
}

function buildSystemInstruction(knowledgeBase: string) {
  return [
    "You are the portfolio assistant for Pritika Kumari.",
    "Use the provided knowledge base as the primary source of truth.",
    "If website and resume facts differ, explicitly mention the mismatch instead of merging silently.",
    "Do not fabricate achievements, dates, or contact details.",
    "Keep responses concise, clear, and helpful.",
    "If the user asks something outside the knowledge base, say that the information is not available.",
    "Knowledge base starts below:",
    knowledgeBase,
  ].join("\n\n");
}

async function getKnowledgeBase() {
  if (knowledgeBaseCache) {
    return knowledgeBaseCache;
  }

  knowledgeBaseCache = await readFile(knowledgeBasePath, "utf8");
  return knowledgeBaseCache;
}

function buildGeminiContents(messages: IncomingMessage[]) {
  return messages
    .filter((message) => message.role && message.content && message.content.trim())
    .map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content!.trim() }],
    }));
}

async function* parseGeminiSse(response: Response, signal: AbortSignal) {
  if (!response.body) {
    throw new Error("Gemini stream did not provide a response body.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    if (signal.aborted) {
      await reader.cancel().catch(() => undefined);
      return;
    }

    const { done, value } = await reader.read();

    if (done) {
      return;
    }

    // Gemini may send SSE frames with CRLF separators; normalize to LF.
    buffer += decoder.decode(value, { stream: true }).replace(/\r/g, "");

    while (buffer.includes("\n\n")) {
      const separatorIndex = buffer.indexOf("\n\n");
      const frame = buffer.slice(0, separatorIndex);
      buffer = buffer.slice(separatorIndex + 2);

      const dataLines = frame
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice(5).trim());

      if (dataLines.length === 0) {
        continue;
      }

      const dataPayload = dataLines.join("\n");

      if (dataPayload === "[DONE]") {
        return;
      }

      let parsed: GeminiSseChunk;
      try {
        parsed = JSON.parse(dataPayload) as GeminiSseChunk;
      } catch {
        continue;
      }

      if (parsed.error?.message) {
        throw new Error(parsed.error.message);
      }

      if (parsed.promptFeedback?.blockReason) {
        throw new Error(`Gemini blocked the response (${parsed.promptFeedback.blockReason}).`);
      }

      const textDelta =
        parsed.candidates
          ?.flatMap((candidate) => candidate.content?.parts ?? [])
          .map((part) => part.text ?? "")
          .join("") ?? "";

      if (textDelta) {
        yield textDelta;
      }
    }
  }
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  if (!apiKey) {
    return Response.json(
      {
        message: "Gemini API key is missing. Set GEMINI_API_KEY (or GOOGLE_API_KEY) in .env.local.",
      },
      { status: 500 },
    );
  }

  let payload: IncomingPayload;
  try {
    payload = (await request.json()) as IncomingPayload;
  } catch {
    return Response.json({ message: "Invalid request body." }, { status: 400 });
  }

  const latestMessage = payload.message?.trim() ?? "";
  const incomingMessages = Array.isArray(payload.messages) ? payload.messages : [];

  if (!latestMessage) {
    return Response.json({ message: "Message is required." }, { status: 400 });
  }

  let knowledgeBase = "";
  try {
    knowledgeBase = await getKnowledgeBase();
  } catch {
    return Response.json(
      {
        message:
          "Could not load GEMINI_PORTFOLIO_KNOWLEDGE.md. Make sure the file exists in the project root.",
      },
      { status: 500 },
    );
  }

  const modelName = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
  const conversationWindow = incomingMessages.slice(-14);
  const contents = buildGeminiContents(conversationWindow);

  const geminiResponse = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelName)}:streamGenerateContent?alt=sse&key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: buildSystemInstruction(knowledgeBase) }],
        },
        contents,
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 768,
        },
      }),
      signal: request.signal,
    },
  );

  if (!geminiResponse.ok) {
    const responseText = await geminiResponse.text().catch(() => "");
    return Response.json(
      {
        message: responseText || "Gemini request failed.",
      },
      { status: 502 },
    );
  }

  const responseStream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let fullText = "";
      let emittedDelta = false;

      controller.enqueue(toSseData({ type: "connection", message: "stream-open" }));

      try {
        for await (const delta of parseGeminiSse(geminiResponse, request.signal)) {
          fullText += delta;
          emittedDelta = true;
          controller.enqueue(toSseData({ type: "delta", text: delta }));
        }

        if (!emittedDelta) {
          controller.enqueue(
            toSseData({
              type: "error",
              message:
                "No response text was returned by Gemini. Check model availability, safety filters, or API key permissions.",
            }),
          );
        }

        controller.enqueue(toSseData({ type: "complete", text: fullText }));
      } catch (error) {
        const message = error instanceof Error ? error.message : "Streaming failed.";
        controller.enqueue(toSseData({ type: "error", message }));
      } finally {
        if (fullText) {
          const { error: supabaseError } = await supabase
            .from("ai_chats")
            .insert([{ user_message: latestMessage, ai_response: fullText }]);
          if (supabaseError) {
            console.error("Supabase insert error (ai_chats):", supabaseError);
          }
        }

        controller.close();
      }
    },
  });

  return new Response(responseStream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
