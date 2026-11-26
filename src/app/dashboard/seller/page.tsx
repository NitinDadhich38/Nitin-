"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trees,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building2,
  DollarSign,
  TrendingUp,
  FileText,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SellerDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [kycData, setKycData] = React.useState<any>(null);
  const [projects, setProjects] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function loadData() {
      try {
        const [kycRes, projRes] = await Promise.all([
          fetch("/api/kyc/current"),
          fetch("/api/seller/projects"),
        ]);

        if (kycRes.status === 401) {
          router.push("/login?next=/dashboard/seller");
          return;
        }

        const kycJson = await kycRes.json();
        setKycData(kycJson);

        if (projRes.ok) {
          const projJson = await projRes.json();
          setProjects(projJson.projects || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-pran-emerald border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Loading Developer Desk...
          </p>
        </div>
      </main>
    );
  }

  const org = kycData?.organization;
  const isKycApproved = org?.kyc_status === "APPROVED";

  // Calculate statistics
  const totalVolume = projects.reduce((acc, p) => acc + (Number(p.credits_available) || 0), 0);
  const activeCount = projects.filter((p) => p.status === "ACTIVE").length;
  const pendingCount = projects.filter((p) => p.status === "PAUSED").length;

  return (
    <main className="min-h-screen bg-[#FAFAF7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* KYC Status banner if not approved */}
        {!isKycApproved && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-900">
                  KYC Verification Status: {org?.kyc_status || "PENDING"}
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  Your organization must be approved by compliance before newly submitted projects can be activated on the public order book.
                </p>
              </div>
            </div>
            <Link href="/onboarding/kyc/status">
              <Button variant="secondary" size="sm" className="whitespace-nowrap text-xs">
                Check KYC Status
              </Button>
            </Link>
          </div>
        )}

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-pran-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-pran-emerald/10 text-pran-emerald text-xs font-bold uppercase tracking-wider">
                Developer & Seller Desk
              </span>
              <span className="text-xs text-pran-muted">• {org?.legal_name}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-pran-text mt-1">
              Carbon Project Portfolio
            </h1>
            <p className="text-sm text-pran-muted mt-1">
              Manage your verified registry issuances, escrow payouts, and listed project volumes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard/seller/projects/new">
              <Button
                variant="primary"
                size="default"
                disabled={!isKycApproved}
                className="font-semibold shadow-sm"
              >
                <PlusCircle className="w-4 h-4 mr-2" /> List New Project
              </Button>
            </Link>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white border border-pran-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs text-pran-muted font-bold uppercase tracking-wider mb-2">
              <span>Total Volume Listed</span>
              <Trees className="w-4 h-4 text-pran-emerald" />
            </div>
            <div className="text-2xl font-black text-pran-text">
              {totalVolume.toLocaleString()} <span className="text-xs font-medium text-pran-muted">tCO₂e</span>
            </div>
            <p className="text-[11px] text-pran-muted mt-1">Across all registered vintages</p>
          </div>

          <div className="bg-white border border-pran-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs text-pran-muted font-bold uppercase tracking-wider mb-2">
              <span>Active in Order Book</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-pran-text">
              {activeCount} <span className="text-xs font-medium text-pran-muted">projects</span>
            </div>
            <p className="text-[11px] text-pran-muted mt-1">Live for institutional procurement</p>
          </div>

          <div className="bg-white border border-pran-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs text-pran-muted font-bold uppercase tracking-wider mb-2">
              <span>Under Compliance Review</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-pran-text">
              {pendingCount} <span className="text-xs font-medium text-pran-muted">projects</span>
            </div>
            <p className="text-[11px] text-pran-muted mt-1">Awaiting PRAN desk verification</p>
          </div>
        </div>

        {/* Project Table */}
        <div className="bg-white rounded-xl border border-pran-border overflow-hidden shadow-sm">
          <div className="p-5 border-b border-pran-border flex items-center justify-between">
            <h2 className="text-base font-bold text-pran-text">Your Project Submissions</h2>
            <span className="text-xs text-pran-muted font-medium">{projects.length} total</span>
          </div>

          {projects.length === 0 ? (
            <div className="py-20 text-center text-pran-muted">
              <Trees className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-pran-text">No projects listed yet.</p>
              <p className="text-xs text-pran-muted mt-1 mb-6 max-w-sm mx-auto">
                Once your organization KYC is cleared, you can list your verified carbon projects directly on PRAN.
              </p>
              {isKycApproved && (
                <Link href="/dashboard/seller/projects/new">
                  <Button variant="primary" size="sm">
                    <PlusCircle className="w-4 h-4 mr-1.5" /> List Your First Project
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-pran-muted font-bold uppercase tracking-wider border-b border-pran-border">
                    <th className="py-3 px-4">Project Name</th>
                    <th className="py-3 px-4">Registry Standard</th>
                    <th className="py-3 px-4">Registry ID</th>
                    <th className="py-3 px-4">Vintage</th>
                    <th className="py-3 px-4">Available Credits</th>
                    <th className="py-3 px-4">Unit Price (INR)</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Preview</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-pran-text">{proj.name}</div>
                        <div className="text-[11px] text-pran-muted">
                          {proj.country} • {proj.project_type || "Carbon Offset"}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-pran-text">
                        {proj.registry}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-pran-muted">
                        {proj.registry_project_id || "—"}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-pran-text">
                        {proj.vintage_year || "—"}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-pran-text">
                        {Number(proj.credits_available || 0).toLocaleString()} tCO₂e
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-pran-text">
                        ₹{Number(proj.price_per_credit_inr || 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        {proj.status === "ACTIVE" ? (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                            Active
                          </span>
                        ) : proj.status === "PAUSED" ? (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">
                            Under Review
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-800">
                            Sold Out
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/project/${proj.slug}`}
                          target="_blank"
                          className="inline-flex items-center text-xs font-semibold text-pran-emerald hover:underline"
                        >
                          View <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
