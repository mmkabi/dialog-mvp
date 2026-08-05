import assert from "node:assert/strict";

const {
  childPracticeExercises,
  computeChildProgress,
  emptyProgress,
} = await import("../src/lib/child-practice-content.ts");

const expectedIds = ["simple-word", "sound-imitation", "picture-choice", "short-sentence"];

assert.deepEqual(
  childPracticeExercises.map((exercise) => exercise.id),
  expectedIds,
);

for (const exercise of childPracticeExercises) {
  assert.ok(exercise.title.fa && exercise.title.en, `${exercise.id} must be bilingual`);
  assert.ok(exercise.items.length >= 2, `${exercise.id} needs real rounds`);
  assert.ok(exercise.settings.rounds.length > 0, `${exercise.id} needs round settings`);
  assert.ok(exercise.settings.levels.length > 0, `${exercise.id} needs level settings`);
}

const wordProgress = emptyProgress("simple-word");
wordProgress.completedRounds = 3;
wordProgress.results = [
  { round: 1, response: "said", at: "2026-08-06T00:00:00.000Z" },
  { round: 2, response: "gesture", at: "2026-08-06T00:00:00.000Z" },
  { round: 3, response: "noResponse", at: "2026-08-06T00:00:00.000Z" },
];

const percent = computeChildProgress(wordProgress, 5);
assert.ok(percent > 0, "participation progress should be calculated from stored rounds");
assert.ok(percent <= 100, "progress should never exceed 100");

const pictureChoice = childPracticeExercises.find((exercise) => exercise.id === "picture-choice");
assert.ok(pictureChoice.items.every((item) => item.correctChoiceId), "picture choice rounds need correct choices");

console.log("child practice engine tests passed");
