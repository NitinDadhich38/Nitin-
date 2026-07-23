import type { Metadata } from "next";
import { getProjects, facets } from "@/lib/marketplace-data";
import { MarketplaceBrowser } from "@/components/marketplace/marketplace-browser";

export const metadata: Metadata = {
  title: "Marketplace",
  description:
    "Browse verified carbon-credit projects across global registries — afforestation, renewable energy, blue carbon, and more. Filter by registry, type, country, and price.",
};

export default function MarketplacePage() {
  const projects = getProjects();
  const priced = projects.map((p) => p.priceUsd).filter((n): n is number => n !== null);
  const minPrice = Math.min(...priced);
  const maxPrice = Math.max(...priced);

  const stats = [
    { value: `${projects.length}`, label: "Projects" },
    { value: `${facets.countries.length}`, label: "Countries" },
    { value: `${facets.registries.length}`, label: "Registries" },
    { value: `$${minPrice.toFixed(2)}–$${maxPrice.toFixed(0)}`, label: "Price range" },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="border-b border-pran-border bg-pran-paper">
        <div className="mx-auto max-w-content px-6 py-14">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-pran-teal">
            The Marketplace
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-h1 font-semibold text-pran-text">
            Verified carbon projects, one transparent market.
          </h1>
          <p className="mt-4 max-w-2xl text-pran-muted">
            Every listing is a real, registry-issued project. Purchases move
            through PRAN&rsquo;s escrow — you pay PRAN, credits are transferred to
            your registry account, and you receive a retirement certificate.
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-pran-border bg-pran-border sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white p-5">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-pran-muted">
                  {s.label}
                </dt>
                <dd className="mt-1 font-display text-2xl font-semibold tabular-nums text-pran-navy">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-pran-muted">
            Launching with these listings · more projects onboarding
          </p>
        </div>
      </section>

      {/* Browser */}
      <section className="mx-auto max-w-content px-6 py-10">
        <MarketplaceBrowser projects={projects} />
      </section>
    </div>
  );
}
