import { Activity, Mic2, Wind } from "lucide-react";

import { Badge, Button, Card, PageSection, ProgressBar, SafetyNote, SectionHeader } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";
import { data, l } from "@/lib/mock-services";

export default async function SpeechSupportPage({ params }: { params: Promise<{ lang: string }> }) {
  const { locale, dictionary } = await getRouteContext(params);
  const average = Math.round(data.speechExercises.reduce((sum, item) => sum + item.progress, 0) / data.speechExercises.length);

  return (
    <PageSection>
      <SectionHeader title={dictionary.speech.title} subtitle={dictionary.speech.subtitle} />
      <div className="mb-6">
        <SafetyNote tone="danger">{dictionary.safety.speech}</SafetyNote>
      </div>

      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <Card as="aside" className="border-[#b9d7d9] bg-[#edf7f7]">
          <div className="mx-auto grid h-32 w-32 place-items-center rounded-full bg-[#d2ecee] text-[#24565c] shadow-inner">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-[#b9d7d9] [animation:breathe_5.5s_ease-in-out_infinite]">
              <Wind className="h-7 w-7" aria-hidden="true" />
            </div>
          </div>
          <h2 className="mt-6 text-xl font-semibold text-[var(--foreground)]">{dictionary.speech.dailyProgress}</h2>
          <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{dictionary.speech.accessibility}</p>
          <div className="mt-5">
            <ProgressBar value={average} label={dictionary.speech.tracker} />
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {data.speechExercises.map((exercise) => (
            <Card key={exercise.id} as="article" className="border-[#b9d7d9] bg-[#f7fbfb]">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#d2ecee] text-[#24565c]">
                  {exercise.tone === "calm" ? <Wind className="h-5 w-5" /> : exercise.tone === "focus" ? <Mic2 className="h-5 w-5" /> : <Activity className="h-5 w-5" />}
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--foreground)]">{l(exercise.title, locale)}</h2>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{l(exercise.description, locale)}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge>
                  {exercise.durationMinutes} {dictionary.common.minutes}
                </Badge>
                <Badge tone="calm">{dictionary.speech.tracker}</Badge>
              </div>
              <div className="mt-5">
                <ProgressBar value={exercise.progress} />
              </div>
              <div className="mt-5">
                <Button variant="secondary">{dictionary.speech.startExercise}</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
