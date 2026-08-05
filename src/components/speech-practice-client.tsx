"use client";

import { CheckCircle2, Mic, Pause, Play, RotateCcw, SkipForward, Square } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Badge, Button, Card, ProgressBar, SafetyNote, SelectInput, cn } from "@/components/ui/primitives";
import type { Locale } from "@/i18n/config";
import { featureCopy, speechPracticeContent, t, warmupPrograms, type SpeechExerciseKind } from "@/lib/feature-content";

type RecorderState = "idle" | "recording" | "ready" | "error" | "unsupported";

const storeKey = "dialog:speech-progress:v1";

function readStore(): Record<string, { completed: number; xp: number; streak: number }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(storeKey) ?? "{}");
  } catch {
    return {};
  }
}

function writeStore(value: Record<string, { completed: number; xp: number; streak: number }>) {
  window.localStorage.setItem(storeKey, JSON.stringify(value));
}

function useCountdown(initialSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || secondsLeft <= 0) return;
    const id = window.setInterval(() => {
      setSecondsLeft((value) => {
        const next = Math.max(0, value - 1);
        if (next === 0) window.setTimeout(() => setRunning(false), 0);
        return next;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, secondsLeft]);

  return { secondsLeft, running, setRunning, reset: () => setSecondsLeft(initialSeconds) };
}

function AudioRecorder({ locale }: { locale: Locale }) {
  const [state, setState] = useState<RecorderState>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  async function startRecording() {
    if (!("MediaRecorder" in window)) {
      setState("unsupported");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => chunksRef.current.push(event.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
        setState("ready");
        stream.getTracks().forEach((track) => track.stop());
      };
      recorder.start();
      setState("recording");
    } catch {
      setState("error");
    }
  }

  function stopRecording() {
    recorderRef.current?.stop();
  }

  return (
    <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-paper)] p-4">
      <div className="flex flex-wrap items-center gap-2">
        {state === "recording" ? (
          <Button variant="secondary" onClick={stopRecording} icon={<Square className="h-4 w-4" />}>
            {t(featureCopy.stopRecording, locale)}
          </Button>
        ) : (
          <Button variant="secondary" onClick={startRecording} icon={<Mic className="h-4 w-4" />}>
            {t(featureCopy.record, locale)}
          </Button>
        )}
        {state === "recording" ? <Badge tone="danger">{t(featureCopy.recording, locale)}</Badge> : null}
      </div>
      {audioUrl ? (
        <audio className="mt-4 w-full" src={audioUrl} controls aria-label={t(featureCopy.playRecording, locale)} />
      ) : null}
      {state === "error" ? <p className="mt-3 text-sm leading-6 text-[var(--danger)]">{t(featureCopy.micDenied, locale)}</p> : null}
      {state === "unsupported" ? <p className="mt-3 text-sm leading-6 text-[var(--danger)]">{t(featureCopy.unsupportedRecorder, locale)}</p> : null}
    </div>
  );
}

function SelfAssessment({ locale }: { locale: Locale }) {
  const fields = [featureCopy.clarity, featureCopy.calm, featureCopy.rhythm, featureCopy.confidence];

  return (
    <div className="grid gap-3 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-paper)] p-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <h3 className="font-semibold text-[var(--foreground)]">{t(featureCopy.selfAssessment, locale)}</h3>
        <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">{t(featureCopy.noFakeAi, locale)}</p>
      </div>
      {fields.map((field) => (
        <label key={t(field, locale)} className="text-sm font-semibold text-[var(--foreground)]">
          {t(field, locale)}
          <input className="mt-2 w-full accent-[var(--primary)]" type="range" min="1" max="5" defaultValue="3" />
        </label>
      ))}
    </div>
  );
}

function ExercisePanel({
  locale,
  exerciseId,
  onComplete,
}: {
  locale: Locale;
  exerciseId: SpeechExerciseKind;
  onComplete: (id: SpeechExerciseKind, xp: number) => void;
}) {
  const exercise = speechPracticeContent.find((item) => item.id === exerciseId) ?? speechPracticeContent[0];
  const [cycles, setCycles] = useState("3");
  const [stepIndex, setStepIndex] = useState(0);
  const stepSeconds = exercise.id === "breathing" ? 4 : Math.ceil(exercise.durationSeconds / Math.max(1, exercise.steps.length));
  const countdown = useCountdown(stepSeconds);
  const progress = Math.round(((stepIndex + (stepSeconds - countdown.secondsLeft) / stepSeconds) / exercise.steps.length) * 100);

  function complete() {
    onComplete(exercise.id, exercise.xp);
  }

  return (
    <Card as="section" className="border-[#b9d7d9] bg-[#f8fcfc]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge tone="calm">{exercise.xp} {t(featureCopy.xp, locale)}</Badge>
          <h2 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">{t(exercise.title, locale)}</h2>
          <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{t(exercise.summary, locale)}</p>
        </div>
        {exercise.id === "breathing" ? (
          <SelectInput
            label={t(featureCopy.cycles, locale)}
            value={cycles}
            onChange={setCycles}
            options={["2", "3", "5", "8"].map((value) => ({ value, label: value }))}
          />
        ) : null}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[220px_1fr]">
        <div className="grid place-items-center rounded-3xl border border-[#b9d7d9] bg-[#e8f6f6] p-6 text-center">
          <div className={cn("grid h-32 w-32 place-items-center rounded-full bg-[#cde8ea] text-3xl font-bold text-[#24565c]", countdown.running && "animate-pulse")}>
            {countdown.secondsLeft}
          </div>
          <p className="mt-4 text-lg font-semibold text-[#24565c]">{t(exercise.steps[stepIndex], locale)}</p>
        </div>
        <div className="grid gap-4">
          <ProgressBar value={progress} label={t(featureCopy.progress, locale)} />
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => countdown.setRunning(true)} icon={<Play className="h-4 w-4" />}>{t(featureCopy.start, locale)}</Button>
            <Button variant="secondary" onClick={() => countdown.setRunning(false)} icon={<Pause className="h-4 w-4" />}>{t(featureCopy.pause, locale)}</Button>
            <Button variant="secondary" onClick={() => { countdown.reset(); setStepIndex(0); }} icon={<RotateCcw className="h-4 w-4" />}>{t(featureCopy.reset, locale)}</Button>
            <Button
              variant="secondary"
              onClick={() => {
                countdown.reset();
                setStepIndex((value) => Math.min(exercise.steps.length - 1, value + 1));
              }}
              icon={<SkipForward className="h-4 w-4" />}
            >
              {t(featureCopy.next, locale)}
            </Button>
          </div>
          {["pronunciation", "slow-reading", "confidence"].includes(exercise.id) ? <AudioRecorder locale={locale} /> : null}
          {exercise.id === "confidence" ? <SelfAssessment locale={locale} /> : null}
          <Button onClick={complete} icon={<CheckCircle2 className="h-4 w-4" />}>{t(featureCopy.finish, locale)}</Button>
        </div>
      </div>
    </Card>
  );
}

