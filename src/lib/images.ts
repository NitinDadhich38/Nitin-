/**
 * Curated real photography for the marketing site (5_Design.md §2.4).
 *
 * These are real forest / aerial / solar / farmland photographs from Unsplash,
 * used as full-bleed section backgrounds and card imagery to achieve the v2.0
 * look. Every URL is centralised here so real PRAN project photos can replace
 * them in one place once provided (drop files in /public and swap the values).
 *
 * NEVER AI-generated imagery, leaf icons, or stock "people in suits".
 */

const UNSPLASH = "https://images.unsplash.com/photo-";

/** Build a sized, format-optimised Unsplash URL. */
function u(id: string, w = 1600): string {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export const photos = {
  /** Aerial evergreen forest — hero background. */
  heroAerial: u("1441974231531-c6227db76b6e", 2400),
  /** Aerial river bending through dense forest — data/marketplace. */
  forestRiver: u("1434725039720-aaad6dd32dfe", 2000),
  /** Sunlight through a misty forest. */
  forestMist: u("1470071459604-3b5ec3a7fe05", 1600),
  /** Looking up a stand of tall trees. */
  forestCanopy: u("1448375240586-882707db888b", 1600),
  /** Rows of solar panels. */
  solar: u("1509391366360-2e959784a276", 1600),
  /** Wind turbine against sky. */
  wind: u("1466611653911-95081537e5b7", 1600),
  /** Golden farmland at dusk. */
  farmland: u("1500382017468-9049fed747ef", 1600),
  /** Aerial green mountain landscape. */
  greenHills: u("1501854140801-50d01698950b", 2000),
  /** Hands cradling a seedling. */
  seedling: u("1416879595882-3373a0480b5b", 1600),
  /** Sun through green leaves. */
  leaves: u("1518495973542-4542c06a5843", 1600),
  /** Wide mountain-forest landscape. */
  mountainForest: u("1497436072909-60f360e1d4b1", 2000),
} as const;

export type PhotoKey = keyof typeof photos;

/**
 * Self-hosted page imagery (added 2026-08-09).
 *
 * These live in /public/img rather than being hotlinked. Interior page
 * backgrounds are brand furniture — they load on nearly every visit, so they
 * should not depend on a third-party CDN being reachable, and Next can serve
 * them from the same origin. Downloaded from Unsplash; sized 2000px wide.
 */
export const pageImages = {
  /** Aerial green hills — /about, "why we exist". */
  aboutWhy: "/img/about-why.jpg",
  /** Wide mountain-forest horizon — /about/team. */
  teamHorizon: "/img/team-horizon.jpg",
  /** Industrial emissions against sky — /why-carbon-markets. */
  whyClimate: "/img/why-climate.jpg",
  /** Solar array — /resources/compliance-library. */
  resourcesCompliance: "/img/resources-compliance.jpg",
  /** Forest canopy — /resources/voluntary-market. */
  resourcesVoluntary: "/img/resources-voluntary.jpg",
  /** Open landscape — /resources/blog. */
  resourcesBlog: "/img/resources-blog.jpg",
  /** Wind turbine against sky — /calculator. */
  calculatorHero: "/img/calculator-hero.jpg",
  /** Misty forest — /resources/[slug] hero. */
  resourcesHero: "/img/resources-hero.jpg",
  /** Aerial river through forest — /marketplace band. */
  marketplaceHero: "/img/marketplace-hero.jpg",
  /** Data / analysis — /intelligence. */
  intelligenceHero: "/img/intelligence-hero.jpg",
  /** Open desk — /contact. */
  contactHero: "/img/contact-hero.jpg",
  /** Wide horizon — /legal/* letterhead band. */
  legalHero: "/img/legal-hero.jpg",
} as const;

/** Per-audience hero photography for /solutions/[audience]. */
export const solutionImages: Record<string, string> = {
  enterprise: "/img/solutions-enterprise.jpg",
  government: "/img/solutions-government.jpg",
  developers: "/img/solutions-developers.jpg",
  public: "/img/solutions-public.jpg",
};

/**
 * Attribution for the self-hosted photography above.
 *
 * These are Unsplash photographs, used under the Unsplash licence. They are
 * ILLUSTRATIVE — none of them depicts a PRAN project, a government event, or
 * any specific facility, and none may ever be captioned as if it did.
 *
 * Deliberately NOT used: Press Information Bureau / Prakriti event photography.
 * Those are the most on-topic images available, but their redistribution terms
 * could not be verified, and an unlicensed press photo on a commercial site is
 * a real liability. If the founder obtains permission, swap them in here.
 */
export const imageCredit = "Photography: Unsplash. Illustrative only." as const;

/* Project and I-REC card imagery does NOT come from here — every listing has
   its own distinct photograph, assigned in lib/project-imagery.ts. These
   photos are section backgrounds only, and deliberately share no ids with
   that library so a background never doubles as a card thumbnail. */
