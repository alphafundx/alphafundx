import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/api-auth";
import { createPackageSchema, updatePackageSchema } from "@/lib/validations/package";

// GET /api/admin/packages — List all packages (including inactive)
export async function GET() {
  const { response } = await getAdminSession();
  if (response) return response;

  try {
    const packages = await prisma.package.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        _count: { select: { orders: true, userPackages: true } },
      },
    });

    return NextResponse.json(packages);
  } catch (error) {
    console.error("GET /api/admin/packages error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admin/packages — Create a new package
export async function POST(request: Request) {
  const { response } = await getAdminSession();
  if (response) return response;

  try {
    const body = await request.json();
    const parsed = createPackageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const pkg = await prisma.package.create({
      data: {
        ...parsed.data,
        features: parsed.data.features as unknown as object,
        rules: parsed.data.rules as unknown as object,
      },
    });

    return NextResponse.json(pkg, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/packages error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH /api/admin/packages — Update a package (body: { packageId, ...data })
export async function PATCH(request: Request) {
  const { response } = await getAdminSession();
  if (response) return response;

  try {
    const body = await request.json();
    const { packageId, ...data } = body;

    if (!packageId) {
      return NextResponse.json({ error: "packageId is required" }, { status: 400 });
    }

    const parsed = updatePackageSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = { ...parsed.data };
    if (parsed.data.features) {
      updateData.features = parsed.data.features as unknown as object;
    }
    if (parsed.data.rules) {
      updateData.rules = parsed.data.rules as unknown as object;
    }

    const updated = await prisma.package.update({
      where: { id: packageId },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/admin/packages error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/admin/packages — Delete a package (body: { packageId })
export async function DELETE(request: Request) {
  const { response } = await getAdminSession();
  if (response) return response;

  try {
    const body = await request.json();
    const { packageId } = body;

    if (!packageId) {
      return NextResponse.json({ error: "packageId is required" }, { status: 400 });
    }

    // Check for existing orders before deleting
    const orderCount = await prisma.order.count({ where: { packageId } });
    if (orderCount > 0) {
      // Soft-delete: disable instead of hard-delete
      await prisma.package.update({
        where: { id: packageId },
        data: { isActive: false },
      });
      return NextResponse.json({
        success: true,
        message: "Package has existing orders and was disabled instead of deleted",
      });
    }

    await prisma.package.delete({ where: { id: packageId } });
    return NextResponse.json({ success: true, message: "Package deleted" });
  } catch (error) {
    console.error("DELETE /api/admin/packages error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
