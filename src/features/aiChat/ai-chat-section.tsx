"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Plus, Send, Sparkles, UserRound, X } from "lucide-react";
import { aiChatData } from "./data";
import { useAiChat } from "./use-ai-chat";

function formatTime(timestamp: number) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-1">
      <motion.span
        aria-hidden="true"
        className="h-2 w-2 rounded-full bg-emerald-400"
        animate={{ opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0 }}
      />
      <motion.span
        aria-hidden="true"
        className="h-2 w-2 rounded-full bg-emerald-400"
        animate={{ opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.12 }}
      />
      <motion.span
        aria-hidden="true"
        className="h-2 w-2 rounded-full bg-emerald-400"
        animate={{ opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.24 }}
      />
      <span className="ml-2 text-xs text-black/45">Typing</span>
    </div>
  );
}

export function AiChatSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const {
    messages,
    draft,
    setDraft,
    isStreaming,
    error,
    canSend,
    sendMessage,
    sendStarterPrompt,
    stopStreaming,
  } = useAiChat();

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const container = scrollRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [isOpen, messages, isStreaming]);

  useEffect(() => {
    const input = inputRef.current;

    if (!input) {
      return;
    }

    input.style.height = "auto";
    input.style.height = `${Math.min(input.scrollHeight, 224)}px`;
  }, [draft]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setShowSuggestions(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const promptButtons = useMemo(() => aiChatData.starterPrompts, []);
  const isEmptyState = messages.length === 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage();
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }

    event.preventDefault();

    if (!canSend) {
      return;
    }

    void sendMessage();
  };

  const closeModal = () => {
    setShowSuggestions(false);
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setShowSuggestions(false);
          setIsOpen(true);
        }}
        aria-label="Open AI chat"
        className="fixed bottom-5 right-5 z-50 inline-flex cursor-pointer items-center gap-2 rounded-full border border-emerald-200 bg-black px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-black sm:bottom-6 sm:right-6"
      >
        <Sparkles className="h-4 w-4 text-emerald-400" />
        <span>AI Chat</span>
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/35 p-3 backdrop-blur-[3px] sm:p-6">
          <button
            type="button"
            aria-label="Close AI chat backdrop"
            className="absolute inset-0 cursor-default"
            onClick={closeModal}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-chat-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex h-[min(90vh,860px)] w-full max-w-2xl flex-col overflow-hidden rounded-[1.75rem] border border-emerald-200/80 bg-white/60 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-emerald-200/80 bg-white/55 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-2xl border border-emerald-200 bg-black text-emerald-400 shadow-sm">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p id="ai-chat-title" className="truncate text-sm font-semibold text-black">
                      {aiChatData.title}
                    </p>
                    <p className="truncate text-xs text-black/70">Tap the plus icon for starter prompts</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-emerald-200 bg-white text-black transition hover:bg-black hover:text-white"
                aria-label="Close AI chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className={`flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top,rgba(167,243,208,0.32)_0%,rgba(255,255,255,0.84)_42%,rgba(255,255,255,0.96)_100%)] px-4 py-4 sm:px-5 ${
                isEmptyState ? "flex items-center justify-center" : "space-y-5"
              }`}
            >
              {isEmptyState ? (
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl border border-emerald-200 bg-black text-emerald-400 shadow-[0_18px_40px_rgba(0,0,0,0.16)]"
                  >
                    <Sparkles className="h-7 w-7" />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 }}
                    className="max-w-xl text-3xl font-semibold tracking-tight text-black sm:text-4xl"
                  >
                    How can I help you explore Pritika&apos;s portfolio?
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.1 }}
                    className="mt-3 max-w-2xl text-sm leading-6 text-black/65 sm:text-base"
                  >
                    Ask about projects, experience, skills, education, or the best way to reach her.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="mt-8 grid w-full gap-3 sm:grid-cols-2"
                  >
                    {promptButtons.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => void sendStarterPrompt(prompt)}
                        className="rounded-2xl border border-emerald-200 bg-white/75 px-4 py-3 text-left text-sm text-black shadow-[0_10px_24px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:bg-black hover:text-white"
                      >
                        {prompt}
                      </button>
                    ))}
                  </motion.div>
                </div>
              ) : (
                messages.map((message, index) => {
                const isAssistantTyping =
                  message.role === "assistant" && isStreaming && index === messages.length - 1 && !message.content.trim();

                if (message.role === "user") {
                  return (
                    <div key={message.id} className="flex justify-end">
                      <div className="flex max-w-[min(88%,28rem)] flex-row-reverse items-end gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-black text-emerald-400 shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
                          <UserRound className="h-4 w-4" />
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="rounded-[1.4rem] rounded-br-md bg-black px-4 py-3 text-sm leading-6 text-white shadow-[0_14px_28px_rgba(0,0,0,0.18)]"
                        >
                          <div className="whitespace-pre-wrap">{message.content}</div>
                          <div className="mt-2 text-[11px] text-white/65">{formatTime(message.createdAt)}</div>
                        </motion.div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={message.id} className="flex justify-start">
                    <div className="max-w-[min(92%,36rem)] pl-1 sm:pl-3">
                      {isAssistantTyping ? (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.18 }}
                          className="text-[15px] leading-7 text-black/90"
                        >
                          <TypingIndicator />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className="text-[15px] leading-7 text-black/90"
                        >
                          <div className="whitespace-pre-wrap">{message.content}</div>
                          <div className="mt-2 text-[11px] text-black/50">{formatTime(message.createdAt)}</div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                );
                })
              )}
            </div>

            <div className="border-t border-emerald-200/80 bg-white/55 px-4 py-4 sm:px-5 backdrop-blur-xl">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  {showSuggestions ? (
                    <div className="absolute bottom-full left-0 z-20 mb-3 w-full rounded-3xl border border-emerald-200/80 bg-white/85 p-3 backdrop-blur-xl shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/70">
                          Starter prompts
                        </p>
                        <button
                          type="button"
                          onClick={() => setShowSuggestions(false)}
                          className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-emerald-200 bg-white text-black transition hover:bg-black hover:text-white"
                          aria-label="Close suggestions"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid gap-2">
                        {promptButtons.map((prompt) => (
                          <button
                            key={prompt}
                            type="button"
                            onClick={() => {
                              setShowSuggestions(false);
                              void sendStarterPrompt(prompt);
                            }}
                            className="cursor-pointer rounded-2xl border border-emerald-200 bg-white px-3 py-2 text-left text-sm text-black transition hover:bg-black hover:text-white"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className={`flex items-end gap-2 rounded-3xl border border-emerald-200/80 bg-white/80 px-3 py-3 backdrop-blur-xl focus-within:ring-2 focus-within:ring-emerald-400/20 ${isEmptyState ? "mx-auto w-full max-w-2xl" : ""}`}>
                    <button
                      type="button"
                      onClick={() => setShowSuggestions((current) => !current)}
                      className="mb-1 inline-flex h-9 w-9 cursor-pointer shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-white text-black transition hover:bg-black hover:text-white"
                      aria-label="Open suggestions"
                    >
                      <Plus className="h-4 w-4 text-emerald-400" />
                    </button>

                    <textarea
                      id="ai-chat-input"
                      ref={inputRef}
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      onKeyDown={handleInputKeyDown}
                      onFocus={() => setShowSuggestions(false)}
                      placeholder="Ask about the portfolio, the resume, or the experience summary..."
                      rows={1}
                      className="max-h-56 min-h-10 flex-1 resize-none border-0 bg-transparent px-0 py-1 text-sm text-black placeholder:text-black/50 outline-none"
                    />

                    <button
                      type={isStreaming ? "button" : "submit"}
                      onClick={isStreaming ? stopStreaming : undefined}
                      disabled={!canSend && !isStreaming}
                      className="mb-1 inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-black px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isStreaming ? (
                        <>
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          Stop
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 text-emerald-400" />
                          Send
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {error ? (
                  <p className="rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm text-black">
                    {error}
                  </p>
                ) : null}

              </form>
            </div>
          </motion.div>
        </div>
      ) : null}
    </>
  );
}
