import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Section, CtaBand } from "@/components/marketing/page-kit";
import { Reveal } from "@/components/marketing/reveal";
import { LinkedInIcon } from "@/components/shared/icons";
import { FounderPortrait } from "@/components/marketing/founder-portrait";
import { founder, founderPrinciples } from "@/lib/leadership";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Nitin Dadhich, Founder & Managing Director of PRAN — the financial-infrastructure layer for the carbon market.",
};

export default function LeadershipPage() {
  return (
    <>
      {/* Founder — portrait + identity */}
      <section className="bg-pran-forest text-white">
        <div className="mx-auto max-w-content px-6 py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[420px_1fr] lg:gap-16">
            <Reveal>
              <FounderPortrait
                src={founder.photo}
                alt={`${founder.name}, ${founder.role}`}
                initials={founder.initials}
              />
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-display text-display-l font-semibold tracking-[-0.03em] text-white">
                {founder.name}
              </h1>
              <p className="mt-3 font-display text-lg font-medium text-pran-lime">
                {founder.role}
              </p>

              <div className="mt-8 space-y-5">
                {founder.bio.map((para) => (
                  <p
                    key={para.slice(0, 24)}
                    className="max-w-[58ch] text-lg leading-relaxed text-white/70"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Contact — icon vectors only */}
              <div className="mt-9 flex items-center gap-3">
                <a
                  href={`mailto:${founder.email}`}
                  aria-label={`Email ${founder.name}`}
                  title={founder.email}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-pran-lime hover:text-pran-lime"
                >
                  <Mail className="h-[18px] w-[18px]" />
                </a>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${founder.name} on LinkedIn`}
                  title="LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-pran-lime hover:text-pran-lime"
                >
                  <LinkedInIcon className="h-[17px] w-[17px]" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Operating principles */}
      <Section>
        <Reveal>
          <h2 className="max-w-[20ch] font-display text-display-l font-semibold tracking-[-0.03em] text-pran-ink">
            How we operate.
          </h2>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-pran-muted">
            PRAN is infrastructure, not advocacy. These are the constraints the
            product is built inside — they do not bend for a deal.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-panel bg-pran-hairline sm:grid-cols-2">
          {founderPrinciples.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <li className="h-full bg-pran-surface p-8 transition-colors hover:bg-pran-paper-warm">
                <span className="font-display text-sm font-semibold tabular-nums text-pran-emerald">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-h3 font-semibold text-pran-ink">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-pran-muted">
                  {p.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-card bg-pran-paper-warm p-7">
            <p className="max-w-[70ch] text-[15px] leading-relaxed text-pran-muted">
              PRAN is early and building its team. If you work in carbon
              markets, climate finance, or platform engineering and this problem
              is yours too —{" "}
              <Link
                href="/contact"
                className="font-medium text-pran-emerald underline underline-offset-4"
              >
                get in touch
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </Section>

      <CtaBand
        title="Building in this space?"
        subtitle="Whether you're sourcing credits, listing a project, or reporting on a portfolio — start a conversation."
        primary={{ label: "Contact PRAN", href: "/contact" }}
        secondary={{ label: "Why we exist", href: "/about" }}
      />
    </>
  );
}
