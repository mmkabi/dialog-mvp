"use client";

import {
  childStoreKey,
  computeChildProgress,
  emptyProgress,
  type ChildPracticeId,
  type ChildPracticeProgress,
} from "@/lib/child-practice-content";

export function readChildProgress(): Record<ChildPracticeId, ChildPracticeProgress> {
  const fallback = {
    "simple-word": emptyProgress("simple-word"),
    "sound-imitation": emptyProgress("sound-imitation"),
    "picture-choice": emptyProgress("picture-choice"),
    "short-sentence": emptyProgress("short-sentence"),
  };

  if (typeof window === "undefined") return fallback;

  try {
    return { ...fallback, ...JSON.parse(window.localStorage.getItem(childStoreKey) ?? "{}") };
  } catch {
    return fallback;
  }
}

export function writeChildProgress(progress: Record<ChildPracticeId, ChildPracticeProgress>) {
  window.localStorage.setItem(childStoreKey, JSON.stringify(progress));
}

export function getStoredProgressPercent(exerciseId: ChildPracticeId, defaultRounds: number) {
  const progress = readChildProgress()[exerciseId] ?? emptyProgress(exerciseId);
  return computeChildProgress(progress, defaultRounds);
}
