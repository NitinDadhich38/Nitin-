/**
 * Real project facts pulled from the issuing registries' own public APIs.
 *
 * Gold Standard (25 projects): fetched from
 * public-api.goldstandard.org on 2026-07-31,
 * matched to PRAN's portfolio on `sustaincert_id` (the number the portfolio
 * writes as "GS ####"). Descriptions, SDG mappings, methodology, developer,
 * project type and crediting periods are the registry's own values, verbatim.
 *
 * Coordinates: 8 of 25 carry usable
 * coordinates. 2 row(s) published coordinates that fall outside the
 * project's own stated country, so those were DROPPED rather than shown — a
 * wrong pin is worse than none, and the UI falls back to a country-level
 * location instead (see lib/country-locations.ts).
 *
 * Verra, ICR, UCR and CDM do not expose comparable open project APIs
 * (Verra's is Okta-gated, ICR's needs an access token, CDM is bot-blocked),
 * so projects under those standards are covered by lib/live-project-media.ts
 * where pranglobal.com published a page, and otherwise fall back to
 * country-level location + sector photography. Never fabricate the rest.
 */

export type RegistryFacts = {
  source: string;
  registryUrl: string | null;
  gsNumber: string;
  description: string | null;
  lat: number | null;
  lng: number | null;
  sdgGoals: number[];
  methodology: string | null;
  projectType: string | null;
  developer: string | null;
  size: string | null;
  estimatedAnnualCredits: number | null;
  creditingPeriod: string | null;
  status: string | null;
};

