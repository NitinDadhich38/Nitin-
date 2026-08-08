/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
      // UN Sustainable Development Goal icons (official, public).
      { protocol: "https", hostname: "sdgs.un.org" },
      // Satellite basemap tiles for the project-location map (no API key,
      // same imagery source the old site used) — see satellite-map.tsx.
      { protocol: "https", hostname: "server.arcgisonline.com" },
    ],
  },
};

export default nextConfig;
