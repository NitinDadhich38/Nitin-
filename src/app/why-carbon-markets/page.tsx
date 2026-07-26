import type { Metadata } from "next";
import { PageHeader, Section, CtaBand } from "@/components/marketing/page-kit";
import { Reveal } from "@/components/marketing/reveal";

export const metadata: Metadata = {
  title: "Why Carbon Markets Matter",
  description:
    "Carbon markets channel capital to real climate action. Here's why they matter — and why PRAN insists on honest, verifiable claims.",
};

const beliefs = [
  {
    h: "Price signals move capital",
    p: "When emissions carry a real cost, capital flows to the projects that cut them. Functioning markets turn climate intent into funded action.",
  },
  {
    h: "Verification is everything",
    p: "A credit is only worth what stands behind it. We list registry-issued projects and facilitate transfers you can verify — nothing more, nothing less.",
  },
  {
    h: "Reduce first, then offset",
    p: "Offsetting is for what you can't yet eliminate. We lead every recommendation with real reductions, because that's what actually helps the climate.",
  },
  {
    h: "Honest claims protect everyone",
    p: "We never say 'carbon neutral'. We state a fact: credits were purchased and retired on your behalf. Honest language protects our clients and the market.",
  },
];

export default function WhyCarbonMarketsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Why We Exist"
        title="Climate action needs trusted markets."
        subtitle="Carbon markets can channel serious capital to serious climate work — but only if the data is transparent, the credits are verifiable, and the claims are honest."
        tone="dark"
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2">
          {beliefs.map((b, i) => (
            <Reveal key={b.h} delay={i * 0.06}>
              <div className="rounded-card border border-pran-border bg-white p-7">
                <h2 className="font-display text-h3 font-semibold text-pran-text">{b.h}</h2>
                <p className="mt-3 leading-relaxed text-pran-muted">{b.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Build on infrastructure that takes carbon seriously."
        primary={{ label: "Explore Marketplace", href: "/marketplace" }}
        secondary={{ label: "Request Demo", href: "/contact" }}
      />
    </>
  );
}
