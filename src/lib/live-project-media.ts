/**
 * Real project media & facts scraped from the live pranglobal.com project
 * pages (fetched 2026-07-31) — photography, coordinates, SDG mappings,
 * registry copy, and stat bars, sourced verbatim from the live site this
 * catalog is migrating from. Keyed by the same pranCode used in
 * marketplace-data.ts.
 *
 * Only 22 of the catalog's 86 projects have a live page today, so lookups
 * return undefined for the rest — callers must fall back to the existing
 * sector stock photography (lib/images.ts) rather than invent facts for
 * those (CLAUDE.md hard rule: no fabricated project data). Re-scrape
 * pranglobal.com and regenerate this file if the founder publishes more
 * project pages.
 */

export type LiveProjectMedia = {
  sourceUrl: string;
  image: string | null;
  gallery: string[];
  lat: number | null;
  lng: number | null;
  description: string | null;
  highlights: string[];
  sdgGoals: number[];
  registryName: string | null;
  registryLogo: string | null;
  projectType: string | null;
  methodology: string | null;
  owner: string | null;
  stats: { label: string; value: string; pct: number }[];
};

export const liveProjectMedia: Record<string, LiveProjectMedia> = {
  "PRAN-57": {
    "sourceUrl": "https://pranglobal.com/PRAN-57.html",
    "image": "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Fgaia.fra1.digitaloceanspaces.com%2Fusers%2Fa07b9560-15ee-4746-b73a-0dc4da57e9b5%2Ffiles%2F1736244505648DSC01315.jpg&w=1920&q=75",
    "gallery": [
      "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Fgaia.fra1.digitaloceanspaces.com%2Fusers%2Fa07b9560-15ee-4746-b73a-0dc4da57e9b5%2Ffiles%2F1736244505648DSC01315.jpg&w=1920&q=75",
      "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Fgaia.fra1.digitaloceanspaces.com%2Fusers%2Fa07b9560-15ee-4746-b73a-0dc4da57e9b5%2Ffiles%2F1736244514584DSC01320.jpg&w=1920&q=75",
      "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Fgaia.fra1.digitaloceanspaces.com%2Fusers%2Fa07b9560-15ee-4746-b73a-0dc4da57e9b5%2Ffiles%2F1736244554883DSC00558.jpg&w=1920&q=75"
    ],
    "lat": 64.13565013706331,
    "lng": -20.71514831855309,
    "description": "Skógálfar, Álfabrekka is a climate forestry project located in South Iceland, developed across approximately 100 hectares of land to generate high-integrity carbon removals through afforestation and sustainable forest management.\n\nThe project establishes a multi-purpose forest that combines long-term carbon sequestration with soil conservation, biodiversity enhancement, sustainable timber production, recreational value, and ecosystem restoration. Designed to deliver environmental, economic, and social co-benefits, the project demonstrates how climate forestry can contribute to regional resilience while supporting Iceland's long-term carbon neutrality goals.",
    "highlights": [
      "Approximately 100 hectares under restoration",
      "Soil conservation and erosion control",
      "Multi-purpose climate forest development",
      "ICR validated carbon removal initiative"
    ],
    "sdgGoals": [
      3,
      8,
      13,
      15
    ],
    "registryName": "International Carbon Registry",
    "registryLogo": "https://documentation.carbonregistry.com/documentation/~gitbook/image?url=https%3A%2F%2F2441265052-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FfIdoGcZZdvap67xjb5h1%252Fuploads%252FjaHce4Zk5im2g4VKg5G1%252FICR%2520LogoGIT.png%3Falt%3Dmedia%26token%3Dd674201e-2449-45f1-bc70-663f67b32207&width=1248&dpr=3&quality=100&sign=7233e20c&sv=2",
    "projectType": "Removal",
    "methodology": "ISO 14064-2",
    "owner": "Skógálfar ehf.",
    "stats": [
      {
        "label": "Available Credits",
        "value": "3470",
        "pct": 65
      },
      {
        "label": "Issued Credits",
        "value": "3000",
        "pct": 35
      },
      {
        "label": "Estimated Total Mitigations",
        "value": "52000",
        "pct": 80
      },
      {
        "label": "Estimated Annual Mitigations",
        "value": "1000",
        "pct": 20
      }
    ]
  },
  "PRAN-48": {
    "sourceUrl": "https://pranglobal.com/PRAN-48.html",
    "image": "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Fgaia.fra1.digitaloceanspaces.com%2Fusers%2Fd97e0e80-11fe-41af-bc9e-fea2bd0d2182%2Ffiles%2F1712484643905IMG_5141.jpg&w=1920&q=75",
    "gallery": [
      "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Fgaia.fra1.digitaloceanspaces.com%2Fusers%2Fd97e0e80-11fe-41af-bc9e-fea2bd0d2182%2Ffiles%2F1712484643905IMG_5141.jpg&w=1920&q=75",
      "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Fgaia.fra1.digitaloceanspaces.com%2Fusers%2Fd97e0e80-11fe-41af-bc9e-fea2bd0d2182%2Ffiles%2F1696082395542-Gli-ulivi-secolari-del-Salento-paesaggio-unico-al-mondo-e-Patrimonio-Unesco.jpeg&w=1920&q=75",
      "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Fgaia.fra1.digitaloceanspaces.com%2Fusers%2Fd97e0e80-11fe-41af-bc9e-fea2bd0d2182%2Ffiles%2F1696080982797-ulivi-in-puglia.jpeg&w=1920&q=75"
    ],
    "lat": 40.33828582321401,
    "lng": 18.16253203634214,
    "description": "AgroEcology_Italy is a large-scale regenerative agriculture initiative designed to reduce greenhouse gas emissions while increasing long-term carbon sequestration across Italian agricultural landscapes. Developed by Alberami S.r.l., the project supports farmers in adopting regenerative farming, agroforestry, and tree-planting practices that improve soil health, increase biodiversity, and strengthen climate resilience.\n\nThe initiative provides financial incentives, technical guidance, and carbon market access to help overcome barriers to sustainable farming. By integrating climate-smart agricultural practices with verified carbon accounting, the project enables measurable carbon removals while supporting rural communities and promoting a more resilient agricultural economy.",
    "highlights": [
      "Carbon sequestration through agroforestry",
      "Soil carbon enhancement",
      "Climate-smart agricultural practices",
      "BeZero BBB Carbon Rating"
    ],
    "sdgGoals": [
      1,
      2,
      8,
      9,
      12
    ],
    "registryName": "International Carbon Registry",
    "registryLogo": "https://documentation.carbonregistry.com/documentation/~gitbook/image?url=https%3A%2F%2F2441265052-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FfIdoGcZZdvap67xjb5h1%252Fuploads%252FjaHce4Zk5im2g4VKg5G1%252FICR%2520LogoGIT.png%3Falt%3Dmedia%26token%3Dd674201e-2449-45f1-bc70-663f67b32207&width=1248&dpr=3&quality=100&sign=7233e20c&sv=2",
    "projectType": "Removal",
    "methodology": "ISO 14064-2",
    "owner": "Alberami S.r.l.",
    "stats": [
      {
        "label": "Available Credits",
        "value": "68,810",
        "pct": 45
      },
      {
        "label": "Issued Credits",
        "value": "84000",
        "pct": 55
      },
      {
        "label": "Estimated Total Mitigations",
        "value": "5,11,000",
        "pct": 80
      },
      {
        "label": "Estimated Annual Mitigations",
        "value": "1,00,000",
        "pct": 20
      }
    ]
  },
  "PRAN-93": {
    "sourceUrl": "https://pranglobal.com/PRAN-93.html",
    "image": "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Ffra1.digitaloceanspaces.com%2Fgaia%2Fusers%2F2c7f31af-73f9-470a-90cf-10843a36225c%2Ffiles%2F1706029983198-_DSC1156.jpg&w=1920&q=75",
    "gallery": [
      "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Ffra1.digitaloceanspaces.com%2Fgaia%2Fusers%2F2c7f31af-73f9-470a-90cf-10843a36225c%2Ffiles%2F1706029983198-_DSC1156.jpg&w=1920&q=75",
      "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Ffra1.digitaloceanspaces.com%2Fgaia%2Fusers%2F2c7f31af-73f9-470a-90cf-10843a36225c%2Ffiles%2F1706030124176-DJI_0042.jpg&w=1920&q=75",
      "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Ffra1.digitaloceanspaces.com%2Fgaia%2Fusers%2F2c7f31af-73f9-470a-90cf-10843a36225c%2Ffiles%2F1706030213917-_MG_1566.jpg&w=1920&q=75"
    ],
    "lat": 1.460927161157319,
    "lng": 32.29860243468776,
    "description": "Bright Future Africa – Vol.2 (Uganda) is a large-scale afforestation and reforestation initiative designed to plant 255 million indigenous trees across deforested institutional land in Uganda. The project restores degraded ecosystems while generating long-term carbon removals through scientifically monitored forest restoration.\n\nDeveloped by the GRO Foundation, the project applies the AR-ACM0003 Version 2.0 methodology using a census-based accounting approach to accurately quantify species-specific carbon sequestration. Beyond carbon removal, the initiative promotes biodiversity restoration, sustainable livelihoods, community participation, and environmental resilience while connecting local communities to international carbon markets.",
    "highlights": [
      "ICR Validated carbon removal project",
      "Uses AR-ACM0003 Version 2.0 methodology",
      "Target of planting 255 million native trees",
      "Large-scale indigenous tree plantation project"
    ],
    "sdgGoals": [
      1,
      2,
      4,
      5,
      6,
      8,
      10,
      13,
      15,
      17
    ],
    "registryName": "International Carbon Registry",
    "registryLogo": "https://documentation.carbonregistry.com/documentation/~gitbook/image?url=https%3A%2F%2F2441265052-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FfIdoGcZZdvap67xjb5h1%252Fuploads%252FjaHce4Zk5im2g4VKg5G1%252FICR%2520LogoGIT.png%3Falt%3Dmedia%26token%3Dd674201e-2449-45f1-bc70-663f67b32207&width=1248&dpr=3&quality=100&sign=7233e20c&sv=2",
    "projectType": "Removal",
    "methodology": "AR-ACM0003 2.0",
    "owner": "GRO Foundation",
    "stats": [
      {
        "label": "Available Credits",
        "value": "1,18,000",
        "pct": 50
      },
      {
        "label": "Issued Credits",
        "value": "1,18,000",
        "pct": 50
      },
      {
        "label": "Estimated Total Mitigations",
        "value": "1,39,00,000",
        "pct": 80
      },
      {
        "label": "Estimated Annual Mitigations",
        "value": "3,00,000",
        "pct": 20
      }
    ]
  },
  "PRAN-17": {
    "sourceUrl": "https://pranglobal.com/PRAN-17.html",
    "image": "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Fgaia.fra1.digitaloceanspaces.com%2Fcompanies%2F63ffd18f020ef633ffad0334%2Fprojects%2F6407b9f851743e6d681e01a7%2Fimages%2FprojectImage-1683196173389-IMG_2987.jpeg&w=1920&q=75",
    "gallery": [
      "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Fgaia.fra1.digitaloceanspaces.com%2Fcompanies%2F63ffd18f020ef633ffad0334%2Fprojects%2F6407b9f851743e6d681e01a7%2Fimages%2FprojectImage-1683196173389-IMG_2987.jpeg&w=1920&q=75",
      "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Fgaia.fra1.digitaloceanspaces.com%2Fcompanies%2F63ffd18f020ef633ffad0334%2Fprojects%2F6407b9f851743e6d681e01a7%2Fimages%2FprojectImage-1683196550013-IMG_2940.jpeg&w=1920&q=75",
      "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Fgaia.fra1.digitaloceanspaces.com%2Fusers%2Fec3e2b69-2c99-475e-86cd-ffbf6637fce8%2Ffiles%2F173747260612620250116_123215.jpg&w=1920&q=75"
    ],
    "lat": 64.96053312805452,
    "lng": -15.02469890951065,
    "description": "Arnaldsstaðir is a large-scale afforestation and carbon removal initiative located in Fljótsdalur, Eastern Iceland, developed by Yggdrasill Carbon ehf. The project transforms abandoned agricultural grasslands into climate-resilient forests capable of delivering long-term carbon sequestration while restoring ecological integrity.\n\nApproximately 68,000 native and climate-adapted trees, including spruce, pine, and aspen, were planted to establish a productive forest ecosystem. Beyond carbon removal, the project contributes to biodiversity recovery, soil restoration, landscape resilience, and sustainable rural development. The site is also culturally significant, reflecting Icelandic folklore associated with the Arnaldsstaðir landscape.",
    "highlights": [
      "Around 68,000 trees planted",
      "Soil restoration and erosion prevention",
      "Climate-resilient forestry",
      "ICR validated nature-based carbon removal project"
    ],
    "sdgGoals": [
      8,
      13,
      15,
      17
    ],
    "registryName": "International Carbon Registry",
    "registryLogo": "https://documentation.carbonregistry.com/documentation/~gitbook/image?url=https%3A%2F%2F2441265052-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FfIdoGcZZdvap67xjb5h1%252Fuploads%252FjaHce4Zk5im2g4VKg5G1%252FICR%2520LogoGIT.png%3Falt%3Dmedia%26token%3Dd674201e-2449-45f1-bc70-663f67b32207&width=1248&dpr=3&quality=100&sign=7233e20c&sv=2",
    "projectType": "Removal",
    "methodology": "Forest Carbon Code (FCC)",
    "owner": "Yggdrasill Carbon ehf.",
    "stats": [
      {
        "label": "Available Credits",
        "value": "13,240",
        "pct": 45
      },
      {
        "label": "Issued Credits",
        "value": "13000",
        "pct": 55
      },
      {
        "label": "Estimated Lifetime Carbon Removal",
        "value": "19000",
        "pct": 80
      },
      {
        "label": "Estimated Annual Mitigations",
        "value": "378",
        "pct": 20
      }
    ]
  },
  "PRAN-91": {
    "sourceUrl": "https://pranglobal.com/PRAN-91.html",
    "image": "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Fgaia.fra1.digitaloceanspaces.com%2Fusers%2F63fd39b3d4d962fde004b3d8%2Ffiles%2F1690165380731-SportDiver_20230713_095055.jpg&w=1920&q=75",
    "gallery": [
      "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Fgaia.fra1.digitaloceanspaces.com%2Fusers%2F63fd39b3d4d962fde004b3d8%2Ffiles%2F1690165380731-SportDiver_20230713_095055.jpg&w=1920&q=75",
      "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Fgaia.fra1.digitaloceanspaces.com%2Fusers%2F63fd39b3d4d962fde004b3d8%2Ffiles%2F1690770581049-Screenshot%25202023-07-21%2520at%25205.22.47%2520PM.png&w=1920&q=75",
      "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Fgaia.fra1.digitaloceanspaces.com%2Fusers%2Fac84730c-0d7c-4210-aefc-7ebf165bf583%2Ffiles%2F1723660800694bass-sheep.jpeg&w=1920&q=75"
    ],
    "lat": 30.4878452,
    "lng": -116.1148024,
    "description": "The Blue Carbon Project is an innovative ocean-based carbon removal initiative located in Baja California, Mexico, utilizing the proprietary Sea Cave® True Blue Carbon® technology to remove atmospheric CO₂ while restoring degraded marine ecosystems.\n\nThe project enhances natural carbon sequestration through macroalgae (kelp) photosynthesis, artificial reef development, and long-term storage of marine carbon. Beyond climate mitigation, it creates habitats for fish and marine species, supports sustainable fisheries, and promotes healthier ocean ecosystems. Every carbon credit generated contributes directly to measurable biodiversity restoration, making the project one of the pioneering Blue Carbon initiatives globally.",
    "highlights": [
      "Innovative Blue Carbon project",
      "Sea Cave® marine habitat technology",
      "Macroalgae-driven carbon sequestration",
      "Verified under International Carbon Registry (ICR)"
    ],
    "sdgGoals": [
      1,
      2,
      8,
      13,
      14
    ],
    "registryName": "International Carbon Registry",
    "registryLogo": "https://documentation.carbonregistry.com/documentation/~gitbook/image?url=https%3A%2F%2F2441265052-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FfIdoGcZZdvap67xjb5h1%252Fuploads%252FjaHce4Zk5im2g4VKg5G1%252FICR%2520LogoGIT.png%3Falt%3Dmedia%26token%3Dd674201e-2449-45f1-bc70-663f67b32207&width=1248&dpr=3&quality=100&sign=7233e20c&sv=2",
    "projectType": "Hybrid",
    "methodology": "ISO 14064-2",
    "owner": "Fish Reef Project / IMMB",
    "stats": [
      {
        "label": "Available Credits",
        "value": "2380",
        "pct": 55
      },
      {
        "label": "Issued Credits",
        "value": "2000",
        "pct": 45
      },
      {
        "label": "Estimated Total Mitigations",
        "value": "37,000",
        "pct": 80
      },
      {
        "label": "Estimated Annual Mitigations",
        "value": "4000",
        "pct": 20
      }
    ]
  },
  "PRAN-349": {
    "sourceUrl": "https://pranglobal.com/PRAN-349.html",
    "image": "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Fgaia.fra1.digitaloceanspaces.com%2Fusers%2F1c1f14f8-fb77-4154-953a-fdf58b8cd5c8%2Ffiles%2F1742999661564Forestal%2520Rio%2520Aquidaban%2520-%2520Birds%2520view%2520cattle%2520in%2520forest.jpg&w=1920&q=75",
    "gallery": [
      "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Fgaia.fra1.digitaloceanspaces.com%2Fusers%2F1c1f14f8-fb77-4154-953a-fdf58b8cd5c8%2Ffiles%2F1742999661564Forestal%2520Rio%2520Aquidaban%2520-%2520Birds%2520view%2520cattle%2520in%2520forest.jpg&w=1920&q=75",
      "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Fgaia.fra1.digitaloceanspaces.com%2Fusers%2F1c1f14f8-fb77-4154-953a-fdf58b8cd5c8%2Ffiles%2F1742999812573Forestal%2520Rio%2520Aquidaban%2520-%2520Entrance%2520Project%2520Area.jpg&w=1920&q=75",
      "https://www.carbonregistry.com/_next/image?url=https%3A%2F%2Fgaia.fra1.digitaloceanspaces.com%2Fusers%2F1c1f14f8-fb77-4154-953a-fdf58b8cd5c8%2Ffiles%2F1742999878473Forestal%2520Rio%2520Aquidaban%2520-%2520Project%2520Partner%2520Family.jpg&w=1920&q=75"
    ],
    "lat": -23.132408574376,
    "lng": -57.48367114648227,
    "description": "Forestal Río Aquidabán is a verified nature-based carbon removal project located in Concepción, Paraguay, focused on restoring degraded grasslands through silvopastoral agroforestry. The project integrates sustainable tree planting with responsible cattle grazing, creating a land management system that enhances carbon sequestration while maintaining productive agricultural use.\n\nDeveloped by global-woods international AG and verified under the International Carbon Registry (ICR) using AR-ACM0003 methodology, the project restores forest ecosystems, improves biodiversity, strengthens soil quality, and delivers long-term climate benefits through permanent carbon removal. Recognized as one of Paraguay's pioneering climate forestry initiatives, the project demonstrates how ecological restoration and sustainable rural development can work together.",
    "highlights": [
      "Verified ICR carbon removal project",
      "Silvopastoral agroforestry system",
      "Restores degraded grasslands",
      "Long-term atmospheric carbon sequestration",
      "Independently validated and verified by TÜV Rheinland",
      "MSCI BBB sustainability rating"
    ],
    "sdgGoals": [
      2,
      4,
      6,
      8,
      10,
      13,
      15,
      17
    ],
    "registryName": "International Carbon Registry",
    "registryLogo": "https://documentation.carbonregistry.com/documentation/~gitbook/image?url=https%3A%2F%2F2441265052-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FfIdoGcZZdvap67xjb5h1%252Fuploads%252FjaHce4Zk5im2g4VKg5G1%252FICR%2520LogoGIT.png%3Falt%3Dmedia%26token%3Dd674201e-2449-45f1-bc70-663f67b32207&width=1248&dpr=3&quality=100&sign=7233e20c&sv=2",
    "projectType": "Removal",
    "methodology": "AR-ACM0003",
    "owner": "Global-Woods international AG",
    "stats": [
      {
        "label": "Available Credits",
        "value": "2,54,000",
        "pct": 45
      },
      {
        "label": "Issued Credits",
        "value": "2,55,000",
        "pct": 55
      },
      {
        "label": "Estimated Total Mitigations",
        "value": "5,04,000",
        "pct": 80
      },
      {
        "label": "Estimated Annual Mitigations",
        "value": "17,000",
        "pct": 20
      }
    ]
  },
  "PRAN-1525": {
    "sourceUrl": "https://pranglobal.com/PRAN-1525.html",
    "image": "https://d382rz2cea0pah.cloudfront.net/wp-content/uploads/2025/05/Sulzon-and-Integrum-Bag-BPCLs-100-MW-Wind-Projects.jpg",
    "gallery": [
      "https://d382rz2cea0pah.cloudfront.net/wp-content/uploads/2025/05/Sulzon-and-Integrum-Bag-BPCLs-100-MW-Wind-Projects.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGbrCaSUoh2d9GQWR5eR49GossHil4Hz9Tc5KZJ3snzQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNyi6xUGeFS0X9_tZP6OCrEQ0rAKtEdNeDdSfrwKJ7w&s=10"
    ],
    "lat": 26.9117,
    "lng": 70.9229,
    "description": "The Bhesada Wind Power Project is a large-scale renewable energy initiative located in Rajasthan, India, developed by Renew Power Synergy Private Limited under the Gold Standard for the Global Goals certification framework. The project generates clean electricity from wind resources and supplies it to the Indian national grid, replacing electricity that would otherwise be produced using fossil fuel-based power plants.\n\nBy displacing conventional grid electricity, the project delivers measurable greenhouse gas emission reductions while supporting India's renewable energy transition. Every verified carbon credit generated represents independently monitored and certified climate impact, providing organizations with access to high-integrity voluntary carbon credits.",
    "highlights": [
      "Gold Standard certified climate project.",
      "Large-scale renewable energy infrastructure",
      "Generates verified emission reductions annually",
      "Supplies renewable electricity to the national grid"
    ],
    "sdgGoals": [
      7,
      8,
      9
    ],
    "registryName": "Verified Carbon Standard",
    "registryLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpZZMl0Baa3QSviKjy5YqBPWNyBWPiwQlKct32Ks9Pfg&s=10",
    "projectType": null,
    "methodology": null,
    "owner": null,
    "stats": [
      {
        "label": "Total Remaining Supply",
        "value": "1,85,075",
        "pct": 85
      }
    ]
  },
  "PRAN-1190": {
    "sourceUrl": "https://pranglobal.com/PRAN-1190.html",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5gX_fCpP9Cgc9A4FQ2xGmNDgKDPNtGLe3J5GvKI9cvw&s=10",
    "gallery": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5gX_fCpP9Cgc9A4FQ2xGmNDgKDPNtGLe3J5GvKI9cvw&s=10",
      "https://cdn.sanity.io/images/l6of5nwi/production/b14f17921355bf8bb1ed85c95c7c1cb70fc22e76-1676x1062.png",
      "https://cdn.sanity.io/images/l6of5nwi/production/2f76de96c70a73104c299d8c3a7c314df46977cf-2000x1501.png",
      "https://cdn.sanity.io/images/l6of5nwi/production/b553e8df6112fcc158f729761db1e9ce5113ebec-2000x1334.png"
    ],
    "lat": 15.7515,
    "lng": 76.1929,
    "description": "The 21 MW Wind Energy Project by Shree Cement Limited is a Gold Standard certified renewable energy initiative designed to generate clean electricity using wind power and supply it to the regional state grid. By replacing electricity generated from fossil fuel-based power plants, the project delivers measurable greenhouse gas emission reductions while supporting India's transition toward a cleaner and more sustainable energy mix.\n\nDeveloped under the Gold Standard for the Global Goals certification framework, the project ensures that emission reductions are independently monitored, verified, and transparently issued as high-quality carbon credits. The initiative also demonstrates how industrial organizations can integrate renewable energy infrastructure into long-term climate action strategies while contributing to national renewable energy targets.",
    "highlights": [
      "21 MW utility-scale wind power project",
      "Gold Standard certified renewable energy project",
      "Generates verified carbon emission reductions",
      "Large-scale clean energy infrastructure"
    ],
    "sdgGoals": [
      7,
      8,
      9
    ],
    "registryName": "Verified Carbon Standard",
    "registryLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpZZMl0Baa3QSviKjy5YqBPWNyBWPiwQlKct32Ks9Pfg&s=10",
    "projectType": null,
    "methodology": null,
    "owner": null,
    "stats": [
      {
        "label": "Total Remaining Supply",
        "value": "45,317 tCO₂e",
        "pct": 89
      }
    ]
  },
  "PRAN-1650": {
    "sourceUrl": "https://pranglobal.com/PRAN-1650.html",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq3hAXsKkXwYYHFwYcrF480qPzkN8uMZ6UMMm_vLn49w&s=10",
    "gallery": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq3hAXsKkXwYYHFwYcrF480qPzkN8uMZ6UMMm_vLn49w&s=10",
      "https://cdn.britannica.com/10/222610-138-F0268996/britannica-insights-Phil-the-Fixer-renewable-energy.jpg?w=800&h=450&c=crop",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs_0ERzvwTAU98F23aZSuWXwLUx5PkUECj4iWy6ViADA&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQndvMGvWl1_Lvdup_fQYRmMBJLlxJxAVxdmoSWQ7sQog&s=10"
    ],
    "lat": 11.0598,
    "lng": 78.3875,
    "description": "The 33.9 MW Bundled Wind Power Project is a utility-scale renewable energy initiative spanning the states of Karnataka and Tamil Nadu. Developed by Techno Electric & Engineering Company Ltd, the project generates clean electricity using wind energy and supplies it to the regional electricity grid, replacing conventional fossil fuel-based power generation.\n\nRegistered under the Verra Verified Carbon Standard (VCS), the project delivers independently verified emission reductions through renewable electricity generation. By harnessing wind resources across multiple locations, the project contributes to India's clean energy transition while creating measurable climate benefits through avoided greenhouse gas emissions.",
    "highlights": [
      "33.9 MW bundled wind power project",
      "Registered under Verra Verified Carbon Standard (VCS)",
      "Operates across Karnataka and Tamil Nadu",
      "Uses internationally recognized ACM0002 methodology"
    ],
    "sdgGoals": [
      7,
      8,
      9
    ],
    "registryName": "Verified Carbon Standard",
    "registryLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6bUOm2VEsuhX5NmjExe-wJMZxDkjJpoSHHzRjpMuAhQ&s=10",
    "projectType": null,
    "methodology": null,
    "owner": null,
    "stats": [
      {
        "label": "Total Remaining Supply",
        "value": "81,947",
        "pct": 75
      }
    ]
  },
  "PRAN-985": {
    "sourceUrl": "https://pranglobal.com/PRAN-985.html",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXc64Z95xpCK5p6rXRmS5jzg5EFffTJBrlJpd0zJrcjg&s=10",
    "gallery": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXc64Z95xpCK5p6rXRmS5jzg5EFffTJBrlJpd0zJrcjg&s=10"
    ],
    "lat": 17.3871,
    "lng": 78.4917,
    "description": "The Bundled Solar Power Project by Mahindra Susten Private Limited is a large-scale renewable energy initiative comprising multiple grid-connected solar photovoltaic installations across Telangana, Gujarat, and Rajasthan. The project generates clean electricity from solar energy and exports it to regional electricity grids, reducing dependence on conventional fossil fuel-based power generation.\n\nRegistered under the Verra Verified Carbon Standard (VCS), the project delivers independently verified emission reductions through utility-scale solar power generation. By replacing carbon-intensive electricity with renewable solar energy, the project supports India's clean energy transition while contributing significantly to climate change mitigation and sustainable infrastructure development.",
    "highlights": [
      "Grid-connected photovoltaic (PV) generation",
      "Registered under Verra VCS",
      "Multi-state renewable energy infrastructure",
      "Utilizes internationally recognized ACM0002 methodology"
    ],
    "sdgGoals": [
      1,
      3,
      8,
      10,
      11,
      13,
      15
    ],
    "registryName": "Verified Carbon Standard",
    "registryLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6bUOm2VEsuhX5NmjExe-wJMZxDkjJpoSHHzRjpMuAhQ&s=10",
    "projectType": null,
    "methodology": null,
    "owner": null,
    "stats": [
      {
        "label": "Total Remaining Supply",
        "value": "3,29,360",
        "pct": 90
      }
    ]
  },
  "PRAN-981": {
    "sourceUrl": "https://pranglobal.com/PRAN-981.html",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc7OEs41wLWYHlZpnxDH-nwweC8VSLf_NYjyow18Lp1JsxyhtBCPyHTEQ&s=10",
    "gallery": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc7OEs41wLWYHlZpnxDH-nwweC8VSLf_NYjyow18Lp1JsxyhtBCPyHTEQ&s=10"
    ],
    "lat": 1.2701,
    "lng": 103.6959,
    "description": "The Grid Connected Electricity Generation Plant at Jurong Island is a utility-scale power generation facility located in Singapore and operated by PacificLight Power Pte. Ltd. The project utilizes high-efficiency natural gas technology to generate electricity for the national grid while achieving lower greenhouse gas emissions compared to conventional fossil fuel-based power generation.\n\nDeveloped under the Verra Verified Carbon Standard (VCS) using AM0029 methodology, the project improves generation efficiency and contributes to measurable emission reductions through cleaner electricity production. By replacing higher-emission electricity generation sources with efficient natural gas technology, the project supports Singapore's transition toward a lower-carbon power sector.",
    "highlights": [
      "Utility-scale grid-connected power generation facility",
      "Verra VCS registered project",
      "Uses internationally recognized AM0029 methodology",
      "Supports lower-carbon energy infrastructure"
    ],
    "sdgGoals": [
      9
    ],
    "registryName": "Verified Carbon Standard",
    "registryLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6bUOm2VEsuhX5NmjExe-wJMZxDkjJpoSHHzRjpMuAhQ&s=10",
    "projectType": null,
    "methodology": null,
    "owner": null,
    "stats": [
      {
        "label": "Total Remaining Supply",
        "value": "57,991 tCO₂e",
        "pct": 80
      }
    ]
  },
  "PRAN-929": {
    "sourceUrl": "https://pranglobal.com/PRAN-929.html",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9ceTdyybDfNd6PP9jt-c8UNSc6imxQ1D9R0JvglgnZg&s=10",
    "gallery": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9ceTdyybDfNd6PP9jt-c8UNSc6imxQ1D9R0JvglgnZg&s=10"
    ],
    "lat": 28.2076,
    "lng": 79.8267,
    "description": "The Biomass Based Steam Generation Project developed by Sterling Agro Industries Ltd. utilizes renewable biomass fuel to generate steam for industrial operations in Uttar Pradesh, India. By replacing conventional fossil fuel-based steam generation systems, the project significantly reduces greenhouse gas emissions while improving the sustainability of industrial energy consumption.\n\nRegistered under the Verra Verified Carbon Standard (VCS) using AMS-I.C. methodology, the project converts renewable biomass resources into useful thermal energy, supporting cleaner industrial processes and promoting efficient utilization of agricultural biomass residues. The initiative contributes to circular resource management while generating verified carbon emission reductions.",
    "highlights": [
      "Industrial biomass-based steam generation system",
      "Registered under Verra VCS",
      "Replaces fossil fuel-based steam production",
      "Developed using AMS-I.C. methodology"
    ],
    "sdgGoals": [
      9,
      12,
      13
    ],
    "registryName": "Verified Carbon Standard",
    "registryLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6bUOm2VEsuhX5NmjExe-wJMZxDkjJpoSHHzRjpMuAhQ&s=10",
    "projectType": null,
    "methodology": null,
    "owner": null,
    "stats": [
      {
        "label": "Total Remaining Supply",
        "value": "9,500",
        "pct": 90
      }
    ]
  },
  "PRAN-1941": {
    "sourceUrl": "https://pranglobal.com/PRAN-1941.html",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiIwv5OAZvLxaUQ7miLpVkXiapgGFFQgbfjdo_6hJRtA&s=10",
    "gallery": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiIwv5OAZvLxaUQ7miLpVkXiapgGFFQgbfjdo_6hJRtA&s=10"
    ],
    "lat": 22.7196,
    "lng": 75.8577,
    "description": "The Sustainable City Projects at India's Cleanest City – Indore is an integrated urban sustainability initiative developed by Indore Smart City Development Ltd. The project focuses on improving municipal solid waste management through scientific collection, segregation, processing, treatment, and disposal systems that significantly reduce greenhouse gas emissions from urban waste.\n\nRegistered under the Verra Verified Carbon Standard (VCS), the project applies internationally recognized methodologies to reduce methane emissions associated with conventional waste disposal while supporting resource recovery, circular economy practices, and sustainable urban infrastructure. The initiative demonstrates how modern city management can deliver measurable climate benefits alongside cleaner and healthier urban environments.",
    "highlights": [
      "Integrated municipal waste management project",
      "Registered under Verra VCS",
      "Reduces methane emissions from waste disposal",
      "Developed using ACM0002 & ACM0022 methodologies"
    ],
    "sdgGoals": [
      9
    ],
    "registryName": "Verified Carbon Standard",
    "registryLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6bUOm2VEsuhX5NmjExe-wJMZxDkjJpoSHHzRjpMuAhQ&s=10",
    "projectType": null,
    "methodology": null,
    "owner": null,
    "stats": [
      {
        "label": "Total Remaining Supply",
        "value": "283,396",
        "pct": 80
      }
    ]
  },
  "PRAN-2404": {
    "sourceUrl": "https://pranglobal.com/PRAN-2404.html",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnb16A0xBoE0Ot3Xo_L5QO--nLieVatHmchJcwXoZAGQ&s=10",
    "gallery": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnb16A0xBoE0Ot3Xo_L5QO--nLieVatHmchJcwXoZAGQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9DweBFw4cSYVnlXY_9_D8wtxWOwaTDvpmYMnm1fbhBw&s=10"
    ],
    "lat": 20.296,
    "lng": 85.824,
    "description": "The Reforestation of Degraded Land by MTPL is a large-scale Afforestation, Reforestation and Revegetation (ARR) initiative focused on restoring degraded forest landscapes across Odisha, Andhra Pradesh, and Chhattisgarh. Developed by the Mangalam Timber Unit of Mangalam Cement Limited, the project establishes long-term forest cover on previously degraded land, enabling significant atmospheric carbon sequestration while improving ecosystem resilience.\n\nRegistered under the Verra Verified Carbon Standard (VCS) using AR-ACM0001 methodology, the project delivers measurable climate benefits through sustainable forest restoration. Beyond carbon removal, the initiative supports biodiversity conservation, improves soil health, enhances watershed functions, and creates long-term ecological value through responsible land management.",
    "highlights": [
      "Large-scale degraded land reforestation project",
      "Registered under Verra Verified Carbon Standard (VCS)",
      "ARR (Afforestation, Reforestation & Revegetation) activity",
      "Covers approximately 2,939 hectares"
    ],
    "sdgGoals": [
      6,
      8,
      12,
      13,
      15
    ],
    "registryName": "Verified Carbon Standard",
    "registryLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6bUOm2VEsuhX5NmjExe-wJMZxDkjJpoSHHzRjpMuAhQ&s=10",
    "projectType": null,
    "methodology": null,
    "owner": null,
    "stats": [
      {
        "label": "Total Remaining Supply",
        "value": "1,46,998",
        "pct": 80
      }
    ]
  },
  "PRAN-5296": {
    "sourceUrl": "https://pranglobal.com/PRAN-5296.html",
    "image": "https://images-citizenmatters.sgp1.digitaloceanspaces.com/wp-content/uploads-new/2025/04/15_Micro_Composting_Centres_Chennai_Shobana_April_2025-1024x768.jpg",
    "gallery": [
      "https://images-citizenmatters.sgp1.digitaloceanspaces.com/wp-content/uploads-new/2025/04/15_Micro_Composting_Centres_Chennai_Shobana_April_2025-1024x768.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGkFNLW2GTo-hkr8XEk__bBl2xftwUEZIlJg_labxpsg&s=10"
    ],
    "lat": 22.9,
    "lng": 88.389999,
    "description": "The 300 TPD Baidyabati Composting Project is a municipal solid waste management initiative developed by Eastern Organic Fertilizer Pvt. Ltd. (EOFPL) in Hooghly District, West Bengal. The project utilizes aerobic composting technology to scientifically process biodegradable municipal waste into nutrient-rich organic compost while preventing methane emissions that would otherwise occur through conventional landfill disposal.\n\nRegistered under the Verra Verified Carbon Standard (VCS), the project supports sustainable urban waste management, promotes circular economy practices, and delivers measurable climate benefits through avoided greenhouse gas emissions. In addition to reducing landfill dependency, the project contributes to resource recovery by converting organic waste into valuable agricultural inputs.",
    "highlights": [
      "300 TPD municipal solid waste composting facility",
      "Verra VCS registered waste management project",
      "Utilizes aerobic composting technology",
      "Expected carbon credit issuance in Q3 2026"
    ],
    "sdgGoals": [
      11,
      12,
      13,
      15
    ],
    "registryName": "Verified Carbon Standard",
    "registryLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6bUOm2VEsuhX5NmjExe-wJMZxDkjJpoSHHzRjpMuAhQ&s=10",
    "projectType": null,
    "methodology": null,
    "owner": null,
    "stats": [
      {
        "label": "Total Remaining Supply",
        "value": "1700",
        "pct": 90
      }
    ]
  },
  "PRAN-5833": {
    "sourceUrl": "https://pranglobal.com/PRAN-5833.html",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3kH7ENEwuKzv5PSgvQ91KhE3SmY88jDlGlkdU1iqihU2m61n80gW7ps8&s=10",
    "gallery": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3kH7ENEwuKzv5PSgvQ91KhE3SmY88jDlGlkdU1iqihU2m61n80gW7ps8&s=10"
    ],
    "lat": 11.127123,
    "lng": 78.656891,
    "description": "The 1,397 TPD Bundled Composting Project is a large-scale organic waste management initiative developed by Eastern Organic Fertilizer Pvt. Ltd. (EOFPL) across multiple composting facilities in Tamil Nadu, India. The project utilizes advanced composting systems to scientifically process biodegradable municipal waste into nutrient-rich organic compost while preventing methane emissions associated with landfill disposal.\n\nRegistered under the Verra Verified Carbon Standard (VCS), the project aggregates multiple composting sites into a single bundled carbon program, enabling efficient large-scale emission reductions and improved waste management practices. The initiative supports circular economy principles by transforming organic waste into valuable agricultural resources while reducing environmental impacts.",
    "highlights": [
      "Large-scale bundled composting project",
      "Processes approximately 1,397 tonnes of organic waste per day",
      "Registered under Verra VCS",
      "Expected carbon credit issuance in Q3 2026"
    ],
    "sdgGoals": [
      11,
      12,
      13
    ],
    "registryName": "Verified Carbon Standard",
    "registryLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6bUOm2VEsuhX5NmjExe-wJMZxDkjJpoSHHzRjpMuAhQ&s=10",
    "projectType": null,
    "methodology": null,
    "owner": null,
    "stats": [
      {
        "label": "Total Remaining Supply",
        "value": "22000",
        "pct": 90
      }
    ]
  },
  "PRAN-3889": {
    "sourceUrl": "https://pranglobal.com/PRAN-3889.html",
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/9/542099237/MU/OF/WS/16356905/biogas-plant-installation-services.jpg",
    "gallery": [
      "https://5.imimg.com/data5/SELLER/Default/2025/9/542099237/MU/OF/WS/16356905/biogas-plant-installation-services.jpg"
    ],
    "lat": 20.5937,
    "lng": 78.9629,
    "description": "The 210.10 TPD Biogas Grouped Project is a grouped animal manure management initiative that converts livestock waste into renewable biogas through controlled anaerobic digestion systems. By capturing methane that would otherwise be released into the atmosphere, the project significantly reduces greenhouse gas emissions while producing renewable energy from agricultural waste streams.\n\nRegistered under the Verra Verified Carbon Standard (VCS), the project supports sustainable livestock waste management by transforming organic waste into clean energy and nutrient-rich organic by-products. The grouped project model enables multiple eligible facilities to participate under a unified carbon program, increasing climate impact while promoting circular resource utilization across the agricultural sector.",
    "highlights": [
      "Grouped animal manure management project",
      "Converts livestock manure into renewable biogas",
      "Registered under Verra VCS",
      "Expected carbon credit issuance in Q4 2026"
    ],
    "sdgGoals": [
      7,
      12,
      13,
      15
    ],
    "registryName": "Verified Carbon Standard",
    "registryLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6bUOm2VEsuhX5NmjExe-wJMZxDkjJpoSHHzRjpMuAhQ&s=10",
    "projectType": null,
    "methodology": null,
    "owner": null,
    "stats": [
      {
        "label": "Total Remaining Supply",
        "value": "70000",
        "pct": 90
      }
    ]
  },
  "PRAN-449": {
    "sourceUrl": "https://pranglobal.com/PRAN-449.html",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcC7udYxyS-ueIx0ZRkgD12_qZeZ4jVY8LxgAyMMlSGg&s=10",
    "gallery": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcC7udYxyS-ueIx0ZRkgD12_qZeZ4jVY8LxgAyMMlSGg&s=10"
    ],
    "lat": 22.3094,
    "lng": 72.1362,
    "description": "The 9.62 MW PIPL Solar Project is a utility-scale solar photovoltaic initiative developed by Panoli Intermediates (India) Pvt. Ltd. (PIPL) to generate clean electricity from renewable solar energy. The project contributes renewable power to India's electricity infrastructure while reducing greenhouse gas emissions associated with conventional fossil fuel-based electricity generation.\n\nRegistered under the Universal Carbon Registry (UCR), the project supports India's transition toward sustainable energy by generating verified carbon credits through renewable electricity production. In addition to this project, the company is actively involved in the development of solar hybrid energy projects and solar panel manufacturing initiatives in Gujarat, strengthening its long-term commitment to clean energy infrastructure.",
    "highlights": [
      "Utility-scale 9.62 MW solar photovoltaic project",
      "Registered under Universal Carbon Registry (UCR)",
      "Developed by Panoli Intermediates (India) Pvt. Ltd.",
      "Part of a broader clean energy portfolio including solar hybrid initiatives"
    ],
    "sdgGoals": [
      7,
      8,
      9,
      12,
      13
    ],
    "registryName": "Verified Carbon Standard",
    "registryLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW47PAzBVbW9LLq98wfy_pGJEmfj5vPqYdwjGJJeW9Bw&s=10",
    "projectType": null,
    "methodology": null,
    "owner": null,
    "stats": [
      {
        "label": "Total Remaining Supply",
        "value": "44,041",
        "pct": 90
      }
    ]
  },
  "PRAN-451": {
    "sourceUrl": "https://pranglobal.com/PRAN-451.html",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHsfUbSGotW8exQa2XNuXGuKlMwACwO7rspiUt8tZJyQ&s=10",
    "gallery": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHsfUbSGotW8exQa2XNuXGuKlMwACwO7rspiUt8tZJyQ&s=10"
    ],
    "lat": 22.3094,
    "lng": 72.1362,
    "description": "The 5.5 MW KCIL-PIPL Wind Project is a utility-scale renewable energy initiative that generates clean electricity using wind power while contributing verified carbon credits under the Universal Carbon Registry (UCR). The project supports India's transition toward low-carbon electricity generation by replacing conventional fossil fuel-based power with renewable wind energy.\n\nDeveloped as a joint initiative by KCIL-PIPL, the project demonstrates collaborative investment in sustainable energy infrastructure. In addition to this wind project, the organization has also developed integrated solar and wind hybrid projects through dedicated special purpose vehicles, further strengthening its commitment to renewable energy development.",
    "highlights": [
      "Utility-scale 5.5 MW wind power project",
      "Registered under Universal Carbon Registry (UCR)",
      "Joint renewable energy initiative by KCIL-PIPL",
      "Part of a broader solar-wind hybrid energy portfolio"
    ],
    "sdgGoals": [
      7,
      8,
      9,
      12,
      13
    ],
    "registryName": "Verified Carbon Standard",
    "registryLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW47PAzBVbW9LLq98wfy_pGJEmfj5vPqYdwjGJJeW9Bw&s=10",
    "projectType": null,
    "methodology": null,
    "owner": null,
    "stats": [
      {
        "label": "Total Remaining Supply",
        "value": "31,236",
        "pct": 90
      }
    ]
  },
  "PRAN-454": {
    "sourceUrl": "https://pranglobal.com/PRAN-454.html",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCJSoftLkHwiWz2632pOgEiZHhnm3fL8qis_LO-FP6XUPea8IV00r5Q-s&s=10",
    "gallery": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCJSoftLkHwiWz2632pOgEiZHhnm3fL8qis_LO-FP6XUPea8IV00r5Q-s&s=10"
    ],
    "lat": 22.3094,
    "lng": 72.1362,
    "description": "The 4.2 MW KCIL Waste Heat to Power Bundled Project is an industrial energy efficiency initiative that captures waste heat generated during manufacturing processes and converts it into useful electricity through Waste Heat Recovery (WHR) technology. Instead of allowing excess thermal energy to dissipate, the project utilizes this recovered heat to generate power, improving overall energy efficiency while reducing dependence on conventional electricity sources.\n\nRegistered under the Universal Carbon Registry (UCR), the project delivers verified carbon credits by reducing greenhouse gas emissions associated with industrial energy consumption. By recovering and utilizing otherwise wasted energy, the project supports cleaner industrial operations, lower fuel consumption, and long-term decarbonization of the manufacturing sector.",
    "highlights": [
      "4.2 MW waste heat recovery power project",
      "Registered under Universal Carbon Registry (UCR)",
      "Converts industrial waste heat into electricity",
      "Promotes efficient utilization of existing energy resources"
    ],
    "sdgGoals": [
      7,
      9,
      12,
      13
    ],
    "registryName": "Verified Carbon Standard",
    "registryLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW47PAzBVbW9LLq98wfy_pGJEmfj5vPqYdwjGJJeW9Bw&s=10",
    "projectType": null,
    "methodology": null,
    "owner": null,
    "stats": [
      {
        "label": "Total Remaining Supply",
        "value": "21,032",
        "pct": 90
      }
    ]
  },
  "PRAN-455": {
    "sourceUrl": "https://pranglobal.com/PRAN-455.html",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtSPb-z486MBFN-qasSqLHTtPvecvFdtajhMDsY-4KUQ&s=10",
    "gallery": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtSPb-z486MBFN-qasSqLHTtPvecvFdtajhMDsY-4KUQ&s=10"
    ],
    "lat": 22.3094,
    "lng": 72.1362,
    "description": "The 20.5 MW PIPL Waste Heat to Power Bundled Project is a large-scale industrial energy efficiency initiative developed by Panoli Intermediates (India) Pvt. Ltd. (PIPL) in Nandesari Village, Vadodara District, Gujarat. The project captures waste heat generated during industrial operations and converts it into useful electricity through advanced Waste Heat to Power (WHP) technology.\n\nRegistered under the Universal Carbon Registry (UCR), the project continuously reduces greenhouse gas emissions by utilizing recovered thermal energy that would otherwise be lost. By generating electricity from waste heat, the project improves overall plant energy efficiency, reduces dependence on conventional grid electricity, and supports sustainable industrial decarbonization through verified carbon credit generation.",
    "highlights": [
      "Large-scale 20.5 MW waste heat to power project",
      "Registered under Universal Carbon Registry (UCR)",
      "Supports sustainable manufacturing operations",
      "Located in Vadodara District, Gujarat"
    ],
    "sdgGoals": [
      7,
      9,
      12,
      13
    ],
    "registryName": "Verified Carbon Standard",
    "registryLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW47PAzBVbW9LLq98wfy_pGJEmfj5vPqYdwjGJJeW9Bw&s=10",
    "projectType": null,
    "methodology": null,
    "owner": null,
    "stats": [
      {
        "label": "Total Remaining Supply",
        "value": "232,545",
        "pct": 90
      }
    ]
  },
  "PRAN-487": {
    "sourceUrl": "https://pranglobal.com/PRAN-487.html",
    "image": "https://etimg.etb2bimg.com/photo/129843874.cms",
    "gallery": [
      "https://etimg.etb2bimg.com/photo/129843874.cms",
      "https://media.assettype.com/energywatch/2023-10/d8fdf7da-9614-44bb-8a1e-5cd0b83f5075/RE_energy_watch.jpg?w=1200&h=900&auto=format%2Ccompress&fit=max&enlarge=true"
    ],
    "lat": 22.3094,
    "lng": 72.1362,
    "description": "The 123.88 MW KP Group Solar Wind & Hybrid Project is a large-scale integrated renewable energy initiative developed by KP Group (KPI Green Energy / KP Energy) in Gujarat, India. The project combines solar photovoltaic and wind power generation within a hybrid energy infrastructure to maximize renewable electricity production and improve overall generation efficiency.\n\nRegistered under the Universal Carbon Registry (UCR), the project generates verified carbon credits by supplying clean electricity from multiple renewable energy sources while reducing dependence on conventional fossil fuel-based power generation. The integrated hybrid approach improves energy availability by utilizing complementary solar and wind resources, contributing to a more reliable and efficient renewable energy system.",
    "highlights": [
      "123.88 MW integrated renewable energy project",
      "Registered under Universal Carbon Registry (UCR)",
      "Combines solar photovoltaic and wind power generation",
      "Developed by KP Group (KPI Green Energy / KP Energy)"
    ],
    "sdgGoals": [
      7,
      8,
      9,
      12,
      13
    ],
    "registryName": "Verified Carbon Standard",
    "registryLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW47PAzBVbW9LLq98wfy_pGJEmfj5vPqYdwjGJJeW9Bw&s=10",
    "projectType": null,
    "methodology": null,
    "owner": null,
    "stats": [
      {
        "label": "Total Remaining Supply",
        "value": "788,570",
        "pct": 90
      }
    ]
  },
  "PRAN-2009": {
    "sourceUrl": "https://pranglobal.com/PRAN-2009.html",
    "image": "https://etimg.etb2bimg.com/photo/65942551.cms",
    "gallery": [
      "https://etimg.etb2bimg.com/photo/65942551.cms"
    ],
    "lat": 27.700769,
    "lng": 85.30014,
    "description": "The 2.4 MW Hydroelectric Project is an operational renewable energy facility in Nepal that generates clean electricity through hydropower. Commissioned in 2009, the project continues to supply renewable electricity while issuing International Renewable Energy Certificates (I-RECs), enabling organizations to substantiate renewable electricity consumption and sustainability commitments.\n\nRegistered under the I-REC(E) framework, the project contributes to Nepal's renewable energy sector by utilizing hydropower resources for low-carbon electricity generation. The continued issuance of renewable energy certificates demonstrates the long-term operational reliability and environmental value of the facility.",
    "highlights": [
      "Operational 2.4 MW hydropower project",
      "Eligible for I-REC(E) issuance",
      "Generates renewable electricity from hydropower",
      "Commissioned in 2009",
      "Contributes to Nepal's renewable energy sector"
    ],
    "sdgGoals": [
      7,
      9,
      13,
      15
    ],
    "registryName": "Verified Carbon Standard",
    "registryLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaj1aTlIuJASPD_pmTlLM0WlXr7_2WOB2mKUR9Wb8SBQ&s",
    "projectType": null,
    "methodology": null,
    "owner": null,
    "stats": [
      {
        "label": "Total Remaining Supply",
        "value": "11,419",
        "pct": 90
      }
    ]
  },
  "PRAN-2019": {
    "sourceUrl": "https://pranglobal.com/PRAN-2019.html",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDh005Caax7kaNLxIVeBIhYJWfhz1sApGsFh9QGQsSJgjkIr0lWIiNuQI&s=10",
    "gallery": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDh005Caax7kaNLxIVeBIhYJWfhz1sApGsFh9QGQsSJgjkIr0lWIiNuQI&s=10"
    ],
    "lat": 27.700769,
    "lng": 87.0342,
    "description": "The 9.9 MW Taksar-Pikhuwa Hydropower Project is a utility-scale renewable energy facility in Nepal generating clean electricity through hydropower. Commissioned in 2019, the project is recognized as Nepal's first Hydro I-REC project, marking a significant milestone in the country's renewable energy certificate ecosystem.\n\nRegistered under the International Renewable Energy Certificate (I-REC) framework, the project successfully issued its first I-RECs in June 2025 and is RE100 Eligible, enabling organizations to procure internationally recognized renewable electricity certificates for sustainability reporting and renewable energy commitments.",
    "highlights": [
      "Nepal's first Hydro I-REC project",
      "RE100 Eligible renewable energy certificates",
      "Utility-scale 9.9 MW hydropower facility",
      "First I-RECs issued in June 2025",
      "Contributes to Nepal's clean energy transition"
    ],
    "sdgGoals": [
      7,
      9,
      13,
      15
    ],
    "registryName": "Verified Carbon Standard",
    "registryLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaj1aTlIuJASPD_pmTlLM0WlXr7_2WOB2mKUR9Wb8SBQ&s",
    "projectType": null,
    "methodology": null,
    "owner": null,
    "stats": [
      {
        "label": "Total Remaining Supply",
        "value": "38,807",
        "pct": 90
      }
    ]
  },
  "PRAN-2020": {
    "sourceUrl": "https://pranglobal.com/PRAN-2020.html",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQDW2PySVF1scOjGHE8qReeu8PqjJbJCVRqtwo0SgQfw&s=10",
    "gallery": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQDW2PySVF1scOjGHE8qReeu8PqjJbJCVRqtwo0SgQfw&s=10"
    ],
    "lat": 27.700769,
    "lng": 83.456978,
    "description": "The 8.5 MW Butwal Solar PV Project is a utility-scale solar photovoltaic facility located in Rupandehi, Nepal, generating clean renewable electricity through advanced solar PV technology. Commissioned in 2020, the project plays an important role in expanding Nepal's renewable energy capacity while supplying internationally recognized renewable electricity certificates.\n\nRegistered under the International Renewable Energy Certificate (I-REC) framework, the project is RE100 Eligible and is recognized among Nepal's pioneering Solar I-REC projects, with registration supported by Monsoon Carbon. The project enables organizations to procure verified renewable electricity certificates to support sustainability reporting, renewable electricity procurement, and corporate clean energy commitments.",
    "highlights": [
      "Utility-scale 8.5 MW solar photovoltaic project",
      "RE100 Eligible renewable electricity certificates",
      "Commissioned in 2020",
      "Located in Rupandehi, Nepal"
    ],
    "sdgGoals": [
      7,
      9,
      13,
      15
    ],
    "registryName": "Verified Carbon Standard",
    "registryLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaj1aTlIuJASPD_pmTlLM0WlXr7_2WOB2mKUR9Wb8SBQ&s",
    "projectType": null,
    "methodology": null,
    "owner": null,
    "stats": [
      {
        "label": "Total Remaining Supply",
        "value": "12,820",
        "pct": 90
      }
    ]
  },
  "PRAN-2024": {
    "sourceUrl": "https://pranglobal.com/PRAN-2024.html",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5yCoKxOwdKBpcTWQbeCz_Pik8ohrIaX1sxmdsaiLLGQ&s=10",
    "gallery": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5yCoKxOwdKBpcTWQbeCz_Pik8ohrIaX1sxmdsaiLLGQ&s=10"
    ],
    "lat": 27.700769,
    "lng": 83.456978,
    "description": "The 25 MW Solar PV Project is a utility-scale renewable energy facility commissioned in 2024 to generate clean electricity through advanced solar photovoltaic technology. The project represents one of Nepal's newer large-scale solar developments and contributes significantly to expanding the country's renewable energy capacity.\n\nRegistered under the International Renewable Energy Certificate (I-REC) framework, the project is RE100 Eligible, enabling organizations to procure internationally recognized renewable electricity certificates. By supplying clean solar energy to the grid, the project supports Nepal's growing renewable energy ambitions and contributes to the country's long-term clean energy transition.",
    "highlights": [
      "Utility-scale 25 MW solar photovoltaic project",
      "RE100 Eligible renewable electricity certificates",
      "Commissioned in 2024",
      "Supports Nepal's expanding renewable energy portfolio"
    ],
    "sdgGoals": [
      7,
      9,
      13,
      15
    ],
    "registryName": "Verified Carbon Standard",
    "registryLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaj1aTlIuJASPD_pmTlLM0WlXr7_2WOB2mKUR9Wb8SBQ&s",
    "projectType": null,
    "methodology": null,
    "owner": null,
    "stats": [
      {
        "label": "Total Remaining Supply",
        "value": "42,350",
        "pct": 90
      }
    ]
  }
};
