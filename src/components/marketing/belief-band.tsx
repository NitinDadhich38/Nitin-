import { ScrollWords } from "@/components/marketing/scroll-motion";
import { Reveal } from "@/components/marketing/reveal";

/**
 * One belief per page, in the membership page's voice: a short statement on
 * cream paper, then one plain line. Placed right after each page's opening so
 * a reader meets the idea before the detail.
 */
export function BeliefBand({
  label,
  statement,
  line,
  scroll = false,
}: {
  label?: string;
  statement: string;
  line?: string;
  scroll?: boolean;
}) {
  return (
    <section className="bg-pran-cream px-6 py-24 text-center sm:py-36">
      <Reveal className="mx-auto max-w-4xl">
        {label && (
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-pran-forest/70">
            {label}
          </p>
        )}
        {scroll ? (
          <ScrollWords
            text={statement}
            className="mt-6 font-display text-[clamp(2.2rem,6vw,4.8rem)] font-medium leading-[1.04] tracking-[-0.04em] text-pran-forest"
          />
        ) : (
          <h2 className="mt-6 font-display text-[clamp(2.2rem,6vw,4.8rem)] font-medium leading-[1.04] tracking-[-0.04em] text-pran-forest">
            {statement}
          </h2>
        )}
        {line && (
          <p className="mx-auto mt-8 max-w-[52ch] text-lg leading-relaxed text-pran-forest/75">
            {line}
          </p>
        )}
      </Reveal>
    </section>
  );
}
