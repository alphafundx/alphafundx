import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/api-auth";
import { createWithdrawalSchema } from "@/lib/validations/withdrawal";
import { sendTelegramNotification } from "@/lib/telegram";

// GET /api/withdrawals — User's own withdrawals
export async function GET() {
  const { user, response } = await getAuthSession();
  if (response) return response;

  try {
    const withdrawals = await prisma.withdrawal.findMany({
      where: { userId: user!.id },
      orderBy: { createdAt: "desc" },
      include: {
        userPackage: {
          select: {
            package: {
              select: { name: true, accountSize: true },
            },
          },
        },
      },
    });

    return NextResponse.json(withdrawals);
  } catch (error) {
    console.error("GET /api/withdrawals error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/withdrawals — Create a withdrawal request
export async function POST(request: Request) {
  const { user, response } = await getAuthSession();
  if (response) return response;

  try {
    const body = await request.json();
    const parsed = createWithdrawalSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { userPackageId, amount, paymentMethod, paymentDetails } = parsed.data;

    // Verify the user package belongs to this user
    const userPkg = await prisma.userPackage.findFirst({
      where: { id: userPackageId, userId: user!.id, status: "ACTIVE" },
      include: {
        package: { select: { name: true, accountSize: true } },
      },
    });

    if (!userPkg) {
      return NextResponse.json({ error: "Active package not found" }, { status: 404 });
    }

    // Check if the user has enough profit to withdraw
    if (amount > userPkg.currentProfit) {
      return NextResponse.json(
        { error: "Withdrawal amount exceeds available profit" },
        { status: 400 }
      );
    }

    // Check for existing pending withdrawal
    const pendingWithdrawal = await prisma.withdrawal.findFirst({
      where: { userId: user!.id, userPackageId, status: "PENDING" },
    });

    if (pendingWithdrawal) {
      return NextResponse.json(
        { error: "You already have a pending withdrawal for this package" },
        { status: 400 }
      );
    }

    const withdrawal = await prisma.withdrawal.create({
      data: {
        userId: user!.id,
        userPackageId,
        amount,
        paymentMethod,
        paymentDetails: paymentDetails as object,
        status: "PENDING",
      },
    });

    // Get user details for the notification
    const userData = await prisma.user.findUnique({
      where: { id: user!.id },
      select: { name: true, email: true },
    });

    // Send Telegram notification to admin
    const detailsStr = paymentDetails
      ? Object.entries(paymentDetails as Record<string, string>)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n")
      : "N/A";

    sendTelegramNotification({
      message:
        `💸 <b>New Withdrawal Request</b>\n\n` +
        `👤 <b>User:</b> ${userData?.name || "Unknown"}\n` +
        `📧 <b>Email:</b> ${userData?.email || "N/A"}\n` +
        `📦 <b>Package:</b> ${userPkg.package.name} ($${userPkg.package.accountSize.toLocaleString()})\n` +
        `💰 <b>Amount:</b> $${amount.toFixed(2)}\n` +
        `🏦 <b>Method:</b> ${paymentMethod}\n` +
        `📋 <b>Payout Details:</b>\n${detailsStr}\n\n` +
        `⏳ Status: PENDING`,
    }).catch(() => {}); // Fire and forget

    return NextResponse.json(withdrawal, { status: 201 });
  } catch (error) {
    console.error("POST /api/withdrawals error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
