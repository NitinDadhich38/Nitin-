"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { photos } from "@/lib/images";

/**
 * Built for whom — four full-bleed panels that expand on hover.
 *
 * Photography carries the message and the copy stays to one line each, so the
 * section reads as four worlds rather than four text blocks. Collapses to a
 * stack of image cards on mobile, where hover does not exist.
 */
const audiences = [
  {
    label: "Enterprise",
    line: "Procure and report at institutional scale.",
    href: "/solutions/enterprise",
    photo: photos.solar,
    alt: "Solar installation",
  },
  {
    label: "Government",
    line: "Market infrastructure for public climate goals.",
    href: "/solutions/government",
    photo: photos.greenHills,
    alt: "Green hills from the air",
  },
  {
    label: "Project Developers",
    line: "Reach buyers who can actually transact.",
    href: "/solutions/developers",
    photo: photos.forestMist,
    alt: "Mist through forest",
  },
  {
    label: "Individuals",
    line: "Measure your footprint, then act on it.",
    href: "/solutions/public",
    photo: photos.seedling,
    alt: "Seedling held in hands",
  },
];

export function ForWhom() {
  return (
    <section className="bg-pran-paper py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-emerald">
            Built for
          </p>
          <h2 className="mt-5 max-w-[20ch] font-display text-display-l font-semibold text-pran-ink">
            Every side of the carbon economy.
          </h2>
        </Reveal>

        {/* Desktop: expanding panels */}
        <Reveal delay={0.1}>
          <div className="mt-14 hidden h-[520px] gap-3 lg:flex">
            {audiences.map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className="group relative flex-1 overflow-hidden rounded-panel transition-[flex] duration-500 ease-out hover:flex-[2.4] focus-visible:flex-[2.4] focus-visible:outline-none"
              >
                <Image
                  src={a.photo}
                  alt={a.alt}
                  fill
                  sizes="(max-width: 1024px) 0px, 640px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-pran-forest-deep/90 via-pran-forest-deep/25 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <span className="flex items-center gap-2">
                    <span className="font-display text-2xl font-semibold text-white">
                      {a.label}
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-white/0 transition-colors duration-300 group-hover:text-white" />
                  </span>
                  {/* line reveals only for the open panel */}
                  <span
                    className="mt-0 grid transition-[grid-template-rows,margin] duration-500 ease-out group-hover:mt-3 group-hover:grid-rows-[1fr] group-focus-visible:mt-3 group-focus-visible:grid-rows-[1fr]"
                    style={{ gridTemplateRows: "0fr" }}
                  >
                    <span className="overflow-hidden">
                      <span className="block max-w-[28ch] text-[15px] leading-relaxed text-white/85">
                        {a.line}
                      </span>
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>

        {/* Mobile: stacked image cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:hidden">
          {audiences.map((a, i) => (
            <Reveal key={a.label} delay={i * 0.06}>
              <Link
                href={a.href}
                className="group relative block aspect-[4/3] overflow-hidden rounded-panel"
              >
                <Image
                  src={a.photo}
                  alt={a.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-pran-forest-deep/90 via-pran-forest-deep/20 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-display text-xl font-semibold text-white">
                    {a.label}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/85">
                    {a.line}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
