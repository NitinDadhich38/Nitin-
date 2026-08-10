/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /**
     * Performance pass 2026-08-09.
     *
     * `formats` — Next serves WebP by default; adding AVIF first lets browsers
     * that support it take a further ~20-30% off. Order matters: the first
     * entry the browser accepts is the one served.
     *
     * `minimumCacheTTL` — the default is 60 SECONDS, which means an optimised
     * variant is re-derived from source constantly. These are static brand
     * photographs that never change behind a stable URL, so a year is correct;
     * changing an image means changing its filename anyway.
     */
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      // Curated stock photography (forest / aerial / solar / farmland) used
      // as a fallback where a project has no real photo yet — see
      // src/lib/images.ts (single source of stock image URLs).
      { protocol: "https", hostname: "images.unsplash.com" },
      // Real project photography + registry logos, hotlinked from the
      // live pranglobal.com project pages — see src/lib/live-project-media.ts.
      { protocol: "https", hostname: "www.carbonregistry.com" },
      { protocol: "https", hostname: "documentation.carbonregistry.com" },
      { protocol: "https", hostname: "d382rz2cea0pah.cloudfront.net" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "cdn.britannica.com" },
      {
        protocol: "https",
        hostname: "images-citizenmatters.sgp1.digitaloceanspaces.com",
      },
      { protocol: "https", hostname: "5.imimg.com" },
      { protocol: "https", hostname: "etimg.etb2bimg.com" },
      { protocol: "https", hostname: "media.assettype.com" },
      // NOTE: sdgs.un.org was removed from this list 2026-08-09 — the 17 SDG
      // icons are now self-hosted in /public/sdg. They were the single worst
      // thing on /marketplace: up to three per project across 85 projects, each
      // one putting a third-party host on the critical path. Do not re-add the
      // remote host; add icons to /public/sdg instead.
      // Satellite basemap tiles for the project-location map (no API key,
      // same imagery source the old site used) — see satellite-map.tsx.
      { protocol: "https", hostname: "server.arcgisonline.com" },
    ],
  },
};

export default nextConfig;
