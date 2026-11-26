"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Building2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Filter,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminKycQueuePage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [organizations, setOrganizations] = React.useState<any[]>([]);
  const [statusFilter, setStatusFilter] = React.useState("ALL");

  const loadQueue = React.useCallback(async () => {
    setLoading(true);
    try {
      const url = `/api/admin/kyc/list?status=${statusFilter}`;
      const res = await fetch(url);
      if (res.status === 401 || res.status === 403) {
        router.push("/login?next=/admin/kyc");
        return;
      }
      const data = await res.json();
      setOrganizations(data.organizations || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [router, statusFilter]);

  React.useEffect(() => {
    loadQueue();
  }, [loadQueue]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3 h-3" /> Approved
          </span>
        );
      case "UNDER_REVIEW":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            <Clock className="w-3 h-3" /> Under Review
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3" /> Pending Review
          </span>
        );
      case "DOCUMENTS_REQUESTED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">
            <AlertTriangle className="w-3 h-3" /> Docs Requested
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">
            <XCircle className="w-3 h-3" /> Rejected
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800">
            {status}
          </span>
        );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-pran-emerald/10 text-pran-emerald text-xs font-bold uppercase tracking-wider">
                Admin Console
              </span>
              <span className="text-xs text-slate-400">• Compliance Desk</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              KYC Verification Queue
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Review and audit legal entity credentials, PAN/GST records, and registry accounts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="secondary" size="sm">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 my-6 overflow-x-auto pb-2">
          {["ALL", "PENDING", "UNDER_REVIEW", "DOCUMENTS_REQUESTED", "APPROVED", "REJECTED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                statusFilter === st
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* Queue Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-8 h-8 border-2 border-pran-emerald border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Loading applications...
              </p>
            </div>
          ) : organizations.length === 0 ? (
            <div className="py-20 text-center text-slate-500">
              <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold">No applications found in this queue.</p>
              <p className="text-xs text-slate-400 mt-1">New submissions will appear here automatically.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4">Organization Legal Name</th>
                    <th className="py-3 px-4">Structure</th>
                    <th className="py-3 px-4">PAN (Masked)</th>
                    <th className="py-3 px-4">Primary Contact</th>
                    <th className="py-3 px-4">Docs</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Submitted</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {organizations.map((org) => {
                    const primaryUser = org.user_profiles?.[0];
                    const docCount = org.kyc_documents?.length || 0;
                    return (
                      <tr key={org.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{org.legal_name}</div>
                          {org.trade_name && (
                            <div className="text-[11px] text-slate-400">{org.trade_name}</div>
                          )}
                        </td>
                        <td className="py-3 px-4 text-slate-600 font-medium">
                          {org.registration_type}
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-700">
                          •••••{org.pan?.slice(-4)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900">{primaryUser?.full_name || "—"}</div>
                          <div className="text-[11px] text-slate-500">{primaryUser?.email || "—"}</div>
                          <div className="text-[10px] text-pran-emerald font-semibold uppercase">{primaryUser?.role}</div>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-700">
                          {docCount} file(s)
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(org.kyc_status)}
                        </td>
                        <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                          {new Date(org.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link href={`/admin/kyc/${org.id}`}>
                            <Button variant="secondary" size="sm" className="font-medium text-xs h-8 px-3">
                              Review <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
