import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Zap } from "lucide-react";
import type { IrecEntry } from "@/lib/marketplace-data";
import { liveProjectMedia } from "@/lib/live-project-media";
import { stockImageFor } from "@/lib/project-imagery";
import { photos } from "@/lib/images";

/** Sheet technology codes → readable chip text. */
function techLabel(tech: string): string {
  const t = tech.trim().toLowerCase();
  if (t === "w/s") return "Wind + Solar";
  if (t === "whr") return "Waste Heat Recovery";
  return tech;
}

/** Prefilled purchase request for this I-REC line. */
export function irecRequestHref(entry: IrecEntry): string {
  return `/contact?interest=purchase&irec=${encodeURIComponent(
    `${entry.label} (${entry.pranCode})`,
  )}`;
}

/**
 * I-REC card — the same object as a project card so the book reads as one
 * marketplace, with the units kept deliberately different.
 *
 * Volumes are MWh and prices are per MWh. An I-REC evidences renewable
 * generation; it is not a carbon credit and is never shown in tCO2e. The
 * card links to a prefilled purchase request rather than a project page,
 * because these lines have no registry project record behind them.
 */
function unwrapImageUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.includes("/_next/image?url=")) {
    try {
      const match = url.match(/[?&]url=([^&]+)/);
      if (match?.[1]) return decodeURIComponent(match[1]);
    } catch {
      // fallback
    }
  }
  return url;
}

export function IrecCard({ entry }: { entry: IrecEntry }) {
  /* A handful of I-REC lines are real plants we hold photography and a
     description for (marketplace-data IREC_LIVE_CODES); the rest use the
     distinct stock image reserved for that code. */
  const live = liveProjectMedia[entry.pranCode];
  const image = unwrapImageUrl(live?.image ?? undefined) ?? stockImageFor(entry.pranCode) ?? photos.solar;

  const volume = entry.volumeMwh?.toLocaleString("en-US") ?? null;

  return (
    <Link
      href={irecRequestHref(entry)}
      className="group flex w-full flex-col overflow-hidden rounded-2xl border border-pran-ink/[0.07] bg-pran-surface shadow-apple-card transition-all duration-300 ease-apple hover:-translate-y-1 hover:border-pran-emerald/40 hover:shadow-apple-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pran-emerald/40"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={entry.label}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="object-cover transition-transform duration-500 ease-apple group-hover:scale-105"
        />
        {entry.delivery && (
          <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-pran-ink shadow-sm backdrop-blur-md border border-black/[0.05]">
            {entry.delivery}
          </span>
        )}
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white shadow-sm backdrop-blur-md border border-white/10">
          <MapPin className="h-3 w-3 text-emerald-400" />
          {entry.country}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          {/* The energy-attribute chip carries the emerald so an I-REC is
              never mistaken for a carbon listing at a glance. */}
          <span className="inline-flex items-center gap-1 rounded-lg bg-pran-emerald/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-pran-emerald-hover">
            <Zap className="h-3 w-3" />
            I-REC
          </span>
          <span className="rounded-lg bg-pran-paper-warm px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-pran-muted">
            {techLabel(entry.tech)}
          </span>
        </div>

        <h3 className="mt-3 line-clamp-2 font-display text-[1.0625rem] font-semibold leading-snug tracking-tight text-pran-ink">
          {entry.label}
        </h3>
        <p className="mt-1 line-clamp-1 font-mono text-[11px] text-pran-muted">
          {entry.pranCode}
        </p>

        {volume && (
          <p className="mt-2 text-sm tabular-nums text-pran-muted">
            <span className="font-medium text-pran-ink">{volume}</span> MWh
            <span className="text-pran-hairline"> · </span>
            <span>Vintage {entry.vintage}</span>
          </p>
        )}

        <div className="mt-auto pt-4">
          <div className="mb-4 h-px w-full bg-pran-hairline" />
          <div className="flex items-center justify-between gap-3">
            <span className="text-[15px] font-medium tabular-nums text-pran-ink">
              {entry.priceUsd != null
                ? `$${entry.priceUsd.toFixed(2)}`
                : "On request"}
              {entry.priceUsd != null && (
                <span className="text-sm font-normal text-pran-muted">
                  {" "}
                  / MWh
                </span>
              )}
            </span>
            <span
              aria-hidden
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pran-emerald text-white transition-colors group-hover:bg-pran-emerald-hover"
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
          <span className="mt-3 block text-[11px] font-medium uppercase tracking-[0.08em] text-pran-emerald-hover">
            Request to buy
          </span>
        </div>
      </div>
    </Link>
  );
}
