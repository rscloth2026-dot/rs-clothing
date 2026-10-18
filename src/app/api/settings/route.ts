import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

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
    const settings = await prisma.storeSetting.findMany();
    const settingsMap: Record<string, string> = { ...DEFAULT_SETTINGS };

    for (const s of settings) {
      // If the stored value is an old brand default, upgrade it to the new OnlyCollection default
      if (isLegacyBrandValue(s.value)) {
        if (DEFAULT_SETTINGS[s.key]) {
          settingsMap[s.key] = DEFAULT_SETTINGS[s.key];
          // Proactively migrate DB entry in background
          prisma.storeSetting
            .update({
              where: { key: s.key },
              data: { value: DEFAULT_SETTINGS[s.key] },
            })
            .catch(() => {});
        }
      } else {
        // Retain intentional user customization
        settingsMap[s.key] = s.value;
      }
    }

    return NextResponse.json({ settings: settingsMap });
  } catch (error: any) {
    return NextResponse.json(
      { settings: DEFAULT_SETTINGS },
      { status: 200 }
    );
  }
}
