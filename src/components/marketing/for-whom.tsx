import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { photos } from "@/lib/images";

/**
 * Built for whom — editorial alternating rows.
 *
 * Each audience gets a full row: a large photograph on one side (image
 * alternates left/right) and a real headline + value proposition + link on the
 * other. Photography carries the emotion; the image scales gently on hover.
 */
const audiences = [
  {
    no: "01",
    kicker: "Enterprise",
    title: "Procure and report at institutional scale.",
    line: "Buy verified credits, run BRSR and CBAM reporting, and settle through escrow — with an audit trail your finance team can trust.",
    href: "/solutions/enterprise",
    photo: photos.solar,
    alt: "Solar installation",
  },
  {
    no: "02",
    kicker: "Government",
    title: "Market infrastructure for public climate goals.",
    line: "The neutral rails to mobilise supply, standardise quality and channel finance toward national targets — transparently.",
    href: "/solutions/government",
    photo: photos.greenHills,
    alt: "Green hills from the air",
  },
  {
    no: "03",
    kicker: "Project Developers",
    title: "Reach buyers who can actually transact.",
    line: "List registry-backed projects, show quality where buyers can screen it, and get paid through settlement that clears.",
    href: "/solutions/developers",
    photo: photos.mountainForest,
    alt: "Mountain forest",
  },
  {
    no: "04",
    kicker: "Individuals",
    title: "Measure your footprint, then act on it.",
    line: "Estimate your emissions on cited factors and support verified projects — with the same transparency institutions get.",
    href: "/solutions/public",
    photo: photos.seedling,
    alt: "Seedling held in hands",
  },
];

export function ForWhom() {
  return (
    <section className="bg-pran-paper py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <h2 className="max-w-[20ch] font-display text-display-l font-semibold tracking-[-0.03em] text-pran-ink">
            Every side of the carbon economy.
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-10 sm:gap-12">
          {audiences.map((a, i) => (
            <Reveal key={a.kicker} delay={0.05}>
              <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <Link
                  href={a.href}
                  className={`group relative block aspect-[16/11] overflow-hidden rounded-panel shadow-float ${
                    i % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={a.photo}
                    alt={a.alt}
                    fill
                    sizes="(max-width:1024px) 100vw, 600px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <div>
                  <p className="font-display text-[13px] font-semibold tracking-[0.02em] text-pran-emerald">
                    {a.no} · {a.kicker}
                  </p>
                  <h3 className="mt-2.5 max-w-[18ch] font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.02em] text-pran-ink">
                    {a.title}
                  </h3>
                  <p className="mt-3.5 max-w-[42ch] text-base leading-relaxed text-pran-muted">
                    {a.line}
                  </p>
                  <Link
                    href={a.href}
                    className="group mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium text-pran-emerald"
                  >
                    For {a.kicker.toLowerCase()}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
