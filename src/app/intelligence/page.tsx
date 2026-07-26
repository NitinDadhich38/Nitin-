import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader, Section } from "@/components/marketing/page-kit";
import { Reveal } from "@/components/marketing/reveal";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Carbon Intelligence",
  description:
    "Procurement intelligence and AI-assisted ESG, BRSR, and CBAM reporting — every draft reviewed by our team before it reaches you.",
};

export default function IntelligenceHub() {
  return (
    <>
      <PageHeader
        eyebrow="Carbon Intelligence"
        title="Every procurement decision and disclosure, powered by one engine."
        subtitle="AI-assisted analysis with a human-review checkpoint on every output — the speed of automation, the safety of expert sign-off."
      />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <Link
                href={`/intelligence/${s.slug}`}
                className="group flex h-full flex-col rounded-card border border-pran-border bg-white p-7 transition-shadow hover:shadow-md"
              >
                <h2 className="font-display text-h3 font-semibold text-pran-text group-hover:text-pran-teal">
                  {s.nav}
                </h2>
                <p className="mt-2 flex-1 text-sm text-pran-muted">{s.subtitle}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-pran-teal">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
