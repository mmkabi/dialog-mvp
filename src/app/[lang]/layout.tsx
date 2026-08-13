import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { AppShell } from "@/components/app-shell";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, localeDirections, locales, type Locale } from "@/i18n/config";
import "../globals.css";

export const metadata: Metadata = {
  title: "Dialog / دیالوگ",
  description: "A bilingual smart acting platform MVP for actors, coaches, directors, parents, and admins.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand/dialog-logo-circle.png", type: "image/png" },
    ],
    apple: [{ url: "/brand/dialog-logo-circle.png", type: "image/png" }],
  },
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale} dir={localeDirections[locale]}>
      <body>
        <AppShell locale={locale} dictionary={dictionary}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
