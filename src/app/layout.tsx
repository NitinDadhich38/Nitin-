import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Grotesk, Inter } from "next/font/google";
import { SiteChrome } from "@/components/shared/site-chrome";
import "./globals.css";

// Display / headline face — tight geometric sans (5_Design.md v2.0 §2.2).
// Space Grotesk is self-hosted at build (no CDN). Swap for General Sans /
// Satoshi here if/when the founder provides the woff2 files.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
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
        className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
