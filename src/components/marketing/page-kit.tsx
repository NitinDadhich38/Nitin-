import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Interior page shell (5_Design.md §4.5 + proposal I1).
 * Forest band header → paper body → closing CTA. Consistency across every
 * interior page is what makes the site feel finished rather than assembled.
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  tone = "dark",
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
        dark
          ? "bg-pran-forest text-white"
          : "border-b border-pran-hairline bg-pran-paper-warm",
      )}
    >
      <div className="mx-auto max-w-content px-6 py-16 sm:py-20">
        <Reveal>
          <p
            className={cn(
              "text-xs font-medium uppercase tracking-[0.08em]",
              dark ? "text-pran-lime" : "text-pran-emerald",
            )}
          >
            {eyebrow}
          </p>
          <h1
            className={cn(
              "mt-4 max-w-[20ch] font-display text-display-l font-semibold",
              dark ? "text-white" : "text-pran-ink",
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={cn(
                "mt-5 max-w-[62ch] text-lg leading-relaxed",
                dark ? "text-white/70" : "text-pran-muted",
              )}
            >
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
    <section className={cn("mx-auto max-w-content px-6 py-20", className)}>
      {children}
    </section>
  );
}

/** Left-aligned section opener (§3.7). */
export function SectionHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal>
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-emerald">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-4 max-w-[20ch] font-display text-display-l font-semibold text-pran-ink">
        {title}
      </h2>
      {sub && (
        <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-pran-muted">
          {sub}
        </p>
      )}
    </Reveal>
  );
}

export function FeatureGrid({
  items,
}: {
  items: { icon?: LucideIcon; title: string; desc: string }[];
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 0.06}>
          <div className="flex h-full flex-col rounded-panel bg-pran-surface p-7 shadow-card transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-float">
            {it.icon && <it.icon className="h-5 w-5 text-pran-emerald" />}
            <h3 className="mt-4 font-display text-h3 font-semibold text-pran-ink">
              {it.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-pran-muted">
              {it.desc}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Steps({ steps }: { steps: string[] }) {
  return (
    <ol className="grid gap-6 sm:grid-cols-3">
      {steps.map((s, i) => (
        <Reveal key={i} delay={i * 0.08}>
          <li className="rounded-panel bg-pran-surface p-7 shadow-card">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pran-emerald/10 font-mono text-sm font-semibold text-pran-emerald-hover">
              {i + 1}
            </span>
            <p className="mt-4 text-[15px] leading-relaxed text-pran-ink">{s}</p>
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
    <section className="bg-pran-forest py-24 text-center text-white">
      <div className="mx-auto max-w-2xl px-6">
        <Reveal>
          <h2 className="mx-auto max-w-[20ch] font-display text-display-l font-semibold text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-[52ch] text-lg leading-relaxed text-white/70">
              {subtitle}
            </p>
          )}
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href={primary.href}
              className={cn(buttonVariants({ size: "lg" }), "group")}
            >
              {primary.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/40 text-white hover:border-white/70",
                )}
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Prose wrapper for text-heavy pages (legal, explainers). Editorial register. */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[68ch] px-6 py-20 [&_a]:text-pran-emerald [&_a]:underline [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-h2 [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-pran-ink [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-h3 [&_h3]:font-semibold [&_h3]:text-pran-ink [&_li]:mt-2 [&_li]:leading-relaxed [&_li]:text-pran-muted [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mt-4 [&_p]:leading-[1.75] [&_p]:text-pran-muted [&_strong]:font-semibold [&_strong]:text-pran-ink [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5">
      {children}
    </div>
  );
}

/** Callout for disclaimers and legal-sensitive framing. */
export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 rounded-card bg-pran-paper-warm p-6 text-[15px] leading-relaxed text-pran-muted [&_strong]:font-medium [&_strong]:text-pran-ink">
      {children}
    </div>
  );
}
