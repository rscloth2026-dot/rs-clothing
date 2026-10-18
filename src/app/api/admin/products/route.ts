import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
    }

    const products = await prisma.product.findMany({
      include: {
        category: true,
        images: true,
        variants: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const {
      title,
      slug,
      description,
      fabricDetails,
      fit,
      basePrice,
      comparePrice,
      categoryId,
      imageUrl,
      variants,
    } = body;

    const newProduct = await prisma.product.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        description,
        fabricDetails,
        fit: fit || "Oversized",
        basePrice: parseInt(basePrice),
        comparePrice: comparePrice ? parseInt(comparePrice) : null,
        categoryId,
        status: "PUBLISHED",
        images: {
          create: [
            {
              url: imageUrl || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000",
              isPrimary: true,
              altText: title,
              displayOrder: 0,
            },
          ],
        },
        variants: {
          create: variants && variants.length > 0 ? variants : [
            { sku: `RS-${Date.now()}-M`, size: "M", color: "Onyx Black", colorHex: "#111111", stockQuantity: 20 },
            { sku: `RS-${Date.now()}-L`, size: "L", color: "Onyx Black", colorHex: "#111111", stockQuantity: 25 },
            { sku: `RS-${Date.now()}-XL`, size: "XL", color: "Onyx Black", colorHex: "#111111", stockQuantity: 15 },
          ],
        },
      },
      include: {
        images: true,
        variants: true,
      },
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error: any) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: error.message || "Failed to create product" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const { id, basePrice, comparePrice, status, variantStock } = body;

    if (id) {
      const updateData: any = {};
      if (basePrice !== undefined) updateData.basePrice = parseInt(basePrice);
      if (comparePrice !== undefined) updateData.comparePrice = comparePrice ? parseInt(comparePrice) : null;
      if (status !== undefined) updateData.status = status;

      await prisma.product.update({
        where: { id },
        data: updateData,
      });
    }

    if (variantStock && variantStock.variantId) {
      await prisma.variant.update({
        where: { id: variantStock.variantId },
        data: { stockQuantity: parseInt(variantStock.quantity) },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update" }, { status: 500 });
  }
}
