import { LogIn } from "lucide-react";

import { Button, Card, PageSection, SectionHeader, SelectInput, TextInput } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";

export default async function LoginPage({ params }: { params: Promise<{ lang: string }> }) {
  const { dictionary } = await getRouteContext(params);

  return (
    <PageSection className="max-w-3xl">
      <SectionHeader title={dictionary.auth.loginTitle} subtitle={dictionary.auth.loginBody} />
      <Card>
        <form className="grid gap-4">
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
            <Button type="submit" icon={<LogIn className="h-4 w-4" />}>
              {dictionary.auth.loginButton}
            </Button>
          </div>
        </form>
      </Card>
    </PageSection>
  );
}
