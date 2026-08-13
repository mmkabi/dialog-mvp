import { Award, Bookmark, Gauge, Settings, ShieldCheck, Sparkles, UserRound, Video } from "lucide-react";

import { AvatarMark, Badge, Card, PageSection, ProgressBar, SectionHeader } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";
import { getFeaturedActor, l } from "@/lib/mock-services";
import { navCopy, navText } from "@/lib/navigation";

export default async function MePage({ params }: { params: Promise<{ lang: string }> }) {
  const { locale, dictionary } = await getRouteContext(params);
  const base = `/${locale}`;
  const actor = getFeaturedActor();
  const actorName = `${l(actor.firstName, locale)} ${l(actor.lastName, locale)}`;
  const links = [
    { href: `${base}/profile`, label: navText(navCopy.profile, locale), icon: <UserRound className="h-5 w-5" /> },
    { href: `${base}/certificates`, label: navText(navCopy.certificates, locale), icon: <Award className="h-5 w-5" /> },
    { href: `${base}/pro`, label: navText(navCopy.achievements, locale), icon: <Sparkles className="h-5 w-5" /> },
    { href: `${base}/pro`, label: locale === "fa" ? "اجراهای من" : "My performances", icon: <Video className="h-5 w-5" /> },
    { href: `${base}/pro`, label: navText(navCopy.myFeedback, locale), icon: <Gauge className="h-5 w-5" /> },
    { href: `${base}/education`, label: navText(navCopy.courses, locale), icon: <Bookmark className="h-5 w-5" /> },
    { href: `${base}/pro`, label: navText(navCopy.subscription, locale), icon: <Sparkles className="h-5 w-5" /> },
    { href: `${base}/admin`, label: navText(navCopy.admin, locale), icon: <ShieldCheck className="h-5 w-5" /> },
    { href: `${base}/profile`, label: navText(navCopy.settings, locale), icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <PageSection>
      <SectionHeader title={navText(navCopy.me, locale)} subtitle={locale === "fa" ? "مرکز مسیر حرفه‌ای، گواهی‌ها، بازخوردها و تنظیمات شما" : "Your hub for profile, certificates, feedback, achievements, and settings"} />
      <Card as="section" className="paper-grain">
        <div className="flex items-start gap-4">
          <AvatarMark label={actorName} tone={actor.photoTone} />
          <div className="min-w-0">
            <Badge tone="warm">{dictionary.dashboard.profileSummary}</Badge>
            <h1 className="mt-3 truncate text-3xl font-bold text-[var(--foreground)]">{actorName}</h1>
            <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{l(actor.bio, locale)}</p>
          </div>
        </div>
        <div className="mt-5">
          <ProgressBar value={78} label={dictionary.dashboard.completion} />
        </div>
      </Card>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <a key={`${link.href}-${link.label}`} href={link.href} className="flex min-h-16 items-center gap-3 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-raised)] p-4 text-[var(--foreground)] shadow-sm transition hover:border-[var(--accent)]/45 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[var(--accent-soft)] text-[var(--primary)]">{link.icon}</span>
            <span className="font-bold">{link.label}</span>
          </a>
        ))}
      </div>
    </PageSection>
  );
}
