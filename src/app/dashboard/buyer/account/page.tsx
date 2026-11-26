"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Layers,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const REGISTRIES = [
  "Verra (VCS)",
  "Gold Standard (GS)",
  "International Carbon Registry (ICR)",
  "Global Carbon Council (GCC)",
  "BioCarbon Standard",
  "Plan Vivo",
  "C-Capsule",
  "Other National / Regional Registry",
];

export default function BuyerAccountSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const [preferredRegistry, setPreferredRegistry] = React.useState(REGISTRIES[0]);
  const [registryAccountId, setRegistryAccountId] = React.useState("");
  const [registryAccountHolderName, setRegistryAccountHolderName] = React.useState("");

  React.useEffect(() => {
    async function loadAccount() {
      try {
        const res = await fetch("/api/buyer/account");
        if (res.status === 401) {
          router.push("/login?next=/dashboard/buyer/account");
          return;
        }
        const json = await res.json();
        if (json.account) {
          if (json.account.preferred_registry) setPreferredRegistry(json.account.preferred_registry);
          if (json.account.registry_account_id) setRegistryAccountId(json.account.registry_account_id);
          if (json.account.registry_account_holder) setRegistryAccountHolderName(json.account.registry_account_holder);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadAccount();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    if (!registryAccountId.trim()) {
      setErrorMsg("Registry Account ID is required.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/buyer/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preferredRegistry,
          registryAccountId: registryAccountId.trim(),
          registryAccountHolderName: registryAccountHolderName.trim() || undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error || "Failed to update registry details.");
        return;
      }

      setSuccessMsg("Registry account settings updated successfully.");
    } catch {
      setErrorMsg("A network error occurred.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-pran-emerald border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Loading Registry Config...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link
          href="/dashboard/buyer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-pran-muted hover:text-pran-text"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Buyer Desk
        </Link>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pran-emerald/10 text-pran-emerald text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" /> Registry Destination
          </div>
          <h1 className="text-3xl font-extrabold text-pran-text">
            Configure Carbon Registry Account
          </h1>
          <p className="text-sm text-pran-muted mt-1">
            Specify where retired or transferred carbon credit serials should be allocated upon order settlement.
          </p>
        </div>

        <div className="bg-white border border-pran-border rounded-2xl p-6 sm:p-10 shadow-sm">
          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800 text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-status-danger/10 border border-status-danger/20 flex items-center gap-3 text-status-danger text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-pran-muted mb-1.5">
                Preferred Carbon Registry Standard <span className="text-status-danger">*</span>
              </label>
              <select
                value={preferredRegistry}
                onChange={(e) => setPreferredRegistry(e.target.value)}
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
                Registry Account ID / Serial <span className="text-status-danger">*</span>
              </label>
              <Input
                value={registryAccountId}
                onChange={(e) => setRegistryAccountId(e.target.value)}
                placeholder="e.g. GS-ACC-10492 or Verra Account #1920"
                required
              />
              <p className="text-[11px] text-pran-muted mt-1">
                Your company&apos;s unique account identifier on the registry portal.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-pran-muted mb-1.5">
                Registry Account Holder Legal Name
              </label>
              <Input
                value={registryAccountHolderName}
                onChange={(e) => setRegistryAccountHolderName(e.target.value)}
                placeholder="Exact legal name as registered with the registry"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Link href="/dashboard/buyer">
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" variant="primary" size="lg" disabled={saving}>
                {saving ? "Saving Changes..." : "Save Registry Settings"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
