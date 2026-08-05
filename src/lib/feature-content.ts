import type { Locale } from "@/i18n/config";
import type { LocalizedText } from "@/lib/types";

export const text = (fa: string, en: string): LocalizedText => ({ fa, en });

export function t(value: LocalizedText, locale: Locale) {
  return value[locale];
}

export const featureCopy = {
  landingMainPaths: text("مسیرهای اصلی دیالوگ", "Dialog core paths"),
  openModule: text("باز کردن مسیر", "Open path"),
  warmupTitle: text("گرم‌کردن صدا", "Voice warmup"),
  warmupSubtitle: text("برنامه روزانه ۳، ۵ یا ۱۰ دقیقه‌ای با تنفس، کشش صدا، تلفظ و خواندن آرام.", "A 3, 5, or 10 minute guided daily routine with breathing, gentle voice stretch, pronunciation, and slow reading."),
  certificates: text("گواهی پایان‌دوره", "Course certificates"),
  certificatesSubtitle: text("صدور گواهی فقط پس از تکمیل معیارهای دوره و با شماره سریال قابل اعتبارسنجی.", "Certificates are issued only after course criteria are met and include a verifiable serial number."),
  communicationStudio: text("استودیوی ارتباط با استاد", "Teacher communication studio"),
  communicationSubtitle: text("چت، ارسال فایل تمرین و تماس ویدیویی در حالت Mock؛ آماده اتصال به ارائه‌دهنده واقعی.", "Mock chat, practice upload, and video call controls, ready for future provider integration."),
  mockBoundary: text("این ارتباط آزمایشی است و تماس زنده واقعی محسوب نمی‌شود.", "This is a mock connection and is not a real live call."),
  roleNotice: text("نمای هنرجو فقط مکالمات و فایل‌های خودش را می‌بیند؛ نقش استاد و مدیر در نسخه بعدی به پنل جدا وصل می‌شود.", "The student view only sees their own conversations and files; coach and admin roles can be wired to separate panels later."),
  completed: text("تکمیل شد", "Completed"),
  saved: text("ذخیره شد", "Saved"),
  start: text("شروع", "Start"),
  pause: text("توقف", "Pause"),
  resume: text("ادامه", "Resume"),
  reset: text("شروع مجدد", "Reset"),
  next: text("بعدی", "Next"),
  previous: text("قبلی", "Previous"),
  skip: text("ردکردن", "Skip"),
  finish: text("پایان و ثبت", "Finish and save"),
  cycles: text("تعداد چرخه", "Cycles"),
  timer: text("زمان", "Timer"),
  progress: text("پیشرفت", "Progress"),
  xp: text("امتیاز XP", "XP"),
  streak: text("تداوم روزانه", "Streak"),
  recording: text("در حال ضبط", "Recording"),
  record: text("ضبط صدا", "Record audio"),
  stopRecording: text("توقف ضبط", "Stop recording"),
  playRecording: text("پخش ضبط", "Play recording"),
  micDenied: text("دسترسی به میکروفن ممکن نیست. مجوز مرورگر را بررسی کنید یا تمرین را بدون ضبط ثبت کنید.", "Microphone access is unavailable. Check browser permission or save the exercise without recording."),
  unsupportedRecorder: text("مرورگر شما ضبط صدا را پشتیبانی نمی‌کند.", "Your browser does not support audio recording."),
  selfAssessment: text("خودارزیابی", "Self-assessment"),
  clarity: text("وضوح", "Clarity"),
  calm: text("آرامش", "Calm"),
  rhythm: text("ریتم", "Rhythm"),
  confidence: text("اعتمادبه‌نفس", "Confidence"),
  noFakeAi: text("در این نسخه امتیاز هوش مصنوعی جعلی تولید نمی‌شود؛ ارزیابی فقط خودارزیابی کاربر است.", "This version does not generate fake AI scores; evaluation is user self-assessment only."),
  completedCourses: text("دوره‌های تکمیل‌شده", "Completed courses"),
  requirements: text("شرایط دریافت", "Requirements"),
  preview: text("پیش‌نمایش گواهی", "Certificate preview"),
  issueCertificate: text("صدور گواهی", "Issue certificate"),
  verifyCertificate: text("اعتبارسنجی گواهی", "Verify certificate"),
  downloadPdf: text("چاپ / دانلود PDF", "Print / download PDF"),
  ineligible: text("هنوز واجد شرایط صدور نیست؛ درس‌های قفل‌شده باید تکمیل شوند.", "Not eligible yet; locked lessons must be completed first."),
  eligible: text("واجد شرایط صدور گواهی نمونه هستید.", "Eligible for the sample certificate."),
};

