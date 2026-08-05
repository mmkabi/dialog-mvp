"use client";

import { CheckCircle2, Mic, Pause, Play, RotateCcw, Volume2 } from "lucide-react";
import { useRef, useState } from "react";

import { Badge, Button, Card, ProgressBar, SafetyNote, SelectInput } from "@/components/ui/primitives";
import type { Locale } from "@/i18n/config";
import {
  childPracticeCopy,
  childPracticeExercises,
  childText,
  computeChildProgress,
  emptyProgress,
  parentResponses,
  type ChildPracticeId,
  type ChildPracticeStage,
  type ParentResponse,
} from "@/lib/child-practice-content";
import { readChildProgress, writeChildProgress } from "@/lib/child-practice-storage";

function useTemporaryRecorder(locale: Locale) {
  const [state, setState] = useState<"idle" | "recording" | "ready" | "error" | "unsupported">("idle");
  const [url, setUrl] = useState<string | null>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<BlobPart[]>([]);

  async function start() {
    if (!("MediaRecorder" in window)) {
      setState("unsupported");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunks.current = [];
      const next = new MediaRecorder(stream);
      recorder.current = next;
      next.ondataavailable = (event) => chunks.current.push(event.data);
      next.onstop = () => {
        setUrl(URL.createObjectURL(new Blob(chunks.current, { type: "audio/webm" })));
        setState("ready");
        stream.getTracks().forEach((track) => track.stop());
      };
      next.start();
      setState("recording");
    } catch {
      setState("error");
    }
  }

  function stop() {
    recorder.current?.stop();
  }

  return (
    <div className="rounded-2xl border border-[var(--border-soft)] bg-white p-4">
      <p className="text-sm font-semibold text-[var(--foreground)]">{childText(childPracticeCopy.recordOptional, locale)}</p>
      <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">{childText(childPracticeCopy.consent, locale)}</p>
      <div className="mt-3">
        {state === "recording" ? (
          <Button variant="secondary" onClick={stop}>{locale === "fa" ? "توقف ضبط" : "Stop recording"}</Button>
        ) : (
          <Button variant="secondary" onClick={start} icon={<Mic className="h-4 w-4" />}>{locale === "fa" ? "ضبط اختیاری" : "Optional record"}</Button>
        )}
      </div>
      {url ? <audio className="mt-3 w-full" src={url} controls /> : null}
      {state === "error" ? <p className="mt-2 text-sm text-[var(--danger)]">{locale === "fa" ? "مجوز میکروفن رد شد یا در دسترس نیست." : "Microphone permission was denied or unavailable."}</p> : null}
      {state === "unsupported" ? <p className="mt-2 text-sm text-[var(--danger)]">{locale === "fa" ? "این مرورگر ضبط صدا را پشتیبانی نمی‌کند." : "This browser does not support recording."}</p> : null}
    </div>
  );
}

