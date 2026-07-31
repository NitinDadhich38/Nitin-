import { Zap, Info } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { countryFlag } from "@/lib/sectors";
import { getIrecEntries } from "@/lib/marketplace-data";

/**
 * I-REC band.
 *
 * Energy attribute certificates, kept visually and verbally separate from the
 * carbon grid above. Volumes are MWh and are never converted to tCO2e — an
 * I-REC evidences renewable generation, it does not represent an emission
 * reduction, and conflating the two is exactly the claim we refuse to make.
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

        <div className="mt-10 overflow-x-auto rounded-panel bg-pran-surface shadow-card">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-pran-hairline">
                {[
                  "Listing",
                  "Country",
                  "Technology",
                  "Vintage",
                  "Volume (MWh)",
                  "Delivery",
                  "Price",
                ].map((h, i) => (
                  <th
                    key={h}
                    className={`px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.08em] text-pran-muted ${
                      i >= 4 ? "text-right" : "text-left"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr
                  key={e.pranCode}
                  className="border-b border-pran-hairline transition-colors last:border-b-0 hover:bg-pran-paper-warm"
                >
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-2 font-medium text-pran-ink">
                      <Zap className="h-3.5 w-3.5 shrink-0 text-pran-emerald" />
                      {e.label}
                    </span>
                    <span className="mt-0.5 flex items-center gap-2">
                      <span className="font-mono text-[11px] text-pran-muted">
                        {e.pranCode}
                      </span>
                      {e.remarks && e.remarks !== e.label && (
                        <span className="rounded bg-pran-emerald/10 px-1.5 py-0.5 text-[10px] font-medium text-pran-emerald-hover">
                          {e.remarks}
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-pran-ink">
                    <span aria-hidden>{countryFlag(e.country)}</span>{" "}
                    {e.country}
                  </td>
                  <td className="px-5 py-3.5 text-pran-muted">{e.tech}</td>
                  <td className="px-5 py-3.5 tabular-nums text-pran-ink">
                    {e.vintage}
                  </td>
                  <td className="px-5 py-3.5 text-right tabular-nums text-pran-ink">
                    {e.volumeMwh ? e.volumeMwh.toLocaleString("en-US") : "—"}
                  </td>
                  <td className="px-5 py-3.5 text-right text-pran-muted">
                    {e.delivery ?? "—"}
                  </td>
                  <td className="px-5 py-3.5 text-right font-medium tabular-nums text-pran-ink">
                    {e.priceUsd != null ? `$${e.priceUsd.toFixed(2)}` : "On request"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-card bg-pran-surface p-5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-pran-muted" />
          <p className="max-w-[86ch] text-sm leading-relaxed text-pran-muted">
            An I-REC evidences that one megawatt-hour of renewable electricity
            was generated. It is not a carbon credit and does not represent an
            emission reduction — the two are reported separately and must not be
            added together.
          </p>
        </div>
      </div>
    </section>
  );
}
