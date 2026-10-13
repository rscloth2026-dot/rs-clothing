import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const customer = body.customer || {};
    const customerName = body.customerName || customer.fullName;
    const customerEmail = body.customerEmail || customer.email;
    const customerPhone = body.customerPhone || customer.phone;
    const address = body.address || {
      fullName: customerName,
      phone: customerPhone,
      addressLine1: customer.addressLine1 || "",
      landmark: customer.landmark || "",
      city: customer.city || "",
      state: customer.state || "",
      pincode: customer.pincode || "",
    };
    const items = body.items;
    const couponCode = body.couponCode;

    if (!customerName || !customerEmail || !customerPhone || !items || items.length === 0) {
      return NextResponse.json({ error: "Missing required order information" }, { status: 400 });
    }

    if (!address.addressLine1?.trim() || !address.city?.trim() || !address.state?.trim() || !address.pincode?.trim()) {
      return NextResponse.json(
        { error: "Complete shipping destination (address, city, state, and 6-digit PIN code) is required" },
        { status: 400 }
      );
    }

    // Verify variants and calculate total server-side
    let calculatedSubtotal = 0;
    const orderItemsData: any[] = [];

    for (const item of items) {
      const variant = await prisma.variant.findUnique({
        where: { id: item.variantId },
        include: { product: true },
      });

      if (!variant) {
        return NextResponse.json({ error: `Variant ${item.variantId} not found` }, { status: 400 });
      }

      if (variant.stockQuantity < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${variant.product.title} (Size: ${variant.size}). Only ${variant.stockQuantity} left.` },
          { status: 400 }
        );
      }

      const itemPrice = variant.product.basePrice + variant.additionalPrice;
      const itemSubtotal = itemPrice * item.quantity;
      calculatedSubtotal += itemSubtotal;

      orderItemsData.push({
        variantId: variant.id,
        productTitle: variant.product.title,
        variantSku: variant.sku,
        size: variant.size,
        color: variant.color,
        unitPrice: itemPrice,
        quantity: item.quantity,
        subtotal: itemSubtotal,
      });
    }

    // Calculate coupon discount
    let discount = 0;
    let couponToUpdate = null;

    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.trim().toUpperCase() },
      });

      if (coupon && coupon.isActive && calculatedSubtotal >= coupon.minOrderValue) {
        couponToUpdate = coupon;
        if (coupon.discountType === "PERCENTAGE") {
          discount = Math.round((calculatedSubtotal * coupon.discountValue) / 100);
          if (coupon.maxDiscount && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
          }
        } else {
          discount = Math.min(coupon.discountValue, calculatedSubtotal);
        }
      }
    }

    const shippingFee = calculatedSubtotal >= 999 ? 0 : 99;
    const totalAmount = Math.max(0, calculatedSubtotal - discount + shippingFee);

    // Generate unique order number
    const orderNumber = `RS-COD-${Date.now().toString().slice(-6)}`;

    // Execute atomic order creation and stock decrement
    const createdOrder = await prisma.$transaction(async (tx) => {
      // 1. Create order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          customerName,
          customerEmail,
          customerPhone,
          shippingAddress: JSON.stringify(address),
          paymentMethod: "COD",
          paymentStatus: "PENDING",
          fulfillmentStatus: "PROCESSING",
          subtotal: calculatedSubtotal,
          discount,
          shippingFee,
          totalAmount,
          trackingNumber: `BD-COD-${Math.floor(100000 + Math.random() * 900000)}`,
          items: {
            create: orderItemsData,
          },
        },
      });

      // 2. Decrement stock
      for (const item of items) {
        await tx.variant.update({
          where: { id: item.variantId },
          data: {
            stockQuantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      // 3. Update coupon usage
      if (couponToUpdate) {
        await tx.coupon.update({
          where: { id: couponToUpdate.id },
          data: {
            usageCount: {
              increment: 1,
            },
          },
        });
      }

      // 4. Log audit
      await tx.auditLog.create({
        data: {
          action: "ORDER_CREATED",
          entity: "Order",
          entityId: newOrder.id,
          performedBy: customerEmail,
          details: `COD Order placed for ${orderNumber} totaling ₹${totalAmount}`,
        },
      });

      return newOrder;
    });

    return NextResponse.json({
      success: true,
      orderId: createdOrder.id,
      orderNumber: createdOrder.orderNumber,
      totalAmount: createdOrder.totalAmount,
    });
  } catch (error) {
    console.error("COD Order Placement Error:", error);
    return NextResponse.json({ error: "Failed to place Cash on Delivery order" }, { status: 500 });
  }
}
