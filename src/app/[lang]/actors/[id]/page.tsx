import { BriefcaseBusiness, Mail, Ruler, UserRound } from "lucide-react";
import { notFound } from "next/navigation";

import {
  AvatarMark,
  Badge,
  ButtonLink,
  Card,
  InfoRow,
  PageSection,
  SectionHeader,
  TrustBadge,
} from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";
import { locales } from "@/i18n/config";
import { data, getActor, l } from "@/lib/mock-services";

export function generateStaticParams() {
  return locales.flatMap((lang) => data.actors.map((actor) => ({ lang, id: actor.id })));
}

export default async function ActorDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { locale, dictionary } = await getRouteContext(params);
  const { id } = await params;
  const actor = getActor(id);

  if (!actor) {
    notFound();
  }

  const name = `${l(actor.firstName, locale)} ${l(actor.lastName, locale)}`;

  return (
    <PageSection>
      <SectionHeader
        title={name}
        subtitle={l(actor.bio, locale)}
        action={
          <ButtonLink href={`/${locale}/actors`} variant="secondary">
            {dictionary.common.backToList}
          </ButtonLink>
        }
      />
      <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
        <Card as="aside" className="paper-grain">
          <AvatarMark label={name} tone={actor.photoTone} size="lg" />
          <div className="mt-4">
            <TrustBadge>{dictionary.actors.profilePhoto}</TrustBadge>
          </div>
          <dl className="mt-5">
            <InfoRow label={dictionary.common.city} value={l(actor.city, locale)} />
            <InfoRow label={dictionary.common.gender} value={dictionary.genders[actor.gender]} />
            <InfoRow label={dictionary.common.age} value={`${actor.age} ${dictionary.common.years}`} />
            <InfoRow label={dictionary.common.height} value={`${actor.heightCm} ${dictionary.common.centimeters}`} />
            <InfoRow label={dictionary.common.availability} value={dictionary.availability[actor.availability]} />
          </dl>
        </Card>

        <div className="grid gap-5">
          <Card as="section" className="paper-grain">
            <div className="flex items-center gap-2">
              <BriefcaseBusiness className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-[var(--foreground)]">{dictionary.actors.resumeTitle}</h2>
            </div>
            <p className="mt-4 leading-8 text-[var(--text-muted)]">{l(actor.actingResume, locale)}</p>
          </Card>

          <Card as="section" className="paper-grain">
            <div className="flex items-center gap-2">
              <UserRound className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-[var(--foreground)]">{dictionary.actors.skillsTitle}</h2>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {actor.skills.filter((skill) => skill !== "voiceActing").map((skill) => (
                <Badge key={skill} tone="calm">
                  {dictionary.skills[skill]}
                </Badge>
              ))}
            </div>
          </Card>

          <Card as="section" className="paper-grain">
            <div className="flex items-center gap-2">
              <Ruler className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-[var(--foreground)]">{dictionary.actors.portfolioTitle}</h2>
            </div>
            <div className="mt-4 divide-y divide-[var(--border-soft)]">
              {actor.portfolioItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">{l(item.title, locale)}</p>
                    <p className="text-sm text-[var(--text-muted)]">{item.year}</p>
                  </div>
                  <Badge>{dictionary.portfolioTypes[item.type]}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card as="section" className="paper-grain">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-[var(--foreground)]">{dictionary.actors.contactPreference}</h2>
            </div>
            <p className="mt-4 leading-8 text-[var(--text-muted)]">{l(actor.contactPreference, locale)}</p>
          </Card>
        </div>
      </div>
    </PageSection>
  );
}
