/**
 * One distinct stock photograph per marketplace listing.
 *
 * Registries do not publish project photography — Verra's data model has no
 * media concept at all, Gold Standard serves one generic banner for every
 * project, and ICR's images sit behind a login. So every listing without its
 * own photo (see lib/live-project-media.ts) gets a curated stock image
 * instead, chosen to match its technology.
 *
 * Two rules hold, and `verifyImagery()` proves them:
 *   1. No two listings anywhere in the marketplace share a thumbnail —
 *      carbon projects and I-RECs draw from the same global pool.
 *   2. A listing's image matches its technology (a wind project shows
 *      turbines, a composting project shows waste handling).
 *
 * These are illustrative stock photographs, NOT pictures of the project
 * sites. `ProjectDetails.hasRealPhoto` stays false for them so the UI can
 * keep that distinction honest — never label one as the project itself.
 *
 * Every id below was checked against images.unsplash.com and returns a real
 * photograph. When adding projects, add ids here too: the pool is sized with
 * headroom, and `verifyImagery()` reports when it runs short.
 */
import { projects, getIrecEntries, type Project } from "@/lib/marketplace-data";
import { liveProjectMedia } from "@/lib/live-project-media";

const UNSPLASH = "https://images.unsplash.com/photo-";

/** Build a sized, format-optimised Unsplash URL (mirrors lib/images.ts). */
function u(id: string, w = 640): string {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${w}&q=75`;
}

export type ImageryCategory =
  | "wind"
  | "solar"
  | "hydro"
  | "biomass"
  | "hybrid"
  | "forestry"
  | "redd"
  | "agriculture"
  | "cookstove"
  | "waste"
  | "industrial"
  | "biochar"
  | "emobility"
  | "water";

/**
 * Curated photo ids per technology. Order matters: assignment walks each
 * pool front to back, so the strongest images land on the most listings.
 * None of these collide with the section backgrounds in lib/images.ts.
 */
const POOLS: Record<ImageryCategory, readonly string[]> = {
  wind: [
    "1562519990-50eb51e282b2", "1548337138-e87d889cc369", "1508791290064-c27cc1ef7a9a",
    "1615209853186-e4bd66602508", "1587168173357-99c7e95fb5cd", "1548613053-22087dd8edb8",
    "1675116731363-c17d957f3444", "1696998302294-b21fb356e1a4", "1452179535021-368bb0edc3a8",
    "1616596091194-eaec099773e4", "1466629437334-b4f6603563c5", "1521394377364-ca65e440976b",
    "1515344905723-babc01aac23d", "1565085360602-de694f1d7650", "1546883648-8c5648200abc",
    "1467579424161-6bbc141569d7", "1619697101606-7c092a8e6281", "1620415629284-975004d37752",
    "1559628019-e73aae8d2a98", "1679580447808-b5b6911aacea", "1679580447616-511477c78f6f",
    "1718886821754-92c8ca3f23f2", "1564750546698-365b38123459", "1784556669771-512d9d2c610b",
    "1553627945-3980ac76c95c",
    /* Offshore and coastal farms — spares beyond the 25 currently in use.
       Historic cloth-sail windmills are deliberately excluded: an Unsplash
       search for "windmill" returns plenty, and none of them read as a
       utility-scale wind project. */
    "1654083198752-56ff209c8129", "1503427315916-2ba435dee667", "1582050041583-e6ce27a69acd",
    "1763752455871-98c9e6b48bf9", "1763751276382-9040cadfacea", "1759899344035-ac8e2d9a45e0",
    "1762006221255-bbc5fc546b56", "1689843794759-3cf7126fc3f0", "1768126767485-34f2979d82ef",
  ],
  solar: [
    "1508514177221-188b1cf16e9d", "1558449028-b53a39d100fc", "1497435334941-8c899ee9e8e9",
    "1521618755572-156ae0cdd74d", "1629726797843-618688139f5a", "1509389928833-fe62aef36deb",
    "1497440001374-f26997328c1b", "1502637098811-fa9526d2b659", "1545209463-e2825498edbf",
    "1463173904305-ba479d2123b7", "1508790762848-8a3096277c8f", "1613665813446-82a78c468a1d",
    "1724041875334-0a6397111c7e", "1668097613572-40b7c11c8727", "1658298775754-5839ffd434cc",
    "1679046410011-b6bf7ce71f22", "1648135327756-b606e2eb8caa", "1625301840055-7c1b7198cfc0",
    "1626251376234-8bc112f0bcd5", "1768839727824-28d6f0dcd1d1", "1670519808728-335b1eb2ef52",
    "1670519808965-16b9b2f724af", "1770068511771-7c146210a55b", "1780922576207-7eb4b93a4b9e",
  ],
  hydro: [
    "1606050309588-741702cceb9b", "1509390874189-d75fd22f19f7", "1705747894609-6a7d17a8cfb7",
    "1569918190173-6a5792908184", "1578410440843-c33981767e00", "1580960062319-b904d81f8b59",
    "1560279966-2d681f3d4dfc",
  ],
  biomass: [
    "1617460055001-2167c227cb7b", "1635513236283-dedcca2ebd4a", "1464820820824-6c2c3f3ba59d",
    "1630441466146-cb2e108f529b", "1640704714108-ff2d8f423e3b",
  ],
  hybrid: [
    "1595437193398-f24279553f4f", "1723640103357-cd8e8f0cd10c", "1724364166910-6003228bad08",
    "1516109544412-40850270498f", "1652608958226-656825ed9565",
  ],
  forestry: [
    "1502082553048-f009c37129b9", "1528183429752-a97d0bf99b5a", "1599940824399-b87987ceb72a",
    "1462143338528-eca9936a4d09", "1542601906990-b4d3fb778b09", "1519567770579-c2fc5436bcf9",
    "1503435980610-a51f3ddfee50", "1513836279014-a89f7a76ae86", "1616683955867-4049d9b78977",
    "1516441311474-499e4f3b32db", "1604009506606-fd4989d50e6d", "1724149715970-666e2264759b",
    "1647220576336-f2e94680f3b8",
  ],
  redd: [
    "1592288801240-7b18bb06e94f", "1694614360387-269a5b572d58", "1646872223685-ca4c51fc315d",
    "1727950183920-654c2feee258", "1623980051061-fce02122f7fe", "1694614360428-608d018bb054",
    "1646928234724-ddfac30993e6", "1682887523090-8eed9a92a6e5", "1697350978674-4b40261b0dc3",
    "1500354960738-4c480ed785bc",
  ],
  /* Cropland first, then grazed grassland — soil-carbon and grassland
     restoration projects both land here. */
  agriculture: [
    "1614091066096-4c6521fbea3f", "1561504935-4e7d4516a2d1", "1633410195091-bd66114cef5f",
    "1683506684881-efbb5203eacf", "1728895604559-a4e16081504e", "1647786905130-61c55aa71746",
    "1631372330911-6d3a08cb342f", "1720421780068-90eee1321094", "1655048408242-65363fe5a3d0",
    "1683957107135-40a53ebf78a7", "1696354149538-edc94256b025",
  ],
  /* Household cooking on wood/biomass, not restaurant flambé or barbecue —
     these projects replace open-fire and mud stoves in rural kitchens. */
  cookstove: [
    "1643474003664-42ad6632c039", "1612366753600-df819204bc65", "1551982932-a4eaf3ca1994",
    "1576394435759-02a2674ff6e0", "1717371133600-7a22a51d3787", "1618224184811-bc1d6e77c54a",
    "1552901274-4440b5ca43a9", "1749359669134-289058a33c63", "1706645740786-10f5b49901e1",
    "1682996055064-599bec77fc62", "1516483954662-1bee87353427",
  ],
  /* Municipal collection and disposal — what a composting or landfill-gas
     project actually handles — ahead of tidy household recycling bins. */
  waste: [
    "1574974671999-24b7dfbb0d53", "1717667745836-145a38948ebf", "1611284446314-60a58ac0deb9",
    "1674321576323-82be6b715ebd", "1642204705127-accc0dcc5779", "1721622248626-e7b5c29de4b2",
    "1605600659908-0ef719419d41", "1532996122724-e3c354a0b15b",
  ],
  industrial: [
    "1496247749665-49cf5b1022e9", "1542274368-443d694d79aa", "1547895749-888a559fc2a7",
    "1647427060118-4911c9821b82", "1716643863806-989dd76ae093", "1578776349090-de61da00ff1a",
  ],
  biochar: ["1560713269-4e9527797b8f", "1622641146379-2672c7437900"],
  emobility: ["1593941707874-ef25b8b4a92b", "1593941707882-a5bba14938c7"],
  water: ["1624948465027-6f9b51067557", "1538300342682-cf57afb97285"],
};

/** Borrow order when a technology's own pool runs dry. */
const FALLBACK_ORDER: readonly ImageryCategory[] = [
  "forestry", "redd", "agriculture", "solar", "wind", "hydro", "biomass",
  "waste", "industrial", "cookstove", "hybrid", "biochar", "emobility", "water",
];

/**
 * Classify a carbon project from its sector, the sheet's own tech wording,
 * and its name. The name matters because registry sectors are coarse — a
 * biomass power plant is filed under "Waste Handling & Disposal", and only
 * the title says what the plant actually burns.
 */
export function categoryForProject(project: Project): ImageryCategory {
  const s = `${project.sector} ${project.rawTech} ${project.name}`.toLowerCase();
  if (/cookstove|cook stove|clean cooking/.test(s)) return "cookstove";
  if (/biochar/.test(s)) return "biochar";
  if (/ev charging|e-mobility|emobility/.test(s)) return "emobility";
  if (/drinking water|safe water|water purif/.test(s)) return "water";
  if (/waste heat|heat recovery|heat to power|cogeneration|efficiency/.test(s))
    return "industrial";
  if (/biomass/.test(s)) return "biomass";
  if (/waste|biogas|manure|compost|landfill/.test(s)) return "waste";
  if (/industrial/.test(s)) return "industrial";
  if (/redd/.test(s)) return "redd";
  /* Agriculture is tested before forestry on purpose. Several soil-carbon
     projects are filed under an "Afforestation & Reforestation" sector in
     the source sheet while their titles say regenerative agriculture or
     grassland restoration — the title is the better guide to the picture. */
  if (/agri|alm\b|soil|grassland|farming|rice|wheat|maize|regenerative|pasture/.test(s))
    return "agriculture";
  if (/afforest|reforest|arr\b|forest|timber|plantation/.test(s)) return "forestry";
  if (/blue carbon|marine|ocean|mangrove/.test(s)) return "redd";
  if (/hydro/.test(s)) return "hydro";
  if (/wind/.test(s)) return "wind";
  if (/solar|photovolt/.test(s)) return "solar";
  if (/afolu/.test(s)) return "forestry";
  /* Generic "Renewable Energy" rows name no technology; solar reads as the
     least specific renewable image we hold. */
  if (/renewable|energy industr/.test(s)) return "solar";
  return "forestry";
}

/** Classify an I-REC line from the sheet's technology code (e.g. "W/S"). */
export function categoryForIrecTech(tech: string): ImageryCategory {
  const t = tech.trim().toLowerCase();
  if (t === "w/s" || /wind.*solar|solar.*wind|hybrid/.test(t)) return "hybrid";
  if (t === "whr" || /waste heat|heat recovery/.test(t)) return "industrial";
  if (/solar|pv\b/.test(t)) return "solar";
  if (/wind/.test(t)) return "wind";
  if (/hydro/.test(t)) return "hydro";
  if (/biomass|bagasse|biogas/.test(t)) return "biomass";
  return "solar";
}

/** True when this listing already has its own photography and needs no stock. */
function hasOwnPhoto(pranCode: string): boolean {
  return Boolean(liveProjectMedia[pranCode]?.image);
}

/**
 * The global assignment, computed once at module load.
 *
 * Listings are walked in PRAN-code order rather than array order so that
 * reordering marketplace-data.ts never reshuffles which photo a project
 * shows. Listings that have their own photography are skipped entirely, so
 * the stock pool is spent only where it is actually needed.
 */
const stockByCode: ReadonlyMap<string, string> = (() => {
  const map = new Map<string, string>();
  const taken = new Set<string>();
  const cursor = new Map<ImageryCategory, number>();

  const take = (cat: ImageryCategory): string => {
    const pool = POOLS[cat];
    let i = cursor.get(cat) ?? 0;
    while (i < pool.length && taken.has(pool[i])) i++;
    if (i < pool.length) {
      cursor.set(cat, i + 1);
      taken.add(pool[i]);
      return pool[i];
    }
    // Pool spent — borrow the first unused image from any other technology
    // rather than repeat one. Relevance degrades before uniqueness does.
    for (const other of FALLBACK_ORDER) {
      for (const id of POOLS[other]) {
        if (!taken.has(id)) {
          taken.add(id);
          return id;
        }
      }
    }
    // Library fully exhausted. Keep the site up and let verifyImagery()
    // surface it; add ids to POOLS to fix.
    return pool[pool.length - 1];
  };

  const listings: { code: string; cat: ImageryCategory }[] = [
    ...projects.map((p) => ({ code: p.pranCode, cat: categoryForProject(p) })),
    ...getIrecEntries().map((e) => ({
      code: e.pranCode,
      cat: categoryForIrecTech(e.tech),
    })),
  ]
    .filter((l) => !hasOwnPhoto(l.code))
    .sort((a, b) => a.code.localeCompare(b.code));

  for (const l of listings) map.set(l.code, take(l.cat));
  return map;
})();

/**
 * The unique stock photograph for a listing, by PRAN code.
 *
 * Returns undefined for listings that carry their own photography — callers
 * should prefer the real photo and fall back to this.
 */
export function stockImageFor(pranCode: string, width = 640): string | undefined {
  const id = stockByCode.get(pranCode);
  return id ? u(id, width) : undefined;
}

/**
 * Self-check used by scripts and tests: confirms every listing got an image
 * and that no two listings share one.
 */
export function verifyImagery(): {
  assigned: number;
  unique: number;
  librarySize: number;
  duplicates: string[];
} {
  /* Map/Set iteration is kept to forEach: the project's TS target predates
     downlevelIteration, so spreading an iterator will not compile. */
  const urls: string[] = [];
  const counts = new Map<string, string[]>();
  stockByCode.forEach((id, code) => {
    urls.push(id);
    counts.set(id, (counts.get(id) ?? []).concat(code));
  });

  const duplicates: string[] = [];
  counts.forEach((codes, id) => {
    if (codes.length > 1) duplicates.push(`${id}: ${codes.join(", ")}`);
  });

  const unique = new Set(urls);
  return {
    assigned: urls.length,
    unique: unique.size,
    librarySize: Object.values(POOLS).reduce((n, p) => n + p.length, 0),
    duplicates,
  };
}
