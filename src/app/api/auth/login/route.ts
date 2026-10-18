import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createSessionToken, AUTH_COOKIE_NAME } from "@/lib/auth";

// In-memory rate limiting map for brute-force protection
const loginAttempts = new Map<string, { count: number; resetTime: number }>();
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes

function recordFailedAttempt(ip: string, now: number) {
  const existing = loginAttempts.get(ip);
  if (!existing || now >= existing.resetTime) {
    loginAttempts.set(ip, { count: 1, resetTime: now + WINDOW_MS });
  } else {
    loginAttempts.set(ip, { count: existing.count + 1, resetTime: existing.resetTime });
  }
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "global";
    const now = Date.now();
    const rateData = loginAttempts.get(ip);

    if (rateData && now < rateData.resetTime && rateData.count >= MAX_ATTEMPTS) {
      const waitSeconds = Math.ceil((rateData.resetTime - now) / 1000);
      return NextResponse.json(
        { error: `Too many login attempts. Please wait ${waitSeconds}s before retrying.` },
        { status: 429 }
      );
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      recordFailedAttempt(ip, now);
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      recordFailedAttempt(ip, now);
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = createSessionToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
    });

    // Set secure HTTP-only cookie
    cookies().set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal login failure" }, { status: 500 });
  }
}
