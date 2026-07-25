import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section } from "@/components/marketing/page-kit";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Press & Newsroom",
  description: "PRAN press resources and media enquiries.",
};

export default function PressPage() {
  return (
    <>
      <PageHeader
        eyebrow="Press & Newsroom"
        title="Media & press."
        subtitle="Coverage, announcements, and brand resources will appear here."
      />
      <Section>
        <div className="rounded-card border border-dashed border-pran-border bg-white p-12 text-center">
          <p className="text-pran-text">No press releases yet — we&rsquo;re just getting started.</p>
          <p className="mt-2 text-sm text-pran-muted">
            For media enquiries, reach the team directly.
          </p>
          <Link href="/contact" className={buttonVariants({ className: "mt-6" })}>
            Media enquiry
          </Link>
        </div>
      </Section>
    </>
  );
}
