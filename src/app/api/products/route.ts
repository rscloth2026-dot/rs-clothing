import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const revalidate = 60; // Cache storefront product listing for 60 seconds

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const category = searchParams.get("category");

    const where: any = { status: "PUBLISHED" };
    if (slug) {
      where.slug = slug;
    }
    if (category) {
      where.category = { slug: category };
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        images: {
          orderBy: { displayOrder: "asc" },
        },
        variants: {
          orderBy: { size: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error: any) {
    console.error("Public products fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
