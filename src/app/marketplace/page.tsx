import type { Metadata } from "next";
import Image from "next/image";
import { getProjects } from "@/lib/marketplace-data";
import { MarketplaceBrowser } from "@/components/marketplace/marketplace-browser";
import { IrecBand } from "@/components/marketplace/irec-band";
import { pageImages } from "@/lib/images";

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
 * What it gets instead: the same compact band, with a photograph behind it
 * (2026-08-09 — the drawn DepthField it previously used was removed with the
 * site-wide switch to photography). The portfolio stat row that used to sit
 * here was removed on founder direction; project counts are not published.
 */

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
      {/* Compact forest header band, now drawn (5_Design.md v2.1 §3) */}
      {/* Photograph behind the band, same treatment as every other page
          headline (founder direction 2026-08-09). The drawn DepthField and the
          86% forest wash that used to sit here were replaced together — the
          wash existed to keep type legible over the drawing, and at that
          strength it would bury a photograph. */}
      <section className="relative overflow-hidden bg-pran-forest text-white">
        <Image
          src={pageImages.marketplaceHero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,61,46,.58),rgba(15,61,46,.74))]"
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

        </div>
      </section>

      {/* Pill tabs overlap the band edge; three-column working layout below */}
      <MarketplaceBrowser projects={projects} priceBounds={priceBounds} />

      {/* Energy attribute certificates — separate instrument, separate band */}
      <IrecBand />
    </div>
  );
}
