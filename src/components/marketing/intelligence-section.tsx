"use client";

import Link from "next/link";
import { LineChart, FileBarChart, ClipboardCheck, Factory } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";

const cards = [
  { icon: LineChart, title: "Procurement & Decision Intelligence", href: "/intelligence/procurement", desc: "Buy carbon credits the way you'd underwrite any asset." },
  { icon: FileBarChart, title: "AI ESG Reporting", href: "/intelligence/esg", desc: "Board-ready disclosures mapped to BRSR/GRI/SDGs." },
  { icon: ClipboardCheck, title: "AI BRSR Reporting", href: "/intelligence/brsr", desc: "SEBI BRSR, without the compliance fire drill." },
  { icon: Factory, title: "AI CBAM Alignment", href: "/intelligence/cbam", desc: "Embedded-emissions figures your EU customer demands." },
];

export function IntelligenceSection() {
  return (
    <section className="bg-pran-paper py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-pran-teal">
            Carbon Intelligence
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-h1 font-semibold text-pran-text">
            Every decision, every disclosure — one intelligence engine.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <Link
                href={c.href}
                className="group flex h-full flex-col rounded-card border border-pran-border bg-white p-6 transition-shadow hover:shadow-md"
              >
                <c.icon className="h-6 w-6 text-pran-teal" />
                <h3 className="mt-4 font-medium text-pran-text group-hover:text-pran-teal">
                  {c.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-pran-muted">{c.desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
