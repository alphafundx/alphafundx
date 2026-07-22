import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/settings/public — Get public site settings (general settings, social links & toggles)
export async function GET() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { key: "GENERAL_SETTINGS" },
    });

    if (!settings) {
      return NextResponse.json({
        contactEmail: "support@alphafundx.com",
        supportPhone: "+1 (555) 123-4567",
        twitterUrl: "https://twitter.com/alphafundx",
        twitterEnabled: true,
        discordUrl: "https://discord.gg/alphafundx",
        discordEnabled: true,
        telegramUrl: "https://t.me/alphafundx",
        telegramEnabled: true,
        instagramUrl: "https://instagram.com/alphafundx",
        instagramEnabled: true,
      });
    }

    return NextResponse.json(settings.value);
  } catch (error) {
    console.error("GET /api/settings/public error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
