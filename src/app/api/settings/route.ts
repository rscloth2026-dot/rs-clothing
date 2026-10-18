import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await prisma.storeSetting.findMany();
    const settingsMap: Record<string, string> = {
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

    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    return NextResponse.json({ settings: settingsMap });
  } catch (error: any) {
    return NextResponse.json(
      {
        settings: {
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
        },
      },
      { status: 200 }
    );
  }
}
