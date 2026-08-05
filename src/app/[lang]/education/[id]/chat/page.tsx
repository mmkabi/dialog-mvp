import { notFound } from "next/navigation";

import { MockChat } from "@/components/mock-chat";
import { AvatarMark, ButtonLink, Card, PageSection, SafetyNote, SectionHeader } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";
import { locales } from "@/i18n/config";
import { data, getTeacherAgent, l } from "@/lib/mock-services";

export function generateStaticParams() {
  return locales.flatMap((lang) => data.teachers.map((agent) => ({ lang, id: agent.id })));
}

export default async function TeacherChatPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { locale, dictionary } = await getRouteContext(params);
  const { id } = await params;
  const agent = getTeacherAgent(id);

  if (!agent) {
    notFound();
  }

  return (
    <PageSection>
      <SectionHeader
        title={dictionary.education.chatTitle}
        subtitle={`${l(agent.name, locale)} · ${l(agent.method, locale)}`}
        action={
          <ButtonLink href={`/${locale}/education/${agent.id}`} variant="secondary">
            {dictionary.common.backToList}
          </ButtonLink>
        }
      />
      <div className="mb-6 grid gap-3 md:grid-cols-2">
        <SafetyNote tone="warm">{dictionary.safety.teacherReconstruction}</SafetyNote>
        <SafetyNote tone="calm">{dictionary.safety.aiCanBeWrong}</SafetyNote>
      </div>
      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <Card as="aside">
          <AvatarMark label={l(agent.name, locale)} tone={agent.avatarTone} size="lg" />
          <h2 className="mt-4 text-xl font-semibold text-zinc-950">{l(agent.name, locale)}</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{dictionary.education.chatSubtitle}</p>
        </Card>
        <MockChat locale={locale} dictionary={dictionary} agentName={l(agent.name, locale)} />
      </div>
    </PageSection>
  );
}
