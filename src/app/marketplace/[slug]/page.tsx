import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ShieldCheck, FileText } from "lucide-react";
import { getProject, getProjects } from "@/lib/marketplace-data";
import { countryFlag } from "@/lib/sectors";
import { photoForSector } from "@/lib/images";
import {
  ProjectTeaser,
  priceLabel,
  volumeLabel,
  deliveryLabel,
} from "@/components/marketing/project-teaser";
import { StickyBuyBar } from "@/components/marketplace/sticky-buy-bar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project not found" };
  return { title: project.name, description: project.description };
}

const escrowSteps = [
  "You submit a purchase request with your registry account details.",
  "PRAN confirms availability and sends a payment instruction.",
  "You pay into PRAN's escrow; the seller transfers credits to your registry account.",
  "PRAN verifies the transfer and issues your retirement certificate.",
];

const documents = [
  "Registry certificate",
  "Methodology summary",
  "Verification report",
];

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const photo = photoForSector(project.sector);
  const buyHref = `/contact?interest=purchase&project=${encodeURIComponent(project.name)}`;
  const volume = volumeLabel(project.totalVolume);

  const specs: { label: string; value: React.ReactNode }[] = [
    { label: "Registry", value: project.registry },
    { label: "Project type", value: project.sector },
    {
      label: "Country",
      value: (
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden>{countryFlag(project.country)}</span>
          {project.country}
        </span>
      ),
    },
    { label: "Vintage", value: project.vintageLabel },
    {
      label: "Volume",
      value: project.totalVolume
        ? `${project.totalVolume.toLocaleString("en-US")} tCO₂e`
        : "On request",
    },
    { label: "Developer", value: project.developer ?? "—" },
    { label: "Reference", value: project.id },
  ];

  const all = getProjects();
  const related = [
    ...all.filter((p) => p.id !== project.id && p.sector === project.sector),
    ...all.filter((p) => p.id !== project.id && p.sector !== project.sector),
  ].slice(0, 3);

  return (
    <div className="bg-pran-paper">
      {/* S1 — full-bleed photo with an overlapping card */}
      <section className="relative">
        <div className="relative h-[52vh] min-h-[360px] w-full overflow-hidden bg-pran-forest">
          <Image src={photo} alt="" fill priority sizes="100vw" className="object-cover" />
          <div aria-hidden className="photo-overlay absolute inset-0" />
          <div className="absolute inset-x-0 top-0">
            <div className="mx-auto max-w-content px-6 pt-6">
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" /> Back to marketplace
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-content px-6">
          <div className="relative -mt-28 rounded-panel bg-pran-surface p-7 shadow-float sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="min-w-0">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-pran-emerald/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-pran-emerald-hover">
                    <ShieldCheck className="h-3 w-3" /> {project.registry}
                  </span>
                  <span className="rounded-lg bg-pran-paper-warm px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-pran-muted">
                    {project.country}
                  </span>
                  <span className="rounded-lg bg-pran-paper-warm px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-pran-muted">
                    Vintage {project.vintageLabel}
                  </span>
                </div>
                <h1 className="mt-4 max-w-[22ch] font-display text-display-l font-semibold text-pran-ink">
                  {project.name}
                </h1>
                {project.developer && (
                  <p className="mt-2 text-pran-muted">Developed by {project.developer}</p>
                )}
              </div>

              <div className="shrink-0">
                <div className="text-xs font-medium uppercase tracking-[0.08em] text-pran-muted">
                  Indicative price
                </div>
                <div className="mt-1 font-display text-3xl font-semibold tabular-nums text-pran-ink">
                  {priceLabel(project)}
                  {project.priceUsd != null && (
                    <span className="ml-1 text-base font-normal text-pran-muted">
                      / tCO₂e
                    </span>
                  )}
                </div>
                <Link
                  href={buyHref}
                  className={cn(buttonVariants({ size: "lg" }), "group mt-4 w-full")}
                >
                  Request to Buy
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* D1 — trust ribbon: the buyer's first questions, answered up front */}
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-pran-hairline pt-6 sm:grid-cols-4">
              {[
                { label: "Registry ID", value: project.id },
                { label: "Standard", value: project.registry },
                {
                  label: "Volume",
                  value: volume ? `${volume} tCO₂e` : "On request",
                },
                { label: "Delivery", value: deliveryLabel(project) ?? "On request" },
              ].map((r) => (
                <div key={r.label}>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-pran-muted">
                    {r.label}
                  </dt>
                  <dd className="mt-1.5 font-medium tabular-nums text-pran-ink">
                    {r.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* S2 — two-column body */}
      <section className="mx-auto max-w-content px-6 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          {/* Left — narrative */}
          <div>
            <h2 className="font-display text-h2 font-semibold text-pran-ink">
              About this project
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-pran-muted">
              {project.description}
            </p>

            {/* Available tranches — how the book actually trades */}
            {project.listings.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-h2 font-semibold text-pran-ink">
                  Available volume
                </h2>
                <p className="mt-3 text-pran-muted">
                  {project.listings.length === 1
                    ? "One tranche currently offered."
                    : `${project.listings.length} tranches currently offered.`}{" "}
                  Final pricing is confirmed on request.
                </p>
                <div className="mt-5 overflow-x-auto rounded-panel bg-pran-surface shadow-card">
                  <table className="w-full min-w-[440px] text-sm">
                    <thead>
                      <tr className="border-b border-pran-hairline">
                        <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-[0.08em] text-pran-muted">
                          Vintage
                        </th>
                        <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-[0.08em] text-pran-muted">
                          Volume (tCO₂e)
                        </th>
                        <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-[0.08em] text-pran-muted">
                          Delivery
                        </th>
                        <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-[0.08em] text-pran-muted">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.listings.map((l, i) => (
                        <tr
                          key={i}
                          className="border-b border-pran-hairline last:border-b-0"
                        >
                          <td className="px-5 py-3 tabular-nums text-pran-ink">
                            {l.vintage ?? "—"}
                          </td>
                          <td className="px-5 py-3 text-right tabular-nums text-pran-ink">
                            {l.volume ? l.volume.toLocaleString("en-US") : "TBD"}
                          </td>
                          <td className="px-5 py-3 text-pran-muted">
                            {l.delivery ?? "—"}
                          </td>
                          <td className="px-5 py-3 text-right tabular-nums font-medium text-pran-ink">
                            {l.priceLabel ?? "On request"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <h2 className="mt-12 font-display text-h2 font-semibold text-pran-ink">
              How the purchase works
            </h2>
            <ol className="mt-5 space-y-4">
              {escrowSteps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pran-emerald/10 text-sm font-semibold text-pran-emerald-hover">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed text-pran-ink">{step}</span>
                </li>
              ))}
            </ol>

            <p className="mt-8 rounded-card bg-pran-paper-warm p-5 text-sm leading-relaxed text-pran-muted">
              Credits are transferred by the seller into your own registry
              account. PRAN facilitates and verifies the transfer and issues a
              retirement certificate stating that credits were{" "}
              <span className="font-medium text-pran-ink">purchased and retired</span>{" "}
              on your behalf — it does not issue or create credits. Imagery is
              representative; project photography is added at onboarding.
            </p>
          </div>

          {/* Right — sticky data + documents panel */}
          <aside>
            <div className="sticky top-24 space-y-6">
              <div className="rounded-panel bg-pran-surface p-6 shadow-card">
                <h3 className="font-display text-h3 font-semibold text-pran-ink">
                  Project details
                </h3>
                <dl className="mt-5 space-y-3">
                  {specs.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-start justify-between gap-4 border-b border-pran-hairline pb-3 text-sm last:border-b-0 last:pb-0"
                    >
                      <dt className="shrink-0 text-pran-muted">{s.label}</dt>
                      <dd className="text-right font-medium text-pran-ink">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-panel bg-pran-surface p-6 shadow-card">
                <h3 className="font-display text-h3 font-semibold text-pran-ink">
                  Documents
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {documents.map((d) => (
                    <li
                      key={d}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <span className="inline-flex items-center gap-2 text-pran-ink">
                        <FileText className="h-4 w-4 text-pran-muted" /> {d}
                      </span>
                      <span className="text-xs font-medium uppercase tracking-wide text-pran-muted">
                        On request
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact?interest=demo"
                  className={cn(buttonVariants({ variant: "secondary" }), "mt-5 w-full")}
                >
                  Talk to our team
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* S3 — related projects */}
      {related.length > 0 && (
        <section className="border-t border-pran-hairline bg-pran-paper-warm py-16 sm:py-20">
          <div className="mx-auto max-w-content px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-h2 font-semibold text-pran-ink">
                Related projects
              </h2>
              <Link
                href="/marketplace"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-pran-emerald"
              >
                View all
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectTeaser key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <StickyBuyBar
        name={project.name}
        price={priceLabel(project)}
        volume={volume}
        href={buyHref}
      />
      {/* clearance so the bar never covers the footer's last row */}
      <div aria-hidden className="h-16" />
    </div>
  );
}
