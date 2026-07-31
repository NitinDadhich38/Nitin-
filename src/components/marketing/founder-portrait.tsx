"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Founder portrait with an honest fallback.
 *
 * The photo lives at /public/nitin-dadhich.jpg. Until it is dropped in, this
 * renders a typographic monogram rather than a broken image — the page stays
 * shippable either way.
 */
export function FounderPortrait({
  src,
  alt,
  initials,
}: {
  src: string;
  alt: string;
  initials: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-panel bg-pran-forest shadow-float">
      {failed ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pran-forest to-[#06170f]">
          <span className="font-display text-[clamp(3rem,9vw,5.5rem)] font-semibold tracking-[-0.03em] text-pran-lime/85">
            {initials}
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width:1024px) 100vw, 460px"
          className="object-cover object-top"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
