"use client";

import { Bot, Send, UserRound } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/primitives";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages";
import { createMockResponse, getInitialChat, type MockChatMessage } from "@/lib/mock-ai";

export function MockChat({
  locale,
  dictionary,
  agentName,
}: {
  locale: Locale;
  dictionary: Dictionary;
  agentName: string;
}) {
  const initialMessages = useMemo(() => getInitialChat(locale, agentName), [agentName, locale]);
  const [messages, setMessages] = useState<MockChatMessage[]>(initialMessages);
  const [value, setValue] = useState<string>(dictionary.education.suggestedPrompt);

  function sendMessage() {
    const userMessage: MockChatMessage = {
      id: `u-${messages.length + 1}`,
      role: "user",
      content: value,
    };
    const agentMessage: MockChatMessage = {
      id: `a-${messages.length + 2}`,
      role: "agent",
      content: createMockResponse(locale, value),
    };
    setMessages((current) => [...current, userMessage, agentMessage]);
    setValue("");
  }

  return (
    <div className="grid gap-4">
      <div className="min-h-[360px] rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-paper)] p-4 shadow-2xl shadow-[rgb(100_70_30_/_10%)]">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "agent" ? (
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-[var(--accent-soft)] text-[var(--primary)]">
                  <Bot className="h-4 w-4" />
                </span>
              ) : null}
              <p
                className={`max-w-[78%] rounded-lg px-4 py-3 text-sm leading-6 ${
                  message.role === "user" ? "bg-[var(--primary)] text-white" : "bg-[var(--surface-warm)] text-[var(--foreground)]"
                }`}
              >
                {message.content}
              </p>
              {message.role === "user" ? (
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-[var(--surface-warm)] text-[var(--primary)]">
                  <UserRound className="h-4 w-4" />
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <label className="block text-sm font-semibold text-[var(--foreground)]">
        <span>{dictionary.education.promptLabel}</span>
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          rows={3}
          className="mt-2 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-paper)] px-3 py-2 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
        />
      </label>
      <div>
        <Button onClick={sendMessage} icon={<Send className="h-4 w-4" />}>
          {dictionary.education.sendPrompt}
        </Button>
      </div>
    </div>
  );
}
