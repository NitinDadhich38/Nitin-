import type { Metadata } from "next";
import localFont from "next/font/local";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { SiteChrome } from "@/components/shared/site-chrome";
import "./globals.css";

// Display / headline face: Plus Jakarta Sans — crisp, authoritative, modern
// corporate geometric grotesque used by world-class enterprise & climate leaders.
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pranglobal.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PRAN: Financial Infrastructure for Carbon Markets",
    template: "%s | PRAN",
  },
  description:
    "PRAN is the institutional infrastructure layer for the global carbon market, offering verified carbon credits, footprint intelligence, and high-integrity registry settlement.",
  keywords: [
    "carbon credits",
    "carbon market infrastructure",
    "verified carbon units",
    "BRSR reporting",
    "CBAM compliance",
    "Verra",
    "Gold Standard",
    "carbon offsets",
    "I-REC",
    "climate finance",
  ],
  authors: [{ name: "PRAN Global", url: siteUrl }],
  creator: "PRAN",
  publisher: "PRAN",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "PRAN",
    title: "PRAN: Financial Infrastructure for Carbon Markets",
    description:
      "Institutional marketplace, carbon footprint intelligence, and registry settlement for verified carbon credits.",
    images: [
      {
        url: "/founder-nitin-dadhich.jpg",
        width: 1200,
        height: 630,
        alt: "PRAN Carbon Market Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PRAN: Financial Infrastructure for Carbon Markets",
    description:
      "Verified carbon credits, registry intelligence, and corporate footprint reporting.",
    images: ["/founder-nitin-dadhich.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PRAN",
  url: siteUrl,
  logo: `${siteUrl}/favicon.ico`,
  description:
    "PRAN is the financial infrastructure layer for the carbon market, providing verified carbon credit transactions, automated registry validation, and carbon footprint intelligence.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@pranapp.in",
    telephone: "+91-72968-15012",
    contactType: "Customer Support",
    areaServed: "Global",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.linkedin.com/company/pranglobal",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} ${geistMono.variable} font-sans antialiased text-pran-text bg-pran-paper min-h-screen selection:bg-emerald-500/20 selection:text-emerald-950`}
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