export function ChildPracticeRunner({ locale, exerciseId }: { locale: Locale; exerciseId: ChildPracticeId }) {
  const exercise = childPracticeExercises.find((item) => item.id === exerciseId) ?? childPracticeExercises[0];
  const [stage, setStage] = useState<ChildPracticeStage>("intro");
  const [rounds, setRounds] = useState(String(exercise.defaultRounds));
  const [level, setLevel] = useState<"easy" | "medium">("easy");
  const [choiceCount, setChoiceCount] = useState(String(exercise.settings.choices?.[0] ?? 2));
  const [roundIndex, setRoundIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [message, setMessage] = useState("");
  const [store, setStore] = useState(() => readChildProgress());
  const current = exercise.items[roundIndex % exercise.items.length];
  const totalRounds = Number(rounds);
  const currentProgress = store[exercise.id] ?? emptyProgress(exercise.id);
  const percent = computeChildProgress(currentProgress, exercise.defaultRounds);
  const sessionCorrect = currentProgress.results.filter((item) => item.correct).length;

  const selectedChoices = (current.choices ?? []).slice(0, Number(choiceCount));
  const rotation = selectedChoices.length ? roundIndex % selectedChoices.length : 0;
  const visibleChoices = [...selectedChoices.slice(rotation), ...selectedChoices.slice(0, rotation)];

  function persist(response: ParentResponse, correct?: boolean) {
    const previous = store[exercise.id] ?? emptyProgress(exercise.id);
    const nextProgress = {
      ...previous,
      level,
      completedRounds: previous.completedRounds + 1,
      lastActivity: new Date().toISOString(),
      results: [...previous.results, { round: roundIndex + 1, response, correct, at: new Date().toISOString() }],
    };
    const nextStore = { ...store, [exercise.id]: nextProgress };
    setStore(nextStore);
    writeChildProgress(nextStore);
    setMessage(correct === false ? (locale === "fa" ? "دوباره با هم نگاه کنیم." : "Let's look together again.") : childText(childPracticeCopy.gentleFeedback, locale));
    setStage("feedback");
  }

  function nextRound() {
    if (roundIndex + 1 >= totalRounds) {
      const previous = store[exercise.id] ?? emptyProgress(exercise.id);
      const nextStore = {
        ...store,
        [exercise.id]: {
          ...previous,
          completedSessions: previous.completedSessions + 1,
          streak: Math.max(1, previous.streak + 1),
          lastActivity: new Date().toISOString(),
        },
      };
      setStore(nextStore);
      writeChildProgress(nextStore);
      setStage("summary");
      return;
    }
    setRoundIndex((value) => value + 1);
    setStage("model");
  }

  function speakModel() {
    const utteranceText = childText(current.word, locale);
    if (!("speechSynthesis" in window)) {
      setMessage(childText(childPracticeCopy.noPersianVoice, locale));
      return;
    }
    const voices = window.speechSynthesis.getVoices();
    const faVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("fa"));
    if (locale === "fa" && !faVoice) {
      setMessage(childText(childPracticeCopy.noPersianVoice, locale));
      return;
    }
    const utterance = new SpeechSynthesisUtterance(utteranceText);
    utterance.lang = locale === "fa" ? "fa-IR" : "en-US";
    if (faVoice) utterance.voice = faVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  const recorder = useTemporaryRecorder(locale);

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <Card as="section" className="border-[var(--accent)]/25 bg-[#fff9e9]">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="warm">{exercise.ageBand}</Badge>
          <Badge tone="calm">{childText(childPracticeCopy.noClinicalScore, locale)}</Badge>
        </div>
        <h2 className="mt-4 text-4xl font-bold leading-tight text-[var(--foreground)]">{childText(exercise.title, locale)}</h2>
        <p className="mt-3 text-base leading-8 text-[var(--text-muted)]">{childText(exercise.summary, locale)}</p>

        {stage === "intro" ? (
          <div className="mt-6 grid gap-4">
            <SafetyNote tone="danger">{childText(childPracticeCopy.parentSafety, locale)}</SafetyNote>
            <Button onClick={() => setStage("settings")} icon={<Play className="h-4 w-4" />}>{childText(childPracticeCopy.start, locale)}</Button>
          </div>
        ) : null}

        {stage === "settings" ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <SelectInput label={locale === "fa" ? "تعداد دور" : "Rounds"} value={rounds} onChange={setRounds} options={exercise.settings.rounds.map((item) => ({ value: String(item), label: String(item) }))} />
            <SelectInput label={locale === "fa" ? "سطح" : "Level"} value={level} onChange={(value) => setLevel(value as "easy" | "medium")} options={exercise.settings.levels.map((item) => ({ value: item.id, label: childText(item.label, locale) }))} />
            {exercise.settings.choices ? (
              <SelectInput label={locale === "fa" ? "تعداد تصویر" : "Pictures"} value={choiceCount} onChange={setChoiceCount} options={exercise.settings.choices.map((item) => ({ value: String(item), label: String(item) }))} />
            ) : null}
            <div className="md:col-span-2">
              <Button onClick={() => setStage("guide")}>{locale === "fa" ? "دیدن راهنما" : "Show guide"}</Button>
            </div>
          </div>
        ) : null}

        {stage === "guide" ? (
          <div className="mt-6 grid gap-3">
            <h3 className="text-xl font-semibold">{childText(childPracticeCopy.parentGuide, locale)}</h3>
            {exercise.guide.map((item) => (
              <SafetyNote key={childText(item, locale)} tone="warm">{childText(item, locale)}</SafetyNote>
            ))}
            <Button onClick={() => setStage("model")}>{locale === "fa" ? "شروع دور اول" : "Start first round"}</Button>
          </div>
        ) : null}

        {["model", "wait", "response", "feedback", "rest"].includes(stage) ? (
          <div className="mt-6 grid gap-5">
            <div className="rounded-3xl border border-[var(--accent)]/25 bg-white p-5 text-center">
              <p className="text-sm font-semibold text-[var(--text-muted)]">{locale === "fa" ? "دور" : "Round"} {roundIndex + 1} / {totalRounds}</p>
              <div className="mx-auto mt-4 grid min-h-40 w-full max-w-md place-items-center rounded-3xl bg-[#fff3d6] p-6">
                <span className="text-7xl" role="img" aria-label={childText(current.alt, locale)}>{current.icon}</span>
                <p className="mt-4 text-4xl font-bold text-[var(--foreground)]">{childText(level === "medium" && current.expanded ? current.expanded : current.word, locale)}</p>
              </div>
            </div>

            {exercise.id === "picture-choice" && visibleChoices.length ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {visibleChoices.map((choice) => (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => persist("selected", choice.id === current.correctChoiceId)}
                    className="min-h-32 rounded-3xl border border-[var(--border-soft)] bg-white p-4 text-center text-4xl transition hover:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  >
                    <span role="img" aria-label={childText(choice.label, locale)}>{choice.icon}</span>
                    <span className="mt-2 block text-lg font-semibold text-[var(--foreground)]">{childText(choice.label, locale)}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {parentResponses.map((response) => (
                  <button
                    key={response.id}
                    type="button"
                    onClick={() => response.id === "tired" ? setStage("summary") : persist(response.id)}
                    className="min-h-16 rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  >
                    {childText(response.label, locale)}
                  </button>
                ))}
              </div>
            )}

            {message ? <SafetyNote tone="calm">{message}</SafetyNote> : null}
            {recorder}
          </div>
        ) : null}

        {stage === "summary" ? (
          <div className="mt-6 grid gap-4">
            <div className="rounded-3xl border border-[var(--success)]/25 bg-[#eef8ef] p-6">
              <CheckCircle2 className="h-8 w-8 text-[var(--success)]" />
              <h3 className="mt-3 text-2xl font-bold text-[var(--foreground)]">{locale === "fa" ? "خلاصه جلسه" : "Session summary"}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{childText(childPracticeCopy.noClinicalScore, locale)}</p>
            </div>
            <Button onClick={() => { setRoundIndex(0); setStage("settings"); }}>{locale === "fa" ? "جلسه جدید" : "New session"}</Button>
          </div>
        ) : null}
      </Card>

      <Card as="aside" className="border-[var(--accent)]/25 bg-[var(--surface-paper)]">
        <ProgressBar value={percent} label={childText(childPracticeCopy.progress, locale)} />
        <div className="mt-5 grid gap-3">
          <Badge tone="warm">{childText(childPracticeCopy.rounds, locale)}: {currentProgress.completedRounds}</Badge>
          <Badge tone="success">{childText(childPracticeCopy.sessions, locale)}: {currentProgress.completedSessions}</Badge>
          {exercise.id === "picture-choice" ? <Badge tone="calm">{childText(childPracticeCopy.selectedCorrect, locale)}: {sessionCorrect}</Badge> : null}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => setPaused((value) => !value)} icon={<Pause className="h-4 w-4" />}>
            {paused ? childText(childPracticeCopy.resume, locale) : childText(childPracticeCopy.pause, locale)}
          </Button>
          <Button variant="secondary" onClick={() => setStage("settings")} icon={<RotateCcw className="h-4 w-4" />}>{childText(childPracticeCopy.makeEasier, locale)}</Button>
          <Button variant="secondary" onClick={() => setStage("summary")}>{childText(childPracticeCopy.finish, locale)}</Button>
          <Button variant="secondary" onClick={speakModel} icon={<Volume2 className="h-4 w-4" />}>{childText(childPracticeCopy.playModel, locale)}</Button>
        </div>
        {stage === "feedback" ? (
          <div className="mt-5">
            <Button onClick={nextRound}>{childText(childPracticeCopy.nextRound, locale)}</Button>
          </div>
        ) : null}
        <div className="mt-5">
          <SafetyNote tone="warm">{childText(childPracticeCopy.parentSafety, locale)}</SafetyNote>
        </div>
      </Card>
    </div>
  );
}
