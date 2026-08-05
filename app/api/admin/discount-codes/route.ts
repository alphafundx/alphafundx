import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/api-auth";
import { z } from "zod";

const createSchema = z.object({
  code: z.string().min(2).max(30).transform((v) => v.toUpperCase().trim()),
  type: z.enum(["PERCENTAGE", "FIXED"]),
  value: z.number().positive(),
  maxUses: z.number().int().positive().nullable().optional(),
  minOrderAmount: z.number().positive().nullable().optional(),
  expiresAt: z.string().nullable().optional(),
  isActive: z.boolean().optional().default(true),
  applicablePackageIds: z.array(z.string()).optional().default([]),
});

// GET /api/admin/discount-codes — List all discount codes
export async function GET() {
  const { response } = await getAdminSession();
  if (response) return response;

  try {
    const codes = await prisma.discountCode.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { orders: true } } },
    });
    return NextResponse.json(codes);
  } catch (error) {
    console.error("GET /api/admin/discount-codes error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admin/discount-codes — Create a new discount code
export async function POST(request: Request) {
  const { response } = await getAdminSession();
  if (response) return response;

  try {
    const body = await request.json();
    const parsed = createSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { code, type, value, maxUses, minOrderAmount, expiresAt, isActive, applicablePackageIds } = parsed.data;

    // Check for duplicate code
    const existing = await prisma.discountCode.findUnique({ where: { code } });
    if (existing) {
      return NextResponse.json({ error: "A discount code with this name already exists" }, { status: 409 });
    }

    // Validate percentage range
    if (type === "PERCENTAGE" && value > 100) {
      return NextResponse.json({ error: "Percentage cannot exceed 100%" }, { status: 400 });
    }

    const discountCode = await prisma.discountCode.create({
      data: {
        code,
        type,
        value,
        maxUses: maxUses ?? null,
        minOrderAmount: minOrderAmount ?? null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        isActive,
        applicablePackageIds,
      },
    });

    return NextResponse.json(discountCode, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/discount-codes error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH /api/admin/discount-codes — Update a discount code
export async function PATCH(request: Request) {
  const { response } = await getAdminSession();
  if (response) return response;

  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // If code is being updated, uppercase it
    if (updates.code) {
      updates.code = updates.code.toUpperCase().trim();
    }

    // Parse expiresAt
    if (updates.expiresAt === "") {
      updates.expiresAt = null;
    } else if (updates.expiresAt) {
      updates.expiresAt = new Date(updates.expiresAt);
    }

    const updated = await prisma.discountCode.update({
      where: { id },
      data: updates,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/admin/discount-codes error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/admin/discount-codes — Delete a discount code
export async function DELETE(request: Request) {
  const { response } = await getAdminSession();
  if (response) return response;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.discountCode.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/discount-codes error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
