"use client";

import Link from "next/link";
import { Building2, Landmark, Sprout, Leaf, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";

const cards = [
  { icon: Building2, title: "Enterprise", href: "/solutions/enterprise", desc: "Procure and report at institutional scale." },
  { icon: Landmark, title: "Government", href: "/solutions/government", desc: "Market infrastructure for public climate goals." },
  { icon: Sprout, title: "Project Developers", href: "/solutions/developers", desc: "List your project with real buyers." },
  { icon: Leaf, title: "General Public", href: "/solutions/public", desc: "Become carbon neutral — calculate, offset, certify.", featured: true },
];

export function SolutionsSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-pran-teal">
            Solutions
          </p>
          <h2 className="mt-3 max-w-xl font-display text-h1 font-semibold text-pran-text">
            Built for every participant in the carbon economy.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <Link
                href={c.href}
                className={
                  c.featured
                    ? "group flex h-full flex-col rounded-card bg-pran-navy p-6 text-white transition-transform hover:-translate-y-1"
                    : "group flex h-full flex-col rounded-card border border-pran-border bg-white p-6 transition-transform hover:-translate-y-1 hover:shadow-md"
                }
              >
                <c.icon className={c.featured ? "h-6 w-6 text-pran-gold" : "h-6 w-6 text-pran-teal"} />
                <h3 className={`mt-4 font-medium ${c.featured ? "text-white" : "text-pran-text group-hover:text-pran-teal"}`}>
                  {c.title}
                </h3>
                <p className={`mt-2 flex-1 text-sm ${c.featured ? "text-white/70" : "text-pran-muted"}`}>
                  {c.desc}
                </p>
                <span
                  className={`mt-4 inline-flex items-center gap-1 text-sm font-medium ${
                    c.featured ? "text-pran-gold" : "text-pran-teal"
                  }`}
                >
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
