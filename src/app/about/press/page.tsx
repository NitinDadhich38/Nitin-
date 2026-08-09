import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { DrawnHero, Em, FieldPath } from "@/components/craft/drawn-hero";
import { ModeBand, BandHeader } from "@/components/craft/mode-band";
import { Ledger } from "@/components/craft/ledger";
import { Reveal } from "@/components/marketing/reveal";
import { CtaBand } from "@/components/marketing/page-kit";
import { Logo } from "@/components/shared/logo";
import { founder } from "@/lib/leadership";
import { portfolioStats } from "@/lib/marketplace-data";
import { compact } from "@/lib/config";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Press & Newsroom",
  description:
    "PRAN press kit — quotable boilerplate, a verifiable fact sheet, brand basics, and a direct media contact.",
};

/**
 * /about/press — a press KIT, not a "newsroom" with nothing in it.
 *
 * There is no coverage yet, so the page does not pretend otherwise. What a
 * journalist on deadline actually needs — a quotable description, checkable
 * facts, the right spelling, and someone who answers — is here instead.
 */

/** Every line is verifiable from the site itself. */
const factSheet = [
  { label: "Legal entity", value: "Pran Sustainability Pvt. Ltd." },
  { label: "Trading name", value: "PRAN" },
  { label: "Category", value: "Carbon market infrastructure" },
  { label: "Home market", value: "India" },
  { label: "Founder & MD", value: founder.name },
];

/** Pre-cleared language. Written to be quoted verbatim without a correction. */
const boilerplate =
  "PRAN is the financial-infrastructure layer for the carbon market. Operated by Pran Sustainability Pvt. Ltd. and based in India, PRAN runs a marketplace of registry-issued carbon credits with escrow-based settlement and factual retirement records. PRAN does not issue, audit or verify carbon credits — those functions belong to registries and accredited third parties.";

const styleRules = [
  { label: "Spelling", value: "PRAN", note: "All capitals. Not Pran, not PRAN Global." },
  { label: "First reference", value: "PRAN", note: "Operated by Pran Sustainability Pvt. Ltd." },
  { label: "Never describe as", value: "An offset seller", note: "PRAN lists credits issued by registries; it does not create or resell its own supply." },
  { label: "Never attribute", value: "Neutrality claims", note: "PRAN's records state that credits were purchased and retired for a stated period — never that anything is carbon neutral." },
];

