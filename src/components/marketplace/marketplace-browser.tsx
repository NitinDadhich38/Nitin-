"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  Send,
  RotateCcw,
} from "lucide-react";
import type { Project } from "@/lib/marketplace-data";
import { facets, getCreditMechanism } from "@/lib/marketplace-data";
import { ProjectTeaser } from "@/components/marketing/project-teaser";
import { RfqModal } from "@/components/marketplace/rfq-modal";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

/** Broad type groups for the pill tabs, matched against granular sectors. */
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
    <div className="border-t border-pran-hairline py-4 first:border-t-0 first:pt-0">
      <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-pran-muted">
        {title}
      </p>
      <ul className={cn("space-y-2", scroll && "max-h-48 overflow-y-auto pr-1")}>
        {options.map((opt) => {
          const n = counts[opt] ?? 0;
          const isOn = selected.includes(opt);
          const dim = n === 0 && !isOn;
          return (
            <li key={opt}>
              <label
                className={cn(
                  "flex items-center justify-between gap-2.5 text-sm transition-colors",
                  dim
                    ? "cursor-default text-pran-muted/40"
                    : "cursor-pointer text-pran-ink hover:text-pran-emerald",
                )}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isOn}
                    disabled={dim}
                    onChange={() => onToggle(opt)}
                    className="h-4 w-4 rounded accent-pran-emerald cursor-pointer"
                  />
                  <span className="leading-snug">{opt}</span>
                </div>
                <span className="tabular-nums text-xs text-pran-muted">
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
  const [mechanism, setMechanism] = useState<"All" | "Removal" | "Avoidance">("All");
  const [registries, setRegistries] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [deliveries, setDeliveries] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [sort, setSort] = useState<Sort>("price-desc");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [rfqOpen, setRfqOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!filtersOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFiltersOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFiltersOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [filtersOpen]);

  const typePills = useMemo(
    () =>
      TYPE_GROUPS.filter(
        (g, i) => i === 0 || projects.some((p) => g.match(p.sector)),
      ),
    [projects],
  );

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    const typeMatch = TYPE_GROUPS[typeIdx]?.match ?? (() => true);
    return (
      p: Project,
      skip?: "registry" | "country" | "delivery" | "price" | "mechanism",
    ) => {
      if (!typeMatch(p.sector)) return false;
      if (skip !== "mechanism" && mechanism !== "All") {
        const pMech = getCreditMechanism(p.sector);
        if (pMech !== mechanism) return false;
      }
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
          `${p.name} ${p.pranCode} ${p.developer ?? ""} ${p.description} ${p.country} ${p.registry}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    };
  }, [query, typeIdx, mechanism, registries, countries, deliveries, maxPrice]);

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
    (mechanism !== "All" ? 1 : 0) +
    registries.length +
    countries.length +
    deliveries.length +
    (maxPrice < priceBounds.max ? 1 : 0);

  const clearAll = () => {
    setMechanism("All");
    setRegistries([]);
    setCountries([]);
    setDeliveries([]);
    setMaxPrice(priceBounds.max);
    setQuery("");
  };

  return (
    <div className="mx-auto max-w-content px-6">
      {/* Pill tabs — sector groups */}
      <div className="relative z-10 -mt-7 flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {typePills.map((g) => {
          const idx = TYPE_GROUPS.indexOf(g);
          const active = idx === typeIdx;
          return (
            <button
              key={g.label}
              onClick={() => setTypeIdx(idx)}
              className={cn(
                "whitespace-nowrap rounded-[14px] px-5 py-3 text-sm font-medium shadow-card transition-all duration-200",
                active
                  ? "bg-pran-ink text-white shadow-md"
                  : "border border-pran-hairline bg-pran-surface text-pran-ink hover:border-pran-ink/30 hover:bg-pran-paper-warm",
              )}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      {/* Main Filter Toolbar */}
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Filter Toggle Button */}
            <div ref={filterRef} className="relative">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={filtersOpen}
                aria-label="Toggle filters"
                onClick={() => setFiltersOpen((v) => !v)}
                className={cn(
                  "flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-medium transition-all duration-200 ease-apple active:scale-[0.98] shadow-sm",
                  filtersOpen || activeCount > 0
                    ? "border-pran-emerald bg-pran-emerald text-white shadow-apple-card"
                    : "border-pran-hairline/80 bg-pran-surface text-pran-ink hover:border-pran-ink/30",
                )}
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
                {activeCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-pran-emerald">
                    {activeCount}
                  </span>
                )}
              </button>

              {/* Filter Panel Drawer Popover */}
              {filtersOpen && (
                <div className="absolute left-0 top-full z-40 mt-2 w-[340px] max-w-[90vw] rounded-2xl border border-pran-hairline/80 bg-pran-surface/95 backdrop-blur-2xl p-5 shadow-apple-card animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between border-b border-pran-hairline pb-3">
                    <span className="text-sm font-semibold text-pran-ink">
                      Filter Projects
                    </span>
                    <div className="flex items-center gap-2">
                      {activeCount > 0 && (
                        <button
                          onClick={clearAll}
                          className="text-xs font-medium text-pran-emerald hover:underline"
                        >
                          Clear all ({activeCount})
                        </button>
                      )}
                      <button
                        onClick={() => setFiltersOpen(false)}
                        aria-label="Close filters"
                        className="rounded-btn p-1 text-pran-muted hover:text-pran-ink"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-[65vh] overflow-y-auto pr-1">
                    {/* Mechanism Selector */}
                    <div className="py-4">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-pran-muted">
                        Credit Mechanism
                      </p>
                      <div className="grid grid-cols-3 gap-1.5 rounded-lg bg-pran-paper p-1 text-xs">
                        {(["All", "Removal", "Avoidance"] as const).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setMechanism(m)}
                            className={cn(
                              "rounded-md py-1.5 font-medium transition-colors",
                              mechanism === m
                                ? "bg-pran-ink text-white"
                                : "text-pran-muted hover:text-pran-ink",
                            )}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    <FilterGroup
                      title="Registry Standard"
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

                    {/* Price Range Slider */}
                    <div className="border-t border-pran-hairline py-4">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-pran-muted">
                          Max Price per tCO₂e
                        </p>
                        <span className="text-sm font-semibold tabular-nums text-pran-ink">
                          ${maxPrice}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={priceBounds.min}
                        max={priceBounds.max}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full accent-pran-emerald cursor-pointer"
                        aria-label="Maximum price per credit"
                      />
                      <div className="mt-1 flex justify-between text-[11px] tabular-nums text-pran-muted">
                        <span>${priceBounds.min}</span>
                        <span>${priceBounds.max}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Mechanism Pill Toggles */}
            {/* Quick Mechanism Pill Toggles */}
            <div className="hidden sm:flex items-center rounded-xl border border-pran-hairline/80 bg-pran-surface p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setMechanism("All")}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ease-apple active:scale-[0.98]",
                  mechanism === "All"
                    ? "bg-pran-ink text-white shadow-sm"
                    : "text-pran-muted hover:text-pran-ink hover:bg-black/[0.03]",
                )}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setMechanism("Removal")}
                className={cn(
                  "inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ease-apple active:scale-[0.98]",
                  mechanism === "Removal"
                    ? "bg-pran-emerald text-white shadow-sm"
                    : "text-pran-muted hover:text-pran-ink hover:bg-black/[0.03]",
                )}
              >
                <Sparkles className="h-3 w-3 text-emerald-200" />
                Removal
              </button>
              <button
                type="button"
                onClick={() => setMechanism("Avoidance")}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ease-apple active:scale-[0.98]",
                  mechanism === "Avoidance"
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-pran-muted hover:text-pran-ink hover:bg-black/[0.03]",
                )}
              >
                Avoidance
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative min-w-[220px] flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pran-muted/70" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, code, country..."
                className="h-11 w-full rounded-xl border border-pran-hairline/80 bg-pran-surface pl-10 pr-3 text-sm text-pran-ink placeholder:text-pran-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pran-emerald/40 shadow-sm transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* RFQ / Sourcing Action */}
            <Button
              variant="secondary"
              onClick={() => setRfqOpen(true)}
              className="h-11 border-pran-hairline text-xs font-medium shadow-sm hover:border-pran-emerald hover:text-pran-emerald"
            >
              <Send className="mr-1.5 h-3.5 w-3.5" />
              Custom Sourcing / RFQ
            </Button>

            {/* Sort Dropdown */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-11 rounded-btn border border-pran-hairline bg-pran-surface px-3 text-sm font-medium text-pran-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pran-emerald/50 shadow-sm cursor-pointer"
            >
              <option value="featured">Featured Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Project Name: A–Z</option>
            </select>
          </div>
        </div>

        {/* Active Filters Bar */}
        {activeCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="font-medium text-pran-muted">Active filters:</span>

            {mechanism !== "All" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 dark:bg-emerald-950 px-2.5 py-1 font-medium text-emerald-800 dark:text-emerald-300">
                {mechanism}
                <button
                  onClick={() => setMechanism("All")}
                  aria-label="Remove mechanism filter"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            )}

            {registries.map((r) => (
              <span
                key={r}
                className="inline-flex items-center gap-1 rounded-md bg-pran-surface border border-pran-hairline px-2.5 py-1 font-medium text-pran-ink"
              >
                {r}
                <button
                  onClick={() => setRegistries((s) => s.filter((item) => item !== r))}
                  aria-label={`Remove registry ${r}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}

            {deliveries.map((d) => (
              <span
                key={d}
                className="inline-flex items-center gap-1 rounded-md bg-pran-surface border border-pran-hairline px-2.5 py-1 font-medium text-pran-ink"
              >
                {d}
                <button
                  onClick={() => setDeliveries((s) => s.filter((item) => item !== d))}
                  aria-label={`Remove delivery ${d}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}

            {countries.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 rounded-md bg-pran-surface border border-pran-hairline px-2.5 py-1 font-medium text-pran-ink"
              >
                {c}
                <button
                  onClick={() => setCountries((s) => s.filter((item) => item !== c))}
                  aria-label={`Remove country ${c}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}

            {maxPrice < priceBounds.max && (
              <span className="inline-flex items-center gap-1 rounded-md bg-pran-surface border border-pran-hairline px-2.5 py-1 font-medium text-pran-ink">
                Max: ${maxPrice}
                <button
                  onClick={() => setMaxPrice(priceBounds.max)}
                  aria-label="Reset max price"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            )}

            <button
              onClick={clearAll}
              className="inline-flex items-center gap-1 text-pran-emerald hover:underline ml-1 font-medium"
            >
              <RotateCcw className="h-3 w-3" />
              Reset all
            </button>
          </div>
        )}
      </div>

      {/* Grid Listings */}
      <div className="mt-8 pb-24">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProjectTeaser key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-panel border border-pran-hairline bg-pran-surface p-12 text-center shadow-card">
            <h3 className="font-display text-h3 font-semibold text-pran-ink">
              No projects match your current filters.
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-pran-muted">
              Adjust your filters, or request custom allocation from PRAN&rsquo;s institutional sourcing desk.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={clearAll}
                className={buttonVariants({ variant: "secondary" })}
              >
                Clear all filters
              </button>
              <Button onClick={() => setRfqOpen(true)}>
                Submit Sourcing Request
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* RFQ / Sourcing Modal */}
      <RfqModal isOpen={rfqOpen} onClose={() => setRfqOpen(false)} />
    </div>
  );
}

