import { Hero } from "@/components/marketing/hero";
import { ProofStrip } from "@/components/marketing/proof-strip";
import { ProblemSection } from "@/components/marketing/problem-section";
import { MarketplaceSection } from "@/components/marketing/marketplace-section";
import { WhatWeDo } from "@/components/marketing/what-we-do";
import { ForWhom } from "@/components/marketing/for-whom";
import { TrustSection } from "@/components/marketing/trust-section";
import { LeadershipSection } from "@/components/marketing/leadership-section";
import { ResourcesSection } from "@/components/marketing/resources-section";
import { ClosingCta } from "@/components/marketing/closing-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <ProblemSection />
      <MarketplaceSection />
      <WhatWeDo />
      <ForWhom />
      <TrustSection />
      <LeadershipSection />
      <ResourcesSection />
      <ClosingCta />
    </>
  );
}
