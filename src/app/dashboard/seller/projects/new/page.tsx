"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trees,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileText,
  DollarSign,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const REGISTRIES = [
  "Verra",
  "Gold Standard",
  "International Carbon Registry (ICR)",
  "Global Carbon Council (GCC)",
  "BioCarbon Standard",
  "Plan Vivo",
  "C-Capsule",
  "Other Standard",
];

const SECTORS = [
  "Forestry & Nature-based (ARR / REDD+)",
  "Renewable Energy (Solar / Wind / Hydro)",
  "Energy Efficiency & Clean Cookstoves",
  "Biochar & Tech Carbon Removal",
  "Methane Capture & Waste Management",
  "Regenerative Agriculture",
  "Blue Carbon / Mangrove Restoration",
];

const SDG_LIST = [
  { id: 1, label: "1. No Poverty" },
  { id: 3, label: "3. Good Health & Well-being" },
  { id: 5, label: "5. Gender Equality" },
  { id: 6, label: "6. Clean Water & Sanitation" },
  { id: 7, label: "7. Affordable & Clean Energy" },
  { id: 8, label: "8. Decent Work & Economic Growth" },
  { id: 13, label: "13. Climate Action" },
  { id: 14, label: "14. Life Below Water" },
  { id: 15, label: "15. Life on Land" },
];

