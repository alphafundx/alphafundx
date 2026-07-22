import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/packages — List active packages (public)
export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        accountSize: true,
        description: true,
        features: true,
        rules: true,
        originalPrice: true,
        discountedPrice: true,
        discountPercentage: true,
        isPopular: true,
        currency: true,
      },
    });

    return NextResponse.json(packages);
  } catch (error) {
    console.error("GET /api/packages error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
