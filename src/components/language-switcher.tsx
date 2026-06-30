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
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-800 transition hover:border-teal-600 hover:text-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
      aria-label={dictionary.language.switchTo}
    >
      <Languages className="h-4 w-4" aria-hidden="true" />
      {dictionary.language.switchTo}
    </Link>
  );
}
