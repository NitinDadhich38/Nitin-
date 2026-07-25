import { NextResponse } from "next/server";
import { z } from "zod";

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

  // Send a team notification via Resend when configured. Non-fatal if not.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.PRAN_TEAM_EMAIL;
  const from = process.env.PRAN_FROM_EMAIL ?? "PRAN <onboarding@resend.dev>";

  if (apiKey && to) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
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
      console.error("[contact] Resend failed:", err);
      // Still accept the submission; the founder can wire storage/retry later.
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
