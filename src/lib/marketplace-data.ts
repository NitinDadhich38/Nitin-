/**
 * Marketplace seed data — real project listings sourced from the existing
 * pranglobal.com marketplace (2026-07). Registry is derived from the ID prefix
 * (ICR / VCS=Verra / GS=Gold Standard / UCR / I-REC). Prices are indicative USD
 * per credit; where the source listed none, price is null ("On request").
 *
 * Phase 2 will move this to the Supabase `projects` table (Architecture.md §3);
 * the marketplace UI reads from getProjects()/getProject() so the swap is local.
 */

export type Registry = "ICR" | "Verra" | "Gold Standard" | "UCR" | "I-REC";

export type Project = {
  id: string;
  slug: string;
  name: string;
  developer: string | null;
  country: string;
  sector: string;
  registry: Registry;
  vintage: string;
  priceUsd: number | null;
  description: string;
  status: "ACTIVE";
};

type RawProject = Omit<Project, "slug" | "registry" | "priceUsd" | "status"> & {
  price: string;
};

const RAW: RawProject[] = [
  { id: "PRAN-57", name: "Skógálfar, Álfabrekka", developer: "Yggdrasill Carbon ehf", country: "Iceland", sector: "Afforestation & Reforestation", vintage: "2024", price: "$70.00", description: "A climate forestry project in South Iceland, developed across approximately 100 hectares to generate high-integrity carbon removals through afforestation and sustainable forest management." },
  { id: "PRAN-ICR-48", name: "AgroEcology Italy", developer: "Alberami S.r.l.", country: "Italy", sector: "Agriculture", vintage: "2024", price: "$90.00", description: "A large-scale regenerative agriculture initiative designed to reduce greenhouse-gas emissions while increasing long-term carbon sequestration across Italian agricultural landscapes." },
  { id: "PRAN-ICR-93", name: "Bright Future Africa – Vol.2 (Uganda)", developer: "GRO Foundation", country: "Uganda", sector: "Afforestation & Reforestation", vintage: "2025", price: "$425.00", description: "Applies the AR-ACM0003 v2.0 methodology using a census-based accounting approach to accurately quantify species-specific carbon sequestration, with wide community co-benefits." },
  { id: "PRAN-ICR-17", name: "Arnaldsstaðir", developer: "Yggdrasill Carbon ehf", country: "Iceland", sector: "Afforestation & Reforestation", vintage: "2024", price: "$70.00", description: "A large-scale afforestation and carbon-removal initiative located in Fljótsdalur, Eastern Iceland." },
  { id: "PRAN-ICR-91", name: "Blue Carbon Project, Mexico", developer: null, country: "Mexico", sector: "Blue Carbon & Marine Ecosystem Restoration", vintage: "2024", price: "$200.00", description: "An innovative ocean-based carbon-removal initiative in Baja California, Mexico, utilising the proprietary Sea Cave True Blue Carbon technology." },
  { id: "PRAN-ICR-349", name: "Forestal Río Aquidabán Concepción", developer: null, country: "Paraguay", sector: "Afforestation & Reforestation", vintage: "2025", price: "$20.00", description: "An ICR-verified afforestation and reforestation project restoring degraded grasslands through silvopastoral agroforestry for long-term carbon removal in Paraguay." },
  { id: "PRAN-GS-11401", name: "Bhesada Wind Power Project, Rajasthan", developer: null, country: "India", sector: "Renewable Energy", vintage: "Multiple vintages", price: "$1.00", description: "A large-scale renewable-energy initiative located in Rajasthan, India, displacing fossil-fuel generation on the national grid." },
  { id: "PRAN-GS-6999", name: "21 MW Wind Energy Project", developer: "Shree Cement Limited", country: "India", sector: "Renewable Energy", vintage: "2019–2021", price: "$1.50", description: "A Gold Standard certified 21 MW wind energy project by Shree Cement Limited, generating clean grid-connected electricity." },
  { id: "PRAN-VCS-676", name: "33.9 MW Bundled Wind Power Project", developer: null, country: "India", sector: "Renewable Energy", vintage: "Multiple vintages", price: "$0.50", description: "A utility-scale renewable-energy initiative spanning the states of Karnataka and Tamil Nadu." },
  { id: "PRAN-VCS-1767", name: "Bundled Solar Power Project by Mahindra Susten", developer: "Mahindra Susten Private Limited", country: "India", sector: "Renewable Energy", vintage: "2021", price: "$1.00", description: "A large-scale renewable-energy initiative comprising multiple grid-connected solar PV installations across Telangana, Gujarat, and Rajasthan." },
  { id: "PRAN-VCS-1736", name: "Grid-Connected Generation Plant, Jurong Island", developer: "PacificLight Power Pte. Ltd.", country: "Singapore", sector: "Energy Industries", vintage: "2019–2020", price: "$3.00", description: "A utility-scale power-generation facility located in Singapore and operated by PacificLight Power Pte. Ltd." },
  { id: "PRAN-VCS-563", name: "Biomass Based Steam Generation Project", developer: "Sterling Agro Industries Ltd.", country: "India", sector: "Energy Industries", vintage: "2018", price: "$0.80", description: "Uses renewable biomass fuel to generate steam for industrial operations in Uttar Pradesh, India, displacing fossil-fuel steam generation." },
  { id: "PRAN-VCS-1941", name: "Sustainable City Projects, Indore", developer: "Indore Smart City Development Ltd.", country: "India", sector: "Waste Handling & Disposal", vintage: "2019–2020", price: "$3.00", description: "An integrated urban-sustainability initiative at India's cleanest city, Indore, developed by Indore Smart City Development Ltd." },
  { id: "PRAN-VCS-2404", name: "Reforestation of Degraded Land by MTPL", developer: "MTPL", country: "India", sector: "AFOLU", vintage: "2001–2011", price: "$4.00", description: "A large-scale afforestation, reforestation and revegetation (ARR) initiative restoring degraded forest landscapes across Odisha, Andhra Pradesh, and Chhattisgarh." },
  { id: "PRAN-VCS-5296", name: "300 TPD Baidyabati Composting Project, West Bengal", developer: "Eastern Organic Fertilizer Pvt. Ltd.", country: "India", sector: "Waste Handling & Disposal", vintage: "2024", price: "", description: "A municipal solid-waste management initiative developed by Eastern Organic Fertilizer Pvt. Ltd. (EOFPL) in Hooghly District, West Bengal." },
  { id: "PRAN-VCS-5833", name: "1,397 TPD Bundled Composting Project, Tamil Nadu", developer: "Eastern Organic Fertilizer Pvt. Ltd.", country: "India", sector: "Waste Handling & Disposal", vintage: "2024–2025", price: "", description: "A large-scale organic-waste management initiative across multiple composting facilities in Tamil Nadu, India." },
  { id: "PRAN-VCS-3889", name: "210.5 TPD Biogas Grouped Project", developer: null, country: "India", sector: "Animal Manure Management", vintage: "2024–2025", price: "", description: "A grouped animal-manure management initiative that converts livestock waste into renewable biogas through controlled anaerobic digestion." },
  { id: "PRAN-UCR-449", name: "9.62 MW PIPL Solar Project, Gujarat", developer: "Panoli Intermediates (India) Pvt. Ltd.", country: "India", sector: "Renewable Energy", vintage: "2019–2024", price: "", description: "A utility-scale solar photovoltaic initiative developed by PIPL to generate clean electricity from renewable solar energy." },
  { id: "PRAN-UCR-451", name: "5.5 MW KCIL-PIPL Wind Project, Gujarat", developer: "Panoli Intermediates (India) Pvt. Ltd.", country: "India", sector: "Renewable Energy", vintage: "2019–2024", price: "", description: "A utility-scale wind project generating clean electricity while contributing verified carbon credits under the Universal Carbon Registry (UCR)." },
  { id: "PRAN-UCR-454", name: "4.2 MW KCIL Waste Heat to Power Project", developer: null, country: "India", sector: "Industrial Energy Efficiency", vintage: "2016–2023", price: "", description: "An industrial energy-efficiency initiative that captures waste heat from manufacturing and converts it into electricity via Waste Heat Recovery (WHR) technology." },
  { id: "PRAN-UCR-455", name: "20.5 MW PIPL Waste Heat to Power Project, Gujarat", developer: "Panoli Intermediates (India) Pvt. Ltd.", country: "India", sector: "Industrial Energy Efficiency", vintage: "2019–2024", price: "", description: "A large-scale industrial energy-efficiency initiative developed by PIPL in Nandesari Village, Vadodara District, Gujarat." },
  { id: "PRAN-UCR-487", name: "123.88 MW KP Group Solar-Wind Hybrid Project", developer: "KP Group (KPI Green Energy / KP Energy)", country: "India", sector: "Renewable Energy", vintage: "2016–2024", price: "", description: "A large-scale integrated renewable-energy initiative combining solar, wind, and hybrid generation in Gujarat, India." },
  { id: "PRAN-(I-REC)-2009", name: "2.4 MW Hydroelectric Project, Nepal", developer: null, country: "Nepal", sector: "Renewable Energy Certificate (REC)", vintage: "2025", price: "", description: "An operational renewable-energy facility in Nepal generating clean electricity through hydropower, issuing I-REC certificates." },
  { id: "PRAN-(I-REC)-2019", name: "9.9 MW Taksar-Pikhuwa Hydropower Project", developer: null, country: "Nepal", sector: "Renewable Energy Certificate (REC)", vintage: "2025", price: "", description: "A utility-scale renewable-energy facility in Nepal generating clean electricity through hydropower." },
  { id: "PRAN-(I-REC)-2020", name: "8.5 MW Butwal Solar PV Project", developer: null, country: "Nepal", sector: "Renewable Energy Certificate (REC)", vintage: "2025", price: "", description: "A utility-scale solar photovoltaic facility located in Rupandehi, Nepal, issuing I-REC renewable-energy certificates." },
  { id: "PRAN-(I-REC)-2024", name: "25 MW Solar PV Project, Nepal", developer: null, country: "Nepal", sector: "Renewable Energy Certificate (REC)", vintage: "2025", price: "", description: "A utility-scale renewable-energy facility commissioned in 2024, generating clean electricity through advanced solar photovoltaic technology." },
];

function registryFromId(id: string): Registry {
  if (id.includes("-GS-")) return "Gold Standard";
  if (id.includes("-VCS-")) return "Verra";
  if (id.includes("-UCR-")) return "UCR";
  if (id.includes("I-REC")) return "I-REC";
  return "ICR";
}

function slugify(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parsePrice(price: string): number | null {
  const n = Number(price.replace(/[^0-9.]/g, ""));
  return price && !Number.isNaN(n) ? n : null;
}

export const projects: Project[] = RAW.map((r) => ({
  id: r.id,
  slug: slugify(r.name),
  name: r.name,
  developer: r.developer,
  country: r.country,
  sector: r.sector,
  registry: registryFromId(r.id),
  vintage: r.vintage,
  priceUsd: parsePrice(r.price),
  description: r.description,
  status: "ACTIVE" as const,
}));

export function getProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Distinct facet values for marketplace filters. */
export const facets = {
  registries: Array.from(new Set(projects.map((p) => p.registry))).sort(),
  sectors: Array.from(new Set(projects.map((p) => p.sector))).sort(),
  countries: Array.from(new Set(projects.map((p) => p.country))).sort(),
};
