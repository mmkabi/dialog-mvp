"use client";

import { Languages } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "@/i18n/config";
import { getOppositeLocale, localizePath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages";

export function LanguageSwitcher({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const pathname = usePathname();
  const nextLocale = getOppositeLocale(locale);
  const href = localizePath(pathname || `/${locale}`, nextLocale);

  return (
    <Link
      href={href}
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-soft)]/50 px-3.5 py-2 text-sm font-semibold text-[var(--primary)] shadow-inner shadow-white/35 transition hover:border-[var(--accent)]/60 hover:bg-[var(--accent-soft)]/75 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      aria-label={dictionary.language.switchTo}
    >
      <Languages className="h-4 w-4" aria-hidden="true" />
      {dictionary.language.switchTo}
    </Link>
  );
}
