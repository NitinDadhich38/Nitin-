/**
 * Proves the marketplace imagery rule: every listing — carbon project and
 * I-REC alike — shows a distinct photograph, and none is left without one.
 *
 *     node scripts/verify-imagery.mjs
 *
 * Exits non-zero when a thumbnail is repeated or missing, so it can gate a
 * build. Run it after adding projects or I-REC lines; if the stock pool runs
 * short, add ids to POOLS in src/lib/project-imagery.ts.
 *
 * Add `--check-urls` to also confirm every stock image still resolves at
 * images.unsplash.com (network, ~2 min).
 */
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(ROOT, "package.json"));

// jiti 1.x: synchronous, require-shaped. Resolves the "@/..." alias the same
// way tsconfig/Next do, so these are the exact modules the site ships.
const jiti = require("jiti")(path.join(ROOT, "scripts/"), {
  alias: { "@": path.join(ROOT, "src") },
  interopDefault: true,
  esmResolve: true,
});

const load = (p) => jiti(path.join(ROOT, p));

const { projects, getIrecEntries } = load("src/lib/marketplace-data.ts");
const { getProjectDetails } = load("src/lib/project-details.ts");
const { stockImageFor, verifyImagery, categoryForProject, categoryForIrecTech } =
  load("src/lib/project-imagery.ts");
const { liveProjectMedia } = load("src/lib/live-project-media.ts");

const stats = verifyImagery();

const rows = [
  ...projects.map((p) => {
    const d = getProjectDetails(p);
    return {
      code: p.pranCode,
      kind: "project",
      cat: categoryForProject(p),
      url: d.image,
      real: d.hasRealPhoto,
    };
  }),
  ...getIrecEntries().map((e) => {
    const real = liveProjectMedia[e.pranCode]?.image;
    return {
      code: e.pranCode,
      kind: "irec",
      cat: categoryForIrecTech(e.tech),
      url: real ?? stockImageFor(e.pranCode),
      real: Boolean(real),
    };
  }),
];

const byUrl = new Map();
for (const r of rows) byUrl.set(r.url, [...(byUrl.get(r.url) ?? []), r]);
const repeated = [...byUrl.entries()].filter(([, v]) => v.length > 1);
const missing = rows.filter((r) => !r.url);

console.log(`listings        ${rows.length}  (projects ${projects.length}, I-RECs ${getIrecEntries().length})`);
console.log(`own photography ${rows.filter((r) => r.real).length}`);
console.log(`stock assigned  ${rows.filter((r) => !r.real).length} of ${stats.librarySize} in library`);
console.log(`distinct images ${byUrl.size}`);

const perCat = {};
for (const r of rows.filter((x) => !x.real)) perCat[r.cat] = (perCat[r.cat] || 0) + 1;
console.log("per technology  ", perCat);

if (missing.length) {
  console.error(`\nMISSING IMAGE (${missing.length}):`);
  for (const m of missing) console.error(`  ${m.kind} ${m.code}`);
}
if (repeated.length) {
  console.error(`\nREPEATED THUMBNAIL (${repeated.length}):`);
  for (const [url, v] of repeated) {
    console.error(`  ${url}\n    ${v.map((x) => `${x.kind} ${x.code}`).join("\n    ")}`);
  }
}

if (process.argv.includes("--check-urls")) {
  const stock = [...new Set(rows.filter((r) => !r.real).map((r) => r.url))];
  const bad = [];
  const queue = [...stock];
  await Promise.all(
    Array.from({ length: 8 }, async () => {
      while (queue.length) {
        const url = queue.shift();
        try {
          const res = await fetch(url);
          if (!res.ok) bad.push(`${res.status} ${url}`);
          else if ((await res.arrayBuffer()).byteLength < 3000) bad.push(`tiny ${url}`);
        } catch (e) {
          bad.push(`${String(e).slice(0, 40)} ${url}`);
        }
      }
    }),
  );
  console.log(`\nurl check       ${stock.length - bad.length}/${stock.length} resolve`);
  for (const b of bad) console.error(`  ${b}`);
  if (bad.length) process.exitCode = 1;
}

if (repeated.length || missing.length) {
  console.error("\nFAIL — marketplace imagery is not unique.");
  process.exit(1);
}
console.log("\nOK — every listing has its own distinct image.");
