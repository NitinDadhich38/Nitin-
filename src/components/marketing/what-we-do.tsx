"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { photos } from "@/lib/images";

/**
 * What we do — a showcase, not a card grid.
 *
 * The capability list drives one large image, so the visual does the talking
 * and the copy stays short. Hover or focus on desktop, tap on mobile; the
 * active row expands to reveal its line. Nothing here is a 3-up icon grid.
 */
const capabilities = [
  {
    id: "marketplace",
    label: "Marketplace",
    line: "Verified, registry-backed credits with transparent pricing — filter by registry, technology, geography and delivery.",
    href: "/marketplace",
    cta: "Browse projects",
    photo: photos.forestCanopy,
    alt: "Tall forest canopy",
  },
  {
    id: "intelligence",
    label: "Carbon Intelligence",
    line: "Procurement, ESG, BRSR and CBAM analysis — buy and report on carbon the way you would underwrite any other asset.",
    href: "/intelligence",
    cta: "See the intelligence layer",
    photo: photos.mountainForest,
    alt: "Aerial mountain forest",
  },
  {
    id: "calculator",
    label: "Footprint Calculator",
    line: "Estimate personal and business emissions on cited factors, then act on the number instead of guessing at it.",
    href: "/calculator",
    cta: "Estimate your footprint",
    photo: photos.farmland,
    alt: "Farmland at dusk",
  },
  {
    id: "compliance",
    label: "Compliance Infrastructure",
    line: "The rails beneath it all — verifiable records, retirement certificates and audit-ready documentation.",
    href: "/why-carbon-markets",
    cta: "How it works",
    photo: photos.solar,
    alt: "Rows of solar panels",
  },
];

export function WhatWeDo() {
  const [active, setActive] = useState(0);
  const current = capabilities[active];

  return (
    <section className="bg-pran-paper-warm py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-emerald">
            What we do
          </p>
          <h2 className="mt-5 max-w-[18ch] font-display text-display-l font-semibold text-pran-ink">
            One platform, the whole carbon lifecycle.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* The list drives the image */}
          <ul className="flex flex-col">
            {capabilities.map((c, i) => {
              const on = i === active;
              return (
                <li key={c.id} className="border-t border-pran-hairline last:border-b">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-expanded={on}
                    className="group w-full py-6 text-left"
                  >
                    <span className="flex items-center justify-between gap-6">
                      <span
                        className={`font-display text-2xl font-semibold tracking-tight transition-colors sm:text-[1.75rem] ${
                          on ? "text-pran-ink" : "text-pran-muted"
                        }`}
                      >
                        {c.label}
                      </span>
                      <span
                        aria-hidden
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all ${
                          on
                            ? "bg-pran-emerald text-white"
                            : "bg-transparent text-pran-muted"
                        }`}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </span>

                    <span
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
                    >
                      <span className="overflow-hidden">
                        <span className="block max-w-[46ch] pt-3 text-[15px] leading-relaxed text-pran-muted">
                          {c.line}
                        </span>
                      </span>
                    </span>
                  </button>

                  {/* Mobile: the image travels with the open row */}
                  {on && (
                    <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-panel bg-pran-surface lg:hidden">
                      <Image
                        src={c.photo}
                        alt={c.alt}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                </li>
              );
            })}

            <Link
              href={current.href}
              className="group mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-pran-emerald"
            >
              {current.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </ul>

          {/* Desktop: one large image, cross-fading */}
          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-panel bg-pran-surface shadow-card lg:block">
            {capabilities.map((c, i) => (
              <Image
                key={c.id}
                src={c.photo}
                alt={c.alt}
                fill
                sizes="(max-width: 1024px) 0px, 560px"
                className="object-cover transition-opacity duration-500"
                style={{ opacity: i === active ? 1 : 0 }}
              />
            ))}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-pran-forest-deep/70 via-transparent to-transparent"
            />
            <p className="absolute inset-x-0 bottom-0 p-8 font-display text-2xl font-semibold text-white">
              {current.label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
