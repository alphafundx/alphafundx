import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/api-auth";

// GET /api/admin/analytics — Dashboard statistics
export async function GET() {
  const { response } = await getAdminSession();
  if (response) return response;

  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      activeUsers,
      totalOrders,
      completedOrders,
      pendingWithdrawals,
      totalRevenue,
      totalPaidOut,
      recentUsers,
      recentOrders,
      monthlyRegistrations,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { status: "ACTIVE" } }),
      prisma.order.count(),
      prisma.order.count({ where: { status: "COMPLETED" } }),
      prisma.withdrawal.count({ where: { status: "PENDING" } }),
      prisma.order.aggregate({
        where: { status: "COMPLETED" },
        _sum: { amount: true },
      }),
      prisma.withdrawal.aggregate({
        where: { status: "PAID" },
        _sum: { amount: true },
      }),
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        include: {
          user: { select: { name: true, email: true } },
          package: { select: { name: true, accountSize: true } },
        },
      }),
      // Monthly registrations for the last 12 months
      prisma.$queryRaw`
        SELECT
          TO_CHAR(DATE_TRUNC('month', "createdAt"), 'Mon YYYY') as month,
          COUNT(*)::int as count
        FROM "User"
        WHERE "createdAt" >= ${new Date(now.getFullYear(), now.getMonth() - 11, 1)}
        GROUP BY DATE_TRUNC('month', "createdAt")
        ORDER BY DATE_TRUNC('month', "createdAt") ASC
      `,
    ]);

    return NextResponse.json({
      stats: {
        totalUsers,
        activeUsers,
        totalOrders,
        completedOrders,
        pendingWithdrawals,
        totalRevenue: totalRevenue._sum.amount || 0,
        totalPaidOut: totalPaidOut._sum.amount || 0,
      },
      recentUsers,
      recentOrders,
      monthlyRegistrations,
    });
  } catch (error) {
    console.error("GET /api/admin/analytics error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
