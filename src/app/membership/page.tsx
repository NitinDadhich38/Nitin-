import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InvitationForm } from "@/components/membership/invitation-form";
import { ArchPhoto } from "@/components/membership/arch-photo";
import { Reveal } from "@/components/marketing/reveal";
import { imageCredit, membershipImages as mi, pageImages } from "@/lib/images";
import { pranSocial, whatsappLink } from "@/lib/config";
import { cn } from "@/lib/utils";

/**
 * Hero photograph. The brown autumn forest is the chosen image. The prepared
 * alternative is `mi.heroAlt` (misty cliff): swap it in here and in the
 * homepage teaser if wanted.
 */
const HERO = pageImages.resourcesBlog;

export const metadata: Metadata = {
  title: "Membership",
  description:
    "PRAN Membership: a belief before it is anything else. Responsibility grows with success.",
  openGraph: {
    title: "PRAN Membership. Own your impact.",
    description:
      "A belief before it is anything else. Responsibility grows with success.",
    images: [HERO],
  },
};

const marks = [
  {
    word: "Belonging is a decision.",
    tag: "PRAN Member",
    line: "You become a PRAN Member the day you join. It says one thing: you have chosen to answer for your footprint. It is a commitment, not a result.",
    src: mi.terraces,
    alt: "Terraced fields and a village below misty hills",
  },
  {
    word: "A record is earned.",
    tag: "The Annual Record",
    line: "Joining shows commitment. A record comes only from a year of completed work, and it is never given for joining alone.",
    src: mi.pen,
    alt: "A fountain pen resting on handwritten paper",
  },
  {
    word: "Restoration is real.",
    tag: "Where it goes",
    line: "What is done for the planet should be specific and described plainly, never inflated. PRAN is not a verifier and does not create credits.",
    src: mi.aerialForest,
    alt: "Dense green forest seen from above",
  },
];

const never = [
  "Carbon neutral is not a claim to make lightly.",
  "A badge should not be for sale.",
  "A record should never claim more than was done.",
  "This is not about returns.",
];

const year = [
  { no: "I", word: "Join", line: "You are welcomed as a Member. Nothing is claimed yet.", src: mi.forestFloor, alt: "Forest floor in low light" },
  { no: "II", word: "Measure", line: "Your footprint for the year is estimated openly.", src: mi.mossyStone, alt: "Moss growing around a stone" },
  { no: "III", word: "Act", line: "Your responsibility for the year is taken up.", src: mi.heroAlt, alt: "Cloud over a rocky mountainside" },
  { no: "IV", word: "Record", line: "A completed year is acknowledged.", src: mi.deskBook, alt: "A pen and a book on a dark wooden desk" },
];

const circle = [
  ["Partners", "We are building relationships with companies that share the belief. "],
  ["Introductions", "Members can introduce people they trust. Every invitation is personal, and the circle stays small enough to mean something."],
  ["Environmental commodities", "Over time, members may be offered access to environmental commodities alongside the membership. Access only: PRAN gives no investment advice and promises no returns."],
];

const answers = [
  ["Is this carbon neutral?", "No. PRAN makes no claim of carbon neutrality, net zero or climate-positive outcomes."],
  ["What is a PRAN Member?", "Someone who has chosen to take responsibility for their footprint. The designation records a decision, not a result."],
  ["What is the annual record?", "The acknowledgement of a completed year. It is earned by what a member does, never by joining alone."],
  ["What does membership include?", "Details are shared with invited members."],
  ["What about environmental commodities?", "Access, over time, and only that. PRAN does not give investment advice and promises no returns."],
  ["How do I join?", "By invitation. If you were invited, or someone in the circle has spoken for you, request an invitation below."],
];

