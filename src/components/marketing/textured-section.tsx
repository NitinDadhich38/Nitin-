import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A section wrapper that carries real photography as a barely-there texture
 * behind its content, instead of a flat solid fill. Used to give body
 * sections (the parts after the hero) some visual life without competing
 * with the text — the photo sits at low opacity under a tint that matches
 * the section's register.
 *
 * `tone="dark"` for forest/ink sections (white text) — a moodier, more
 * visible photo under a dark gradient.
 * `tone="light"` for paper/surface sections (dark text) — the photo is
 * nearly a texture, tinted almost fully white so text stays effortlessly
 * legible.
 */
export function TexturedSection({
  photo,
  tone,
  className,
  children,
}: {
  photo: string;
  tone: "dark" | "light";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        tone === "dark" ? "bg-pran-forest text-white" : "bg-pran-paper-warm",
        className,
      )}
    >
      <Image
        src={photo}
        alt=""
        fill
        sizes="100vw"
        className={cn(
          "object-cover",
          tone === "dark" ? "opacity-25" : "opacity-[0.08]",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-0",
          tone === "dark"
            ? "bg-gradient-to-b from-black/30 via-black/55 to-black/78"
            : "bg-gradient-to-b from-white/75 via-white/88 to-white/94",
        )}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
