"use client";

import { CheckCircle2, Download, QrCode, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { Badge, Button, Card, ProgressBar, SafetyNote } from "@/components/ui/primitives";
import type { Locale } from "@/i18n/config";
import { certificates, featureCopy, t } from "@/lib/feature-content";

export function CertificatesClient({ locale }: { locale: Locale }) {
  const [issued, setIssued] = useState<Record<string, boolean>>({});

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <div className="grid gap-4">
        {certificates.map((certificate) => (
          <Card key={certificate.id} as="article" className="paper-grain">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <Badge tone={certificate.eligible ? "success" : "default"}>
                  {certificate.eligible ? t(featureCopy.eligible, locale) : t(featureCopy.ineligible, locale)}
                </Badge>
                <h2 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">{t(certificate.course, locale)}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{t(certificate.teacher, locale)}</p>
              </div>
              <p className="rounded-full bg-[var(--surface-warm)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)]">{certificate.serial}</p>
            </div>
            <div className="mt-5">
              <ProgressBar value={certificate.progress} label={t(featureCopy.requirements, locale)} />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button
                disabled={!certificate.eligible}
                onClick={() => setIssued((value) => ({ ...value, [certificate.id]: true }))}
                icon={<ShieldCheck className="h-4 w-4" />}
              >
                {t(featureCopy.issueCertificate, locale)}
              </Button>
              <Button variant="secondary" onClick={() => window.print()} icon={<Download className="h-4 w-4" />}>
                {t(featureCopy.downloadPdf, locale)}
              </Button>
            </div>
            {issued[certificate.id] ? (
              <div className="mt-4 rounded-2xl border border-[var(--success)]/25 bg-[#eef8ef] p-4 text-sm font-semibold text-[var(--success)]">
                <CheckCircle2 className="me-2 inline h-4 w-4" />
                {t(featureCopy.saved, locale)}
              </div>
            ) : null}
          </Card>
        ))}
      </div>

      <Card as="aside" className="border-[var(--accent)]/25 bg-[var(--surface-paper)]">
        <Badge tone="warm">{t(featureCopy.preview, locale)}</Badge>
        <div className="mt-5 rounded-3xl border border-[var(--accent)]/35 bg-white p-5 text-center shadow-inner">
          <p className="text-sm text-[var(--text-muted)]">Dialog / دیالوگ</p>
          <h2 className="mt-3 text-2xl font-bold text-[var(--primary)]">{t(featureCopy.certificates, locale)}</h2>
          <p className="mt-4 text-lg font-semibold text-[var(--foreground)]">{t(certificates[0].student, locale)}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{t(certificates[0].course, locale)}</p>
          <div className="mx-auto mt-5 grid h-28 w-28 place-items-center rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-warm)]">
            <QrCode className="h-16 w-16 text-[var(--primary)]" />
          </div>
          <p className="mt-4 text-xs font-semibold text-[var(--text-muted)]">{certificates[0].serial}</p>
        </div>
        <div className="mt-5">
          <SafetyNote tone="warm">
            {locale === "fa"
              ? "در نسخه production اعتبار صدور باید سمت سرور بررسی شود و با تغییر state فرانت‌اند قابل دورزدن نباشد."
              : "In production, issuance eligibility must be verified server-side and cannot rely on frontend state."}
          </SafetyNote>
        </div>
      </Card>
    </div>
  );
}
