import { ActorDirectoryClient } from "@/components/actor-directory-client";
import { PageSection, SectionHeader } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";
import { data } from "@/lib/mock-services";

export default async function ActorsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { locale, dictionary } = await getRouteContext(params);

  return (
    <PageSection>
      <SectionHeader title={dictionary.actors.title} subtitle={dictionary.actors.subtitle} />
      <ActorDirectoryClient locale={locale} dictionary={dictionary} actors={data.actors} />
    </PageSection>
  );
}
