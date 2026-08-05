import {
  BookOpen,
  Award,
  BriefcaseBusiness,
  HeartPulse,
  LayoutDashboard,
  MessageCircle,
  Mic2,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { ButtonLink, TrustBadge, cn } from "@/components/ui/primitives";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages";
import { featureCopy, t } from "@/lib/feature-content";

const iconClass = "h-4 w-4";

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
  const navItems = [
    { href: `${base}/dashboard`, label: dictionary.nav.dashboard, icon: <LayoutDashboard className={iconClass} /> },
    { href: `${base}/profile`, label: dictionary.nav.profile, icon: <UserRound className={iconClass} /> },
    { href: `${base}/actors`, label: dictionary.nav.actors, icon: <UsersRound className={iconClass} /> },
    { href: `${base}/education`, label: dictionary.nav.education, icon: <BookOpen className={iconClass} /> },
    { href: `${base}/practice`, label: dictionary.nav.practice, icon: <MessageCircle className={iconClass} /> },
    { href: `${base}/casting`, label: dictionary.nav.casting, icon: <BriefcaseBusiness className={iconClass} /> },
    { href: `${base}/speech`, label: dictionary.nav.speech, icon: <Mic2 className={iconClass} /> },
    { href: `${base}/children`, label: dictionary.nav.children, icon: <HeartPulse className={iconClass} /> },
    { href: `${base}/certificates`, label: t(featureCopy.certificates, locale), icon: <Award className={iconClass} /> },
    { href: `${base}/admin`, label: dictionary.nav.admin, icon: <ShieldCheck className={iconClass} /> },
  ];

  return (
    <div className="min-h-screen text-[var(--foreground)]">
      <header className="sticky top-0 z-30 border-b border-[#dec89f]/80 bg-[linear-gradient(135deg,rgba(255,250,240,0.96),rgba(248,237,220,0.94)_48%,rgba(246,221,170,0.78))] text-[var(--foreground)] shadow-[0_18px_50px_rgb(108_70_28_/_12%)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/70 to-transparent" aria-hidden="true" />
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <Link href={base} className="flex min-w-0 items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white shadow-inner shadow-white/60 ring-1 ring-[var(--accent)]/45">
                <Image src="/brand/dialog-logo.svg" alt="" width={42} height={34} className="h-10 w-10 object-contain" />
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
          <nav aria-label={dictionary.nav.dashboard} className="overflow-x-auto">
            <div className="flex min-w-max gap-2 rounded-full border border-white/55 bg-white/35 p-1 shadow-inner shadow-white/40">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex min-h-10 items-center gap-2 rounded-full border border-transparent px-3.5 py-2 text-sm font-semibold text-[#6d5e4d] transition hover:border-[var(--accent)]/35 hover:bg-[var(--surface-paper)] hover:text-[var(--primary)] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]",
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>
      <main className="relative">
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
    </div>
  );
}
