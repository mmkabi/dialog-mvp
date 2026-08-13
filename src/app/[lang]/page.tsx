import { ArrowRight, Award, BookOpen, BriefcaseBusiness, CalendarCheck, HeartPulse, MessageCircle, Mic2, Send, Sparkles, Trophy, UsersRound, Wind } from "lucide-react";
import Image from "next/image";

import { AvatarMark, Badge, ButtonLink, Card, PageSection, SectionHeader, TrustBadge } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";
import { featureCopy, t } from "@/lib/feature-content";
import { data, l } from "@/lib/mock-services";
import { navCopy, navText } from "@/lib/navigation";

export default async function LandingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { locale, dictionary } = await getRouteContext(params);
  const base = `/${locale}`;
  const quickActions = [
    { href: `${base}/pro`, label: navText(navCopy.submitPerformance, locale), icon: <Send className="h-5 w-5" /> },
    { href: `${base}/pro`, label: navText(navCopy.nextSession, locale), icon: <CalendarCheck className="h-5 w-5" /> },
    { href: `${base}/pro`, label: navText(navCopy.myFeedback, locale), icon: <MessageCircle className="h-5 w-5" /> },
    { href: `${base}/me`, label: navText(navCopy.achievements, locale), icon: <Trophy className="h-5 w-5" /> },
  ];
  const modules = [
    { href: `${base}/education`, label: dictionary.nav.education, body: dictionary.education.subtitle, icon: <BookOpen className="h-6 w-6" /> },
    { href: `${base}/actors`, label: dictionary.nav.actors, body: dictionary.actors.subtitle, icon: <UsersRound className="h-6 w-6" /> },
    { href: `${base}/practice`, label: dictionary.nav.practice, body: dictionary.practice.subtitle, icon: <MessageCircle className="h-6 w-6" /> },
    { href: `${base}/casting`, label: dictionary.nav.casting, body: dictionary.casting.subtitle, icon: <BriefcaseBusiness className="h-6 w-6" /> },
    { href: `${base}/speech`, label: dictionary.nav.speech, body: dictionary.speech.subtitle, icon: <Mic2 className="h-6 w-6" /> },
    { href: `${base}/speech`, label: t(featureCopy.warmupTitle, locale), body: t(featureCopy.warmupSubtitle, locale), icon: <Wind className="h-6 w-6" /> },
    { href: `${base}/children`, label: dictionary.nav.children, body: dictionary.children.subtitle, icon: <HeartPulse className="h-6 w-6" /> },
    { href: `${base}/certificates`, label: t(featureCopy.certificates, locale), body: t(featureCopy.certificatesSubtitle, locale), icon: <Award className="h-6 w-6" /> },
  ];

  return (
    <>
      <section className="px-4 pb-6 pt-5 md:hidden">
        <Card as="section" className="overflow-hidden border-[var(--accent)]/35 bg-[linear-gradient(135deg,#fffaf0,#fff0c9_54%,#f6ddaa)] p-5">
          <Badge tone="warm">{navText(navCopy.proEyebrow, locale)}</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)]">{navText(navCopy.proTitle, locale)}</h1>
          <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{navText(navCopy.proSubtitle, locale)}</p>
          <div className="mt-5">
            <ButtonLink href={`${base}/pro`} icon={<Sparkles className="h-4 w-4" />}>
              {navText(navCopy.proCta, locale)}
            </ButtonLink>
          </div>
        </Card>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <a key={action.label} href={action.href} className="min-h-28 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-raised)] p-4 shadow-sm active:scale-[0.98]">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--accent-soft)] text-[var(--primary)]">{action.icon}</span>
              <span className="mt-3 block text-sm font-bold leading-6 text-[var(--foreground)]">{action.label}</span>
            </a>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-[var(--foreground)]">{navText(navCopy.recommendedActors, locale)}</h2>
          <a href={`${base}/actors`} className="text-sm font-semibold text-[var(--primary)]">{navText(navCopy.viewAll, locale)}</a>
        </div>
        <div className="-mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-2">
          {data.actors.slice(0, 5).map((actor) => {
            const actorName = `${l(actor.firstName, locale)} ${l(actor.lastName, locale)}`;
            return (
              <a key={actor.id} href={`${base}/actors/${actor.id}`} className="w-28 shrink-0 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-raised)] p-3 text-center shadow-sm">
                <AvatarMark label={actorName} tone={actor.photoTone} size="sm" />
                <span className="mt-3 block truncate text-sm font-bold text-[var(--foreground)]">{actorName}</span>
                <span className="mt-1 block truncate text-xs text-[var(--text-muted)]">{l(actor.city, locale)}</span>
              </a>
            );
          })}
        </div>
      </section>

      <div className="hidden md:block">
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
        </div>
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[var(--background)]" />
      </section>

      <PageSection>
        <SectionHeader title={t(featureCopy.landingMainPaths, locale)} subtitle={dictionary.brand.tagline} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((module) => (
            <a
              key={`${module.href}-${module.label}`}
              href={module.href}
              aria-label={`${t(featureCopy.openModule, locale)}: ${module.label}`}
              className="spotlight-hover block min-h-56 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-raised)]/95 p-5 shadow-[var(--shadow-cinematic)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/45 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent-soft)] text-[var(--primary)] shadow-inner">
                {module.icon}
              </div>
              <h2 className="text-2xl font-semibold leading-tight text-[var(--foreground)]">{module.label}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--text-muted)]">{module.body}</p>
            </a>
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
      </div>
    </>
  );
}
