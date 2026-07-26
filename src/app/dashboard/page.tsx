import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/marketing/page-kit";
import { DashboardBody } from "@/components/dashboard/dashboard-body";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Market Dashboard",
  description:
    "The PRAN book at a glance — supply by technology, geography and registry standard, price bands, vintage depth, and live listings.",
};

export default function DashboardPage() {
  return (
    <div className="bg-pran-paper">
      <PageHeader
        eyebrow="Market dashboard"
        title="The carbon market, on one screen."
        subtitle="Everything PRAN currently has supply against — by technology, geography, registry standard, price band and vintage. Read directly from the book, not hand-entered."
      />

      <DashboardBody />

      <section className="border-t border-pran-hairline bg-pran-paper-warm py-20">
        <div className="mx-auto flex max-w-content flex-col items-start gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-h2 font-semibold text-pran-ink">
              Looking for something specific?
            </h2>
            <p className="mt-2 max-w-[52ch] text-pran-muted">
              Filter the full book by registry, technology, geography and
              delivery — or tell us what you&rsquo;re sourcing.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/marketplace"
              className={cn(buttonVariants({ size: "lg" }), "group")}
            >
              Explore Marketplace
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
