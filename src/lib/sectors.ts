/**
 * Visual treatment for project sectors and countries. On-brand dark gradients
 * (teal / navy / green / ink) stand in for project photography per Design.md's
 * image policy — intentional, never a blank grey box.
 */

type Bucket = "nature" | "energy" | "other";

const SECTOR_BUCKET: Record<string, Bucket> = {
  "Afforestation & Reforestation": "nature",
  Agriculture: "nature",
  "Blue Carbon & Marine Ecosystem Restoration": "nature",
  AFOLU: "nature",
  "Renewable Energy": "energy",
  "Energy Industries": "energy",
  "Industrial Energy Efficiency": "energy",
  "Renewable Energy Certificate (REC)": "energy",
  "Waste Handling & Disposal": "other",
  "Animal Manure Management": "other",
};

const BUCKET_GRADIENT: Record<Bucket, string> = {
  nature: "bg-gradient-to-br from-pran-green to-pran-teal-dark",
  energy: "bg-gradient-to-br from-pran-teal to-pran-navy",
  other: "bg-gradient-to-br from-pran-navy to-pran-ink",
};

export function sectorGradient(sector: string): string {
  return BUCKET_GRADIENT[SECTOR_BUCKET[sector] ?? "other"];
}

const COUNTRY_FLAG: Record<string, string> = {
  Iceland: "🇮🇸",
  Italy: "🇮🇹",
  Uganda: "🇺🇬",
  Mexico: "🇲🇽",
  Paraguay: "🇵🇾",
  India: "🇮🇳",
  Singapore: "🇸🇬",
  Nepal: "🇳🇵",
};

export function countryFlag(country: string): string {
  return COUNTRY_FLAG[country] ?? "🌍";
}
