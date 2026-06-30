import { HeartPulse, ImageIcon, Sparkles } from "lucide-react";

import { Badge, Button, Card, PageSection, ProgressBar, SafetyNote, SectionHeader } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";
import { data, l } from "@/lib/mock-services";

export default async function ChildrenPracticePage({ params }: { params: Promise<{ lang: string }> }) {
  const { locale, dictionary } = await getRouteContext(params);
  const average = Math.round(data.childExercises.reduce((sum, item) => sum + item.progress, 0) / data.childExercises.length);

  return (
    <PageSection>
      <SectionHeader title={dictionary.children.title} subtitle={dictionary.children.subtitle} />
      <div className="mb-6 grid gap-3 md:grid-cols-2">
        <SafetyNote tone="danger">{dictionary.safety.children}</SafetyNote>
        <SafetyNote tone="warm">{dictionary.safety.noChildChat}</SafetyNote>
      </div>

      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <Card as="aside" className="border-[var(--accent)]/25 bg-[#fff3d6]">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[var(--accent-soft)] text-[#714909] reward-pulse">
            <Sparkles className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-xl font-semibold text-[var(--foreground)]">{dictionary.children.parentOnly}</h2>
          <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{dictionary.children.reward}</p>
          <div className="mt-5">
            <ProgressBar value={average} label={dictionary.children.progress} />
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {data.childExercises.map((exercise) => (
            <Card key={exercise.id} as="article" className="border-[var(--accent)]/25 bg-[#fff9e9]">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[var(--accent-soft)] text-[#714909]">
                  {exercise.id === "image-selection" ? <ImageIcon className="h-5 w-5" /> : <HeartPulse className="h-5 w-5" />}
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--foreground)]">{l(exercise.title, locale)}</h2>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{l(exercise.description, locale)}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge tone="warm">
                  {dictionary.children.ageBand}: {exercise.ageBand}
                </Badge>
                <Badge tone="calm">{dictionary.children.parentOnly}</Badge>
              </div>
              <div className="mt-5">
                <ProgressBar value={exercise.progress} label={dictionary.children.progress} />
              </div>
              <SafetyNote tone="warm">{l(exercise.parentNote, locale)}</SafetyNote>
              <div className="mt-5">
                <Button variant="secondary">{dictionary.children.startExercise}</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
