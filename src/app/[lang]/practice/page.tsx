import { Clock, MapPin, Plus, UserRound } from "lucide-react";

import { Badge, ButtonLink, Card, PageSection, SectionHeader } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";
import { data, l } from "@/lib/mock-services";

export default async function PracticeRequestsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { locale, dictionary } = await getRouteContext(params);

  return (
    <PageSection>
      <SectionHeader
        title={dictionary.practice.title}
        subtitle={dictionary.practice.subtitle}
        action={
          <ButtonLink href={`/${locale}/practice/new`} icon={<Plus className="h-4 w-4" />}>
            {dictionary.common.create}
          </ButtonLink>
        }
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {data.practiceRequests.map((request) => (
          <Card key={request.id} as="article">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-zinc-950">{l(request.title, locale)}</h2>
                <p className="mt-2 text-sm text-zinc-600">{l(request.scriptName, locale)}</p>
              </div>
              <Badge tone={request.status === "open" ? "success" : "default"}>
                {dictionary.common[request.status]}
              </Badge>
            </div>
            <div className="mt-5 space-y-3 text-sm text-zinc-600">
              <p className="flex items-center gap-2">
                <UserRound className="h-4 w-4 text-teal-700" aria-hidden="true" />
                {l(request.roleNeeded, locale)}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-700" aria-hidden="true" />
                {l(request.cityOrOnline, locale)}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-teal-700" aria-hidden="true" />
                {l(request.proposedTime, locale)}
              </p>
            </div>
            <p className="mt-5 line-clamp-3 text-sm leading-6 text-zinc-600">{l(request.description, locale)}</p>
            <div className="mt-5">
              <ButtonLink href={`/${locale}/practice/${request.id}`} variant="secondary">
                {dictionary.common.details}
              </ButtonLink>
            </div>
          </Card>
        ))}
      </div>
    </PageSection>
  );
}
