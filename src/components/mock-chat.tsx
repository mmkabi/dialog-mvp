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
      <div className="min-h-[360px] rounded-lg border border-zinc-200 bg-white p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "agent" ? (
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-teal-100 text-teal-800">
                  <Bot className="h-4 w-4" />
                </span>
              ) : null}
              <p
                className={`max-w-[78%] rounded-lg px-4 py-3 text-sm leading-6 ${
                  message.role === "user" ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-800"
                }`}
              >
                {message.content}
              </p>
              {message.role === "user" ? (
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-amber-100 text-amber-800">
                  <UserRound className="h-4 w-4" />
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <label className="block text-sm font-medium text-zinc-700">
        <span>{dictionary.education.promptLabel}</span>
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          rows={3}
          className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
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