/** Hero field — a column grid, like a page being set. */
function ColumnField() {
  const cols = [220, 470, 720, 970, 1220];
  return (
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="cf-glow" cx="56%" cy="46%" r="56%">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="760" fill="url(#cf-glow)" />
      {cols.map((x, i) => (
        <g key={x}>
          <FieldPath
            d={`M ${x} 170 L ${x} 610`}
            stroke="#ffffff"
            strokeOpacity="0.14"
            strokeWidth="1.5"
            delay={0.3 + i * 0.1}
          />
          {Array.from({ length: 11 }, (_, r) => (
            <line
              key={r}
              x1={x + 14}
              y1={200 + r * 38}
              x2={x + 14 + (r % 4 === 3 ? 100 : 190)}
              y2={200 + r * 38}
              stroke={r === 0 ? "#d9f99d" : "#ffffff"}
              strokeWidth={r === 0 ? 3 : 2}
              className="field-in"
              style={
                {
                  "--field-opacity": r === 0 ? "0.5" : "0.07",
                  animationDelay: `${0.7 + i * 0.12 + r * 0.03}s`,
                } as CSSProperties
              }
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

export default function PressPage() {
  return (
    <>
      <DrawnHero
        eyebrow="Press"
        lines={[
          "Everything you need",
          <>
            to <Em>quote us correctly</Em>.
          </>,
        ]}
        sub="No coverage yet — PRAN is early, and pretending otherwise would be the first thing worth correcting. What follows is accurate, checkable and cleared for publication."
        field={<ColumnField />}
        actions={
          <a
            href={`mailto:${founder.email}?subject=Press%20enquiry`}
            className={cn(buttonVariants({ size: "lg" }), "group")}
          >
            <Mail className="h-4 w-4" />
            Media enquiries
          </a>
        }
      />

      {/* ── Boilerplate ─────────────────────────────────────────────────── */}
      <ModeBand mode="data" size="lg">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <BandHeader
              eyebrow="Boilerplate"
              title="Copy this, not our marketing."
              sub="Written to be quoted verbatim. It states what PRAN does and, deliberately, what it does not — the two things most easily got wrong about a carbon business."
            />
            <Reveal delay={0.06}>
              <blockquote className="mt-10 border-l-2 border-pran-emerald pl-6 text-[17px] leading-relaxed text-pran-ink">
                {boilerplate}
              </blockquote>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <Ledger
              head={["Fact", "Detail"]}
              rows={factSheet.map((f) => ({ label: f.label, value: f.value }))}
              caption="Every line here is verifiable elsewhere on this site."
            />
          </Reveal>
        </div>
      </ModeBand>

      {/* ── Style guide for writers ─────────────────────────────────────── */}
      <ModeBand mode="warm" size="lg">
        <BandHeader
          eyebrow="Style"
          title="Four things that get misreported."
          sub="Not pedantry — two of these are legal distinctions, and getting them wrong would misdescribe what PRAN is allowed to do."
        />
        <div className="mt-12">
          <Ledger rows={styleRules} />
        </div>
      </ModeBand>

      {/* ── Brand ───────────────────────────────────────────────────────── */}
      <ModeBand mode="data" size="lg">
        <BandHeader
          eyebrow="Brand"
          title="The mark."
          sub="Use the wordmark as supplied, with clear space around it. The emblem green is fixed and must not be recoloured."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-panel bg-pran-hairline sm:grid-cols-2">
          <div className="flex min-h-[200px] items-center justify-center bg-pran-surface p-10">
            <Logo className="h-10 w-auto text-pran-ink" />
          </div>
          <div className="flex min-h-[200px] items-center justify-center bg-pran-forest p-10">
            <Logo className="h-10 w-auto text-white" />
          </div>
        </div>
        <Reveal delay={0.08}>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Ledger
              head={["Colour", "Value"]}
              rows={[
                { label: "Emblem green", value: "#12A33A", note: "Fixed — never recoloured" },
                { label: "Forest", value: "#0F3D2E", note: "Dark surfaces" },
                { label: "Paper", value: "#FAF8F4", note: "Light surfaces" },
              ]}
            />
            <div className="rounded-card bg-pran-paper-warm p-7">
              <p className="text-[15px] leading-relaxed text-pran-muted">
                Need vector files, a founder portrait, or a specific crop? Email{" "}
                <a
                  href={`mailto:${founder.email}?subject=Brand%20assets`}
                  className="font-medium text-pran-emerald underline underline-offset-4"
                >
                  {founder.email}
                </a>{" "}
                and we&rsquo;ll send them the same day.
              </p>
            </div>
          </div>
        </Reveal>
      </ModeBand>

      {/* ── Checkable scale ─────────────────────────────────────────────── */}
      <ModeBand mode="cinematic" size="md">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal>
            <h2 className="max-w-[18ch] font-display text-h2 font-semibold tracking-[-0.02em] text-white">
              Numbers you can check before you print them.
            </h2>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-white/70">
              All derived from the live portfolio behind the marketplace. If a
              figure here disagrees with what you see there, the marketplace is
              right and we want to know.
            </p>
            <Link
              href="/marketplace"
              className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-medium text-pran-lime underline-offset-4 hover:underline"
            >
              Check them
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <Ledger
              tone="dark"
              head={["Metric", "Today"]}
              rows={[
                { label: "Listed projects", value: portfolioStats.projects },
                { label: "Countries", value: portfolioStats.countries },
                { label: "Registry standards", value: portfolioStats.registries },
                {
                  label: "Volume listed",
                  value: `${compact(portfolioStats.totalVolume)} tCO₂e`,
                  emphasis: true,
                },
              ]}
              source="PRAN portfolio, derived"
            />
          </Reveal>
        </div>
      </ModeBand>

      <CtaBand
        title="On deadline?"
        subtitle="Press enquiries go straight to the founder, not a shared inbox."
        primary={{ label: "Email the founder", href: `mailto:${founder.email}?subject=Press%20enquiry` }}
        secondary={{ label: "Leadership", href: "/about/team" }}
      />
    </>
  );
}
