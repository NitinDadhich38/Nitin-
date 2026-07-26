/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * STATIC BRANCH — the site is emitted as plain HTML/CSS/JS into `out/`,
   * deployable to any static host (no Node server). Source of truth for the
   * app itself stays on `main` / `enhancing`; this branch only changes the
   * delivery stack, never the design.
   */
  output: "export",
  trailingSlash: true, // /marketplace/ -> marketplace/index.html on plain hosts

  // Keep the dev server on :3000 (another session) from sharing this build dir.
  distDir: ".next-export",

  images: {
    // Curated real photography (forest / aerial / solar / farmland) sourced
    // from Unsplash for the v2.0 look. Swap for real project photos in /public
    // as they arrive — see src/lib/images.ts (single source of image URLs).
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    // Static export has no server to run the optimizer — images are served
    // straight from their source URLs. Visually identical.
    unoptimized: true,
  },
};

export default nextConfig;
