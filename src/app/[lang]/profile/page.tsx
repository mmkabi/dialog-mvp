import { Save } from "lucide-react";

import {
  AvatarMark,
  Badge,
  Button,
  Card,
  PageSection,
  SectionHeader,
  SelectInput,
  TextArea,
  TextInput,
} from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";
import { getFeaturedActor, l } from "@/lib/mock-services";
import type { ActorSkill } from "@/lib/types";

export default async function ProfilePage({ params }: { params: Promise<{ lang: string }> }) {
  const { locale, dictionary } = await getRouteContext(params);
  const actor = getFeaturedActor();
  const name = `${l(actor.firstName, locale)} ${l(actor.lastName, locale)}`;

  return (
    <PageSection>
      <SectionHeader title={dictionary.profile.title} subtitle={dictionary.profile.subtitle} />
      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <Card as="aside">
          <AvatarMark label={name} tone={actor.photoTone} size="lg" />
          <h2 className="mt-4 text-xl font-semibold text-zinc-950">{name}</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{l(actor.bio, locale)}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {actor.skills.slice(0, 5).map((skill) => (
              <Badge key={skill} tone="calm">
                {dictionary.skills[skill]}
              </Badge>
            ))}
          </div>
        </Card>

        <form className="grid gap-5">
          <Card as="section">
            <h2 className="mb-4 text-lg font-semibold text-zinc-950">{dictionary.profile.identity}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <TextInput label={dictionary.profile.firstName} defaultValue={l(actor.firstName, locale)} />
              <TextInput label={dictionary.profile.lastName} defaultValue={l(actor.lastName, locale)} />
              <TextInput label={dictionary.common.city} defaultValue={l(actor.city, locale)} />
              <TextInput label={dictionary.common.age} type="number" defaultValue={String(actor.age)} />
              <SelectInput
                label={dictionary.common.gender}
                defaultValue={actor.gender}
                options={[
                  { value: "woman", label: dictionary.genders.woman },
                  { value: "man", label: dictionary.genders.man },
                  { value: "nonBinary", label: dictionary.genders.nonBinary },
                  { value: "any", label: dictionary.genders.any },
                ]}
              />
              <TextInput label={dictionary.common.height} type="number" defaultValue={String(actor.heightCm)} />
              <TextInput label={dictionary.common.voiceType} defaultValue={l(actor.voiceType, locale)} />
              <SelectInput
                label={dictionary.common.availability}
                defaultValue={actor.availability}
                options={[
                  { value: "available", label: dictionary.availability.available },
                  { value: "limited", label: dictionary.availability.limited },
                  { value: "unavailable", label: dictionary.availability.unavailable },
                ]}
              />
            </div>
            <div className="mt-4">
              <TextArea label={dictionary.profile.bio} defaultValue={l(actor.bio, locale)} />
            </div>
          </Card>

          <Card as="section">
            <h2 className="mb-4 text-lg font-semibold text-zinc-950">{dictionary.profile.resume}</h2>
            <TextArea label={dictionary.actors.resumeTitle} defaultValue={l(actor.actingResume, locale)} />
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(dictionary.skills).map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
                  <input type="checkbox" defaultChecked={actor.skills.includes(key as ActorSkill)} className="h-4 w-4 accent-teal-700" />
                  {label}
                </label>
              ))}
            </div>
          </Card>

          <Card as="section">
            <h2 className="mb-4 text-lg font-semibold text-zinc-950">{dictionary.profile.portfolio}</h2>
            <div className="divide-y divide-zinc-100">
              {actor.portfolioItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="font-medium text-zinc-900">{l(item.title, locale)}</p>
                    <p className="text-sm text-zinc-500">{item.year}</p>
                  </div>
                  <Badge>{dictionary.portfolioTypes[item.type]}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card as="section">
            <h2 className="mb-4 text-lg font-semibold text-zinc-950">{dictionary.profile.contact}</h2>
            <TextInput label={dictionary.profile.languages} defaultValue={actor.languages.map((item) => l(item, locale)).join(", ")} />
            <div className="mt-4">
              <TextArea label={dictionary.actors.contactPreference} defaultValue={l(actor.contactPreference, locale)} />
            </div>
          </Card>

          <div>
            <Button type="submit" icon={<Save className="h-4 w-4" />}>
              {dictionary.common.save}
            </Button>
          </div>
        </form>
      </div>
    </PageSection>
  );
}
