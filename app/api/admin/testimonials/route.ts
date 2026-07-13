import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/api-auth";
import { createTestimonialSchema, updateTestimonialSchema } from "@/lib/validations/cms";

// GET /api/admin/testimonials — List all testimonials
export async function GET() {
  const { response } = await getAdminSession();
  if (response) return response;

  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("GET /api/admin/testimonials error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admin/testimonials — Create a testimonial
export async function POST(request: Request) {
  const { response } = await getAdminSession();
  if (response) return response;

  try {
    const body = await request.json();
    const parsed = createTestimonialSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: parsed.data,
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/testimonials error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH /api/admin/testimonials — Update a testimonial (body: { testimonialId, ...data })
export async function PATCH(request: Request) {
  const { response } = await getAdminSession();
  if (response) return response;

  try {
    const body = await request.json();
    const { testimonialId, ...data } = body;

    if (!testimonialId) {
      return NextResponse.json({ error: "testimonialId is required" }, { status: 400 });
    }

    const parsed = updateTestimonialSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const updated = await prisma.testimonial.update({
      where: { id: testimonialId },
      data: parsed.data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/admin/testimonials error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/admin/testimonials — Delete a testimonial
export async function DELETE(request: Request) {
  const { response } = await getAdminSession();
  if (response) return response;

  try {
    const body = await request.json();
    const { testimonialId } = body;

    if (!testimonialId) {
      return NextResponse.json({ error: "testimonialId is required" }, { status: 400 });
    }

    await prisma.testimonial.delete({ where: { id: testimonialId } });

    return NextResponse.json({ success: true, message: "Testimonial deleted" });
  } catch (error) {
    console.error("DELETE /api/admin/testimonials error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
