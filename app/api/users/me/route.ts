import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/api-auth";
import { updateProfileSchema } from "@/lib/validations/user";

// GET /api/users/me — Get current user profile
export async function GET() {
  const { user, response } = await getAuthSession();
  if (response) return response;

  try {
    const profile = await prisma.user.findUnique({
      where: { id: user!.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        role: true,
        status: true,
        telegramUsername: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("GET /api/users/me error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH /api/users/me — Update current user profile
export async function PATCH(request: Request) {
  const { user, response } = await getAuthSession();
  if (response) return response;

  try {
    const body = await request.json();
    const parsed = updateProfileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const updated = await prisma.user.update({
      where: { id: user!.id },
      data: parsed.data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        telegramUsername: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/users/me error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
