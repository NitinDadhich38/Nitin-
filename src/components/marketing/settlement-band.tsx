"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/marketing/reveal";

/**
 * H11 — "How a trade settles".
 * Escrow is PRAN's biggest trust differentiator and it was invisible on the
 * homepage. A real four-step sequence, so numbered markers are earned here.
 * The connecting rule draws left-to-right on scroll.
 */
const steps = [
  {
    n: "01",
    title: "Request",
    body: "You submit a purchase request with your registry account details. No payment yet.",
  },
  {
    n: "02",
    title: "Escrow",
    body: "You pay into PRAN's escrow. Funds are held — the seller does not receive them.",
    accent: true,
  },
  {
    n: "03",
    title: "Registry transfer",
    body: "The seller transfers credits into your own registry account. PRAN verifies the transfer.",
  },
  {
    n: "04",
    title: "Certificate",
    body: "Funds release to the seller. You receive a certificate recording the credits purchased and retired.",
  },
];

export function SettlementBand() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-pran-paper py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-emerald">
            Settlement
          </p>
          <h2 className="mt-4 max-w-[18ch] font-display text-display-l font-semibold text-pran-ink">
            You pay PRAN. Not the seller.
          </h2>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-pran-muted">
            In this market the transfer is where trust breaks — buyers wire
            funds and wait. PRAN sits in the middle of it, and money only moves
            once the credits land in your registry account.
          </p>
        </Reveal>

        <div className="relative mt-14">
          {/* Connecting rule */}
          <motion.div
            aria-hidden
            className="absolute left-0 top-[22px] hidden h-px origin-left bg-pran-hairline lg:block"
            style={{ right: 0 }}
            initial={reduce ? undefined : { scaleX: 0 }}
            whileInView={reduce ? undefined : { scaleX: 1 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.12}>
                <li className="relative">
                  <span
                    className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full font-mono text-xs font-semibold ${
                      s.accent
                        ? "bg-pran-emerald text-white"
                        : "bg-pran-surface text-pran-ink shadow-card"
                    }`}
                  >
                    {s.n}
                  </span>
                  <h3 className="mt-5 font-display text-h3 font-semibold text-pran-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-[34ch] text-[15px] leading-relaxed text-pran-muted">
                    {s.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={0.3}>
          <p className="mt-12 max-w-[68ch] rounded-card bg-pran-paper-warm p-5 text-sm leading-relaxed text-pran-muted">
            PRAN facilitates, verifies and records. It is not an accredited
            verifier or auditor and never issues carbon credits — credits exist
            only through the seller&rsquo;s registry. Certificates state that
            credits were{" "}
            <span className="font-medium text-pran-ink">
              purchased and retired
            </span>{" "}
            on your behalf.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
