"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";

import { Card, ProgressBar } from "@/components/ui/primitives";
import type { Locale } from "@/i18n/config";
import { childPracticeExercises, childText, computeChildProgress } from "@/lib/child-practice-content";
import { readChildProgress } from "@/lib/child-practice-storage";

export function ChildProgressOverviewClient({
  locale,
  title,
  reward,
  progressLabel,
}: {
  locale: Locale;
  title: string;
  reward: string;
  progressLabel: string;
}) {
  const [average] = useState(() => {
    const stored = readChildProgress();
    const values = childPracticeExercises.map((exercise) => computeChildProgress(stored[exercise.id], exercise.defaultRounds));
    return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  });

  return (
    <Card as="aside" className="border-[var(--accent)]/25 bg-[#fff3d6]">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[var(--accent-soft)] text-[#714909] reward-pulse">
        <Sparkles className="h-6 w-6" aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-xl font-semibold text-[var(--foreground)]">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{reward}</p>
      <p className="mt-3 text-xs leading-5 text-[var(--text-muted)]">
        {locale === "fa"
          ? "پیشرفت از جلسه‌ها و دورهای ذخیره‌شده روی همین دستگاه محاسبه می‌شود."
          : "Progress is calculated from sessions and rounds stored on this device."}
      </p>
      <div className="mt-5">
        <ProgressBar value={average} label={progressLabel} />
      </div>
      <div className="sr-only">{childPracticeExercises.map((exercise) => childText(exercise.title, locale)).join(", ")}</div>
    </Card>
  );
}
