import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await prisma.storeSetting.findMany();
    const settingsMap: Record<string, string> = {
      site_name: "RS Clothing",
      brand_tagline: "Marwar Atelier // Jodhpur",
      instagram: "https://instagram.com/rsclothing.jodhpur",
      whatsapp: "+91 98765 43210",
      youtube: "https://youtube.com/@rsclothing",
      twitter: "https://x.com/rsclothing",
      facebook: "https://facebook.com/rsclothing.jodhpur",
      pinterest: "https://pinterest.com/rsclothing",
      support_email: "concierge@rsclothing.in",
      phone: "+91 98765 43210",
      address: "RS Atelier, Circuit House Road, Ratanada, Jodhpur 342001, Rajasthan, India",
    };

    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    return NextResponse.json({ settings: settingsMap });
  } catch (error: any) {
    return NextResponse.json(
      {
        settings: {
          site_name: "RS Clothing",
          brand_tagline: "Marwar Atelier // Jodhpur",
          instagram: "https://instagram.com/rsclothing.jodhpur",
          whatsapp: "+91 98765 43210",
          youtube: "https://youtube.com/@rsclothing",
          twitter: "https://x.com/rsclothing",
          facebook: "https://facebook.com/rsclothing.jodhpur",
          pinterest: "https://pinterest.com/rsclothing",
          support_email: "concierge@rsclothing.in",
          phone: "+91 98765 43210",
        },
      },
      { status: 200 }
    );
  }
}
