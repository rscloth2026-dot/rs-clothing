import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, couponCode } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    // Calculate subtotal server-side
    let calculatedSubtotal = 0;
    for (const item of items) {
      const variant = await prisma.variant.findUnique({
        where: { id: item.variantId },
        include: { product: true },
      });
      if (!variant) {
        return NextResponse.json({ error: "Item not found" }, { status: 400 });
      }
      if (variant.stockQuantity < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${variant.product.title} (Size: ${variant.size}). Only ${variant.stockQuantity} units remaining.` },
          { status: 400 }
        );
      }
      calculatedSubtotal += (variant.product.basePrice + variant.additionalPrice) * item.quantity;
    }

    // Coupon discount
    let discount = 0;
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.trim().toUpperCase() },
      });
      if (coupon && coupon.isActive && calculatedSubtotal >= coupon.minOrderValue) {
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
    const finalAmount = Math.max(1, calculatedSubtotal - discount + shippingFee);

    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    let razorpayOrderId = `order_mock_${Date.now()}`;

    // If live credentials are provided, call Razorpay Orders API
    if (razorpayKeyId && razorpayKeySecret) {
      try {
        const auth = Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString("base64");
        const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: finalAmount * 100, // in paise
            currency: "INR",
            receipt: `rcpt_${Date.now().toString().slice(-6)}`,
          }),
        });

        if (rzpRes.ok) {
          const rzpData = await rzpRes.json();
          razorpayOrderId = rzpData.id;
        }
      } catch (err) {
        console.warn("Using sandbox mode fallback for Razorpay:", err);
      }
    }

    return NextResponse.json({
      success: true,
      orderId: razorpayOrderId,
      amount: finalAmount * 100, // paise
      currency: "INR",
      keyId: razorpayKeyId || "rzp_test_mock_rs_2026",
      isMock: !razorpayKeyId,
      finalAmount,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json({ error: "Failed to initiate Razorpay payment" }, { status: 500 });
  }
}
