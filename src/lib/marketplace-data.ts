/**
 * Marketplace data — the real PRAN portfolio.
 *
 * Source: PRΛN_Portfolio.xlsx (founder-supplied, July 2026). 98 credit
 * listings grouped into 85 projects across 7 registry standards and 20
 * countries, plus 27 I-REC lines. A project can offer several listings
 * (vintage tranches), which is how the book actually trades.
 *
 * Descriptions marked `sourced` were written from pranglobal.com copy.
 * Those marked `generated` are assembled ONLY from spreadsheet fields
 * (sector, country, registry, volume, vintage, delivery) — no invented
 * facts, no claims. Replace them with real project copy as it arrives.
 *
 * Phase 2 moves this to the Supabase `projects` table; the UI reads through
 * getProjects()/getProject() so the swap stays local to this file.
 */

export type Registry =
  | "Verra"
  | "Gold Standard"
  | "Gold Standard VER"
  | "CDM"
  | "ICR"
  | "UCR";

export type Delivery = "Spot" | "Forward" | "Issued" | null;

/** One tranche of credits offered from a project. */
export type Listing = {
  vintage: string | null;
  volume: number | null;
  priceUsd: number | null;
  /** Raw sheet value, e.g. "$23 onwards" or "$16-$21". */
  priceLabel: string | null;
  delivery: Delivery;
  note: string | null;
};

export type Project = {
  /** Registry identifier as issued, e.g. "VCS 5833". */
  id: string;
  /**
   * PRAN reference code — the public URL and the code shown on the project
   * page. Assigned sequentially and stored explicitly so it never shifts if
   * the array is reordered. Edit here to match a registry asset code.
   */
  pranCode: string;
  slug: string;
  name: string;
  developer: string | null;
  country: string;
  sector: string;
  /** The sheet's own technology wording, kept for reference. */
  rawTech: string;
  registry: Registry;
  standardCode: string;
  totalVolume: number | null;
  priceUsd: number | null;
  priceMaxUsd: number | null;
  vintages: string[];
  vintageLabel: string;
  description: string;
  descriptionSource: "sourced" | "generated";
  listings: Listing[];
};

export type IrecListing = {
  country: string;
  tech: string;
  vintage: string;
  volumeMwh: number | null;
  delivery: Delivery;
  remarks: string | null;
  priceUsd: number | null;
};

