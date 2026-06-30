import { Save } from "lucide-react";

import {
  Button,
  Card,
  PageSection,
  SafetyNote,
  SectionHeader,
  SelectInput,
  TextArea,
  TextInput,
} from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";
import type { ProjectType } from "@/lib/types";

export default async function CreateCastingCallPage({ params }: { params: Promise<{ lang: string }> }) {
  const { dictionary } = await getRouteContext(params);
  const projectTypes = Object.entries(dictionary.projectTypes).map(([value, label]) => ({
    value: value as ProjectType,
    label,
  }));

  return (
    <PageSection>
      <SectionHeader title={dictionary.casting.createTitle} subtitle={dictionary.casting.createSubtitle} />
      <div className="mb-5 grid gap-3 md:grid-cols-2">
        <SafetyNote tone="calm">{dictionary.common.mockNotice}</SafetyNote>
        <SafetyNote tone="warm">{dictionary.safety.castingFairness}</SafetyNote>
      </div>
      <Card as="section">
        <form className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label={dictionary.casting.projectTitle} />
            <SelectInput label={dictionary.casting.projectType} defaultValue="theatre" options={projectTypes} />
            <TextInput label={dictionary.casting.requiredRoles} />
            <SelectInput
              label={dictionary.common.gender}
              defaultValue="any"
              options={[
                { value: "any", label: dictionary.genders.any },
                { value: "woman", label: dictionary.genders.woman },
                { value: "man", label: dictionary.genders.man },
                { value: "nonBinary", label: dictionary.genders.nonBinary },
              ]}
            />
            <TextInput label={dictionary.casting.ageRange} />
            <TextInput label={dictionary.common.city} />
            <TextInput label={dictionary.casting.auditionDate} type="date" />
          </div>
          <TextArea label={dictionary.common.description} />
          <div>
            <Button icon={<Save className="h-4 w-4" />}>{dictionary.common.save}</Button>
          </div>
        </form>
      </Card>
    </PageSection>
  );
}
