import type { Metadata } from "next";
import { getProjects } from "@/lib/marketplace-data";
import { MarketplaceBrowser } from "@/components/marketplace/marketplace-browser";

export const metadata: Metadata = {
  title: "Marketplace",
  description:
    "Browse verified carbon-credit projects across global registries — afforestation, renewable energy, blue carbon, and more. Filter by registry, type, country, and price.",
};

export default function MarketplacePage() {
  const projects = getProjects();
  const priced = projects
    .map((p) => p.priceUsd)
    .filter((n): n is number => n !== null);
  const priceBounds = {
    min: Math.floor(Math.min(...priced)),
    max: Math.ceil(Math.max(...priced)),
  };

  return (
    <div className="bg-pran-paper">
      {/* Compact forest header band (5_Design.md §4.2) */}
      <section className="bg-pran-forest text-white">
        <div className="mx-auto max-w-content px-6 pb-20 pt-16 sm:pb-24">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-lime">
            The marketplace
          </p>
          <h1 className="mt-4 max-w-[20ch] font-display text-display-l font-semibold text-white">
            Verified carbon projects, one transparent market.
          </h1>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-white/70">
            Every listing is a real, registry-issued project. Purchases move
            through PRAN&rsquo;s escrow — you pay PRAN, credits transfer to your
            registry account, and you receive a retirement certificate.
          </p>
        </div>
      </section>

      {/* Pill tabs overlap the band edge; three-column working layout below */}
      <MarketplaceBrowser projects={projects} priceBounds={priceBounds} />
    </div>
  );
}
