"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  FileText,
  ShoppingBag,
  ExternalLink,
  Layers,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BuyerDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/kyc/current");
        if (res.status === 401) {
          router.push("/login?next=/dashboard/buyer");
          return;
        }
        const json = await res.json();
        setData(json);
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
            Loading Procurement Desk...
          </p>
        </div>
      </main>
    );
  }

  const org = data?.organization;
  const profile = data?.profile;
  const hasRegistry = !!profile?.registry_account_id;

  return (
    <main className="min-h-screen bg-[#FAFAF7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-pran-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-pran-emerald/10 text-pran-emerald text-xs font-bold uppercase tracking-wider">
                Institutional Buyer Desk
              </span>
              <span className="text-xs text-pran-muted">• {org?.legal_name}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-pran-text mt-1">
              Procurement & Carbon Assets
            </h1>
            <p className="text-sm text-pran-muted mt-1">
              Direct institutional acquisition of verified carbon credits with bank-grade escrow settlement.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/marketplace">
              <Button variant="primary" size="default" className="font-semibold shadow-sm">
                <ShoppingBag className="w-4 h-4 mr-2" /> Browse Marketplace
              </Button>
            </Link>
          </div>
        </div>

        {/* Registry Connection Alert if missing */}
        {!hasRegistry && (
          <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-900">
                  Carbon Registry Account Not Configured
                </p>
                <p className="text-xs text-amber-700 mt-1 max-w-2xl leading-relaxed">
                  To receive direct credit retirement certificates or title transfers into your corporate registry holdings (Verra, Gold Standard, ICR, etc.), please link your registry account identifiers.
                </p>
              </div>
            </div>
            <Link href="/dashboard/buyer/account">
              <Button variant="primary" size="sm" className="whitespace-nowrap">
                Configure Registry Account <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        )}

        {/* 3 Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Card 1: Verification Status */}
          <div className="bg-white border border-pran-border rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs text-pran-muted font-bold uppercase tracking-wider">
              <span>KYC Compliance</span>
              <ShieldCheck className="w-4 h-4 text-pran-emerald" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xl font-black text-pran-text">Enterprise Cleared</span>
            </div>
            <p className="text-xs text-pran-muted">
              PAN: <span className="font-mono font-medium">XXXXX{org?.pan?.slice(-4)}</span> • Entity: {org?.registration_type}
            </p>
          </div>

          {/* Card 2: Registry Integration */}
          <div className="bg-white border border-pran-border rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs text-pran-muted font-bold uppercase tracking-wider">
              <span>Primary Registry Destination</span>
              <Layers className="w-4 h-4 text-pran-emerald" />
            </div>
            {hasRegistry ? (
              <>
                <div className="text-xl font-black text-pran-text truncate">
                  {profile.preferred_registry || "Standard Registry"}
                </div>
                <p className="text-xs text-pran-muted font-mono truncate">
                  ID: {profile.registry_account_id}
                </p>
              </>
            ) : (
              <>
                <div className="text-base font-bold text-amber-600">Pending Setup</div>
                <p className="text-xs text-pran-muted">Required for automated title transfers</p>
              </>
            )}
            <div className="pt-1">
              <Link
                href="/dashboard/buyer/account"
                className="text-xs font-semibold text-pran-emerald hover:underline inline-flex items-center gap-1"
              >
                Manage Registry Settings <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Card 3: Escrow & Settlement */}
          <div className="bg-white border border-pran-border rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs text-pran-muted font-bold uppercase tracking-wider">
              <span>Settlement Guarantee</span>
              <Lock className="w-4 h-4 text-pran-emerald" />
            </div>
            <div className="text-xl font-black text-pran-text">100% Escrow Backed</div>
            <p className="text-xs text-pran-muted">
              Funds are held in tripartite escrow until verified registry serial transfer is executed.
            </p>
          </div>
        </div>

        {/* Quick Marketplace Access Banner */}
        <div className="bg-white border border-pran-border rounded-2xl p-8 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-xl font-extrabold text-pran-text">
              Ready to Procure Verified Carbon Offsets?
            </h2>
            <p className="text-sm text-pran-muted leading-relaxed">
              Explore 85+ live projects across forestry, renewable energy, and carbon removal. Filter by registry standard, vintage, and UN SDG contributions.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/marketplace">
              <Button variant="primary" size="lg" className="font-semibold">
                Explore Marketplace <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/calculator">
              <Button variant="secondary" size="lg">
                Calculate Footprint
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
