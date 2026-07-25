/**
 * Legal pages shell.
 *
 * ⚠️ LAWYER REVIEW NEEDED — every page under /legal is a plain-English
 * placeholder written from PRAN's own operating model (Docs/1_PRD.md and
 * 3_Rules.md). None of it has been reviewed by counsel and none of it should
 * go live as-is. It exists so the footer links resolve and so counsel has a
 * concrete draft to mark up rather than a blank page.
 */
export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-pran-paper">{children}</div>;
}
