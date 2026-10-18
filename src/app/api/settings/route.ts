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

// Known legacy default values from prior "RS Clothing" iteration
const LEGACY_BRAND_VALUES = new Set([
  "RS Clothing",
  "https://instagram.com/rsclothing",
  "https://youtube.com/@rsclothing",
  "https://x.com/rsclothing",
  "https://facebook.com/rsclothing",
  "https://pinterest.com/rsclothing",
  "concierge@rsclothing.in",
  "support@rsclothing.in",
]);

export async function GET() {
  try {
    const settings = await prisma.storeSetting.findMany();
    const settingsMap: Record<string, string> = { ...DEFAULT_SETTINGS };

    for (const s of settings) {
      // If the stored value is an old brand default, upgrade it to the new OnlyCollection default
      if (LEGACY_BRAND_VALUES.has(s.value)) {
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
