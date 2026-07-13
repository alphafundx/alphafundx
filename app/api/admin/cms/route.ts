import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/api-auth";
import { updateCmsContentSchema } from "@/lib/validations/cms";

// GET /api/admin/cms — List all CMS content blocks
export async function GET() {
  const { response } = await getAdminSession();
  if (response) return response;

  try {
    const content = await prisma.cmsContent.findMany({
      orderBy: { key: "asc" },
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error("GET /api/admin/cms error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH /api/admin/cms — Update a CMS content block (body: { key, title?, content?, isActive? })
export async function PATCH(request: Request) {
  const { response } = await getAdminSession();
  if (response) return response;

  try {
    const body = await request.json();
    const { key, ...data } = body;

    if (!key) {
      return NextResponse.json({ error: "CMS key is required" }, { status: 400 });
    }

    const parsed = updateCmsContentSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const updated = await prisma.cmsContent.upsert({
      where: { key },
      create: {
        key,
        title: parsed.data.title || key,
        content: (parsed.data.content as object) || {},
        isActive: parsed.data.isActive ?? true,
      },
      update: {
        ...(parsed.data.title && { title: parsed.data.title }),
        ...(parsed.data.content && { content: parsed.data.content as object }),
        ...(parsed.data.isActive !== undefined && { isActive: parsed.data.isActive }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/admin/cms error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
