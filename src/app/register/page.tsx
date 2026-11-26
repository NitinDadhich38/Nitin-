"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ShieldCheck,
  Building2,
  Trees,
  ArrowRight,
  CheckCircle2,
  Lock,
  AlertCircle,
  FileText,
  BadgeCheck,
  Landmark,
  Scale,
  HelpCircle,
  Phone,
  Mail,
  User,
  ExternalLink,
} from "lucide-react";
import { registrationSchema, type RegistrationInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = React.useState<"SELLER" | "BUYER">("SELLER");
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successData, setSuccessData] = React.useState<{
    email: string;
    requiresVerification: boolean;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      role: "SELLER",
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });

  const passwordValue = watch("password") || "";

  // Password validation rules
  const passwordRules = [
    { label: "At least 12 characters", met: passwordValue.length >= 12 },
    { label: "Uppercase & lowercase letters", met: /[A-Z]/.test(passwordValue) && /[a-z]/.test(passwordValue) },
    { label: "At least 1 digit (0-9)", met: /[0-9]/.test(passwordValue) },
    { label: "At least 1 special character", met: /[^A-Za-z0-9]/.test(passwordValue) },
  ];

  const handleRoleChange = (role: "SELLER" | "BUYER") => {
    setSelectedRole(role);
    setValue("role", role, { shouldValidate: true });
  };

  const onSubmit = async (data: RegistrationInput) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || "Failed to register. Please check your details.");
        setIsSubmitting(false);
        return;
      }

      if (result.requiresEmailVerification) {
        setSuccessData({
          email: data.email,
          requiresVerification: true,
        });
      } else {
        // Logged in automatically or session created
        router.push("/onboarding/kyc");
      }
    } catch {
      setServerError("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successData) {
    return (
      <main className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#F4F6F8]">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Verification Link Dispatched</h1>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            An official activation link has been sent to <span className="font-semibold text-slate-900">{successData.email}</span>.
            Please verify your institutional email address to begin KYC due diligence.
          </p>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-8 text-xs text-left text-slate-700 space-y-1.5">
            <p className="font-semibold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Statutory Protocol Notice
            </p>
            <p>
              In accordance with national carbon registry standards, full market access requires document verification of entity PAN, GSTIN, and Authorized Signatory authority.
            </p>
          </div>
          <Link href="/login">
            <Button className="w-full bg-[#0F3D2E] hover:bg-[#155A44] text-white">
              Proceed to Sign In
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Institutional Top Government/Registry Header Banner */}
      <div className="bg-[#0B251C] text-white border-b border-[#143E30] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/15 text-emerald-400 font-bold text-xl tracking-wider">
              PRΛN
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                  National Carbon Registry & Trading Portal
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">• ICM & International Registry Interoperability</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Participant Enrollment Portal
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
              <span>CCTS & Registry Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>256-Bit Escrow Security</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Navigation Breadcrumb / Notice */}
        <div className="bg-amber-50 border border-amber-200/90 rounded-xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
            <span>
              <strong>Registration Notice:</strong> Modeled after the <em>Indian Carbon Market (ICM)</em> and <em>Xpansiv / CBL Market Operating Rules</em>. Please keep your Entity PAN, GSTIN, CIN/LLPIN, and Nodal Officer authority document ready.
            </span>
          </div>
          <span className="shrink-0 text-amber-800 font-medium">BEE / ICM Regulatory Standard</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Card */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            {/* Category Selector Tabs */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Select Entity Registration Category *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleChange("SELLER")}
                  className={`p-4 rounded-xl border text-left transition-all relative ${
                    selectedRole === "SELLER"
                      ? "border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/20"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center mb-3">
                      <Trees className="w-5 h-5" />
                    </div>
                    {selectedRole === "SELLER" && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
                        SELECTED
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Non-Obligated Entity (Seller)</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Project developers, renewable power plants, afforestation, bio-energy generators selling verified carbon credits & CCCs.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange("BUYER")}
                  className={`p-4 rounded-xl border text-left transition-all relative ${
                    selectedRole === "BUYER"
                      ? "border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/20"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center mb-3">
                      <Building2 className="w-5 h-5" />
                    </div>
                    {selectedRole === "BUYER" && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
                        SELECTED
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Obligated / Voluntary Entity (Buyer)</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Corporates, ESG compliance entities, industrial buyers, brokers, and institutions purchasing credits for retirement or trading.
                  </p>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {serverError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-xs">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="border-t border-slate-100 pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 mb-4">
                  <User className="w-4 h-4 text-emerald-700" /> 1. Authorized Nodal Officer Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Nodal Officer Full Name *
                    </label>
                    <Input
                      placeholder="e.g. Rahul Sharma"
                      {...register("fullName")}
                      className={errors.fullName ? "border-red-500" : ""}
                    />
                    {errors.fullName && (
                      <p className="text-red-600 text-[11px] mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Mobile Number (+91) *
                    </label>
                    <Input
                      placeholder="e.g. 9876543210"
                      {...register("phone")}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-[11px] mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Official Institutional Email Address *
                    </label>
                    <Input
                      type="email"
                      placeholder="nodal.officer@company.com"
                      {...register("email")}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-600 text-[11px] mt-1">{errors.email.message}</p>
                    )}
                    <p className="text-[11px] text-slate-500 mt-1">
                      Official corporate email required for statutory correspondence and trade execution notices.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 mb-4">
                  <Lock className="w-4 h-4 text-emerald-700" /> 2. Institutional Account Security
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Create Password *
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••••••"
                      {...register("password")}
                      className={errors.password ? "border-red-500" : ""}
                    />
                    {errors.password && (
                      <p className="text-red-600 text-[11px] mt-1">{errors.password.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Confirm Password *
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••••••"
                      {...register("confirmPassword")}
                      className={errors.confirmPassword ? "border-red-500" : ""}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-600 text-[11px] mt-1">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                {/* Password strength checklist */}
                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] font-semibold text-slate-600 mb-2">Password Standards:</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                    {passwordRules.map((rule, idx) => (
                      <span
                        key={idx}
                        className={`flex items-center gap-1.5 ${
                          rule.met ? "text-emerald-700 font-medium" : "text-slate-400"
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                            rule.met ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          ✓
                        </span>
                        {rule.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Statutory Undertaking & Terms */}
              <div className="border-t border-slate-100 pt-6">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    {...register("termsAccepted")}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="termsAccepted" className="text-xs text-slate-600 leading-relaxed">
                    I declare on behalf of the applicant entity that the information provided is genuine and I am authorized to register as the Nodal Representative. I agree to abide by the{" "}
                    <Link href="/legal/terms" target="_blank" className="text-emerald-700 underline font-medium">
                      PRAN Market Operating Rules
                    </Link>
                    ,{" "}
                    <Link href="/legal/privacy" target="_blank" className="text-emerald-700 underline font-medium">
                      Privacy Policy
                    </Link>
                    , and statutory compliance under the Carbon Credit Trading Scheme (CCTS).
                  </label>
                </div>
                {errors.termsAccepted && (
                  <p className="text-red-600 text-[11px] mt-1 ml-7">{errors.termsAccepted.message}</p>
                )}
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-[#0F3D2E] hover:bg-[#155A44] text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                {isSubmitting ? (
                  <span>Initiating Enrollment...</span>
                ) : (
                  <>
                    <span>Register & Proceed to Institutional Due Diligence</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>

              <div className="text-center text-xs text-slate-500 pt-2">
                Already registered with an active enrollment?{" "}
                <Link href="/login" className="text-emerald-700 font-semibold hover:underline">
                  Sign In to Compliance Desk
                </Link>
              </div>
            </form>
          </div>

          {/* Right Column: Pre-requisites & Checklist */}
          <div className="lg:col-span-4 space-y-6">
            {/* Checklist Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-4">
                <FileText className="w-4 h-4 text-emerald-700" />
                <span>Pre-requisites Checklist</span>
              </div>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Please ensure you have soft copies (PDF/JPG ≤ 10MB) of the following mandatory documents for Step 2 (Due Diligence):
              </p>

              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong>Certificate of Incorporation</strong> / Registration deed.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong>Permanent Account Number (PAN)</strong> & GSTIN certificate.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong>Board Resolution / Power of Attorney</strong> authorizing the signatory.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <strong>Bank Proof</strong> (Bank Statement last 3 months or Cancelled Cheque).
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    5
                  </div>
                  <div>
                    <strong>Registry Account Details</strong> (Verra VCS, Gold Standard, ICR, I-REC, etc.).
                  </div>
                </li>
              </ul>
            </div>

            {/* Support / Helpdesk Card */}
            <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 text-xs text-slate-600 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <HelpCircle className="w-4 h-4 text-emerald-700" />
                <span>Regulatory Helpdesk</span>
              </div>
              <p className="leading-relaxed">
                For assistance regarding non-obligated seller registration, obligated entity compliance, or voluntary standard onboarding:
              </p>
              <div className="space-y-1.5 font-medium text-slate-800">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a href="mailto:compliance@pranglobal.com" className="hover:text-emerald-700 hover:underline">compliance@pranglobal.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <a href="tel:+917296815012" className="hover:text-emerald-700 hover:underline">Nodal Desk: +91 72968 15012</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
