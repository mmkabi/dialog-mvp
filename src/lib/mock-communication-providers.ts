export type ProviderStatus = "mock" | "connecting" | "connected" | "error";

export interface ChatMessage {
  id: string;
  sender: "student" | "coach";
  body: string;
  createdAt: string;
  read: boolean;
}

export interface ChatProvider {
  mode: "mock";
  listConversations(): Promise<Array<{ id: string; title: string; unreadCount: number }>>;
  listMessages(conversationId: string): Promise<ChatMessage[]>;
  sendMessage(conversationId: string, body: string): Promise<ChatMessage>;
  uploadPracticeFile(conversationId: string, fileName: string): Promise<ChatMessage>;
}

export interface VideoCallProvider {
  mode: "mock";
  createCall(roomId: string): Promise<{ roomId: string; token: string; status: ProviderStatus }>;
  endCall(roomId: string): Promise<{ roomId: string; status: ProviderStatus }>;
}

const now = () => new Date().toISOString();

export const mockChatProvider: ChatProvider = {
  mode: "mock",
  async listConversations() {
    return [
      { id: "lesson-feedback", title: "Lesson feedback", unreadCount: 1 },
      { id: "daily-task", title: "Daily teacher task", unreadCount: 0 },
    ];
  },
  async listMessages() {
    return [
      { id: "m1", sender: "coach", body: "Mock note: upload one short rehearsal and ask a focused question.", createdAt: now(), read: true },
      { id: "m2", sender: "student", body: "I want feedback on rhythm and pauses.", createdAt: now(), read: true },
      { id: "m3", sender: "coach", body: "Mock feedback is queued. A real provider can replace this adapter later.", createdAt: now(), read: false },
    ];
  },
  async sendMessage(_conversationId, body) {
    return { id: `m-${Date.now()}`, sender: "student", body, createdAt: now(), read: true };
  },
  async uploadPracticeFile(_conversationId, fileName) {
    return { id: `file-${Date.now()}`, sender: "student", body: `Practice file attached: ${fileName}`, createdAt: now(), read: true };
  },
};

export const mockVideoCallProvider: VideoCallProvider = {
  mode: "mock",
  async createCall(roomId) {
    return { roomId, token: "mock-call-token-server-side-placeholder", status: "connected" };
  },
  async endCall(roomId) {
    return { roomId, status: "mock" };
  },
};
