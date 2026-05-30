export type AiChatRole = "user" | "assistant";

export interface AiChatMessage {
  id: string;
  role: AiChatRole;
  content: string;
  createdAt: number;
}

export interface AiChatRequestMessage {
  role: AiChatRole;
  content: string;
}

export interface AiChatRequestPayload {
  message: string;
  messages: AiChatRequestMessage[];
}

export type AiChatStreamEvent =
  | { type: "start"; content?: string }
  | { type: "delta"; content: string }
  | { type: "done"; content?: string }
  | { type: "error"; message: string };
