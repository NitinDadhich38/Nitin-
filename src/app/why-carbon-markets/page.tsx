import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/marketing/page-kit";
import { Reveal } from "@/components/marketing/reveal";
import { photos } from "@/lib/images";

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
      {/* Hero */}
      <section className="relative flex min-h-[62vh] items-center overflow-hidden bg-pran-forest text-white">
        <Image
          src={photos.forestRiver}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(70%_60%_at_78%_25%,rgba(217,249,157,.12),transparent_58%),linear-gradient(180deg,rgba(4,12,8,.66),rgba(3,9,6,.93))]"
        />
        <div className="relative z-10 mx-auto w-full max-w-content px-6 py-20 sm:py-28">
          <Reveal>
            <h1 className="max-w-[16ch] font-display text-[clamp(2.6rem,6vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
              Climate action needs trusted markets.
            </h1>
            <p className="mt-7 max-w-[58ch] text-lg leading-relaxed text-white/70">
              Carbon markets can channel serious capital to serious climate work
              — but only if the data is transparent, the credits are verifiable,
              and the claims are honest.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Beliefs — numbered editorial rows */}
      <section className="mx-auto max-w-content px-6 py-20 sm:py-24">
        <div className="space-y-px overflow-hidden rounded-panel bg-pran-hairline">
          {beliefs.map((b, i) => (
            <Reveal key={b.h} delay={i * 0.05}>
              <div className="grid gap-4 bg-pran-surface p-8 sm:grid-cols-[auto_1fr_1.3fr] sm:items-start sm:gap-10 sm:p-10">
                <span className="font-display text-sm font-semibold tabular-nums text-pran-emerald">
                  0{i + 1}
                </span>
                <h2 className="font-display text-h2 font-semibold leading-tight tracking-[-0.02em] text-pran-ink">
                  {b.h}
                </h2>
                <p className="text-[17px] leading-relaxed text-pran-muted">
                  {b.p}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* The claim rule, quoted as the standard it is */}
        <Reveal delay={0.1}>
          <figure className="mt-14 rounded-panel bg-pran-forest p-10 text-white sm:p-14">
            <blockquote className="max-w-[46ch] font-display text-[clamp(1.5rem,3vw,2.1rem)] font-semibold leading-snug tracking-[-0.02em]">
              &ldquo;Purchased and retired X&nbsp;tCO₂e of verified carbon
              credits for this period.&rdquo;
            </blockquote>
            <figcaption className="mt-6 max-w-[56ch] leading-relaxed text-white/60">
              This is the only claim PRAN puts on a certificate. It is a
              statement of what happened, not a statement about your net
              position — which is precisely why it holds up.
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <CtaBand
        title="Build on infrastructure that takes carbon seriously."
        primary={{ label: "Explore Marketplace", href: "/marketplace" }}
        secondary={{ label: "Request Demo", href: "/contact" }}
      />
    </>
  );
}
