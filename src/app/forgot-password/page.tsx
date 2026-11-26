"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submittedEmail, setSubmittedEmail] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || "Failed to process request.");
        setIsSubmitting(false);
        return;
      }

      setSubmittedEmail(data.email);
    } catch {
      setServerError("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedEmail) {
    return (
      <main className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#FAFAF7]">
        <div className="max-w-md w-full bg-white rounded-2xl border border-pran-border p-8 shadow-sm text-center">
          <div className="w-14 h-14 bg-pran-emerald/10 text-pran-emerald rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-pran-text mb-3">Check Your Inbox</h1>
          <p className="text-sm text-pran-muted leading-relaxed mb-8">
            If an account is associated with <span className="font-semibold text-pran-text">{submittedEmail}</span>,
            we have sent instructions to reset your password. The link expires in 60 minutes.
          </p>
          <Link href="/login">
            <Button variant="secondary" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Sign In
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#FAFAF7]">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pran-emerald/10 text-pran-emerald text-xs font-semibold tracking-wide uppercase mb-3">
            <Lock className="w-3.5 h-3.5" /> Password Recovery
          </div>
          <h1 className="text-3xl font-extrabold text-pran-text tracking-tight">
            Reset Password
          </h1>
          <p className="mt-2 text-sm text-pran-muted">
            Enter your registered corporate email to receive recovery instructions.
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
                Work Email <span className="text-status-danger">*</span>
              </label>
              <Input
                type="email"
                {...register("email")}
                placeholder="name@company.com"
                error={!!errors.email}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-xs text-status-danger mt-1">{errors.email.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Sending Link..."
              ) : (
                <span className="inline-flex items-center gap-2">
                  Send Recovery Link <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-pran-border text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-sm text-pran-muted hover:text-pran-text font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
