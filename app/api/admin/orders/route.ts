import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/api-auth";

// GET /api/admin/orders — List all orders with filters and pagination
export async function GET(request: Request) {
  const { response } = await getAdminSession();
  if (response) return response;

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status") || "";
    const search = searchParams.get("search") || "";

    const where: Record<string, unknown> = {};

    if (status && ["PENDING", "COMPLETED", "CANCELLED"].includes(status)) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { user: { name: { contains: search, mode: "insensitive" } } },
        { user: { email: { contains: search, mode: "insensitive" } } },
      ];
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: { select: { id: true, name: true, email: true } },
          package: { select: { name: true, accountSize: true } },
        },
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/admin/orders error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH /api/admin/orders — Approve or reject an order
export async function PATCH(request: Request) {
  const { response } = await getAdminSession();
  if (response) return response;

  try {
    const body = await request.json();
    const { orderId, action } = body;

    if (!orderId || !["APPROVE", "REJECT"].includes(action)) {
      return NextResponse.json(
        { error: "orderId and action (APPROVE/REJECT) are required" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        package: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status !== "PENDING") {
      return NextResponse.json(
        { error: "Order has already been processed" },
        { status: 400 }
      );
    }

    if (action === "APPROVE") {
      // Update order to COMPLETED and create the UserPackage in a transaction
      const result = await prisma.$transaction(async (tx) => {
        const updatedOrder = await tx.order.update({
          where: { id: orderId },
          data: { status: "COMPLETED" },
        });

        const userPackage = await tx.userPackage.create({
          data: {
            userId: order.userId,
            packageId: order.packageId,
            orderId: order.id,
            status: "ACTIVE",
            currentBalance: order.package.accountSize,
            currentProfit: 0,
            profitPercentage: 0,
          },
        });

        // Notify the user
        await tx.notification.create({
          data: {
            userId: order.userId,
            title: "Package Activated! 🎉",
            message: `Your ${order.package.name} ($${(order.package.accountSize / 1000).toFixed(0)}K) package has been activated. You can now start trading!`,
            type: "SUCCESS",
          },
        });

        return { updatedOrder, userPackage };
      });

      return NextResponse.json({
        success: true,
        message: "Order approved and package activated",
        order: result.updatedOrder,
      });
    } else {
      // REJECT
      await prisma.$transaction(async (tx) => {
        await tx.order.update({
          where: { id: orderId },
          data: { status: "CANCELLED" },
        });

        // Notify the user
        await tx.notification.create({
          data: {
            userId: order.userId,
            title: "Payment Not Verified",
            message: `Your payment for ${order.package.name} ($${(order.package.accountSize / 1000).toFixed(0)}K) could not be verified. Please contact support if you believe this is an error.`,
            type: "WARNING",
          },
        });
      });

      return NextResponse.json({
        success: true,
        message: "Order rejected",
      });
    }
  } catch (error) {
    console.error("PATCH /api/admin/orders error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
