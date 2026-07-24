import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/api-auth";

// GET /api/users/me/dashboard — User dashboard data
export async function GET() {
  const { response, user } = await getAuthSession();
  if (response) return response;

  try {
    // Get user's packages with package details
    const userPackages = await prisma.userPackage.findMany({
      where: { userId: user!.id },
      include: {
        package: {
          select: {
            name: true,
            accountSize: true,
            features: true,
            rules: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Get recent notifications
    const notifications = await prisma.notification.findMany({
      where: { userId: user!.id },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        message: true,
        type: true,
        isRead: true,
        createdAt: true,
      },
    });

    // Get withdrawal stats
    const withdrawalStats = await prisma.withdrawal.aggregate({
      where: { userId: user!.id, status: "PAID" },
      _sum: { amount: true },
      _count: true,
    });

    const pendingWithdrawals = await prisma.withdrawal.count({
      where: { userId: user!.id, status: "PENDING" },
    });

    // Compute totals from active packages
    const activePackages = userPackages.filter(
      (up) => up.status === "ACTIVE"
    );
    const totalBalance = activePackages.reduce(
      (sum, up) => sum + up.currentBalance,
      0
    );
    const totalProfit = activePackages.reduce(
      (sum, up) => sum + up.currentProfit,
      0
    );
    const avgProfitPercentage =
      activePackages.length > 0
        ? activePackages.reduce((sum, up) => sum + up.profitPercentage, 0) /
          activePackages.length
        : 0;

    // Get recent orders (payment history)
    const orders = await prisma.order.findMany({
      where: { userId: user!.id },
      orderBy: { createdAt: "desc" },
      include: {
        package: {
          select: { name: true, accountSize: true },
        },
      },
    });

    return NextResponse.json({
      packages: userPackages.map((up) => ({
        id: up.id,
        packageName: up.package.name,
        accountSize: up.package.accountSize,
        status: up.status,
        currentBalance: up.currentBalance,
        currentProfit: up.currentProfit,
        profitPercentage: up.profitPercentage,
        activatedAt: up.activatedAt,
        features: up.package.features,
        rules: up.package.rules,
      })),
      orders: orders.map((o) => ({
        id: o.id,
        packageName: o.package.name,
        accountSize: o.package.accountSize,
        amount: o.amount,
        status: o.status,
        paymentMethod: o.paymentMethod,
        createdAt: o.createdAt,
      })),
      stats: {
        totalBalance,
        totalProfit,
        avgProfitPercentage: Math.round(avgProfitPercentage * 10) / 10,
        activePackageCount: activePackages.length,
        totalWithdrawn: withdrawalStats._sum.amount || 0,
        pendingWithdrawals,
      },
      notifications,
    });
  } catch (error) {
    console.error("GET /api/users/me/dashboard error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
