import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    await prisma.newsletter.upsert({
      where: { email: email.toLowerCase().trim() },
      update: { isActive: true },
      create: { email: email.toLowerCase().trim() },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}
