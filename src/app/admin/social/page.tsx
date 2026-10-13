import React from "react";
import { prisma } from "@/lib/db";
import { SocialSettingsClient } from "./SocialSettingsClient";

export const dynamic = "force-dynamic";

export default async function AdminSocialSettingsPage() {
  const settingsMap: Record<string, string> = {};
  
  try {
    if (prisma && "storeSetting" in prisma && (prisma as any).storeSetting) {
      const settings = await (prisma as any).storeSetting.findMany();
      settings.forEach((s: any) => {
        settingsMap[s.key] = s.value;
      });
    }
  } catch (error) {
    console.error("AdminSocialSettingsPage load error:", error);
  }

  return <SocialSettingsClient initialSettings={settingsMap} />;
}

