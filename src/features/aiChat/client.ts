import type { AiChatRequestPayload, AiChatStreamEvent } from "./types";

type StreamHandlers = {
  onStart?: () => void;
  onDelta: (content: string) => void;
  onDone?: (content?: string) => void;
  onError?: (message: string) => void;
};

type RawSseEvent = {
  type?: string;
  text?: string;
  content?: string;
  message?: string;
};

function normalizeEvent(rawEvent: RawSseEvent): AiChatStreamEvent | null {
  const eventType = rawEvent.type;
  const eventText = rawEvent.text ?? rawEvent.content ?? "";

  if (eventType === "connection") {
    return { type: "start", content: rawEvent.message ?? eventText };
  }

  if (eventType === "delta") {
    if (!eventText) {
      return null;
    }

    return { type: "delta", content: eventText };
  }

  if (eventType === "complete" || eventType === "done") {
    return { type: "done", content: eventText };
  }

  if (eventType === "error") {
    return { type: "error", message: rawEvent.message ?? eventText ?? "Unknown SSE error." };
  }

  return null;
}

function parseSseFrame(frame: string) {
  const dataLines = frame
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line) => line.startsWith("data: "))
    .map((line) => line.slice(6));

  if (dataLines.length === 0) {
    return null;
  }

  const rawPayload = dataLines.join("\n");

  try {
    return normalizeEvent(JSON.parse(rawPayload) as RawSseEvent);
  } catch {
    return null;
  }
}

async function readSseStream(response: Response, handlers: StreamHandlers, signal?: AbortSignal) {
  if (!response.body) {
    throw new Error("The chat stream did not return a readable body.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    if (signal?.aborted) {
      reader.cancel().catch(() => undefined);
      break;
    }

    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });

    while (buffer.includes("\n\n")) {
      const separatorIndex = buffer.indexOf("\n\n");
      const frame = buffer.slice(0, separatorIndex);
      buffer = buffer.slice(separatorIndex + 2);

      const event = parseSseFrame(frame);
      if (!event) {
        continue;
      }

      if (event.type === "start") {
        handlers.onStart?.();
      } else if (event.type === "delta") {
        handlers.onDelta(event.content);
      } else if (event.type === "done") {
        handlers.onDone?.(event.content);
      } else if (event.type === "error") {
        handlers.onError?.(event.message);
      }
    }
  }
}

function resolveStreamUrl(rawUrl: string) {
  if (rawUrl.includes("/api/aiChat/stream")) {
    return rawUrl;
  }

  return `${rawUrl.replace(/\/$/, "")}/api/aiChat/stream`;
}

export async function streamAiChatReply(
  payload: AiChatRequestPayload,
  handlers: StreamHandlers,
  signal?: AbortSignal,
) {
  const configuredUrl = process.env.NEXT_PUBLIC_AI_CHAT_API_URL?.trim() ?? "";

  if (!configuredUrl) {
    throw new Error("Set NEXT_PUBLIC_AI_CHAT_API_URL to your host URL or full AI chat SSE endpoint URL.");
  }

  const streamUrl = resolveStreamUrl(configuredUrl);

  const response = await fetch(streamUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(errorBody?.message ?? "The chat stream could not be started.");
  }

  await readSseStream(response, handlers, signal);
}
