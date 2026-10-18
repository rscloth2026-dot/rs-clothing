import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const AUTH_COOKIE_NAME = "rs_session";

// Lightweight edge session payload extraction (detailed signature verification also executed in API handlers)
function getEdgeSessionUser(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const payloadB64 = parts[0];
    // Base64url decode
    const json = Buffer.from(payloadB64, "base64url").toString("utf-8");
    const data = JSON.parse(json);
    if (!data.id || !data.role || (data.exp && data.exp < Date.now())) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const user = sessionToken ? getEdgeSessionUser(sessionToken) : null;
  const isAdmin = user?.role === "ADMIN";

  // 1. Guard Admin Frontend Routes (/admin and /admin/*)
  if (pathname.startsWith("/admin")) {
    if (!isAdmin) {
      const loginUrl = new URL("/account", request.url);
      loginUrl.searchParams.set("error", "admin_clearance_required");
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Guard Admin API Endpoints (/api/admin/*)
  if (pathname.startsWith("/api/admin")) {
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Forbidden: Administrative clearance required." },
        { status: 403 }
      );
    }
  }

  // 3. Attach Essential Defensive Security Headers to Response
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
