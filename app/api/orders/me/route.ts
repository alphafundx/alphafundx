import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/api-auth";

// GET /api/orders/me — Get current user's orders
export async function GET() {
  const { user, response } = await getAuthSession();
  if (response) return response;

  try {
    const orders = await prisma.order.findMany({
      where: { userId: user!.id },
      orderBy: { createdAt: "desc" },
      include: {
        package: {
          select: { name: true, accountSize: true },
        },
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("GET /api/orders/me error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
