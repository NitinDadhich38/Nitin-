import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  FileText,
  Lock,
  Check,
} from "lucide-react";
import {
  getProjectByCode,
  getProjects,
  projectHref,
} from "@/lib/marketplace-data";
import { countryFlag } from "@/lib/sectors";
import { photoForSector, photos } from "@/lib/images";
import {
  ProjectTeaser,
  priceLabel,
  volumeLabel,
  deliveryLabel,
} from "@/components/marketing/project-teaser";
import { StickyBuyBar } from "@/components/marketplace/sticky-buy-bar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Project detail at /PRAN-## — the public reference code is the URL.
 *
 * Layout follows the live pranglobal.com project page: hero, description,
 * highlights, key-metrics grid, registry verification, then the purchase CTA.
 *
 * Every field on this page is read from the portfolio data. Fields the live
 * page carries that the portfolio does not supply — third-party quality
 * ratings, SDG mappings, issued/estimated mitigation totals — are omitted
 * rather than invented (CLAUDE.md: no fabricated projects or facts).
 */

export function generateStaticParams() {
  return getProjects().map((p) => ({ project: p.pranCode }));
}

export function generateMetadata({
  params,
}: {
  params: { project: string };
}): Metadata {
  const project = getProjectByCode(params.project);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} · ${project.pranCode}`,
    description: project.description,
  };
}

const escrowSteps = [
  "You submit a purchase request with your registry account details.",
  "PRAN confirms availability and sends a payment instruction.",
  "You pay into PRAN's escrow; the seller transfers credits to your registry account.",
  "PRAN verifies the transfer and issues your retirement certificate.",
];

/** Document records shown for every listing. Names only — never deep links. */
const documentRecords = [
  "Project Design Document (PDD)",
  "Validation report",
  "Verification report",
  "Registry issuance record",
];

export default function ProjectPage({
  params,
}: {
  params: { project: string };
}) {
  const project = getProjectByCode(params.project);
  if (!project) notFound();

  const photo = photoForSector(project.sector);
  const gallery = [photo, photos.greenHills, photos.leaves];
  const buyHref = `/contact?interest=purchase&project=${encodeURIComponent(
    project.name,
  )}`;
  const volume = volumeLabel(project.totalVolume);

  /* Highlights are composed strictly from portfolio fields — no new claims. */
  const highlights = [
    `${project.sector} project registered under ${project.registry}`,
    `Located in ${project.country}`,
    project.totalVolume
      ? `${project.totalVolume.toLocaleString("en-US")} tCO₂e available`
      : "Volume confirmed on request",
    `Vintage ${project.vintageLabel}`,
  ];

  /* Mirrors the live key-metrics grid, using only supplied fields. */
  const metrics: { label: string; value: string }[] = [
    { label: "Price", value: priceLabel(project) },
    {
      label: "Available volume",
      value: project.totalVolume
        ? `${project.totalVolume.toLocaleString("en-US")} tCO₂e`
        : "On request",
    },
    { label: "Vintage", value: project.vintageLabel },
    { label: "Registry asset", value: project.pranCode },
    { label: "Registry ID", value: project.id },
    { label: "Standard", value: project.standardCode },
    { label: "Project type", value: project.sector },
    { label: "Technology", value: project.rawTech },
    { label: "Project owner", value: project.developer ?? "On request" },
    { label: "Delivery", value: deliveryLabel(project) ?? "On request" },
  ];

  const all = getProjects();
  const related = [
    ...all.filter((p) => p.id !== project.id && p.sector === project.sector),
    ...all.filter((p) => p.id !== project.id && p.sector !== project.sector),
  ].slice(0, 3);

  return (
    <div className="bg-pran-paper">
      {/* Hero — title, reference line, image set */}
      <section className="relative overflow-hidden bg-pran-forest text-white">
        <Image
          src={photo}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg,rgba(5,14,9,.70) 0%,rgba(5,14,9,.90) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-content px-6 pb-14 pt-6 sm:pb-16">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to marketplace
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="max-w-[20ch] font-display text-display-l font-semibold tracking-[-0.03em] text-white">
                {project.name}
              </h1>
              <p className="mt-4 font-mono text-sm tracking-wide text-pran-lime">
                {project.pranCode} · {project.country} · {project.sector}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-white/85">
                  <ShieldCheck className="h-3 w-3" /> {project.registry}
                </span>
                <span className="rounded-lg bg-white/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-white/85">
                  <span aria-hidden>{countryFlag(project.country)}</span>{" "}
                  {project.country}
                </span>
                <span className="rounded-lg bg-white/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-white/85">
                  Vintage {project.vintageLabel}
                </span>
              </div>
            </div>

            {/* Image set */}
            <div className="grid grid-cols-3 gap-3">
              {gallery.map((g, i) => (
                <div
                  key={i}
                  className={cn(
                    "relative overflow-hidden rounded-card",
                    i === 0 ? "col-span-3 aspect-[16/9]" : "aspect-[4/3]",
                  )}
                >
                  <Image
                    src={g}
                    alt=""
                    fill
                    sizes="(max-width:1024px) 100vw, 200px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Price + buy strip */}
      <section className="border-b border-pran-hairline bg-pran-surface">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-6 px-6 py-7">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-pran-muted">
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
          </div>
          <Link
            href={buyHref}
            className={cn(buttonVariants({ size: "lg" }), "group")}
          >
            Request to Buy
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* Description + highlights */}
      <section className="mx-auto max-w-content px-6 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
          <div>
            <h2 className="font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
              About this project
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-pran-muted">
              {project.description}
            </p>

            <h3 className="mt-10 font-display text-h3 font-semibold text-pran-ink">
              Key highlights
            </h3>
            <ul className="mt-4 space-y-2.5">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-pran-emerald" />
                  <span className="leading-relaxed text-pran-ink">{h}</span>
                </li>
              ))}
            </ul>

            {/* Available tranches */}
            {project.listings.length > 0 && (
              <div className="mt-12">
                <h3 className="font-display text-h3 font-semibold text-pran-ink">
                  Available volume
                </h3>
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
                        {["Vintage", "Volume (tCO₂e)", "Delivery", "Price"].map(
                          (h, i) => (
                            <th
                              key={h}
                              className={cn(
                                "px-5 py-3 text-[11px] font-medium uppercase tracking-[0.08em] text-pran-muted",
                                i === 1 || i === 3
                                  ? "text-right"
                                  : "text-left",
                              )}
                            >
                              {h}
                            </th>
                          ),
                        )}
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
                          <td className="px-5 py-3 text-right font-medium tabular-nums text-pran-ink">
                            {l.priceLabel ?? "On request"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <h3 className="mt-12 font-display text-h3 font-semibold text-pran-ink">
              How the purchase works
            </h3>
            <ol className="mt-5 space-y-4">
              {escrowSteps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pran-emerald/10 text-sm font-semibold text-pran-emerald-hover">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed text-pran-ink">
                    {step}
                  </span>
                </li>
              ))}
            </ol>

            <p className="mt-8 rounded-card bg-pran-paper-warm p-5 text-sm leading-relaxed text-pran-muted">
              Credits are transferred by the seller into your own registry
              account. PRAN facilitates and verifies the transfer and issues a
              certificate stating that credits were{" "}
              <span className="font-medium text-pran-ink">
                purchased and retired
              </span>{" "}
              on your behalf — it does not issue, create, or verify credits.
              Imagery is representative; project photography is added at
              onboarding.
            </p>
          </div>

          {/* Sticky metrics + registry panel */}
          <aside>
            <div className="sticky top-24 space-y-6">
              <div className="rounded-panel bg-pran-surface p-6 shadow-card">
                <h3 className="font-display text-h3 font-semibold text-pran-ink">
                  Key metrics
                </h3>
                <dl className="mt-5 space-y-3">
                  {metrics.map((m) => (
                    <div
                      key={m.label}
                      className="flex items-start justify-between gap-4 border-b border-pran-hairline pb-3 text-sm last:border-b-0 last:pb-0"
                    >
                      <dt className="shrink-0 text-pran-muted">{m.label}</dt>
                      <dd className="text-right font-medium text-pran-ink">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Registry verification — records, never outbound project links */}
              <div className="rounded-panel bg-pran-surface p-6 shadow-card">
                <h3 className="font-display text-h3 font-semibold text-pran-ink">
                  Registry verification
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-pran-muted">
                  This project is registered with{" "}
                  <span className="font-medium text-pran-ink">
                    {project.registry}
                  </span>{" "}
                  under {project.standardCode} as{" "}
                  <span className="font-medium tabular-nums text-pran-ink">
                    {project.id}
                  </span>
                  . Issuance and retirement are recorded on the registry, not by
                  PRAN.
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-pran-hairline pt-5">
                  {documentRecords.map((d) => (
                    <li
                      key={d}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <span className="inline-flex items-center gap-2 text-pran-ink">
                        <FileText className="h-4 w-4 shrink-0 text-pran-muted" />
                        {d}
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-pran-muted">
                        <Lock className="h-3 w-3" />
                        On request
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/contact?interest=demo&project=${encodeURIComponent(
                    `${project.pranCode} — ${project.name} (project documents)`,
                  )}`}
                  className={cn(
                    buttonVariants({ variant: "secondary" }),
                    "mt-5 w-full",
                  )}
                >
                  Request project documents
                </Link>
                <p className="mt-3 text-xs leading-relaxed text-pran-muted">
                  Registry documentation is released to verified buyers through
                  PRAN.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-pran-hairline bg-pran-paper-warm py-16 sm:py-20">
          <div className="mx-auto max-w-content px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
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
      <div aria-hidden className="h-16" />
    </div>
  );
}
