"use client";

import Image from "next/image";
import { Reveal } from "@/components/marketing/reveal";
import { photos } from "@/lib/images";
import { siteStats } from "@/lib/config";

type Tile = {
  photo: string;
  alt: string;
  span: string;
  stat?: { value: string; label: string };
};

const TILES: Tile[] = [
  {
    photo: photos.forestRiver,
    alt: "Aerial river winding through forest",
    span: "md:col-span-2 md:row-span-2",
    stat: { value: `${siteStats.projects}+`, label: "Verified projects" },
  },
  { photo: photos.solar, alt: "Solar panel array", span: "md:col-span-1" },
  {
    photo: photos.wind,
    alt: "Wind turbine",
    span: "md:col-span-1",
    stat: { value: `${siteStats.registries}`, label: "Global registries" },
  },
  { photo: photos.farmland, alt: "Farmland at golden hour", span: "md:col-span-2" },
];

export function TrustSection() {
  return (
    <section className="bg-pran-paper py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-emerald">
            Trust &amp; scale
          </p>
          <h2 className="mt-4 max-w-[20ch] font-display text-display-l font-semibold text-pran-ink">
            Launching with real, verifiable listings.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid auto-rows-[190px] grid-cols-2 gap-3 md:grid-cols-4">
            {TILES.map((t, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-panel bg-pran-forest/10 ${t.span} ${
                  i === 3 ? "col-span-2" : ""
                }`}
              >
                <Image
                  src={t.photo}
                  alt={t.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                />
                {t.stat && (
                  <>
                    <div aria-hidden className="photo-overlay absolute inset-0" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <span className="font-display text-4xl font-semibold tabular-nums text-white sm:text-5xl">
                        {t.stat.value}
                      </span>
                      <span className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-white/80">
                        {t.stat.label}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
