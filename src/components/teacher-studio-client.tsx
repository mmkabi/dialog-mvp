"use client";

import { Camera, CameraOff, Mic, MicOff, Phone, PhoneOff, Send, Upload } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge, Button, Card, SafetyNote, TextInput, cn } from "@/components/ui/primitives";
import type { Locale } from "@/i18n/config";
import { featureCopy, t } from "@/lib/feature-content";
import { mockChatProvider, mockVideoCallProvider, type ChatMessage, type ProviderStatus } from "@/lib/mock-communication-providers";

export function TeacherStudioClient({ locale, agentName }: { locale: Locale; agentName: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [callStatus, setCallStatus] = useState<ProviderStatus>("mock");
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    mockChatProvider.listMessages("lesson-feedback").then(setMessages).catch(() => setError("Network failure in mock provider."));
  }, []);

  async function sendMessage() {
    if (!message.trim()) return;
    setTyping(true);
    const next = await mockChatProvider.sendMessage("lesson-feedback", message.trim());
    setMessages((items) => [...items, next]);
    setMessage("");
    window.setTimeout(() => setTyping(false), 650);
  }

  async function uploadFile() {
    const next = await mockChatProvider.uploadPracticeFile("lesson-feedback", "sample-rehearsal.webm");
    setMessages((items) => [...items, next]);
  }

  async function startCall() {
    setCallStatus("connecting");
    const call = await mockVideoCallProvider.createCall(`teacher-${agentName}`);
    setCallStatus(call.status);
  }

  async function endCall() {
    const call = await mockVideoCallProvider.endCall(`teacher-${agentName}`);
    setCallStatus(call.status);
  }

  return (
    <Card as="section" className="border-[var(--accent)]/25 bg-[var(--surface-paper)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge tone="warm">{t(featureCopy.communicationStudio, locale)}</Badge>
          <h2 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">{agentName}</h2>
          <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{t(featureCopy.communicationSubtitle, locale)}</p>
        </div>
        <Badge tone={callStatus === "connected" ? "success" : callStatus === "error" ? "danger" : "calm"}>{callStatus}</Badge>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_300px]">
        <div className="rounded-2xl border border-[var(--border-soft)] bg-white p-4">
          <div className="max-h-80 space-y-3 overflow-y-auto pe-1">
            {messages.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "max-w-[88%] rounded-2xl border p-3 text-sm leading-6",
                  item.sender === "student" ? "ms-auto border-[var(--accent)]/35 bg-[var(--accent-soft)]" : "border-[var(--border-soft)] bg-[var(--surface-warm)]",
                )}
              >
                <p>{item.body}</p>
                {!item.read ? <p className="mt-1 text-xs font-semibold text-[var(--primary)]">Unread</p> : null}
              </div>
            ))}
            {typing ? <p className="text-sm text-[var(--text-muted)]">Mock teacher is typing...</p> : null}
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto_auto]">
            <TextInput label={locale === "fa" ? "پیام" : "Message"} value={message} onChange={setMessage} />
            <Button onClick={sendMessage} icon={<Send className="h-4 w-4" />}>{locale === "fa" ? "ارسال" : "Send"}</Button>
            <Button variant="secondary" onClick={uploadFile} icon={<Upload className="h-4 w-4" />}>{locale === "fa" ? "فایل تمرین" : "Practice file"}</Button>
          </div>
        </div>

        <div className="grid gap-3 rounded-2xl border border-[var(--border-soft)] bg-[#111827] p-4 text-white">
          <div className="grid min-h-40 place-items-center rounded-2xl bg-[radial-gradient(circle_at_50%_20%,rgba(245,192,92,0.28),transparent_16rem),#1f2937]">
            <div className="text-center">
              <Camera className="mx-auto h-8 w-8 text-[var(--accent)]" />
              <p className="mt-2 text-sm">{callStatus === "connected" ? "Mock call connected" : "Mock video room"}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {callStatus === "connected" ? (
              <Button variant="secondary" onClick={endCall} icon={<PhoneOff className="h-4 w-4" />}>{locale === "fa" ? "پایان تماس" : "End"}</Button>
            ) : (
              <Button onClick={startCall} icon={<Phone className="h-4 w-4" />}>{locale === "fa" ? "شروع تماس" : "Start"}</Button>
            )}
            <Button variant="secondary" onClick={() => setMicOn((value) => !value)} icon={micOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}>
              {micOn ? "Mic" : "Muted"}
            </Button>
            <Button variant="secondary" onClick={() => setCameraOn((value) => !value)} icon={cameraOn ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}>
              {cameraOn ? "Camera" : "Camera off"}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <SafetyNote tone="warm">{t(featureCopy.mockBoundary, locale)}</SafetyNote>
        <SafetyNote tone="calm">{t(featureCopy.roleNotice, locale)}</SafetyNote>
      </div>
      {error ? <p className="mt-3 text-sm text-[var(--danger)]">{error}</p> : null}
    </Card>
  );
}
