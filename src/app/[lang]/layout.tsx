import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { AppShell } from "@/components/app-shell";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, localeDirections, locales, type Locale } from "@/i18n/config";
import "../globals.css";

export const metadata: Metadata = {
  title: "Dialog / دیالوگ",
  description: "A bilingual smart acting platform MVP for actors, coaches, directors, parents, and admins.",
  applicationName: "دیالوگ / Dialog",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "دیالوگ",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/brand/dialog-logo-circle.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#681924",
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
