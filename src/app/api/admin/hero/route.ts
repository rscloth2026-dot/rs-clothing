import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    // 1. Fetch store setting for hero garments
    const heroSetting = await prisma.storeSetting.findUnique({
      where: { key: "hero_floating_garments_v1" },
    });

    let garments = null;
    if (heroSetting?.value) {
      try {
        garments = JSON.parse(heroSetting.value);
      } catch (e) {
        // Invalid JSON, fall through
      }
    }

    // 2. Fetch all products so the admin can link any existing product
    const products = await prisma.product.findMany({
      where: { status: "PUBLISHED" },
      include: {
        category: true,
        images: { orderBy: { displayOrder: "asc" }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
    });

    const formattedProducts = products.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      basePrice: p.basePrice,
      comparePrice: p.comparePrice,
      categoryName: p.category.name,
      imageUrl: p.images[0]?.url || "/placeholder.jpg",
    }));

    return NextResponse.json({
      success: true,
      garments,
      products: formattedProducts,
    });
  } catch (error: any) {
    console.error("Fetch hero settings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { garments } = body;

    if (!Array.isArray(garments)) {
      return NextResponse.json(
        { error: "Invalid payload: garments array expected" },
        { status: 400 }
      );
    }

    // Persist to StoreSetting in database
    await prisma.storeSetting.upsert({
      where: { key: "hero_floating_garments_v1" },
      update: { value: JSON.stringify(garments) },
      create: {
        key: "hero_floating_garments_v1",
        value: JSON.stringify(garments),
      },
    });

    // Record in AuditLog
    await prisma.auditLog.create({
      data: {
        action: "HERO_FLOATING_GARMENTS_UPDATED",
        entity: "StoreSetting",
        performedBy: user.email,
        details: `Updated ${garments.length} floating hero garments configuration`,
      },
    });

    return NextResponse.json({ success: true, count: garments.length });
  } catch (error: any) {
    console.error("Save hero settings error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update hero settings" },
      { status: 500 }
    );
  }
}
