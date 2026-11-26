import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArchPhoto } from "@/components/membership/arch-photo";
import { Reveal } from "@/components/marketing/reveal";
import { imageCredit, pageImages, photos } from "@/lib/images";
import { pranSocial, whatsappLink } from "@/lib/config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "PRAN Membership: a private climate membership for those who believe responsibility grows with success.",
  openGraph: {
    title: "PRAN Membership. Own your impact.",
    description:
      "A private climate membership for those who believe responsibility grows with success.",
    images: [pageImages.resourcesBlog],
  },
};

const marks = [
  {
    word: "Belong",
    line: "You are a PRAN Member from the day you join.",
    src: pageImages.aboutWhy,
    alt: "Green hills seen from above",
  },
  {
    word: "Account",
    line: "Each year, a dated record of what was actually completed.",
    src: pageImages.legalHero,
    alt: "Forest meeting a lake, from above",
  },
  {
    word: "Restore",
    line: "Verified credits retired for the footprint you answer for.",
    src: pageImages.resourcesVoluntary,
    alt: "Hands holding a young plant",
  },
];

const year = [
  { no: "I", word: "Join", src: photos.forestMist, alt: "Sunlight through a misty forest" },
  { no: "II", word: "Measure", src: pageImages.calculatorHero, alt: "Wind turbines at sunset" },
  { no: "III", word: "Retire", src: pageImages.resourcesCompliance, alt: "Solar array under cloud" },
  { no: "IV", word: "Record", src: photos.leaves, alt: "Sun through green leaves" },
];

const circle = [
  ["Partners", "Companies that share the belief. Named here once they are real."],
  ["Introductions", "Members bring people they trust. The circle grows by invitation."],
  ["Environmental commodities", "A route to access. Not investment advice; no returns promised."],
];

export default function MembershipPage() {
  const invite = whatsappLink("a PRAN Membership invitation");
  const cta =
    "inline-flex h-14 items-center justify-center rounded-btn px-8 text-base font-medium transition-colors";
  return (
    <>
      {/* 1. Hero: one photograph, very few words */}
      <section className="relative -mt-16 flex min-h-[100svh] items-center justify-center overflow-hidden bg-pran-ink">
        <Image
          src={pageImages.resourcesBlog}
          alt="Sunlight through an autumn forest"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
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
          <p className="mx-auto mt-7 max-w-[34ch] text-lg leading-relaxed text-white/85">
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
        <span aria-hidden className="absolute bottom-7 left-1/2 z-10 h-12 w-px -translate-x-1/2 bg-white/50" />
      </section>

      {/* 2. The belief */}
      <section className="bg-pran-cream py-28 text-center sm:py-40">
        <Reveal className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-pran-forest">
            Responsibility grows with success.
          </h2>
          <div aria-hidden className="mx-auto mt-10 h-14 w-px bg-pran-forest/30" />
          <p className="mx-auto mt-10 max-w-[48ch] text-base leading-relaxed text-pran-forest/75">
            You built a successful life. PRAN is a quiet place to take
            responsibility for its footprint, and to have it recorded honestly.
          </p>
        </Reveal>
      </section>

      {/* 3. Belong, Account, Restore */}
      <section className="bg-pran-sand py-24 sm:py-32">
        <div className="mx-auto max-w-content px-6">
          <div className="grid gap-14 md:grid-cols-3 md:gap-8">
            {marks.map((m, i) => (
              <Reveal key={m.word} delay={i * 0.1}>
                <ArchPhoto src={m.src} alt={m.alt} className="aspect-[3/4] w-full" />
                <h3 className="mt-7 text-center font-display text-3xl font-medium tracking-[-0.02em] text-pran-forest">
                  {m.word}
                </h3>
                <p className="mx-auto mt-3 max-w-[26ch] text-center text-pran-forest/70">
                  {m.line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The year */}
      <section className="bg-pran-cream py-24 sm:py-32">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-[0.32em] text-pran-forest/70">
              One year
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {year.map((y, i) => (
              <Reveal key={y.word} delay={i * 0.08}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-[14px]">
                  <Image src={y.src} alt={y.alt} fill sizes="(max-width:768px) 45vw, 280px" className="object-cover" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="font-display text-sm tracking-[0.2em] text-white/75">{y.no}</p>
                    <p className="mt-1 font-display text-2xl font-medium">{y.word}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. The circle */}
      <section className="bg-pran-forest py-24 text-white sm:py-32">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <h2 className="max-w-[16ch] font-display text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              The circle.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px bg-white/15 md:grid-cols-3">
            {circle.map(([t, l], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="h-full bg-pran-forest p-8 md:p-10">
                  <h3 className="font-display text-2xl font-medium">{t}</h3>
                  <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-white/70">{l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Invitation over a photograph */}
      <section className="relative overflow-hidden py-32 text-center text-white sm:py-44">
        <Image
          src={pageImages.resourcesHero}
          alt="Misty green valley at dusk"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-pran-ink/60" />
        <Reveal className="relative z-10 mx-auto max-w-2xl px-6">
          <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-medium leading-[1.05] tracking-[-0.03em]">
            Membership is by invitation.
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={invite}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(cta, "bg-white text-pran-forest hover:bg-pran-cream")}
            >
              Request an invitation
            </a>
            <a
              href={`mailto:${pranSocial.email}?subject=PRAN%20Membership`}
              className={cn(cta, "border border-white/60 text-white hover:bg-white/10")}
            >
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
