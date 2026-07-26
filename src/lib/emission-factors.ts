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

/** India grid electricity — CEA CO2 Baseline Database. */
export const ELECTRICITY_INDIA: Factor = {
  kgCo2e: 0.71,
  unit: "kWh",
  source: "CEA CO2 Baseline Database for the Indian Power Sector",
  year: "2023",
  note: "Combined margin grid emission factor. Verify against the latest CEA edition.",
};

export const PERSONAL: Record<string, Factor> = {
  electricity: ELECTRICITY_INDIA,
  lpg: {
    kgCo2e: 2.98,
    unit: "kg",
    source: "DEFRA/BEIS GHG Conversion Factors",
    year: "2023",
  },
  petrolCar: {
    kgCo2e: 0.17,
    unit: "km",
    source: "DEFRA/BEIS GHG Conversion Factors (average petrol car)",
    year: "2023",
  },
  dieselCar: {
    kgCo2e: 0.17,
    unit: "km",
    source: "DEFRA/BEIS GHG Conversion Factors (average diesel car)",
    year: "2023",
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
  flightShort: {
    kgCo2e: 0.15,
    unit: "passenger-km",
    source: "DEFRA/BEIS GHG Conversion Factors (short-haul, economy)",
    year: "2023",
  },
  flightLong: {
    kgCo2e: 0.15,
    unit: "passenger-km",
    source: "DEFRA/BEIS GHG Conversion Factors (long-haul, economy)",
    year: "2023",
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

export const METHODOLOGY_NOTE =
  "Personal estimates use DEFRA/BEIS conversion factors; business estimates follow the GHG Protocol scope structure; Indian grid electricity uses the CEA CO2 Baseline Database. Figures are estimates for guidance, not a verified inventory or an audited disclosure.";
