import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/settings/crypto — Public endpoint to get crypto wallet settings
export async function GET() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { key: "CRYPTO_PAYMENT" },
    });

    if (!settings) {
      return NextResponse.json({
        walletAddress: "",
        networkChain: "USDT (TRC20)",
      });
    }

    const value = settings.value as Record<string, string>;
    return NextResponse.json({
      walletAddress: value.walletAddress || "",
      networkChain: value.networkChain || "USDT (TRC20)",
    });
  } catch (error) {
    console.error("GET /api/settings/crypto error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
