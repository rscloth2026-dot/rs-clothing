import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
    }

    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ coupons });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch coupons" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
    }

    const { code, description, discountType, discountValue, minOrderValue, maxDiscount } = await req.json();

    const coupon = await prisma.coupon.create({
      data: {
        code: code.trim().toUpperCase(),
        description,
        discountType: discountType || "PERCENTAGE",
        discountValue: parseInt(discountValue),
        minOrderValue: parseInt(minOrderValue || "0"),
        maxDiscount: maxDiscount ? parseInt(maxDiscount) : null,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, coupon });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create coupon" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
    }

    const { id, isActive } = await req.json();

    await prisma.coupon.update({
      where: { id },
      data: { isActive },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to toggle coupon" }, { status: 500 });
  }
}
