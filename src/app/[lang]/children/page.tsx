import { ChildPracticeCardsClient } from "@/components/child-practice-cards-client";
import { ChildProgressOverviewClient } from "@/components/child-progress-overview-client";
import { PageSection, SafetyNote, SectionHeader } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";
import { childPracticeCopy, childText } from "@/lib/child-practice-content";
import { data } from "@/lib/mock-services";

export default async function ChildrenPracticePage({ params }: { params: Promise<{ lang: string }> }) {
  const { locale, dictionary } = await getRouteContext(params);

  return (
    <PageSection>
      <SectionHeader title={dictionary.children.title} subtitle={dictionary.children.subtitle} />
      <div className="mb-6 grid gap-3 md:grid-cols-2">
        <SafetyNote tone="danger">{dictionary.safety.children}</SafetyNote>
        <SafetyNote tone="warm">{dictionary.safety.noChildChat}</SafetyNote>
      </div>

      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <ChildProgressOverviewClient
          locale={locale}
          title={dictionary.children.parentOnly}
          reward={dictionary.children.reward}
          progressLabel={dictionary.children.progress}
        />

        <ChildPracticeCardsClient
          locale={locale}
          exercises={data.childExercises}
          ageBandLabel={dictionary.children.ageBand}
          parentOnlyLabel={dictionary.children.parentOnly}
          startLabel={dictionary.children.startExercise}
        />
      </div>
      <div className="mt-6">
        <SafetyNote tone="calm">{childText(childPracticeCopy.parentSafety, locale)}</SafetyNote>
      </div>
    </PageSection>
  );
}
