import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/api-auth";

// POST /api/orders — Create a new order
export async function POST(request: Request) {
  const { user, response } = await getAuthSession();
  if (response) return response;

  try {
    const body = await request.json();
    const { packageId, paymentMethod, paymentReference } = body;

    if (!packageId) {
      return NextResponse.json({ error: "Package ID is required" }, { status: 400 });
    }

    const pkg = await prisma.package.findUnique({
      where: { id: packageId },
    });

    if (!pkg || !pkg.isActive) {
      return NextResponse.json({ error: "Package not found or inactive" }, { status: 404 });
    }

    const amount = pkg.discountedPrice ?? pkg.originalPrice;

    const order = await prisma.order.create({
      data: {
        userId: user!.id,
        packageId,
        amount,
        paymentMethod: paymentMethod || "CRYPTO",
        paymentReference: paymentReference || null,
        status: "PENDING",
      },
      include: {
        package: {
          select: { name: true, accountSize: true },
        },
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
