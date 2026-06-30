import { ArrowRight, BookOpen, BriefcaseBusiness, HeartPulse, MessageCircle, Mic2, UserRound } from "lucide-react";

import { AvatarMark, Badge, ButtonLink, Card, PageSection, ProgressBar, SectionHeader } from "@/components/ui/primitives";
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
      <div className="grid gap-5 lg:grid-cols-3">
        <Card as="section">
          <div className="flex items-start gap-4">
            <AvatarMark label={actorName} tone={actor.photoTone} />
            <div>
              <h2 className="text-lg font-semibold text-zinc-950">{dictionary.dashboard.profileSummary}</h2>
              <p className="mt-1 font-medium text-zinc-800">{actorName}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{l(actor.bio, locale)}</p>
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

        <Card as="section">
          <h2 className="text-lg font-semibold text-zinc-950">{dictionary.dashboard.continueLearning}</h2>
          <p className="mt-2 text-sm text-zinc-600">{l(dashboard.learningAgent.name, locale)}</p>
          <p className="mt-1 font-medium text-zinc-900">{l(dashboard.learningAgent.method, locale)}</p>
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

        <Card as="section">
          <h2 className="text-lg font-semibold text-zinc-950">{dictionary.dashboard.todaySpeech}</h2>
          <p className="mt-2 font-medium text-zinc-900">{l(dashboard.speechExercise.title, locale)}</p>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{l(dashboard.speechExercise.description, locale)}</p>
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
        <Card as="section">
          <h2 className="text-lg font-semibold text-zinc-950">{dictionary.dashboard.latestCasting}</h2>
          <div className="mt-4 divide-y divide-zinc-100">
            {dashboard.latestCastingCalls.map((call) => (
              <div key={call.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="font-medium text-zinc-900">{l(call.projectTitle, locale)}</p>
                  <p className="text-sm text-zinc-500">{l(call.city, locale)}</p>
                </div>
                <ButtonLink href={`${base}/casting/${call.id}`} variant="ghost">
                  {dictionary.common.view}
                </ButtonLink>
              </div>
            ))}
          </div>
        </Card>
        <Card as="section">
          <h2 className="text-lg font-semibold text-zinc-950">{dictionary.dashboard.latestPractice}</h2>
          <div className="mt-4 divide-y divide-zinc-100">
            {dashboard.latestPracticeRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="font-medium text-zinc-900">{l(request.title, locale)}</p>
                  <p className="text-sm text-zinc-500">{l(request.cityOrOnline, locale)}</p>
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
      </div>
    </PageSection>
  );
}
