import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";

// Membership invitation requests. Minimal data: only what is needed to reply.
const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().nullable(),
  referrer: z.string().trim().max(200).optional().nullable(),
  note: z.string().trim().max(1000).optional().nullable(),
  consent: z.literal(true),
  // Anti-spam honeypot (hidden in UI)
  website_hp: z.string().optional(),
});

function clean(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "");
}

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    const rate = checkRateLimit(`invitation:${ip}`, 5, 600);
    if (!rate.success) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please wait a few minutes and try again." },
        { status: 429 },
      );
    }

    const body = await request.json().catch(() => null);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Please check the details and try again." }, { status: 400 });
    }
    const d = parsed.data;
    if (d.website_hp) return NextResponse.json({ ok: true });

    const name = clean(d.name);
    const email = d.email.toLowerCase();
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.PRAN_TEAM_EMAIL || "contact@pranapp.in";
    const from = process.env.PRAN_FROM_EMAIL || "PRAN <onboarding@resend.dev>";

    if (!apiKey) {
      // Without an email key a request would be lost. Fail loudly instead, so
      // the visitor is pointed to WhatsApp or email rather than told it worked.
      console.error("[invitation] RESEND_API_KEY is not configured; request not delivered");
      return NextResponse.json(
        { ok: false, error: "We could not send this just now. Please use WhatsApp or write to us instead." },
        { status: 503 },
      );
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[PRAN Membership] Invitation request: ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${d.phone ? clean(d.phone) : "-"}`,
        `Invited by / spoken for by: ${d.referrer ? clean(d.referrer) : "-"}`,
        "",
        d.note ? clean(d.note) : "(no note)",
      ].join("\n"),
    });
    await resend.emails
      .send({
        from,
        to: email,
        subject: "Your PRAN Membership request",
        text: [
          `Hello ${name},`,
          "",
          "Thank you. We have received your request for a PRAN Membership invitation. Membership is by invitation, so we will read it personally and be in touch.",
          "",
          "PRAN",
          "https://pranglobal.com",
        ].join("\n"),
      })
      .catch((err) => console.error("[invitation] confirmation error:", err));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[invitation] error:", error);
    return NextResponse.json(
      { ok: false, error: "We could not send this just now. Please use WhatsApp or write to us instead." },
      { status: 500 },
    );
  }
}
