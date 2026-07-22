import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/settings/telegram — Public endpoint to get Telegram group info
export async function GET() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { key: "TELEGRAM_GROUP" },
    });

    if (!settings) {
      return NextResponse.json({
        groupLink: "",
        groupName: "VIP Trading Group",
      });
    }

    const value = settings.value as Record<string, string>;
    return NextResponse.json({
      groupLink: value.groupLink || "",
      groupName: value.groupName || "VIP Trading Group",
    });
  } catch (error) {
    console.error("GET /api/settings/telegram error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
