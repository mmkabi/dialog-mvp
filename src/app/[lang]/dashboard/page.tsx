import { ArrowRight, BookOpen, BriefcaseBusiness, HeartPulse, MessageCircle, Mic2, UserRound } from "lucide-react";

import { AvatarMark, Badge, ButtonLink, Card, PageSection, ProgressBar, SectionHeader, TrustBadge } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";
import { getDashboardData, l } from "@/lib/mock-services";

export default async function DashboardPage({ params }: { params: Promise<{ lang: string }> }) {
  const { locale, dictionary } = await getRouteContext(params);
  const dashboard = getDashboardData();
  const actor = dashboard.actor;
  const actorName = `${l(actor.firstName, locale)} ${l(actor.lastName, locale)}`;
  const base = `/${locale}`;
  const modules = [
    { href: `${base}/education`, label: dictionary.nav.education, icon: <BookOpen className="h-5 w-5" /> },
    { href: `${base}/practice`, label: dictionary.nav.practice, icon: <MessageCircle className="h-5 w-5" /> },
    { href: `${base}/casting`, label: dictionary.nav.casting, icon: <BriefcaseBusiness className="h-5 w-5" /> },
    { href: `${base}/speech`, label: dictionary.nav.speech, icon: <Mic2 className="h-5 w-5" /> },
    { href: `${base}/children`, label: dictionary.nav.children, icon: <HeartPulse className="h-5 w-5" /> },
  ];

  return (
    <PageSection>
      <SectionHeader title={dictionary.dashboard.title} subtitle={dictionary.dashboard.subtitle} />
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr_0.85fr]">
        <Card as="section" className="paper-grain lg:row-span-2">
          <div className="flex items-start gap-4">
            <AvatarMark label={actorName} tone={actor.photoTone} />
            <div>
              <TrustBadge>{dictionary.dashboard.profileSummary}</TrustBadge>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-[var(--foreground)]">{actorName}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{l(actor.bio, locale)}</p>
            </div>
          </div>
          <div className="mt-5">
            <ProgressBar value={78} label={dictionary.dashboard.completion} />
          </div>
          <div className="mt-5">
            <ButtonLink href={`${base}/profile`} variant="secondary" icon={<UserRound className="h-4 w-4" />}>
              {dictionary.nav.profile}
            </ButtonLink>
          </div>
        </Card>

        <Card as="section" className="bg-[var(--surface-paper)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">{dictionary.dashboard.continueLearning}</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">{l(dashboard.learningAgent.name, locale)}</p>
          <p className="mt-1 font-medium text-[var(--accent-soft)]">{l(dashboard.learningAgent.method, locale)}</p>
          <div className="mt-5">
            <ProgressBar value={42} label={dictionary.education.progress} />
          </div>
          <div className="mt-5 flex items-center gap-2">
            <Badge tone="warm">3 {dictionary.common.streak}</Badge>
            <Badge tone="calm">124 {dictionary.common.xp}</Badge>
          </div>
          <div className="mt-5">
            <ButtonLink href={`${base}/education/${dashboard.learningAgent.id}`} icon={<ArrowRight className="h-4 w-4" />}>
              {dictionary.common.continue}
            </ButtonLink>
          </div>
        </Card>

        <Card as="section" className="border-[#b9d7d9] bg-[#edf7f7]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">{dictionary.dashboard.todaySpeech}</h2>
          <p className="mt-2 font-medium text-[#24565c]">{l(dashboard.speechExercise.title, locale)}</p>
          <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{l(dashboard.speechExercise.description, locale)}</p>
          <div className="mt-5">
            <ProgressBar value={dashboard.speechExercise.progress} label={dictionary.speech.tracker} />
          </div>
          <div className="mt-5">
            <ButtonLink href={`${base}/speech`} variant="secondary">
              {dictionary.speech.startExercise}
            </ButtonLink>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card as="section" className="paper-grain">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">{dictionary.dashboard.latestCasting}</h2>
          <div className="mt-4 divide-y divide-[var(--border-soft)]">
            {dashboard.latestCastingCalls.map((call) => (
              <div key={call.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="font-semibold text-[var(--foreground)]">{l(call.projectTitle, locale)}</p>
                  <p className="text-sm text-[var(--text-muted)]">{l(call.city, locale)}</p>
                </div>
                <ButtonLink href={`${base}/casting/${call.id}`} variant="ghost">
                  {dictionary.common.view}
                </ButtonLink>
              </div>
            ))}
          </div>
        </Card>
        <Card as="section" className="paper-grain">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">{dictionary.dashboard.latestPractice}</h2>
          <div className="mt-4 divide-y divide-[var(--border-soft)]">
            {dashboard.latestPracticeRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="font-semibold text-[var(--foreground)]">{l(request.title, locale)}</p>
                  <p className="text-sm text-[var(--text-muted)]">{l(request.cityOrOnline, locale)}</p>
                </div>
                <ButtonLink href={`${base}/practice/${request.id}`} variant="ghost">
                  {dictionary.common.view}
                </ButtonLink>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-5">
        <SectionHeader title={dictionary.dashboard.quickAccess} />
        <div className="grid gap-4 md:grid-cols-5">
          {modules.map((module) => (
            <Card key={module.href} as="article">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-[var(--accent-soft)] text-[var(--primary)]">
                {module.icon}
              </div>
              <h2 className="text-base font-semibold text-[var(--foreground)]">{module.label}</h2>
              <div className="mt-4">
                <ButtonLink href={module.href} variant="ghost">
                  {dictionary.common.view}
                </ButtonLink>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
