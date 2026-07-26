import type { Metadata } from "next";
import { ContactIntent } from "@/components/forms/contact-intent";

export const metadata: Metadata = {
  title: "Contact / Request Demo",
  description:
    "Talk to the PRAN team about carbon procurement, listing a project, or ESG/BRSR/CBAM reporting.",
};

/**
 * STATIC BRANCH — the intent-aware body moved to a client component
 * (ContactIntent) because a static export has no server to read `searchParams`.
 * The `?interest=` / `?project=` links across the site keep working; they are
 * resolved in the browser instead. Nothing about the page's design changes.
 */
export default function ContactPage() {
  return <ContactIntent />;
}
