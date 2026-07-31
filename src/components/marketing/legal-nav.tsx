"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { legalLinks } from "@/lib/nav";
import { cn } from "@/lib/utils";

/** Cross-navigation between the three legal documents. */
export function LegalNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Legal documents">
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-pran-muted">
        Legal
      </p>
      <ul className="mt-4 space-y-1">
        {legalLinks.map((l) => {
          const active = pathname === l.href || pathname === `${l.href}/`;
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block border-l-2 py-1.5 pl-3 text-sm transition-colors",
                  active
                    ? "border-pran-emerald font-medium text-pran-ink"
                    : "border-pran-hairline text-pran-muted hover:border-pran-emerald/50 hover:text-pran-ink",
                )}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 border-t border-pran-hairline pt-4 text-xs leading-relaxed text-pran-muted">
        These documents are drafts prepared for legal review and are not yet
        binding.
      </p>
    </nav>
  );
}
