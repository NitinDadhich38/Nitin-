"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { photos } from "@/lib/images";

const CARDS = [
  {
    title: "Marketplace",
    desc: "Verified, registry-backed carbon credits with transparent pricing and escrow-based settlement.",
    href: "/marketplace",
    photo: photos.forestRiver,
    cta: "Browse projects",
  },
  {
    title: "Carbon Intelligence",
    desc: "Decision, ESG, BRSR, and CBAM intelligence — buy and report on carbon the way you'd underwrite any asset.",
    href: "/intelligence",
    photo: photos.mountainForest,
    cta: "See the intelligence layer",
  },
  {
    title: "Footprint Calculator",
    desc: "Estimate personal and business emissions on cited factors (DEFRA, GHG Protocol, CEA), then act on them.",
    href: "/calculator",
    photo: photos.leaves,
    cta: "Estimate your footprint",
  },
  {
    title: "Compliance Infrastructure",
    desc: "The rails beneath it all — verifiable records, retirement certificates, and audit-ready documentation.",
    href: "/why-carbon-markets",
    photo: photos.farmland,
    cta: "How it works",
  },
];

export function WhatWeDo() {
  return (
    <section className="bg-pran-paper py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-emerald">
            What we do
          </p>
          <h2 className="mt-4 max-w-[18ch] font-display text-display-l font-semibold text-pran-ink">
            One platform for the whole carbon lifecycle.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 0.1}>
              <Link
                href={c.href}
                className="group flex h-full flex-col overflow-hidden rounded-panel bg-pran-surface shadow-card transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-float"
              >
                <div className="relative aspect-[16/8] w-full overflow-hidden bg-pran-paper-warm">
                  <Image
                    src={c.photo}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 560px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="font-display text-h3 font-semibold text-pran-ink">
                    {c.title}
                  </h3>
                  <p className="mt-3 max-w-[46ch] flex-1 leading-relaxed text-pran-muted">
                    {c.desc}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-pran-emerald">
                    {c.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
