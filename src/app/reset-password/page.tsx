"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password") || "";

  const passwordRules = [
    { label: "At least 12 characters", met: passwordValue.length >= 12 },
    { label: "Uppercase & lowercase letters", met: /[A-Z]/.test(passwordValue) && /[a-z]/.test(passwordValue) },
    { label: "At least 1 digit (0-9)", met: /[0-9]/.test(passwordValue) },
    { label: "At least 1 special character", met: /[^A-Za-z0-9]/.test(passwordValue) },
  ];

  const onSubmit = async (data: ResetPasswordInput) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || "Failed to update password.");
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
    } catch {
      setServerError("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#FAFAF7]">
        <div className="max-w-md w-full bg-white rounded-2xl border border-pran-border p-8 shadow-sm text-center">
          <div className="w-14 h-14 bg-pran-emerald/10 text-pran-emerald rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-pran-text mb-3">Password Updated</h1>
          <p className="text-sm text-pran-muted leading-relaxed mb-8">
            Your account credentials have been securely updated. You may now sign in with your new password.
          </p>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => router.push("/login")}
          >
            Sign In with New Password
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#FAFAF7]">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pran-emerald/10 text-pran-emerald text-xs font-semibold tracking-wide uppercase mb-3">
            <Lock className="w-3.5 h-3.5" /> Security Reset
          </div>
          <h1 className="text-3xl font-extrabold text-pran-text tracking-tight">
            Create New Password
          </h1>
          <p className="mt-2 text-sm text-pran-muted">
            Set a new high-entropy password for your PRAN account.
          </p>
        </div>

        <div className="bg-white border border-pran-border rounded-2xl p-6 sm:p-8 shadow-sm">
          {serverError && (
            <div className="mb-6 p-4 rounded-xl bg-status-danger/10 border border-status-danger/20 flex items-start gap-3 text-status-danger text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-pran-muted mb-1.5">
                New Password <span className="text-status-danger">*</span>
              </label>
              <Input
                type="password"
                {...register("password")}
                placeholder="••••••••••••"
                error={!!errors.password}
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="text-xs text-status-danger mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-pran-muted mb-1.5">
                Confirm New Password <span className="text-status-danger">*</span>
              </label>
              <Input
                type="password"
                {...register("confirmPassword")}
                placeholder="••••••••••••"
                error={!!errors.confirmPassword}
                disabled={isSubmitting}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-status-danger mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Password Security Rules */}
            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
              <span className="text-[11px] font-bold text-slate-600 block">Security Requirements:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
                {passwordRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-1.5 ${
                      rule.met ? "text-emerald-700 font-medium" : "text-slate-500"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${rule.met ? "bg-emerald-600" : "bg-slate-300"}`} />
                    {rule.label}
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Updating..."
              ) : (
                <span className="inline-flex items-center gap-2">
                  Reset Password <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-pran-border text-center">
            <Link
              href="/login"
              className="text-sm text-pran-muted hover:text-pran-text font-medium"
            >
              Cancel and Return to Sign In
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
