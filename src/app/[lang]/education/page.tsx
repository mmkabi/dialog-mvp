import { MessageCircle, PlayCircle, ShieldCheck } from "lucide-react";

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
import { data, l } from "@/lib/mock-services";

export default async function EducationPage({ params }: { params: Promise<{ lang: string }> }) {
  const { locale, dictionary } = await getRouteContext(params);
  const base = `/${locale}/education`;

  return (
    <PageSection>
      <SectionHeader title={dictionary.education.title} subtitle={dictionary.education.subtitle} />
      <div className="mb-6 grid gap-3 md:grid-cols-2">
        <SafetyNote tone="warm">{dictionary.safety.teacherReconstruction}</SafetyNote>
        <SafetyNote tone="calm">{dictionary.safety.aiCanBeWrong}</SafetyNote>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {data.teachers.map((agent) => {
          const completed = agent.lessons.filter((lesson) => lesson.state === "completed").length;
          const progress = Math.round((completed / agent.lessons.length) * 100);
          const firstOpenLesson = agent.lessons.find((lesson) => lesson.state !== "locked") ?? agent.lessons[0];

          return (
            <Card key={agent.id} as="article" className="flex flex-col bg-[var(--stage-black)] text-white">
              <div className="flex items-start gap-4">
                <AvatarMark label={l(agent.name, locale)} tone={agent.avatarTone} />
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-white">{l(agent.name, locale)}</h2>
                  <p className="mt-1 text-sm font-medium text-[var(--accent-soft)]">{l(agent.method, locale)}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/68">{l(agent.description, locale)}</p>

              <div className="mt-5">
                <ProgressBar value={progress} label={dictionary.education.progress} />
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-semibold text-white">{dictionary.education.sampleLessons}</h3>
                <div className="mt-3 space-y-2">
                  {agent.lessons.slice(0, 3).map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/7 px-3 py-2">
                      <span className="text-sm text-white/78">{l(lesson.title, locale)}</span>
                      <Badge tone={lesson.state === "completed" ? "success" : lesson.state === "inProgress" ? "warm" : "default"}>
                        {dictionary.lessonStates[lesson.state]}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-semibold text-white">{dictionary.education.sampleExercises}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {agent.exercises.slice(0, 3).map((exercise) => (
                    <Badge key={l(exercise, locale)} tone="calm">
                      {l(exercise, locale)}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <ButtonLink href={`${base}/${agent.id}/lesson/${firstOpenLesson.id}`} icon={<PlayCircle className="h-4 w-4" />}>
                  {dictionary.education.startLearning}
                </ButtonLink>
                <ButtonLink href={`${base}/${agent.id}/chat`} variant="secondary" icon={<MessageCircle className="h-4 w-4" />}>
                  {dictionary.education.openChat}
                </ButtonLink>
                <ButtonLink href={`${base}/${agent.id}`} variant="ghost" icon={<ShieldCheck className="h-4 w-4" />}>
                  {dictionary.common.details}
                </ButtonLink>
              </div>
            </Card>
          );
        })}
      </div>
    </PageSection>
  );
}
