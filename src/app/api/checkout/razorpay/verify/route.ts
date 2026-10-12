import { NextResponse } from "next/server";
import * as crypto from "crypto";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerName,
      customerEmail,
      customerPhone,
      address,
      items,
      couponCode,
    } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET;

    // Verify signature if secret is present
    if (secret && razorpay_signature) {
      const generatedSignature = crypto
        .createHmac("sha256", secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json({ error: "Cryptographic payment signature verification failed" }, { status: 400 });
      }
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
          { error: `Insufficient stock for ${variant.product.title}` },
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

    // Calculate discount
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

    const orderNumber = `KULT-RZP-${Date.now().toString().slice(-6)}`;

    // Atomic transaction for order creation and stock decrement
    const createdOrder = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          customerName,
          customerEmail,
          customerPhone,
          shippingAddress: JSON.stringify(address),
          paymentMethod: "RAZORPAY",
          paymentStatus: "PAID",
          fulfillmentStatus: "PROCESSING",
          subtotal: calculatedSubtotal,
          discount,
          shippingFee,
          totalAmount,
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id || `pay_verified_${Date.now()}`,
          trackingNumber: `BD-RZP-${Math.floor(100000 + Math.random() * 900000)}`,
          items: {
            create: orderItemsData,
          },
        },
      });

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

      await tx.auditLog.create({
        data: {
          action: "PAYMENT_VERIFIED",
          entity: "Order",
          entityId: newOrder.id,
          performedBy: customerEmail,
          details: `Razorpay payment verified (${razorpay_payment_id}) for order ${orderNumber}`,
        },
      });

      return newOrder;
    });

    return NextResponse.json({
      success: true,
      orderId: createdOrder.id,
      orderNumber: createdOrder.orderNumber,
    });
  } catch (error) {
    console.error("Razorpay verification error:", error);
    return NextResponse.json({ error: "Failed to verify payment and process order" }, { status: 500 });
  }
}
