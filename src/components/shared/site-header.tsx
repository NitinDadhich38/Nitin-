"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Lock, Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { buttonVariants } from "@/components/ui/button";
import { mainNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  // The header carries its paper background and hairline from the first
  // paint, on every route including the homepage. It used to float
  // transparent over the cinematic hero, which camouflaged the logo and nav
  // against the photograph until you scrolled (founder feedback 2026-08-09).

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-pran-hairline backdrop-blur transition-shadow duration-300",
        scrolled ? "bg-pran-paper/95 shadow-sm" : "bg-pran-paper/90",
      )}
    >
      <nav
        ref={navRef}
        className="mx-auto flex h-16 max-w-content items-center justify-between px-6"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="shrink-0 text-pran-text"
          aria-label="PRAN home"
        >
          <Logo className="h-8" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) =>
            item.children ? (
              <li key={item.label} className="relative">
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={openMenu === item.label}
                  onClick={() =>
                    setOpenMenu((cur) => (cur === item.label ? null : item.label))
                  }
                  className={cn(
                    "flex items-center gap-1 rounded-btn px-3 py-2 text-sm font-medium transition-colors",
                    "text-pran-text hover:text-pran-teal",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      openMenu === item.label && "rotate-180",
                    )}
                  />
                </button>
                {openMenu === item.label && (
                  <div className="absolute left-0 top-full mt-1 w-64 rounded-card border border-pran-hairline bg-pran-surface p-2 shadow-float">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpenMenu(null)}
                        className="flex items-center justify-between gap-3 rounded-btn px-3 py-2 text-sm text-pran-text transition-colors hover:bg-pran-teal/5 hover:text-pran-teal"
                      >
                        <span>{child.label}</span>
                        {child.locked && (
                          <Lock
                            className="h-3.5 w-3.5 shrink-0 text-pran-muted"
                            strokeWidth={2}
                            aria-label="Premium service — talk to us"
                          />
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  href={item.href!}
                  className={cn(
                    "rounded-btn px-3 py-2 text-sm font-medium transition-colors",
                    "text-pran-text hover:text-pran-teal",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/marketplace"
            className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
          >
            Explore Marketplace
          </Link>
          <button
            type="button"
            className={cn(
              "rounded-btn p-2 lg:hidden text-pran-text",
            )}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>


      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-pran-ink/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col overflow-y-auto bg-pran-surface p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <Logo className="h-8 text-pran-text" />
              <button
                type="button"
                className="rounded-btn p-2 text-pran-text"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {mainNav.map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-base font-medium text-pran-text"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <p className="mb-2 font-mono text-xs uppercase tracking-wider text-pran-muted">
                        {item.label}
                      </p>
                      <ul className="space-y-1">
                        {item.children!.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-1 text-sm text-pran-text hover:text-pran-teal"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-2">
              <Link
                href="/marketplace"
                onClick={() => setMobileOpen(false)}
                className={buttonVariants()}
              >
                Explore Marketplace
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
