import { notFound } from "next/navigation";

import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";

export async function getRouteContext(params: Promise<{ lang: string }>) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dictionary = await getDictionary(locale);
  return { locale, dictionary };
}
