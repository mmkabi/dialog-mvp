import { CalendarDays, MapPin, Plus, Theater } from "lucide-react";

import { Badge, ButtonLink, Card, PageSection, SafetyNote, SectionHeader } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";
import { data, l } from "@/lib/mock-services";

export default async function CastingCallsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { locale, dictionary } = await getRouteContext(params);

  return (
    <PageSection>
      <SectionHeader
        title={dictionary.casting.title}
        subtitle={dictionary.casting.subtitle}
        action={
          <ButtonLink href={`/${locale}/casting/new`} icon={<Plus className="h-4 w-4" />}>
            {dictionary.common.create}
          </ButtonLink>
        }
      />
      <div className="mb-5">
        <SafetyNote tone="warm">{dictionary.safety.castingFairness}</SafetyNote>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {data.castingCalls.map((call) => (
          <Card key={call.id} as="article">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-zinc-950">{l(call.projectTitle, locale)}</h2>
                <p className="mt-2 text-sm text-zinc-600">{l(call.projectOwner, locale)}</p>
              </div>
              <Badge tone={call.status === "open" ? "success" : "default"}>{dictionary.common[call.status]}</Badge>
            </div>
            <div className="mt-5 space-y-3 text-sm text-zinc-600">
              <p className="flex items-center gap-2">
                <Theater className="h-4 w-4 text-teal-700" aria-hidden="true" />
                {dictionary.projectTypes[call.projectType]}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-700" aria-hidden="true" />
                {l(call.city, locale)}
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-teal-700" aria-hidden="true" />
                {call.auditionDate}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {call.requiredRoles.map((role) => (
                <Badge key={l(role, locale)} tone="calm">
                  {l(role, locale)}
                </Badge>
              ))}
            </div>
            <p className="mt-5 line-clamp-3 text-sm leading-6 text-zinc-600">{l(call.description, locale)}</p>
            <div className="mt-5">
              <ButtonLink href={`/${locale}/casting/${call.id}`} variant="secondary">
                {dictionary.common.details}
              </ButtonLink>
            </div>
          </Card>
        ))}
      </div>
    </PageSection>
  );
}
