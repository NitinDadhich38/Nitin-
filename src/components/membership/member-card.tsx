import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

/**
 * The PRAN Member card: a drawn object, not a photograph. It is a design
 * specimen of the proposed mark, not an issued credential. No member names,
 * numbers or claims appear on it.
 */
export function MemberCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[1.586/1] w-full max-w-[460px] overflow-hidden rounded-[22px] border border-white/15 bg-[linear-gradient(145deg,#12392c_0%,#0a2a20_55%,#06140e_100%)] p-7 text-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]",
        className,
      )}
      role="img"
      aria-label="Specimen of the PRAN Member card"
    >
      {/* concentric ring seal */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="absolute -right-10 -top-10 h-64 w-64 text-pran-lime/25"
      >
        {[90, 74, 58, 42, 26].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="currentColor" strokeWidth="1" />
        ))}
        <circle cx="100" cy="100" r="5" fill="currentColor" />
      </svg>
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_10%_100%,rgba(217,249,157,0.14),transparent_70%)]"
      />
      <div className="relative flex h-full flex-col justify-between">
        <Logo className="h-7 text-white" />
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-pran-lime">
            Member
          </p>
          <p className="mt-2 font-display text-[1.7rem] font-semibold leading-none tracking-[-0.03em]">
            Own your impact.
          </p>
          <div className="mt-5 flex items-end justify-between text-[10px] uppercase tracking-[0.2em] text-white/50">
            <span>Specimen</span>
            <span className="hidden sm:inline">Annual record: earned, dated</span>
          </div>
        </div>
      </div>
    </div>
  );
}
