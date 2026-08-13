import {
  Bell,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { DesktopMainNavigation, MobileBottomNavigation } from "@/components/main-navigation";
import { ButtonLink, TrustBadge } from "@/components/ui/primitives";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages";
import { navCopy, navText } from "@/lib/navigation";

export function AppShell({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
}) {
  const base = `/${locale}`;

  return (
    <div className="min-h-screen text-[var(--foreground)]">
      <header className="sticky top-0 z-30 border-b border-[#dec89f]/80 bg-[linear-gradient(135deg,rgba(255,250,240,0.96),rgba(248,237,220,0.94)_48%,rgba(246,221,170,0.78))] text-[var(--foreground)] shadow-[0_18px_50px_rgb(108_70_28_/_12%)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/70 to-transparent" aria-hidden="true" />
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8 max-md:hidden">
          <div className="flex items-center justify-between gap-3">
            <Link href={base} className="flex min-w-0 items-center gap-3">
              <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full shadow-sm ring-1 ring-[var(--accent)]/35">
                <Image src="/brand/dialog-logo-circle.png" alt="" width={56} height={56} className="h-full w-full object-cover" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-base font-bold tracking-tight text-[var(--primary)]">{dictionary.brand.name}</span>
                <span className="block truncate text-xs text-[var(--text-muted)]">{dictionary.brand.tagline}</span>
              </span>
            </Link>
            <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/70 bg-white/42 p-1 shadow-sm">
              <ButtonLink href={`${base}/login`} variant="ghost">
                {dictionary.nav.login}
              </ButtonLink>
              <LanguageSwitcher locale={locale} dictionary={dictionary} />
            </div>
          </div>
          <DesktopMainNavigation locale={locale} />
        </div>

        <div className="mx-auto flex min-h-16 max-w-md items-center justify-between gap-3 px-4 py-2 md:hidden">
          <Link href={base} className="flex min-w-0 items-center gap-2" aria-label={dictionary.brand.name}>
            <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full shadow-sm ring-1 ring-[var(--accent)]/35">
              <Image src="/brand/dialog-logo-circle.png" alt="" width={44} height={44} className="h-full w-full object-cover" />
            </span>
            <span className="min-w-0 truncate text-sm font-bold text-[var(--primary)]">{dictionary.brand.shortName}</span>
          </Link>
          <div className="flex items-center gap-2">
            <button type="button" aria-label={navText(navCopy.notifications, locale)} className="grid h-10 w-10 place-items-center rounded-full border border-white/70 bg-white/55 text-[var(--primary)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
              <Bell className="h-4 w-4" aria-hidden="true" />
            </button>
            <button type="button" aria-label={navText(navCopy.mobileMessages, locale)} className="grid h-10 w-10 place-items-center rounded-full border border-white/70 bg-white/55 text-[var(--primary)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <main className="relative pb-24 md:pb-0">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[var(--surface-paper)] to-transparent" aria-hidden="true" />
        <div className="relative">{children}</div>
      </main>
      <footer className="border-t border-[var(--border-soft)] bg-[var(--surface-paper)] text-[var(--foreground)]">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-7 text-sm text-[var(--text-muted)] sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
            <p>{dictionary.common.reportPlaceholder}</p>
          </div>
          <Link href={`${base}/admin`} className="font-semibold text-[var(--primary)] hover:text-[var(--accent)]">
            <TrustBadge>{dictionary.nav.safety}</TrustBadge>
          </Link>
        </div>
      </footer>
      <MobileBottomNavigation locale={locale} />
    </div>
  );
}
