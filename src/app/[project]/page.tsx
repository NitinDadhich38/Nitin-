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
  MapPin,
  Target,
} from "lucide-react";
import { TermsNote } from "@/components/shared/terms-note";
import { getProjectByCode, getProjects } from "@/lib/marketplace-data";
import { countryFlag } from "@/lib/sectors";
import { getProjectDetails } from "@/lib/project-details";
import { sdgIconUrl, sdgName } from "@/lib/sdg";
import {
  SatelliteMap,
  MapPrecisionNote,
} from "@/components/marketplace/satellite-map";
import {
  ProjectTeaser,
  priceLabel,
  volumeLabel,
  deliveryLabel,
} from "@/components/marketing/project-teaser";
import { StickyBuyBar } from "@/components/marketplace/sticky-buy-bar";
import { EscrowCalculator } from "@/components/marketplace/escrow-calculator";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Project detail at /PRAN-## — the public reference code is the URL.
 *
 * Layout follows the live pranglobal.com project page: a full-bleed satellite
 * map of the project's location as the hero (title + badges overlaid), then
 * photography, description, highlights, key metrics, registry verification,
 * SDGs, and the purchase CTA.
 *
 * Everything shown is real: the portfolio record, the project's own published
 * page, and the issuing registry's public API (see lib/project-details.ts).
 * Fields no source supplies are omitted rather than invented, and the map
 * says plainly when it is showing a country-level location rather than exact
 * project coordinates (CLAUDE.md: no fabricated projects or facts).
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

  /* Everything real we hold on this project, merged from the portfolio, the
     project's published page, and the issuing registry's API. */
  const details = getProjectDetails(project);

  const buyHref = `/contact?interest=purchase&project=${encodeURIComponent(
    project.name,
  )}`;
  const volume = volumeLabel(project.totalVolume);

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
    { label: "Project type", value: details.projectType ?? project.sector },
    { label: "Technology", value: project.rawTech },
    ...(details.methodology ? [{ label: "Methodology", value: details.methodology }] : []),
    ...(details.creditingPeriod
      ? [{ label: "Crediting period", value: details.creditingPeriod }]
      : []),
    ...(details.estimatedAnnualCredits
      ? [
          {
            label: "Est. annual credits",
            value: `${details.estimatedAnnualCredits.toLocaleString("en-US")} tCO₂e`,
          },
        ]
      : []),
    { label: "Project owner", value: details.developer ?? "On request" },
    { label: "Delivery", value: deliveryLabel(project) ?? "On request" },
  ];

  /**
   * The six fields the "at a glance" strip shows, in decision order: what it
   * costs, how much there is, which year, who stands behind it, what it does,
   * and when it settles. Drawn from `metrics` by label so the two can never
   * disagree — if a label is renamed above, it drops out here rather than
   * silently rendering a stale duplicate.
   */
  const GLANCE_FIELDS = [
    "Price",
    "Available volume",
    "Vintage",
    "Standard",
    "Project type",
    "Delivery",
  ];
  const glance = GLANCE_FIELDS.map((label) =>
    metrics.find((m) => m.label === label),
  ).filter((m): m is { label: string; value: string } => Boolean(m));

  /**
   * Verification block. Only rows the merged record genuinely carries — a
   * project with no published methodology shows five rows, not six with a
   * dash. Padding an assurance panel with blanks is worse than a short one.
   */
  const verification: { label: string; value: string }[] = [
    { label: "Issuing registry", value: project.registry },
    { label: "Registry project ID", value: project.id },
    { label: "Standard", value: project.standardCode },
    ...(details.methodology
      ? [{ label: "Methodology", value: details.methodology }]
      : []),
    ...(details.creditingPeriod
      ? [{ label: "Crediting period", value: details.creditingPeriod }]
      : []),
    ...(details.estimatedAnnualCredits
      ? [
          {
            label: "Est. annual credits",
            value: `${details.estimatedAnnualCredits.toLocaleString("en-US")} tCO₂e`,
          },
        ]
      : []),
    ...(details.developer
      ? [{ label: "Project developer", value: details.developer }]
      : []),
    { label: "PRAN reference", value: project.pranCode },
  ];

  const all = getProjects();
  const related = [
    ...all.filter((p) => p.id !== project.id && p.sector === project.sector),
    ...all.filter((p) => p.id !== project.id && p.sector !== project.sector),
  ].slice(0, 3);

  /* Hero overlay — identical whether the backdrop is the map or a photo. */
  const heroOverlay = (
    <div className="mx-auto flex min-h-[clamp(360px,52vh,540px)] max-w-content flex-col justify-between px-6 pb-10 pt-6">
      <Link
        href="/marketplace"
        className="inline-flex w-fit items-center gap-1.5 rounded-btn bg-black/30 px-3 py-1.5 text-sm font-medium text-white/85 backdrop-blur-sm transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Back to marketplace
      </Link>

      <div className="mt-10">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/40 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-white/90 backdrop-blur-sm">
            <ShieldCheck className="h-3 w-3" /> {project.registry}
          </span>
          <span className="rounded-lg bg-black/40 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-white/90 backdrop-blur-sm">
            <span aria-hidden>{countryFlag(project.country)}</span>{" "}
            {project.country}
          </span>
          <span className="rounded-lg bg-black/40 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-white/90 backdrop-blur-sm">
            Vintage {project.vintageLabel}
          </span>
          <span className="rounded-lg bg-black/40 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-white/90 backdrop-blur-sm">
            {project.pranCode}
          </span>
        </div>

        <h1 className="max-w-[22ch] font-display text-display-l font-semibold tracking-[-0.03em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
          {project.name}
        </h1>

        {details.location && (
          <div className="mt-4 flex items-start gap-2 text-white/75">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-pran-lime" />
            <MapPrecisionNote
              precision={details.location.precision}
              country={project.country}
              className="max-w-[64ch] text-white/75"
            />
          </div>
        )}
      </div>
    </div>
  );

  /* Map hero when we can place the project at all; otherwise fall back to
     the sector photograph rather than showing an empty frame. */
  const heroContent = details.location ? (
    <section className="relative">
      <SatelliteMap
        lat={details.location.lat}
        lng={details.location.lng}
        zoom={details.location.zoom}
        precision={details.location.precision}
        cols={6}
        rows={4}
        priority
        className="w-full"
      >
        {heroOverlay}
      </SatelliteMap>
    </section>
  ) : (
    <section className="relative overflow-hidden bg-pran-forest text-white">
      <Image
        src={details.image}
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
      <div className="relative z-10">{heroOverlay}</div>
    </section>
  );

  return (
    <div className="bg-pran-paper">
      {/* HERO — the project's location, full-bleed, title overlaid.
          Every project gets one: exact registry coordinates where they're
          published, otherwise an explicitly country-level view. */}
      {heroContent}

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

      {/* Project photography — only when it's the project's own. */}
      {details.gallery.length > 0 && (
        <section className="border-b border-pran-hairline bg-pran-paper-warm py-10">
          <div className="mx-auto max-w-content px-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {details.gallery.slice(0, 4).map((g, i) => (
                <div
                  key={g}
                  className={cn(
                    "relative overflow-hidden rounded-card bg-pran-surface shadow-card",
                    i === 0
                      ? "col-span-2 row-span-2 aspect-[16/10]"
                      : "aspect-[4/3]",
                  )}
                >
                  <Image
                    src={g}
                    alt={`${project.name} — project photograph`}
                    fill
                    sizes="(max-width:640px) 50vw, 300px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-pran-muted">
              Project photography as published on the project&rsquo;s registry
              listing.
            </p>
          </div>
        </section>
      )}

      {/* ── At a glance ─────────────────────────────────────────────────────
          The six facts a buyer decides on, directly under the hero.

          Why this exists: the full 13-field record lives in the sticky sidebar,
          which on desktop sits beside the prose and on MOBILE falls below all
          of it — so the price, volume and vintage were the last things a phone
          visitor reached. This strip front-loads them without duplicating the
          record; the sidebar remains the complete, authoritative list. */}
      <section className="border-b border-pran-hairline bg-pran-surface">
        <dl className="mx-auto grid max-w-content grid-cols-2 gap-x-6 gap-y-7 px-6 py-8 sm:grid-cols-3 lg:grid-cols-6 lg:py-9">
          {glance.map((m) => (
            <div key={m.label}>
              <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-pran-muted">
                {m.label}
              </dt>
              <dd className="mt-1.5 font-display text-[15px] font-semibold leading-snug text-pran-ink">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Description + highlights */}
      <section className="mx-auto max-w-content px-6 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
          <div>
            <h2 className="font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
              About this project
            </h2>
            {details.description.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="mt-4 text-lg leading-relaxed text-pran-muted first:mt-4"
              >
                {para}
              </p>
            ))}
            {details.descriptionSource === "registry" && (
              <p className="mt-3 text-xs text-pran-muted">
                Description as published by the project&rsquo;s registry.
              </p>
            )}

            <h3 className="mt-10 font-display text-h3 font-semibold text-pran-ink">
              Key highlights
            </h3>
            <ul className="mt-4 space-y-2.5">
              {details.highlights.map((h) => (
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

            {/* ── Verification & standard ──────────────────────────────────
                Fills the space the escrow steps and the long disclaimer used
                to occupy (both removed 2026-08-09). Modelled on Carbonmark's
                "Assessment" block — the questions a buyer asks after price:
                who issued it, under what standard, on what methodology, over
                what period. Every row renders only when the merged record
                actually carries it, so nothing is padded with "—". */}
            <div className="mt-12">
              <h2 className="font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
                Verification &amp; standard
              </h2>
              <p className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-pran-muted">
                What sits behind this listing, and where to check it. PRAN
                records these from the registry — it does not assess or verify
                projects itself.
              </p>

              <dl className="mt-7 grid gap-px overflow-hidden rounded-panel bg-pran-hairline sm:grid-cols-2">
                {verification.map((v) => (
                  <div key={v.label} className="bg-pran-surface p-5">
                    <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-pran-muted">
                      {v.label}
                    </dt>
                    <dd className="mt-1.5 text-[15px] font-medium leading-snug text-pran-ink">
                      {v.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {details.sources.length > 0 && (
                <p className="mt-4 text-[12.5px] leading-relaxed text-pran-muted">
                  Sourced from {details.sources.join(" and ")}.
                </p>
              )}
            </div>

            <div className="mt-10 border-t border-pran-hairline pt-5">
              <TermsNote>
                Credits are transferred by the seller into your own registry
                account. PRAN facilitates and verifies the transfer and issues a
                certificate stating that credits were{" "}
                <strong>purchased and retired</strong> on your behalf — it does
                not issue, create, or verify credits.
                {details.sources.length > 0
                  ? ` Project details on this page are sourced from ${details.sources.join(" and ")}.`
                  : " Imagery is representative; project photography is added at onboarding."}
              </TermsNote>
            </div>
          </div>

          {/* Sticky metrics + registry panel */}
          <aside>
            <div className="sticky top-24 space-y-6">
              <EscrowCalculator
                projectName={project.name}
                pranCode={project.pranCode}
                priceUsd={project.priceUsd}
                maxAvailable={project.totalVolume}
              />

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
                {details.registryUrl && (
                  <a
                    href={details.registryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-pran-emerald hover:underline"
                  >
                    View on the registry
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                )}
                <p className="mt-3 text-xs leading-relaxed text-pran-muted">
                  Registry documentation is released to verified buyers through
                  PRAN.
                </p>
              </div>

              {/* Sustainable Development Goals — real mapping only. */}
              {details.sdgGoals.length > 0 && (
                <div className="rounded-panel bg-pran-surface p-6 shadow-card">
                  <h3 className="flex items-center gap-2 font-display text-h3 font-semibold text-pran-ink">
                    <Target className="h-4 w-4 text-pran-emerald" />
                    Sustainable Development Goals
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-pran-muted">
                    Goals this project reports progress against, as published
                    on its registry listing.
                  </p>
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {details.sdgGoals.map((goal) => (
                      <div
                        key={goal}
                        title={`SDG ${goal} — ${sdgName(goal)}`}
                        className="relative aspect-square overflow-hidden rounded-btn"
                      >
                        <Image
                          src={sdgIconUrl(goal)}
                          alt={`SDG ${goal} — ${sdgName(goal)}`}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project statistics — real stat bars from the registry page. */}
              {details.stats.length > 0 && (
                <div className="rounded-panel bg-pran-surface p-6 shadow-card">
                  <h3 className="font-display text-h3 font-semibold text-pran-ink">
                    Project statistics
                  </h3>
                  <dl className="mt-5 space-y-4">
                    {details.stats.map((s) => (
                      <div key={s.label}>
                        <div className="flex items-baseline justify-between gap-3 text-sm">
                          <dt className="text-pran-muted">{s.label}</dt>
                          <dd className="font-medium tabular-nums text-pran-ink">
                            {s.value}
                          </dd>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-pran-paper-warm">
                          <div
                            className="h-full rounded-full bg-pran-emerald"
                            style={{ width: `${Math.min(100, s.pct)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
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
