import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/api-auth";
import { adminUpdateBalanceSchema } from "@/lib/validations/user";

// PATCH /api/admin/users/[id]/balance — Update user's balance/profit
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { response } = await getAdminSession();
  if (response) return response;

  const { id } = await params;

  try {
    const body = await request.json();
    const parsed = adminUpdateBalanceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { currentBalance, currentProfit, profitPercentage } = parsed.data;

    // Find the user's active package
    const userPackage = await prisma.userPackage.findFirst({
      where: { userId: id, status: "ACTIVE" },
    });

    if (!userPackage) {
      return NextResponse.json(
        { error: "No active package found for this user" },
        { status: 404 }
      );
    }

    const updated = await prisma.userPackage.update({
      where: { id: userPackage.id },
      data: { currentBalance, currentProfit, profitPercentage },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/admin/users/[id]/balance error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
