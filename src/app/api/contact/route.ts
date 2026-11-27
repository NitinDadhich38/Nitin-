import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";

// Strict input validation
const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  company: z.string().trim().max(100).optional().nullable(),
  phone: z.string().trim().max(30).optional().nullable(),
  interest: z.string().trim().min(1, "Interest category is required").max(50),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
  // Anti-spam honeypot field (hidden in UI)
  website_hp: z.string().optional(),
});

function sanitize(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "");
}

export async function POST(request: Request) {
  try {
    // 1. IP extraction and rate-limiting (max 5 submissions per 10 minutes)
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    const rateCheck = checkRateLimit(`contact:${ip}`, 5, 600);

    if (!rateCheck.success) {
      return NextResponse.json(
        { ok: false, error: "Too many contact submissions. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    // 2. Parse & validate body
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ ok: false, error: "Invalid JSON payload" }, { status: 400 });
    }

    const parseResult = contactSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { ok: false, error: "Validation failed", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // 3. Honeypot check: If the hidden honeypot field is filled, silently succeed without sending email (tarpit spam bots)
    if (data.website_hp && data.website_hp.length > 0) {
      return NextResponse.json({ ok: true, message: "Enquiry received." });
    }

    // 4. Sanitize strings before dispatch
    const cleanName = sanitize(data.name);
    const cleanEmail = data.email.toLowerCase();
    const cleanCompany = data.company ? sanitize(data.company) : "—";
    const cleanPhone = data.phone ? sanitize(data.phone) : "—";
    const cleanInterest = sanitize(data.interest);
    const cleanMessage = sanitize(data.message);

    // 5. Send team notification and sender auto-confirmation via Resend
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.PRAN_TEAM_EMAIL || "contact@pranapp.in";
    const from = process.env.PRAN_FROM_EMAIL || "PRAN <onboarding@resend.dev>";

    if (apiKey) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(apiKey);

        // Internal team notification
        await resend.emails.send({
          from,
          to,
          replyTo: cleanEmail,
          subject: `[PRAN Enquiry] ${cleanInterest} — ${cleanName}`,
          text: [
            `Name: ${cleanName}`,
            `Email: ${cleanEmail}`,
            `Company: ${cleanCompany}`,
            `Phone: ${cleanPhone}`,
            `Interest: ${cleanInterest}`,
            `IP: ${ip}`,
            "",
            cleanMessage,
          ].join("\n"),
        }).catch((err) => console.error("[contact] internal notification error:", err));

        // Auto-reply confirmation to sender
        await resend.emails.send({
          from,
          to: cleanEmail,
          subject: "We've received your enquiry — PRAN",
          text: [
            `Hi ${cleanName},`,
            "",
            `Thank you for contacting PRAN. We have received your enquiry regarding ${cleanInterest} and our team will get back to you.`,
            "",
            "Your message:",
            `"${cleanMessage}"`,
            "",
            "Best regards,",
            "PRAN Global Team",
            "https://pranglobal.com",
          ].join("\n"),
        }).catch((err) => console.error("[contact] user confirmation error:", err));
      } catch (err) {
        console.error("[contact] Resend error:", err);
      }
    } else {
      console.info("[contact] Submission received (Resend API key not configured):", {
        cleanName,
        cleanEmail,
        cleanInterest,
      });
    }

    return NextResponse.json({
      ok: true,
      message: `Thank you, ${cleanName}! Your enquiry has been received. Our team will be in touch.`,
    });
  } catch (error: any) {
    console.error("[contact] Server exception:", error);
    return NextResponse.json({ ok: false, error: "An unexpected error occurred. Please try again." }, { status: 500 });
  }
}