export const registryFacts: Record<string, RegistryFacts> = {
  "PRAN-7745": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS7745",
    "gsNumber": "7745",
    "description": "The project activity involves installation of Wind Turbine Generators (WTG’s) in Laximpar village, Kutch district, Gujarat, India promoted by the Alfanar Power Private Limited. The total installed capacity of this project activity is 301.4 MW from 22 WTGs of 2.3 MW each and 114 WTGs of 2.2 MW each. The entire power generated will be exported to the Indian National Grid. The project developer has signed power purchase agreement with Solar Energy Corporation of India (SECI)",
    "lat": null,
    "lng": null,
    "sdgGoals": [
      7,
      8,
      13
    ],
    "methodology": null,
    "projectType": "Wind",
    "developer": "Kosher Climate India Pvt Ltd.",
    "size": "Large Scale",
    "estimatedAnnualCredits": 901559,
    "creditingPeriod": "2020-07-28 to 2030-07-27",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-1525": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS11401",
    "gsNumber": "11401",
    "description": "The project activity generates power using renewable energy source (wind energy) and sell the power generated to the National grid. The project activity generates electricity using wind energy. The generated electricity is exported to the Indian grid system which is under the purview of the INDIAN electricity grid of India. The project activity replaces anthropogenic emissions of greenhouse gases estimated to be approximately 189,075 tCO2e per year, thereon displacing 202,306 MWh/year amount of electricity from the generation-mix of power plants connected to the INDIAN GRID, which is mainly dominated by thermal/ fossil fuel based power plant.",
    "lat": null,
    "lng": null,
    "sdgGoals": [
      7,
      8,
      13
    ],
    "methodology": "ACM0002 Grid-connected electricity generation from renewable sources",
    "projectType": "Wind",
    "developer": "Renew Power Synergy Private Limited",
    "size": "Large Scale",
    "estimatedAnnualCredits": 185075,
    "creditingPeriod": "2016-03-31 to 2026-03-30",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-11677": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS11677",
    "gsNumber": "11677",
    "description": "The GS Biomass Energy Conservation (BEC) POA is a voluntary initiative by Hestian Innovation Ltd. (Hestian) which aims to promote sustainable development and the reduction of greenhouse gas emissions from non-renewable biomass fuel through dissemination of cleaner, more energy efficient household cookstoves in Malawi and Rwanda.",
    "lat": null,
    "lng": null,
    "sdgGoals": [
      1,
      3,
      5,
      7,
      8,
      13,
      15
    ],
    "methodology": "AMS-II.G. Energy Efficiency Measures in Thermal Applications of Non-Renewable Biomass",
    "projectType": "Energy Efficiency - Domestic",
    "developer": "Hestian Innovation",
    "size": "Small Scale",
    "estimatedAnnualCredits": 460231,
    "creditingPeriod": "2016-10-15 to 2026-10-14",
    "status": "GOLD_STANDARD_CERTIFIED_DESIGN"
  },
  "PRAN-12668": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS12668",
    "gsNumber": "12668",
    "description": "The purpose of the VPA is to disseminate Safe Water Supply (SWS) devices such as Household Water Treatment (HWT) technologies in domestic households of Maharashtra, India. They are distributed to households which were earlier using wood on rudimentary stoves for boiling water or were consuming untreated water.",
    "lat": null,
    "lng": null,
    "sdgGoals": [
      1,
      3,
      5,
      6,
      7,
      8,
      13
    ],
    "methodology": null,
    "projectType": "Energy Efficiency - Domestic",
    "developer": "ASVATA CLIMATE SOLUTIONS PRIVATE LIMITED",
    "size": "Small Scale",
    "estimatedAnnualCredits": 37853,
    "creditingPeriod": "2024-03-29 to 2029-03-28",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-11403": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS11403",
    "gsNumber": "11403",
    "description": "The project activity generates power using renewable energy source (wind energy) and sell the power generated to the National grid. The project activity generates electricity using wind energy. The generated electricity is exported to the Indian grid system which is under the purview of the INDIAN electricity grid of India. The project activity replaces anthropogenic emissions of greenhouse gases estimated to be approximately 72,085 tCO2e per year, thereon displacing 77,130 MWh/year amount of electricity from the generation-mix of power plants connected to the INDIAN GRID, which is mainly dominated by thermal/ fossil fuel based power plant.",
    "lat": null,
    "lng": null,
    "sdgGoals": [
      7,
      8,
      13
    ],
    "methodology": "ACM0002 Grid-connected electricity generation from renewable sources",
    "projectType": "Wind",
    "developer": "Renew Power Synergy Private Limited",
    "size": "Large Scale",
    "estimatedAnnualCredits": 72085,
    "creditingPeriod": "2016-05-02 to 2026-05-01",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-11405": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS11405",
    "gsNumber": "11405",
    "description": "The project activity generates power using renewable energy source and sell the power generated to the National grid. The project activity generates electricity using solar power energy. The generated electricity is exported to the Indian grid system which is under the purview of the INDIAN electricity grid of India.",
    "lat": null,
    "lng": null,
    "sdgGoals": [
      7,
      8,
      13
    ],
    "methodology": null,
    "projectType": "Solar Thermal - Electricity",
    "developer": "Renew Power Synergy Private Limited",
    "size": "Large Scale",
    "estimatedAnnualCredits": 89622,
    "creditingPeriod": "2016-09-28 to 2026-09-27",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-12293": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS12293",
    "gsNumber": "12293",
    "description": "The proposed project activity involves distribution of improved cook stoves to the target households in Bihar, India. The ICS units will be distributed to the households in the various district of Bihar. The proposed project activity will be jointly funded by ReNew & Kosher Climate India Private Limited, and the local implementation partner.\n\nThe purpose of the project activity is to decrease fuel wood consumption by replacing inefficient traditional cook stoves in 42,000 households with efficient fuel wood single pan Earthfit-Arjun cook stoves in Bihar, India. Based on average thermal efficiency improvement of Earthfit-Arjun cook stove, each household saves about 2 t/year. In the baseline, the fuelwood consumption is 2.8 t/household/yr. By reducing fuel wood consumption, the project activity reduces greenhouse gas (GHG) emissions stemming from the use of non-renewable biomass. The ICS cook stoves expected to save about 3.33 t of CO2/yr/family in this region, alongside providing smoke free environment at home and reducing drudgery for collection of fuelwoods. Each stove unit will be given a unique identification number so that they can be easily identified during the monitoring surveys and to avoid double counting of the total installed units.",
    "lat": null,
    "lng": null,
    "sdgGoals": [
      1,
      3,
      5,
      7,
      8,
      13,
      15
    ],
    "methodology": null,
    "projectType": "Energy Efficiency - Domestic",
    "developer": "Renew Power Synergy Private Limited",
    "size": "Large Scale",
    "estimatedAnnualCredits": 140049,
    "creditingPeriod": "2023-01-09 to 2028-01-09",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-11551": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS11551",
    "gsNumber": "11551",
    "description": "The goal of the proposed project is to distribute improved cookstoves (ICS) to households in Zimbabwe.",
    "lat": null,
    "lng": null,
    "sdgGoals": [
      1,
      3,
      5,
      7,
      8,
      12,
      13
    ],
    "methodology": null,
    "projectType": "Energy Efficiency - Domestic",
    "developer": "THE AFRICAN STOVE COMPANY LIMITED",
    "size": "Large Scale",
    "estimatedAnnualCredits": 212590,
    "creditingPeriod": "2021-09-23 to 2026-09-22",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-7668": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS7668",
    "gsNumber": "7668",
    "description": "The project activity involves generation of electricity from hydro, a renewable source of energy in the district of Shimla of Himachal Pradesh State, India. The proposed project activity, an initiative by Technology house (India) Private Limited. The project consists of total capacity of 9.6MW. The project would result into 43629  tCO2e of annual average emission reduction.",
    "lat": null,
    "lng": null,
    "sdgGoals": [
      7,
      8,
      13
    ],
    "methodology": "AMS-I.D. Grid connected renewable electricity generation",
    "projectType": "Small, Low - Impact Hydro",
    "developer": "Orange Renewable Power Pvt Ltd",
    "size": "Small Scale",
    "estimatedAnnualCredits": 43634,
    "creditingPeriod": "2017-03-31 to 2027-03-30",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-7630": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS7630",
    "gsNumber": "7630",
    "description": "The project activity involves generation of electricity from wind, a renewable source of energy at Jaisalmer district in the state of Rajasthan, India. The proposed project activity is an initiative by Khandke Wind Energy Private Limited (KWEPL). The project activity consists of 55 WEGs of 0.8 MW capacities each totaling to a capacity of 44 MW. The project would result into 68,729 tCO2e of annual average emission reduction.",
    "lat": null,
    "lng": null,
    "sdgGoals": [
      7,
      8,
      13
    ],
    "methodology": "ACM0002 Grid-connected electricity generation from renewable sources",
    "projectType": "Wind",
    "developer": "Orange Renewable Power Pvt Ltd",
    "size": "Large Scale",
    "estimatedAnnualCredits": 67063,
    "creditingPeriod": "2023-11-01 to 2028-10-31",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-7628": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS7628",
    "gsNumber": "7628",
    "description": "The project activity involves generation of electricity from wind, a renewable source of energy near Lalpur village, in Gujarat. The proposed project activity, an initiative by Tadas Wind Energy Private Limited (TWEPL). The project activity consists of 69 WEGs of 0.8 MW capacities each of Wind World (formerly Enercon (India) Limited) make, resulting in total installed capacity of 55.2 MW.",
    "lat": null,
    "lng": null,
    "sdgGoals": [
      7,
      8,
      13
    ],
    "methodology": "ACM0002 Grid-connected electricity generation from renewable sources",
    "projectType": "Wind",
    "developer": "Orange Renewable Power Pvt Ltd",
    "size": "Large Scale",
    "estimatedAnnualCredits": 94584,
    "creditingPeriod": "2023-11-01 to 2028-10-31",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-7632": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS7632",
    "gsNumber": "7632",
    "description": "The project activity involves generation of electricity from wind, a renewable source of energy at  in Jamnagar district of Gujarat, India. The proposed project activity is an initiative by Kaze Energy Limited. The project activity consists of 21 WEGs of 2.3 MW capacities each totaling to a capacity of 48.3 MW. The project would result into 109,044 tCO2e of annual average emission reduction.",
    "lat": null,
    "lng": null,
    "sdgGoals": [
      7,
      8,
      13
    ],
    "methodology": "ACM0002 Grid-connected electricity generation from renewable sources",
    "projectType": "Other",
    "developer": "Orange Renewable Power Pvt Ltd",
    "size": "Large Scale",
    "estimatedAnnualCredits": 108398,
    "creditingPeriod": "2019-10-04 to 2029-10-03",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-7629": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS7629",
    "gsNumber": "7629",
    "description": "The project activity involves generation of electricity from wind, a renewable source of energy in the state of Madhya Pradesh, India. The proposed project activity is an initiative by Ratedi Wind Power Private Limited. The project activity consists of 70 WEGs of 0.8 MW capacities each totaling to a capacity of 56 MW. The project would result into 88,711 tCO2e of annual average emission reduction.",
    "lat": null,
    "lng": null,
    "sdgGoals": [
      7,
      8,
      13
    ],
    "methodology": "ACM0002 Grid-connected electricity generation from renewable sources",
    "projectType": "Other",
    "developer": "Orange Renewable Power Pvt Ltd",
    "size": "Large Scale",
    "estimatedAnnualCredits": 88711,
    "creditingPeriod": "2018-11-01 to 2028-10-31",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-7633": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS7633",
    "gsNumber": "7633",
    "description": "The project activity involves generation of electricity from wind, a renewable source of energy in the state of Madhya Pradesh, India. The proposed project activity is an initiative by Etesian Urja Limited . The project activity consists of 25 WEGs of 2 MW capacities each totaling to a capacity of 50 MW. The project would result into 129,068 tCO2e of annual average emission reduction.",
    "lat": null,
    "lng": null,
    "sdgGoals": [
      7,
      8,
      13
    ],
    "methodology": "ACM0002 Grid-connected electricity generation from renewable sources",
    "projectType": "Other",
    "developer": "Orange Renewable Power Pvt Ltd",
    "size": "Large Scale",
    "estimatedAnnualCredits": 127609,
    "creditingPeriod": "2019-09-17 to 2029-09-16",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-7631": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS7631",
    "gsNumber": "7631",
    "description": "The project activity involves generation of electricity from wind, a renewable source of energy  at Haveri and Dharwad districts in the state of Karnataka, India. The proposed project activity is an initiative by Lalpur Wind Energy Private Limited. The project activity consists of 55 WEGs of 0.8 MW capacities each totaling to a capacity of 44 MW. The project would result into 79,082 tCO2e of annual average emission reduction.",
    "lat": null,
    "lng": null,
    "sdgGoals": [
      7,
      8,
      13
    ],
    "methodology": null,
    "projectType": "Wind",
    "developer": "Orange Renewable Power Pvt Ltd",
    "size": "Large Scale",
    "estimatedAnnualCredits": 79470,
    "creditingPeriod": "2020-01-17 to 2030-01-16",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-1190": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS6999",
    "gsNumber": "6999",
    "description": "The purpose of the project activity is to generate power using renewable energy source (wind energy) and sell the power generated to the state grid. The project activity generates electricity using wind energy. The generated electricity is exported to the regional grid system which is under the purview of the INDIAN electricity grid of India. The project activity replaces anthropogenic emissions of greenhouse gases estimated to be approximately 45,317 tCO2e per year, thereon displacing 47,829 MWh/year amount of electricity from the generation mix of power plants connected to the INDIAN GRID, which is mainly dominated by thermal/ fossil fuel based power plant.",
    "lat": null,
    "lng": null,
    "sdgGoals": [
      7,
      8,
      13
    ],
    "methodology": "ACM0002 Grid-connected electricity generation from renewable sources",
    "projectType": "Wind",
    "developer": "EKI Energy Services Limited",
    "size": "Large Scale",
    "estimatedAnnualCredits": 45317,
    "creditingPeriod": "2018-03-28 to 2028-03-27",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-5928": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS5928",
    "gsNumber": "5928",
    "description": "M/s Orange Suvaan Energy Private Limited (OSEPL) is setting up solar power project at Mhasale village in the district of Dhule, Maharasthra with capacity of 100 MW (50 X 2 phases). The purpose of the project activity is to generate electrical power through operation of Solar photovoltaic power plant. The total installed capacity of the project activity is 100 MW comprising of poly crystalline solar PV modules of 250/255/260/270 Wp each from a Tier I supplier.The purpose of the project activity is to generate electrical power using solar energy through operation of photovoltaic solar panels.",
    "lat": 21.108,
    "lng": 74.441,
    "sdgGoals": [
      7,
      8,
      13
    ],
    "methodology": "ACM0002 Grid-connected electricity generation from renewable sources",
    "projectType": "Other",
    "developer": "Orange Renewable Power Pvt Ltd",
    "size": "Large Scale",
    "estimatedAnnualCredits": 164869,
    "creditingPeriod": "2017-06-16 to 2029-06-15",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-4707": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS4707",
    "gsNumber": "4707",
    "description": "OMEPL is setting up wind power project at Khanapur, Sangli District, Maharashtra with capacity of 34 MW (17 X 2 MW). The purpose of the project activity is to generate electrical power using wind energy through operation of Wind Electric Generators (WEG’s). The total installed capacity of the project activity is 34 MW comprising of 17 numbers of 2 MW WTGS each. OMEPL is installing WTGs at Sangli district of Maharashtra in India.",
    "lat": null,
    "lng": null,
    "sdgGoals": [
      7,
      8,
      13
    ],
    "methodology": "ACM0002 Grid-connected electricity generation from renewable sources",
    "projectType": "Wind",
    "developer": "Orange Renewable Power Pvt Ltd",
    "size": "Large Scale",
    "estimatedAnnualCredits": 68503,
    "creditingPeriod": "2015-10-31 to 2029-10-30",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-5866": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS5866",
    "gsNumber": "5866",
    "description": "The main purpose of this project activity is to generate clean form of electricity through renewable solar energy source for sale of electricity to the grid. Orange Charanka Solar Energy Private Limited is the promoter of the proposed project activity. The project activity involves installation of 40 MWAC (corresponding to 53.4 MWp) solar power project in Gujarat. The project will replace anthropogenic emissions of greenhouse gases (GHG’s) estimated to be approximately 86,988 tCO2e per annum, thereon displacing 88,973 MWh/year amount of electricity from the generation-mix of power plants connected to the Indian electricity grid, which is mainly dominated by thermal/fossil fuel based power plant.",
    "lat": 23.54,
    "lng": 71.12,
    "sdgGoals": [
      7,
      8,
      13
    ],
    "methodology": "ACM0002 Grid-connected electricity generation from renewable sources",
    "projectType": "Other",
    "developer": "Orange Renewable Power Pvt Ltd",
    "size": "Large Scale",
    "estimatedAnnualCredits": 84421,
    "creditingPeriod": "2017-08-04 to 2029-08-03",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-5799": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS5799",
    "gsNumber": "5799",
    "description": "M/s Orange Mamatkheda Wind Private Limited (OMWPL) is setting up wind power project at villages around Gurmitkal Mandal of Yadgir District, Karnataka with capacity of 60 MW (30 X 2.0 MW). The purpose of the project activity is to generate electrical power using wind energy through operation of Wind Electric Generators (WEG?s). The total installed capacity of the project activity is 60 MW comprising of 30 nos of Gamesa G-97 turbines of 2.0 MW each.The estimation of GHG reductions by this project is limited to carbon dioxide (CO2) only. Thus the project activity leads to an emission reduction of 898,870 tCO2 for the chosen crediting period of 7 years renewable with the annual average emission reduction of 128,410 tCO2e",
    "lat": 16.873,
    "lng": 77.389,
    "sdgGoals": [
      3,
      7,
      8,
      13
    ],
    "methodology": "ACM0002 Grid-connected electricity generation from renewable sources",
    "projectType": "Other",
    "developer": "Orange Renewable Power Pvt Ltd",
    "size": "Large Scale",
    "estimatedAnnualCredits": 138747,
    "creditingPeriod": "2017-01-25 to 2031-01-24",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-4962": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS4962",
    "gsNumber": "4962",
    "description": "M/s Orange Bercha Wind Power Pvt Ltd is installing wind power projects in and around Bercha village, Ratlam District of Madhya Pradesh state, India.The purpose of the project activity is to generate electrical power using wind energy through operation of Wind Electric Generators (WEG’s). The total installed capacity of the project activity is 50 MW comprising of 25 Gamesa wind turbines of 2000 kW capacity each.",
    "lat": 23.267,
    "lng": 76.317,
    "sdgGoals": [
      7,
      8,
      13
    ],
    "methodology": "ACM0002 Grid-connected electricity generation from renewable sources",
    "projectType": "Wind",
    "developer": "Orange Renewable Power Pvt Ltd",
    "size": "Large Scale",
    "estimatedAnnualCredits": 107058,
    "creditingPeriod": "2023-05-05 to 2030-05-04",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-6290": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS6290",
    "gsNumber": "6290",
    "description": "The project activity is a 200 MW wind power project, promoted by Orange Sironj Wind Power Pvt Ltd. The purpose of the project activity is to generate clean electricity with utilization of wind energy. The Project comprises of 100 WTGs of Gamesa G114 max 2 MW turbines.",
    "lat": 8.825,
    "lng": 77.883,
    "sdgGoals": [
      3,
      4,
      6,
      7,
      8,
      13
    ],
    "methodology": "ACM0002 Grid-connected electricity generation from renewable sources",
    "projectType": "Other",
    "developer": "Orange Renewable Power Pvt Ltd",
    "size": "Large Scale",
    "estimatedAnnualCredits": 613844,
    "creditingPeriod": "2019-03-07 to 2029-03-06",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-3969": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS3969",
    "gsNumber": "3969",
    "description": "OMWPL is installing wind power project in the villages of Mandsaur & Ratlam districts of Madhya Pradesh state, India. The purpose of the project activity is to generate electrical power using wind energy through operation of Wind Electric Generators (WEG’s). The total installed capacity of the project activity is 100.5 MW comprising of 67 ReGen wind turbines of 1500 kW capacity each.",
    "lat": 24.072042,
    "lng": 75.067916,
    "sdgGoals": [
      7,
      8,
      13
    ],
    "methodology": "ACM0002 Grid-connected electricity generation from renewable sources",
    "projectType": "Wind",
    "developer": "Orange Renewable Power Pvt Ltd",
    "size": "Large Scale",
    "estimatedAnnualCredits": 172729,
    "creditingPeriod": "2015-01-01 to 2028-12-31",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-5614": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS5614",
    "gsNumber": "5614",
    "description": "M/s Orange Uravakonda Wind Power Private Limited (OUWPPL) is setting up wind power project at villages around Belaguppa Mandal of Anantapur District, Andhra Pradesh with capacity of 100.8 MW (48 X 2.1 MW). The purpose of the project activity is to generate electrical power using wind energy through operation of Wind Electric Generators (WEG’s). The electricity generated by the project is exported to the Southern electricity grid. The project activity will therefore displace an equivalent amount of carbon intense electricity which would have otherwise been generated by fossil fuel dominant electricity grid.",
    "lat": 14.7202,
    "lng": 77.149,
    "sdgGoals": [
      7,
      8,
      13
    ],
    "methodology": "ACM0002 Grid-connected electricity generation from renewable sources",
    "projectType": "Other",
    "developer": "Orange Renewable Power Pvt Ltd",
    "size": "Large Scale",
    "estimatedAnnualCredits": 224013,
    "creditingPeriod": "2016-07-28 to 2030-07-27",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  },
  "PRAN-3965": {
    "source": "Gold Standard",
    "registryUrl": "https://assurance-platform.goldstandard.org/project-documents/GS3965",
    "gsNumber": "3965",
    "description": "GHBPL is installing wind power project in the villages of Pratapgarh district of Rajasthan state, India. The purpose of the project activity is to generate electrical power using wind energy through operation of Wind Electric Generators (WEG’s). The total installed capacity of the project activity is 22.5 MW comprising of 15 ReGen wind turbines of 1500 kW capacity each.",
    "lat": 24.033921,
    "lng": 74.781527,
    "sdgGoals": [
      7,
      8,
      13
    ],
    "methodology": "ACM0002 Grid-connected electricity generation from renewable sources",
    "projectType": "Wind",
    "developer": "Orange Renewable Power Pvt Ltd",
    "size": "Large Scale",
    "estimatedAnnualCredits": 43328,
    "creditingPeriod": "2015-04-01 to 2029-03-31",
    "status": "GOLD_STANDARD_CERTIFIED_PROJECT"
  }
};
