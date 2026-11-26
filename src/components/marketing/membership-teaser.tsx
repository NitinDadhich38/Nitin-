import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArchPhoto } from "@/components/membership/arch-photo";
import { Reveal } from "@/components/marketing/reveal";
import { pageImages } from "@/lib/images";

/**
 * Homepage door to the private membership, straight after the hero so a
 * visitor arriving from an invitation finds it without scrolling past the B2B
 * story. A photograph and a few words; /membership does the rest.
 */
export function MembershipTeaser() {
  return (
    <section className="bg-pran-cream py-20 sm:py-28">
      <div className="mx-auto grid max-w-content items-center gap-12 px-6 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <Reveal className="mx-auto w-full max-w-[360px] md:max-w-none">
          <ArchPhoto
            src={pageImages.resourcesBlog}
            alt="Sunlight through a forest"
            className="aspect-[4/5] w-full"
            sizes="(max-width:768px) 80vw, 440px"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-pran-forest/70">
            PRAN Membership
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-pran-forest">
            Own your impact.
          </h2>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-pran-forest/80">
            A private climate membership for those who believe responsibility
            grows with success.
          </p>
          <Link
            href="/membership"
            className="group mt-9 inline-flex items-center gap-2 border-b border-pran-forest pb-1 text-[15px] font-medium text-pran-forest"
          >
            Enter the membership
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-6 text-sm text-pran-forest/55">By invitation</p>
        </Reveal>
      </div>
    </section>
  );
}
