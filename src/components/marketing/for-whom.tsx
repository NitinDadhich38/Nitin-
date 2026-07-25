"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { photos } from "@/lib/images";

const ROWS = [
  {
    label: "Enterprise",
    title: "Procure and report at institutional scale.",
    desc: "Source high-integrity credits, settle through escrow, and generate audit-ready records mapped to your disclosure frameworks.",
    href: "/solutions/enterprise",
    photo: photos.solar,
    alt: "Rows of solar panels",
  },
  {
    label: "Government",
    title: "Market infrastructure for public climate goals.",
    desc: "The connective rails for compliance markets — transparent registries, verifiable retirement, and settlement you can stand behind.",
    href: "/solutions/government",
    photo: photos.greenHills,
    alt: "Aerial view of green hills",
  },
  {
    label: "Project Developers",
    title: "List your project in front of real buyers.",
    desc: "Bring your registry-verified credits to a marketplace built for price discovery, direct demand, and clean settlement.",
    href: "/solutions/developers",
    photo: photos.forestCanopy,
    alt: "Tall forest canopy",
  },
  {
    label: "Individuals",
    title: "Calculate, offset, and retire — transparently.",
    desc: "Estimate your footprint on cited factors, then purchase and retire verified carbon credits for a chosen period. No vague claims.",
    href: "/calculator",
    photo: photos.seedling,
    alt: "Hands cradling a seedling",
  },
];

export function ForWhom() {
  return (
    <section className="bg-pran-paper-warm py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-emerald">
            For whom
          </p>
          <h2 className="mt-4 max-w-[18ch] font-display text-display-l font-semibold text-pran-ink">
            Built for every participant in the carbon economy.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-16 sm:space-y-24">
          {ROWS.map((r, i) => (
            <Reveal key={r.label}>
              <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-panel bg-pran-paper-warm shadow-card">
                    <Image
                      src={r.photo}
                      alt={r.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-muted">
                    {r.label}
                  </p>
                  <h3 className="mt-3 max-w-[18ch] font-display text-h2 font-semibold text-pran-ink">
                    {r.title}
                  </h3>
                  <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-pran-muted">
                    {r.desc}
                  </p>
                  <Link
                    href={r.href}
                    className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-pran-emerald"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
