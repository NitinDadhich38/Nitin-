"use client";

import Link from "next/link";
import { useState } from "react";

const field =
  "w-full rounded-btn border border-white/30 bg-white/10 px-4 py-3 text-[15px] text-white placeholder:text-white/50 focus:border-white focus:outline-none focus:ring-1 focus:ring-white";

export function InvitationForm() {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/invitation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.get("name"),
          email: f.get("email"),
          phone: f.get("phone") || null,
          referrer: f.get("referrer") || null,
          note: f.get("note") || null,
          consent: f.get("consent") === "on",
          website_hp: f.get("website_hp") || "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Please check the details and try again.");
      setState("done");
    } catch (err) {
      setState("idle");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-[14px] border border-white/30 p-8 text-center text-white" role="status">
        <p className="font-display text-2xl font-medium">Thank you.</p>
        <p className="mt-3 text-white/80">
          We have your request. Membership is by invitation, so we will read it
          personally and be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 text-left" noValidate={false}>
      <div className="hidden" aria-hidden="true">
        <input type="text" name="website_hp" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-white/80">
          Name
          <input name="name" required minLength={2} maxLength={100} autoComplete="name" className={`${field} mt-1.5`} />
        </label>
        <label className="block text-sm text-white/80">
          Email
          <input name="email" type="email" required maxLength={255} autoComplete="email" className={`${field} mt-1.5`} />
        </label>
        <label className="block text-sm text-white/80">
          Phone (optional)
          <input name="phone" type="tel" maxLength={30} autoComplete="tel" className={`${field} mt-1.5`} />
        </label>
        <label className="block text-sm text-white/80">
          Who invited you, or spoke for you (optional)
          <input name="referrer" maxLength={200} className={`${field} mt-1.5`} />
        </label>
      </div>
      <label className="block text-sm text-white/80">
        Anything you would like us to know (optional)
        <textarea name="note" rows={3} maxLength={1000} className={`${field} mt-1.5`} />
      </label>
      <label className="flex items-start gap-3 text-sm leading-snug text-white/75">
        <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 accent-white" />
        <span>
          I agree that PRAN may use these details to reply to this request, as
          described in the{" "}
          <Link href="/legal/privacy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      {error && (
        <p className="text-sm text-rose-200" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex h-14 items-center justify-center rounded-btn bg-white px-8 text-base font-medium text-pran-forest transition-colors hover:bg-pran-cream disabled:opacity-60"
      >
        {state === "sending" ? "Sending..." : "Request an invitation"}
      </button>
    </form>
  );
}
