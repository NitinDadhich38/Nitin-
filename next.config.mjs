/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Curated real photography (forest / aerial / solar / farmland) sourced
    // from Unsplash for the v2.0 look. Swap for real project photos in /public
    // as they arrive — see src/lib/images.ts (single source of image URLs).
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
