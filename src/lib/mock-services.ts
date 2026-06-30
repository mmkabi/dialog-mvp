import type { Locale } from "@/i18n/config";
import {
  actorProfiles,
  adminStats,
  castingCalls,
  childExercises,
  practiceRequests,
  speechExercises,
  teacherAgents,
} from "@/lib/mock-data";
import type { LocalizedText } from "@/lib/types";

export function l(value: LocalizedText, locale: Locale) {
  return value[locale];
}

export function getFeaturedActor() {
  return actorProfiles[0];
}

export function getActor(id: string) {
  return actorProfiles.find((actor) => actor.id === id);
}

export function getTeacherAgent(id: string) {
  return teacherAgents.find((agent) => agent.id === id);
}

export function getLesson(agentId: string, lessonId: string) {
  const agent = getTeacherAgent(agentId);
  return agent?.lessons.find((item) => item.id === lessonId);
}

export function getPracticeRequest(id: string) {
  return practiceRequests.find((request) => request.id === id);
}

export function getCastingCall(id: string) {
  return castingCalls.find((call) => call.id === id);
}

export function getDashboardData() {
  return {
    actor: getFeaturedActor(),
    learningAgent: teacherAgents[0],
    latestCastingCalls: castingCalls.slice(0, 2),
    latestPracticeRequests: practiceRequests.slice(0, 2),
    speechExercise: speechExercises[0],
    modules: ["education", "practice", "casting", "speech", "children"] as const,
  };
}

export function getAdminData() {
  return {
    stats: adminStats,
    reportedSamples: [
      {
        id: "report-1",
        type: "profile",
        summary: {
          fa: "تصویر پروفایل نیازمند بازبینی است.",
          en: "A profile image needs moderation review.",
        },
      },
      {
        id: "report-2",
        type: "casting",
        summary: {
          fa: "یک متن فراخوان برای زبان تبعیض‌آمیز گزارش شده است.",
          en: "A casting call was reported for potentially discriminatory wording.",
        },
      },
    ],
  };
}

export const data = {
  actors: actorProfiles,
  teachers: teacherAgents,
  practiceRequests,
  castingCalls,
  speechExercises,
  childExercises,
};
