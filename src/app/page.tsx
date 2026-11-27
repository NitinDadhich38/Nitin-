import { BeliefBand } from "@/components/marketing/belief-band";
import { Hero } from "@/components/marketing/hero";
import { MembershipTeaser } from "@/components/marketing/membership-teaser";
import { ProblemSection } from "@/components/marketing/problem-section";
import { MarketplaceSection } from "@/components/marketing/marketplace-section";
import { WhatWeDo } from "@/components/marketing/what-we-do";
import { ForWhom } from "@/components/marketing/for-whom";
import { TrustSection } from "@/components/marketing/trust-section";
import { ResourcesSection } from "@/components/marketing/resources-section";
import { ClosingCta } from "@/components/marketing/closing-cta";

/**
 * Section ids double as deep-link anchors and as capture targets for
 * scripts/shot.py, which reviews one section at a time at a real viewport.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <BeliefBand
        scroll
        label="What we believe"
        statement="A market should be readable by the people it asks to trust it."
        line="PRAN is building the carbon market in the open: plain, checkable, and accountable."
      />
      <div id="membership">
        <MembershipTeaser />
      </div>
      <div id="problem">
        <ProblemSection />
      </div>
      <div id="marketplace">
        <MarketplaceSection />
      </div>
      <div id="what-we-do">
        <WhatWeDo />
      </div>
      <div id="for-whom">
        <ForWhom />
      </div>
      <div id="trust">
        <TrustSection />
      </div>
      <div id="resources">
        <ResourcesSection />
      </div>
      <div id="cta">
        <ClosingCta />
      </div>
    </>
  );
}
