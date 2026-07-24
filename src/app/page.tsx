import { Hero } from "@/components/marketing/hero";
import { MissionSection } from "@/components/marketing/mission-section";
import { MarketplaceSection } from "@/components/marketing/marketplace-section";
import { IntelligenceSection } from "@/components/marketing/intelligence-section";
import { SolutionsSection } from "@/components/marketing/solutions-section";
import { TrustSection } from "@/components/marketing/trust-section";
import { LeadershipSection } from "@/components/marketing/leadership-section";
import { ResourcesSection } from "@/components/marketing/resources-section";
import { ClosingCta } from "@/components/marketing/closing-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <MissionSection />
      <MarketplaceSection />
      <IntelligenceSection />
      <SolutionsSection />
      <TrustSection />
      <LeadershipSection />
      <ResourcesSection />
      <ClosingCta />
    </>
  );
}