export default function MembershipPage() {
  const invite = whatsappLink("a PRAN Membership invitation");
  const cta =
    "inline-flex h-14 items-center justify-center rounded-btn px-8 text-base font-medium transition-colors";
  return (
    <>
      {/* 1. Hero */}
      <section className="relative -mt-16 flex min-h-[100svh] items-center justify-center overflow-hidden bg-pran-ink">
        <Image src={HERO} alt="Sunlight through an autumn forest" fill priority sizes="100vw" className="object-cover" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,20,14,.6)_0%,rgba(6,20,14,.25)_40%,rgba(6,20,14,.7)_100%)]"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-16 text-center text-white">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-white drop-shadow">
            PRAN Membership
          </p>
          <h1 className="mt-7 font-display text-[clamp(3.2rem,10vw,7.5rem)] font-medium leading-[0.96] tracking-[-0.04em]">
            Own your impact.
          </h1>
          <p className="mx-auto mt-7 max-w-[34ch] text-lg leading-relaxed text-white/90">
            Some lives reach far. So should their responsibility.
          </p>
          <a
            href="#belief"
            className={cn(cta, "mt-10 border border-white/70 text-white hover:bg-white hover:text-pran-forest")}
          >
            Read the belief
          </a>
        </div>
      </section>

      {/* 2. The belief: one thought per screen */}
      <section id="belief" className="bg-pran-cream">
        {[
          "The more you build, the further you reach.",
          "The further you reach, the more you leave behind.",
          "Responsibility is not the price of success. It is part of it.",
        ].map((t) => (
          <div key={t} className="flex min-h-[70svh] items-center justify-center px-6 py-20">
            <Reveal className="mx-auto max-w-5xl text-center">
              <h2 className="font-display text-[clamp(2.4rem,7vw,6rem)] font-medium leading-[1.02] tracking-[-0.04em] text-pran-forest">
                {t}
              </h2>
            </Reveal>
          </div>
        ))}
        <div className="px-6 pb-28 pt-6 text-center sm:pb-40">
          <Reveal className="mx-auto max-w-2xl">
            <p className="text-lg leading-relaxed text-pran-forest/80">
              Most people are offered guilt about their footprint, or silence.
              PRAN offers something more dignified: to answer for it openly, in
              proportion to what you have built.
            </p>
            <p className="mt-6 font-display text-2xl font-medium tracking-[-0.02em] text-pran-forest">
              That is the whole idea.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. What we hold to */}
      <section className="bg-pran-sand py-24 sm:py-32">
        <div className="mx-auto max-w-content px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-pran-forest/70">
              What we hold to
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-pran-forest">
              Belonging is one thing. The record is another.
            </h2>
            <p className="mt-5 text-pran-forest/75">
              We keep them apart on purpose. Joining shows commitment. Only
              completed work earns a record.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-16 md:grid-cols-3 md:gap-8">
            {marks.map((m, i) => (
              <Reveal key={m.word} delay={i * 0.1}>
                <ArchPhoto src={m.src} alt={m.alt} className="aspect-[3/4] w-full" />
                <p className="mt-8 text-center text-xs font-medium uppercase tracking-[0.28em] text-pran-forest/60">
                  {m.tag}
                </p>
                <h3 className="mt-2 text-center font-display text-2xl font-medium tracking-[-0.02em] text-pran-forest">
                  {m.word}
                </h3>
                <p className="mx-auto mt-3 max-w-[32ch] text-center text-[15px] leading-relaxed text-pran-forest/75">
                  {m.line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. What we will not say */}
      <section className="relative overflow-hidden bg-pran-ink py-28 text-white sm:py-40">
        <Image src={mi.aerialForest} alt="" fill sizes="100vw" className="object-cover opacity-30" />
        <div aria-hidden className="absolute inset-0 bg-pran-ink/60" />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-white/70">
              A badge can be bought. A record has to be earned.
            </p>
          </Reveal>
          <div className="mt-10 space-y-6 sm:space-y-8">
            {never.map((n, i) => (
              <Reveal key={n} delay={i * 0.08}>
                <p className="font-display text-[clamp(1.8rem,4.6vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.03em]">
                  {n}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-12 max-w-[46ch] text-lg leading-relaxed text-white/80">
              What membership means will come from what members do, not from
              what we say about them.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 4b. A note from the organisation */}
      <section className="bg-pran-cream py-24 sm:py-36">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-pran-forest/70">
            A note from PRAN
          </p>
          <p className="mt-8 font-display text-[clamp(1.5rem,3vw,2.2rem)] font-medium leading-[1.25] tracking-[-0.02em] text-pran-forest">
            We believe responsibility should grow with success, and that it
            should be answered for plainly, without noise. Membership is small
            on purpose. We would rather do less and say exactly what we did.
          </p>
          <p className="mt-8 text-pran-forest/70">PRAN</p>
        </Reveal>
      </section>

      {/* 5. One year */}
      <section className="bg-pran-sand py-24 sm:py-32">
        <div className="mx-auto max-w-content px-6">
          <Reveal className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-pran-forest/70">
              One year
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3.2rem)] font-medium tracking-[-0.03em] text-pran-forest">
              Four steps, once a year.
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
            {year.map((y, i) => (
              <Reveal key={y.word} delay={i * 0.08}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-[14px]">
                  <Image src={y.src} alt={y.alt} fill sizes="(max-width:768px) 90vw, 280px" className="object-cover" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="font-display text-sm tracking-[0.2em] text-white/75">{y.no}</p>
                    <p className="mt-1 font-display text-2xl font-medium">{y.word}</p>
                    <p className="mt-2 text-sm leading-snug text-white/85">{y.line}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. The circle */}
      <section className="bg-pran-forest py-24 text-white sm:py-32">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <h2 className="max-w-[18ch] font-display text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              A circle, not a crowd.
            </h2>
            <p className="mt-5 max-w-[48ch] text-white/75">
              Membership is by invitation, and it stays small enough to mean
              something.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-px bg-white/15 md:grid-cols-3">
            {circle.map(([t, l], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="h-full bg-pran-forest p-8 md:p-10">
                  <h3 className="font-display text-2xl font-medium">{t}</h3>
                  <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-white/75">{l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6b. Plain answers */}
      <section className="bg-pran-cream py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] font-medium tracking-[-0.03em] text-pran-forest">
              Plain answers.
            </h2>
          </Reveal>
          <div className="mt-10 divide-y divide-pran-forest/15 border-y border-pran-forest/15">
            {answers.map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-medium text-pran-forest">
                  {q}
                  <span aria-hidden className="text-2xl text-pran-forest/50 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-pran-forest/75">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Invitation */}
      <section className="relative overflow-hidden py-32 text-center text-white sm:py-44">
        <Image src={mi.goldenHills} alt="Layered hills in golden haze" fill sizes="100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-pran-ink/55" />
        <Reveal className="relative z-10 mx-auto max-w-2xl px-6">
          <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-medium leading-[1.05] tracking-[-0.03em]">
            Membership is by invitation.
          </h2>
          <p className="mx-auto mt-6 max-w-[42ch] text-lg leading-relaxed text-white/85">
            If you have been invited, or someone in the circle has spoken for
            you, tell us. We will be in touch.
          </p>
          <div id="invite" className="mt-10 scroll-mt-24 text-left">
            <InvitationForm />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={invite} target="_blank" rel="noopener noreferrer" className={cn(cta, "border border-white/60 text-white hover:bg-white/10")}>
              Or message us on WhatsApp
            </a>
            <a href={`mailto:${pranSocial.email}?subject=PRAN%20Membership`} className={cn(cta, "border border-white/60 text-white hover:bg-white/10")}>
              Write to us
            </a>
          </div>
        </Reveal>
      </section>

      {/* Fine print */}
      <section className="bg-pran-ink px-6 py-10">
        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-white/45">
          PRAN is not a verifier and does not claim carbon
          neutrality, net zero or climate-positive outcomes. Environmental
          commodities are described as access only; nothing here is investment
          advice or a promise of returns. {imageCredit}{" "}
          <Link href="/legal/terms" className="underline underline-offset-2">
            Terms
          </Link>
        </p>
      </section>
    </>
  );
}
