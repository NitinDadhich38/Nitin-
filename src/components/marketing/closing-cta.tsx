"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ClosingCta() {
  return (
    <section className="bg-pran-forest py-24 text-center text-white sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-pran-lime">
            Get started
          </p>
          <h2 className="mx-auto mt-4 max-w-[20ch] font-display text-display-l font-semibold tracking-[-0.03em] text-white">
            Ready to connect to the carbon market?
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-lg leading-relaxed text-white/70">
            Explore verified projects, or talk to us about sourcing, reporting,
            and settlement built for your organisation.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/marketplace"
              className={cn(buttonVariants({ size: "lg" }), "group")}
            >
              Explore Marketplace
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/40 text-white hover:border-white/70",
              )}
            >
              Talk to our team
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
