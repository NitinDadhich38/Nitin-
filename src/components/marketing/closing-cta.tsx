"use client";

import Link from "next/link";
import { Reveal } from "@/components/marketing/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ClosingCta() {
  return (
    <section className="bg-pran-navy py-28 text-center text-white sm:py-36">
      <div className="mx-auto max-w-2xl px-6">
        <Reveal>
          <p className="font-display text-h2 font-semibold leading-snug">
            At PRAN, we believe that living sustainably today sustains
            humanity tomorrow. We&rsquo;re building the infrastructure powering
            the world&rsquo;s carbon markets.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/marketplace" className={buttonVariants({ size: "lg" })}>
              Explore Marketplace
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/40 text-white hover:bg-white/10",
              )}
            >
              Request Demo
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
