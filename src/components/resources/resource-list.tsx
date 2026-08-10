import Image from "next/image";
import type { ResourceLink } from "@/lib/resource-links";
import { imageCredit } from "@/lib/images";

/**
 * A credited image band for a resource page.
 *
 * The credit sits in the corner in small type, per founder direction
 * (2026-08-09). It is not decoration — an uncredited photograph on a page that
 * exists to cite its sources undercuts the whole page.
 */
export function CreditedImage({
  src,
  alt,
  credit = imageCredit,
}: {
  src: string;
  alt: string;
  credit?: string;
}) {
  return (
    <figure className="relative my-10 aspect-[16/7] w-full overflow-hidden rounded-panel">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width:1024px) 100vw, 760px"
        className="object-cover"
      />
      <figcaption className="absolute bottom-0 right-0 rounded-tl-md bg-black/55 px-2.5 py-1 text-[10px] leading-tight text-white/80 backdrop-blur-sm">
        {credit}
      </figcaption>
    </figure>
  );
}

/**
 * The curated external-source list.
 *
 * Every href is status-checked in lib/resource-links.ts. `primary` marks a
 * legal or standard-setting instrument as opposed to commentary, so a reader
 * can tell the difference between the rulebook and someone writing about it.
 */
export function ResourceList({ links }: { links: ResourceLink[] }) {
  return (
    <ul className="not-prose my-10 grid gap-px overflow-hidden rounded-panel bg-pran-hairline sm:grid-cols-2">
      {links.map((l) => (
        <li key={l.href + l.title}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col bg-pran-surface p-6 transition-colors hover:bg-pran-paper-warm"
          >
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-pran-muted">
                {l.org}
              </span>
              {l.primary && (
                <span className="rounded-full bg-pran-emerald/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-pran-emerald">
                  Primary source
                </span>
              )}
            </div>
            <p className="mt-2.5 font-display text-[16px] font-semibold leading-snug text-pran-ink group-hover:text-pran-emerald">
              {l.title}
            </p>
            <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-pran-muted">
              {l.note}
            </p>
            <span className="mt-4 text-[12.5px] font-medium text-pran-emerald">
              Open ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
