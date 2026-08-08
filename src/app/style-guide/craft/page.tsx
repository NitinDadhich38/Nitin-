import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DrawnHero, Em } from "@/components/craft/drawn-hero";
import { DrawnFigure, DrawnPath, DrawnIn } from "@/components/craft/drawn-figure";
import { ModeBand, BandHeader } from "@/components/craft/mode-band";
import { BigFigure } from "@/components/craft/big-figure";
import { Ledger } from "@/components/craft/ledger";
import { FlowRail } from "@/components/craft/flow-rail";
import { buttonVariants } from "@/components/ui/button";
import { siteStats, compact } from "@/lib/config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Craft Standard",
  robots: { index: false, follow: false },
};

/**
 * Live specimen of the interior-page kit (5_Design.md v2.1 §3).
 *
 * Internal review surface: the founder locks the standard here once, and the
 * remaining sixteen page templates are built from it. Everything shown is
 * either a real portfolio figure or explicitly labelled a specimen — nothing
 * on this page invents data.
 */

/** Real escrow sequence. PRAN facilitates and verifies; it never moves credits. */
const escrow = [
  { label: "Buyer confirms", detail: "Order placed against a listed, registry-issued project.", meta: "T+0" },
  { label: "Funds into escrow", detail: "Payment verified server-side before anything is released.", meta: "T+0" },
  { label: "Seller transfers", detail: "Seller moves the credits on the registry.", meta: "T+2", manual: true },
  { label: "PRAN verifies", detail: "Transfer checked against the registry record.", meta: "T+3", manual: true },
  { label: "Settled", detail: "Funds released; retirement certificate issued.", meta: "T+4" },
];

