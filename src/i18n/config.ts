export const locales = ["fa", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fa";

export const localeDirections: Record<Locale, "rtl" | "ltr"> = {
  fa: "rtl",
  en: "ltr",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getOppositeLocale(locale: Locale): Locale {
  return locale === "fa" ? "en" : "fa";
}

export function localizePath(pathname: string, locale: Locale) {
  const parts = pathname.split("/");
  if (isLocale(parts[1] ?? "")) {
    parts[1] = locale;
    return parts.join("/") || `/${locale}`;
  }
  return `/${locale}${pathname === "/" ? "" : pathname}`;
}
