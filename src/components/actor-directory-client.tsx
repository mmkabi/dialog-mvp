"use client";

import { Filter, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import {
  AvatarMark,
  Badge,
  Button,
  ButtonLink,
  Card,
  EmptyState,
  SelectInput,
  TextInput,
} from "@/components/ui/primitives";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages";
import type { ActorSkill, AvailabilityStatus, Gender, Profile } from "@/lib/types";

const actorSkills: ActorSkill[] = [
  "theatre",
  "cinema",
  "voiceActing",
  "dubbing",
  "bodyMovement",
  "speech",
  "singing",
  "improvisation",
  "screenActing",
  "stageActing",
];

const genders: Gender[] = ["woman", "man", "nonBinary", "any"];
const availabilityStatuses: AvailabilityStatus[] = ["available", "limited", "unavailable"];

export function ActorDirectoryClient({
  locale,
  dictionary,
  actors,
}: {
  locale: Locale;
  dictionary: Dictionary;
  actors: Profile[];
}) {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("all");
  const [gender, setGender] = useState("all");
  const [ageBand, setAgeBand] = useState("all");
  const [heightBand, setHeightBand] = useState("all");
  const [voiceType, setVoiceType] = useState("all");
  const [skill, setSkill] = useState("all");
  const [availability, setAvailability] = useState("all");

  const cities = Array.from(new Set(actors.map((actor) => actor.city[locale])));
  const voices = Array.from(new Set(actors.map((actor) => actor.voiceType[locale])));

  const filteredActors = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(locale);

    return actors.filter((actor) => {
      const fullName = `${actor.firstName[locale]} ${actor.lastName[locale]}`.toLocaleLowerCase(locale);
      const searchable = [
        fullName,
        actor.city[locale],
        actor.voiceType[locale],
        actor.bio[locale],
        ...actor.skills.map((item) => dictionary.skills[item]),
      ]
        .join(" ")
        .toLocaleLowerCase(locale);

      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesCity = city === "all" || actor.city[locale] === city;
      const matchesGender = gender === "all" || actor.gender === gender;
      const matchesAge =
        ageBand === "all" ||
        (ageBand === "18-25" && actor.age >= 18 && actor.age <= 25) ||
        (ageBand === "26-35" && actor.age >= 26 && actor.age <= 35) ||
        (ageBand === "36-50" && actor.age >= 36 && actor.age <= 50);
      const matchesHeight =
        heightBand === "all" ||
        (heightBand === "under-170" && actor.heightCm < 170) ||
        (heightBand === "170-180" && actor.heightCm >= 170 && actor.heightCm <= 180) ||
        (heightBand === "over-180" && actor.heightCm > 180);
      const matchesVoice = voiceType === "all" || actor.voiceType[locale] === voiceType;
      const matchesSkill = skill === "all" || actor.skills.includes(skill as ActorSkill);
      const matchesAvailability = availability === "all" || actor.availability === availability;

      return (
        matchesQuery &&
        matchesCity &&
        matchesGender &&
        matchesAge &&
        matchesHeight &&
        matchesVoice &&
        matchesSkill &&
        matchesAvailability
      );
    });
  }, [actors, availability, ageBand, city, dictionary.skills, gender, heightBand, locale, query, skill, voiceType]);

  function clearFilters() {
    setQuery("");
    setCity("all");
    setGender("all");
    setAgeBand("all");
    setHeightBand("all");
    setVoiceType("all");
    setSkill("all");
    setAvailability("all");
  }

  return (
    <div className="grid gap-6">
      <Card>
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-800">
          <Filter className="h-4 w-4 text-teal-700" aria-hidden="true" />
          {dictionary.common.filters}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <TextInput
            label={dictionary.common.search}
            placeholder={dictionary.actors.searchPlaceholder}
            value={query}
            onChange={setQuery}
          />
          <SelectInput
            label={dictionary.common.city}
            value={city}
            onChange={setCity}
            options={[
              { value: "all", label: dictionary.common.all },
              ...cities.map((item) => ({ value: item, label: item })),
            ]}
          />
          <SelectInput
            label={dictionary.common.gender}
            value={gender}
            onChange={setGender}
            options={[
              { value: "all", label: dictionary.common.all },
              ...genders.map((item) => ({ value: item, label: dictionary.genders[item] })),
            ]}
          />
          <SelectInput
            label={dictionary.common.age}
            value={ageBand}
            onChange={setAgeBand}
            options={[
              { value: "all", label: dictionary.common.all },
              { value: "18-25", label: `18-25 ${dictionary.common.years}` },
              { value: "26-35", label: `26-35 ${dictionary.common.years}` },
              { value: "36-50", label: `36-50 ${dictionary.common.years}` },
            ]}
          />
          <SelectInput
            label={dictionary.common.height}
            value={heightBand}
            onChange={setHeightBand}
            options={[
              { value: "all", label: dictionary.common.all },
              { value: "under-170", label: `< 170 ${dictionary.common.centimeters}` },
              { value: "170-180", label: `170-180 ${dictionary.common.centimeters}` },
              { value: "over-180", label: `> 180 ${dictionary.common.centimeters}` },
            ]}
          />
          <SelectInput
            label={dictionary.common.voiceType}
            value={voiceType}
            onChange={setVoiceType}
            options={[
              { value: "all", label: dictionary.common.all },
              ...voices.map((item) => ({ value: item, label: item })),
            ]}
          />
          <SelectInput
            label={dictionary.common.skill}
            value={skill}
            onChange={setSkill}
            options={[
              { value: "all", label: dictionary.common.all },
              ...actorSkills.map((item) => ({ value: item, label: dictionary.skills[item] })),
            ]}
          />
          <SelectInput
            label={dictionary.common.availability}
            value={availability}
            onChange={setAvailability}
            options={[
              { value: "all", label: dictionary.common.all },
              ...availabilityStatuses.map((item) => ({ value: item, label: dictionary.availability[item] })),
            ]}
          />
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-sm text-zinc-600">
            {filteredActors.length} {dictionary.actors.resultCount}
          </p>
          <Button variant="secondary" onClick={clearFilters} icon={<X className="h-4 w-4" />}>
            {dictionary.common.clearFilters}
          </Button>
        </div>
      </Card>

      {filteredActors.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredActors.map((actor) => {
            const name = `${actor.firstName[locale]} ${actor.lastName[locale]}`;
            return (
              <Card key={actor.id} as="article" className="transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <AvatarMark label={name} tone={actor.photoTone} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-zinc-950">{name}</h2>
                        <p className="mt-1 text-sm text-zinc-600">
                          {actor.city[locale]} · {actor.age} {dictionary.common.years} · {actor.heightCm}{" "}
                          {dictionary.common.centimeters}
                        </p>
                      </div>
                      <Badge tone={actor.availability === "available" ? "success" : actor.availability === "limited" ? "warm" : "default"}>
                        {dictionary.availability[actor.availability]}
                      </Badge>
                    </div>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-700">{actor.bio[locale]}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {actor.skills.slice(0, 5).map((item) => (
                        <Badge key={item} tone="calm">
                          {dictionary.skills[item]}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 text-sm text-zinc-500">
                        <Search className="h-4 w-4" aria-hidden="true" />
                        {actor.voiceType[locale]}
                      </span>
                      <ButtonLink href={`/${locale}/actors/${actor.id}`} variant="secondary">
                        {dictionary.common.details}
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState title={dictionary.actors.noResultsTitle} body={dictionary.actors.noResultsBody} />
      )}
    </div>
  );
}
