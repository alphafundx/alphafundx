import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/stats — Public homepage statistics
export async function GET() {
  try {
    const [activeTestimonials, cmsStats] = await Promise.all([
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
      prisma.cmsContent.findUnique({
        where: { key: "stats" },
      }),
    ]);

    const statsContent = cmsStats?.content as Record<string, string> | null;

    // Use CMS values directly — the admin controls exactly what appears
    return NextResponse.json({
      stats: {
        fundedTraders: statsContent?.stat1 || "10,000+",
        fundedTradersLabel: statsContent?.stat1_label || "Funded Traders",
        capitalFunded: statsContent?.stat2 || "$5M+",
        capitalFundedLabel: statsContent?.stat2_label || "Capital Funded",
        profitSplit: statsContent?.stat3 || "Up to 90%",
        profitSplitLabel: statsContent?.stat3_label || "Profit Split",
        countries: statsContent?.stat4 || "150+",
        countriesLabel: statsContent?.stat4_label || "Countries",
      },
      testimonials: activeTestimonials,
    });
  } catch (error) {
    console.error("GET /api/stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
