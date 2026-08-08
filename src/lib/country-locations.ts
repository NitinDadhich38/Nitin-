/**
 * Country reference points, used ONLY as an explicit country-level fallback
 * on the project map when no registry has published precise coordinates for
 * a project.
 *
 * These are approximate geographic centre points for the country as a whole —
 * they are NOT project locations, and the UI must always label them as
 * country-level so no false precision is implied. Precise project
 * coordinates, where they exist, come from the registry
 * (lib/registry-data.ts) or the project's published page
 * (lib/live-project-media.ts) and always take priority.
 *
 * Zoom is chosen per country so the pin reads as "somewhere in this country"
 * rather than pointing at a specific field.
 */
export type CountryLocation = {
  lat: number;
  lng: number;
  /** Lower zoom = wider view. Large countries get a wider frame. */
  zoom: number;
};

export const countryLocations: Record<string, CountryLocation> = {
  Belize: { lat: 17.19, lng: -88.5, zoom: 7 },
  Brazil: { lat: -14.24, lng: -51.93, zoom: 4 },
  Cambodia: { lat: 12.57, lng: 104.99, zoom: 6 },
  Colombia: { lat: 4.57, lng: -74.3, zoom: 5 },
  Ghana: { lat: 7.95, lng: -1.02, zoom: 6 },
  Iceland: { lat: 64.96, lng: -19.02, zoom: 6 },
  India: { lat: 20.59, lng: 78.96, zoom: 4 },
  Israel: { lat: 31.05, lng: 34.85, zoom: 7 },
  Italy: { lat: 41.87, lng: 12.57, zoom: 5 },
  Kenya: { lat: -0.02, lng: 37.91, zoom: 6 },
  Malawi: { lat: -13.25, lng: 34.3, zoom: 6 },
  Mexico: { lat: 23.63, lng: -102.55, zoom: 5 },
  Nepal: { lat: 28.39, lng: 84.12, zoom: 6 },
  "Papua New Guinea": { lat: -6.31, lng: 143.96, zoom: 6 },
  Paraguay: { lat: -23.44, lng: -58.44, zoom: 5 },
  Rwanda: { lat: -1.94, lng: 29.87, zoom: 8 },
  Singapore: { lat: 1.35, lng: 103.82, zoom: 10 },
  Switzerland: { lat: 46.82, lng: 8.23, zoom: 7 },
  "Türkiye": { lat: 38.96, lng: 35.24, zoom: 5 },
  Turkey: { lat: 38.96, lng: 35.24, zoom: 5 },
  Uganda: { lat: 1.37, lng: 32.29, zoom: 6 },
  Zimbabwe: { lat: -19.02, lng: 29.15, zoom: 6 },
};

export type ResolvedLocation = {
  lat: number;
  lng: number;
  zoom: number;
  /** "project" = real registry coordinates; "country" = approximate fallback. */
  precision: "project" | "country";
};

/**
 * Resolve the best location we can honestly show for a project.
 * Precise coordinates win; otherwise the country reference point, clearly
 * flagged as country-level. Returns null only if the country is unknown.
 */
export function resolveLocation(
  country: string,
  lat: number | null | undefined,
  lng: number | null | undefined,
): ResolvedLocation | null {
  if (lat != null && lng != null) {
    return { lat, lng, zoom: 6, precision: "project" };
  }
  const c = countryLocations[country];
  if (!c) return null;
  return { lat: c.lat, lng: c.lng, zoom: c.zoom, precision: "country" };
}
