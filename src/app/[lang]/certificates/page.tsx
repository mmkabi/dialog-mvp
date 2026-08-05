import { Award } from "lucide-react";

import { CertificatesClient } from "@/components/certificates-client";
import { ButtonLink, PageSection, SectionHeader } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";
import { featureCopy, t } from "@/lib/feature-content";

export default async function CertificatesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { locale } = await getRouteContext(params);

  return (
    <PageSection>
      <SectionHeader
        title={t(featureCopy.certificates, locale)}
        subtitle={t(featureCopy.certificatesSubtitle, locale)}
        action={
          <ButtonLink href={`/${locale}/certificates/verify/DLG-2026-STN-0001`} variant="secondary" icon={<Award className="h-4 w-4" />}>
            {t(featureCopy.verifyCertificate, locale)}
          </ButtonLink>
        }
      />
      <CertificatesClient locale={locale} />
    </PageSection>
  );
}
