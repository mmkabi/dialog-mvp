import { BriefcaseBusiness, MessageCircle, Search, UsersRound } from "lucide-react";

import { Badge, ButtonLink, Card, PageSection, SectionHeader } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";
import { data, l } from "@/lib/mock-services";
import { navCopy, navText } from "@/lib/navigation";

export default async function DiscoverPage({ params }: { params: Promise<{ lang: string }> }) {
  const { locale, dictionary } = await getRouteContext(params);
  const base = `/${locale}`;
  const tabs = [
    { href: `${base}/actors`, label: navText(navCopy.actors, locale), icon: <UsersRound className="h-5 w-5" />, body: dictionary.actors.subtitle },
    { href: `${base}/casting`, label: navText(navCopy.casting, locale), icon: <BriefcaseBusiness className="h-5 w-5" />, body: dictionary.casting.subtitle },
    { href: `${base}/practice`, label: navText(navCopy.practice, locale), icon: <MessageCircle className="h-5 w-5" />, body: dictionary.practice.subtitle },
  ];

  return (
    <PageSection>
      <SectionHeader
        title={navText(navCopy.discover, locale)}
        subtitle={navText(navCopy.discoverSubtitle, locale)}
        action={<ButtonLink href={`${base}/actors`} variant="secondary" icon={<Search className="h-4 w-4" />}>{dictionary.common.search}</ButtonLink>}
      />
      <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <a key={tab.href} href={tab.href} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--surface-paper)] px-4 text-sm font-bold text-[var(--primary)]">
            {tab.icon}
            {tab.label}
          </a>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {tabs.map((tab) => (
          <Card key={tab.href} as="section">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--accent-soft)] text-[var(--primary)]">{tab.icon}</span>
            <h2 className="mt-4 text-2xl font-semibold text-[var(--foreground)]">{tab.label}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{tab.body}</p>
            <div className="mt-5">
              <ButtonLink href={tab.href} variant="ghost">{dictionary.common.view}</ButtonLink>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-bold text-[var(--foreground)]">{navText(navCopy.recommendedActors, locale)}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.actors.slice(0, 3).map((actor) => (
            <a key={actor.id} href={`${base}/actors/${actor.id}`} className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-raised)] p-4 shadow-sm">
              <Badge tone="warm">{l(actor.city, locale)}</Badge>
              <h3 className="mt-3 text-lg font-bold text-[var(--foreground)]">{l(actor.firstName, locale)} {l(actor.lastName, locale)}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--text-muted)]">{l(actor.bio, locale)}</p>
            </a>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
