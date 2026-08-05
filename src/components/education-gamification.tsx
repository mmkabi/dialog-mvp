"use client";

import { Award, Flame, LockKeyhole, Target } from "lucide-react";
import { useState } from "react";

import { Badge, Card, ProgressBar } from "@/components/ui/primitives";
import type { Locale } from "@/i18n/config";
import { featureCopy, t } from "@/lib/feature-content";

const key = "dialog:education-progress:v1";

export function EducationGamification({
  locale,
  completed,
  total,
  xp,
}: {
  locale: Locale;
  completed: number;
  total: number;
  xp: number;
}) {
  const [localXp] = useState(() => {
    if (typeof window === "undefined") return xp;
    const stored = Number(window.localStorage.getItem(key) ?? xp);
    window.localStorage.setItem(key, String(stored));
    return stored;
  });
  const progress = Math.round((completed / Math.max(1, total)) * 100);

  const stats = [
    { icon: <Target className="h-4 w-4" />, label: t(featureCopy.progress, locale), value: `${progress}%` },
    { icon: <Flame className="h-4 w-4" />, label: t(featureCopy.streak, locale), value: "3" },
    { icon: <Award className="h-4 w-4" />, label: t(featureCopy.xp, locale), value: localXp },
    { icon: <LockKeyhole className="h-4 w-4" />, label: locale === "fa" ? "قفل درس" : "Lesson locks", value: `${completed}/${total}` },
  ];

  return (
    <Card as="section" className="border-[var(--accent)]/25 bg-[var(--surface-paper)]">
      <div className="flex flex-wrap gap-2">
        <Badge tone="warm">{locale === "fa" ? "هدف روزانه" : "Daily goal"}</Badge>
        <Badge tone="success">{locale === "fa" ? "نشان نمونه" : "Sample badge"}</Badge>
      </div>
      <div className="mt-4">
        <ProgressBar value={progress} label={locale === "fa" ? "پیشرفت دوره" : "Course progress"} />
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border border-[var(--border-soft)] bg-white p-4">
            <div className="flex items-center gap-2 text-[var(--primary)]">
              {item.icon}
              <p className="text-sm font-semibold">{item.label}</p>
            </div>
            <p className="mt-2 text-2xl font-bold text-[var(--foreground)]">{item.value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
