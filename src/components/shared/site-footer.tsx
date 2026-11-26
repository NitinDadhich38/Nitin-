import Link from "next/link";
import { Lock, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { LinkedInIcon, WhatsAppIcon } from "@/components/shared/icons";
import { footerColumns, legalLinks } from "@/lib/nav";
import { pranSocial, whatsappLink } from "@/lib/config";

/** Global footer — Trust mode (navy + gold). Full sitemap + legal row. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-pran-navy text-white">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
          <div>
            <Link
              href="/"
              aria-label="PRAN home"
              className="inline-block transition-opacity hover:opacity-85"
            >
              <Logo className="h-9 text-white" />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/70">
              The financial infrastructure layer for the carbon market:
              verified credits, footprint intelligence, and transparent markets.
            </p>

            {/* PRAN's channels */}
            <div className="mt-6 flex items-center gap-2.5">
              <a
                href={`mailto:${pranSocial.email}`}
                aria-label="Email PRAN"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-200 ease-apple hover:border-white/40 hover:bg-white/10 hover:text-white active:scale-95"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="tel:+917296815012"
                aria-label="Call PRAN desk (+91 72968 15012)"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-200 ease-apple hover:border-white/40 hover:bg-white/10 hover:text-white active:scale-95"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={pranSocial.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PRAN on LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-200 ease-apple hover:border-white/40 hover:bg-white/10 hover:text-white active:scale-95"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message PRAN on WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-200 ease-apple hover:border-white/40 hover:bg-white/10 hover:text-white active:scale-95"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.07em] text-white/50">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                      {link.locked && (
                        <Lock
                          className="h-3 w-3 shrink-0 text-white/40"
                          strokeWidth={2}
                          aria-label="Premium service — talk to us"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          {/* Legal-sensitive framing — lawyer review pending (Rules.md §29). */}
          <p className="max-w-3xl text-xs leading-relaxed text-white/50">
            PRAN is a technology platform and facilitator. It is not an
            accredited verifier, auditor, broker-dealer, or financial advisor,
            and does not issue carbon credits. Verification is performed by
            registries and independent bodies.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/50">
              © {year} PRAN. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
