import { notFound } from "next/navigation";

import { MockActionButton } from "@/components/mock-action-button";
import { Badge, ButtonLink, Card, InfoRow, PageSection, SafetyNote, SectionHeader } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";
import { getCastingCall, l } from "@/lib/mock-services";

export default async function CastingCallDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { locale, dictionary } = await getRouteContext(params);
  const { id } = await params;
  const call = getCastingCall(id);

  if (!call) {
    notFound();
  }

  return (
    <PageSection>
      <SectionHeader
        title={dictionary.casting.detailTitle}
        subtitle={l(call.projectTitle, locale)}
        action={
          <ButtonLink href={`/${locale}/casting`} variant="secondary">
            {dictionary.common.backToList}
          </ButtonLink>
        }
      />
      <div className="mb-5">
        <SafetyNote tone="warm">{dictionary.safety.castingFairness}</SafetyNote>
      </div>
      <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
        <Card as="aside">
          <Badge tone={call.status === "open" ? "success" : "default"}>{dictionary.common[call.status]}</Badge>
          <dl className="mt-5">
            <InfoRow label={dictionary.casting.projectOwner} value={l(call.projectOwner, locale)} />
            <InfoRow label={dictionary.casting.projectType} value={dictionary.projectTypes[call.projectType]} />
            <InfoRow label={dictionary.common.gender} value={dictionary.genders[call.gender]} />
            <InfoRow label={dictionary.casting.ageRange} value={call.ageRange} />
            <InfoRow label={dictionary.common.city} value={l(call.city, locale)} />
            <InfoRow label={dictionary.casting.auditionDate} value={call.auditionDate} />
          </dl>
        </Card>
        <div className="grid gap-5">
          <Card as="section">
            <h2 className="text-xl font-semibold text-zinc-950">{l(call.projectTitle, locale)}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {call.requiredRoles.map((role) => (
                <Badge key={l(role, locale)} tone="calm">
                  {l(role, locale)}
                </Badge>
              ))}
            </div>
            <p className="mt-5 leading-7 text-zinc-700">{l(call.description, locale)}</p>
            <div className="mt-5">
              <MockActionButton idleLabel={dictionary.casting.sendResume} doneLabel={dictionary.casting.resumeSent} />
            </div>
          </Card>
          <SafetyNote tone="calm">{dictionary.common.mockNotice}</SafetyNote>
        </div>
      </div>
    </PageSection>
  );
}
