/**
 * Emission factors — every value carries its source and year (CLAUDE.md).
 *
 * ⚠️ VERIFY BEFORE LAUNCH. These are widely-published reference values used to
 * produce an *estimate*. They must be checked against the current official
 * publications (DEFRA/BEIS annual update, CEA CO2 Baseline Database, GHG
 * Protocol) before the calculator is presented to the public, and re-checked
 * whenever those publishers issue a new edition.
 *
 * The calculator estimates FOOTPRINTS. It never generates carbon credits.
 */

export type Factor = {
  /** kg CO2e per unit */
  kgCo2e: number;
  unit: string;
  source: string;
  year: string;
  note?: string;
};

/**
 * India grid electricity — CEA CO2 Baseline Database v21.0 (FY 2024-25),
 * published November 2025. Updated and CORRECTED 2026-08-09.
 *
 * The previous value (0.71, labelled "combined margin", dated 2023) mixed two
 * different figures. CEA publishes both, and they are not interchangeable:
 *
 *   · Weighted average, 0.7117 tCO2/MWh — all-India, including renewable and
 *     captive generation, excluding inter-grid imports. THIS is the correct
 *     factor for a footprint, i.e. GHG Protocol Scope 2 location-based.
 *   · Combined margin, 0.7383 tCO2/MWh — the CDM/offset BASELINE factor, used
 *     to compute what a project avoided. Wrong for footprinting.
 *
 * So the old number was roughly right but described as the wrong instrument.
 * Since this calculator estimates footprints and never computes a project
 * baseline, the weighted average is the one to use. Keep it that way.
 */
export const ELECTRICITY_INDIA: Factor = {
  kgCo2e: 0.7117,
  unit: "kWh",
  source: "CEA CO2 Baseline Database for the Indian Power Sector, v21.0",
  year: "FY 2024-25",
  note: "All-India weighted average (Scope 2, location-based). Not the combined margin, which is a CDM baseline figure. Re-check when CEA publishes v22.",
};

export const PERSONAL: Record<string, Factor> = {
  electricity: ELECTRICITY_INDIA,
  lpg: {
    kgCo2e: 2.98,
    unit: "kg",
    source: "DEFRA/BEIS GHG Conversion Factors",
    year: "2023",
  },
  /**
   * ⚠ UNVERIFIED PAIR. petrolCar and dieselCar carry an identical 0.17, which
   * cannot both be right — DEFRA publishes different values per fuel, and
   * diesel is normally the lower of the two per km for an equivalent car.
   * Whoever verifies this file must split them from the current DEFRA
   * release. Left as-is rather than guessed: a fabricated factor is worse
   * than a flagged one (CLAUDE.md — never invent numbers).
   */
  petrolCar: {
    kgCo2e: 0.17,
    unit: "km",
    source: "DEFRA/BEIS GHG Conversion Factors (average petrol car)",
    year: "2023",
    note: "⚠ Identical to dieselCar — verify and split before launch.",
  },
  dieselCar: {
    kgCo2e: 0.17,
    unit: "km",
    source: "DEFRA/BEIS GHG Conversion Factors (average diesel car)",
    year: "2023",
    note: "⚠ Identical to petrolCar — verify and split before launch.",
  },
  motorcycle: {
    kgCo2e: 0.11,
    unit: "km",
    source: "DEFRA/BEIS GHG Conversion Factors (average motorcycle)",
    year: "2023",
  },
  bus: {
    kgCo2e: 0.1,
    unit: "passenger-km",
    source: "DEFRA/BEIS GHG Conversion Factors (local bus)",
    year: "2023",
  },
  rail: {
    kgCo2e: 0.035,
    unit: "passenger-km",
    source: "DEFRA/BEIS GHG Conversion Factors (national rail)",
    year: "2023",
  },
  /**
   * ⚠ UNVERIFIED PAIR. Short-haul is normally HIGHER per passenger-km than
   * long-haul (take-off and climb dominate a short sector), so an identical
   * 0.15 understates short-haul and overstates long-haul. Split from the
   * current DEFRA release when verifying. Radiative forcing is also excluded
   * here — DEFRA publishes with- and without-RF variants, and which one you
   * use should be a stated choice, not an accident.
   */
  flightShort: {
    kgCo2e: 0.15,
    unit: "passenger-km",
    source: "DEFRA/BEIS GHG Conversion Factors (short-haul, economy)",
    year: "2023",
    note: "⚠ Identical to flightLong — verify and split before launch. Excludes radiative forcing.",
  },
  flightLong: {
    kgCo2e: 0.15,
    unit: "passenger-km",
    source: "DEFRA/BEIS GHG Conversion Factors (long-haul, economy)",
    year: "2023",
    note: "⚠ Identical to flightShort — verify and split before launch. Excludes radiative forcing.",
  },
};

