import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/marketing/page-kit";
import { Reveal } from "@/components/marketing/reveal";
import { TexturedSection } from "@/components/marketing/textured-section";
import { photos } from "@/lib/images";
import { founderPrinciples } from "@/lib/leadership";

export const metadata: Metadata = {
  title: "Why We Exist",
  description:
    "PRAN is building the financial infrastructure layer for the carbon market — transparent, verifiable, and honest by design.",
};

/** What PRAN is, stated against what it is not. The contrast is the point. */
const isIsNot = [
  {
    not: "Not an issuer",
    is: "Credits exist only because a registry issued them. PRAN lists what already exists.",
  },
  {
    not: "Not an auditor or verifier",
    is: "Validation and verification are done by accredited third parties, on the registry's terms.",
  },
  {
    not: "Not a financial advisor",
    is: "We do not advise on carbon price direction or treat credits as an investment product.",
  },
  {
    not: "Not a green brand",
    is: "We are market infrastructure. The product is settlement, records, and screening — not a message.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-pran-forest text-white">
        <Image
          src={photos.mountainForest}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_55%_at_80%_20%,rgba(217,249,157,.12),transparent_60%),linear-gradient(180deg,rgba(5,14,9,.74),rgba(4,12,8,.94))]"
        />
        <div className="relative z-10 mx-auto max-w-content px-6 py-20 sm:py-28">
          <Reveal>
            <h1 className="max-w-[20ch] font-display text-display-l font-semibold tracking-[-0.03em] text-white">
              The financial infrastructure for the carbon market.
            </h1>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-white/70">
              PRAN — operated by Pran Sustainability Pvt. Ltd. — exists to make
              the carbon economy work like real financial infrastructure:
              transparent, verifiable, and honest.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The argument */}
      <section className="mx-auto max-w-content px-6 py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="max-w-[18ch] font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
              The gaps between participants are the cost.
            </h2>
          </Reveal>
          <div className="space-y-5 text-lg leading-relaxed text-pran-muted">
            <Reveal delay={0.05}>
              <p>
                Carbon markets today are fragmented. Developers, registries,
                buyers, governments, and consultants each hold a piece of the
                picture — and the gaps between them create cost, delay, and
                distrust.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                PRAN connects those participants through one marketplace. We
                list registry-issued projects, settle purchases through escrow,
                and issue factual retirement certificates. We add intelligence —
                procurement guidance and reporting — with a human review step on
                every output.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="font-medium text-pran-ink">
                That discipline is what makes the market trustworthy.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we are not */}
      <TexturedSection
        photo={photos.forestMist}
        tone="light"
        className="border-t border-pran-hairline py-20"
      >
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <h2 className="max-w-[22ch] font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
              What PRAN is, stated against what it isn&rsquo;t.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-panel bg-pran-hairline sm:grid-cols-2">
            {isIsNot.map((x, i) => (
              <Reveal key={x.not} delay={i * 0.05}>
                <div className="h-full bg-pran-surface p-8">
                  <p className="font-display text-h3 font-semibold text-pran-ink">
                    {x.not}
                  </p>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-pran-muted">
                    {x.is}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </TexturedSection>

      {/* Operating principles, shared with the leadership page */}
      <TexturedSection photo={photos.seedling} tone="light" className="py-20">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <h2 className="max-w-[22ch] font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
              How we operate.
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2">
            {founderPrinciples.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <li className="flex h-full flex-col rounded-panel bg-pran-surface p-7 shadow-card">
                  <span className="font-display text-sm font-semibold tabular-nums text-pran-emerald">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-h3 font-semibold text-pran-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-pran-muted">
                    {p.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </TexturedSection>

      <CtaBand
        title="Meet the person building it."
        primary={{ label: "Leadership", href: "/about/team" }}
        secondary={{
          label: "Why carbon markets matter",
          href: "/why-carbon-markets",
        }}
      />
    </>
  );
}
