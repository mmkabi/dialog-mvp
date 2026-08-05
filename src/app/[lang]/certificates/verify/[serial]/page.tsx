import { notFound } from "next/navigation";

import { Badge, ButtonLink, Card, InfoRow, PageSection, SectionHeader } from "@/components/ui/primitives";
import { locales } from "@/i18n/config";
import { getRouteContext } from "@/i18n/route-context";
import { certificates, featureCopy, t } from "@/lib/feature-content";

export function generateStaticParams() {
  return locales.flatMap((lang) => certificates.map((certificate) => ({ lang, serial: certificate.serial })));
}

export default async function CertificateVerifyPage({
  params,
}: {
  params: Promise<{ lang: string; serial: string }>;
}) {
  const { locale } = await getRouteContext(params);
  const { serial } = await params;
  const certificate = certificates.find((item) => item.serial === serial);

  if (!certificate) {
    notFound();
  }

  return (
    <PageSection>
      <SectionHeader
        title={t(featureCopy.verifyCertificate, locale)}
        subtitle={serial}
        action={
          <ButtonLink href={`/${locale}/certificates`} variant="secondary">
            {locale === "fa" ? "بازگشت به گواهی‌ها" : "Back to certificates"}
          </ButtonLink>
        }
      />
      <Card as="section" className="mx-auto max-w-3xl paper-grain">
        <Badge tone={certificate.eligible ? "success" : "danger"}>
          {certificate.eligible ? (locale === "fa" ? "معتبر" : "Valid") : (locale === "fa" ? "صادر نشده" : "Not issued")}
        </Badge>
        <dl className="mt-5">
          <InfoRow label={locale === "fa" ? "هنرجو" : "Student"} value={t(certificate.student, locale)} />
          <InfoRow label={locale === "fa" ? "دوره" : "Course"} value={t(certificate.course, locale)} />
          <InfoRow label={locale === "fa" ? "استاد/منبع آموزشی" : "Teacher/source"} value={t(certificate.teacher, locale)} />
          <InfoRow label={locale === "fa" ? "تاریخ تکمیل" : "Completed at"} value={certificate.completedAt || "-"} />
          <InfoRow label={locale === "fa" ? "شماره سریال" : "Serial"} value={certificate.serial} />
        </dl>
      </Card>
    </PageSection>
  );
}
