import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fraunces } from "next/font/google";
import { SiteChrome } from "@/components/shared/site-chrome";
import "./globals.css";

// Body + data/number face (Design.md §3: Geist)
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
});

// Display / statement face (Design.md §3: Fraunces, editorial serif)
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
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
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} font-sans antialiased`}
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
