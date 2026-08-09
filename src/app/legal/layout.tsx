import { LegalNav } from "@/components/marketing/legal-nav";

/**
 * Legal pages shell.
 *
 * ⚠️ LAWYER REVIEW NEEDED — every page under /legal is a plain-English
 * placeholder written from PRAN's own operating model (Docs/1_PRD.md and
 * 3_Rules.md). None of it has been reviewed by counsel and none of it should
 * go live as-is. It exists so the footer links resolve and so counsel has a
 * concrete draft to mark up rather than a blank page.
 *
 * The shell adds cross-navigation between the three documents. It deliberately
 * does not restyle the documents themselves: legal text wants a quiet measure
 * and a single column, not visual treatment.
 */
export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-pran-paper">
      <div className="mx-auto grid max-w-content gap-10 px-6 lg:grid-cols-[220px_1fr] lg:gap-16">
        <aside className="hidden pt-16 lg:block">
          <div className="sticky top-24">
            <LegalNav />
          </div>
        </aside>
        {/* Prose carries no padding of its own, so the shell owns the measure. */}
        <div className="min-w-0 pb-24">{children}</div>
      </div>
    </div>
  );
}
