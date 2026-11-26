import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Handshake, Layers } from "lucide-react";
import { MemberCard } from "@/components/membership/member-card";
import { Reveal } from "@/components/marketing/reveal";
import { buttonVariants } from "@/components/ui/button";
import { pranSocial, whatsappLink } from "@/lib/config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "PRAN Membership: a private climate membership for those who believe responsibility grows with success.",
};

const year = [
  { when: "Join", what: "You become a PRAN Member." },
  { when: "Measure", what: "Your footprint is estimated on cited factors." },
  { when: "Retire", what: "Verified credits are purchased and retired once a year." },
  { when: "Record", what: "A dated record states what was completed, and its scope." },
];

const circle = [
  {
    icon: Handshake,
    title: "Partner benefits",
    line: "Products and experiences from companies that share the belief. Named only when real.",
  },
  {
    icon: Layers,
    title: "Environmental commodities",
    line: "A route to access them alongside your membership. Access, not investment advice; no returns promised.",
  },
  {
    icon: CalendarCheck,
    title: "Introductions",
    line: "Members can bring people they trust. The circle grows by invitation.",
  },
];

export default function MembershipPage() {
  const invite = whatsappLink("a PRAN Membership invitation");
  return (
    <>
      {/* Hero */}
      <section className="relative -mt-16 overflow-hidden bg-pran-ink pb-24 pt-40 text-white sm:pb-32 sm:pt-48">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(55%_55%_at_80%_30%,rgba(22,163,74,0.25),transparent_70%),radial-gradient(40%_40%_at_0%_100%,rgba(217,249,157,0.1),transparent_70%)]"
        />
        <div className="relative mx-auto grid max-w-content items-center gap-16 px-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-pran-lime">
              PRAN Membership · By invitation
            </p>
            <h1 className="mt-6 max-w-[10ch] font-display text-[clamp(3.2rem,9vw,7rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
              Own your <span className="text-pran-lime">impact.</span>
            </h1>
            <p className="mt-7 max-w-[44ch] text-xl leading-relaxed text-white/75">
              A private climate membership for those who believe responsibility
              grows with success.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href={invite}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "lg" }), "group")}
              >
                Request an invitation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#the-year"
                className="text-[15px] font-medium text-white underline-offset-4 hover:underline"
              >
                See the year
              </a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <MemberCard className="rotate-[3deg]" />
          </div>
        </div>
      </section>

      {/* Belief */}
      <section className="bg-pran-paper py-28 sm:py-40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <p className="font-display text-[clamp(1.9rem,4.6vw,3.4rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-pran-ink">
              You built a successful life.
              <br />
              <span className="text-pran-emerald">
                You take responsibility for its footprint.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Two marks */}
      <section className="bg-pran-surface py-24 sm:py-32">
        <div className="mx-auto grid max-w-content gap-6 px-6 md:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-panel bg-pran-forest-deep p-10 text-white sm:p-12">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-pran-lime">
                From day one
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em]">
                PRAN Member
              </h2>
              <p className="mt-4 max-w-[34ch] text-white/70">
                Your commitment, recognised the moment you join.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="h-full rounded-panel border border-pran-hairline bg-pran-paper p-10 sm:p-12">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-pran-emerald">
                Earned each year
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-pran-ink">
                Annual Record
              </h2>
              <p className="mt-4 max-w-[34ch] text-pran-muted">
                Dated, scoped and evidenced. It says only what was actually
                completed.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* The year */}
      <section id="the-year" className="scroll-mt-20 bg-pran-paper py-24 sm:py-32">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <h2 className="max-w-[16ch] font-display text-display-l font-semibold tracking-[-0.03em] text-pran-ink">
              One year, in four lines.
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-10 border-t border-pran-hairline pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {year.map((y, i) => (
              <Reveal key={y.when} delay={i * 0.07}>
                <li>
                  <p className="font-display text-sm tabular-nums text-pran-emerald">
                    0{i + 1}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] text-pran-ink">
                    {y.when}
                  </h3>
                  <p className="mt-2 max-w-[28ch] text-pran-muted">{y.what}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* The circle */}
      <section className="bg-pran-forest-deep py-24 text-white sm:py-32">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-pran-lime">
              The circle
            </p>
            <h2 className="mt-4 max-w-[18ch] font-display text-display-l font-semibold tracking-[-0.03em]">
              More than a certificate.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {circle.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="h-full rounded-card border border-white/15 bg-white/[0.04] p-7">
                  <c.icon className="h-6 w-6 text-pran-lime" />
                  <h3 className="mt-5 font-display text-xl font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{c.line}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Invitation */}
      <section className="bg-pran-ink py-28 text-center text-white sm:py-36">
        <div className="mx-auto max-w-2xl px-6">
          <Reveal>
            <h2 className="font-display text-display-l font-semibold tracking-[-0.03em]">
              Membership is by invitation.
            </h2>
            <p className="mx-auto mt-5 max-w-[40ch] text-white/70">
              If someone in the circle has not reached you yet, tell us and we
              will be in touch.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href={invite}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ size: "lg" })}
              >
                Request an invitation
              </a>
              <a
                href={`mailto:${pranSocial.email}?subject=PRAN%20Membership`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/30 text-white hover:bg-white/10",
                )}
              >
                Write to us
              </a>
            </div>
            <p className="mx-auto mt-12 max-w-[60ch] text-xs leading-relaxed text-white/40">
              PRAN records state the verified carbon credits purchased and
              retired, for a stated period. PRAN is not a verifier and does not
              claim carbon neutrality, net zero or climate-positive outcomes.
              Environmental commodities are described as access only; nothing
              here is investment advice or a promise of returns.{" "}
              <Link href="/legal/terms" className="underline underline-offset-2">
                Terms
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
