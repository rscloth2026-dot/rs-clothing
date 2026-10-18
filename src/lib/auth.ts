import { cookies } from "next/headers";
import { prisma } from "./db";

import * as crypto from "crypto";

export const AUTH_COOKIE_NAME = "rs_session";
const SESSION_SECRET = process.env.SESSION_SECRET || "rs_clothing_secret_key_2026_jwt_token_auth";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string | null;
}

function signPayload(payloadB64: string): string {
  return crypto.createHmac("sha256", SESSION_SECRET).update(payloadB64).digest("base64url");
}

/**
 * Creates a cryptographically signed HMAC-SHA256 session token
 */
export function createSessionToken(user: SessionUser): string {
  const payload = JSON.stringify({
    ...user,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  });
  const payloadB64 = Buffer.from(payload).toString("base64url");
  const signature = signPayload(payloadB64);
  return `${payloadB64}.${signature}`;
}

export function parseSessionToken(token: string): SessionUser | null {
  try {
    if (!token || typeof token !== "string") return null;
    const parts = token.split(".");
    if (parts.length !== 2) {
      return null;
    }

    const [payloadB64, signature] = parts;
    const expectedSignature = signPayload(payloadB64);

    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSignature);

    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    const json = Buffer.from(payloadB64, "base64url").toString("utf-8");
    const data = JSON.parse(json);
    if (!data.id || !data.role || (data.exp && data.exp < Date.now())) {
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
    };
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return parseSessionToken(token);
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    throw new Error("UNAUTHORIZED_ADMIN");
  }
  return user;
}
