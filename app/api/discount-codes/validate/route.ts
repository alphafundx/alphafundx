import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/discount-codes/validate — Validate a discount code (user-facing)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, orderAmount, packageId } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Discount code is required" }, { status: 400 });
    }

    const discountCode = await prisma.discountCode.findUnique({
      where: { code: code.toUpperCase().trim() },
    });

    if (!discountCode) {
      return NextResponse.json({ error: "Invalid discount code" }, { status: 404 });
    }

    if (!discountCode.isActive) {
      return NextResponse.json({ error: "This discount code is no longer active" }, { status: 400 });
    }

    // Check expiry
    if (discountCode.expiresAt && new Date(discountCode.expiresAt) < new Date()) {
      return NextResponse.json({ error: "This discount code has expired" }, { status: 400 });
    }

    // Check usage limit
    if (discountCode.maxUses !== null && discountCode.currentUses >= discountCode.maxUses) {
      return NextResponse.json({ error: "This discount code has reached its usage limit" }, { status: 400 });
    }

    // Check minimum order amount
    if (discountCode.minOrderAmount && orderAmount && orderAmount < discountCode.minOrderAmount) {
      return NextResponse.json(
        { error: `Minimum order amount for this code is $${discountCode.minOrderAmount.toFixed(2)}` },
        { status: 400 }
      );
    }

    // Check package eligibility
    const applicableIds = discountCode.applicablePackageIds as string[];
    if (applicableIds && applicableIds.length > 0 && packageId) {
      if (!applicableIds.includes(packageId)) {
        return NextResponse.json(
          { error: "This discount code is not valid for the selected package" },
          { status: 400 }
        );
      }
    }

    // Calculate discount
    let discountAmount = 0;
    if (discountCode.type === "PERCENTAGE") {
      discountAmount = orderAmount ? (orderAmount * discountCode.value) / 100 : 0;
    } else {
      discountAmount = discountCode.value;
    }

    // Don't let discount exceed order amount
    if (orderAmount && discountAmount > orderAmount) {
      discountAmount = orderAmount;
    }

    return NextResponse.json({
      valid: true,
      code: discountCode.code,
      id: discountCode.id,
      type: discountCode.type,
      value: discountCode.value,
      discountAmount: Math.round(discountAmount * 100) / 100,
    });
  } catch (error) {
    console.error("POST /api/discount-codes/validate error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
