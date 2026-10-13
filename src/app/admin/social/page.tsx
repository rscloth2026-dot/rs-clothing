import React from "react";
import { prisma } from "@/lib/db";
import { SocialSettingsClient } from "./SocialSettingsClient";

export const dynamic = "force-dynamic";

export default async function AdminSocialSettingsPage() {
  const settings = await prisma.storeSetting.findMany();
  const settingsMap: Record<string, string> = {};
  settings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  return <SocialSettingsClient initialSettings={settingsMap} />;
}
