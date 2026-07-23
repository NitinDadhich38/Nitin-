import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { getProject, getProjects } from "@/lib/marketplace-data";
import { sectorGradient, countryFlag } from "@/lib/sectors";
import { formatUsd } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.name,
    description: project.description,
  };
}

const escrowSteps = [
  "You submit a purchase request with your registry account details.",
  "PRAN confirms availability and sends a payment instruction.",
  "You pay into PRAN's escrow; the seller transfers credits to your registry account.",
  "PRAN verifies the transfer and issues your retirement certificate.",
];

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const details: { label: string; value: string }[] = [
    { label: "Registry", value: project.registry },
    { label: "Project type", value: project.sector },
    { label: "Country", value: `${countryFlag(project.country)}  ${project.country}` },
    { label: "Vintage", value: project.vintage },
    { label: "Developer", value: project.developer ?? "—" },
    { label: "Reference", value: project.id },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-content px-6 py-10">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-pran-muted hover:text-pran-teal"
        >
          <ArrowLeft className="h-4 w-4" /> Back to marketplace
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Main */}
          <div>
            <div className={`relative flex h-56 items-end overflow-hidden rounded-card ${sectorGradient(project.sector)}`}>
              <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-xs font-medium text-pran-navy">
                {project.registry}
              </div>
              <span className="p-6 font-mono text-xs uppercase tracking-wider text-white/80">
                {project.sector}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Badge variant="success">
                <ShieldCheck className="mr-1 h-3 w-3" /> Registry-issued
              </Badge>
              <Badge variant="neutral">{project.country}</Badge>
              <Badge variant="neutral">Vintage {project.vintage}</Badge>
            </div>

            <h1 className="mt-4 font-display text-h1 font-semibold text-pran-text">
              {project.name}
            </h1>
            {project.developer && (
              <p className="mt-2 text-pran-muted">Developed by {project.developer}</p>
            )}

            <p className="mt-6 leading-relaxed text-pran-text">{project.description}</p>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-pran-border bg-pran-border sm:grid-cols-3">
              {details.map((d) => (
                <div key={d.label} className="bg-white p-4">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-pran-muted">
                    {d.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-pran-text">{d.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 rounded-card border border-pran-border bg-pran-paper p-6">
              <h2 className="text-h3 font-semibold text-pran-text">How the purchase works</h2>
              <ol className="mt-4 space-y-3">
                {escrowSteps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-pran-text">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pran-teal/10 font-mono text-xs font-medium text-pran-teal">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Buy sidebar */}
          <aside>
            <div className="sticky top-24 rounded-card border border-pran-border p-6">
              <div className="font-mono text-[11px] uppercase tracking-wider text-pran-muted">
                Indicative price
              </div>
              <div className="mt-1 font-display text-3xl font-semibold tabular-nums text-pran-navy">
                {formatUsd(project.priceUsd)}
                {project.priceUsd !== null && (
                  <span className="ml-1 text-base font-normal text-pran-muted">/ credit</span>
                )}
              </div>

              <Link
                href={`/contact?interest=purchase&project=${encodeURIComponent(project.name)}`}
                className={cn(buttonVariants({ size: "lg" }), "mt-5 w-full")}
              >
                Request to Buy
              </Link>
              <Link
                href="/contact?interest=demo"
                className={cn(buttonVariants({ variant: "outline" }), "mt-2 w-full")}
              >
                Talk to our team
              </Link>

              <p className="mt-4 text-xs leading-relaxed text-pran-muted">
                Credits are transferred by the seller into your own registry
                account. PRAN facilitates and verifies the transfer and issues a
                retirement certificate — it does not issue credits.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
