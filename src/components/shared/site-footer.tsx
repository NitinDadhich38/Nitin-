import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { footerColumns, legalLinks } from "@/lib/nav";

/** Global footer — Trust mode (navy + gold). Full sitemap + legal row. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-pran-navy text-white">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
          <div>
            <Logo className="h-9 text-white" />
            <p className="mt-4 max-w-xs text-sm text-white/70">
              The financial infrastructure layer for the carbon market —
              verified credits, footprint intelligence, and transparent markets.
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-medium uppercase tracking-[0.08em] text-white/50">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
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
