import { NextResponse } from "next/server";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/server";
import { logAuditEvent } from "@/lib/audit";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = forgotPasswordSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please enter a valid work email address." },
        { status: 400 }
      );
    }

    const { email } = result.data;
    const origin = new URL(request.url).origin;
    const supabase = createClient();

    // Request password reset email from Supabase Auth
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/api/auth/callback?next=/reset-password`,
    });

    if (error) {
      console.error("[Reset Password Supabase Error]", error.message);
    }

    await logAuditEvent({
      action: "PASSWORD_RESET",
      metadata: { email },
    });

    // Always return success to prevent email enumeration attacks
    return NextResponse.json({
      success: true,
      message:
        "If an account with that email exists, we've sent instructions to reset your password.",
    });
  } catch (error: any) {
    console.error("[Reset Password Error]", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
