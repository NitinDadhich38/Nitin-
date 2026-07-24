"use client";

import Link from "next/link";
import { Reveal } from "@/components/marketing/reveal";

/** Placeholder monogram entries — founder to provide names/roles (Design.md §3.1). */
const leaders = [
  { initials: "NA", role: "Founder & CEO" },
  { initials: "CT", role: "Co-Founder & CTO" },
];

export function LeadershipSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-pran-teal">
            Leadership
          </p>
          <h2 className="mt-3 font-display text-h1 font-semibold text-pran-text">
            Built by a team that takes carbon seriously.
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-wrap gap-8">
          {leaders.map((l, i) => (
            <Reveal key={l.initials} delay={i * 0.1}>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pran-navy font-display text-lg font-semibold text-pran-gold">
                  {l.initials}
                </div>
                <div>
                  <p className="font-medium text-pran-text">{l.role}</p>
                  <p className="text-sm text-pran-muted">Name added at launch</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <Link
            href="/about/team"
            className="mt-8 inline-block text-sm font-medium text-pran-teal hover:underline"
          >
            Meet the full team →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
