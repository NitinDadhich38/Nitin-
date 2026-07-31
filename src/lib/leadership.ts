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
  /** Drop the photo at /public/nitin-dadhich.jpg — falls back to a monogram. */
  photo: "/nitin-dadhich.jpg",
  bio: [
    "Nitin founded PRAN on a simple observation: India has the projects, the capital, and the demand for carbon credits — but no neutral infrastructure connecting them. Buyers cannot screen quality. Developers cannot reach counterparties who actually transact. Settlement runs on trust rather than systems.",
    "PRAN is the answer to that gap — the financial-infrastructure layer for the carbon market. Not a green brand and not an offset reseller: the rails. Registry-backed listings, transparent pricing, escrow-based settlement, and an audit trail a finance team can defend.",
    "He leads product direction and market strategy, and works directly with the buyers, developers, and institutions building on the platform.",
  ],
} as const;

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
