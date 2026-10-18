import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and inquiry message are required" },
        { status: 400 }
      );
    }

    // Basic email format check
    if (!email.includes("@") || !email.includes(".")) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    // Record inquiry into audit log
    await prisma.auditLog.create({
      data: {
        action: "CLIENT_INQUIRY",
        entity: "Contact",
        entityId: email.trim().toLowerCase(),
        performedBy: name.trim(),
        details: JSON.stringify({
          subject: subject || "General Sizing & Sourcing Inquiry",
          message: message.trim(),
          receivedAt: new Date().toISOString(),
        }),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry received by OnlyCollection Concierge team. We will respond within 24 hours.",
    });
  } catch (error) {
    console.error("Contact inquiry submission error:", error);
    return NextResponse.json({ error: "Failed to dispatch concierge inquiry" }, { status: 500 });
  }
}
