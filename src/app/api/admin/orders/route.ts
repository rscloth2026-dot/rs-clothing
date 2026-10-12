import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
    }

    const { orderId, fulfillmentStatus, trackingNumber } = await req.json();

    const updateData: any = {};
    if (fulfillmentStatus) updateData.fulfillmentStatus = fulfillmentStatus;
    if (trackingNumber) updateData.trackingNumber = trackingNumber;

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
    });

    await prisma.auditLog.create({
      data: {
        action: "ORDER_STATUS_UPDATED",
        entity: "Order",
        entityId: orderId,
        performedBy: user.email,
        details: `Order status set to ${fulfillmentStatus}`,
      },
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update order" }, { status: 500 });
  }
}
