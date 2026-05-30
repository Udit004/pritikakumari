"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { streamAiChatReply } from "./client";
import type { AiChatMessage } from "./types";

function createMessage(role: AiChatMessage["role"], content: string) {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    createdAt: Date.now(),
  } satisfies AiChatMessage;
}

export function useAiChat() {
  const [messages, setMessages] = useState<AiChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const assistantMessageIdRef = useRef<string | null>(null);
  const assistantTextRef = useRef("");

  const stopStreaming = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    assistantMessageIdRef.current = null;
    assistantTextRef.current = "";
    setIsStreaming(false);
  }, []);

  const updateAssistantMessage = useCallback((content: string) => {
    const assistantMessageId = assistantMessageIdRef.current;

    if (!assistantMessageId) {
      return;
    }

    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.id === assistantMessageId ? { ...message, content } : message,
      ),
    );
  }, []);

  const sendMessage = useCallback(
    async (messageText?: string) => {
      const content = (messageText ?? draft).trim();

      if (!content || isStreaming) {
        return;
      }

      const nextUserMessage = createMessage("user", content);
      const nextAssistantMessage = createMessage("assistant", "");
      const conversationMessages = [...messages, nextUserMessage];

      setMessages((currentMessages) => [...currentMessages, nextUserMessage, nextAssistantMessage]);
      setDraft("");
      setError(null);
      setIsStreaming(true);

      assistantMessageIdRef.current = nextAssistantMessage.id;
      assistantTextRef.current = "";

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        await streamAiChatReply(
          {
            message: content,
            messages: conversationMessages.map((message) => ({
              role: message.role,
              content: message.content,
            })),
          },
          {
            onStart: () => undefined,
            onDelta: (chunk) => {
              assistantTextRef.current += chunk;
              updateAssistantMessage(assistantTextRef.current);
            },
            onDone: (finalContent) => {
              if (finalContent) {
                assistantTextRef.current = finalContent;
                updateAssistantMessage(finalContent);
              }
            },
          },
          controller.signal,
        );
      } catch (streamError) {
        if (controller.signal.aborted) {
          return;
        }

        const message =
          streamError instanceof Error
            ? streamError.message
            : "Something went wrong while streaming the response.";

        setError(message);
        setMessages((currentMessages) =>
          currentMessages.filter((messageItem) => messageItem.id !== nextAssistantMessage.id),
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsStreaming(false);
          abortControllerRef.current = null;
          assistantMessageIdRef.current = null;
          assistantTextRef.current = "";
        }
      }
    },
    [draft, isStreaming, messages, updateAssistantMessage],
  );

  const sendStarterPrompt = useCallback((prompt: string) => sendMessage(prompt), [sendMessage]);

  const clearConversation = useCallback(() => {
    stopStreaming();
    setError(null);
    setDraft("");
    setMessages([]);
  }, [stopStreaming]);

  const canSend = useMemo(() => draft.trim().length > 0 && !isStreaming, [draft, isStreaming]);

  return {
    messages,
    draft,
    setDraft,
    isStreaming,
    error,
    canSend,
    sendMessage,
    sendStarterPrompt,
    stopStreaming,
    clearConversation,
  };
}
