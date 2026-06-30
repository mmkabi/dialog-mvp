import type { Locale } from "@/i18n/config";

export interface MockChatMessage {
  id: string;
  role: "user" | "agent";
  content: string;
}

export function getInitialChat(locale: Locale, agentName: string): MockChatMessage[] {
  return [
    {
      id: "m-1",
      role: "agent",
      content:
        locale === "fa"
          ? `سلام، من بازسازی آموزشی ${agentName} هستم. یک هدف صحنه یا مشکل تمرینی بفرستید تا پاسخ نمایشی بدهم.`
          : `Hello, I am the educational reconstruction of ${agentName}. Send a scene objective or rehearsal problem and I will respond with mocked guidance.`,
    },
  ];
}

export function createMockResponse(locale: Locale, prompt: string) {
  if (!prompt.trim()) {
    return locale === "fa"
      ? "برای دریافت بازخورد نمایشی، یک جمله یا موقعیت تمرینی وارد کنید."
      : "Enter a line or rehearsal situation to receive mocked feedback.";
  }

  return locale === "fa"
    ? "پاسخ نمایشی: ابتدا هدف شخصیت را با یک فعل روشن بنویسید، سپس همان جمله را یک بار با مانع بیرونی و یک بار با مانع درونی تمرین کنید."
    : "Mock response: first write the character objective as a clear verb, then rehearse the same line once with an external obstacle and once with an internal obstacle.";
}
