import { AlertTriangle, ClipboardList, UsersRound } from "lucide-react";

import { Badge, Card, PageSection, SafetyNote, SectionHeader } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";
import { getAdminData, l } from "@/lib/mock-services";

export default async function AdminDashboardPage({ params }: { params: Promise<{ lang: string }> }) {
  const { locale, dictionary } = await getRouteContext(params);
  const { stats, reportedSamples } = getAdminData();
  const metricCards = [
    { label: dictionary.admin.totalUsers, value: stats.totalUsers },
    { label: dictionary.admin.totalActors, value: stats.totalActors },
    { label: dictionary.admin.totalCastingCalls, value: stats.totalCastingCalls },
    { label: dictionary.admin.totalPracticeRequests, value: stats.totalPracticeRequests },
  ];

  return (
    <PageSection>
      <SectionHeader title={dictionary.admin.title} subtitle={dictionary.admin.subtitle} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metricCards.map((metric) => (
          <Card key={metric.label} as="section">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-zinc-600">{metric.label}</p>
              <UsersRound className="h-5 w-5 text-teal-700" aria-hidden="true" />
            </div>
            <p className="mt-3 text-3xl font-semibold text-zinc-950">{metric.value.toLocaleString(locale)}</p>
          </Card>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
        <Card as="section">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-teal-700" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-zinc-950">{dictionary.admin.recentActivity}</h2>
          </div>
          <div className="mt-4 divide-y divide-zinc-100">
            {stats.recentActivity.map((activity) => (
              <p key={l(activity, locale)} className="py-3 text-sm leading-6 text-zinc-700">
                {l(activity, locale)}
              </p>
            ))}
          </div>
        </Card>

        <Card as="section">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-700" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-zinc-950">{dictionary.admin.reportedContent}</h2>
            </div>
            <Badge tone="warm">{stats.reportedContent}</Badge>
          </div>
          <div className="mt-4 space-y-3">
            {reportedSamples.map((report) => (
              <div key={report.id} className="rounded-lg border border-amber-100 bg-amber-50 p-3">
                <Badge>{report.type}</Badge>
                <p className="mt-2 text-sm leading-6 text-amber-950">{l(report.summary, locale)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-5">
        <SafetyNote tone="calm">{dictionary.common.reportPlaceholder}</SafetyNote>
      </div>
    </PageSection>
  );
}
