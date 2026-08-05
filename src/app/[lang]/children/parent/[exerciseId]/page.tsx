import { notFound } from "next/navigation";

import { ChildPracticeRunner } from "@/components/child-practice-runner";
import { ButtonLink, PageSection, SectionHeader } from "@/components/ui/primitives";
import { locales } from "@/i18n/config";
import { getRouteContext } from "@/i18n/route-context";
import { childPracticeExercises, childText, getChildPractice, type ChildPracticeId } from "@/lib/child-practice-content";

export function generateStaticParams() {
  return locales.flatMap((lang) => childPracticeExercises.map((exercise) => ({ lang, exerciseId: exercise.id })));
}

export default async function ChildParentExercisePage({
  params,
}: {
  params: Promise<{ lang: string; exerciseId: string }>;
}) {
  const { locale, dictionary } = await getRouteContext(params);
  const { exerciseId } = await params;
  const exercise = getChildPractice(exerciseId);

  if (!exercise) {
    notFound();
  }

  return (
    <PageSection>
      <SectionHeader
        title={childText(exercise.title, locale)}
        subtitle={childText(exercise.summary, locale)}
        action={
          <ButtonLink href={`/${locale}/children`} variant="secondary">
            {dictionary.common.backToList}
          </ButtonLink>
        }
      />
      <ChildPracticeRunner locale={locale} exerciseId={exercise.id as ChildPracticeId} />
    </PageSection>
  );
}
