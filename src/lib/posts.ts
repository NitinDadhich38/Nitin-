/**
 * Blog posts for /resources/blog (founder direction 2026-08-09: 5–7 pieces on
 * the topics actually being argued about in carbon markets).
 *
 * WRITTEN, NOT SCRAPED. These are PRAN's own words. Nothing here reproduces
 * text from LinkedIn, a registry, or any publication — CLAUDE.md forbids
 * verbatim copying, and republishing someone else's post would be a copyright
 * problem as well as an editorial one.
 *
 * RULES FOR ADDING A POST:
 *  · No fabricated figures. Where a number appears it must be sourced, and the
 *    source named in the body. Prefer arguments over statistics.
 *  · No neutrality language. Never "carbon neutral", "net zero" as a claim
 *    about a PRAN customer, or "climate positive".
 *  · No claim that PRAN verifies, issues, or audits credits.
 */

export type Post = {
  slug: string;
  title: string;
  category: string;
  standfirst: string;
  readingMinutes: number;
  published: string;
  paragraphs: string[];
};

export const posts: Post[] = [
  {
    slug: "compliance-vs-voluntary",
    title: "Compliance and voluntary are not two grades of the same thing",
    category: "Market Structure",
    standfirst:
      "They are different products with different buyers, different enforcement, and different consequences for getting it wrong. Most procurement mistakes start by confusing them.",
    readingMinutes: 4,
    published: "August 2026",
    paragraphs: [
      "A compliance credit exists because a government created an obligation. Someone must hold it, the quantity is set by a cap, and failing to surrender one carries a penalty. The price is therefore a function of policy — how tight the cap is, how it tightens, and whether the regulator is believed.",
      "A voluntary credit exists because someone chose to fund a project and a registry issued serialised units for the verified result. Nobody is compelled to buy it. Its price is a function of what the buyer thinks the quality is worth, which is why identical tonnages trade at wildly different levels.",
      "The practical consequence: a compliance instrument is fungible within its system and almost worthless outside it. A voluntary credit is portable but only as credible as its methodology, its vintage and its registry record. Buying the second when you needed the first is one of the more expensive errors available in this market, and it happens because both are described as 'carbon credits'.",
      "If you are exposed to an obligation — a notified sector under India's CCTS, an EU ETS installation, a CBAM-covered export — start from the instrument the regulation names. Everything else is a separate decision made for separate reasons.",
    ],
  },
  {
    slug: "what-a-price-signal-is-not",
    title: "A cheap tonne is information, not a bargain",
    category: "Pricing & Risk",
    standfirst:
      "Price dispersion in the voluntary market is not inefficiency waiting to be arbitraged. It is the market pricing risk you have not looked at yet.",
    readingMinutes: 3,
    published: "August 2026",
    paragraphs: [
      "When two credits both represent one tonne and one trades at a fraction of the other, the instinct is to treat the gap as a mispricing. It rarely is. The discount is usually paying you to accept something: an older vintage, a methodology under revision, a jurisdiction with unresolved corresponding-adjustment treatment, or a project type whose permanence is contested.",
      "None of those are hidden. They are in the registry record and the methodology document. The reason the discount persists is that most buyers do not read either, so the risk stays unpriced in their own reporting even though the market has already priced it.",
      "The question to ask of a cheap tonne is not 'why is this cheap' but 'who is the natural buyer of this risk, and am I it?' Sometimes the answer is yes. A buyer with no disclosure exposure and no reputational surface may be entirely rational to take the discount. A listed company writing this into a BRSR filing is not that buyer.",
      "The failure mode is buying on price, then discovering the reason for the price during an audit.",
    ],
  },
  {
    slug: "additionality-in-one-question",
    title: "Additionality, reduced to the only question that matters",
    category: "Methodology & Integrity",
    standfirst:
      "Would this have happened anyway? Everything technical in the concept is machinery for answering that honestly.",
    readingMinutes: 4,
    published: "August 2026",
    paragraphs: [
      "Additionality is the requirement that the emission reduction would not have occurred without the carbon finance. It sounds philosophical and is treated as a modelling exercise, but the underlying question is blunt: if nobody had bought these credits, would the outcome be different?",
      "The reason it is hard is that the counterfactual is unobservable. You are comparing the world that happened against a world that did not. Methodologies handle this with baselines — a modelled account of what would have been emitted — and the credibility of a credit rests almost entirely on whether that baseline was set conservatively or generously.",
      "This is where most integrity criticism lands, and fairly. A baseline set too high manufactures tonnes that never existed. It does not make the project fraudulent; it makes the quantification wrong, which for a buyer is the same problem.",
      "Practical test for a non-specialist: read what the baseline assumes, and ask whether you would have made the same assumption if you were being paid for a smaller number rather than a larger one. If the assumption only makes sense in the direction that increases issuance, treat the credit accordingly.",
    ],
  },
  {
    slug: "india-ccts-what-changes",
    title: "What India's CCTS actually changes for a business here",
    category: "Regulation & Compliance",
    standfirst:
      "A domestic compliance market changes who has to act, not just who wants to. The offset side is the part most project developers should be reading.",
    readingMinutes: 5,
    published: "August 2026",
    paragraphs: [
      "India's Carbon Credit Trading Scheme was notified in 2023 and is administered by the Bureau of Energy Efficiency under the Ministry of Power. The Indian Carbon Market Portal — the registry and administration layer — went live at Prakriti 2026. The primary documents are linked from our compliance page; read those rather than commentary, including this one.",
      "The structure has two halves. The compliance mechanism sets greenhouse-gas emission intensity targets for notified energy-intensive sectors. Beat your target and you can be issued certificates; miss it and you must acquire and surrender them. The offset mechanism is the route for projects outside those sectors to register and earn certificates.",
      "For an obligated entity the immediate work is not trading. It is measurement — establishing an emissions-intensity number you can defend to an administrator, across business units, on a consistent boundary. Firms that treated energy reporting as a compliance chore rather than a data system tend to discover this late.",
      "For a project developer the significant change is domestic demand. Until now an Indian project's realistic buyers were international voluntary purchasers. A compliance mechanism creates buyers with an obligation rather than a preference, and obligation-driven demand behaves very differently from discretionary demand — it is less price-sensitive and far less seasonal.",
      "What has not changed: a credit still only exists when a registry issues it. No scheme, portal or platform creates supply on its own.",
    ],
  },
  {
    slug: "reading-a-registry-record",
    title: "How to read a registry record before you wire money",
    category: "Registry Due Diligence",
    standfirst:
      "Five fields decide whether a credit is what the seller says it is. None of them require a consultant.",
    readingMinutes: 4,
    published: "August 2026",
    paragraphs: [
      "Every serious credit has a public record. Before any transaction, find it — not a PDF the seller emailed you, the registry's own page. If one does not exist, the conversation is over.",
      "First, the project ID and standard. This tells you which rulebook applies. Second, the methodology, including its version — methodologies get revised, and a project running an old version may be quantifying on assumptions the standard has since tightened.",
      "Third, the vintage: the year the reduction occurred, which is not the year of issuance. Older vintages trade lower for reasons that are usually legitimate and occasionally not. Fourth, the issuance and retirement history — how many units were issued, how many are retired, how many remain. This is where double-selling becomes visible.",
      "Fifth, the status of the units being offered. Issued and held is a different proposition from forward-contracted against future verification. Both are tradeable; only one exists today.",
      "If a seller cannot show you all five without hesitation, the problem is not paperwork. It is that they may not hold what they are offering.",
    ],
  },
  {
    slug: "why-retirement-is-the-only-event",
    title: "Retirement is the only moment anything actually happens",
    category: "Claims & Retirement",
    standfirst:
      "Buying a credit changes ownership. Retiring it is what makes the tonne unusable by anyone else — and it is the only step worth putting in a report.",
    readingMinutes: 3,
    published: "August 2026",
    paragraphs: [
      "A credit can change hands many times. Each transfer moves a serialised unit between registry accounts and none of it has any environmental meaning — it is inventory moving, the same as any commodity.",
      "Retirement is different. It permanently cancels the unit so it can never be transferred, resold or claimed again. Until that happens, the tonne is still live supply, and anything said about it is a statement about an asset you are holding, not an action you have taken.",
      "This matters for disclosure. The defensible statement is narrow and factual: a quantity of verified credits was purchased and retired, on a stated date, for a stated period, with serial numbers available. That is checkable. Broader language about what the purchase makes you or your product invites a question you cannot answer with a registry record.",
      "The discipline is not caution for its own sake. Claims that outrun the evidence are the reason this market keeps having to defend itself, and they are the ones that get withdrawn.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
