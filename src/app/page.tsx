import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <section className="mx-auto flex max-w-content flex-col items-center px-6 py-28 text-center sm:py-36">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-pran-muted">
        Carbon market infrastructure
      </p>
      <h1 className="mt-5 max-w-3xl font-display text-display font-semibold text-pran-text">
        The financial infrastructure for the carbon market.
      </h1>
      <p className="mt-5 max-w-xl text-lg text-pran-muted">
        A verified marketplace, footprint intelligence, and transparent markets.
        The full experience is being built — the cinematic homepage lands next.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link href="/marketplace" className={buttonVariants({ size: "lg" })}>
          Explore Marketplace
        </Link>
        <Link
          href="/contact"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          Request Demo
        </Link>
      </div>
    </section>
  );
}
