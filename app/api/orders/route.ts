import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/api-auth";

// POST /api/orders — Create a new order with payment screenshot
export async function POST(request: Request) {
  const { user, response } = await getAuthSession();
  if (response) return response;

  try {
    const body = await request.json();
    const { packageId, paymentMethod, paymentReference, paymentScreenshot } = body;

    if (!packageId) {
      return NextResponse.json({ error: "Package ID is required" }, { status: 400 });
    }

    if (!paymentScreenshot) {
      return NextResponse.json({ error: "Payment screenshot is required" }, { status: 400 });
    }

    const pkg = await prisma.package.findUnique({
      where: { id: packageId },
    });

    if (!pkg || !pkg.isActive) {
      return NextResponse.json({ error: "Package not found or inactive" }, { status: 404 });
    }

    const amount = pkg.discountedPrice ?? pkg.originalPrice;

    // Create the order
    const order = await prisma.order.create({
      data: {
        userId: user!.id,
        packageId,
        amount,
        paymentMethod: paymentMethod || "CRYPTO",
        paymentReference: paymentReference || null,
        paymentScreenshot,
        status: "PENDING",
      },
      include: {
        package: {
          select: { name: true, accountSize: true },
        },
      },
    });

    // Send notification to all admins
    const admins = await prisma.user.findMany({
      where: { role: "ADMIN" },
      select: { id: true },
    });

    if (admins.length > 0) {
      await prisma.notification.createMany({
        data: admins.map((admin) => ({
          userId: admin.id,
          title: "New Payment Received",
          message: `${user!.name || user!.email} paid $${amount.toFixed(2)} for ${pkg.name} ($${(pkg.accountSize / 1000).toFixed(0)}K). Please verify the payment screenshot and approve the order.`,
          type: "PACKAGE" as const,
        })),
      });
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
