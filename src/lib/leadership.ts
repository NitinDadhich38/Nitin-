/**
 * Leadership details.
 *
 * Contact details and role are as supplied by the founder. The bio is
 * mission- and role-focused by design: it makes no claim about education,
 * prior employers, tenure, or credentials, because none were supplied and
 * none may be invented (CLAUDE.md — never invent data).
 *
 * FOUNDER TO REVIEW: bio copy below is a draft written for approval.
 */
export const founder = {
  name: "Nitin Dadhich",
  role: "Founder & Managing Director",
  initials: "ND",
  email: "founder@pranapp.in",
  linkedin: "https://in.linkedin.com/in/nitin-dadhich-235805329",
  /**
   * Founder-supplied portrait, self-hosted in /public (2026-08-09).
   * This previously pointed at /nitin-dadhich.jpg, which never existed — the
   * file on disk was NITIN.jpeg — so the page silently rendered the "ND"
   * monogram fallback instead of the photo for weeks.
   */
  photo: "/founder-nitin-dadhich.jpg",
  bio: [
    "Nitin founded PRAN on a simple observation: India has the projects, the capital, and the demand for carbon credits — but no neutral infrastructure connecting them. Buyers cannot screen quality. Developers cannot reach counterparties who actually transact. Settlement runs on trust rather than systems.",
    "PRAN is the answer to that gap — the financial-infrastructure layer for the carbon market. Not a green brand and not an offset reseller: the rails. Registry-backed listings, transparent pricing, escrow-based settlement, and an audit trail a finance team can defend.",
    "He leads product direction and market strategy, and works directly with the buyers, developers, and institutions building on the platform.",
  ],
} as const;

/**
 * The four operating steps shown on /about (founder wording, 2026-08-09).
 *
 * This is the order of operations, not a values statement — it describes what
 * PRAN actually does, in sequence. Step 4 deliberately says "retire against
 * what you cannot yet cut" rather than any balancing/neutrality phrasing:
 * CLAUDE.md bans neutrality claims, and "balance your emissions" reads as one.
 */
export const operatingSteps = [
  {
    title: "We onboard registry-verified projects.",
    body: "Developers bring us projects that a registry has already issued credits against. We check the registry record before anything is listed.",
  },
  {
    title: "We match corporates to what fits.",
    body: "Sector, geography, vintage, standard, price. The projects that align with your obligation and your reporting, not whatever needs to move.",
  },
  {
    title: "We quote transparently.",
    body: "You see the price and what sits behind it. No spread hidden inside a bundled number.",
  },
  {
    title: "We facilitate the trade.",
    body: "Escrowed settlement, credits transferred into your own registry account, and a record of what was purchased and retired against the emissions you cannot yet cut.",
  },
] as const;

export const founderPrinciples = [
  {
    title: "We don't issue credits.",
    body: "Credits exist only because a registry says so. PRAN lists, facilitates, and records — it never creates supply, and it is not an auditor or verifier.",
  },
  {
    title: "Claims stay defensible.",
    body: "We describe exactly what was purchased and retired, for what period. No neutrality language that a regulator or a journalist could take apart.",
  },
  {
    title: "Settlement before trust.",
    body: "Escrow, server-verified payment, and a recorded transfer trail. Nobody has to take anybody's word for whether a trade actually cleared.",
  },
  {
    title: "Quality is shown, not asserted.",
    body: "Registry, standard, methodology, vintage, and volume sit on the page where a buyer can screen them — not buried in a PDF after the deal.",
  },
] as const;
