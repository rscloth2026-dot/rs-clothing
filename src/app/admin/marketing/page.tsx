import React from "react";
import { prisma } from "@/lib/db";
import { MarketingManagerClient } from "./MarketingManagerClient";

export const revalidate = 0;

export default async function AdminMarketingPage() {
  const [coupons, subscribers] = await Promise.all([
    prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.newsletter.findMany({
      orderBy: { subscribedAt: "desc" },
    }),
  ]);

  return <MarketingManagerClient initialCoupons={coupons} subscribers={subscribers} />;
}
