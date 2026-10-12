import React from "react";
import { prisma } from "@/lib/db";
import { OrderManagerClient } from "./OrderManagerClient";

export const revalidate = 0;

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      items: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return <OrderManagerClient initialOrders={orders} />;
}
