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

export default async function CreatePracticeRequestPage({ params }: { params: Promise<{ lang: string }> }) {
  const { dictionary } = await getRouteContext(params);

  return (
    <PageSection>
      <SectionHeader title={dictionary.practice.createTitle} subtitle={dictionary.practice.createSubtitle} />
      <div className="mb-5">
        <SafetyNote tone="calm">{dictionary.common.mockNotice}</SafetyNote>
      </div>
      <Card as="section">
        <form className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label={dictionary.practice.titleField} />
            <TextInput label={dictionary.practice.scriptName} />
            <TextInput label={dictionary.practice.roleNeeded} />
            <SelectInput
              label={dictionary.practice.preferredGender}
              defaultValue="any"
              options={[
                { value: "any", label: dictionary.genders.any },
                { value: "woman", label: dictionary.genders.woman },
                { value: "man", label: dictionary.genders.man },
                { value: "nonBinary", label: dictionary.genders.nonBinary },
              ]}
            />
            <TextInput label={dictionary.practice.approximateAge} />
            <TextInput label={dictionary.practice.cityOrOnline} />
            <TextInput label={dictionary.practice.proposedTime} />
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
