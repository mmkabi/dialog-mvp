import type { Locale } from "@/i18n/config";

export const pwaCopy = {
  fa: {
    installTitle: "دیالوگ را نصب کنید",
    installBody: "برای دسترسی سریع‌تر، دیالوگ را مثل یک اپ روی موبایل باز کنید.",
    installAction: "نصب",
    iosTitle: "افزودن به صفحه اصلی",
    iosBody: "در Safari دکمه Share را بزنید و Add to Home Screen را انتخاب کنید.",
    updateTitle: "نسخه جدید دیالوگ آماده است",
    updateAction: "به‌روزرسانی",
    dismiss: "بعدا",
  },
  en: {
    installTitle: "Install Dialog",
    installBody: "Open Dialog like a mobile app for faster access.",
    installAction: "Install",
    iosTitle: "Add to Home Screen",
    iosBody: "In Safari, tap Share and choose Add to Home Screen.",
    updateTitle: "A new Dialog version is ready",
    updateAction: "Update",
    dismiss: "Later",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export function isStandaloneMode() {
  if (typeof window === "undefined") return false;
  const navigatorWithStandalone = window.navigator as Navigator & { standalone?: boolean };
  return window.matchMedia("(display-mode: standalone)").matches || navigatorWithStandalone.standalone === true;
}

export function isIosSafari() {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent;
  const isIos = /iPad|iPhone|iPod/.test(ua) || (ua.includes("Macintosh") && "ontouchend" in document);
  const isSafari = /^((?!chrome|android|crios|fxios|edgios).)*safari/i.test(ua);
  return isIos && isSafari;
}
