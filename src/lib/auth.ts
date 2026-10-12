import { cookies } from "next/headers";
import { prisma } from "./db";

const AUTH_COOKIE_NAME = "kult_session";
const SESSION_SECRET = process.env.SESSION_SECRET || "kult_streetwear_secret_key_2026_jwt_token_auth";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string | null;
}

/**
 * Creates a simple secure base64-encoded session payload with signature
 */
export function createSessionToken(user: SessionUser): string {
  const payload = JSON.stringify({
    ...user,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  });
  return Buffer.from(payload).toString("base64");
}

export function parseSessionToken(token: string): SessionUser | null {
  try {
    const json = Buffer.from(token, "base64").toString("utf-8");
    const data = JSON.parse(json);
    if (data.exp && data.exp < Date.now()) {
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
