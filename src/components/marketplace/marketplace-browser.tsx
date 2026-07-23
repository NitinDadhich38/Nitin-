"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, Search, X } from "lucide-react";
import type { Project } from "@/lib/marketplace-data";
import { facets } from "@/lib/marketplace-data";
import { ProjectCard } from "@/components/marketplace/project-card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

function toggle<T>(set: T[], value: T): T[] {
  return set.includes(value) ? set.filter((v) => v !== value) : [...set, value];
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="border-b border-pran-border py-4">
      <p className="mb-3 font-mono text-xs uppercase tracking-wider text-pran-muted">
        {title}
      </p>
      <ul className="space-y-2">
        {options.map((opt) => (
          <li key={opt}>
            <label className="flex cursor-pointer items-start gap-2 text-sm text-pran-text">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onToggle(opt)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-pran-teal"
              />
              <span>{opt}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MarketplaceBrowser({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [registries, setRegistries] = useState<string[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = projects.filter((p) => {
      if (registries.length && !registries.includes(p.registry)) return false;
      if (sectors.length && !sectors.includes(p.sector)) return false;
      if (countries.length && !countries.includes(p.country)) return false;
      if (q) {
        const hay = `${p.name} ${p.developer ?? ""} ${p.description} ${p.country}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const priceOr = (p: Project, fallback: number) => p.priceUsd ?? fallback;
    if (sort === "price-asc") list = [...list].sort((a, b) => priceOr(a, Infinity) - priceOr(b, Infinity));
    else if (sort === "price-desc") list = [...list].sort((a, b) => priceOr(b, -Infinity) - priceOr(a, -Infinity));
    else if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [projects, query, registries, sectors, countries, sort]);

  const activeCount = registries.length + sectors.length + countries.length;
  const clearAll = () => {
    setRegistries([]);
    setSectors([]);
    setCountries([]);
    setQuery("");
  };

  const filterPanel = (
    <div>
      <div className="flex items-center justify-between pb-2">
        <span className="text-sm font-medium text-pran-text">Filters</span>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs font-medium text-pran-teal hover:underline"
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>
      <FilterGroup title="Registry" options={facets.registries} selected={registries} onToggle={(v) => setRegistries((s) => toggle(s, v))} />
      <FilterGroup title="Project type" options={facets.sectors} selected={sectors} onToggle={(v) => setSectors((s) => toggle(s, v))} />
      <FilterGroup title="Country" options={facets.countries} selected={countries} onToggle={(v) => setCountries((s) => toggle(s, v))} />
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Desktop filters */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">{filterPanel}</div>
      </aside>

      <div>
        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pran-muted" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex items-center gap-2 rounded-btn border border-pran-border px-3 py-2 text-sm font-medium text-pran-text lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters{activeCount > 0 && ` (${activeCount})`}
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-11 rounded-btn border border-pran-border bg-white px-3 text-sm text-pran-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pran-teal/60"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </div>
        </div>

        <p className="mt-4 text-sm text-pran-muted">
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        </p>

        {filtered.length > 0 ? (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-card border border-dashed border-pran-border p-12 text-center">
            <p className="text-pran-text">No projects match these filters.</p>
            <button onClick={clearAll} className="mt-2 text-sm font-medium text-pran-teal hover:underline">
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-pran-ink/40" onClick={() => setMobileFiltersOpen(false)} aria-hidden />
          <div className="absolute left-0 top-0 h-full w-full max-w-xs overflow-y-auto bg-white p-5 shadow-xl">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium text-pran-text">Filters</span>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters" className="p-1 text-pran-text">
                <X className="h-5 w-5" />
              </button>
            </div>
            {filterPanel}
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-4 w-full rounded-btn bg-pran-teal py-2.5 text-sm font-medium text-white"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
