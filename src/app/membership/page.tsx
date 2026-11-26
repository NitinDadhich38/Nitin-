import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
    "PRAN Membership: a private climate membership for those who believe responsibility grows with success.",
  openGraph: {
    title: "PRAN Membership. Own your impact.",
    description:
      "A private climate membership for those who believe responsibility grows with success.",
    images: [HERO],
  },
};

const marks = [
  {
    word: "Belong",
    tag: "PRAN Member",
    line: "You become a PRAN Member the day you join. It says one thing: you have chosen to answer for your footprint. It is a commitment, not a result, and we never present it as more.",
    src: mi.terraces,
    alt: "Terraced fields and a village below misty hills",
  },
  {
    word: "Earn",
    tag: "The Annual Record",
    line: "Each year, what you actually completed is written down: the period it covers, the footprint estimated, the verified credits purchased and retired, and the evidence. If a year is incomplete, the record says so.",
    src: mi.pen,
    alt: "A fountain pen resting on handwritten paper",
  },
  {
    word: "Restore",
    tag: "Where it goes",
    line: "The credits come from projects listed on recognised registries. PRAN buys and retires them. PRAN does not create credits and is not a verifier.",
    src: mi.aerialForest,
    alt: "Dense green forest seen from above",
  },
];

const year = [
  { no: "I", word: "Join", line: "You are welcomed as a Member. Nothing is claimed yet.", src: mi.forestFloor, alt: "Forest floor in low light" },
  { no: "II", word: "Measure", line: "Your footprint for the year is estimated on published emission factors.", src: mi.mossyStone, alt: "Moss growing around a stone" },
  { no: "III", word: "Retire", line: "Verified credits are purchased and retired once a year.", src: mi.heroAlt, alt: "Cloud over a rocky mountainside" },
  { no: "IV", word: "Record", line: "Your Annual Record is issued: dated, scoped, evidenced.", src: mi.deskBook, alt: "A pen and a book on a dark wooden desk" },
];

const circle = [
  ["Partners", "We are building relationships with companies that share the belief. They will be named here once they are real, and not before."],
  ["Introductions", "Members can introduce people they trust. Every invitation is personal, and the circle stays small enough to mean something."],
  ["Environmental commodities", "Over time, members may be offered access to environmental commodities alongside the membership. Access only: PRAN gives no investment advice and promises no returns."],
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
            A private climate membership for those who believe responsibility
            grows with success.
          </p>
          <a
            href={invite}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(cta, "mt-10 border border-white/70 text-white hover:bg-white hover:text-pran-forest")}
          >
            Request an invitation
          </a>
        </div>
      </section>

      {/* 2. The belief */}
      <section className="bg-pran-cream py-28 sm:py-40">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-pran-forest/70">
            The belief
          </p>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-pran-forest">
            Responsibility grows with success.
          </h2>
          <div aria-hidden className="mx-auto mt-10 h-14 w-px bg-pran-forest/30" />
          <p className="mx-auto mt-10 max-w-[54ch] text-lg leading-relaxed text-pran-forest/80">
            The further a life reaches, the further its footprint travels: the
            journeys, the homes, the events, the companies behind a name. Most
            people are offered guilt about that, or silence. PRAN offers
            something more useful and more dignified: to take responsibility
            for it openly, and in proportion to what you have built.
          </p>
        </Reveal>
      </section>

      {/* 3. Belong, Earn, Restore */}
      <section className="bg-pran-sand py-24 sm:py-32">
        <div className="mx-auto max-w-content px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[clamp(1.9rem,4vw,3.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-pran-forest">
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
                <h3 className="mt-2 text-center font-display text-3xl font-medium tracking-[-0.02em] text-pran-forest">
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

      {/* 4. Why a record, not a badge */}
      <section className="bg-pran-cream py-28 text-center sm:py-36">
        <Reveal className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.03em] text-pran-forest">
            A badge can be bought. A record has to be earned.
          </h2>
          <p className="mx-auto mt-8 max-w-[54ch] text-lg leading-relaxed text-pran-forest/80">
            That is why PRAN never gives a mark for joining alone, and why we
            will not call anyone carbon neutral. We say exactly what was
            purchased and retired, for which period, and we show the evidence.
            What membership means will come from what members do, not from what
            we say about them.
          </p>
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
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href={invite} target="_blank" rel="noopener noreferrer" className={cn(cta, "bg-white text-pran-forest hover:bg-pran-cream")}>
              Request an invitation
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
          PRAN records state the verified carbon credits purchased and retired
          for a stated period. PRAN is not a verifier and does not claim carbon
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
