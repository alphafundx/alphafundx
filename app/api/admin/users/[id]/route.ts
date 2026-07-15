import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/api-auth";

// GET /api/admin/users/[id] — Get user details with packages
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { response } = await getAdminSession();
  if (response) return response;

  const { id } = await params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        telegramUsername: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        userPackages: {
          include: {
            package: {
              select: { name: true, accountSize: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        orders: {
          orderBy: { createdAt: "desc" },
          take: 10,
          include: {
            package: { select: { name: true } },
          },
        },
        withdrawals: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("GET /api/admin/users/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
