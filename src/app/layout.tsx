import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fraunces, Inter } from "next/font/google";
import { SiteChrome } from "@/components/shared/site-chrome";
import "./globals.css";

// Display / headline face. Space Grotesk was replaced 2026-08-09 — the
// founder read it as generic ("purely AI"), and it is genuinely the most
// over-used face on AI-generated startup sites. Fraunces is a variable
// editorial serif: warm, high-contrast, and it belongs to the paper/forest
// palette in a way a geometric sans never did. Self-hosted at build, no CDN.
// TO SWAP: change the import and this one call — everything downstream reads
// --font-display via tailwind.config.ts, so no other file needs touching.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Body + UI + data face — Inter, tabular figures for tables/prices.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Monospace kept for the occasional code/label micro-type.
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "PRAN — Carbon Market Infrastructure",
    template: "%s · PRAN",
  },
  description:
    "PRAN is the financial infrastructure layer for the carbon market — a verified carbon-credit marketplace, footprint calculators, and carbon intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${fraunces.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
