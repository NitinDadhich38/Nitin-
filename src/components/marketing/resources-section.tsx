"use client";

import Link from "next/link";
import { Reveal } from "@/components/marketing/reveal";

const posts = [
  { title: "Understanding India's CCTS", tag: "Explainer", href: "/resources/ccts" },
  { title: "The Voluntary Carbon Market, explained", tag: "Explainer", href: "/resources/voluntary-market" },
  { title: "Why 'carbon neutral' is the wrong claim", tag: "Insight", href: "/why-carbon-markets" },
];

export function ResourcesSection() {
  return (
    <section className="bg-pran-paper py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-pran-teal">
              Resources
            </p>
            <h2 className="mt-3 font-display text-h1 font-semibold text-pran-text">
              Carbon markets, explained plainly.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/resources/compliance-library"
              className="text-sm font-medium text-pran-teal hover:underline"
            >
              Compliance Library →
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <Link
                href={p.href}
                className="group flex h-full flex-col rounded-card border border-pran-border bg-white p-6 transition-shadow hover:shadow-md"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-pran-muted">
                  {p.tag}
                </span>
                <h3 className="mt-3 flex-1 font-medium text-pran-text group-hover:text-pran-teal">
                  {p.title}
                </h3>
                <span className="mt-4 text-sm font-medium text-pran-teal">Read →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