export default function NewProjectListingPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // Form Fields
  const [name, setName] = React.useState("");
  const [registry, setRegistry] = React.useState(REGISTRIES[0]);
  const [registryProjectId, setRegistryProjectId] = React.useState("");
  const [projectType, setProjectType] = React.useState(SECTORS[0]);
  const [country, setCountry] = React.useState("India");
  const [location, setLocation] = React.useState("");
  const [vintageYear, setVintageYear] = React.useState("2023");
  const [creditsAvailable, setCreditsAvailable] = React.useState("");
  const [priceInr, setPriceInr] = React.useState("");
  const [priceUsd, setPriceUsd] = React.useState("");
  const [methodology, setMethodology] = React.useState("");
  const [shortDescription, setShortDescription] = React.useState("");
  const [fullDescription, setFullDescription] = React.useState("");
  const [selectedSdgs, setSelectedSdgs] = React.useState<number[]>([13]);
  const [termsAgreed, setTermsAgreed] = React.useState(false);

  const toggleSdg = (sdgId: number) => {
    if (selectedSdgs.includes(sdgId)) {
      setSelectedSdgs(selectedSdgs.filter((id) => id !== sdgId));
    } else {
      setSelectedSdgs([...selectedSdgs, sdgId]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!termsAgreed) {
      setErrorMsg("You must accept the seller listing and escrow terms.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        registry,
        registryProjectId: registryProjectId.trim(),
        projectType,
        country: country.trim(),
        location: location.trim(),
        vintageYear: parseInt(vintageYear, 10),
        creditsAvailable: parseFloat(creditsAvailable),
        pricePerCreditInr: parseFloat(priceInr),
        pricePerCreditUsd: priceUsd ? parseFloat(priceUsd) : undefined,
        methodology: methodology.trim() || undefined,
        shortDescription: shortDescription.trim(),
        fullDescription: fullDescription.trim() || undefined,
        sdgTags: selectedSdgs,
      };

      const res = await fetch("/api/projects/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error || "Failed to submit project listing.");
        setSubmitting(false);
        return;
      }

      router.push("/dashboard/seller");
    } catch {
      setErrorMsg("A network error occurred while submitting project.");
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAF7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Link */}
        <Link
          href="/dashboard/seller"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-pran-muted hover:text-pran-text"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Project Desk
        </Link>

        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pran-emerald/10 text-pran-emerald text-xs font-bold uppercase tracking-wider mb-2">
            <Trees className="w-3.5 h-3.5" /> Project Listing
          </div>
          <h1 className="text-3xl font-extrabold text-pran-text">
            List a Verified Carbon Project
          </h1>
          <p className="text-sm text-pran-muted mt-1">
            Provide official registry details, issuance vintage, and price parameters for compliance verification.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-pran-border rounded-2xl p-6 sm:p-10 shadow-sm">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-status-danger/10 border border-status-danger/20 flex items-start gap-3 text-status-danger text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Basic Info */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-pran-text flex items-center gap-2 pb-2 border-b border-pran-border">
                <FileText className="w-4 h-4 text-pran-emerald" /> Project Overview & Identity
              </h2>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pran-muted mb-1.5">
                  Official Project Name <span className="text-status-danger">*</span>
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kasigau Corridor REDD+ Project Phase II"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-pran-muted mb-1.5">
                    Carbon Registry Standard <span className="text-status-danger">*</span>
                  </label>
                  <select
                    value={registry}
                    onChange={(e) => setRegistry(e.target.value)}
                    className="flex h-11 w-full rounded-btn border border-pran-border bg-white px-3 py-2 text-sm text-pran-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pran-teal/60"
                  >
                    {REGISTRIES.map((reg) => (
                      <option key={reg} value={reg}>
                        {reg}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-pran-muted mb-1.5">
                    Registry Project Serial / ID <span className="text-status-danger">*</span>
                  </label>
                  <Input
                    value={registryProjectId}
                    onChange={(e) => setRegistryProjectId(e.target.value)}
                    placeholder="e.g. VCS-1423 or GS-902"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-pran-muted mb-1.5">
                    Sector / Methodology Category <span className="text-status-danger">*</span>
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="flex h-11 w-full rounded-btn border border-pran-border bg-white px-3 py-2 text-sm text-pran-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pran-teal/60"
                  >
                    {SECTORS.map((sec) => (
                      <option key={sec} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-pran-muted mb-1.5">
                    Specific Methodology Code
                  </label>
                  <Input
                    value={methodology}
                    onChange={(e) => setMethodology(e.target.value)}
                    placeholder="e.g. VM0007 / ACM0002"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Location & Vintage */}
            <div className="space-y-4 pt-4">
              <h2 className="text-base font-bold text-pran-text flex items-center gap-2 pb-2 border-b border-pran-border">
                <Building2 className="w-4 h-4 text-pran-emerald" /> Geography & Issuance
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-pran-muted mb-1.5">
                    Country <span className="text-status-danger">*</span>
                  </label>
                  <Input
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. India"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-pran-muted mb-1.5">
                    Region / State <span className="text-status-danger">*</span>
                  </label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Rajasthan"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-pran-muted mb-1.5">
                    Vintage Year <span className="text-status-danger">*</span>
                  </label>
                  <Input
                    type="number"
                    value={vintageYear}
                    onChange={(e) => setVintageYear(e.target.value)}
                    min={2010}
                    max={2030}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Commercial Parameters */}
            <div className="space-y-4 pt-4">
              <h2 className="text-base font-bold text-pran-text flex items-center gap-2 pb-2 border-b border-pran-border">
                <DollarSign className="w-4 h-4 text-pran-emerald" /> Commercial Terms & Escrow
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-pran-muted mb-1.5">
                    Credits Available (tCO₂e) <span className="text-status-danger">*</span>
                  </label>
                  <Input
                    type="number"
                    value={creditsAvailable}
                    onChange={(e) => setCreditsAvailable(e.target.value)}
                    placeholder="e.g. 50000"
                    min={1}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-pran-muted mb-1.5">
                    Price per Credit (INR ₹) <span className="text-status-danger">*</span>
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={priceInr}
                    onChange={(e) => setPriceInr(e.target.value)}
                    placeholder="e.g. 1250.00"
                    min={1}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-pran-muted mb-1.5">
                    Price per Credit (USD $)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={priceUsd}
                    onChange={(e) => setPriceUsd(e.target.value)}
                    placeholder="Optional (auto-derived)"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Descriptions */}
            <div className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pran-muted mb-1.5">
                  Summary Description (Shown in marketplace cards) <span className="text-status-danger">*</span>
                </label>
                <textarea
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Key project highlights, ecosystem impact, and technology description..."
                  className="w-full h-20 rounded-btn border border-pran-border p-3 text-sm text-pran-text focus:outline-none focus:ring-2 focus:ring-pran-teal/60"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-pran-muted mb-1.5">
                  Full Project Details (Optional)
                </label>
                <textarea
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  placeholder="Extended project methodology details, co-benefits, and additionality..."
                  className="w-full h-28 rounded-btn border border-pran-border p-3 text-sm text-pran-text focus:outline-none focus:ring-2 focus:ring-pran-teal/60"
                />
              </div>
            </div>

            {/* Section 5: SDGs */}
            <div className="space-y-3 pt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-pran-muted">
                Key UN Sustainable Development Goals (SDGs)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {SDG_LIST.map((sdg) => (
                  <label
                    key={sdg.id}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                      selectedSdgs.includes(sdg.id)
                        ? "border-pran-emerald bg-pran-emerald/5 text-pran-emerald font-semibold"
                        : "border-pran-border bg-white text-pran-text hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSdgs.includes(sdg.id)}
                      onChange={() => toggleSdg(sdg.id)}
                      className="rounded border-pran-border text-pran-emerald focus:ring-pran-emerald/40"
                    />
                    <span>{sdg.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Terms and Confirmation */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 pt-4">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-pran-text">
                <input
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-pran-border text-pran-emerald focus:ring-pran-emerald/40"
                />
                <span className="leading-relaxed">
                  I certify that our organization holds title and unencumbered rights to the specified carbon credits, that the registry serial numbers are accurate, and that settlement will proceed via PRAN&apos;s regulated escrow protocol. Submitted projects start in a paused state until compliance verification is completed.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex items-center justify-between">
              <Link href="/dashboard/seller">
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={submitting}
                className="font-semibold"
              >
                {submitting ? "Submitting Listing..." : "Submit Project for Review"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
