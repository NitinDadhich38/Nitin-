"use client";

import Link from "next/link";
import { Reveal } from "@/components/marketing/reveal";
import { Counter } from "@/components/marketing/counter";
import { BarChart, DonutChart } from "@/components/marketing/charts";
import {
  portfolioStats,
  volumeBySector,
  volumeByCountry,
  countByRegistry,
  getProjects,
} from "@/lib/marketplace-data";
import { compact } from "@/lib/config";

/**
 * N2 — market dashboard.
 * A read-only view of the book. Everything derives from marketplace-data.ts,
 * so it can never disagree with the marketplace itself.
 */

/** Price bands make a $0.21–$438 range legible instead of alarming. */
const BANDS: { label: string; min: number; max: number }[] = [
  { label: "Under $1", min: 0, max: 1 },
  { label: "$1 – $5", min: 1, max: 5 },
  { label: "$5 – $25", min: 5, max: 25 },
  { label: "$25 – $100", min: 25, max: 100 },
  { label: "$100+", min: 100, max: Infinity },
];

function Panel({
  title,
  caption,
  children,
  className = "",
}: {
  title: string;
  caption?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-panel bg-pran-surface p-7 shadow-card ${className}`}>
      <h2 className="font-display text-h3 font-semibold text-pran-ink">
        {title}
      </h2>
      {caption && <p className="mt-1.5 text-sm text-pran-muted">{caption}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

export function DashboardBody() {
  const projects = getProjects();

  const priceBands = BANDS.map((b) => ({
    label: b.label,
    value: projects.filter(
      (p) => p.priceUsd != null && p.priceUsd >= b.min && p.priceUsd < b.max,
    ).length,
  })).filter((b) => b.value > 0);

  // Vintage depth — how much volume sits in each year of the book.
  const vintageMap = new Map<string, number>();
  for (const p of projects) {
    for (const l of p.listings) {
      if (!l.vintage || !l.volume) continue;
      // "2021-2022" / "2021–2022" -> credit the first year
      const year = l.vintage.match(/\d{4}/)?.[0];
      if (!year) continue;
      vintageMap.set(year, (vintageMap.get(year) ?? 0) + l.volume);
    }
  }
  const vintages = Array.from(vintageMap.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const spot = projects.filter((p) =>
    p.listings.some((l) => l.delivery === "Spot"),
  ).length;
  const forward = projects.filter((p) =>
    p.listings.some((l) => l.delivery === "Forward"),
  ).length;

  const headline = [
    { label: "Projects", value: portfolioStats.projects },
    { label: "Listings", value: portfolioStats.listings },
    {
      label: "tCO₂e available",
      value: portfolioStats.totalVolume,
      display: compact(portfolioStats.totalVolume),
    },
    { label: "Countries", value: portfolioStats.countries },
    { label: "Registry standards", value: portfolioStats.registries },
    {
      label: "I-REC MWh",
      value: portfolioStats.irecVolumeMwh,
      display: compact(portfolioStats.irecVolumeMwh),
    },
  ];

  return (
    <div className="mx-auto max-w-content px-6 py-16">
      {/* Headline row */}
      <Reveal>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-panel bg-pran-hairline shadow-card sm:grid-cols-3 lg:grid-cols-6">
          {headline.map((s) => (
            <div key={s.label} className="bg-pran-surface p-5">
              <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-pran-muted">
                {s.label}
              </dt>
              <dd className="mt-2 font-display text-2xl font-semibold tabular-nums text-pran-ink">
                {s.display ?? <Counter to={s.value} />}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* Supply composition */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <Panel
            title="Supply by technology"
            caption="tCO₂e across the book"
          >
            <BarChart data={volumeBySector()} />
          </Panel>
        </Reveal>

        <Reveal delay={0.08}>
          <Panel
            title="Supply by geography"
            caption={`${portfolioStats.countries} countries represented`}
          >
            <BarChart data={volumeByCountry().slice(0, 10)} />
          </Panel>
        </Reveal>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Reveal>
          <Panel
            title="Registry standards"
            caption="Projects by issuing standard"
          >
            <DonutChart data={countByRegistry()} />
          </Panel>
        </Reveal>

        <Reveal delay={0.08}>
          <Panel
            title="Price bands"
            caption="Projects per band — not all tonnes are equal"
          >
            <BarChart data={priceBands} unit=" projects" />
            <p className="mt-6 border-t border-pran-hairline pt-5 text-sm text-pran-muted">
              Full range{" "}
              <span className="font-medium tabular-nums text-pran-ink">
                ${portfolioStats.priceMin.toFixed(2)} – $
                {portfolioStats.priceMax.toFixed(0)}
              </span>{" "}
              / tCO₂e. Renewable-energy credits sit near the floor; removals and
              community forestry at the top.
            </p>
          </Panel>
        </Reveal>

        <Reveal delay={0.16}>
          <Panel title="Availability" caption="How the book can be delivered">
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-pran-ink">Spot</span>
                  <span className="font-mono text-sm tabular-nums text-pran-muted">
                    {spot} projects
                  </span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-pran-hairline">
                  <div
                    className="h-full rounded-full bg-pran-emerald"
                    style={{ width: `${(spot / projects.length) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-pran-ink">Forward</span>
                  <span className="font-mono text-sm tabular-nums text-pran-muted">
                    {forward} projects
                  </span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-pran-hairline">
                  <div
                    className="h-full rounded-full bg-pran-forest"
                    style={{ width: `${(forward / projects.length) * 100}%` }}
                  />
                </div>
              </div>
              <p className="border-t border-pran-hairline pt-5 text-sm leading-relaxed text-pran-muted">
                Spot credits are already issued and can transfer immediately.
                Forward credits are contracted against a future issuance.
              </p>
            </div>
          </Panel>
        </Reveal>
      </div>

      {/* Vintage depth */}
      <Reveal>
        <div className="mt-6">
          <Panel
            title="Vintage depth"
            caption="Volume by the year the reduction occurred"
          >
            <BarChart data={vintages} />
          </Panel>
        </div>
      </Reveal>

      {/* Largest listings */}
      <Reveal>
        <div className="mt-6">
          <Panel
            title="Largest available volumes"
            caption="The ten deepest projects in the book"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-pran-hairline">
                    {["Project", "Technology", "Country", "Volume", "Price"].map(
                      (h, i) => (
                        <th
                          key={h}
                          className={`px-3 py-3 text-[11px] font-medium uppercase tracking-[0.08em] text-pran-muted ${
                            i > 2 ? "text-right" : "text-left"
                          }`}
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {[...projects]
                    .sort((a, b) => (b.totalVolume ?? 0) - (a.totalVolume ?? 0))
                    .slice(0, 10)
                    .map((p) => (
                      <tr
                        key={p.id}
                        className="border-b border-pran-hairline last:border-b-0"
                      >
                        <td className="px-3 py-3">
                          <Link
                            href={`/marketplace/${p.slug}`}
                            className="font-medium text-pran-ink hover:text-pran-emerald"
                          >
                            {p.name}
                          </Link>
                        </td>
                        <td className="px-3 py-3 text-pran-muted">{p.sector}</td>
                        <td className="px-3 py-3 text-pran-muted">{p.country}</td>
                        <td className="px-3 py-3 text-right tabular-nums text-pran-ink">
                          {p.totalVolume?.toLocaleString("en-US") ?? "—"}
                        </td>
                        <td className="px-3 py-3 text-right tabular-nums text-pran-ink">
                          {p.priceUsd != null
                            ? `$${p.priceUsd.toFixed(2)}`
                            : "On request"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      </Reveal>

      <p className="mt-8 text-xs text-pran-muted">
        Portfolio as of July 2026. Figures are derived from the PRAN book and
        update when the book does. Indicative prices are not firm quotes.
      </p>
    </div>
  );
}
