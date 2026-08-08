import { Info } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { getIrecEntries } from "@/lib/marketplace-data";
import { IrecCard } from "@/components/marketplace/irec-card";

/**
 * I-REC band.
 *
 * Energy attribute certificates, presented as the same card grid as the
 * carbon book above so the two read as one marketplace — but kept verbally
 * and numerically separate. Volumes are MWh and are never converted to
 * tCO2e: an I-REC evidences renewable generation, it does not represent an
 * emission reduction, and conflating the two is exactly the claim we refuse
 * to make. Each card opens a prefilled purchase request.
 */
export function IrecBand() {
  const entries = getIrecEntries();
  const countries = new Set(entries.map((e) => e.country)).size;
  const totalMwh = entries.reduce((n, e) => n + (e.volumeMwh ?? 0), 0);

  return (
    <section className="border-t border-pran-hairline bg-pran-paper-warm py-20">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="max-w-[24ch] font-display text-h2 font-semibold tracking-[-0.02em] text-pran-ink">
                Renewable energy certificates
              </h2>
              <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-pran-muted">
                {entries.length} I-REC lines across {countries} countries,
                available alongside the carbon book.
              </p>
            </div>
            <dl className="flex gap-8">
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-pran-muted">
                  Total volume
                </dt>
                <dd className="mt-1 font-display text-2xl font-semibold tabular-nums text-pran-ink">
                  {totalMwh.toLocaleString("en-US")}
                  <span className="ml-1 text-sm font-normal text-pran-muted">
                    MWh
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>

        {/* The separation note sits above the grid, not below it, so the
            distinction is read before the listings rather than after. */}
        <div className="mt-8 flex items-start gap-3 rounded-card bg-pran-surface p-5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-pran-muted" />
          <p className="max-w-[86ch] text-sm leading-relaxed text-pran-muted">
            An I-REC evidences that one megawatt-hour of renewable electricity
            was generated. It is not a carbon credit and does not represent an
            emission reduction — the two are reported separately and must not be
            added together.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {entries.map((e) => (
            <IrecCard key={e.pranCode} entry={e} />
          ))}
        </div>
      </div>
    </section>
  );
}