export function SpeechPracticeClient({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState<SpeechExerciseKind>("breathing");
  const [programMinutes, setProgramMinutes] = useState(5);
  const [programStep, setProgramStep] = useState(0);
  const [store, setStore] = useState<Record<string, { completed: number; xp: number; streak: number }>>(() => readStore());

  const selectedProgram = useMemo(() => warmupPrograms.find((item) => item.minutes === programMinutes) ?? warmupPrograms[1], [programMinutes]);
  const totalXp = Object.values(store).reduce((sum, item) => sum + item.xp, 0);
  const completions = Object.values(store).reduce((sum, item) => sum + item.completed, 0);

  function complete(id: SpeechExerciseKind, xp: number) {
    const next = {
      ...store,
      [id]: {
        completed: (store[id]?.completed ?? 0) + 1,
        xp: (store[id]?.xp ?? 0) + xp,
        streak: Math.max(1, store[id]?.streak ?? 0),
      },
    };
    setStore(next);
    writeStore(next);
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card as="section" className="border-[#b9d7d9] bg-[#f7fbfb]">
          <div className="flex flex-wrap items-center gap-2">
            {speechPracticeContent.map((exercise) => (
              <button
                key={exercise.id}
                type="button"
                onClick={() => setSelected(exercise.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)]",
                  selected === exercise.id ? "border-[#24565c] bg-[#24565c] text-white" : "border-[#b9d7d9] bg-white text-[#24565c] hover:bg-[#e8f6f6]",
                )}
              >
                {t(exercise.title, locale)}
              </button>
            ))}
          </div>
          <div className="mt-6">
            <ExercisePanel key={selected} locale={locale} exerciseId={selected} onComplete={complete} />
          </div>
        </Card>

        <Card as="aside" className="border-[#e2c481] bg-[#fff9ec]">
          <Badge tone="warm">{t(featureCopy.warmupTitle, locale)}</Badge>
          <h2 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">{t(featureCopy.warmupSubtitle, locale)}</h2>
          <div className="mt-5">
            <SelectInput
              label={t(featureCopy.timer, locale)}
              value={String(programMinutes)}
              onChange={(value) => {
                setProgramMinutes(Number(value));
                setProgramStep(0);
                setSelected((warmupPrograms.find((item) => item.minutes === Number(value)) ?? warmupPrograms[1]).steps[0]);
              }}
              options={warmupPrograms.map((item) => ({ value: String(item.minutes), label: `${item.minutes}` }))}
            />
          </div>
          <div className="mt-5 grid gap-2">
            {selectedProgram.steps.map((id, index) => {
              const exercise = speechPracticeContent.find((item) => item.id === id)!;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setProgramStep(index);
                    setSelected(id);
                  }}
                  className={cn(
                    "flex items-center justify-between rounded-2xl border p-3 text-start text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)]",
                    programStep === index ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "border-[var(--border-soft)] bg-white hover:border-[var(--accent)]/50",
                  )}
                >
                  <span>{index + 1}. {t(exercise.title, locale)}</span>
                  <span>{exercise.xp} XP</span>
                </button>
              );
            })}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white p-4">
              <p className="text-sm text-[var(--text-muted)]">{t(featureCopy.completed, locale)}</p>
              <p className="mt-1 text-2xl font-bold text-[var(--foreground)]">{completions}</p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="text-sm text-[var(--text-muted)]">{t(featureCopy.xp, locale)}</p>
              <p className="mt-1 text-2xl font-bold text-[var(--foreground)]">{totalXp}</p>
            </div>
          </div>
          <div className="mt-5">
            <SafetyNote tone="calm">{t(featureCopy.noFakeAi, locale)}</SafetyNote>
          </div>
        </Card>
      </div>
    </div>
  );
}
