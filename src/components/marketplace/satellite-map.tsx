import type { ReactNode } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { buildMapGrid } from "@/lib/satellite-map";
import { cn } from "@/lib/utils";

/**
 * Real satellite-imagery map — no mapping library, no API key. Tiles the
 * public ArcGIS World Imagery XYZ service (the same basemap the old
 * pranglobal.com project pages used) into a fixed canvas, crops it with plain
 * CSS, and drops a pin at the projected lat/lng.
 *
 * `precision` is load-bearing: "project" means a registry published these
 * exact coordinates; "country" means we only know the country and the pin is
 * an approximate country reference point. The caption says so either way, so
 * the map never implies precision we don't have.
 */
export function SatelliteMap({
  lat,
  lng,
  zoom = 5,
  precision = "project",
  label,
  sublabel,
  className,
  cols = 5,
  rows = 4,
  priority = false,
  children,
}: {
  lat: number;
  lng: number;
  zoom?: number;
  precision?: "project" | "country";
  label?: string;
  sublabel?: string;
  className?: string;
  cols?: number;
  rows?: number;
  /** Load tiles eagerly — set for the above-the-fold hero map. */
  priority?: boolean;
  /** Overlay content, for the full-bleed hero variant. */
  children?: ReactNode;
}) {
  const grid = buildMapGrid(lat, lng, zoom, cols, rows);
  const isCountry = precision === "country";

  return (
    <div className={cn("relative overflow-hidden bg-pran-forest-deep", className)}>
      {/* Tile canvas, centred on the point */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: grid.canvasWidth, height: grid.canvasHeight }}
      >
        {grid.tiles.map((t) => (
          <Image
            key={`${t.z}-${t.x}-${t.y}`}
            src={t.url}
            alt=""
            width={256}
            height={256}
            unoptimized
            loading={priority ? "eager" : "lazy"}
            className="absolute select-none"
            style={{ left: t.left, top: t.top }}
          />
        ))}

        {/* Pin. Country-level gets a soft halo instead of a sharp point, so it
            reads as a region rather than an exact site. */}
        <div
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ left: grid.markerX, top: grid.markerY }}
        >
          {isCountry && (
            <span className="absolute left-1/2 top-full h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pran-emerald/25 blur-md" />
          )}
          <MapPin
            className="relative h-9 w-9 text-pran-lime drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]"
            fill="#16a34a"
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Readability scrim for whatever sits on top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pran-forest-deep/92 via-pran-forest-deep/35 to-pran-forest-deep/45"
      />

      {children ? (
        <div className="relative z-10">{children}</div>
      ) : (
        label && (
          <div className="absolute bottom-3 left-3 right-3 rounded-btn bg-white/95 px-3 py-2 shadow-card">
            <p className="truncate text-sm font-semibold text-pran-ink">{label}</p>
            {sublabel && (
              <p className="truncate text-xs text-pran-muted">{sublabel}</p>
            )}
          </div>
        )
      )}
    </div>
  );
}

/** The one-line honesty caption that must accompany every map. */
export function MapPrecisionNote({
  precision,
  country,
  className,
}: {
  precision: "project" | "country";
  country: string;
  className?: string;
}) {
  return (
    <p className={cn("text-xs leading-relaxed", className)}>
      {precision === "project"
        ? "Coordinates as published by the project's registry."
        : `Approximate country-level location (${country}) — precise site coordinates are not published by this registry and are shared on request.`}
    </p>
  );
}
