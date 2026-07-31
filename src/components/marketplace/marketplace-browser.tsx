"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Project } from "@/lib/marketplace-data";
import { facets } from "@/lib/marketplace-data";
import { ProjectTeaser } from "@/components/marketing/project-teaser";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

/** Broad type groups for the pill tabs (§3.5), matched against granular sectors. */
const TYPE_GROUPS: { label: string; match: (sector: string) => boolean }[] = [
  { label: "All Projects", match: () => true },
  { label: "Forestry", match: (s) => /afforest|reforest|afolu|redd/i.test(s) },
  { label: "Renewable", match: (s) => /renewable|energy industr|solar|wind|hydro/i.test(s) },
  { label: "Blue Carbon", match: (s) => /blue|marine/i.test(s) },
  { label: "Agriculture", match: (s) => /agri|biochar/i.test(s) },
  { label: "Waste & Biogas", match: (s) => /waste|biogas|manure/i.test(s) },
  { label: "Industrial", match: (s) => /industrial|efficiency/i.test(s) },
];

function toggle<T>(set: T[], value: T): T[] {
  return set.includes(value) ? set.filter((v) => v !== value) : [...set, value];
}

/**
 * Filter group — flat and typographic.
 *
 * No card, no shadow: the rail sits directly on the page so the listings carry
 * the visual weight. Each option shows how many projects it would return under
 * the other active filters, and options that would return nothing are disabled
 * rather than hidden, so the shape of the book stays legible.
 */
function FilterGroup({
  title,
  options,
  selected,
  counts,
  onToggle,
  scroll = false,
}: {
  title: string;
  options: string[];
  selected: string[];
  counts: Record<string, number>;
  onToggle: (value: string) => void;
  scroll?: boolean;
}) {
  return (
    <div className="border-t border-pran-hairline py-5 first:border-t-0 first:pt-0">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-pran-muted">
        {title}
      </p>
      <ul className={cn("space-y-2.5", scroll && "max-h-52 overflow-y-auto pr-1")}>
        {options.map((opt) => {
          const n = counts[opt] ?? 0;
          const isOn = selected.includes(opt);
          const dim = n === 0 && !isOn;
          return (
            <li key={opt}>
              <label
                className={cn(
                  "flex items-start gap-2.5 text-sm",
                  dim
                    ? "cursor-default text-pran-muted/50"
                    : "cursor-pointer text-pran-ink",
                )}
              >
                <input
                  type="checkbox"
                  checked={isOn}
                  disabled={dim}
                  onChange={() => onToggle(opt)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-pran-emerald"
                />
                <span className="flex-1 leading-snug">{opt}</span>
                <span className="shrink-0 tabular-nums text-[11px] text-pran-muted">
                  {n}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Only show pill types that actually have listings.
  const typePills = useMemo(
    () =>
      TYPE_GROUPS.filter(
        (g, i) => i === 0 || projects.some((p) => g.match(p.sector)),
      ),
    [projects],
  );

  /**
   * One predicate, with the ability to skip a facet. Skipping is what makes
   * the sidebar counts honest: a registry's count reflects every other active
   * filter but not the registry selection itself.
   */
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    const typeMatch = TYPE_GROUPS[typeIdx]?.match ?? (() => true);
    return (
      p: Project,
      skip?: "registry" | "country" | "delivery" | "price",
    ) => {
      if (!typeMatch(p.sector)) return false;
      if (skip !== "registry" && registries.length && !registries.includes(p.registry))
        return false;
      if (skip !== "country" && countries.length && !countries.includes(p.country))
        return false;
      if (
        skip !== "delivery" &&
        deliveries.length &&
        !p.listings.some((l) => l.delivery && deliveries.includes(l.delivery))
      )
        return false;
      if (skip !== "price" && p.priceUsd != null && p.priceUsd > maxPrice)
        return false;
      if (q) {
        const hay =
          `${p.name} ${p.developer ?? ""} ${p.description} ${p.country}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    };
  }, [query, typeIdx, registries, countries, deliveries, maxPrice]);

  const filtered = useMemo(() => {
    let list = projects.filter((p) => matches(p));
    const priceOr = (p: Project, fb: number) => p.priceUsd ?? fb;
    if (sort === "price-asc")
      list = [...list].sort((a, b) => priceOr(a, Infinity) - priceOr(b, Infinity));
    else if (sort === "price-desc")
      list = [...list].sort((a, b) => priceOr(b, -Infinity) - priceOr(a, -Infinity));
    else if (sort === "name")
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [projects, matches, sort]);

  /* Live facet counts — computed against every other active filter. */
  const counts = useMemo(() => {
    const tally = (
      skip: "registry" | "country" | "delivery",
      key: (p: Project) => string[],
    ) => {
      const m: Record<string, number> = {};
      for (const p of projects) {
        if (!matches(p, skip)) continue;
        for (const k of key(p)) m[k] = (m[k] ?? 0) + 1;
      }
      return m;
    };
    return {
      registries: tally("registry", (p) => [p.registry]),
      countries: tally("country", (p) => [p.country]),
      deliveries: tally("delivery", (p) =>
        Array.from(
          new Set(
            p.listings
              .map((l) => l.delivery)
              .filter((d): d is Exclude<typeof d, null> => Boolean(d)),
          ),
        ),
      ),
    };
  }, [projects, matches]);

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
      <div className="pt-5">
        <FilterGroup
          title="Registry"
          options={facets.registries}
          selected={registries}
          counts={counts.registries}
          onToggle={(v) => setRegistries((s) => toggle(s, v))}
        />
        <FilterGroup
          title="Delivery"
          options={facets.deliveries}
          selected={deliveries}
          counts={counts.deliveries}
          onToggle={(v) => setDeliveries((s) => toggle(s, v))}
        />
        <FilterGroup
          title="Country"
          options={facets.countries}
          selected={countries}
          counts={counts.countries}
          onToggle={(v) => setCountries((s) => toggle(s, v))}
          scroll
        />
        <div className="border-t border-pran-hairline py-5">
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

      {/* Two-column layout — rail plus a wide listing grid */}
      <div className="mt-8 grid grid-cols-1 gap-10 pb-24 lg:grid-cols-[240px_1fr] lg:gap-12">
        {/* Left — flat filter rail */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">{filterPanel}</div>
        </aside>

        {/* Right — listings */}
        <div>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProjectTeaser key={p.id} project={p} />
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
                <button
                  onClick={clearAll}
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Clear filters
                </button>
                <Link href="/contact" className={buttonVariants()}>
                  Contact us for sourcing
                </Link>
              </div>
            </div>
          )}
        </div>
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
              <span className="text-base font-semibold text-pran-ink">
                Filters
              </span>
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
