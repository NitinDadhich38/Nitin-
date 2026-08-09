import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * What survives of the original interior-page kit.
 *
 * PageHeader, SectionHeader, FeatureGrid and Steps were removed in the v2.1
 * redesign (7_Page_Design_Roadmap.md, task 4.6). They were the flat forest
 * rectangle and the repeating card grid that made sixteen pages look like one
 * page — every interior page now opens with DrawnHero and structures its body
 * with ModeBand / Ledger / FlowRail from src/components/craft/.
 *
 * These three stayed because nothing in the craft kit replaces them: a closing
 * CTA band, a prose wrapper for legal and explainer text, and a callout for
 * disclaimers.
 */

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

/**
 * Prose wrapper for text-heavy pages (legal, explainers). Editorial register.
 *
 * Deliberately carries NO padding of its own — it used to own `px-6 py-20`,
 * which double-padded inside the legal layout and fought the two-column
 * article grid on /resources/[slug]. Spacing belongs to whatever places it.
 */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[68ch] [&_a]:text-pran-emerald [&_a]:underline [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-h2 [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-pran-ink [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-h3 [&_h3]:font-semibold [&_h3]:text-pran-ink [&_li]:mt-2 [&_li]:leading-relaxed [&_li]:text-pran-muted [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mt-4 [&_p]:leading-[1.75] [&_p]:text-pran-muted [&_strong]:font-semibold [&_strong]:text-pran-ink [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5">
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
