"use client";

import { useState } from "react";
import { X, Send, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RfqModal({
  isOpen,
  onClose,
  initialProject,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialProject?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [volume, setVolume] = useState("");
  const [notes, setNotes] = useState(
    initialProject ? `Interested in acquiring allocation for ${initialProject}.` : ""
  );
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const message = `[RFQ / Sourcing Request]
Volume needed: ${volume || "Custom portfolio"}
Target project: ${initialProject || "General portfolio request"}
Notes: ${notes}`;

    try {
      const res = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          interest: "purchase",
          message,
        }),
      });

      if (res.ok) {
        setSent(true);
      } else {
        setError("Unable to submit inquiry. Please try again or email us directly.");
      }
    } catch {
      setError("Network issue. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-pran-hairline bg-pran-surface p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-pran-muted transition-colors hover:bg-pran-paper-warm hover:text-pran-ink"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {sent ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-pran-ink">
              Request Received
            </h3>
            <p className="mt-2 text-sm text-pran-muted max-w-sm mx-auto">
              Our institutional trading desk will review your volume requirement and confirm allocation, escrow parameters, and settlement timeline within 24 hours.
            </p>
            <Button onClick={onClose} className="mt-6 w-full">
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-pran-emerald">
                <ShieldCheck className="h-3.5 w-3.5" />
                Direct Sourcing &amp; Escrow Allocation
              </span>
              <h3 className="mt-1 font-display text-2xl font-semibold text-pran-ink">
                {initialProject ? "Request Allocation" : "Request Custom Sourcing"}
              </h3>
              <p className="mt-1 text-xs text-pran-muted">
                {initialProject
                  ? `Inquire about volume tiers, settlement terms, and registry transfer for ${initialProject}.`
                  : "Tell us your volume, vintage, and registry requirements. PRAN's desk will source and settle through escrow."}
              </p>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 p-2.5 text-xs text-red-700 dark:bg-red-950/50 dark:text-red-300">
                {error}
              </p>
            )}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-pran-ink">Your Name *</label>
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="mt-1 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-pran-ink">Work Email *</label>
                <Input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="mt-1 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-pran-ink">Company / Entity</label>
                <Input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company name"
                  className="mt-1 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-pran-ink">Desired Volume (tCO₂e)</label>
                <Input
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  placeholder="e.g. 5,000 or 50,000"
                  className="mt-1 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-pran-ink">Specific Requirements / Notes</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Methodology, acceptable registries, target vintage, or delivery requirements..."
                className="mt-1 w-full rounded-md border border-pran-hairline bg-pran-surface p-2.5 text-sm text-pran-ink focus:border-pran-emerald focus:outline-none focus:ring-1 focus:ring-pran-emerald"
              />
            </div>

            <div className="rounded-lg bg-pran-paper-warm p-3 text-[11px] text-pran-muted">
              🔒 PRAN facilitates secure bilateral escrow: funds are held in escrow and released only after registry verification and transfer to your designated account.
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="w-1/3"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="w-2/3">
                {loading ? "Sending..." : "Submit Sourcing Request"}
                <Send className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
