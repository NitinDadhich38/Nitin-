import { Hero } from "@/components/marketing/hero";
import { ProblemSection } from "@/components/marketing/problem-section";
import { MarketplaceSection } from "@/components/marketing/marketplace-section";
import { WhatWeDo } from "@/components/marketing/what-we-do";
import { ForWhom } from "@/components/marketing/for-whom";
import { TrustSection } from "@/components/marketing/trust-section";
import { LeadershipSection } from "@/components/marketing/leadership-section";
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
      <div id="leadership">
        <LeadershipSection />
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
