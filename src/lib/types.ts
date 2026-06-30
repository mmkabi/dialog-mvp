import type { Locale } from "@/i18n/config";

export type LocalizedText = Record<Locale, string>;

export type UserRole = "actor" | "director" | "coach" | "parent" | "admin";

export type Gender = "woman" | "man" | "nonBinary" | "any";

export type AvailabilityStatus = "available" | "limited" | "unavailable";

export type ActorSkill =
  | "theatre"
  | "cinema"
  | "voiceActing"
  | "dubbing"
  | "bodyMovement"
  | "speech"
  | "singing"
  | "improvisation"
  | "screenActing"
  | "stageActing";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  profileId?: string;
}

export interface PortfolioItem {
  id: string;
  title: LocalizedText;
  type: "showreel" | "photo" | "voice" | "stage";
  year: number;
  url: string;
}

export interface Profile {
  id: string;
  userId: string;
  firstName: LocalizedText;
  lastName: LocalizedText;
  photoTone: string;
  bio: LocalizedText;
  city: LocalizedText;
  age: number;
  gender: Gender;
  heightCm: number;
  voiceType: LocalizedText;
  actingResume: LocalizedText;
  skills: ActorSkill[];
  portfolioItems: PortfolioItem[];
  availability: AvailabilityStatus;
  languages: LocalizedText[];
  contactPreference: LocalizedText;
}

export type LessonState = "completed" | "inProgress" | "locked";

export interface Lesson {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  durationMinutes: number;
  xp: number;
  state: LessonState;
  practiceTask: LocalizedText;
  feedback: LocalizedText;
}

export interface TeacherAgent {
  id: string;
  name: LocalizedText;
  method: LocalizedText;
  avatarTone: string;
  description: LocalizedText;
  lessons: Lesson[];
  exercises: LocalizedText[];
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  score: number;
  xp: number;
}

export type PracticeStatus = "open" | "closed";

export interface PracticeRequest {
  id: string;
  title: LocalizedText;
  scriptName: LocalizedText;
  roleNeeded: LocalizedText;
  preferredGender: Gender;
  approximateAge: string;
  voiceType: LocalizedText;
  cityOrOnline: LocalizedText;
  proposedTime: LocalizedText;
  description: LocalizedText;
  status: PracticeStatus;
  ownerName: LocalizedText;
}

export interface PracticeApplication {
  id: string;
  requestId: string;
  userId: string;
  status: "interested" | "accepted" | "declined";
}

export type ProjectType =
  | "theatre"
  | "shortFilm"
  | "series"
  | "commercial"
  | "dubbing"
  | "studentProject";

export interface CastingCall {
  id: string;
  projectTitle: LocalizedText;
  projectType: ProjectType;
  requiredRoles: LocalizedText[];
  gender: Gender;
  ageRange: string;
  city: LocalizedText;
  auditionDate: string;
  description: LocalizedText;
  status: PracticeStatus;
  projectOwner: LocalizedText;
}

export interface CastingApplication {
  id: string;
  castingCallId: string;
  userId: string;
  status: "sent" | "reviewing" | "shortlisted";
}

export interface SpeechExercise {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  durationMinutes: number;
  progress: number;
  tone: "calm" | "focus" | "confidence";
}

export interface ChildExercise {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  ageBand: string;
  progress: number;
  parentNote: LocalizedText;
}

export interface AdminStats {
  totalUsers: number;
  totalActors: number;
  totalCastingCalls: number;
  totalPracticeRequests: number;
  reportedContent: number;
  recentActivity: LocalizedText[];
}
