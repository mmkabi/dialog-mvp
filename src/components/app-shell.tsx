import {
  BookOpen,
  BriefcaseBusiness,
  HeartPulse,
  LayoutDashboard,
  MessageCircle,
  Mic2,
  ShieldCheck,
  Sparkles,
  Theater,
  UserRound,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { ButtonLink, TrustBadge, cn } from "@/components/ui/primitives";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages";

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
    { href: `${base}/admin`, label: dictionary.nav.admin, icon: <ShieldCheck className={iconClass} /> },
  ];

  return (
    <div className="min-h-screen text-[var(--foreground)]">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[var(--stage-black)]/92 text-white shadow-2xl shadow-black/15 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <Link href={base} className="flex min-w-0 items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[var(--primary)] via-[#2a1113] to-black text-[var(--accent-soft)] ring-1 ring-[var(--accent)]/30">
                <Theater className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-base font-bold tracking-tight">{dictionary.brand.name}</span>
                <span className="block truncate text-xs text-white/58">{dictionary.brand.tagline}</span>
              </span>
            </Link>
            <div className="flex shrink-0 items-center gap-2">
              <ButtonLink href={`${base}/login`} variant="ghost">
                {dictionary.nav.login}
              </ButtonLink>
              <LanguageSwitcher locale={locale} dictionary={dictionary} />
            </div>
          </div>
          <nav aria-label={dictionary.nav.dashboard} className="overflow-x-auto">
            <div className="flex min-w-max gap-2 pb-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex min-h-10 items-center gap-2 rounded-full border border-transparent px-3.5 py-2 text-sm font-medium text-white/68 transition hover:border-[var(--accent)]/30 hover:bg-white/8 hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]",
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
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[var(--stage-black)] to-transparent" aria-hidden="true" />
        <div className="relative">{children}</div>
      </main>
      <footer className="border-t border-[var(--border-soft)] bg-[var(--stage-black)] text-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-7 text-sm text-white/68 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
            <p>{dictionary.common.reportPlaceholder}</p>
          </div>
          <Link href={`${base}/admin`} className="font-semibold text-[var(--accent-soft)] hover:text-white">
            <TrustBadge>{dictionary.nav.safety}</TrustBadge>
          </Link>
        </div>
      </footer>
    </div>
  );
}
