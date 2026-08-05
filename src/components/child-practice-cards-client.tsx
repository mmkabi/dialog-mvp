"use client";

import { HeartPulse, ImageIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Badge, ProgressBar, SafetyNote, cn } from "@/components/ui/primitives";
import type { Locale } from "@/i18n/config";
import { childPracticeExercises, childPracticeCopy, childText, computeChildProgress } from "@/lib/child-practice-content";
import { readChildProgress } from "@/lib/child-practice-storage";
import type { ChildExercise } from "@/lib/types";

export function ChildPracticeCardsClient({
  locale,
  exercises,
  ageBandLabel,
  parentOnlyLabel,
  startLabel,
}: {
  locale: Locale;
  exercises: ChildExercise[];
  ageBandLabel: string;
  parentOnlyLabel: string;
  startLabel: string;
}) {
  const [progress] = useState<Record<string, number>>(() => {
    const stored = readChildProgress();
    const next: Record<string, number> = {};
    for (const item of childPracticeExercises) {
      next[item.id] = computeChildProgress(stored[item.id], item.defaultRounds);
    }
    return next;
  });

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {exercises.map((exercise) => {
        const practice = childPracticeExercises.find((item) => item.cardId === exercise.id);
        if (!practice) return null;
        const href = `/${locale}/children/parent/${practice.id}`;
        const percent = progress[practice.id] ?? 0;

        return (
          <Link
            key={exercise.id}
            href={href}
            aria-label={`${startLabel}: ${childText(practice.title, locale)}`}
            className={cn(
              "spotlight-hover block rounded-2xl border border-[var(--accent)]/25 bg-[#fff9e9] p-5 shadow-[var(--shadow-cinematic)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/55 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]",
            )}
          >
            <div className="flex items-start gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--accent-soft)] text-[#714909]">
                {practice.id === "picture-choice" ? <ImageIcon className="h-5 w-5" /> : <HeartPulse className="h-5 w-5" />}
              </span>
              <div>
                <h2 className="text-2xl font-semibold leading-tight text-[var(--foreground)]">{childText(practice.title, locale)}</h2>
                <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{childText(practice.summary, locale)}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge tone="warm">
                {ageBandLabel}: {practice.ageBand}
              </Badge>
              <Badge tone="calm">{parentOnlyLabel}</Badge>
            </div>
            <div className="mt-5">
              <ProgressBar value={percent} label={childText(childPracticeCopy.progress, locale)} />
            </div>
            <div className="mt-4">
              <SafetyNote tone="warm">{childText(exercise.parentNote, locale)}</SafetyNote>
            </div>
            <p className="mt-5 inline-flex min-h-11 items-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-paper)] px-5 py-2 text-sm font-semibold text-[var(--primary)]">
              {startLabel}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
