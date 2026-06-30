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
  return <section className={cn("mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8", className)}>{children}</section>;
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
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? <p className="mb-2 text-sm font-semibold text-teal-700">{eyebrow}</p> : null}
        <h1 className="text-3xl font-semibold text-zinc-950 sm:text-4xl">{title}</h1>
        {subtitle ? <p className="mt-3 text-base leading-7 text-zinc-600">{subtitle}</p> : null}
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
    <Component className={cn("rounded-lg border border-zinc-200 bg-white p-5 shadow-sm", className)}>{children}</Component>
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
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2",
        variant === "primary" && "bg-zinc-950 text-white hover:bg-zinc-800",
        variant === "secondary" && "border border-zinc-300 bg-white text-zinc-900 hover:border-teal-600 hover:text-teal-800",
        variant === "ghost" && "text-zinc-700 hover:bg-zinc-100",
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
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2",
        variant === "primary" && "bg-zinc-950 text-white hover:bg-zinc-800",
        variant === "secondary" && "border border-zinc-300 bg-white text-zinc-900 hover:border-teal-600 hover:text-teal-800",
        variant === "ghost" && "text-zinc-700 hover:bg-zinc-100",
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
        "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold",
        tone === "default" && "bg-zinc-100 text-zinc-700",
        tone === "warm" && "bg-amber-100 text-amber-800",
        tone === "calm" && "bg-teal-100 text-teal-800",
        tone === "danger" && "bg-rose-100 text-rose-800",
        tone === "success" && "bg-emerald-100 text-emerald-800",
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
      <div className="mb-2 flex items-center justify-between text-sm text-zinc-600">
        {label ? <span>{label}</span> : <span />}
        <span>{width}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
        <div className="h-full rounded-full bg-teal-600 transition-all duration-500" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export function SafetyNote({ children, tone = "warm" }: { children: ReactNode; tone?: "warm" | "calm" | "danger" }) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4 text-sm leading-6",
        tone === "warm" && "border-amber-200 bg-amber-50 text-amber-900",
        tone === "calm" && "border-teal-200 bg-teal-50 text-teal-900",
        tone === "danger" && "border-rose-200 bg-rose-50 text-rose-900",
      )}
    >
      {children}
    </div>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center">
      <p className="text-lg font-semibold text-zinc-950">{title}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{body}</p>
    </div>
  );
}

export function InfoRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-zinc-100 py-3 last:border-b-0">
      <dt className="text-sm text-zinc-500">{label}</dt>
      <dd className="max-w-[65%] text-sm font-medium text-zinc-900">{value}</dd>
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
        "grid shrink-0 place-items-center rounded-lg bg-gradient-to-br font-semibold text-zinc-900 ring-1 ring-inset ring-white/70",
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
    <label className="block text-sm font-medium text-zinc-700">
      <span>{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        placeholder={placeholder}
        className="mt-2 min-h-11 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
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
    <label className="block text-sm font-medium text-zinc-700">
      <span>{label}</span>
      <select
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        className="mt-2 min-h-11 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
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
    <label className="block text-sm font-medium text-zinc-700">
      <span>{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        rows={5}
        className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
      />
    </label>
  );
}
