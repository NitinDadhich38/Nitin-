/**
 * UN Sustainable Development Goals — official names + icon artwork, used
 * wherever a project's real SDG mapping was pulled from the live site
 * (see lib/live-project-media.ts). Never invent an SDG number for a project
 * that has no scraped mapping.
 */
export const SDG_NAMES: Record<number, string> = {
  1: "No Poverty",
  2: "Zero Hunger",
  3: "Good Health and Well-being",
  4: "Quality Education",
  5: "Gender Equality",
  6: "Clean Water and Sanitation",
  7: "Affordable and Clean Energy",
  8: "Decent Work and Economic Growth",
  9: "Industry, Innovation and Infrastructure",
  10: "Reduced Inequalities",
  11: "Sustainable Cities and Communities",
  12: "Responsible Consumption and Production",
  13: "Climate Action",
  14: "Life Below Water",
  15: "Life on Land",
  16: "Peace, Justice and Strong Institutions",
  17: "Partnerships for the Goals",
};

/** Official UN SDG square icon for a goal number (1–17). */
export function sdgIconUrl(goal: number): string {
  const n = String(goal).padStart(2, "0");
  return `https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-${n}.jpg`;
}

export function sdgName(goal: number): string {
  return SDG_NAMES[goal] ?? `SDG ${goal}`;
}
