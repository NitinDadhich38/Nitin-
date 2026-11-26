import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { checkRateLimit } from "@/lib/rate-limit";

// Rate limit configurations from env or defaults
const RATE_LIMIT_AUTH_RPM = parseInt(process.env.RATE_LIMIT_AUTH_RPM || "10", 10);
const RATE_LIMIT_API_RPM = parseInt(process.env.RATE_LIMIT_API_RPM || "30", 10);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Client IP detection for rate-limiting
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

  // 2. Rate-limiting for API endpoints
  if (pathname.startsWith("/api/")) {
    const isAuthEndpoint =
      pathname.startsWith("/api/auth/") ||
      pathname.startsWith("/api/login") ||
      pathname.startsWith("/api/register");
    const limit = isAuthEndpoint ? RATE_LIMIT_AUTH_RPM : RATE_LIMIT_API_RPM;
    const key = `${isAuthEndpoint ? "auth" : "api"}:${ip}`;

    const rateResult = checkRateLimit(key, limit, 60);

    if (!rateResult.success) {
      return new NextResponse(
        JSON.stringify({
          error: "Too many requests. Please slow down and try again later.",
          retryAfter: rateResult.resetInSeconds,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": rateResult.resetInSeconds.toString(),
            "X-RateLimit-Limit": rateResult.limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateResult.resetInSeconds.toString(),
          },
        }
      );
    }
  }

  // 3. Update Supabase session
  const { supabaseResponse, user, supabase } = await updateSession(request);

  // 4. Protected route checks
  if (pathname.startsWith("/admin")) {
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // Verify admin role strictly at edge
    if (supabase) {
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (!profile || profile.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  } else if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/onboarding")
  ) {
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 5. Auth pages redirect if already logged in
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password";

  if (isAuthPage && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 6. Security & CORS headers on API responses
  if (pathname.startsWith("/api/")) {
    const origin = request.headers.get("origin");
    const allowedOrigin = origin || request.nextUrl.origin;
    supabaseResponse.headers.set("Access-Control-Allow-Origin", allowedOrigin);
    supabaseResponse.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    supabaseResponse.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    supabaseResponse.headers.set("Access-Control-Allow-Credentials", "true");

    if (request.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: supabaseResponse.headers,
      });
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, icons, and static assets in public/
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|woff|woff2|ico)$).*)",
  ],
};
