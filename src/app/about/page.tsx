import type { Metadata } from "next";
import { PageHeader, Section, CtaBand } from "@/components/marketing/page-kit";
import { Reveal } from "@/components/marketing/reveal";

export const metadata: Metadata = {
  title: "Why We Exist",
  description:
    "PRAN is building the financial infrastructure layer for the carbon market — transparent, verifiable, and honest by design.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About PRAN"
        title="The financial infrastructure for the carbon market."
        subtitle="PRAN — operated by Pran Sustainability Pvt. Ltd. — exists to make the carbon economy work like real financial infrastructure: transparent, verifiable, and honest."
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-5 text-lg leading-relaxed text-pran-text">
          <Reveal>
            <p>
              Carbon markets today are fragmented. Developers, registries,
              buyers, governments, and consultants each hold a piece of the
              picture — and the gaps between them create cost, delay, and
              distrust.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              PRAN connects those participants through one intelligent
              marketplace. We list registry-issued projects, settle purchases
              through escrow, and issue factual retirement certificates. We add
              intelligence — procurement guidance and reporting — with a human
              review step on every output.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              We are deliberately not an issuer, an auditor, or a financial
              advisor. We facilitate, record, and present — and we say so
              plainly. That discipline is what makes the market trustworthy.
            </p>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Meet the team building it."
        primary={{ label: "Our team", href: "/about/team" }}
        secondary={{ label: "Why carbon markets matter", href: "/why-carbon-markets" }}
      />
    </>
  );
}
