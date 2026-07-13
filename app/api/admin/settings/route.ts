import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/api-auth";
import { updateSiteSettingsSchema } from "@/lib/validations/cms";

// GET /api/admin/settings — Get all site settings
export async function GET() {
  const { response } = await getAdminSession();
  if (response) return response;

  try {
    const settings = await prisma.siteSettings.findMany({
      orderBy: { key: "asc" },
    });

    // Flatten into a key-value map for convenience
    const settingsMap = settings.reduce(
      (acc, s) => ({ ...acc, [s.key]: s.value }),
      {} as Record<string, unknown>
    );

    return NextResponse.json(settingsMap);
  } catch (error) {
    console.error("GET /api/admin/settings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH /api/admin/settings — Update a site setting (body: { key, value })
export async function PATCH(request: Request) {
  const { response } = await getAdminSession();
  if (response) return response;

  try {
    const body = await request.json();
    const { key, ...rest } = body;

    if (!key) {
      return NextResponse.json({ error: "Setting key is required" }, { status: 400 });
    }

    const parsed = updateSiteSettingsSchema.safeParse(rest);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const updated = await prisma.siteSettings.upsert({
      where: { key },
      create: { key, value: parsed.data.value as object },
      update: { value: parsed.data.value as object },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/admin/settings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
