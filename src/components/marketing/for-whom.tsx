"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { photos } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Built for — an interactive switcher.
 *
 * One audience at a time: selecting a tab crossfades the photograph and the
 * copy rather than making the visitor scroll four full rows. Compact, and the
 * visitor sets the pace. The crossfade is motion-safe only, so reduced-motion
 * users get an instant swap.
 */
const audiences = [
  {
    no: "01",
    kicker: "Enterprise",
    title: "Procure and report at institutional scale.",
    line: "Buy verified credits, run BRSR and CBAM reporting, and settle through escrow — with an audit trail your finance team can trust.",
    points: [
      "Registry-backed sourcing",
      "BRSR & CBAM reporting",
      "Escrow settlement",
    ],
    href: "/solutions/enterprise",
    photo: photos.solar,
    alt: "Solar installation",
  },
  {
    no: "02",
    kicker: "Government",
    title: "Market infrastructure for public climate goals.",
    line: "The neutral rails to mobilise supply, standardise quality and channel finance toward national targets — transparently.",
    points: [
      "Neutral market rails",
      "Quality standardisation",
      "Transparent finance flow",
    ],
    href: "/solutions/government",
    photo: photos.greenHills,
    alt: "Green hills from the air",
  },
  {
    no: "03",
    kicker: "Project Developers",
    title: "Reach buyers who can actually transact.",
    line: "List registry-backed projects, show quality where buyers can screen it, and get paid through settlement that clears.",
    points: [
      "Listing that reaches buyers",
      "Quality shown up front",
      "Settlement that clears",
    ],
    href: "/solutions/developers",
    photo: photos.mountainForest,
    alt: "Mountain forest",
  },
  {
    no: "04",
    kicker: "Individuals",
    title: "Measure your footprint, then act on it.",
    line: "Estimate your emissions on cited factors and support verified projects — with the same transparency institutions get.",
    points: [
      "Cited emission factors",
      "Verified projects only",
      "Institutional transparency",
    ],
    href: "/solutions/public",
    photo: photos.seedling,
    alt: "Seedling held in hands",
  },
];

export function ForWhom() {
  const [active, setActive] = useState(0);
  const a = audiences[active];

  return (
    <section className="bg-pran-paper py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <h2 className="max-w-[20ch] font-display text-display-l font-semibold tracking-[-0.03em] text-pran-ink">
            Every side of the carbon economy.
          </h2>
        </Reveal>

        {/* Switcher */}
        <Reveal delay={0.05}>
          <div
            role="tablist"
            aria-label="Choose an audience"
            className="mt-10 flex gap-6 overflow-x-auto border-b border-pran-hairline scrollbar-hide"
          >
            {audiences.map((x, i) => (
              <button
                key={x.kicker}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  "relative whitespace-nowrap px-1 pb-4 pt-2 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pran-emerald/40",
                  i === active
                    ? "text-pran-ink"
                    : "text-pran-muted hover:text-pran-ink",
                )}
              >
                <span className="mr-2 font-display text-[13px] tabular-nums text-pran-emerald">
                  {x.no}
                </span>
                {x.kicker}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-pran-emerald transition-opacity duration-200",
                    i === active ? "opacity-100" : "opacity-0",
                  )}
                />
              </button>
            ))}
          </div>
        </Reveal>

        {/* Panel — keys force a remount so the fade replays on every switch */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Link
            key={`img-${a.kicker}`}
            href={a.href}
            className="group relative block aspect-[16/11] overflow-hidden rounded-panel shadow-float motion-safe:animate-fade-rise"
          >
            <Image
              src={a.photo}
              alt={a.alt}
              fill
              sizes="(max-width:1024px) 100vw, 600px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </Link>

          <div
            key={`copy-${a.kicker}`}
            className="motion-safe:animate-fade-rise"
          >
            <p className="font-display text-[13px] font-semibold tracking-[0.02em] text-pran-emerald">
              {a.no} · {a.kicker}
            </p>
            <h3 className="mt-2.5 max-w-[18ch] font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.02em] text-pran-ink">
              {a.title}
            </h3>
            <p className="mt-3.5 max-w-[42ch] text-base leading-relaxed text-pran-muted">
              {a.line}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {a.points.map((pt) => (
                <li
                  key={pt}
                  className="rounded-[14px] border border-pran-hairline bg-pran-surface px-3 py-1.5 text-xs font-medium text-pran-ink"
                >
                  {pt}
                </li>
              ))}
            </ul>

            <Link
              href={a.href}
              className="group mt-7 inline-flex items-center gap-1.5 text-[15px] font-medium text-pran-emerald"
            >
              For {a.kicker.toLowerCase()}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