export type SpeechExerciseKind = "breathing" | "voice-stretch" | "pronunciation" | "slow-reading" | "confidence";

export const speechPracticeContent: Array<{
  id: SpeechExerciseKind;
  title: LocalizedText;
  summary: LocalizedText;
  steps: LocalizedText[];
  durationSeconds: number;
  xp: number;
}> = [
  {
    id: "breathing",
    title: text("تنفس چهارمرحله‌ای", "Four-step breathing"),
    summary: text("دم، نگه‌داشتن، بازدم و مکث با شمارش آرام.", "Inhale, hold, exhale, and rest with calm counting."),
    durationSeconds: 16,
    xp: 12,
    steps: [text("دم", "Inhale"), text("نگه‌داشتن", "Hold"), text("بازدم", "Exhale"), text("مکث", "Rest")],
  },
  {
    id: "voice-stretch",
    title: text("کشش ملایم صدا", "Gentle voice stretching"),
    summary: text("هوم‌کردن، لرزش لب و حرکت نرم صدا بدون فشار به گلو.", "Humming, lip trill, and soft vocal movement without throat strain."),
    durationSeconds: 45,
    xp: 14,
    steps: [text("هوم آرام", "Soft hum"), text("لرزش لب", "Lip trill"), text("حرکت ملایم صدا", "Gentle glide")],
  },
  {
    id: "pronunciation",
    title: text("تمرین تلفظ واژه", "Pronunciation practice"),
    summary: text("واژه را بخوانید، ضبط کنید، پخش کنید و تکرار را ثبت کنید.", "Read, record, play back, and log repetitions."),
    durationSeconds: 60,
    xp: 16,
    steps: [text("باران", "rain"), text("روشنایی", "clarity"), text("نمایش", "performance"), text("آرام", "calm")],
  },
  {
    id: "slow-reading",
    title: text("خواندن آهسته", "Slow reading"),
    summary: text("متن کوتاه با تله‌پرامپتر، تنظیم سرعت، ضبط و ثبت تکمیل.", "Short text with teleprompter pacing, recording, and completion save."),
    durationSeconds: 75,
    xp: 18,
    steps: [text("من آرام می‌خوانم، نفس را کوتاه نگه می‌دارم و پایان جمله را روشن ادا می‌کنم.", "I read calmly, keep the breath small, and land the end of the sentence clearly.")],
  },
  {
    id: "confidence",
    title: text("اعتماد به بیان", "Speaking confidence"),
    summary: text("آماده‌سازی کوتاه، اجرای جمله و خودارزیابی وضوح، آرامش، ریتم و اعتماد.", "Short preparation, performance, and self-rating for clarity, calm, rhythm, and confidence."),
    durationSeconds: 90,
    xp: 20,
    steps: [text("امروز با صدای روشن، آرام و قابل شنیدن صحبت می‌کنم.", "Today I speak with a clear, calm, audible voice.")],
  },
];

export const warmupPrograms = [
  { minutes: 3, steps: ["breathing", "voice-stretch", "pronunciation"] as SpeechExerciseKind[] },
  { minutes: 5, steps: ["breathing", "voice-stretch", "pronunciation", "slow-reading"] as SpeechExerciseKind[] },
  { minutes: 10, steps: ["breathing", "voice-stretch", "pronunciation", "slow-reading", "confidence"] as SpeechExerciseKind[] },
];

export const certificates = [
  {
    id: "cert-stanislavski-foundation",
    serial: "DLG-2026-STN-0001",
    student: text("نوا راد", "Nava Rad"),
    course: text("نمونه: مبانی سیستم استانیسلاوسکی", "Sample: Stanislavski System Foundations"),
    teacher: text("بازسازی آموزشی دیالوگ", "Dialog educational reconstruction"),
    completedAt: "2026-08-05",
    progress: 100,
    eligible: true,
  },
  {
    id: "cert-meisner-practice",
    serial: "DLG-2026-MSN-0002",
    student: text("نوا راد", "Nava Rad"),
    course: text("نمونه: تمرین شنیدن و پاسخ لحظه‌ای", "Sample: Listening and moment-to-moment response"),
    teacher: text("بازسازی آموزشی دیالوگ", "Dialog educational reconstruction"),
    completedAt: "",
    progress: 67,
    eligible: false,
  },
];
