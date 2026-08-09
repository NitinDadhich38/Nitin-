import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { getProjects, portfolioStats } from "@/lib/marketplace-data";
import { MarketplaceBrowser } from "@/components/marketplace/marketplace-browser";
import { IrecBand } from "@/components/marketplace/irec-band";
import { FieldPath } from "@/components/craft/drawn-hero";
import { compact } from "@/lib/config";

export const metadata: Metadata = {
  title: "Marketplace",
  description:
    "Browse verified carbon-credit projects across global registries — afforestation, renewable energy, blue carbon, and more. Filter by registry, type, country, and price.",
};

/**
 * /marketplace — a craft pass, not a rebuild.
 *
 * This page is a Data-mode working surface (5_Design.md §8), so it deliberately
 * does NOT get the full-height drawn hero the argument pages use: the pill tabs
 * overlap the band edge, and a 68svh opening would push the filters below the
 * fold on the one page where a buyer came to filter.
 *
 * What it gets instead: the same compact band, now with a drawn field behind it
 * and the exact portfolio figures. Rounded-down marketing numbers belong
 * elsewhere — here a buyer needs the real count.
 */

/** Compact depth field — sized to the band, never taller than it. */
function DepthField() {
  const bars = Array.from({ length: 26 }, (_, i) => ({
    x: 40 + i * 56,
    h: 26 + ((i * 53) % 96),
  }));
  return (
    <svg
      viewBox="0 0 1440 300"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <radialGradient id="mk-glow" cx="74%" cy="46%" r="58%">
          <stop offset="0%" stopColor="#d9f99d" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#d9f99d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="300" fill="url(#mk-glow)" />
      <FieldPath d="M 0 250 L 1440 250" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="1.5" delay={0.25} />
      {bars.map((b, i) => (
        <rect
          key={b.x}
          x={b.x}
          y={250 - b.h}
          width="22"
          height={b.h}
          rx="3"
          fill={i % 6 === 2 ? "#d9f99d" : "#ffffff"}
          className="field-in"
          style={
            {
              "--field-opacity": i % 6 === 2 ? "0.3" : "0.07",
              animationDelay: `${0.3 + i * 0.03}s`,
            } as CSSProperties
          }
        />
      ))}
    </svg>
  );
}

export default function MarketplacePage() {
  const projects = getProjects();
  const priced = projects
    .map((p) => p.priceUsd)
    .filter((n): n is number => n !== null);
  const priceBounds = {
    min: Math.floor(Math.min(...priced)),
    max: Math.ceil(Math.max(...priced)),
  };

  const facts = [
    { label: "Projects", value: `${portfolioStats.projects}` },
    { label: "Countries", value: `${portfolioStats.countries}` },
    { label: "Registry standards", value: `${portfolioStats.registries}` },
    { label: "Volume listed", value: `${compact(portfolioStats.totalVolume)} tCO₂e` },
  ];

  return (
    <div className="bg-pran-paper">
      {/* Compact forest header band, now drawn (5_Design.md v2.1 §3) */}
      <section className="relative overflow-hidden bg-pran-forest text-white">
        <div aria-hidden className="absolute inset-0">
          <DepthField />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,61,46,.86),rgba(15,61,46,.72))]"
        />

        <div className="relative z-10 mx-auto max-w-content px-6 pb-20 pt-16 sm:pb-24">
          <h1 className="max-w-[20ch] font-display text-display-l font-semibold text-white">
            Verified carbon projects, one transparent market.
          </h1>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-white/70">
            Every listing is a real, registry-issued project. Purchases move
            through PRAN&rsquo;s escrow — you pay PRAN, credits transfer to your
            registry account, and you receive a retirement certificate.
          </p>

          {/* Exact figures — the marketplace is where a buyer needs them. */}
          <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-5 border-t border-white/15 pt-6 sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/50">
                  {f.label}
                </dt>
                <dd className="mt-1.5 font-display text-[22px] font-semibold tabular-nums text-white">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Pill tabs overlap the band edge; three-column working layout below */}
      <MarketplaceBrowser projects={projects} priceBounds={priceBounds} />

      {/* Energy attribute certificates — separate instrument, separate band */}
      <IrecBand />
    </div>
  );
}
