"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Building2,
  FileText,
  User,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  Landmark,
  Users,
  Layers,
  Scale,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { KycStatus } from "@/types/auth";

export default function AdminKycReviewDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const orgId = params.id;

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any>(null);
  const [actionLoading, setActionLoading] = React.useState(false);

  // Modal / Inputs
  const [actionReason, setActionReason] = React.useState("");
  const [internalNotes, setInternalNotes] = React.useState("");
  const [activeModal, setActiveModal] = React.useState<"APPROVE" | "REQUEST_DOCS" | "REJECT" | null>(null);

  const loadDetails = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/kyc/${orgId}`);
      if (res.status === 401 || res.status === 403) {
        router.push("/login?next=/admin/kyc");
        return;
      }
      const json = await res.json();
      setData(json);
      setInternalNotes(json.organization?.kyc_notes || "");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [orgId, router]);

  React.useEffect(() => {
    loadDetails();
  }, [loadDetails]);

  // Open Document via 60-second signed URL
  const handleViewDocument = async (documentId: string) => {
    try {
      const res = await fetch(`/api/admin/kyc/doc-url?documentId=${documentId}`);
      const json = await res.json();
      if (res.ok && json.signedUrl) {
        window.open(json.signedUrl, "_blank", "noopener,noreferrer");
      } else {
        alert(json.error || "Could not retrieve document");
      }
    } catch (e) {
      alert("Network error fetching document.");
    }
  };

  const handleReviewAction = async (status: KycStatus) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/kyc/${orgId}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          reason: actionReason.trim() || undefined,
          notes: internalNotes.trim() || undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        alert(json.error || "Failed to update review status.");
        return;
      }

      setActiveModal(null);
      setActionReason("");
      loadDetails();
    } catch {
      alert("Network error while submitting review.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-pran-emerald border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Loading verification dossier...
          </p>
        </div>
      </main>
    );
  }

  const org = data?.organization;
  const user = data?.users?.[0];
  const docs = data?.documents || [];

  // Extract nested or root-level institutional details
  const bDetails = org?.business_details || {};
  const bank = org?.bank_details || {};
  const ubos: any[] = org?.ubo_details?.ubos || org?.ubo_details || [];
  const signatories: any[] = org?.signatory_details?.signatories || org?.signatory_details || [];
  const registry = org?.registry_details || {};
  const regDecl = org?.regulatory_declarations || {};

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back and Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/kyc"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Verification Queue
          </Link>
          <div className="text-xs font-mono text-slate-400">Org ID: {org?.id}</div>
        </div>

        {/* Title & Status */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800">
                {org?.registration_type}
              </span>
              <span className="text-xs text-slate-400">• Role: {user?.role}</span>
              <span className="text-xs text-slate-400">• Applied: {new Date(org?.created_at).toLocaleDateString()}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
              {org?.legal_name}
            </h1>
            {org?.trade_name && (
              <p className="text-xs text-slate-500">Trade / DBA Name: {org.trade_name}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                org?.kyc_status === "APPROVED"
                  ? "bg-emerald-100 text-emerald-800"
                  : org?.kyc_status === "REJECTED"
                  ? "bg-red-100 text-red-800"
                  : org?.kyc_status === "DOCUMENTS_REQUESTED"
                  ? "bg-orange-100 text-orange-800"
                  : "bg-slate-900 text-white"
              }`}
            >
              {org?.kyc_status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Info (left 8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Legal Entity Identifiers & Office */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Building2 className="w-4 h-4 text-pran-emerald" />
                <h2 className="text-sm font-bold text-slate-900">1. Legal Entity Identifiers & Registered Office</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Full Entity PAN (Admin Unmasked):</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{org?.pan}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">GSTIN:</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{org?.gstin || "—"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">CIN / LLPIN / Reg No:</span>
                  <span className="font-semibold text-slate-900">{org?.registration_number || bDetails?.cin_or_reg || "—"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Date of Incorporation:</span>
                  <span className="font-semibold text-slate-900">{org?.date_of_incorporation || bDetails?.date_of_incorporation || "—"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Entity Website:</span>
                  {org?.website || bDetails?.website ? (
                    <a
                      href={org.website || bDetails.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pran-emerald font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      {org.website || bDetails.website} <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    "—"
                  )}
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block font-medium">Registered Office Address:</span>
                  <span className="font-medium text-slate-800">
                    {org?.address_line_1}
                    {org?.address_line_2 ? `, ${org.address_line_2}` : ""}, {org?.city}, {org?.state} - {org?.pincode}, {org?.country}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Business Profile & Nature of Operations */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <FileText className="w-4 h-4 text-pran-emerald" />
                <h2 className="text-sm font-bold text-slate-900">2. Business Profile & Carbon Operations</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Primary Industry Sector:</span>
                  <span className="font-semibold text-slate-900">{org?.business_sector || bDetails?.business_sector || "—"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Estimated Annual Volume (tCO₂e):</span>
                  <span className="font-mono font-bold text-slate-900">
                    {org?.annual_carbon_volume || bDetails?.annual_carbon_volume || "—"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Annual Turnover / Revenue Bracket:</span>
                  <span className="font-semibold text-slate-900">{org?.annual_turnover || bDetails?.annual_turnover || "—"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Parent / Ultimate Holding Entity:</span>
                  <span className="font-semibold text-slate-900">{org?.parent_entity || bDetails?.parent_entity || "None / Direct"}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block font-medium">Nature of Business Description:</span>
                  <p className="text-slate-800 mt-1 leading-relaxed">
                    {bDetails?.nature_of_business || org?.nature_of_business || "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Banking & Settlement Accounts */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Landmark className="w-4 h-4 text-pran-emerald" />
                <h2 className="text-sm font-bold text-slate-900">3. Settlement Bank Account Details</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Account Beneficiary Name:</span>
                  <span className="font-bold text-slate-900">{bank?.account_holder_name || org?.bank_account_holder || "—"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Bank Name:</span>
                  <span className="font-semibold text-slate-900">{bank?.bank_name || org?.bank_name || "—"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Account Number:</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {bank?.account_number || org?.bank_account_number || "—"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">IFSC / SWIFT Code:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {bank?.ifsc_code || bank?.swift_bic || org?.bank_ifsc || "—"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Branch Location:</span>
                  <span className="font-medium text-slate-800">{bank?.branch_name || "—"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Settlement Currency & Account Type:</span>
                  <span className="font-semibold text-slate-900">
                    {bank?.settlement_currency || "INR"} • {bank?.account_type || "Current Account"}
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Ultimate Beneficial Owners (UBO) */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-pran-emerald" />
                  <h2 className="text-sm font-bold text-slate-900">4. Ultimate Beneficial Owners (UBO)</h2>
                </div>
                <span className="text-xs text-slate-400">{Array.isArray(ubos) ? ubos.length : 0} declared</span>
              </div>

              {Array.isArray(ubos) && ubos.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                        <th className="py-2.5 px-3">Name</th>
                        <th className="py-2.5 px-3">Designation / Role</th>
                        <th className="py-2.5 px-3">Nationality</th>
                        <th className="py-2.5 px-3">Ownership %</th>
                        <th className="py-2.5 px-3">PAN / ID</th>
                        <th className="py-2.5 px-3">PEP Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {ubos.map((u, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-bold text-slate-900">{u.full_name || u.name}</td>
                          <td className="py-2.5 px-3 text-slate-600">{u.designation || u.role || "Director"}</td>
                          <td className="py-2.5 px-3 text-slate-600">{u.nationality || "Indian"}</td>
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                            {u.percentage_ownership || u.ownership_pct || "—"}%
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-700">{u.pan_or_id || u.pan || "—"}</td>
                          <td className="py-2.5 px-3">
                            {u.is_pep ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800">
                                YES (PEP)
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                                No
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-slate-400">No separate UBO records provided in this submission.</p>
              )}
            </div>

            {/* 5. Authorized Signatories */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-pran-emerald" />
                  <h2 className="text-sm font-bold text-slate-900">5. Authorized Signatories & Nodal Officers</h2>
                </div>
                <span className="text-xs text-slate-400">{Array.isArray(signatories) ? signatories.length : 1} declared</span>
              </div>

              {Array.isArray(signatories) && signatories.length > 0 ? (
                <div className="space-y-3">
                  {signatories.map((sig, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Signatory Full Name:</span>
                        <span className="font-bold text-slate-900">{sig.full_name || sig.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Designation:</span>
                        <span className="font-semibold text-slate-900">{sig.designation}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">DIN / PAN:</span>
                        <span className="font-mono font-bold text-slate-900">{sig.din_or_pan || sig.pan || "—"}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Email:</span>
                        <span className="text-slate-800">{sig.email}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Phone:</span>
                        <span className="text-slate-800">{sig.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Authorizing Document:</span>
                        <span className="text-slate-800 font-medium">{sig.authorization_type || "Board Resolution"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Primary Contact:</span>
                    <span className="font-bold text-slate-900">{user?.full_name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Email / Phone:</span>
                    <span className="text-slate-800">{user?.email} • {user?.phone || "—"}</span>
                  </div>
                </div>
              )}
            </div>

            {/* 6. Carbon Registry Setup */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Layers className="w-4 h-4 text-pran-emerald" />
                <h2 className="text-sm font-bold text-slate-900">6. Carbon Registry Accounts (CBL / ICM Interop)</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Primary Registry Standard:</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {registry?.primary_registry || user?.preferred_registry || "—"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Registry Account ID / Serial:</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {registry?.registry_account_id || user?.registry_account_id || "—"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Account Holder Name on Registry:</span>
                  <span className="font-semibold text-slate-900">
                    {registry?.registry_account_name || user?.registry_account_holder || "—"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Holding Account Type:</span>
                  <span className="font-semibold text-slate-900">{registry?.holding_account_type || "General Trading / Retirement"}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block font-medium">Other Connected Registries:</span>
                  <span className="font-medium text-slate-800">
                    {Array.isArray(registry?.connected_registries) && registry.connected_registries.length > 0
                      ? registry.connected_registries.join(", ")
                      : "None"}
                  </span>
                </div>
              </div>
            </div>

            {/* 7. Regulatory & Compliance Declarations */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Scale className="w-4 h-4 text-pran-emerald" />
                <h2 className="text-sm font-bold text-slate-900">7. Regulatory, Sanctions & Anti-Money Laundering</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Politically Exposed Person (PEP):</span>
                  <span className="font-bold text-slate-900">
                    {regDecl?.is_pep ? "YES" : "NO (Cleared)"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Sanctions / OFAC / UN Cleared:</span>
                  <span className="font-bold text-emerald-700">
                    {regDecl?.sanctions_cleared !== false ? "YES (Cleared)" : "PENDING"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">FATCA / CRS Status:</span>
                  <span className="font-bold text-slate-900">{regDecl?.fatca_status || "Active NFE"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Material Litigation:</span>
                  <span className="font-bold text-slate-900">
                    {regDecl?.material_litigation ? "Disclosed" : "None Declared"}
                  </span>
                </div>
                <div className="sm:col-span-2 pt-2 border-t border-slate-100">
                  <span className="text-slate-400 block font-medium">AML / Compliance Officer:</span>
                  <span className="font-semibold text-slate-900">
                    {regDecl?.compliance_officer_name || "—"} ({regDecl?.compliance_officer_contact || "—"})
                  </span>
                </div>
              </div>
            </div>

            {/* 8. Uploaded Verification Documents */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-pran-emerald" />
                  <h2 className="text-sm font-bold text-slate-900">
                    8. Verification Documents ({docs.length})
                  </h2>
                </div>
                <span className="text-xs text-slate-400">SOC2 & CCTS Audited</span>
              </div>

              {docs.length === 0 ? (
                <p className="text-xs text-slate-400">No documents uploaded for this organization.</p>
              ) : (
                <div className="space-y-3">
                  {docs.map((doc: any) => (
                    <div
                      key={doc.id}
                      className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-900">{doc.document_type.replace(/_/g, " ")}</div>
                        <div className="text-slate-500 text-[11px] mt-0.5">
                          {doc.file_name} • {(doc.file_size_bytes / 1024).toFixed(0)} KB •{" "}
                          {new Date(doc.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 text-xs font-semibold"
                        onClick={() => handleViewDocument(doc.id)}
                      >
                        <ExternalLink className="w-3.5 h-3.5 mr-1" /> View Signed (60s)
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 9. Statutory Undertaking Details */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3 text-xs">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 font-bold text-slate-900">
                <Award className="w-4 h-4 text-pran-emerald" />
                <span>9. Execution & Statutory Undertaking Confirmation</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-slate-400 block font-medium">Declaration Signed By:</span>
                  <span className="font-bold text-slate-900">{org?.undertaking_signatory || user?.full_name || "—"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Agreement Flag:</span>
                  <span className="font-semibold text-emerald-700">
                    {org?.undertaking_agreed !== false ? "Confirmed & Agreed" : "Pending"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Timestamp:</span>
                  <span className="font-mono text-slate-700">
                    {org?.undertaking_date ? new Date(org.undertaking_date).toLocaleString() : new Date(org?.updated_at || org?.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Sidebar (right 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4 sticky top-6">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-pran-emerald" /> Compliance Decision Console
              </h2>

              <p className="text-xs text-slate-500 leading-relaxed">
                Approving grants immediate access to the trading order book, escrow settlement, and project listing. Rejections or information requests will automatically notify the applicant.
              </p>

              <div className="space-y-2.5 pt-2">
                <Button
                  variant="primary"
                  className="w-full font-semibold text-xs justify-center h-10 bg-emerald-700 hover:bg-emerald-800"
                  onClick={() => setActiveModal("APPROVE")}
                  disabled={org?.kyc_status === "APPROVED"}
                >
                  <CheckCircle2 className="w-4 h-4 mr-1.5" /> Approve KYC Application
                </Button>

                <Button
                  variant="secondary"
                  className="w-full font-semibold text-xs justify-center h-10 text-amber-700 hover:text-amber-800 border-amber-200 bg-amber-50/50"
                  onClick={() => setActiveModal("REQUEST_DOCS")}
                >
                  <AlertTriangle className="w-4 h-4 mr-1.5" /> Request Additional Docs
                </Button>

                <Button
                  variant="secondary"
                  className="w-full font-semibold text-xs justify-center h-10 text-red-700 hover:text-red-800 border-red-200 bg-red-50/50"
                  onClick={() => setActiveModal("REJECT")}
                  disabled={org?.kyc_status === "REJECTED"}
                >
                  <XCircle className="w-4 h-4 mr-1.5" /> Reject Application
                </Button>
              </div>

              {/* Internal Compliance Notes */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Internal Audit Log (Never Shared)
                </label>
                <textarea
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Record verification checks (MCA portal, GST verification, Registry account check, CCTS compliance)..."
                  className="w-full h-28 rounded-lg border border-slate-200 p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-pran-teal/60"
                />
              </div>

              {/* Quick Summary Widget */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-500">
                  <span>Docs Uploaded:</span>
                  <span className="font-bold text-slate-900">{docs.length}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Role:</span>
                  <span className="font-bold text-slate-900">{user?.role}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>PAN Status:</span>
                  <span className="font-mono font-bold text-emerald-700">VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Confirmation Modal */}
        {activeModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-slate-900">
                {activeModal === "APPROVE" && "Confirm KYC Approval"}
                {activeModal === "REQUEST_DOCS" && "Request Additional Documentation"}
                {activeModal === "REJECT" && "Confirm KYC Rejection"}
              </h3>

              {activeModal !== "APPROVE" && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Reason / Instructions for User <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={actionReason}
                    onChange={(e) => setActionReason(e.target.value)}
                    placeholder={
                      activeModal === "REQUEST_DOCS"
                        ? "Please provide certified board resolution authorizing signatory or recent 3 months bank statement..."
                        : "Documentation provided does not match legal entity PAN records..."
                    }
                    className="w-full h-24 rounded-lg border border-slate-200 p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-pran-teal/60"
                    required
                  />
                </div>
              )}

              {activeModal === "APPROVE" && (
                <p className="text-xs text-slate-600 leading-relaxed">
                  Approving this application will mark organization <strong>{org?.legal_name}</strong> as verified and grant immediate trading and portfolio listing privileges.
                </p>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setActiveModal(null)}
                  disabled={actionLoading}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  disabled={actionLoading || (activeModal !== "APPROVE" && !actionReason.trim())}
                  onClick={() => {
                    if (activeModal === "APPROVE") handleReviewAction("APPROVED");
                    else if (activeModal === "REQUEST_DOCS") handleReviewAction("DOCUMENTS_REQUESTED");
                    else if (activeModal === "REJECT") handleReviewAction("REJECTED");
                  }}
                >
                  {actionLoading ? "Processing..." : "Confirm & Send"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
