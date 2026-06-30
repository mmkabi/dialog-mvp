import { ArrowRight, BookOpen, BriefcaseBusiness, HeartPulse, MessageCircle, Mic2, UsersRound } from "lucide-react";
import Image from "next/image";

import { Badge, ButtonLink, Card, PageSection, SectionHeader } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";

export default async function LandingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { locale, dictionary } = await getRouteContext(params);
  const base = `/${locale}`;
  const modules = [
    { href: `${base}/education`, label: dictionary.nav.education, icon: <BookOpen className="h-5 w-5" /> },
    { href: `${base}/practice`, label: dictionary.nav.practice, icon: <MessageCircle className="h-5 w-5" /> },
    { href: `${base}/casting`, label: dictionary.nav.casting, icon: <BriefcaseBusiness className="h-5 w-5" /> },
    { href: `${base}/speech`, label: dictionary.nav.speech, icon: <Mic2 className="h-5 w-5" /> },
    { href: `${base}/children`, label: dictionary.nav.children, icon: <HeartPulse className="h-5 w-5" /> },
  ];

  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden">
        <Image
          src="/images/dialog-stage-hero.png"
          alt={dictionary.brand.tagline}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-[#f7f4ef]" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white drop-shadow-sm">
            <Badge tone="warm">{dictionary.landing.eyebrow}</Badge>
            <h1 className="mt-5 text-5xl font-semibold sm:text-6xl">{dictionary.landing.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90">{dictionary.landing.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`${base}/dashboard`} icon={<ArrowRight className="h-4 w-4" />}>
                {dictionary.landing.primaryCta}
              </ButtonLink>
              <ButtonLink href={`${base}/actors`} variant="secondary" icon={<UsersRound className="h-4 w-4" />}>
                {dictionary.landing.secondaryCta}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <PageSection>
        <SectionHeader title={dictionary.landing.moduleTitle} subtitle={dictionary.brand.tagline} />
        <div className="grid gap-4 md:grid-cols-5">
          {modules.map((module) => (
            <Card key={module.href} as="article" className="transition hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-teal-100 text-teal-800">
                {module.icon}
              </div>
              <h2 className="text-base font-semibold text-zinc-950">{module.label}</h2>
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
        <Card as="section">
          <h2 className="text-2xl font-semibold text-zinc-950">{dictionary.landing.audienceTitle}</h2>
          <p className="mt-3 leading-7 text-zinc-600">{dictionary.landing.audienceBody}</p>
        </Card>
        <Card as="section">
          <h2 className="text-2xl font-semibold text-zinc-950">{dictionary.landing.trustTitle}</h2>
          <p className="mt-3 leading-7 text-zinc-600">{dictionary.landing.trustBody}</p>
        </Card>
      </PageSection>
    </>
  );
}
