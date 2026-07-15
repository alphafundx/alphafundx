import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/stats — Public homepage statistics
export async function GET() {
  try {
    const [
      totalUsers,
      totalPaidOut,
      totalRevenue,
      activeTestimonials,
    ] = await Promise.all([
      prisma.user.count({ where: { role: "USER" } }),
      prisma.withdrawal.aggregate({
        where: { status: "PAID" },
        _sum: { amount: true },
      }),
      prisma.order.aggregate({
        where: { status: "COMPLETED" },
        _sum: { amount: true },
      }),
      prisma.testimonial.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          userName: true,
          userImage: true,
          rating: true,
          content: true,
        },
      }),
    ]);

    // Try to get CMS stats override (admin can customize displayed stats)
    const cmsStats = await prisma.cmsContent.findUnique({
      where: { key: "stats" },
    });

    const statsContent = cmsStats?.content as Record<string, string> | null;

    return NextResponse.json({
      stats: {
        fundedTraders: statsContent?.funded_traders || `${totalUsers}+`,
        capitalFunded: statsContent?.capital_funded || `$${Math.round((totalRevenue._sum.amount || 0) / 1000)}K+`,
        profitSplit: statsContent?.profit_split || "Up to 80%",
        countries: statsContent?.countries || "150+",
      },
      testimonials: activeTestimonials,
    });
  } catch (error) {
    console.error("GET /api/stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
