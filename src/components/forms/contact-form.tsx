"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  company: z.string().optional(),
  phone: z.string().optional(),
  interest: z.string().min(1, "Select an option"),
  message: z.string().min(10, "Tell us a little more (10+ characters)"),
});

type FormValues = z.infer<typeof schema>;

const interests = [
  { value: "demo", label: "Request a demo" },
  { value: "purchase", label: "Buy carbon credits" },
  { value: "list", label: "List a project" },
  { value: "reporting", label: "ESG / BRSR / CBAM reporting" },
  { value: "other", label: "Something else" },
];

export function ContactForm({
  defaultInterest,
  defaultMessage,
}: {
  defaultInterest?: string;
  defaultMessage?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      interest: defaultInterest ?? "demo",
      message: defaultMessage ?? "",
    },
  });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    try {
      /**
       * STATIC BRANCH — there is no server to run /api/contact, so the endpoint
       * is configurable. Set `window.PRAN_CONTACT_ENDPOINT` (see index of the
       * built site, or public/config.js) to a form service such as Formspree,
       * Netlify Forms or Web3Forms. Until it is set, submission fails softly
       * and the form shows the "email us directly" message it always had.
       */
      const endpoint =
        (typeof window !== "undefined" && window.PRAN_CONTACT_ENDPOINT) ||
        "/api/contact";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please email us directly.");
    }
  }

  if (submitted) {
    return (
      <div className="rounded-card border border-pran-border bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-status-success" />
        <h2 className="mt-4 font-display text-h3 font-semibold text-pran-text">
          Thank you — we&rsquo;ve received your message.
        </h2>
        <p className="mt-2 text-pran-muted">
          Our team will get back to you shortly. For anything urgent, email us
          directly.
        </p>
      </div>
    );
  }

  const label = "mb-1.5 block text-sm font-medium text-pran-text";
  const err = "mt-1 text-sm text-status-danger";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">Name</label>
          <Input id="name" error={!!errors.name} {...register("name")} />
          {errors.name && <p className={err}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={label} htmlFor="email">Work email</label>
          <Input id="email" type="email" error={!!errors.email} {...register("email")} />
          {errors.email && <p className={err}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={label} htmlFor="company">Company (optional)</label>
          <Input id="company" {...register("company")} />
        </div>
        <div>
          <label className={label} htmlFor="phone">Phone (optional)</label>
          <Input id="phone" {...register("phone")} />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="interest">I&rsquo;m interested in</label>
        <select
          id="interest"
          {...register("interest")}
          className="h-11 w-full rounded-btn border border-pran-border bg-white px-3 text-sm text-pran-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pran-teal/60"
        >
          {interests.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {errors.interest && <p className={err}>{errors.interest.message}</p>}
      </div>

      <div>
        <label className={label} htmlFor="message">Message</label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className={cn(
            "w-full rounded-btn border bg-white px-3 py-2 text-sm text-pran-text placeholder:text-pran-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
            errors.message
              ? "border-status-danger focus-visible:ring-status-danger/50"
              : "border-pran-border focus-visible:ring-pran-teal/60",
          )}
        />
        {errors.message && <p className={err}>{errors.message.message}</p>}
      </div>

      {serverError && <p className={err}>{serverError}</p>}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
