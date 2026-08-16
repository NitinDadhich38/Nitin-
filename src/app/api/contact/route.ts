import { NextResponse } from "next/server";
import { z } from "zod";
import { responseTimeWindow } from "@/lib/config";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  interest: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  let data: z.infer<typeof schema>;
  try {
    data = schema.parse(await request.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 400 });
  }

  // Send via Resend when configured. Non-fatal if not — the submission is
  // still accepted either way. The two sends are independent: one failing
  // must not stop the other from going out.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.PRAN_TEAM_EMAIL;
  const from = process.env.PRAN_FROM_EMAIL ?? "PRAN <onboarding@resend.dev>";

  if (apiKey && to) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);

      try {
        await resend.emails.send({
          from,
          to,
          replyTo: data.email,
          subject: `New enquiry — ${data.interest} — ${data.name}`,
          text: [
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            `Company: ${data.company ?? "—"}`,
            `Phone: ${data.phone ?? "—"}`,
            `Interest: ${data.interest}`,
            "",
            data.message,
          ].join("\n"),
        });
      } catch (err) {
        console.error("[contact] team notification failed:", err);
      }

      // Stage 2.3 — confirm receipt to the sender. Wording founder-confirmed
      // 2026-08-16 (responseTimeWindow, lib/config.ts) — change it there, not here.
      try {
        await resend.emails.send({
          from,
          to: data.email,
          subject: "We've received your enquiry — PRAN",
          text: [
            `Hi ${data.name},`,
            "",
            `Thanks for reaching out to PRAN. We've received your enquiry and` +
              ` will get back to you within ${responseTimeWindow}.`,
            "",
            "For reference, here's what you sent us:",
            `"${data.message}"`,
            "",
            "— PRAN",
          ].join("\n"),
        });
      } catch (err) {
        console.error("[contact] auto-reply failed:", err);
      }
    } catch (err) {
      console.error("[contact] Resend unavailable:", err);
    }
  } else {
    console.info("[contact] submission received (email not configured):", {
      name: data.name,
      email: data.email,
      interest: data.interest,
    });
  }

  return NextResponse.json({ ok: true });
}
