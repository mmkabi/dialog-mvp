import { CalendarCheck, MessageCircle, Send, Sparkles, Trophy, UsersRound } from "lucide-react";

import { Badge, ButtonLink, Card, PageSection, SectionHeader } from "@/components/ui/primitives";
import { getRouteContext } from "@/i18n/route-context";
import { navCopy, navText } from "@/lib/navigation";

export default async function DialogProPage({ params }: { params: Promise<{ lang: string }> }) {
  const { locale } = await getRouteContext(params);
  const base = `/${locale}`;
  const features = [
    { href: `${base}/actors`, label: locale === "fa" ? "بازیگران و منتورها" : "Actors and mentors", icon: <UsersRound className="h-5 w-5" /> },
    { href: `${base}/pro`, label: locale === "fa" ? "رزرو مشاوره" : "Book consultation", icon: <CalendarCheck className="h-5 w-5" /> },
    { href: `${base}/pro`, label: navText(navCopy.submitPerformance, locale), icon: <Send className="h-5 w-5" /> },
    { href: `${base}/pro`, label: locale === "fa" ? "دریافت بازخورد" : "Get feedback", icon: <MessageCircle className="h-5 w-5" /> },
    { href: `${base}/me`, label: navText(navCopy.achievements, locale), icon: <Trophy className="h-5 w-5" /> },
  ];

  return (
    <PageSection>
      <SectionHeader
        eyebrow={navText(navCopy.proEyebrow, locale)}
        title={navText(navCopy.proTitle, locale)}
        subtitle={navText(navCopy.proSubtitle, locale)}
        action={<ButtonLink href={`${base}/actors`} icon={<Sparkles className="h-4 w-4" />}>{locale === "fa" ? "شروع مسیر حرفه‌ای" : "Start pro path"}</ButtonLink>}
      />
      <Card as="section" className="border-[var(--accent)]/35 bg-[linear-gradient(135deg,#fffaf0,#fff0c9_56%,#f6ddaa)]">
        <Badge tone="warm">{locale === "fa" ? "نسخه MVP" : "MVP preview"}</Badge>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--foreground)]">{locale === "fa" ? "از اجرا تا بازخورد حرفه‌ای" : "From performance to professional feedback"}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-muted)]">
          {locale === "fa"
            ? "این صفحه مسیر آینده دیالوگ پرو را مدل می‌کند: ارسال اجرای ویدیویی، انتخاب منتور، رزرو جلسه، دریافت بازخورد، و پیگیری دستاوردها."
            : "This page models the future Dialog Pro flow: submit a performance, choose a mentor, book a session, receive feedback, and track achievements."}
        </p>
      </Card>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {features.map((feature) => (
          <a key={feature.label} href={feature.href} className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-raised)] p-5 shadow-[var(--shadow-cinematic)] transition hover:-translate-y-0.5 hover:border-[var(--accent)]/45 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--accent-soft)] text-[var(--primary)]">{feature.icon}</span>
            <h2 className="mt-4 text-base font-bold text-[var(--foreground)]">{feature.label}</h2>
          </a>
        ))}
      </div>
    </PageSection>
  );
}
