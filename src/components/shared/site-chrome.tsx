"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/shared/site-header";
import { SiteFooter } from "@/components/shared/site-footer";

/** Paths that render without the public site header/footer. */
const CHROME_FREE = ["/admin", "/style-guide"];

/**
 * Wraps public pages with the global header + footer, and skips them for
 * chrome-free areas (admin, internal style guide). Content is offset by the
 * fixed header height; full-bleed heroes can undo this with a negative margin.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hide = CHROME_FREE.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (hide) return <>{children}</>;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1 pt-16">{children}</div>
      <SiteFooter />
    </div>
  );
}
