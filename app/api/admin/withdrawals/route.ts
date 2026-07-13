import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/api-auth";
import { adminUpdateWithdrawalSchema } from "@/lib/validations/withdrawal";

// GET /api/admin/withdrawals — List all withdrawals with filters
export async function GET(request: Request) {
  const { response } = await getAdminSession();
  if (response) return response;

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status") || "";

    const where: Record<string, unknown> = {};
    if (status && ["PENDING", "APPROVED", "REJECTED", "PAID"].includes(status)) {
      where.status = status;
    }

    const [withdrawals, total] = await Promise.all([
      prisma.withdrawal.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
          userPackage: {
            select: {
              package: { select: { name: true, accountSize: true } },
            },
          },
        },
      }),
      prisma.withdrawal.count({ where }),
    ]);

    return NextResponse.json({
      withdrawals,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/admin/withdrawals error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH /api/admin/withdrawals — Update withdrawal status (body: { withdrawalId, status, adminNote? })
export async function PATCH(request: Request) {
  const { user, response } = await getAdminSession();
  if (response) return response;

  try {
    const body = await request.json();
    const { withdrawalId, ...data } = body;

    if (!withdrawalId) {
      return NextResponse.json({ error: "withdrawalId is required" }, { status: 400 });
    }

    const parsed = adminUpdateWithdrawalSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const withdrawal = await prisma.withdrawal.findUnique({
      where: { id: withdrawalId },
    });

    if (!withdrawal) {
      return NextResponse.json({ error: "Withdrawal not found" }, { status: 404 });
    }

    const updated = await prisma.withdrawal.update({
      where: { id: withdrawalId },
      data: {
        status: parsed.data.status,
        adminNote: parsed.data.adminNote || null,
        processedBy: user!.id,
        processedAt: new Date(),
      },
    });

    // Create a notification for the user
    await prisma.notification.create({
      data: {
        userId: withdrawal.userId,
        title: `Withdrawal ${parsed.data.status.toLowerCase()}`,
        message: `Your withdrawal of $${withdrawal.amount.toLocaleString()} has been ${parsed.data.status.toLowerCase()}.${parsed.data.adminNote ? ` Note: ${parsed.data.adminNote}` : ""}`,
        type: "WITHDRAWAL",
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/admin/withdrawals error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
