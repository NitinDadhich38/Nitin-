"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";

/** Placeholder entries — founder to provide names/photos (honest, no fabrication). */
const leaders = [
  { initials: "NA", role: "Founder & CEO" },
  { initials: "CT", role: "Co-Founder & CTO" },
];

export function LeadershipSection() {
  return (
    <section className="bg-pran-paper py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-emerald">
              Leadership
            </p>
            <h2 className="mt-4 max-w-[18ch] font-display text-display-l font-semibold text-pran-ink">
              Built by a team that takes carbon seriously.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/about/team"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-pran-emerald"
            >
              Meet the full team
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {leaders.map((l, i) => (
            <Reveal key={l.initials} delay={i * 0.08}>
              <div className="flex items-center gap-4 rounded-panel bg-pran-surface p-5 shadow-card">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pran-forest font-display text-base font-semibold text-white">
                  {l.initials}
                </div>
                <div>
                  <p className="font-medium text-pran-ink">{l.role}</p>
                  <p className="text-sm text-pran-muted">Name added at launch</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
