import { BookOpen, Compass, Home, Sparkles, UserRound } from "lucide-react";

import type { Locale } from "@/i18n/config";

const text = (fa: string, en: string) => ({ fa, en });

export function navText(value: { fa: string; en: string }, locale: Locale) {
  return value[locale];
}

export const navCopy = {
  home: text("خانه", "Home"),
  education: text("آموزش", "Learn"),
  pro: text("دیالوگ پرو", "Dialog Pro"),
  discover: text("کشف", "Discover"),
  me: text("من", "Me"),
  mobileMessages: text("پیام‌ها", "Messages"),
  notifications: text("اعلان‌ها", "Notifications"),
  proEyebrow: text("مسیر حرفه‌ای", "Professional path"),
  proTitle: text("دیالوگ پرو", "Dialog Pro"),
  proSubtitle: text(
    "دسترسی مستقیم به بازیگران حرفه‌ای، دریافت بازخورد و مشاوره تخصصی برای رشد مسیر اجرایی شما.",
    "Direct access to professional actors, focused feedback, and expert guidance for your performance path.",
  ),
  proCta: text("مشاهده دیالوگ پرو", "View Dialog Pro"),
  submitPerformance: text("ارسال اجرا", "Submit performance"),
  nextSession: text("جلسه بعدی", "Next session"),
  myFeedback: text("بازخوردهای من", "My feedback"),
  achievements: text("دستاوردها", "Achievements"),
  recommendedActors: text("پیشنهاد برای شما", "Recommended for you"),
  viewAll: text("مشاهده همه", "View all"),
  discoverSubtitle: text("آدم‌ها و فرصت‌های جدید را پیدا کن", "Find new people and opportunities"),
  actors: text("بازیگران", "Actors"),
  casting: text("فراخوان‌ها", "Casting"),
  practice: text("پارتنر تمرین", "Practice partners"),
  speech: text("بیان و گفتار", "Speech"),
  children: text("کودکان", "Children"),
  courses: text("دوره‌های من", "My courses"),
  profile: text("پروفایل", "Profile"),
  certificates: text("گواهی‌ها", "Certificates"),
  admin: text("مدیریت", "Admin"),
  settings: text("تنظیمات", "Settings"),
  saved: text("ذخیره‌شده‌ها", "Saved items"),
  subscription: text("اشتراک / دیالوگ پرو", "Subscription / Dialog Pro"),
};

export function getMainNavigation(locale: Locale) {
  const base = `/${locale}`;
  return [
    { id: "home", href: base, label: navText(navCopy.home, locale), icon: Home, match: [base] },
    { id: "education", href: `${base}/education`, label: navText(navCopy.education, locale), icon: BookOpen, match: [`${base}/education`, `${base}/speech`, `${base}/children`] },
    { id: "pro", href: `${base}/pro`, label: navText(navCopy.pro, locale), icon: Sparkles, match: [`${base}/pro`] },
    { id: "discover", href: `${base}/discover`, label: navText(navCopy.discover, locale), icon: Compass, match: [`${base}/discover`, `${base}/actors`, `${base}/casting`, `${base}/practice`] },
    { id: "me", href: `${base}/me`, label: navText(navCopy.me, locale), icon: UserRound, match: [`${base}/me`, `${base}/profile`, `${base}/certificates`, `${base}/dashboard`, `${base}/admin`] },
  ];
}

export function isNavigationActive(pathname: string, item: ReturnType<typeof getMainNavigation>[number]) {
  if (item.id === "home") return pathname === item.href || pathname === `${item.href}/`;
  return item.match.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}
