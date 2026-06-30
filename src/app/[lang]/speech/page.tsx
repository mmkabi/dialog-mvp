import { Activity, Mic2, Wind } from "lucide-react";

import { Badge, Button, Card, PageSection, ProgressBar, SafetyNote, SectionHeader } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";
import { data, l } from "@/lib/mock-services";

export default async function SpeechSupportPage({ params }: { params: Promise<{ lang: string }> }) {
  const { locale, dictionary } = await getRouteContext(params);
  const average = Math.round(data.speechExercises.reduce((sum, item) => sum + item.progress, 0) / data.speechExercises.length);

  return (
    <PageSection className="bg-gradient-to-b from-transparent to-teal-50/50">
      <SectionHeader title={dictionary.speech.title} subtitle={dictionary.speech.subtitle} />
      <div className="mb-6">
        <SafetyNote tone="danger">{dictionary.safety.speech}</SafetyNote>
      </div>

      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <Card as="aside">
          <div className="grid h-14 w-14 place-items-center rounded-lg bg-teal-100 text-teal-800">
            <Wind className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-zinc-950">{dictionary.speech.dailyProgress}</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{dictionary.speech.accessibility}</p>
          <div className="mt-5">
            <ProgressBar value={average} label={dictionary.speech.tracker} />
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {data.speechExercises.map((exercise) => (
            <Card key={exercise.id} as="article" className="border-teal-100">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-zinc-100 text-teal-800">
                  {exercise.tone === "calm" ? <Wind className="h-5 w-5" /> : exercise.tone === "focus" ? <Mic2 className="h-5 w-5" /> : <Activity className="h-5 w-5" />}
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-zinc-950">{l(exercise.title, locale)}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{l(exercise.description, locale)}</p>
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
