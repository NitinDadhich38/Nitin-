"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { photos } from "@/lib/images";

const posts = [
  {
    title: "Understanding India's CCTS",
    tag: "Explainer",
    href: "/why-carbon-markets",
    photo: photos.forestMist,
  },
  {
    title: "The voluntary carbon market, explained",
    tag: "Explainer",
    href: "/why-carbon-markets",
    photo: photos.greenHills,
  },
  {
    title: "Why “carbon neutral” is the wrong claim",
    tag: "Insight",
    href: "/why-carbon-markets",
    photo: photos.leaves,
  },
];

export function ResourcesSection() {
  return (
    <section className="bg-pran-paper-warm py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="max-w-[18ch] font-display text-display-l font-semibold text-pran-ink">
              Carbon markets, explained plainly.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/why-carbon-markets"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-pran-emerald"
            >
              Compliance library
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <Link
                href={p.href}
                className="group flex h-full flex-col overflow-hidden rounded-panel bg-pran-surface shadow-card transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-float"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-pran-paper-warm">
                  <Image
                    src={p.photo}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 360px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-pran-muted">
                    {p.tag}
                  </span>
                  <h3 className="mt-3 flex-1 font-display text-h3 font-semibold leading-snug text-pran-ink">
                    {p.title}
                  </h3>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-pran-emerald">
                    Read
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
