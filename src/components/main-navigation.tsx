"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/components/ui/primitives";
import type { Locale } from "@/i18n/config";
import { getMainNavigation, isNavigationActive } from "@/lib/navigation";

export function DesktopMainNavigation({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const items = getMainNavigation(locale);

  return (
    <nav aria-label={locale === "fa" ? "ناوبری اصلی" : "Main navigation"}>
      <div className="flex flex-wrap justify-center gap-2 rounded-full border border-white/55 bg-white/35 p-1 shadow-inner shadow-white/40">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isNavigationActive(pathname, item);
          const pro = item.id === "pro";

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)]",
                active ? "border-[var(--accent)]/45 bg-[var(--surface-paper)] text-[var(--primary)] shadow-sm" : "border-transparent text-[#6d5e4d] hover:border-[var(--accent)]/35 hover:bg-[var(--surface-paper)] hover:text-[var(--primary)] hover:shadow-sm",
                pro && !active && "border-[var(--accent)]/25 bg-[var(--accent-soft)]/35 text-[var(--primary)]",
                pro && active && "bg-[linear-gradient(135deg,var(--primary),#8d3140)] text-white",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function MobileBottomNavigation({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const items = getMainNavigation(locale);

  return (
    <nav
      aria-label={locale === "fa" ? "ناوبری موبایل" : "Mobile navigation"}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-soft)]/80 bg-[rgba(255,248,234,0.94)] px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 shadow-[0_-18px_48px_rgb(85_45_18_/_14%)] backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isNavigationActive(pathname, item);
          const pro = item.id === "pro";

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[0.68rem] font-semibold leading-tight transition active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]",
                active ? "text-[var(--primary)]" : "text-[var(--text-muted)]",
                pro && "relative -mt-5 min-h-[4.5rem] rounded-3xl border border-[var(--accent)]/35 bg-[linear-gradient(135deg,#fff4cf,#f6ddaa)] text-[var(--primary)] shadow-lg shadow-[rgb(212_154_42_/_24%)]",
              )}
            >
              <span
                className={cn(
                  "grid h-7 w-7 place-items-center rounded-full",
                  active && !pro && "bg-[var(--accent-soft)]",
                  pro && "h-9 w-9 bg-white/72",
                )}
              >
                <Icon className={cn("h-4 w-4", pro && "h-5 w-5")} aria-hidden="true" />
              </span>
              <span className="max-w-full truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
