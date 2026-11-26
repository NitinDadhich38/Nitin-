"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck, Lock, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const errorParam = searchParams.get("error");
  const nextParam = searchParams.get("next");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || "Authentication failed. Please check your credentials.");
        setIsSubmitting(false);
        return;
      }

      // If nextParam exists and user is verified, respect nextParam, else go to destination returned
      if (nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")) {
        router.push(nextParam);
      } else {
        router.push(result.destination || "/dashboard");
      }
    } catch {
      setServerError("A network error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#FAFAF7]">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pran-emerald/10 text-pran-emerald text-xs font-semibold tracking-wide uppercase mb-3">
            <Lock className="w-3.5 h-3.5" /> Secure Authentication
          </div>
          <h1 className="text-3xl font-extrabold text-pran-text tracking-tight">
            Sign In to PRAN
          </h1>
          <p className="mt-2 text-sm text-pran-muted">
            Access your verified carbon credit portfolio, trading desk, or project submissions.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-pran-border rounded-2xl p-6 sm:p-8 shadow-sm">
          {errorParam && (
            <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-3 text-amber-800 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <span>
                {errorParam === "verification_failed"
                  ? "Email verification link was invalid or expired. Please sign in or request a new link."
                  : "Authentication session expired. Please sign in again."}
              </span>
            </div>
          )}

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
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-xs text-status-danger mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-pran-muted">
                  Password <span className="text-status-danger">*</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-pran-emerald hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                type="password"
                {...register("password")}
                placeholder="••••••••••••"
                error={!!errors.password}
                disabled={isSubmitting}
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-xs text-status-danger mt-1">{errors.password.message}</p>
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
                "Signing in..."
              ) : (
                <span className="inline-flex items-center gap-2">
                  Sign In <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-pran-border text-center">
            <p className="text-sm text-pran-muted">
              Don&apos;t have an institutional account?{" "}
              <Link href="/register" className="font-semibold text-pran-emerald hover:underline">
                Register now
              </Link>
            </p>
            <div className="mt-4 flex items-center justify-center gap-3 text-xs text-pran-muted">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-pran-emerald" /> End-to-End Encryption
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-pran-emerald" /> SOC2-aligned infra
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense
      fallback={
        <main className="min-h-[85vh] flex items-center justify-center bg-[#FAFAF7]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-pran-emerald border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-pran-muted font-semibold uppercase tracking-wider">
              Loading Secure Portal...
            </p>
          </div>
        </main>
      }
    >
      <LoginForm />
    </React.Suspense>
  );
}
