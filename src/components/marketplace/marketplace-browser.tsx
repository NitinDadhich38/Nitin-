"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, X, ArrowRight } from "lucide-react";
import type { Project } from "@/lib/marketplace-data";
import { facets, projectHref } from "@/lib/marketplace-data";
import { ProjectTeaser, priceLabel } from "@/components/marketing/project-teaser";
import { photoForSector } from "@/lib/images";
import { countryFlag } from "@/lib/sectors";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

/** Broad type groups for the pill tabs (§3.5), matched against granular sectors. */
const TYPE_GROUPS: { label: string; match: (sector: string) => boolean }[] = [
  { label: "All Projects", match: () => true },
  { label: "Forestry", match: (s) => /afforest|reforest|afolu/i.test(s) },
  { label: "Renewable", match: (s) => /renewable|energy industr|rec|hydro/i.test(s) },
  { label: "Blue Carbon", match: (s) => /blue|marine/i.test(s) },
  { label: "Agriculture", match: (s) => /agri/i.test(s) },
  { label: "Waste & Biogas", match: (s) => /waste|biogas|manure/i.test(s) },
  { label: "Industrial", match: (s) => /industrial|efficiency/i.test(s) },
];

function toggle<T>(set: T[], value: T): T[] {
  return set.includes(value) ? set.filter((v) => v !== value) : [...set, value];
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
  scroll = false,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  scroll?: boolean;
}) {
  return (
    <div className="border-t border-pran-hairline py-4 first:border-t-0 first:pt-0">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-pran-muted">
        {title}
      </p>
      <ul className={cn("space-y-2", scroll && "max-h-44 overflow-y-auto pr-1")}>
        {options.map((opt) => (
          <li key={opt}>
            <label className="flex cursor-pointer items-start gap-2.5 text-sm text-pran-ink">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onToggle(opt)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-pran-emerald"
              />
              <span className="leading-snug">{opt}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Live data panel (§3.6) — floats beside the grid, shows the focused project. */
function DataPanel({
  project,
  priceBounds,
}: {
  project: Project;
  priceBounds: { min: number; max: number };
}) {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Registry", value: project.registry },
    { label: "Reference", value: project.id },
    { label: "Type", value: project.sector },
    {
      label: "Country",
      value: (
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden>{countryFlag(project.country)}</span>
          {project.country}
        </span>
      ),
    },
    { label: "Vintage", value: project.vintageLabel },
    {
      label: "Volume",
      value: project.totalVolume
        ? `${project.totalVolume.toLocaleString("en-US")} tCO₂e`
        : "On request",
    },
  ];
  const pct =
    project.priceUsd != null && priceBounds.max > priceBounds.min
      ? Math.max(
          6,
          Math.round(
            ((project.priceUsd - priceBounds.min) /
              (priceBounds.max - priceBounds.min)) *
              100,
          ),
        )
      : 0;

  return (
    <div className="overflow-hidden rounded-panel bg-pran-surface shadow-float">
      <div className="relative aspect-[16/9] w-full bg-pran-paper-warm">
        <Image
          src={photoForSector(project.sector)}
          alt=""
          fill
          sizes="360px"
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-h3 font-semibold leading-snug text-pran-ink">
          {project.name}
        </h3>
        <dl className="mt-5 space-y-3">
          {rows.map((r) => (
            <div
              key={r.label}
              className="flex items-start justify-between gap-4 text-sm"
            >
              <dt className="shrink-0 text-pran-muted">{r.label}</dt>
              <dd className="text-right font-medium text-pran-ink">{r.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 border-t border-pran-hairline pt-5">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-pran-muted">
              Price
            </span>
            <span className="text-lg font-semibold tabular-nums text-pran-ink">
              {priceLabel(project)}
              {project.priceUsd != null && (
                <span className="text-sm font-normal text-pran-muted"> / tCO₂e</span>
              )}
            </span>
          </div>
          {project.priceUsd != null && (
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-pran-hairline">
              <div
                className="h-full rounded-full bg-pran-emerald"
                style={{ width: `${pct}%` }}
              />
            </div>
          )}
        </div>

        <Link
          href={projectHref(project)}
          className={cn(buttonVariants({ size: "default" }), "group mt-6 w-full")}
        >
          View project
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

export function MarketplaceBrowser({
  projects,
  priceBounds,
}: {
  projects: Project[];
  priceBounds: { min: number; max: number };
}) {
  const [query, setQuery] = useState("");
  const [typeIdx, setTypeIdx] = useState(0);
  const [registries, setRegistries] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [deliveries, setDeliveries] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [sort, setSort] = useState<Sort>("featured");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Only show pill types that actually have listings.
  const typePills = useMemo(
    () =>
      TYPE_GROUPS.filter(
        (g, i) => i === 0 || projects.some((p) => g.match(p.sector)),
      ),
    [projects],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const typeMatch = TYPE_GROUPS[typeIdx]?.match ?? (() => true);
    let list = projects.filter((p) => {
      if (!typeMatch(p.sector)) return false;
      if (registries.length && !registries.includes(p.registry)) return false;
      if (countries.length && !countries.includes(p.country)) return false;
      if (
        deliveries.length &&
        !p.listings.some((l) => l.delivery && deliveries.includes(l.delivery))
      )
        return false;
      if (p.priceUsd != null && p.priceUsd > maxPrice) return false;
      if (q) {
        const hay =
          `${p.name} ${p.developer ?? ""} ${p.description} ${p.country}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const priceOr = (p: Project, fb: number) => p.priceUsd ?? fb;
    if (sort === "price-asc")
      list = [...list].sort((a, b) => priceOr(a, Infinity) - priceOr(b, Infinity));
    else if (sort === "price-desc")
      list = [...list].sort((a, b) => priceOr(b, -Infinity) - priceOr(a, -Infinity));
    else if (sort === "name")
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [projects, query, typeIdx, registries, countries, deliveries, maxPrice, sort]);

  const selected =
    filtered.find((p) => p.id === selectedId) ?? filtered[0] ?? null;

  const activeCount =
    registries.length +
    countries.length +
    deliveries.length +
    (maxPrice < priceBounds.max ? 1 : 0);
  const clearAll = () => {
    setRegistries([]);
    setCountries([]);
    setDeliveries([]);
    setMaxPrice(priceBounds.max);
    setQuery("");
  };

  const filterPanel = (
    <div>
      <div className="flex items-center justify-between border-b border-pran-hairline pb-4">
        <span className="text-sm font-semibold text-pran-ink">Filters</span>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs font-medium text-pran-emerald hover:underline"
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>
      <div className="pt-4">
        <FilterGroup
          title="Registry"
          options={facets.registries}
          selected={registries}
          onToggle={(v) => setRegistries((s) => toggle(s, v))}
        />
        <FilterGroup
          title="Delivery"
          options={facets.deliveries}
          selected={deliveries}
          onToggle={(v) => setDeliveries((s) => toggle(s, v))}
        />
        <FilterGroup
          title="Country"
          options={facets.countries}
          selected={countries}
          onToggle={(v) => setCountries((s) => toggle(s, v))}
          scroll
        />
        <div className="border-t border-pran-hairline py-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-pran-muted">
              Max price
            </p>
            <span className="text-sm font-medium tabular-nums text-pran-ink">
              ${maxPrice}
            </span>
          </div>
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-pran-emerald"
            aria-label="Maximum price per credit"
          />
          <div className="mt-1 flex justify-between text-[11px] tabular-nums text-pran-muted">
            <span>${priceBounds.min}</span>
            <span>${priceBounds.max}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-content px-6">
      {/* Pill tabs — overlap the forest band's bottom edge */}
      <div className="relative z-10 -mt-7 flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {typePills.map((g) => {
          const idx = TYPE_GROUPS.indexOf(g);
          const active = idx === typeIdx;
          return (
            <button
              key={g.label}
              onClick={() => setTypeIdx(idx)}
              className={cn(
                "whitespace-nowrap rounded-[14px] px-5 py-3 text-sm font-medium shadow-card transition-colors",
                active
                  ? "bg-pran-ink text-white"
                  : "border border-pran-hairline bg-pran-surface text-pran-ink hover:border-pran-ink/30",
              )}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pran-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            className="h-11 w-full rounded-btn border border-pran-hairline bg-pran-surface pl-10 pr-3 text-sm text-pran-ink placeholder:text-pran-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pran-emerald/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="mr-1 hidden text-sm tabular-nums text-pran-muted sm:inline">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          </span>
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="inline-flex items-center gap-2 rounded-btn border border-pran-hairline bg-pran-surface px-3.5 py-2.5 text-sm font-medium text-pran-ink lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters{activeCount > 0 && ` (${activeCount})`}
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-11 rounded-btn border border-pran-hairline bg-pran-surface px-3 text-sm text-pran-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pran-emerald/50"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </div>
      </div>

      {/* Three-column working layout */}
      <div className="mt-6 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_360px]">
        {/* Left — filter rail */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-panel bg-pran-surface p-6 shadow-card">
            {filterPanel}
          </div>
        </aside>

        {/* Center — card grid */}
        <div>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  onMouseEnter={() => setSelectedId(p.id)}
                  onFocusCapture={() => setSelectedId(p.id)}
                >
                  <ProjectTeaser project={p} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-panel bg-pran-surface p-12 text-center shadow-card">
              <h3 className="font-display text-h3 font-semibold text-pran-ink">
                No projects match these filters.
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-pran-muted">
                Adjust your filters, or tell us what you&rsquo;re sourcing and
                we&rsquo;ll find it for you.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button onClick={clearAll} className={buttonVariants({ variant: "secondary" })}>
                  Clear filters
                </button>
                <Link href="/contact" className={buttonVariants()}>
                  Contact us for sourcing
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right — data panel (desktop only) */}
        <aside className="hidden xl:block">
          {selected && (
            <div className="sticky top-24">
              <DataPanel project={selected} priceBounds={priceBounds} />
            </div>
          )}
        </aside>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-pran-forest-deep/50"
            onClick={() => setMobileFiltersOpen(false)}
            aria-hidden
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-panel bg-pran-surface p-6 shadow-float">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-base font-semibold text-pran-ink">Filters</span>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="rounded-btn p-1 text-pran-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {filterPanel}
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className={cn(buttonVariants(), "mt-5 w-full")}
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
