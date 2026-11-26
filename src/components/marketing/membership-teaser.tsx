import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MemberCard } from "@/components/membership/member-card";
import { Reveal } from "@/components/marketing/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Homepage door to the private membership. Sits straight after the hero so a
 * visitor arriving from an invitation finds it without scrolling past the
 * B2B story. Deliberately short: it shows, the /membership page does the rest.
 */
export function MembershipTeaser() {
  return (
    <section className="relative overflow-hidden bg-pran-forest-deep py-20 text-white sm:py-28">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(50%_60%_at_85%_40%,rgba(22,163,74,0.22),transparent_70%)]"
      />
      <div className="relative mx-auto grid max-w-content items-center gap-14 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-pran-lime">
            PRAN Membership
          </p>
          <h2 className="mt-5 max-w-[14ch] font-display text-display-l font-semibold text-white">
            Own your impact.
          </h2>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-white/75">
            A private climate membership for those who believe responsibility
            grows with success.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Link
              href="/membership"
              className={cn(buttonVariants({ size: "lg" }), "group")}
            >
              Explore membership
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <span className="text-sm text-white/55">By invitation</span>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex justify-center lg:justify-end">
          <MemberCard className="rotate-[-3deg]" />
        </Reveal>
      </div>
    </section>
  );
}
