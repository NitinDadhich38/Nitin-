"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  FileText,
  Building2,
  Mail,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function KycStatusPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any>(null);

  const fetchStatus = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/kyc/current");
      if (res.status === 401) {
        router.push("/login?next=/onboarding/kyc/status");
        return;
      }
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [router]);

  React.useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  if (loading) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center bg-[#FAFAF7]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-pran-emerald border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold uppercase tracking-wider text-pran-muted">
            Checking Verification Status...
          </p>
        </div>
      </main>
    );
  }

  const org = data?.organization;
  const profile = data?.profile;
  const kycStatus = org?.kyc_status || "PENDING";
  const isSeller = profile?.role === "SELLER";
  const dashboardLink = isSeller ? "/dashboard/seller" : "/dashboard/buyer";

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#FAFAF7]">
      <div className="max-w-xl w-full">
        {/* Status Card */}
        <div className="bg-white border border-pran-border rounded-2xl p-6 sm:p-10 shadow-sm text-center">
          {/* Status Badge & Icon */}
          {kycStatus === "APPROVED" && (
            <div>
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                Verification Cleared
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-pran-text mt-2">
                Enterprise KYC Approved
              </h1>
              <p className="text-sm text-pran-muted mt-2 max-w-md mx-auto leading-relaxed">
                Your organization <span className="font-semibold text-pran-text">{org?.legal_name}</span> has been successfully verified. Your account now has full trading and listing permissions.
              </p>
              <div className="mt-8">
                <Link href={dashboardLink}>
                  <Button variant="primary" size="lg" className="w-full font-semibold">
                    Go to {isSeller ? "Project Developer Desk" : "Procurement Dashboard"}{" "}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {(kycStatus === "PENDING" || kycStatus === "UNDER_REVIEW") && (
            <div>
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-5">
                <Clock className="w-10 h-10" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
                {kycStatus === "UNDER_REVIEW" ? "Under Review" : "Queued for Review"}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-pran-text mt-2">
                KYC Application Under Review
              </h1>
              <p className="text-sm text-pran-muted mt-2 max-w-md mx-auto leading-relaxed">
                We have received your organization credentials for{" "}
                <span className="font-semibold text-pran-text">{org?.legal_name || "your entity"}</span>.
                Our compliance team is verifying your registration and tax identifiers against regulatory standards.
              </p>

              <div className="my-6 p-4 bg-slate-50 border border-slate-200/80 rounded-xl text-left text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-pran-muted font-medium">Standard Review SLA:</span>
                  <span className="font-bold text-pran-text">Within 48 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-pran-muted font-medium">Account Role:</span>
                  <span className="font-bold text-pran-text">
                    {profile?.role === "SELLER" ? "Project Developer / Seller" : "Institutional Buyer"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-pran-muted font-medium">Documents Uploaded:</span>
                  <span className="font-bold text-pran-text">{data?.documents?.length || 0} file(s)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={fetchStatus}
                >
                  <RefreshCw className="w-4 h-4 mr-2" /> Refresh Status
                </Button>
                <Link href="/onboarding/kyc" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Update Details
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {kycStatus === "DOCUMENTS_REQUESTED" && (
            <div>
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-5">
                <AlertTriangle className="w-10 h-10" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
                Action Required
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-pran-text mt-2">
                Additional Documents Needed
              </h1>
              <p className="text-sm text-pran-muted mt-2 max-w-md mx-auto leading-relaxed">
                The compliance desk reviewed your application and requires further verification documents before approval.
              </p>

              {org?.kyc_rejection_reason && (
                <div className="my-5 p-4 bg-blue-50/70 border border-blue-200 rounded-xl text-left text-xs text-blue-900">
                  <span className="font-bold block mb-1">Compliance Desk Request:</span>
                  {org.kyc_rejection_reason}
                </div>
              )}

              <div className="mt-6">
                <Link href="/onboarding/kyc">
                  <Button variant="primary" size="lg" className="w-full font-semibold">
                    Upload Requested Documents <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {kycStatus === "REJECTED" && (
            <div>
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-5">
                <XCircle className="w-10 h-10" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider mb-2">
                Application Rejected
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-pran-text mt-2">
                KYC Verification Failed
              </h1>
              <p className="text-sm text-pran-muted mt-2 max-w-md mx-auto leading-relaxed">
                Your application could not be verified by our compliance team.
              </p>

              {org?.kyc_rejection_reason && (
                <div className="my-5 p-4 bg-red-50 border border-red-200 rounded-xl text-left text-xs text-red-900">
                  <span className="font-bold block mb-1">Reason:</span>
                  {org.kyc_rejection_reason}
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link href="/onboarding/kyc" className="flex-1">
                  <Button variant="primary" className="w-full">
                    Resubmit Application
                  </Button>
                </Link>
                <a href="mailto:contact@pranapp.in" className="flex-1">
                  <Button variant="secondary" className="w-full">
                    Contact Compliance
                  </Button>
                </a>
              </div>
            </div>
          )}

          {/* Help box */}
          <div className="mt-8 pt-6 border-t border-pran-border text-xs text-pran-muted flex items-center justify-center gap-2">
            <Mail className="w-3.5 h-3.5 text-pran-emerald" />
            <span>Have questions about institutional compliance? Contact </span>
            <a href="mailto:contact@pranapp.in" className="text-pran-emerald font-semibold hover:underline">
              contact@pranapp.in
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