export const projects: Project[] = [
  {
    "id": "VCS 5833",
    "pranCode": "PRAN-5833",
    "slug": "1397-tpd-bundled-project",
    "name": "1397 TPD Bundled Project",
    "developer": "Eastern Organic Fertilizer Pvt. Ltd.",
    "country": "India",
    "sector": "Waste & Biogas",
    "rawTech": "Waste Handling & Disposal",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 22000,
    "priceUsd": null,
    "priceMaxUsd": null,
    "vintages": [
      "2025"
    ],
    "description": "A large-scale organic-waste management initiative across multiple composting facilities in Tamil Nadu, India.",
    "listings": [
      {
        "vintage": "2025",
        "volume": 22000,
        "priceUsd": null,
        "priceLabel": null,
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2025"
  },
  {
    "id": "VCS 3889",
    "pranCode": "PRAN-3889",
    "slug": "210-5-tpd-biogas-project",
    "name": "210.5 TPD Biogas Project",
    "developer": null,
    "country": "India",
    "sector": "Waste & Biogas",
    "rawTech": "Animal Manure Management",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 70000,
    "priceUsd": null,
    "priceMaxUsd": null,
    "vintages": [
      "2025"
    ],
    "description": "A grouped animal-manure management initiative that converts livestock waste into renewable biogas through controlled anaerobic digestion.",
    "listings": [
      {
        "vintage": "2025",
        "volume": 70000,
        "priceUsd": null,
        "priceLabel": null,
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2025"
  },
  {
    "id": "VCS 5296",
    "pranCode": "PRAN-5296",
    "slug": "300-tpd-baidyabati-project",
    "name": "300 TPD Baidyabati Project",
    "developer": "Eastern Organic Fertilizer Pvt. Ltd.",
    "country": "India",
    "sector": "Waste & Biogas",
    "rawTech": "Waste Handling & Disposal",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 1700,
    "priceUsd": null,
    "priceMaxUsd": null,
    "vintages": [
      "2024"
    ],
    "description": "A municipal solid-waste management initiative developed by Eastern Organic Fertilizer Pvt. Ltd. (EOFPL) in Hooghly District, West Bengal.",
    "listings": [
      {
        "vintage": "2024",
        "volume": 1700,
        "priceUsd": null,
        "priceLabel": null,
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2024"
  },
  {
    "id": "VCS 676",
    "pranCode": "PRAN-1650",
    "slug": "33-9-mw-wind-power-project",
    "name": "33.9 MW  Wind Power Project",
    "developer": null,
    "country": "India",
    "sector": "Renewable Energy",
    "rawTech": "Renewable Energy",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 81947,
    "priceUsd": 0.52,
    "priceMaxUsd": 0.52,
    "vintages": [
      "2025"
    ],
    "description": "A utility-scale renewable-energy initiative spanning the states of Karnataka and Tamil Nadu.",
    "listings": [
      {
        "vintage": "2025",
        "volume": 81947,
        "priceUsd": 0.52,
        "priceLabel": "$0.52",
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2025"
  },
  {
    "id": "VCS 1990",
    "pranCode": "PRAN-1990",
    "slug": "40mw-bundled-solar-project-in-telangana-india",
    "name": "40MW Bundled Solar Project in Telangana, India",
    "developer": null,
    "country": "India",
    "sector": "Solar",
    "rawTech": "Solar",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 154169,
    "priceUsd": 0.73,
    "priceMaxUsd": 0.73,
    "vintages": [
      "2021-2022"
    ],
    "description": "A solar project in India, issued under Verra (VCS 1990). 154,169 tCO₂e listed for vintage 2021-2022. Available spot.",
    "listings": [
      {
        "vintage": "2021-2022",
        "volume": 154169,
        "priceUsd": 0.73,
        "priceLabel": "$0.73",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2021-2022"
  },
  {
    "id": "VCS 563",
    "pranCode": "PRAN-929",
    "slug": "biomass-based-steam-project",
    "name": "Biomass Based Steam Project",
    "developer": "Sterling Agro Industries Ltd.",
    "country": "India",
    "sector": "Energy Industries",
    "rawTech": "Energy Industries",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 9500,
    "priceUsd": 0.83,
    "priceMaxUsd": 0.83,
    "vintages": [
      "2018"
    ],
    "description": "Uses renewable biomass fuel to generate steam for industrial operations in Uttar Pradesh, India, displacing fossil-fuel steam generation.",
    "listings": [
      {
        "vintage": "2018",
        "volume": 9500,
        "priceUsd": 0.83,
        "priceLabel": "$0.83",
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2018"
  },
  {
    "id": "VCS 1457",
    "pranCode": "PRAN-1457",
    "slug": "bolu-waste-heat-recovery",
    "name": "Bolu Waste Heat Recovery",
    "developer": null,
    "country": "Türkiye",
    "sector": "Waste & Biogas",
    "rawTech": "Waste Heat Recovery",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 225000,
    "priceUsd": 0.73,
    "priceMaxUsd": 0.73,
    "vintages": [
      "2022",
      "2023"
    ],
    "description": "A waste & biogas project in Türkiye, issued under Verra (VCS 1457). 225,000 tCO₂e listed for vintage 2022–2023. Available spot.",
    "listings": [
      {
        "vintage": "2022",
        "volume": 125000,
        "priceUsd": 0.73,
        "priceLabel": "$0.73",
        "delivery": "Spot",
        "note": null
      },
      {
        "vintage": "2023",
        "volume": 100000,
        "priceUsd": 0.73,
        "priceLabel": "$0.73",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2022–2023"
  },
  {
    "id": "VCS 2889",
    "pranCode": "PRAN-2889",
    "slug": "boomitra-carbon-farming-south-of-the-vindhyas",
    "name": "Boomitra Carbon Farming South of the Vindhyas",
    "developer": null,
    "country": "India",
    "sector": "Agriculture & Soil",
    "rawTech": "AFOLU (ALM)",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 170000,
    "priceUsd": 23.0,
    "priceMaxUsd": 24.0,
    "vintages": [
      "2020-2024",
      "2024"
    ],
    "description": "An agriculture & soil project in India, issued under Verra (VCS 2889). 170,000 tCO₂e listed for vintage 2020-2024–2024. Available forward and spot.",
    "listings": [
      {
        "vintage": "2024",
        "volume": 70000,
        "priceUsd": 24.0,
        "priceLabel": "$24",
        "delivery": "Forward",
        "note": null
      },
      {
        "vintage": "2020-2024",
        "volume": 100000,
        "priceUsd": 23.0,
        "priceLabel": "$23 onwards",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2020-2024–2024"
  },
  {
    "id": "VCS 3774",
    "pranCode": "PRAN-3774",
    "slug": "boomitra-carbon-farming-in-east-africa-through-soil-enrichment",
    "name": "Boomitra Carbon Farming in East Africa through Soil Enrichment",
    "developer": null,
    "country": "Kenya",
    "sector": "Agriculture & Soil",
    "rawTech": "ALM",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 100000,
    "priceUsd": 27.0,
    "priceMaxUsd": 27.0,
    "vintages": [
      "2021-2023"
    ],
    "description": "An agriculture & soil project in Kenya, issued under Verra (VCS 3774). 100,000 tCO₂e listed for vintage 2021-2023. Available spot.",
    "listings": [
      {
        "vintage": "2021-2023",
        "volume": 100000,
        "priceUsd": 27.0,
        "priceLabel": "$27 onwards",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2021-2023"
  },
  {
    "id": "VCS2887",
    "pranCode": "PRAN-2887",
    "slug": "boomitra-grassland-restoration-in-northern-mexico",
    "name": "Boomitra Grassland Restoration in Northern Mexico",
    "developer": null,
    "country": "Mexico",
    "sector": "Afforestation & Reforestation",
    "rawTech": "AFOLU",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 10000,
    "priceUsd": 27.0,
    "priceMaxUsd": 27.0,
    "vintages": [
      "2022"
    ],
    "description": "An afforestation & reforestation project in Mexico, issued under Verra (VCS2887). 10,000 tCO₂e listed for vintage 2022. Available issued.",
    "listings": [
      {
        "vintage": "2022",
        "volume": 10000,
        "priceUsd": 27.0,
        "priceLabel": "$27",
        "delivery": "Issued",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2022"
  },
  {
    "id": "VCS 2887",
    "pranCode": "PRAN-2887-VCS",
    "slug": "boomitra-grassland-restoration-in-northern-mexico-vcs-2887",
    "name": "Boomitra Grassland Restoration in Northern Mexico",
    "developer": null,
    "country": "Mexico",
    "sector": "Agriculture & Soil",
    "rawTech": "ALM",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 100000,
    "priceUsd": 19.0,
    "priceMaxUsd": 19.0,
    "vintages": [
      "2019-2022"
    ],
    "description": "An agriculture & soil project in Mexico, issued under Verra (VCS 2887). 100,000 tCO₂e listed for vintage 2019-2022. Available spot.",
    "listings": [
      {
        "vintage": "2019-2022",
        "volume": 100000,
        "priceUsd": 19.0,
        "priceLabel": "$19 onwards",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2019-2022"
  },
  {
    "id": "VCS 1767",
    "pranCode": "PRAN-985",
    "slug": "bundled-solar-power-project",
    "name": "Bundled Solar Power Project",
    "developer": "Mahindra Susten Private Limited",
    "country": "India",
    "sector": "Renewable Energy",
    "rawTech": "Renewable Energy",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 329360,
    "priceUsd": 2.0,
    "priceMaxUsd": 2.0,
    "vintages": [
      "2021"
    ],
    "description": "A large-scale renewable-energy initiative comprising multiple grid-connected solar PV installations across Telangana, Gujarat, and Rajasthan.",
    "listings": [
      {
        "vintage": "2021",
        "volume": 329360,
        "priceUsd": 2.0,
        "priceLabel": "$2",
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2021"
  },
  {
    "id": "VCS 5047",
    "pranCode": "PRAN-5047",
    "slug": "earth-maa-llc-bamboo-cashewnut-and-mango-plantations-for-farmers-economic-upgrade",
    "name": "EARTH MAA LLC- BAMBOO, CASHEWNUT AND MANGO PLANTATIONS FOR FARMERS ECONOMIC UPGRADE",
    "developer": null,
    "country": "India",
    "sector": "Afforestation & Reforestation",
    "rawTech": "ARR",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 38076,
    "priceUsd": 25.0,
    "priceMaxUsd": 25.0,
    "vintages": [
      "2025"
    ],
    "description": "An afforestation & reforestation project in India, issued under Verra (VCS 5047). 38,076 tCO₂e listed for vintage 2025. Available forward.",
    "listings": [
      {
        "vintage": "2025",
        "volume": 38076,
        "priceUsd": 25.0,
        "priceLabel": "$25",
        "delivery": "Forward",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2025"
  },
  {
    "id": "VCS 4229",
    "pranCode": "PRAN-4229",
    "slug": "enew-sakhi-improved-cookstoves-01",
    "name": "ENEW SAKHI - IMPROVED COOKSTOVES - 01",
    "developer": null,
    "country": "India",
    "sector": "Clean Cookstoves",
    "rawTech": "CookStoves",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 109994,
    "priceUsd": 0.83,
    "priceMaxUsd": 0.83,
    "vintages": [
      "2023"
    ],
    "description": "A clean cookstoves project in India, issued under Verra (VCS 4229). 109,994 tCO₂e listed for vintage 2023. Available spot.",
    "listings": [
      {
        "vintage": "2023",
        "volume": 109994,
        "priceUsd": 0.83,
        "priceLabel": "$0.83",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2023"
  },
  {
    "id": "VCS 1792",
    "pranCode": "PRAN-1792",
    "slug": "ghani-solar-renewable-power-project-by-greenko-group",
    "name": "Ghani Solar Renewable Power Project by Greenko Group",
    "developer": null,
    "country": "India",
    "sector": "Solar",
    "rawTech": "Solar",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 1211682,
    "priceUsd": 0.83,
    "priceMaxUsd": 0.83,
    "vintages": [
      "2021-2022"
    ],
    "description": "A solar project in India, issued under Verra (VCS 1792). 1,211,682 tCO₂e listed for vintage 2021-2022. Available spot.",
    "listings": [
      {
        "vintage": "2021-2022",
        "volume": 1211682,
        "priceUsd": 0.83,
        "priceLabel": "$0.83",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2021-2022"
  },
  {
    "id": "VCS 911",
    "pranCode": "PRAN-911",
    "slug": "grid-connected-wind-energy-project-in-tamil-nadu",
    "name": "Grid Connected Wind Energy Project in Tamil Nadu",
    "developer": null,
    "country": "India",
    "sector": "Wind",
    "rawTech": "Wind",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 10752,
    "priceUsd": 0.71,
    "priceMaxUsd": 0.71,
    "vintages": [
      "2022"
    ],
    "description": "A wind project in India, issued under Verra (VCS 911). 10,752 tCO₂e listed for vintage 2022. Available spot.",
    "listings": [
      {
        "vintage": "2022",
        "volume": 10752,
        "priceUsd": 0.71,
        "priceLabel": "$0.71",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2022"
  },
  {
    "id": "VCS 1530",
    "pranCode": "PRAN-1530",
    "slug": "grouped-project-for-commercial-forest-plantations-initiatives-in-the-department-of-vichada",
    "name": "Grouped Project for Commercial Forest Plantations Initiatives in the Department of Vichada",
    "developer": null,
    "country": "Colombia",
    "sector": "Afforestation & Reforestation",
    "rawTech": "ARR (AFOLU)",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 76585,
    "priceUsd": 16.0,
    "priceMaxUsd": 16.0,
    "vintages": [
      "2017-2024"
    ],
    "description": "An afforestation & reforestation project in Colombia, issued under Verra (VCS 1530). 76,585 tCO₂e listed for vintage 2017-2024. Available spot.",
    "listings": [
      {
        "vintage": "2017-2024",
        "volume": 76585,
        "priceUsd": 16.0,
        "priceLabel": "$16-$21",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2017-2024"
  },
  {
    "id": "VCS 2890",
    "pranCode": "PRAN-2890",
    "slug": "installation-of-high-efficiency-wood-burning-cookstoves-in-zimbabwe-project-2",
    "name": "Installation of high efficiency wood burning cookstoves in Zimbabwe - Project 2",
    "developer": null,
    "country": "Zimbabwe",
    "sector": "Clean Cookstoves",
    "rawTech": "Cookstoves",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 70000,
    "priceUsd": 25.0,
    "priceMaxUsd": 25.0,
    "vintages": [
      "2025"
    ],
    "description": "A clean cookstoves project in Zimbabwe, issued under Verra (VCS 2890). 70,000 tCO₂e listed for vintage 2025. Available forward.",
    "listings": [
      {
        "vintage": "2025",
        "volume": 70000,
        "priceUsd": 25.0,
        "priceLabel": "$25",
        "delivery": "Forward",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2025"
  },
  {
    "id": "VCS 1736",
    "pranCode": "PRAN-981",
    "slug": "jurong-island-plant",
    "name": "Jurong Island, Plant",
    "developer": "PacificLight Power Pte. Ltd.",
    "country": "Singapore",
    "sector": "Energy Industries",
    "rawTech": "Energy Industries",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 57991,
    "priceUsd": 4.0,
    "priceMaxUsd": 4.0,
    "vintages": [
      "2020"
    ],
    "description": "A utility-scale power-generation facility located in Singapore and operated by PacificLight Power Pte. Ltd.",
    "listings": [
      {
        "vintage": "2020",
        "volume": 57991,
        "priceUsd": 4.0,
        "priceLabel": "$4",
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2020"
  },
  {
    "id": "VCS 3425",
    "pranCode": "PRAN-3425",
    "slug": "kwamisa-other-reserves-community-forest-project",
    "name": "Kwamisa/Other reserves community Forest Project",
    "developer": null,
    "country": "Ghana",
    "sector": "Afforestation & Reforestation",
    "rawTech": "ARR",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 24383,
    "priceUsd": 22.0,
    "priceMaxUsd": 24.0,
    "vintages": [
      "2020",
      "2021",
      "2022",
      "2023"
    ],
    "description": "An afforestation & reforestation project in Ghana, issued under Verra (VCS 3425). 24,383 tCO₂e listed for vintage 2020–2023. Available spot.",
    "listings": [
      {
        "vintage": "2020",
        "volume": 3529,
        "priceUsd": 22.0,
        "priceLabel": "$22",
        "delivery": "Spot",
        "note": null
      },
      {
        "vintage": "2021",
        "volume": 5982,
        "priceUsd": 22.0,
        "priceLabel": "$22",
        "delivery": "Spot",
        "note": null
      },
      {
        "vintage": "2022",
        "volume": 8934,
        "priceUsd": 23.0,
        "priceLabel": "$23",
        "delivery": "Spot",
        "note": null
      },
      {
        "vintage": "2023",
        "volume": 5938,
        "priceUsd": 24.0,
        "priceLabel": "$24",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2020–2023"
  },
  {
    "id": "VCS 1791",
    "pranCode": "PRAN-1791",
    "slug": "pavagada-solar-renewable-power-project-by-greenko-group",
    "name": "Pavagada Solar Renewable Power Project by Greenko Group",
    "developer": null,
    "country": "India",
    "sector": "Solar",
    "rawTech": "Solar",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 230711,
    "priceUsd": 0.73,
    "priceMaxUsd": 0.73,
    "vintages": [
      "2021-2022"
    ],
    "description": "A solar project in India, issued under Verra (VCS 1791). 230,711 tCO₂e listed for vintage 2021-2022. Available spot.",
    "listings": [
      {
        "vintage": "2021-2022",
        "volume": 230711,
        "priceUsd": 0.73,
        "priceLabel": "$0.73",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2021-2022"
  },
  {
    "id": "VCS 4982",
    "pranCode": "PRAN-4982",
    "slug": "rbml-reliance-bp-mobility-limited-ev-charging-infrastructure-project",
    "name": "RBML (Reliance BP Mobility Limited) EV Charging Infrastructure Project",
    "developer": null,
    "country": "India",
    "sector": "E-Mobility",
    "rawTech": "EV Charging Station",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 2888,
    "priceUsd": 5.0,
    "priceMaxUsd": 5.0,
    "vintages": [
      "2022-2024"
    ],
    "description": "An e-mobility project in India, issued under Verra (VCS 4982). 2,888 tCO₂e listed for vintage 2022-2024. Available spot.",
    "listings": [
      {
        "vintage": "2022-2024",
        "volume": 2888,
        "priceUsd": 5.0,
        "priceLabel": "$5",
        "delivery": "Spot",
        "note": "~40kt to be issued for 2024-25 vintage"
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2022-2024"
  },
  {
    "id": "VCS2590",
    "pranCode": "PRAN-2590",
    "slug": "regenerative-agriculture-in-rice-wheat-maize-system-for-income-generation",
    "name": "REGENERATIVE AGRICULTURE IN RICE-WHEAT-MAIZE SYSTEM FOR INCOME GENERATION",
    "developer": null,
    "country": "India",
    "sector": "Afforestation & Reforestation",
    "rawTech": "AFOLU",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 57000,
    "priceUsd": 28.0,
    "priceMaxUsd": 28.0,
    "vintages": [
      "2019-2022"
    ],
    "description": "An afforestation & reforestation project in India, issued under Verra (VCS2590). 57,000 tCO₂e listed for vintage 2019-2022. Available forward.",
    "listings": [
      {
        "vintage": "2019-2022",
        "volume": 57000,
        "priceUsd": 28.0,
        "priceLabel": "$28",
        "delivery": "Forward",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2019-2022"
  },
  {
    "id": "VCS 1650",
    "pranCode": "PRAN-1650-VCS",
    "slug": "reduced-emissions-from-deforestation-and-degradation-in-keo-seima-wildlife-sanctuary",
    "name": "Reduced Emissions from Deforestation and Degradation in Keo Seima Wildlife Sanctuary",
    "developer": null,
    "country": "Cambodia",
    "sector": "REDD+ Forest Conservation",
    "rawTech": "REDD+",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 86572,
    "priceUsd": 10.0,
    "priceMaxUsd": 10.0,
    "vintages": [
      "2021"
    ],
    "description": "A redd+ forest conservation project in Cambodia, issued under Verra (VCS 1650). 86,572 tCO₂e listed for vintage 2021. Available spot.",
    "listings": [
      {
        "vintage": "2021",
        "volume": 86572,
        "priceUsd": 10.0,
        "priceLabel": "$10",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2021"
  },
  {
    "id": "VCS 2404",
    "pranCode": "PRAN-2404",
    "slug": "reforestation-of-degraded-land",
    "name": "Reforestation of Degraded Land",
    "developer": "MTPL",
    "country": "India",
    "sector": "Afforestation & Reforestation",
    "rawTech": "AFOLU",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 146998,
    "priceUsd": 5.0,
    "priceMaxUsd": 5.0,
    "vintages": [
      "2011"
    ],
    "description": "A large-scale afforestation, reforestation and revegetation (ARR) initiative restoring degraded forest landscapes across Odisha, Andhra Pradesh, and Chhattisgarh.",
    "listings": [
      {
        "vintage": "2011",
        "volume": 146998,
        "priceUsd": 5.0,
        "priceLabel": "$5",
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2011"
  },
  {
    "id": "VCS1787",
    "pranCode": "PRAN-1787",
    "slug": "renewable-power-project-by-animala-wind-power-private-limited",
    "name": "Renewable Power Project by Animala Wind Power Private Limited",
    "developer": null,
    "country": "India",
    "sector": "Wind",
    "rawTech": "Wind",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 296625,
    "priceUsd": 0.73,
    "priceMaxUsd": 0.73,
    "vintages": [
      "2021-2022"
    ],
    "description": "A wind project in India, issued under Verra (VCS1787). 296,625 tCO₂e listed for vintage 2021-2022. Available spot.",
    "listings": [
      {
        "vintage": "2021-2022",
        "volume": 296625,
        "priceUsd": 0.73,
        "priceLabel": "$0.73",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2021-2022"
  },
  {
    "id": "VCS 1789",
    "pranCode": "PRAN-1789",
    "slug": "renewable-power-project-by-sei-kathiravan-power-private-limited",
    "name": "Renewable Power Project by SEI Kathiravan Power Private Limited",
    "developer": null,
    "country": "India",
    "sector": "Solar",
    "rawTech": "Solar",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 183078,
    "priceUsd": 0.73,
    "priceMaxUsd": 0.73,
    "vintages": [
      "2021-2022"
    ],
    "description": "A solar project in India, issued under Verra (VCS 1789). 183,078 tCO₂e listed for vintage 2021-2022. Available spot.",
    "listings": [
      {
        "vintage": "2021-2022",
        "volume": 183078,
        "priceUsd": 0.73,
        "priceLabel": "$0.73",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2021-2022"
  },
  {
    "id": "VCS 1851",
    "pranCode": "PRAN-1851",
    "slug": "renewable-solar-power-project-by-renew-solar-power-private-limited",
    "name": "Renewable Solar Power Project by ReNew Solar Power Private Limited",
    "developer": null,
    "country": "India",
    "sector": "Solar",
    "rawTech": "Solar",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 112146,
    "priceUsd": 0.52,
    "priceMaxUsd": 0.52,
    "vintages": [
      "2024"
    ],
    "description": "A solar project in India, issued under Verra (VCS 1851). 112,146 tCO₂e listed for vintage 2024. Available spot.",
    "listings": [
      {
        "vintage": "2024",
        "volume": 112146,
        "priceUsd": 0.52,
        "priceLabel": "$0.52",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2024"
  },
  {
    "id": "VCS 2252",
    "pranCode": "PRAN-2252",
    "slug": "rio-anapu-pacaja-redd-project",
    "name": "Rio Anapu-Pacaja REDD Project",
    "developer": null,
    "country": "Brazil",
    "sector": "REDD+ Forest Conservation",
    "rawTech": "REDD+ (AFOLU)",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 100000,
    "priceUsd": 5.0,
    "priceMaxUsd": 5.0,
    "vintages": [
      "2020"
    ],
    "description": "A redd+ forest conservation project in Brazil, issued under Verra (VCS 2252). 100,000 tCO₂e listed for vintage 2020. Available spot.",
    "listings": [
      {
        "vintage": "2020",
        "volume": 100000,
        "priceUsd": 5.0,
        "priceLabel": "$5",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2020"
  },
  {
    "id": "VCS 4000",
    "pranCode": "PRAN-4000",
    "slug": "rwanda-cookstoves",
    "name": "Rwanda Cookstoves",
    "developer": null,
    "country": "Rwanda",
    "sector": "Clean Cookstoves",
    "rawTech": "Cookstoves",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 50000,
    "priceUsd": 21.0,
    "priceMaxUsd": 21.0,
    "vintages": [
      "2023-2024"
    ],
    "description": "A clean cookstoves project in Rwanda, issued under Verra (VCS 4000). 50,000 tCO₂e listed for vintage 2023-2024. Available spot.",
    "listings": [
      {
        "vintage": "2023-2024",
        "volume": 50000,
        "priceUsd": 21.0,
        "priceLabel": "$21",
        "delivery": "Spot",
        "note": "Corsia CP1 Tagged"
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2023-2024"
  },
  {
    "id": "VCS 3699",
    "pranCode": "PRAN-3699",
    "slug": "rwanda-cookstoves-vcs-3699",
    "name": "Rwanda Cookstoves",
    "developer": null,
    "country": "Rwanda",
    "sector": "Clean Cookstoves",
    "rawTech": "Cookstoves",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 50000,
    "priceUsd": 21.0,
    "priceMaxUsd": 21.0,
    "vintages": [
      "2021-2022"
    ],
    "description": "A clean cookstoves project in Rwanda, issued under Verra (VCS 3699). 50,000 tCO₂e listed for vintage 2021-2022. Available spot.",
    "listings": [
      {
        "vintage": "2021-2022",
        "volume": 50000,
        "priceUsd": 21.0,
        "priceLabel": "$21",
        "delivery": "Spot",
        "note": "Only V24s are tagged on Verra as corsia eligible"
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2021-2022"
  },
  {
    "id": "VCS2750",
    "pranCode": "PRAN-2750",
    "slug": "saving-colombia-s-cloud-forest",
    "name": "Saving Colombia's Cloud Forest",
    "developer": null,
    "country": "Colombia",
    "sector": "Afforestation & Reforestation",
    "rawTech": "ARR (AFOLU)",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": null,
    "priceUsd": null,
    "priceMaxUsd": null,
    "vintages": [
      "TBD"
    ],
    "description": "An afforestation & reforestation project in Colombia, issued under Verra (VCS2750). Available forward.",
    "listings": [
      {
        "vintage": "TBD",
        "volume": null,
        "priceUsd": null,
        "priceLabel": null,
        "delivery": "Forward",
        "note": "BeZero BBB | Sylvera A (Removals | Contact for future issuances"
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "TBD"
  },
  {
    "id": "VCS5035",
    "pranCode": "PRAN-5035",
    "slug": "silk-grass-biochar-project",
    "name": "Silk Grass Biochar Project",
    "developer": null,
    "country": "Belize",
    "sector": "Biochar",
    "rawTech": "Biochar",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": null,
    "priceUsd": null,
    "priceMaxUsd": null,
    "vintages": [
      "TBD"
    ],
    "description": "A biochar project in Belize, issued under Verra (VCS5035). Available forward.",
    "listings": [
      {
        "vintage": "TBD",
        "volume": null,
        "priceUsd": null,
        "priceLabel": null,
        "delivery": "Forward",
        "note": "Removals | Contact for future issuances"
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "TBD"
  },
  {
    "id": "VCS 1020",
    "pranCode": "PRAN-1020",
    "slug": "solar-power-plant-of-15mw-in-gujarat-by-palace-solar-energy-private-limited",
    "name": "Solar Power Plant of 15MW in Gujarat by Palace Solar Energy Private Limited",
    "developer": null,
    "country": "India",
    "sector": "Solar",
    "rawTech": "Solar",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 21992,
    "priceUsd": 0.73,
    "priceMaxUsd": 0.73,
    "vintages": [
      "2022"
    ],
    "description": "A solar project in India, issued under Verra (VCS 1020). 21,992 tCO₂e listed for vintage 2022. Available spot.",
    "listings": [
      {
        "vintage": "2022",
        "volume": 21992,
        "priceUsd": 0.73,
        "priceLabel": "$0.73",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2022"
  },
  {
    "id": "VCS 1026",
    "pranCode": "PRAN-1026",
    "slug": "solar-power-plant-of-5-mw-in-rajasthan-by-essel-mining-and-refex-refrigerants-limited",
    "name": "Solar Power Plant of 5 MW in Rajasthan by Essel Mining and Refex Refrigerants Limited",
    "developer": null,
    "country": "India",
    "sector": "Solar",
    "rawTech": "Solar",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 8996,
    "priceUsd": 0.73,
    "priceMaxUsd": 0.73,
    "vintages": [
      "2022",
      "2023"
    ],
    "description": "A solar project in India, issued under Verra (VCS 1026). 8,996 tCO₂e listed for vintage 2022–2023. Available spot.",
    "listings": [
      {
        "vintage": "2022",
        "volume": 3278,
        "priceUsd": 0.73,
        "priceLabel": "$0.73",
        "delivery": "Spot",
        "note": null
      },
      {
        "vintage": "2023",
        "volume": 5718,
        "priceUsd": 0.73,
        "priceLabel": "$0.73",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2022–2023"
  },
  {
    "id": "VCS 1748",
    "pranCode": "PRAN-1748",
    "slug": "the-southern-cardamom-redd-project-scrp",
    "name": "The Southern Cardamom REDD+ Project (SCRP)",
    "developer": null,
    "country": "Cambodia",
    "sector": "REDD+ Forest Conservation",
    "rawTech": "REDD+",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 568000,
    "priceUsd": 5.0,
    "priceMaxUsd": 5.0,
    "vintages": [
      "2020-21",
      "2021"
    ],
    "description": "A redd+ forest conservation project in Cambodia, issued under Verra (VCS 1748). 568,000 tCO₂e listed for vintage 2020-21–2021. Available spot.",
    "listings": [
      {
        "vintage": "2021",
        "volume": 68000,
        "priceUsd": 5.0,
        "priceLabel": "$5",
        "delivery": "Spot",
        "note": null
      },
      {
        "vintage": "2020-21",
        "volume": 500000,
        "priceUsd": 5.0,
        "priceLabel": "$5",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2020-21–2021"
  },
  {
    "id": "VCS 1941",
    "pranCode": "PRAN-1941",
    "slug": "sustainable-city-projects",
    "name": "Sustainable City Projects",
    "developer": "Indore Smart City Development Ltd.",
    "country": "India",
    "sector": "Waste & Biogas",
    "rawTech": "Waste Handling & Disposal",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 283396,
    "priceUsd": 4.0,
    "priceMaxUsd": 4.0,
    "vintages": [
      "2020"
    ],
    "description": "An integrated urban-sustainability initiative at India's cleanest city, Indore, developed by Indore Smart City Development Ltd.",
    "listings": [
      {
        "vintage": "2020",
        "volume": 283396,
        "priceUsd": 4.0,
        "priceLabel": "$4",
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2020"
  },
  {
    "id": "VCS 2483",
    "pranCode": "PRAN-2483",
    "slug": "tavolo-community-forest-conservation-project",
    "name": "Tavolo Community Forest Conservation Project",
    "developer": null,
    "country": "Papua New Guinea",
    "sector": "REDD+ Forest Conservation",
    "rawTech": "REDD",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 200000,
    "priceUsd": 13.0,
    "priceMaxUsd": 13.0,
    "vintages": [
      "2020",
      "2021"
    ],
    "description": "A redd+ forest conservation project in Papua New Guinea, issued under Verra (VCS 2483). 200,000 tCO₂e listed for vintage 2020–2021. Available spot.",
    "listings": [
      {
        "vintage": "2020",
        "volume": 100000,
        "priceUsd": 13.0,
        "priceLabel": "$13",
        "delivery": "Spot",
        "note": null
      },
      {
        "vintage": "2021",
        "volume": 100000,
        "priceUsd": 13.0,
        "priceLabel": "$13",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2020–2021"
  },
  {
    "id": "VCS 2508",
    "pranCode": "PRAN-2508",
    "slug": "unitor-redd-project",
    "name": "UNITOR REDD+ PROJECT",
    "developer": null,
    "country": "Brazil",
    "sector": "REDD+ Forest Conservation",
    "rawTech": "REDD+ (AFOLU)",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 45000,
    "priceUsd": 5.0,
    "priceMaxUsd": 5.0,
    "vintages": [
      "2020-21"
    ],
    "description": "A redd+ forest conservation project in Brazil, issued under Verra (VCS 2508). 45,000 tCO₂e listed for vintage 2020-21. Available spot.",
    "listings": [
      {
        "vintage": "2020-21",
        "volume": 45000,
        "priceUsd": 5.0,
        "priceLabel": "$5",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2020-21"
  },
  {
    "id": "VCS 1404",
    "pranCode": "PRAN-1404",
    "slug": "vaspet-ii-and-vaspet-iii-wind-power-project-maharashtra",
    "name": "Vaspet-II and Vaspet-III Wind Power Project, Maharashtra",
    "developer": null,
    "country": "India",
    "sector": "Wind",
    "rawTech": "Wind",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 3666,
    "priceUsd": 0.52,
    "priceMaxUsd": 0.52,
    "vintages": [
      "2023"
    ],
    "description": "A wind project in India, issued under Verra (VCS 1404). 3,666 tCO₂e listed for vintage 2023. Available spot.",
    "listings": [
      {
        "vintage": "2023",
        "volume": 3666,
        "priceUsd": 0.52,
        "priceLabel": "$0.52",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2023"
  },
  {
    "id": "VCS 1481",
    "pranCode": "PRAN-1481",
    "slug": "wind-power-project-in-maharashtra-india",
    "name": "Wind power project in Maharashtra, India",
    "developer": null,
    "country": "India",
    "sector": "Wind",
    "rawTech": "Wind",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 90250,
    "priceUsd": 0.85,
    "priceMaxUsd": 0.85,
    "vintages": [
      "2024"
    ],
    "description": "A wind project in India, issued under Verra (VCS 1481). 90,250 tCO₂e listed for vintage 2024. Available spot.",
    "listings": [
      {
        "vintage": "2024",
        "volume": 90250,
        "priceUsd": 0.85,
        "priceLabel": "$0.85",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2024"
  },
  {
    "id": "VCS 1480",
    "pranCode": "PRAN-1480",
    "slug": "wind-power-project-in-maharashtra-india-vcs-1480",
    "name": "Wind power project in Maharashtra, India",
    "developer": null,
    "country": "India",
    "sector": "Wind",
    "rawTech": "Wind",
    "registry": "Verra",
    "standardCode": "VCS",
    "totalVolume": 42798,
    "priceUsd": 0.85,
    "priceMaxUsd": 0.85,
    "vintages": [
      "2024"
    ],
    "description": "A wind project in India, issued under Verra (VCS 1480). 42,798 tCO₂e listed for vintage 2024. Available spot.",
    "listings": [
      {
        "vintage": "2024",
        "volume": 42798,
        "priceUsd": 0.85,
        "priceLabel": "$0.85",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2024"
  },
  {
    "id": "GS 6290",
    "pranCode": "PRAN-6290",
    "slug": "200-mw-wind-power-project-in-tamil-nadu-by-orange-sironj",
    "name": "200 MW Wind Power Project in Tamil Nadu by Orange Sironj",
    "developer": null,
    "country": "India",
    "sector": "Wind",
    "rawTech": "Wind",
    "registry": "Gold Standard",
    "standardCode": "GS",
    "totalVolume": 200000,
    "priceUsd": 0.95,
    "priceMaxUsd": 0.95,
    "vintages": [
      "2021-2022"
    ],
    "description": "A wind project in India, issued under Gold Standard (GS 6290). 200,000 tCO₂e listed for vintage 2021-2022. Available spot.",
    "listings": [
      {
        "vintage": "2021-2022",
        "volume": 200000,
        "priceUsd": 0.95,
        "priceLabel": "$0.95",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2021-2022"
  },
  {
    "id": "GS 6999",
    "pranCode": "PRAN-1190",
    "slug": "21-mw-wind-energy-project",
    "name": "21 MW Wind Energy Project",
    "developer": "Shree Cement Limited",
    "country": "India",
    "sector": "Renewable Energy",
    "rawTech": "Renewable Energy",
    "registry": "Gold Standard",
    "standardCode": "GS",
    "totalVolume": 45317,
    "priceUsd": 2.0,
    "priceMaxUsd": 2.0,
    "vintages": [
      "2021"
    ],
    "description": "A Gold Standard certified 21 MW wind energy project by Shree Cement Limited, generating clean grid-connected electricity.",
    "listings": [
      {
        "vintage": "2021",
        "volume": 45317,
        "priceUsd": 2.0,
        "priceLabel": "$2",
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2021"
  },
  {
    "id": "GS 7745",
    "pranCode": "PRAN-7745",
    "slug": "300-mw-wind-power-project-in-gujarat-by-alfanar",
    "name": "300 MW Wind Power Project in Gujarat by Alfanar",
    "developer": null,
    "country": "India",
    "sector": "Wind",
    "rawTech": "Wind",
    "registry": "Gold Standard",
    "standardCode": "GS",
    "totalVolume": 200000,
    "priceUsd": 0.95,
    "priceMaxUsd": 0.95,
    "vintages": [
      "2020-2022"
    ],
    "description": "A wind project in India, issued under Gold Standard (GS 7745). 200,000 tCO₂e listed for vintage 2020-2022. Available spot.",
    "listings": [
      {
        "vintage": "2020-2022",
        "volume": 200000,
        "priceUsd": 0.95,
        "priceLabel": "$0.95",
        "delivery": "Spot",
        "note": "BB Rating from BeZero"
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2020-2022"
  },
  {
    "id": "GS 11401",
    "pranCode": "PRAN-1525",
    "slug": "bhesada-wind-power-project-in-rajasthan",
    "name": "Bhesada Wind Power Project in Rajasthan",
    "developer": null,
    "country": "India",
    "sector": "Renewable Energy",
    "rawTech": "Renewable Energy",
    "registry": "Gold Standard",
    "standardCode": "GS",
    "totalVolume": 216142,
    "priceUsd": 0.67,
    "priceMaxUsd": 2.0,
    "vintages": [
      "2024"
    ],
    "description": "A large-scale renewable-energy initiative located in Rajasthan, India, displacing fossil-fuel generation on the national grid.",
    "listings": [
      {
        "vintage": "2024",
        "volume": 185075,
        "priceUsd": 2.0,
        "priceLabel": "$2",
        "delivery": null,
        "note": null
      },
      {
        "vintage": "2024",
        "volume": 31067,
        "priceUsd": 0.67,
        "priceLabel": "$0.67",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2024"
  },
  {
    "id": "GS 11677",
    "pranCode": "PRAN-11677",
    "slug": "malawi-cookstoves",
    "name": "Malawi Cookstoves",
    "developer": null,
    "country": "Malawi",
    "sector": "Clean Cookstoves",
    "rawTech": "Cookstoves",
    "registry": "Gold Standard",
    "standardCode": "GS",
    "totalVolume": 25000,
    "priceUsd": 23.0,
    "priceMaxUsd": 23.0,
    "vintages": [
      "2021-2022"
    ],
    "description": "A clean cookstoves project in Malawi, issued under Gold Standard (GS 11677). 25,000 tCO₂e listed for vintage 2021-2022. Available spot.",
    "listings": [
      {
        "vintage": "2021-2022",
        "volume": 25000,
        "priceUsd": 23.0,
        "priceLabel": "$23",
        "delivery": "Spot",
        "note": "Corsia Eligible"
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2021-2022"
  },
  {
    "id": "GS12668",
    "pranCode": "PRAN-12668",
    "slug": "rvpa-1-water-purifier-project-in-maharashtra-india-by-seniority-pvt-ltd-vpa-2",
    "name": "RVPA-1 Water Purifier Project in Maharashtra, India by Seniority Pvt. Ltd. - VPA-2",
    "developer": null,
    "country": "India",
    "sector": "Safe Water",
    "rawTech": "Safe Drinking Water",
    "registry": "Gold Standard",
    "standardCode": "GS",
    "totalVolume": 1379,
    "priceUsd": 7.0,
    "priceMaxUsd": 7.0,
    "vintages": [
      "2024"
    ],
    "description": "A safe water project in India, issued under Gold Standard (GS12668). 1,379 tCO₂e listed for vintage 2024. Available spot.",
    "listings": [
      {
        "vintage": "2024",
        "volume": 1379,
        "priceUsd": 7.0,
        "priceLabel": "$7",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2024"
  },
  {
    "id": "GS 11403",
    "pranCode": "PRAN-11403",
    "slug": "rajgarh-wind-power-project-in-rajasthan",
    "name": "Rajgarh Wind Power Project in Rajasthan",
    "developer": null,
    "country": "India",
    "sector": "Wind",
    "rawTech": "Wind",
    "registry": "Gold Standard",
    "standardCode": "GS",
    "totalVolume": 20638,
    "priceUsd": 0.66,
    "priceMaxUsd": 0.67,
    "vintages": [
      "2023",
      "2024"
    ],
    "description": "A wind project in India, issued under Gold Standard (GS 11403). 20,638 tCO₂e listed for vintage 2023–2024. Available spot.",
    "listings": [
      {
        "vintage": "2023",
        "volume": 4205,
        "priceUsd": 0.66,
        "priceLabel": "$0.66",
        "delivery": "Spot",
        "note": null
      },
      {
        "vintage": "2024",
        "volume": 16433,
        "priceUsd": 0.67,
        "priceLabel": "$0.67",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2023–2024"
  },
  {
    "id": "GS 11405",
    "pranCode": "PRAN-11405",
    "slug": "renew-solar-power-project-in-ap",
    "name": "ReNew Solar Power Project in AP",
    "developer": null,
    "country": "India",
    "sector": "Solar",
    "rawTech": "Solar",
    "registry": "Gold Standard",
    "standardCode": "GS",
    "totalVolume": 97168,
    "priceUsd": 0.65,
    "priceMaxUsd": 0.67,
    "vintages": [
      "2022",
      "2023",
      "2024"
    ],
    "description": "A solar project in India, issued under Gold Standard (GS 11405). 97,168 tCO₂e listed for vintage 2022–2024. Available spot.",
    "listings": [
      {
        "vintage": "2022",
        "volume": 43080,
        "priceUsd": 0.65,
        "priceLabel": "$0.65",
        "delivery": "Spot",
        "note": null
      },
      {
        "vintage": "2023",
        "volume": 28348,
        "priceUsd": 0.66,
        "priceLabel": "$0.66",
        "delivery": "Spot",
        "note": null
      },
      {
        "vintage": "2024",
        "volume": 25740,
        "priceUsd": 0.67,
        "priceLabel": "$0.67",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2022–2024"
  },
  {
    "id": "GS 12293",
    "pranCode": "PRAN-12293",
    "slug": "renew-sakhi-improved-cookstove-2",
    "name": "Renew Sakhi Improved Cookstove - 2",
    "developer": null,
    "country": "India",
    "sector": "Clean Cookstoves",
    "rawTech": "CookStoves",
    "registry": "Gold Standard",
    "standardCode": "GS",
    "totalVolume": 32919,
    "priceUsd": 2.0,
    "priceMaxUsd": 2.0,
    "vintages": [
      "2023"
    ],
    "description": "A clean cookstoves project in India, issued under Gold Standard (GS 12293). 32,919 tCO₂e listed for vintage 2023. Available spot.",
    "listings": [
      {
        "vintage": "2023",
        "volume": 32919,
        "priceUsd": 2.0,
        "priceLabel": "$2",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2023"
  },
  {
    "id": "GS 11551",
    "pranCode": "PRAN-11551",
    "slug": "tasc-clean-cooking-poa-vpa-2-cicada-carbon-zimbabwe",
    "name": "TASC Clean Cooking PoA – VPA 2 Cicada Carbon (Zimbabwe)",
    "developer": null,
    "country": "Zimbabwe",
    "sector": "Clean Cookstoves",
    "rawTech": "CookStoves",
    "registry": "Gold Standard",
    "standardCode": "GS",
    "totalVolume": 155000,
    "priceUsd": 26.0,
    "priceMaxUsd": 26.0,
    "vintages": [
      "2022-2024"
    ],
    "description": "A clean cookstoves project in Zimbabwe, issued under Gold Standard (GS 11551). 155,000 tCO₂e listed for vintage 2022-2024. Available spot.",
    "listings": [
      {
        "vintage": "2022-2024",
        "volume": 155000,
        "priceUsd": 26.0,
        "priceLabel": "$26",
        "delivery": "Spot",
        "note": "Corsia Eligible Under Article 6 (LOA & CA Received)"
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2022-2024"
  },
  {
    "id": "CDM 9416",
    "pranCode": "PRAN-9416",
    "slug": "poa-9416-promotion-of-renewable-energy-generation-in-india-programme-of-activities",
    "name": "PoA 9416 : Promotion of renewable energy generation in India- Programme of Activities",
    "developer": null,
    "country": "India",
    "sector": "Solar",
    "rawTech": "Solar",
    "registry": "CDM",
    "standardCode": "CDM",
    "totalVolume": 973286,
    "priceUsd": 0.21,
    "priceMaxUsd": 0.21,
    "vintages": [
      "2012-2020"
    ],
    "description": "A solar project in India, issued under CDM (CDM 9416). 973,286 tCO₂e listed for vintage 2012-2020. Available spot.",
    "listings": [
      {
        "vintage": "2012-2020",
        "volume": 973286,
        "priceUsd": 0.21,
        "priceLabel": "$0.21",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2012-2020"
  },
  {
    "id": "GS7668/CDM8312",
    "pranCode": "PRAN-7668",
    "slug": "jeori-hydro-electric-project",
    "name": "Jeori Hydro-Electric Project",
    "developer": null,
    "country": "India",
    "sector": "Hydro",
    "rawTech": "Hydro",
    "registry": "Gold Standard VER",
    "standardCode": "GS CDM",
    "totalVolume": 45431,
    "priceUsd": 0.81,
    "priceMaxUsd": 0.81,
    "vintages": [
      "2019-2020"
    ],
    "description": "A hydro project in India, issued under Gold Standard VER (GS7668/CDM8312). 45,431 tCO₂e listed for vintage 2019-2020. Available spot.",
    "listings": [
      {
        "vintage": "2019-2020",
        "volume": 45431,
        "priceUsd": 0.81,
        "priceLabel": "$0.81",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2019-2020"
  },
  {
    "id": "GS3969",
    "pranCode": "PRAN-3969",
    "slug": "100-5-mw-wind-power-project-in-madhya-pradesh-india",
    "name": "100.5 MW Wind Power Project in Madhya Pradesh, India",
    "developer": null,
    "country": "India",
    "sector": "Wind",
    "rawTech": "Wind",
    "registry": "Gold Standard VER",
    "standardCode": "GSVER",
    "totalVolume": 356627,
    "priceUsd": 0.98,
    "priceMaxUsd": 0.98,
    "vintages": [
      "2021-2022"
    ],
    "description": "A wind project in India, issued under Gold Standard VER (GS3969). 356,627 tCO₂e listed for vintage 2021-2022. Available spot.",
    "listings": [
      {
        "vintage": "2021-2022",
        "volume": 356627,
        "priceUsd": 0.98,
        "priceLabel": "$0.98",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2021-2022"
  },
  {
    "id": "GS5614",
    "pranCode": "PRAN-5614",
    "slug": "100-8-mw-wind-power-project-in-beluguppa-andhra-pradesh",
    "name": "100.8 MW Wind Power Project in Beluguppa, Andhra Pradesh",
    "developer": null,
    "country": "India",
    "sector": "Wind",
    "rawTech": "Wind",
    "registry": "Gold Standard VER",
    "standardCode": "GSVER",
    "totalVolume": 355628,
    "priceUsd": 0.98,
    "priceMaxUsd": 0.98,
    "vintages": [
      "2021-2022"
    ],
    "description": "A wind project in India, issued under Gold Standard VER (GS5614). 355,628 tCO₂e listed for vintage 2021-2022. Available spot.",
    "listings": [
      {
        "vintage": "2021-2022",
        "volume": 355628,
        "priceUsd": 0.98,
        "priceLabel": "$0.98",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2021-2022"
  },
  {
    "id": "GS3965",
    "pranCode": "PRAN-3965",
    "slug": "22-5-mw-wind-power-project-in-rajasthan-india",
    "name": "22.5 MW Wind Power Project in Rajasthan, India",
    "developer": null,
    "country": "India",
    "sector": "Wind",
    "rawTech": "Wind",
    "registry": "Gold Standard VER",
    "standardCode": "GSVER",
    "totalVolume": 62265,
    "priceUsd": 0.98,
    "priceMaxUsd": 0.98,
    "vintages": [
      "2021-2022"
    ],
    "description": "A wind project in India, issued under Gold Standard VER (GS3965). 62,265 tCO₂e listed for vintage 2021-2022. Available spot.",
    "listings": [
      {
        "vintage": "2021-2022",
        "volume": 62265,
        "priceUsd": 0.98,
        "priceLabel": "$0.98",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2021-2022"
  },
  {
    "id": "GS5928",
    "pranCode": "PRAN-5928",
    "slug": "2x50-mw-orange-suvaan-solar-photovoltaic-power-project-in-maharashtra-india",
    "name": "2x50 MW Orange Suvaan Solar Photovoltaic Power Project in Maharashtra, India",
    "developer": null,
    "country": "India",
    "sector": "Solar",
    "rawTech": "Solar",
    "registry": "Gold Standard VER",
    "standardCode": "GSVER",
    "totalVolume": 317993,
    "priceUsd": 0.98,
    "priceMaxUsd": 0.98,
    "vintages": [
      "2021-2022"
    ],
    "description": "A solar project in India, issued under Gold Standard VER (GS5928). 317,993 tCO₂e listed for vintage 2021-2022. Available spot.",
    "listings": [
      {
        "vintage": "2021-2022",
        "volume": 317993,
        "priceUsd": 0.98,
        "priceLabel": "$0.98",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2021-2022"
  },
  {
    "id": "GS4707",
    "pranCode": "PRAN-4707",
    "slug": "34-mw-wind-power-project-at-khanapur-sangli-maharashtra-india",
    "name": "34 MW Wind Power Project at Khanapur, Sangli, Maharashtra, India",
    "developer": null,
    "country": "India",
    "sector": "Wind",
    "rawTech": "Wind",
    "registry": "Gold Standard VER",
    "standardCode": "GSVER",
    "totalVolume": 125041,
    "priceUsd": 0.98,
    "priceMaxUsd": 0.98,
    "vintages": [
      "2021-2022"
    ],
    "description": "A wind project in India, issued under Gold Standard VER (GS4707). 125,041 tCO₂e listed for vintage 2021-2022. Available spot.",
    "listings": [
      {
        "vintage": "2021-2022",
        "volume": 125041,
        "priceUsd": 0.98,
        "priceLabel": "$0.98",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2021-2022"
  },
  {
    "id": "GS5866",
    "pranCode": "PRAN-5866",
    "slug": "40-mw-orange-charanka-solar-power-project-in-gujarat-india",
    "name": "40 MW Orange Charanka Solar Power Project in Gujarat, India",
    "developer": null,
    "country": "India",
    "sector": "Solar",
    "rawTech": "Solar",
    "registry": "Gold Standard VER",
    "standardCode": "GSVER",
    "totalVolume": 167298,
    "priceUsd": 0.98,
    "priceMaxUsd": 0.98,
    "vintages": [
      "2021-2022"
    ],
    "description": "A solar project in India, issued under Gold Standard VER (GS5866). 167,298 tCO₂e listed for vintage 2021-2022. Available spot.",
    "listings": [
      {
        "vintage": "2021-2022",
        "volume": 167298,
        "priceUsd": 0.98,
        "priceLabel": "$0.98",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2021-2022"
  },
  {
    "id": "GS5799",
    "pranCode": "PRAN-5799",
    "slug": "wind-power-project-in-karnataka-by-omwpl",
    "name": "Wind Power Project in Karnataka by OMWPL",
    "developer": null,
    "country": "India",
    "sector": "Wind",
    "rawTech": "Wind",
    "registry": "Gold Standard VER",
    "standardCode": "GSVER",
    "totalVolume": 221654,
    "priceUsd": 0.98,
    "priceMaxUsd": 0.98,
    "vintages": [
      "2021-2022"
    ],
    "description": "A wind project in India, issued under Gold Standard VER (GS5799). 221,654 tCO₂e listed for vintage 2021-2022. Available spot.",
    "listings": [
      {
        "vintage": "2021-2022",
        "volume": 221654,
        "priceUsd": 0.98,
        "priceLabel": "$0.98",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2021-2022"
  },
  {
    "id": "GS4962",
    "pranCode": "PRAN-4962",
    "slug": "wind-power-project-in-madhya-pradesh-by-obwppl",
    "name": "Wind Power Project in Madhya Pradesh by OBWPPL",
    "developer": null,
    "country": "India",
    "sector": "Wind",
    "rawTech": "Wind",
    "registry": "Gold Standard VER",
    "standardCode": "GSVER",
    "totalVolume": 233990,
    "priceUsd": 0.98,
    "priceMaxUsd": 0.98,
    "vintages": [
      "2021-2023"
    ],
    "description": "A wind project in India, issued under Gold Standard VER (GS4962). 233,990 tCO₂e listed for vintage 2021-2023. Available spot.",
    "listings": [
      {
        "vintage": "2021-2023",
        "volume": 233990,
        "priceUsd": 0.98,
        "priceLabel": "$0.98",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2021-2023"
  },
  {
    "id": "GS7630",
    "pranCode": "PRAN-7630",
    "slug": "wind-energy-project-by-kwepl-1",
    "name": "Wind energy project by KWEPL - 1",
    "developer": null,
    "country": "India",
    "sector": "Wind",
    "rawTech": "Wind",
    "registry": "Gold Standard VER",
    "standardCode": "GSVER",
    "totalVolume": 171610,
    "priceUsd": 0.88,
    "priceMaxUsd": 0.88,
    "vintages": [
      "2020-2022"
    ],
    "description": "A wind project in India, issued under Gold Standard VER (GS7630). 171,610 tCO₂e listed for vintage 2020-2022. Available spot.",
    "listings": [
      {
        "vintage": "2020-2022",
        "volume": 171610,
        "priceUsd": 0.88,
        "priceLabel": "$0.88",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2020-2022"
  },
  {
    "id": "GS7628",
    "pranCode": "PRAN-7628",
    "slug": "wind-farm-at-lalpur-gujarat",
    "name": "Wind farm at Lalpur, Gujarat",
    "developer": null,
    "country": "India",
    "sector": "Wind",
    "rawTech": "Wind",
    "registry": "Gold Standard VER",
    "standardCode": "GSVER",
    "totalVolume": 324402,
    "priceUsd": 0.86,
    "priceMaxUsd": 0.86,
    "vintages": [
      "2018-2022"
    ],
    "description": "A wind project in India, issued under Gold Standard VER (GS7628). 324,402 tCO₂e listed for vintage 2018-2022. Available spot.",
    "listings": [
      {
        "vintage": "2018-2022",
        "volume": 324402,
        "priceUsd": 0.86,
        "priceLabel": "$0.86",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2018-2022"
  },
  {
    "id": "GS7632",
    "pranCode": "PRAN-7632",
    "slug": "wind-power-project-in-gujarat-by-kaze-energy-limited",
    "name": "Wind power project in Gujarat by Kaze Energy Limited",
    "developer": null,
    "country": "India",
    "sector": "Wind",
    "rawTech": "Wind",
    "registry": "Gold Standard VER",
    "standardCode": "GSVER",
    "totalVolume": 297558,
    "priceUsd": 0.88,
    "priceMaxUsd": 0.88,
    "vintages": [
      "2019-2022"
    ],
    "description": "A wind project in India, issued under Gold Standard VER (GS7632). 297,558 tCO₂e listed for vintage 2019-2022. Available spot.",
    "listings": [
      {
        "vintage": "2019-2022",
        "volume": 297558,
        "priceUsd": 0.88,
        "priceLabel": "$0.88",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2019-2022"
  },
  {
    "id": "GS7629",
    "pranCode": "PRAN-7629",
    "slug": "wind-power-project-in-madhya-pradesh-2-india",
    "name": "Wind power project in Madhya Pradesh (2), India",
    "developer": null,
    "country": "India",
    "sector": "Wind",
    "rawTech": "Wind",
    "registry": "Gold Standard VER",
    "standardCode": "GSVER",
    "totalVolume": 266299,
    "priceUsd": 0.86,
    "priceMaxUsd": 0.86,
    "vintages": [
      "2018-2022"
    ],
    "description": "A wind project in India, issued under Gold Standard VER (GS7629). 266,299 tCO₂e listed for vintage 2018-2022. Available spot.",
    "listings": [
      {
        "vintage": "2018-2022",
        "volume": 266299,
        "priceUsd": 0.86,
        "priceLabel": "$0.86",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2018-2022"
  },
  {
    "id": "GS7633",
    "pranCode": "PRAN-7633",
    "slug": "wind-power-project-in-ratlam-mp",
    "name": "Wind power project in Ratlam, MP",
    "developer": null,
    "country": "India",
    "sector": "Wind",
    "rawTech": "Wind",
    "registry": "Gold Standard VER",
    "standardCode": "GSVER",
    "totalVolume": 162688,
    "priceUsd": 0.98,
    "priceMaxUsd": 0.98,
    "vintages": [
      "2021-2022"
    ],
    "description": "A wind project in India, issued under Gold Standard VER (GS7633). 162,688 tCO₂e listed for vintage 2021-2022. Available spot.",
    "listings": [
      {
        "vintage": "2021-2022",
        "volume": 162688,
        "priceUsd": 0.98,
        "priceLabel": "$0.98",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2021-2022"
  },
  {
    "id": "GS7631",
    "pranCode": "PRAN-7631",
    "slug": "wind-project-by-lwepl-2",
    "name": "Wind project by LWEPL-2",
    "developer": null,
    "country": "India",
    "sector": "Wind",
    "rawTech": "Wind",
    "registry": "Gold Standard VER",
    "standardCode": "GSVER",
    "totalVolume": 102810,
    "priceUsd": 0.88,
    "priceMaxUsd": 0.88,
    "vintages": [
      "2020-2021"
    ],
    "description": "A wind project in India, issued under Gold Standard VER (GS7631). 102,810 tCO₂e listed for vintage 2020-2021. Available spot.",
    "listings": [
      {
        "vintage": "2020-2021",
        "volume": 102810,
        "priceUsd": 0.88,
        "priceLabel": "$0.88",
        "delivery": "Spot",
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2020-2021"
  },
  {
    "id": "ICR 48",
    "pranCode": "PRAN-48",
    "slug": "agroecology-italy",
    "name": "AgroEcology_Italy",
    "developer": "Alberami S.r.l.",
    "country": "Italy",
    "sector": "Agriculture & Soil",
    "rawTech": "Agriculture",
    "registry": "ICR",
    "standardCode": "ICR",
    "totalVolume": 68810,
    "priceUsd": 93.0,
    "priceMaxUsd": 93.0,
    "vintages": [
      "2024"
    ],
    "description": "A large-scale regenerative agriculture initiative designed to reduce greenhouse-gas emissions while increasing long-term carbon sequestration across Italian agricultural landscapes.",
    "listings": [
      {
        "vintage": "2024",
        "volume": 68810,
        "priceUsd": 93.0,
        "priceLabel": "$93",
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2024"
  },
  {
    "id": "ICR 17",
    "pranCode": "PRAN-17",
    "slug": "arnaldsstair",
    "name": "Arnaldsstaðir",
    "developer": "Yggdrasill Carbon ehf",
    "country": "Iceland",
    "sector": "Afforestation & Reforestation",
    "rawTech": "Afforestation & Reforestation",
    "registry": "ICR",
    "standardCode": "ICR",
    "totalVolume": 13240,
    "priceUsd": 73.0,
    "priceMaxUsd": 73.0,
    "vintages": [
      "2024"
    ],
    "description": "A large-scale afforestation and carbon-removal initiative located in Fljótsdalur, Eastern Iceland.",
    "listings": [
      {
        "vintage": "2024",
        "volume": 13240,
        "priceUsd": 73.0,
        "priceLabel": "$73",
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2024"
  },
  {
    "id": "ICR 91",
    "pranCode": "PRAN-91",
    "slug": "blue-carbon-project-mexico",
    "name": "Blue Carbon Project, Mexico",
    "developer": null,
    "country": "Mexico",
    "sector": "Blue Carbon",
    "rawTech": "Blue Carbon",
    "registry": "ICR",
    "standardCode": "ICR",
    "totalVolume": 2380,
    "priceUsd": 206.0,
    "priceMaxUsd": 206.0,
    "vintages": [
      "2024"
    ],
    "description": "An innovative ocean-based carbon-removal initiative in Baja California, Mexico, utilising the proprietary Sea Cave True Blue Carbon technology.",
    "listings": [
      {
        "vintage": "2024",
        "volume": 2380,
        "priceUsd": 206.0,
        "priceLabel": "$206",
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2024"
  },
  {
    "id": "ICR 93",
    "pranCode": "PRAN-93",
    "slug": "bright-future-africa-vol-2",
    "name": "Bright Future Africa – Vol.2",
    "developer": "GRO Foundation",
    "country": "Uganda",
    "sector": "Afforestation & Reforestation",
    "rawTech": "Afforestation & Reforestation",
    "registry": "ICR",
    "standardCode": "ICR",
    "totalVolume": 118000,
    "priceUsd": 438.0,
    "priceMaxUsd": 438.0,
    "vintages": [
      "2025"
    ],
    "description": "Applies the AR-ACM0003 v2.0 methodology using a census-based accounting approach to accurately quantify species-specific carbon sequestration, with wide community co-benefits.",
    "listings": [
      {
        "vintage": "2025",
        "volume": 118000,
        "priceUsd": 438.0,
        "priceLabel": "$438",
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2025"
  },
  {
    "id": "ICR 254",
    "pranCode": "PRAN-254",
    "slug": "compost-or",
    "name": "Compost Or",
    "developer": null,
    "country": "Israel",
    "sector": "Waste & Biogas",
    "rawTech": "Waste Handling & Disposal",
    "registry": "ICR",
    "standardCode": "ICR",
    "totalVolume": 260000,
    "priceUsd": null,
    "priceMaxUsd": null,
    "vintages": [
      "2025"
    ],
    "description": "A waste & biogas project in Israel, issued under ICR (ICR 254). 260,000 tCO₂e listed for vintage 2025.",
    "listings": [
      {
        "vintage": "2025",
        "volume": 260000,
        "priceUsd": null,
        "priceLabel": null,
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2025"
  },
  {
    "id": "ICR 44",
    "pranCode": "PRAN-44",
    "slug": "emek-hefer-compost",
    "name": "Emek Hefer Compost",
    "developer": null,
    "country": "Israel",
    "sector": "Waste & Biogas",
    "rawTech": "Waste Handling & Disposal",
    "registry": "ICR",
    "standardCode": "ICR",
    "totalVolume": 414110,
    "priceUsd": null,
    "priceMaxUsd": null,
    "vintages": [
      "2025"
    ],
    "description": "A waste & biogas project in Israel, issued under ICR (ICR 44). 414,110 tCO₂e listed for vintage 2025.",
    "listings": [
      {
        "vintage": "2025",
        "volume": 414110,
        "priceUsd": null,
        "priceLabel": null,
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2025"
  },
  {
    "id": "ICR 306",
    "pranCode": "PRAN-306",
    "slug": "evra-biomass-power-plant-project",
    "name": "Evra Biomass Power Plant Project",
    "developer": null,
    "country": "Türkiye",
    "sector": "Waste & Biogas",
    "rawTech": "Waste Handling & Disposal",
    "registry": "ICR",
    "standardCode": "ICR",
    "totalVolume": 49000,
    "priceUsd": null,
    "priceMaxUsd": null,
    "vintages": [
      "2026"
    ],
    "description": "A waste & biogas project in Türkiye, issued under ICR (ICR 306). 49,000 tCO₂e listed for vintage 2026.",
    "listings": [
      {
        "vintage": "2026",
        "volume": 49000,
        "priceUsd": null,
        "priceLabel": null,
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2026"
  },
  {
    "id": "ICR 349",
    "pranCode": "PRAN-349",
    "slug": "forestal-rio-aquidaban",
    "name": "Forestal Río Aquidabán",
    "developer": null,
    "country": "Paraguay",
    "sector": "Afforestation & Reforestation",
    "rawTech": "Afforestation & Reforestation",
    "registry": "ICR",
    "standardCode": "ICR",
    "totalVolume": 508000,
    "priceUsd": 21.0,
    "priceMaxUsd": 23.0,
    "vintages": [
      "2000-2024",
      "2025"
    ],
    "description": "An ICR-verified afforestation and reforestation project restoring degraded grasslands through silvopastoral agroforestry for long-term carbon removal in Paraguay.",
    "listings": [
      {
        "vintage": "2025",
        "volume": 254000,
        "priceUsd": 21.0,
        "priceLabel": "$21",
        "delivery": null,
        "note": null
      },
      {
        "vintage": "2000-2024",
        "volume": 254000,
        "priceUsd": 23.0,
        "priceLabel": "$23-$37",
        "delivery": "Forward",
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2000-2024–2025"
  },
  {
    "id": "ICR 57",
    "pranCode": "PRAN-57",
    "slug": "skogalfar-alfabrekka",
    "name": "Skógálfar, Álfabrekka",
    "developer": "Yggdrasill Carbon ehf",
    "country": "Iceland",
    "sector": "Afforestation & Reforestation",
    "rawTech": "Afforestation & Reforestation",
    "registry": "ICR",
    "standardCode": "ICR",
    "totalVolume": 3470,
    "priceUsd": 73.0,
    "priceMaxUsd": 73.0,
    "vintages": [
      "2024"
    ],
    "description": "A climate forestry project in South Iceland, developed across approximately 100 hectares to generate high-integrity carbon removals through afforestation and sustainable forest management.",
    "listings": [
      {
        "vintage": "2024",
        "volume": 3470,
        "priceUsd": 73.0,
        "priceLabel": "$73",
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2024"
  },
  {
    "id": "ICR 178",
    "pranCode": "PRAN-178",
    "slug": "the-bbb-embrasca-arr-project",
    "name": "The BBB/Embrasca ARR Project",
    "developer": null,
    "country": "Brazil",
    "sector": "Afforestation & Reforestation",
    "rawTech": "Afforestation & Reforestation",
    "registry": "ICR",
    "standardCode": "ICR",
    "totalVolume": 706000,
    "priceUsd": null,
    "priceMaxUsd": null,
    "vintages": [
      "2026"
    ],
    "description": "An afforestation & reforestation project in Brazil, issued under ICR (ICR 178). 706,000 tCO₂e listed for vintage 2026.",
    "listings": [
      {
        "vintage": "2026",
        "volume": 706000,
        "priceUsd": null,
        "priceLabel": null,
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2026"
  },
  {
    "id": "ICR 315",
    "pranCode": "PRAN-315",
    "slug": "urstamm-ifim-switzerland",
    "name": "Urstamm IFIM Switzerland",
    "developer": null,
    "country": "Switzerland",
    "sector": "Afforestation & Reforestation",
    "rawTech": "Afforestation & Reforestation",
    "registry": "ICR",
    "standardCode": "ICR",
    "totalVolume": 11000,
    "priceUsd": null,
    "priceMaxUsd": null,
    "vintages": [
      "2023"
    ],
    "description": "An afforestation & reforestation project in Switzerland, issued under ICR (ICR 315). 11,000 tCO₂e listed for vintage 2023.",
    "listings": [
      {
        "vintage": "2023",
        "volume": 11000,
        "priceUsd": null,
        "priceLabel": null,
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2023"
  },
  {
    "id": "ICR 326",
    "pranCode": "PRAN-326",
    "slug": "waste-management-at-multiple-locations-in-india",
    "name": "Waste management at multiple locations in India",
    "developer": null,
    "country": "India",
    "sector": "Waste & Biogas",
    "rawTech": "Waste Handling & Disposal",
    "registry": "ICR",
    "standardCode": "ICR",
    "totalVolume": 230570,
    "priceUsd": null,
    "priceMaxUsd": null,
    "vintages": [
      "2026"
    ],
    "description": "A waste & biogas project in India, issued under ICR (ICR 326). 230,570 tCO₂e listed for vintage 2026.",
    "listings": [
      {
        "vintage": "2026",
        "volume": 230570,
        "priceUsd": null,
        "priceLabel": null,
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "generated",
    "vintageLabel": "2026"
  },
  {
    "id": "UCR 487",
    "pranCode": "PRAN-487",
    "slug": "123-88-mw-kp-group-project",
    "name": "123.88 MW KP Group Project",
    "developer": "KP Group (KPI Green Energy / KP Energy)",
    "country": "India",
    "sector": "Renewable Energy",
    "rawTech": "Renewable Energy",
    "registry": "UCR",
    "standardCode": "UCR",
    "totalVolume": 788570,
    "priceUsd": null,
    "priceMaxUsd": null,
    "vintages": [
      "2024"
    ],
    "description": "A large-scale integrated renewable-energy initiative combining solar, wind, and hybrid generation in Gujarat, India.",
    "listings": [
      {
        "vintage": "2024",
        "volume": 788570,
        "priceUsd": null,
        "priceLabel": null,
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2024"
  },
  {
    "id": "UCR 455",
    "pranCode": "PRAN-455",
    "slug": "20-5-mw-pipl-heat-to-power",
    "name": "20.5 MW PIPL  Heat to Power",
    "developer": "Panoli Intermediates (India) Pvt. Ltd.",
    "country": "India",
    "sector": "Renewable Energy",
    "rawTech": "Renewable Energy",
    "registry": "UCR",
    "standardCode": "UCR",
    "totalVolume": 232545,
    "priceUsd": null,
    "priceMaxUsd": null,
    "vintages": [
      "2024"
    ],
    "description": "A large-scale industrial energy-efficiency initiative developed by PIPL in Nandesari Village, Vadodara District, Gujarat.",
    "listings": [
      {
        "vintage": "2024",
        "volume": 232545,
        "priceUsd": null,
        "priceLabel": null,
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2024"
  },
  {
    "id": "UCR 454",
    "pranCode": "PRAN-454",
    "slug": "4-2-mw-kcil-heat-to-power",
    "name": "4.2 MW KCIL  Heat to Power",
    "developer": null,
    "country": "India",
    "sector": "Industrial Efficiency",
    "rawTech": "Industrial Energy Efficiency",
    "registry": "UCR",
    "standardCode": "UCR",
    "totalVolume": 21032,
    "priceUsd": null,
    "priceMaxUsd": null,
    "vintages": [
      "2023"
    ],
    "description": "An industrial energy-efficiency initiative that captures waste heat from manufacturing and converts it into electricity via Waste Heat Recovery (WHR) technology.",
    "listings": [
      {
        "vintage": "2023",
        "volume": 21032,
        "priceUsd": null,
        "priceLabel": null,
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2023"
  },
  {
    "id": "UCR 451",
    "pranCode": "PRAN-451",
    "slug": "5-5-mw-kcil-pipl-wind-project",
    "name": "5.5 MW KCIL-PIPL Wind Project",
    "developer": "Panoli Intermediates (India) Pvt. Ltd.",
    "country": "India",
    "sector": "Renewable Energy",
    "rawTech": "Renewable Energy",
    "registry": "UCR",
    "standardCode": "UCR",
    "totalVolume": 31236,
    "priceUsd": null,
    "priceMaxUsd": null,
    "vintages": [
      "2024"
    ],
    "description": "A utility-scale wind project generating clean electricity while contributing verified carbon credits under the Universal Carbon Registry (UCR).",
    "listings": [
      {
        "vintage": "2024",
        "volume": 31236,
        "priceUsd": null,
        "priceLabel": null,
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2024"
  },
  {
    "id": "UCR 449",
    "pranCode": "PRAN-449",
    "slug": "9-62-mw-pipl-solar-project",
    "name": "9.62 MW PIPL Solar Project",
    "developer": "Panoli Intermediates (India) Pvt. Ltd.",
    "country": "India",
    "sector": "Renewable Energy",
    "rawTech": "Renewable Energy",
    "registry": "UCR",
    "standardCode": "UCR",
    "totalVolume": 44041,
    "priceUsd": null,
    "priceMaxUsd": null,
    "vintages": [
      "2024"
    ],
    "description": "A utility-scale solar photovoltaic initiative developed by PIPL to generate clean electricity from renewable solar energy.",
    "listings": [
      {
        "vintage": "2024",
        "volume": 44041,
        "priceUsd": null,
        "priceLabel": null,
        "delivery": null,
        "note": null
      }
    ],
    "descriptionSource": "sourced",
    "vintageLabel": "2024"
  }
];

export const irecListings: IrecListing[] = [
  {
    "country": "Bangladesh",
    "tech": "Solar",
    "vintage": "2025",
    "volumeMwh": 25000,
    "delivery": "Spot",
    "remarks": "RE100",
    "priceUsd": 4.0
  },
  {
    "country": "Bangladesh",
    "tech": "Solar",
    "vintage": "2026",
    "volumeMwh": 35000,
    "delivery": "Spot",
    "remarks": "RE100",
    "priceUsd": 4.0
  },
  {
    "country": "Chile",
    "tech": "Wind",
    "vintage": "2025",
    "volumeMwh": 30000,
    "delivery": "Spot",
    "remarks": "RE100",
    "priceUsd": 0.73
  },
  {
    "country": "Chile",
    "tech": "Wind",
    "vintage": "2026",
    "volumeMwh": 30000,
    "delivery": "Spot",
    "remarks": "RE100",
    "priceUsd": 0.83
  },
  {
    "country": "Egypt",
    "tech": "Solar",
    "vintage": "2025",
    "volumeMwh": 1000000,
    "delivery": "Spot",
    "remarks": "RE100",
    "priceUsd": 2.0
  },
  {
    "country": "Egypt",
    "tech": "Wind",
    "vintage": "2025",
    "volumeMwh": 1000000,
    "delivery": "Spot",
    "remarks": "RE100",
    "priceUsd": 2.0
  },
  {
    "country": "India",
    "tech": "Biomass",
    "vintage": "2024 H1",
    "volumeMwh": 18000,
    "delivery": "Spot",
    "remarks": "Non RE100",
    "priceUsd": 0.16
  },
  {
    "country": "India",
    "tech": "Biomass",
    "vintage": "2025",
    "volumeMwh": 40000,
    "delivery": "Spot",
    "remarks": "Non RE100",
    "priceUsd": 0.4
  },
  {
    "country": "India",
    "tech": "Biomass",
    "vintage": "2026",
    "volumeMwh": 50000,
    "delivery": "Forward",
    "remarks": "Non- RE100",
    "priceUsd": 0.44
  },
  {
    "country": "India",
    "tech": "Solar",
    "vintage": "2024 H1",
    "volumeMwh": 3565,
    "delivery": "Spot",
    "remarks": "RE100",
    "priceUsd": 0.21
  },
  {
    "country": "India",
    "tech": "W/S",
    "vintage": "2025",
    "volumeMwh": 50000,
    "delivery": "Spot",
    "remarks": "RE100",
    "priceUsd": 0.49
  },
  {
    "country": "India",
    "tech": "W/S",
    "vintage": "2026",
    "volumeMwh": 100000,
    "delivery": "Spot",
    "remarks": "RE100",
    "priceUsd": 0.6
  },
  {
    "country": "India",
    "tech": "WHR",
    "vintage": "2025",
    "volumeMwh": 150000,
    "delivery": "Spot",
    "remarks": "WHR I-REC – India — Non- RE100",
    "priceUsd": 0.29
  },
  {
    "country": "Kazakhstan",
    "tech": "Wind",
    "vintage": "2025",
    "volumeMwh": 5000,
    "delivery": "Spot",
    "remarks": "RE100",
    "priceUsd": 2.0
  },
  {
    "country": "Kazakhstan",
    "tech": "Wind",
    "vintage": "2026",
    "volumeMwh": 10000,
    "delivery": "Spot",
    "remarks": "RE100",
    "priceUsd": 2.0
  },
  {
    "country": "Laos",
    "tech": "Hydro",
    "vintage": "2025",
    "volumeMwh": 43000,
    "delivery": "Spot",
    "remarks": "RE100",
    "priceUsd": 0.67
  },
  {
    "country": "Nepal",
    "tech": "Hydro",
    "vintage": "2024",
    "volumeMwh": 20000,
    "delivery": "Spot",
    "remarks": null,
    "priceUsd": 2.0
  },
  {
    "country": "Nepal",
    "tech": "Hydro",
    "vintage": "2025",
    "volumeMwh": 11419,
    "delivery": null,
    "remarks": "2.4 MW Hydroelectric Project",
    "priceUsd": null
  },
  {
    "country": "Nepal",
    "tech": "Hydro",
    "vintage": "2025",
    "volumeMwh": 38807,
    "delivery": null,
    "remarks": "9.9 MW  Hydropower Project",
    "priceUsd": null
  },
  {
    "country": "Nepal",
    "tech": "Hydro",
    "vintage": "2025",
    "volumeMwh": 10000,
    "delivery": "Spot",
    "remarks": null,
    "priceUsd": 2.0
  },
  {
    "country": "Nepal",
    "tech": "Solar",
    "vintage": "2025",
    "volumeMwh": 12820,
    "delivery": null,
    "remarks": "8.5 MW Butwal Solar Project",
    "priceUsd": null
  },
  {
    "country": "Nepal",
    "tech": "Solar",
    "vintage": "2025",
    "volumeMwh": 42350,
    "delivery": null,
    "remarks": "25 MW Solar PV Project",
    "priceUsd": null
  },
  {
    "country": "Saudi Arabia",
    "tech": "Solar",
    "vintage": "2024",
    "volumeMwh": 30000,
    "delivery": "Spot",
    "remarks": "RE100",
    "priceUsd": 3.0
  },
  {
    "country": "Saudi Arabia",
    "tech": "Solar",
    "vintage": "2025",
    "volumeMwh": 15000,
    "delivery": "Spot",
    "remarks": "RE100",
    "priceUsd": 4.0
  },
  {
    "country": "Saudi Arabia",
    "tech": "Solar",
    "vintage": "2026",
    "volumeMwh": 10000,
    "delivery": "Spot",
    "remarks": "RE100",
    "priceUsd": 5.0
  },
  {
    "country": "Sri Lanka",
    "tech": "Solar",
    "vintage": "2024",
    "volumeMwh": 15000,
    "delivery": "Spot",
    "remarks": "RE100",
    "priceUsd": 2.0
  },
  {
    "country": "Sri Lanka",
    "tech": "Solar",
    "vintage": "2025",
    "volumeMwh": 15000,
    "delivery": "Spot",
    "remarks": "RE100",
    "priceUsd": 2.0
  }
];

export function getProjects(): Project[] {
  return projects;
}

/**
 * I-REC inventory, surfaced for browsing.
 *
 * These 27 lines were already in the book but had no route into the UI. They
 * are energy attribute certificates measured in MWh — NOT carbon credits, and
 * never expressed in tCO2e. They are presented in their own clearly-labelled
 * band rather than mixed into the carbon grid, so a buyer can never confuse
 * the two instruments.
 *
 * Codes for the four Nepal lines match the live site, matched on volume.
 */
const IREC_LIVE_CODES: Record<number, string> = {
  11419: "PRAN-2009",
  38807: "PRAN-2019",
  12820: "PRAN-2020",
  42350: "PRAN-2024",
};

export type IrecEntry = IrecListing & {
  pranCode: string;
  /** Display name — the sheet's remark when it names a project, else derived. */
  label: string;
};

export function getIrecEntries(): IrecEntry[] {
  return irecListings.map((l, i) => ({
    ...l,
    pranCode:
      (l.volumeMwh != null && IREC_LIVE_CODES[l.volumeMwh]) ||
      `PRAN-IREC-${i + 1}`,
    /* Only treat a remark as a name when it names a plant ("2.4 MW …
       Project"); tags like "RE100" are attributes, not titles. */
    label: l.remarks && /\bMW\b|\bProject\b/i.test(l.remarks)
      ? l.remarks
      : `${l.tech} I-REC · ${l.country}`,
  }));
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Look a project up by its public PRAN code, e.g. "PRAN-48". */
export function getProjectByCode(code: string): Project | undefined {
  const wanted = code.trim().toUpperCase();
  return projects.find((p) => p.pranCode.toUpperCase() === wanted);
}

/**
 * Canonical public URL for a project. Every link in the UI goes through this,
 * so the routing scheme can change in one place.
 */
export function projectHref(project: Pick<Project, "pranCode">): string {
  return `/${project.pranCode}`;
}

/** Distinct facet values for marketplace filters. */
export const facets = {
  registries: Array.from(new Set(projects.map((p) => p.registry))).sort(),
  sectors: Array.from(new Set(projects.map((p) => p.sector))).sort(),
  countries: Array.from(new Set(projects.map((p) => p.country))).sort(),
  deliveries: Array.from(
    new Set(
      projects.flatMap((p) => p.listings.map((l) => l.delivery)).filter(Boolean),
    ),
  ).sort() as Exclude<Delivery, null>[],
};

/** Portfolio totals — derived, never hand-entered. */
export const portfolioStats = {
  projects: projects.length,
  listings: projects.reduce((n, p) => n + p.listings.length, 0),
  countries: facets.countries.length,
  registries: facets.registries.length,
  totalVolume: projects.reduce((n, p) => n + (p.totalVolume ?? 0), 0),
  irecVolumeMwh: irecListings.reduce((n, l) => n + (l.volumeMwh ?? 0), 0),
  irecCountries: new Set(irecListings.map((l) => l.country)).size,
  priceMin: Math.min(
    ...projects.map((p) => p.priceUsd).filter((n): n is number => n !== null),
  ),
  priceMax: Math.max(
    ...projects.map((p) => p.priceMaxUsd).filter((n): n is number => n !== null),
  ),
};

/** Volume by sector, largest first — powers the portfolio charts. */
export function volumeBySector(): { label: string; value: number }[] {
  const m = new Map<string, number>();
  for (const p of projects) {
    m.set(p.sector, (m.get(p.sector) ?? 0) + (p.totalVolume ?? 0));
  }
  return Array.from(m.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

/** Volume by country, largest first. */
export function volumeByCountry(): { label: string; value: number }[] {
  const m = new Map<string, number>();
  for (const p of projects) {
    m.set(p.country, (m.get(p.country) ?? 0) + (p.totalVolume ?? 0));
  }
  return Array.from(m.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

/** Project count by registry standard. */
export function countByRegistry(): { label: string; value: number }[] {
  const m = new Map<string, number>();
  for (const p of projects) m.set(p.registry, (m.get(p.registry) ?? 0) + 1);
  return Array.from(m.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}
