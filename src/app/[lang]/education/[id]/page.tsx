import { BookOpen, MessageCircle, PlayCircle } from "lucide-react";
import { notFound } from "next/navigation";

import {
  AvatarMark,
  Badge,
  ButtonLink,
  Card,
  PageSection,
  ProgressBar,
  SafetyNote,
  SectionHeader,
} from "@/components/ui/primitives";
import { EducationGamification } from "@/components/education-gamification";
import { TeacherStudioClient } from "@/components/teacher-studio-client";
import { getRouteContext } from "@/i18n/route-context";
import { locales } from "@/i18n/config";
import { data, getTeacherAgent, l } from "@/lib/mock-services";

export function generateStaticParams() {
  return locales.flatMap((lang) => data.teachers.map((agent) => ({ lang, id: agent.id })));
}

export default async function TeacherAgentPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { locale, dictionary } = await getRouteContext(params);
  const { id } = await params;
  const agent = getTeacherAgent(id);

  if (!agent) {
    notFound();
  }

  const completed = agent.lessons.filter((lesson) => lesson.state === "completed").length;
  const progress = Math.round((completed / agent.lessons.length) * 100);
  const firstOpenLesson = agent.lessons.find((lesson) => lesson.state !== "locked") ?? agent.lessons[0];
  const base = `/${locale}/education/${agent.id}`;

  return (
    <PageSection>
      <SectionHeader
        title={l(agent.name, locale)}
        subtitle={l(agent.description, locale)}
        action={
          <ButtonLink href={`/${locale}/education`} variant="secondary">
            {dictionary.common.backToList}
          </ButtonLink>
        }
      />

      <div className="mb-6 grid gap-3 md:grid-cols-2">
        <SafetyNote tone="warm">{dictionary.safety.teacherReconstruction}</SafetyNote>
        <SafetyNote tone="calm">{dictionary.safety.aiCanBeWrong}</SafetyNote>
      </div>

      <div className="mb-5">
        <EducationGamification
          locale={locale}
          completed={completed}
          total={agent.lessons.length}
          xp={agent.lessons.reduce((sum, lesson) => sum + (lesson.state === "completed" ? lesson.xp : 0), 0)}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
        <Card as="aside">
          <AvatarMark label={l(agent.name, locale)} tone={agent.avatarTone} size="lg" />
          <h2 className="mt-4 text-xl font-semibold text-zinc-950">{l(agent.method, locale)}</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">{l(agent.description, locale)}</p>
          <div className="mt-5">
            <ProgressBar value={progress} label={dictionary.education.progress} />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge tone="warm">3 {dictionary.common.streak}</Badge>
            <Badge tone="calm">
              {agent.lessons.reduce((sum, lesson) => sum + lesson.xp, 0)} {dictionary.common.xp}
            </Badge>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <ButtonLink href={`${base}/lesson/${firstOpenLesson.id}`} icon={<PlayCircle className="h-4 w-4" />}>
              {dictionary.education.startLearning}
            </ButtonLink>
            <ButtonLink href={`${base}/chat`} variant="secondary" icon={<MessageCircle className="h-4 w-4" />}>
              {dictionary.education.openChat}
            </ButtonLink>
          </div>
        </Card>

        <div className="grid gap-5">
          <Card as="section">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-teal-700" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-zinc-950">{dictionary.education.lessonPath}</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {agent.lessons.map((lesson, index) => (
                <div key={lesson.id} className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-teal-800">{index + 1}</p>
                      <h3 className="text-lg font-semibold text-zinc-950">{l(lesson.title, locale)}</h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-600">{l(lesson.summary, locale)}</p>
                    </div>
                    <Badge tone={lesson.state === "completed" ? "success" : lesson.state === "inProgress" ? "warm" : "default"}>
                      {dictionary.lessonStates[lesson.state]}
                    </Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Badge>
                      {lesson.durationMinutes} {dictionary.common.minutes}
                    </Badge>
                    <Badge tone="calm">
                      {lesson.xp} {dictionary.common.xp}
                    </Badge>
                    {lesson.state === "locked" ? (
                      <span className="text-sm text-zinc-500">{dictionary.education.lockedHint}</span>
                    ) : (
                      <ButtonLink href={`${base}/lesson/${lesson.id}`} variant="ghost">
                        {dictionary.common.continue}
                      </ButtonLink>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card as="section">
            <h2 className="text-xl font-semibold text-zinc-950">{dictionary.education.sampleExercises}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {agent.exercises.map((exercise) => (
                <Badge key={l(exercise, locale)} tone="calm">
                  {l(exercise, locale)}
                </Badge>
              ))}
            </div>
          </Card>

          <TeacherStudioClient locale={locale} agentName={l(agent.name, locale)} />
        </div>
      </div>
    </PageSection>
  );
}
