/**
 * Resources content (proposal N3).
 *
 * Plain-English explainers written from public, well-established facts about
 * how carbon markets work. Regulatory specifics are summarised, never copied
 * from official texts (Rules.md), and anything that could be read as a
 * regulatory assertion is marked for review before publication.
 */

export type Article = {
  slug: string;
  title: string;
  tag: "Explainer" | "Insight" | "Reference";
  summary: string;
  readingMinutes: number;
  updated: string;
};

/**
 * Three resources, matching the header exactly (founder direction 2026-08-09).
 * The CCTS explainer, the glossary and the /resources index page were deleted
 * in that pass — CCTS content now lives inside the compliance library.
 */
export const articles: Article[] = [
  {
    slug: "compliance-library",
    title: "Compliance markets",
    tag: "Reference",
    summary:
      "India's CCTS, BRSR and the EU's CBAM — what each one asks of you, and the official sources to read.",
    readingMinutes: 8,
    updated: "August 2026",
  },
  {
    slug: "voluntary-market",
    title: "Voluntary markets",
    tag: "Explainer",
    summary:
      "How a credit is created, verified, sold, and retired — with the registry and standard-body sources behind it.",
    readingMinutes: 7,
    updated: "August 2026",
  },
  {
    slug: "blog",
    title: "Blogs",
    tag: "Insight",
    summary: "Notes on market structure, pricing, and integrity from the PRAN desk.",
    readingMinutes: 3,
    updated: "August 2026",
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