export default function CraftStandardPage() {
  return (
    <>
      <DrawnHero
        underChrome={false}
        eyebrow="Internal · Craft standard v2.1"
        lines={[
          "Every interior page",
          <>
            speaks <Em>before the words</Em>.
          </>,
        ]}
        sub="The homepage is the way in — one cinematic moment, carried by photography. Everything past it is the instrument panel: drawn, dense, numbers first. This page is that kit, live."
        actions={
          <>
            <Link href="/" className={cn(buttonVariants({ size: "lg" }), "group")}>
              Compare with the homepage
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/style-guide"
              className="text-[15px] font-medium text-white underline-offset-4 hover:underline"
            >
              Tokens &amp; components
            </Link>
          </>
        }
      />

      {/* ── The statement number ─────────────────────────────────────── */}
      <ModeBand mode="cinematic" size="lg">
        <BandHeader
          tone="dark"
          eyebrow="Technique 3"
          title="One statement number per page."
          sub="The move that makes an argument physical before it is read. A second one on the same screen turns both into a stat row — which is a weaker component, and a different one."
        />
        <div className="mt-12 grid gap-14 lg:grid-cols-2">
          <BigFigure
            value={compact(siteStats.totalVolume)}
            unit="tCO₂e listed"
            caption="across the current book"
            tone="dark"
            source="PRAN portfolio, derived"
          />
          <div className="rounded-panel bg-pran-paper p-8">
            <BigFigure
              value={siteStats.countries}
              unit="countries"
              caption="represented in the catalogue"
              tone="light"
              size="md"
              source="PRAN portfolio, derived"
            />
            <p className="mt-6 text-[13px] leading-relaxed text-pran-muted">
              Light variant drops the glow — on paper it reads as a smudge, so
              weight comes from scale and an emerald unit instead.
            </p>
          </div>
        </div>
      </ModeBand>

      {/* ── The drawn figure ─────────────────────────────────────────── */}
      <ModeBand mode="data" size="lg">
        <BandHeader
          eyebrow="Technique 4"
          title="Bespoke geometry, never a chart library."
          sub="PRAN only ever plots endpoints somebody published. A charting library will happily interpolate a curve nobody did — so interior diagrams are hand-built, and anything carrying real numbers carries its source."
        />
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <DrawnFigure
            tone="light"
            caption="Specimen only — geometry demonstrating the draw-in, with no data behind it."
          >
            <svg viewBox="0 0 600 300" className="w-full" role="img" aria-label="Specimen diagram">
              <line x1="64" y1="250" x2="560" y2="250" stroke="#e6e1d8" />
              <DrawnPath
                d="M 64 210 L 312 150 L 560 60"
                fill="none"
                stroke="#16a34a"
                strokeWidth={3}
                strokeLinecap="round"
              />
              <DrawnPath
                delay={140}
                d="M 64 210 L 312 205 L 560 196"
                fill="none"
                stroke="#c97a4a"
                strokeWidth={3}
                strokeLinecap="round"
              />
              <DrawnIn delay={900} rise={6}>
                <circle cx="560" cy="60" r="4.5" fill="#16a34a" />
                <circle cx="560" cy="196" r="4.5" fill="#c97a4a" />
                <circle cx="64" cy="210" r="4.5" fill="#0e1211" />
              </DrawnIn>
            </svg>
          </DrawnFigure>

          <Ledger
            head={["Primitive", "Role"]}
            rows={[
              { label: "DrawnFigure", value: "wrapper", note: "In-view trigger, reduced motion, source line" },
              { label: "DrawnPath", value: "stroke", note: "Draws itself; pathLength normalised" },
              { label: "DrawnIn", value: "group", note: "Labels and dots land after the line" },
            ]}
            caption="A page author writes geometry and nothing else."
          />
        </div>
      </ModeBand>

      {/* ── The ledger ───────────────────────────────────────────────── */}
      <ModeBand mode="warm" size="lg">
        <BandHeader
          eyebrow="Technique 7"
          title="Facts belong in a ledger, not a card."
          sub="Rounded cards with soft shadows are the register of a SaaS landing page. Hairlines and right-aligned tabular figures are the register of a settlement statement — which is what PRAN actually produces."
        />
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="rounded-panel bg-pran-surface p-8 shadow-card">
            <Ledger
              head={["Current book", "Count"]}
              rows={[
                { label: "Listed projects", value: siteStats.projects },
                { label: "Countries", value: siteStats.countries },
                { label: "Registry standards", value: siteStats.registries },
                { label: "Volume listed", value: `${compact(siteStats.totalVolume)} tCO₂e`, emphasis: true },
              ]}
              source="PRAN portfolio, derived"
            />
          </div>
          <div className="rounded-panel bg-pran-forest p-8">
            <Ledger
              tone="dark"
              head={["Current book", "Count"]}
              rows={[
                { label: "Listed projects", value: siteStats.projects },
                { label: "Countries", value: siteStats.countries },
                { label: "Registry standards", value: siteStats.registries },
                { label: "Volume listed", value: `${compact(siteStats.totalVolume)} tCO₂e`, emphasis: true },
              ]}
              source="PRAN portfolio, derived"
            />
          </div>
        </div>
      </ModeBand>

      {/* ── The flow rail ────────────────────────────────────────────── */}
      <ModeBand mode="forest" size="lg">
        <BandHeader
          tone="dark"
          eyebrow="Technique 6"
          title="A sequence should move, not sit in numbered boxes."
          sub="Escrow is the product, and escrow is movement. Hollow nodes mark the steps a human performs — PRAN facilitates and verifies, it never moves credits itself."
        />
        <div className="mt-14">
          <FlowRail
            tone="dark"
            steps={escrow}
            caption="Hollow node = performed manually. Timings are illustrative of the process shape, not a service-level commitment."
          />
        </div>
      </ModeBand>

      {/* ── Mode reference ───────────────────────────────────────────── */}
      <ModeBand mode="data" size="md">
        <BandHeader
          eyebrow="Technique 5"
          title="Alternate the register."
          sub="Scrolling the homepage feels like walking room to room. Interior pages lost that by running one paper card grid top to bottom. Never run three of the same mode in a row."
        />
        <div className="mt-10 grid gap-px overflow-hidden rounded-panel bg-pran-hairline sm:grid-cols-2 lg:grid-cols-4">
          {[
            { m: "cinematic", cls: "bg-pran-ink text-white", use: "Statements, opening arguments, big figures" },
            { m: "forest", cls: "bg-pran-forest text-white", use: "Conclusions, CTAs, institutional moments" },
            { m: "data", cls: "bg-pran-paper text-pran-ink", use: "The default working surface" },
            { m: "warm", cls: "bg-pran-paper-warm text-pran-ink", use: "Alternating two light sections" },
          ].map((x) => (
            <div key={x.m} className={cn("p-7", x.cls)}>
              <p className="font-display text-h3 font-semibold">{x.m}</p>
              <p
                className={cn(
                  "mt-2 text-[14px] leading-relaxed",
                  x.cls.includes("text-white") ? "text-white/60" : "text-pran-muted",
                )}
              >
                {x.use}
              </p>
            </div>
          ))}
        </div>
      </ModeBand>
    </>
  );
}
