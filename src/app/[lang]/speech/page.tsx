import { Wind } from "lucide-react";

import { SpeechPracticeClient } from "@/components/speech-practice-client";
import { Card, PageSection, ProgressBar, SafetyNote, SectionHeader } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";
import { data } from "@/lib/mock-services";

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

        <div>
          <SpeechPracticeClient locale={locale} />
        </div>
      </div>
    </PageSection>
  );
}
