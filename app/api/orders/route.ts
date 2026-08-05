import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/api-auth";
import { sendTelegramNotification } from "@/lib/telegram";

// POST /api/orders — Create a new order with payment screenshot
export async function POST(request: Request) {
  const { user, response } = await getAuthSession();
  if (response) return response;

  try {
    const body = await request.json();
    const { packageId, paymentMethod, paymentReference, paymentScreenshot, discountCodeId, discountAmount } = body;

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

    let amount = pkg.discountedPrice ?? pkg.originalPrice;
    let validDiscountCodeId: string | null = null;
    let validDiscountAmount: number = 0;

    // Validate and apply discount code if provided
    if (discountCodeId) {
      const discountCode = await prisma.discountCode.findUnique({
        where: { id: discountCodeId },
      });

      if (discountCode && discountCode.isActive) {
        // Check expiry
        const notExpired = !discountCode.expiresAt || new Date(discountCode.expiresAt) >= new Date();
        // Check usage limit
        const notMaxed = discountCode.maxUses === null || discountCode.currentUses < discountCode.maxUses;
        // Check min order amount
        const meetsMin = !discountCode.minOrderAmount || amount >= discountCode.minOrderAmount;
        // Check package eligibility
        const applicableIds = discountCode.applicablePackageIds as string[];
        const validForPackage = !applicableIds || applicableIds.length === 0 || applicableIds.includes(packageId);

        if (notExpired && notMaxed && meetsMin && validForPackage) {
          // Calculate the discount server-side (don't trust the client)
          if (discountCode.type === "PERCENTAGE") {
            validDiscountAmount = Math.round((amount * discountCode.value / 100) * 100) / 100;
          } else {
            validDiscountAmount = discountCode.value;
          }
          // Don't let discount exceed amount
          validDiscountAmount = Math.min(validDiscountAmount, amount);
          validDiscountCodeId = discountCode.id;

          // Apply the discount
          amount = Math.round((amount - validDiscountAmount) * 100) / 100;
          amount = Math.max(0, amount);

          // Increment usage count
          await prisma.discountCode.update({
            where: { id: discountCode.id },
            data: { currentUses: { increment: 1 } },
          });
        }
      }
    }

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
        discountCodeId: validDiscountCodeId,
        discountAmount: validDiscountAmount,
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
      const discountNote = validDiscountCodeId
        ? ` (Discount: -$${validDiscountAmount.toFixed(2)})`
        : "";
      await prisma.notification.createMany({
        data: admins.map((admin) => ({
          userId: admin.id,
          title: "New Payment Received",
          message: `${user!.name || user!.email} paid $${amount.toFixed(2)} for ${pkg.name} ($${(pkg.accountSize / 1000).toFixed(0)}K)${discountNote}. Please verify the payment screenshot and approve the order.`,
          type: "PACKAGE" as const,
        })),
      });
    }

    // Send Telegram notification to admin
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Build discount info line for Telegram
    let discountLine = "";
    if (validDiscountCodeId) {
      const dc = await prisma.discountCode.findUnique({ where: { id: validDiscountCodeId } });
      discountLine = `\n🏷️ <b>Discount:</b> ${dc?.code || "N/A"} (-$${validDiscountAmount.toFixed(2)})`;
    }

    await sendTelegramNotification({
      message: [
        `🚨 <b>NEW PAYMENT RECEIVED</b>`,
        ``,
        `👤 <b>User:</b> ${user!.name || "N/A"} (${user!.email})`,
        `📦 <b>Package:</b> ${pkg.name} ($${(pkg.accountSize / 1000).toFixed(0)}K)`,
        `💰 <b>Amount:</b> $${amount.toFixed(2)}`,
        `💳 <b>Method:</b> ${paymentMethod || "CRYPTO"}`,
        discountLine,
        ``,
        `🔗 <a href="${appUrl}/admin/orders">Review &amp; Approve in Dashboard</a>`,
      ].filter(Boolean).join("\n"),
      imageUrl: paymentScreenshot,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
