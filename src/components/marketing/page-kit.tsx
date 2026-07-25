import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Page hero band. tone="light" (paper) or "dark" (navy/ink). */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section
      className={cn(
        "border-b",
        dark ? "border-white/10 bg-pran-ink text-white" : "border-pran-border bg-pran-paper",
      )}
    >
      <div className="mx-auto max-w-content px-6 py-16 sm:py-20">
        <Reveal>
          <p className={cn("font-mono text-xs uppercase tracking-[0.2em]", dark ? "text-pran-teal-lit" : "text-pran-teal")}>
            {eyebrow}
          </p>
          <h1 className={cn("mt-3 max-w-3xl font-display text-h1 font-semibold", dark ? "text-white" : "text-pran-text")}>
            {title}
          </h1>
          {subtitle && (
            <p className={cn("mt-4 max-w-2xl text-lg", dark ? "text-white/70" : "text-pran-muted")}>
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mx-auto max-w-content px-6 py-16", className)}>
      {children}
    </section>
  );
}

export function FeatureGrid({
  items,
}: {
  items: { icon?: LucideIcon; title: string; desc: string }[];
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 0.06}>
          <div className="flex h-full flex-col rounded-card border border-pran-border bg-white p-6">
            {it.icon && <it.icon className="h-6 w-6 text-pran-teal" />}
            <h3 className="mt-3 font-medium text-pran-text">{it.title}</h3>
            <p className="mt-2 text-sm text-pran-muted">{it.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Steps({ steps }: { steps: string[] }) {
  return (
    <ol className="grid gap-5 sm:grid-cols-3">
      {steps.map((s, i) => (
        <Reveal key={i} delay={i * 0.08}>
          <li className="rounded-card border border-pran-border bg-white p-6">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pran-teal/10 font-mono text-sm font-semibold text-pran-teal">
              {i + 1}
            </span>
            <p className="mt-3 text-sm text-pran-text">{s}</p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

export function CtaBand({
  title,
  subtitle,
  primary = { label: "Request Demo", href: "/contact" },
  secondary,
}: {
  title: string;
  subtitle?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-pran-navy py-20 text-center text-white">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="font-display text-h2 font-semibold">{title}</h2>
        {subtitle && <p className="mt-4 text-white/70">{subtitle}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={primary.href} className={buttonVariants({ size: "lg" })}>
            {primary.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/40 text-white hover:bg-white/10",
              )}
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/** Simple prose wrapper for text-heavy pages (legal, explainers). */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-h3 [&_h2]:font-semibold [&_h2]:text-pran-text [&_h3]:mt-6 [&_h3]:font-medium [&_h3]:text-pran-text [&_li]:mt-1.5 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mt-3 [&_p]:leading-relaxed [&_p]:text-pran-text [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_a]:text-pran-teal [&_a]:underline">
      {children}
    </div>
  );
}