/** Rough annual dietary footprints — used only as a coarse selector. */
export const DIET: Record<string, { label: string; tCo2ePerYear: number }> = {
  vegan: { label: "Vegan", tCo2ePerYear: 0.9 },
  vegetarian: { label: "Vegetarian", tCo2ePerYear: 1.2 },
  mixed: { label: "Mixed diet", tCo2ePerYear: 1.7 },
  highMeat: { label: "High meat", tCo2ePerYear: 2.5 },
};

export const DIET_SOURCE = {
  source:
    "Scarborough et al., dietary greenhouse gas footprints (peer-reviewed literature)",
  year: "2014",
  note: "Coarse averages for UK diets, used as an indicative selector only.",
};

/** Business — GHG Protocol scopes. */
export const BUSINESS: Record<string, Factor> = {
  electricity: ELECTRICITY_INDIA,
  naturalGas: {
    kgCo2e: 2.02,
    unit: "m³",
    source: "DEFRA/BEIS GHG Conversion Factors",
    year: "2023",
  },
  diesel: {
    kgCo2e: 2.68,
    unit: "litre",
    source: "DEFRA/BEIS GHG Conversion Factors",
    year: "2023",
  },
  businessTravelAir: {
    kgCo2e: 0.15,
    unit: "passenger-km",
    source: "DEFRA/BEIS GHG Conversion Factors (economy)",
    year: "2023",
  },
  employeeCommute: {
    kgCo2e: 0.12,
    unit: "passenger-km",
    source: "DEFRA/BEIS GHG Conversion Factors (blended modes)",
    year: "2023",
  },
};

/* ── Personalisation ──────────────────────────────────────────────────────
   Founder direction 2026-08-09: ask more about the person and the company so
   the estimate is better targeted.

   AN HONEST SPLIT, AND IT MATTERS. Some of what was requested genuinely
   changes the arithmetic; some of it does not, and pretending otherwise would
   be inventing a factor:

     CHANGES THE NUMBER
       · Household size — household bills (electricity, LPG) are shared. Not
         dividing by occupancy is the single largest error in most personal
         calculators, and it inflates results for anyone in a family.
       · Employees — converts a business total into intensity per employee,
         which is the figure that is actually comparable to anything.

     CONTEXT ONLY — captured, never multiplied
       · Name, age band, occupation, industry, city, year established.
         There is no defensible published emission factor keyed to a person's
         age or job title. These are stored to personalise the OUTPUT, to make
         the enquiry useful to the desk, and as the input the future reduction
         agent will need. They must never silently scale a result.

   FUTURE (do not build yet — founder deferred it 2026-08-09): an AI agent that
   reads this profile and suggests reduction measures ranked by cost and
   feasibility. That is Phase 4 and needs the Claude API, which is not in the
   Phase 1 stack. The profile fields below are deliberately shaped for it. */

export const AGE_BANDS = ["Under 25", "25–34", "35–49", "50–64", "65+"] as const;

export const OCCUPATIONS = [
  "Student",
  "Salaried professional",
  "Business owner",
  "Public sector",
  "Sustainability / ESG role",
  "Retired",
  "Other",
] as const;

/**
 * Sector list mirrors the notified energy-intensive sectors under India's CCTS
 * plus the common non-obligated ones, so a business immediately sees whether it
 * is likely in scope of the compliance mechanism.
 */
export const INDUSTRIES = [
  "Aluminium",
  "Cement",
  "Chlor-alkali",
  "Fertiliser",
  "Iron & steel",
  "Pulp & paper",
  "Petrochemicals / refinery",
  "Textiles",
  "IT / software services",
  "Financial services",
  "Retail / e-commerce",
  "Logistics & transport",
  "Hospitality",
  "Healthcare",
  "Other",
] as const;

/** Sectors notified under the CCTS compliance mechanism (obligated entities). */
export const CCTS_OBLIGATED: readonly string[] = [
  "Aluminium",
  "Cement",
  "Chlor-alkali",
  "Fertiliser",
  "Iron & steel",
  "Pulp & paper",
  "Petrochemicals / refinery",
  "Textiles",
];

export type Benchmark = { label: string; tCo2ePerYear: number; source: string };

/**
 * Comparison points for the personal result. These are population averages,
 * not targets, and are labelled as such on the page.
 *
 * India's per-capita figure is the widely published ~2 tCO2 territory; the
 * world average ~4.7 tCO2. Both are ROUNDED and presented as approximate
 * precisely because a per-capita number depends on whether you count
 * production or consumption, and territorial or footprint basis.
 */
export const PERSONAL_BENCHMARKS: Benchmark[] = [
  {
    label: "India, average person",
    tCo2ePerYear: 2,
    source: "Approximate territorial per-capita CO₂ — Global Carbon Budget",
  },
  {
    label: "World, average person",
    tCo2ePerYear: 4.7,
    source: "Approximate territorial per-capita CO₂ — Global Carbon Budget",
  },
];

export const METHODOLOGY_NOTE =
  "Personal estimates use DEFRA/BEIS conversion factors; business estimates follow the GHG Protocol scope structure; Indian grid electricity uses the CEA CO2 Baseline Database. Figures are estimates for guidance, not a verified inventory or an audited disclosure.";
