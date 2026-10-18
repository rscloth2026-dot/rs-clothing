import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

const DEFAULT_SETTINGS: Record<string, string> = {
  site_name: "OnlyCollection",
  brand_tagline: "Haute Streetwear Atelier",
  instagram: "https://instagram.com/onlycollection",
  whatsapp: "+91 98765 43210",
  youtube: "https://youtube.com/@onlycollection",
  twitter: "https://x.com/onlycollection",
  facebook: "https://facebook.com/onlycollection",
  pinterest: "https://pinterest.com/onlycollection",
  support_email: "concierge@onlycollection.in",
  phone: "+91 98765 43210",
  address: "OnlyCollection Atelier, Circuit House Road, Ratanada, Jodhpur 342001, Rajasthan, India",
};

function isLegacyBrandValue(val: string): boolean {
  if (!val) return false;
  const lower = val.toLowerCase();
  return (
    lower.includes("rsclothing") ||
    lower.includes("rs clothing") ||
    lower.startsWith("rs atelier") ||
    val === "Marwar Atelier // Jodhpur"
  );
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
    }

    const settings = await prisma.storeSetting.findMany();
    const settingsMap: Record<string, string> = { ...DEFAULT_SETTINGS };
    settings.forEach((s) => {
      if (isLegacyBrandValue(s.value)) {
        if (DEFAULT_SETTINGS[s.key]) {
          settingsMap[s.key] = DEFAULT_SETTINGS[s.key];
        }
      } else {
        settingsMap[s.key] = s.value;
      }
    });

    return NextResponse.json({ settings: settingsMap });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
    }

    const { settings } = await req.json();
    if (!settings || typeof settings !== "object") {
      return NextResponse.json({ error: "Invalid settings payload" }, { status: 400 });
    }

    // Upsert each setting
    for (const [key, value] of Object.entries(settings)) {
      if (typeof value === "string") {
        await prisma.storeSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
    }

    await prisma.auditLog.create({
      data: {
        action: "STORE_SETTINGS_UPDATED",
        entity: "StoreSetting",
        performedBy: user.email,
        details: `Updated ${Object.keys(settings).length} store & social media settings`,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update settings" }, { status: 500 });
  }
}
