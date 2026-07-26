"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * D4 — sticky buy bar. Appears once the hero card scrolls out of view so the
 * price and the primary action are never more than a glance away.
 */
export function StickyBuyBar({
  name,
  price,
  volume,
  href,
}: {
  name: string;
  price: string;
  volume: string | null;
  href: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-pran-hairline bg-pran-surface/95 backdrop-blur transition-transform duration-300",
        show ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-6 py-3.5">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-pran-ink">{name}</p>
          <p className="text-xs tabular-nums text-pran-muted">
            {price}
            {volume && <span> · {volume} tCO₂e</span>}
          </p>
        </div>
        <Link
          href={href}
          className={cn(buttonVariants({ size: "sm" }), "group shrink-0")}
        >
          Request to Buy
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
