import { UserPlus } from "lucide-react";

import { Button, Card, PageSection, SectionHeader, SelectInput, TextInput } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";

export default async function RegisterPage({ params }: { params: Promise<{ lang: string }> }) {
  const { dictionary } = await getRouteContext(params);

  return (
    <PageSection className="max-w-3xl">
      <SectionHeader title={dictionary.auth.registerTitle} subtitle={dictionary.auth.registerBody} />
      <Card>
        <form className="grid gap-4">
          <TextInput label={dictionary.auth.fullName} defaultValue="Nava Rad" />
          <TextInput label={dictionary.auth.email} type="email" defaultValue="nava@example.com" />
          <TextInput label={dictionary.auth.password} type="password" defaultValue="dialog-demo" />
          <SelectInput
            label={dictionary.auth.chooseRole}
            defaultValue="actor"
            options={[
              { value: "actor", label: dictionary.roles.actor },
              { value: "director", label: dictionary.roles.director },
              { value: "coach", label: dictionary.roles.coach },
              { value: "parent", label: dictionary.roles.parent },
              { value: "admin", label: dictionary.roles.admin },
            ]}
          />
          <div className="pt-2">
            <Button type="submit" icon={<UserPlus className="h-4 w-4" />}>
              {dictionary.auth.registerButton}
            </Button>
          </div>
        </form>
      </Card>
    </PageSection>
  );
}
