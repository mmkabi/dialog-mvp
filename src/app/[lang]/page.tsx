import { ArrowRight, BookOpen, BriefcaseBusiness, HeartPulse, MessageCircle, Mic2, UsersRound } from "lucide-react";
import Image from "next/image";

import { Badge, ButtonLink, Card, PageSection, SectionHeader, TrustBadge } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";

export default async function LandingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { locale, dictionary } = await getRouteContext(params);
  const base = `/${locale}`;
  const modules = [
    { href: `${base}/education`, label: dictionary.nav.education, icon: <BookOpen className="h-5 w-5" /> },
    { href: `${base}/actors`, label: dictionary.nav.actors, icon: <UsersRound className="h-5 w-5" /> },
    { href: `${base}/practice`, label: dictionary.nav.practice, icon: <MessageCircle className="h-5 w-5" /> },
    { href: `${base}/casting`, label: dictionary.nav.casting, icon: <BriefcaseBusiness className="h-5 w-5" /> },
    { href: `${base}/speech`, label: dictionary.nav.speech, icon: <Mic2 className="h-5 w-5" /> },
    { href: `${base}/children`, label: dictionary.nav.children, icon: <HeartPulse className="h-5 w-5" /> },
  ];

  return (
    <>
      <section className="stage-vignette relative min-h-[86vh] overflow-hidden text-[var(--foreground)]">
        <Image
          src="/images/dialog-stage-hero-light.png"
          alt={dictionary.brand.tagline}
          fill
          priority
          sizes="100vw"
          className="hero-bg-image object-cover opacity-[0.78]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_8%,rgba(245,192,92,0.18),transparent_28rem),linear-gradient(180deg,rgba(255,248,234,0.08),rgba(246,239,227,0.72)_86%)]" />
        <div className="relative mx-auto grid min-h-[86vh] max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <div className="reveal-up max-w-3xl drop-shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="warm">{dictionary.landing.eyebrow}</Badge>
              <TrustBadge>{dictionary.language.current}</TrustBadge>
            </div>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">{dictionary.landing.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-[var(--text-muted)]">{dictionary.landing.subtitle}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`${base}/dashboard`} icon={<ArrowRight className="h-4 w-4" />}>
                {dictionary.landing.primaryCta}
              </ButtonLink>
              <ButtonLink href={`${base}/actors`} variant="secondary" icon={<UsersRound className="h-4 w-4" />}>
                {dictionary.landing.secondaryCta}
              </ButtonLink>
            </div>
          </div>
          <div className="reveal-up hidden lg:block">
            <div className="paper-grain rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface-paper)]/80 p-5 shadow-2xl shadow-[rgb(100_70_30_/_12%)] backdrop-blur">
              <div className="rounded-[1.5rem] border border-[var(--accent)]/25 bg-[var(--surface-raised)] p-5">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[var(--primary)]">{dictionary.brand.shortName}</p>
                    <p className="mt-1 text-2xl font-semibold">{dictionary.landing.moduleTitle}</p>
                  </div>
                  <Badge tone="warm">{dictionary.nav.education}</Badge>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm text-[var(--text-muted)]">
                  <div className="rounded-2xl bg-[var(--surface-warm)] p-3">{dictionary.nav.casting}</div>
                  <div className="rounded-2xl bg-[var(--surface-warm)] p-3">{dictionary.nav.practice}</div>
                  <div className="rounded-2xl bg-[var(--surface-warm)] p-3">{dictionary.nav.education}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[var(--background)]" />
      </section>

      <PageSection>
        <SectionHeader title={dictionary.landing.moduleTitle} subtitle={dictionary.brand.tagline} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((module) => (
            <Card key={`${module.href}-${module.label}`} as="article" className="min-h-44">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent-soft)] text-[var(--primary)] shadow-inner">
                {module.icon}
              </div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">{module.label}</h2>
              <div className="mt-4">
                <ButtonLink href={module.href} variant="ghost">
                  {dictionary.common.view}
                </ButtonLink>
              </div>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection className="grid gap-5 md:grid-cols-2">
        <Card as="section" className="paper-grain">
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">{dictionary.landing.audienceTitle}</h2>
          <p className="mt-4 leading-8 text-[var(--text-muted)]">{dictionary.landing.audienceBody}</p>
        </Card>
        <Card as="section" className="paper-grain">
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">{dictionary.landing.trustTitle}</h2>
          <p className="mt-4 leading-8 text-[var(--text-muted)]">{dictionary.landing.trustBody}</p>
        </Card>
      </PageSection>
    </>
  );
}
