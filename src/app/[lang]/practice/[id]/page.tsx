import { notFound } from "next/navigation";

import { MockActionButton } from "@/components/mock-action-button";
import { Badge, ButtonLink, Card, InfoRow, PageSection, SafetyNote, SectionHeader } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";
import { getPracticeRequest, l } from "@/lib/mock-services";

export default async function PracticeRequestDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { locale, dictionary } = await getRouteContext(params);
  const { id } = await params;
  const request = getPracticeRequest(id);

  if (!request) {
    notFound();
  }

  return (
    <PageSection>
      <SectionHeader
        title={dictionary.practice.detailTitle}
        subtitle={l(request.title, locale)}
        action={
          <ButtonLink href={`/${locale}/practice`} variant="secondary">
            {dictionary.common.backToList}
          </ButtonLink>
        }
      />
      <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
        <Card as="aside">
          <Badge tone={request.status === "open" ? "success" : "default"}>
            {dictionary.common[request.status]}
          </Badge>
          <dl className="mt-5">
            <InfoRow label={dictionary.practice.owner} value={l(request.ownerName, locale)} />
            <InfoRow label={dictionary.practice.scriptName} value={l(request.scriptName, locale)} />
            <InfoRow label={dictionary.practice.roleNeeded} value={l(request.roleNeeded, locale)} />
            <InfoRow label={dictionary.practice.preferredGender} value={dictionary.genders[request.preferredGender]} />
            <InfoRow label={dictionary.practice.approximateAge} value={request.approximateAge} />
            <InfoRow label={dictionary.common.voiceType} value={l(request.voiceType, locale)} />
            <InfoRow label={dictionary.practice.cityOrOnline} value={l(request.cityOrOnline, locale)} />
            <InfoRow label={dictionary.practice.proposedTime} value={l(request.proposedTime, locale)} />
          </dl>
        </Card>
        <div className="grid gap-5">
          <Card as="section">
            <h2 className="text-xl font-semibold text-zinc-950">{l(request.title, locale)}</h2>
            <p className="mt-4 leading-7 text-zinc-700">{l(request.description, locale)}</p>
            <div className="mt-5">
              <MockActionButton idleLabel={dictionary.practice.interested} doneLabel={dictionary.practice.interestedDone} />
            </div>
          </Card>
          <SafetyNote tone="calm">{dictionary.common.mockNotice}</SafetyNote>
        </div>
      </div>
    </PageSection>
  );
}
