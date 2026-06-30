import Link from "next/link";
import type { ReactNode } from "react";

type Tone = "default" | "warm" | "calm" | "danger" | "success";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function PageSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={cn("mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8", className)}>{children}</section>;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">{eyebrow}</p> : null}
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">{title}</h1>
        {subtitle ? <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-muted)]">{subtitle}</p> : null}
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2">{action}</div> : null}
    </div>
  );
}

export function Card({
  children,
  className,
  as: Component = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "article" | "aside" | "div" | "section";
}) {
  return (
    <Component
      className={cn(
        "spotlight-hover rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-raised)]/95 p-5 shadow-[var(--shadow-cinematic)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/45",
        className,
      )}
    >
      <div className="relative z-10">{children}</div>
    </Component>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]",
        variant === "primary" && "bg-[var(--primary)] text-white shadow-lg shadow-[rgb(104_25_36_/_20%)] hover:bg-[#7c2430]",
        variant === "secondary" && "border border-[var(--border-soft)] bg-[var(--surface-paper)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--primary)]",
        variant === "ghost" && "text-[var(--text-muted)] hover:bg-[var(--accent-soft)]/35 hover:text-[var(--primary)]",
      )}
    >
      {icon}
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  type = "button",
  icon,
  onClick,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  icon?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]",
        variant === "primary" && "bg-[var(--primary)] text-white shadow-lg shadow-[rgb(104_25_36_/_20%)] hover:bg-[#7c2430]",
        variant === "secondary" && "border border-[var(--border-soft)] bg-[var(--surface-paper)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--primary)]",
        variant === "ghost" && "text-[var(--text-muted)] hover:bg-[var(--accent-soft)]/35 hover:text-[var(--primary)]",
      )}
    >
      {icon}
      {children}
    </button>
  );
}

export function Badge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        tone === "default" && "border-[var(--border-soft)] bg-[var(--surface-warm)] text-[var(--text-muted)]",
        tone === "warm" && "border-[var(--accent)]/30 bg-[var(--accent-soft)] text-[#714909]",
        tone === "calm" && "border-[var(--speech-calm)]/25 bg-[#dceff0] text-[#225d63]",
        tone === "danger" && "border-[var(--danger)]/25 bg-[#f5d9d8] text-[var(--danger)]",
        tone === "success" && "border-[var(--success)]/25 bg-[#dcebdd] text-[var(--success)]",
      )}
    >
      {children}
    </span>
  );
}

export function ProgressBar({ value, label }: { value: number; label?: string }) {
  const width = Math.min(100, Math.max(0, value));
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-current opacity-75">
        {label ? <span>{label}</span> : <span />}
        <span>{width}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-[#eadbc0]">
        <div className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[#f2c56d] transition-all duration-700" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export function SafetyNote({ children, tone = "warm" }: { children: ReactNode; tone?: "warm" | "calm" | "danger" }) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4 text-sm leading-7 shadow-sm",
        tone === "warm" && "border-[var(--accent)]/30 bg-[var(--accent-soft)]/60 text-[#5b3b08]",
        tone === "calm" && "border-[var(--speech-calm)]/25 bg-[#e5f3f3] text-[#24565c]",
        tone === "danger" && "border-[var(--danger)]/25 bg-[#f6dfdc] text-[var(--danger)]",
      )}
    >
      {children}
    </div>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--border-soft)] bg-[var(--surface-paper)] p-8 text-center shadow-sm">
      <p className="text-lg font-semibold text-[var(--foreground)]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{body}</p>
    </div>
  );
}

export function InfoRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[var(--border-soft)]/60 py-3 last:border-b-0">
      <dt className="text-sm text-[var(--text-muted)]">{label}</dt>
      <dd className="max-w-[65%] text-sm font-semibold text-[var(--foreground)]">{value}</dd>
    </div>
  );
}

export function AvatarMark({
  label,
  tone,
  size = "md",
}: {
  label: string;
  tone: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div
      aria-label={label}
      className={cn(
        "grid shrink-0 place-items-center rounded-2xl bg-gradient-to-br font-semibold text-[var(--foreground)] shadow-inner ring-1 ring-inset ring-white/70",
        tone,
        size === "sm" && "h-12 w-12 text-sm",
        size === "md" && "h-16 w-16 text-lg",
        size === "lg" && "h-28 w-28 text-3xl",
      )}
    >
      {label.slice(0, 1)}
    </div>
  );
}

export function TextInput({
  label,
  placeholder,
  type = "text",
  value,
  defaultValue,
  onChange,
  name,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-[var(--foreground)]">
      <span>{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        placeholder={placeholder}
        className="mt-2 min-h-11 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-paper)] px-3 py-2 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--text-muted)]/70 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
      />
    </label>
  );
}

export function SelectInput({
  label,
  value,
  defaultValue,
  onChange,
  options,
  name,
}: {
  label: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  name?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-[var(--foreground)]">
      <span>{label}</span>
      <select
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        className="mt-2 min-h-11 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-paper)] px-3 py-2 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function TextArea({
  label,
  placeholder,
  name,
  defaultValue,
}: {
  label: string;
  placeholder?: string;
  name?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-[var(--foreground)]">
      <span>{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        rows={5}
        className="mt-2 w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface-paper)] px-3 py-2 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
      />
    </label>
  );
}

export function TrustBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/35 bg-[var(--surface-paper)] px-3 py-1.5 text-xs font-semibold text-[var(--primary)] shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
      {children}
    </span>
  );
}

export function WaveformPlayer({ label }: { label: string }) {
  const bars = [32, 56, 84, 44, 68, 92, 38, 74, 50, 88, 46, 64, 78, 36, 58, 82, 42, 72];

  return (
    <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-paper)] p-4 text-[var(--foreground)] shadow-lg">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold">{label}</span>
        <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
      </div>
      <div className="flex h-14 items-center gap-1.5" aria-hidden="true">
        {bars.map((height, index) => (
          <span
            key={`${height}-${index}`}
            className="w-full origin-center rounded-full bg-gradient-to-t from-[var(--primary)] to-[var(--accent)]"
            style={{ height: `${height}%`, animation: `waveform ${900 + index * 45}ms ease-in-out ${index * 45}ms infinite` }}
          />
        ))}
      </div>
    </div>
  );
}
