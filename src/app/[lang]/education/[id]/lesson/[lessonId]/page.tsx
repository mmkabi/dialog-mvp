import { CheckCircle2, LockKeyhole, Timer } from "lucide-react";
import { notFound } from "next/navigation";

import { LessonAction } from "@/components/lesson-action";
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
import { getRouteContext } from "@/i18n/route-context";
import { getLesson, getTeacherAgent, l } from "@/lib/mock-services";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lang: string; id: string; lessonId: string }>;
}) {
  const { locale, dictionary } = await getRouteContext(params);
  const { id, lessonId } = await params;
  const agent = getTeacherAgent(id);
  const lesson = getLesson(id, lessonId);

  if (!agent || !lesson) {
    notFound();
  }

  const progress = lesson.state === "completed" ? 100 : lesson.state === "inProgress" ? 62 : 0;

  return (
    <PageSection>
      <SectionHeader
        eyebrow={l(agent.name, locale)}
        title={l(lesson.title, locale)}
        subtitle={l(lesson.summary, locale)}
        action={
          <ButtonLink href={`/${locale}/education/${agent.id}`} variant="secondary">
            {dictionary.common.backToList}
          </ButtonLink>
        }
      />

      <div className="mb-6 grid gap-3 md:grid-cols-2">
        <SafetyNote tone="warm">{dictionary.safety.teacherReconstruction}</SafetyNote>
        <SafetyNote tone="calm">{dictionary.safety.aiCanBeWrong}</SafetyNote>
      </div>

      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <Card as="aside">
          <AvatarMark label={l(agent.name, locale)} tone={agent.avatarTone} size="lg" />
          <h2 className="mt-4 text-xl font-semibold text-zinc-950">{l(agent.method, locale)}</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge tone={lesson.state === "completed" ? "success" : lesson.state === "inProgress" ? "warm" : "default"}>
              {dictionary.lessonStates[lesson.state]}
            </Badge>
            <Badge>
              <Timer className="me-1 h-3.5 w-3.5" />
              {lesson.durationMinutes} {dictionary.common.minutes}
            </Badge>
            <Badge tone="calm">
              {lesson.xp} {dictionary.common.xp}
            </Badge>
          </div>
          <div className="mt-5">
            <ProgressBar value={progress} label={dictionary.education.progress} />
          </div>
        </Card>

        <div className="grid gap-5">
          <Card as="section">
            <div className="flex items-center gap-2">
              {lesson.state === "locked" ? (
                <LockKeyhole className="h-5 w-5 text-zinc-500" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-teal-700" aria-hidden="true" />
              )}
              <h2 className="text-xl font-semibold text-zinc-950">{dictionary.education.practiceTask}</h2>
            </div>
            <p className="mt-4 leading-7 text-zinc-700">{l(lesson.practiceTask, locale)}</p>
            {lesson.state === "locked" ? (
              <div className="mt-5">
                <SafetyNote tone="warm">{dictionary.education.lockedHint}</SafetyNote>
              </div>
            ) : (
              <div className="mt-5">
                <LessonAction completeLabel={dictionary.education.completeLesson} feedback={l(lesson.feedback, locale)} />
              </div>
            )}
          </Card>

          <Card as="section">
            <h2 className="text-xl font-semibold text-zinc-950">{dictionary.education.feedback}</h2>
            <p className="mt-4 leading-7 text-zinc-700">{l(lesson.feedback, locale)}</p>
          </Card>
        </div>
      </div>
    </PageSection>
  );
}
