import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/api-auth";
import { changePasswordSchema } from "@/lib/validations/auth";

// PATCH /api/users/me/password — Change password
export async function PATCH(request: Request) {
  const { user, response } = await getAuthSession();
  if (response) return response;

  try {
    const body = await request.json();
    const parsed = changePasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword } = parsed.data;

    const dbUser = await prisma.user.findUnique({
      where: { id: user!.id },
      select: { password: true },
    });

    if (!dbUser?.password) {
      return NextResponse.json({ error: "No password set" }, { status: 400 });
    }

    const isValid = await bcrypt.compare(currentPassword, dbUser.password);
    if (!isValid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: user!.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("PATCH /api/users/me/password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
