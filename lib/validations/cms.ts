import { z } from "zod/v4";

export const updateCmsContentSchema = z.object({
  title: z.string().optional(),
  content: z.record(z.string(), z.unknown()),
  isActive: z.boolean().optional(),
});

export const createTestimonialSchema = z.object({
  userName: z.string().min(2, "Name is required"),
  userImage: z.string().optional().or(z.literal("")),
  rating: z.number().int().min(1).max(5).default(5),
  content: z.string().min(10, "Review must be at least 10 characters"),
  isActive: z.boolean().default(true),
});

export const updateTestimonialSchema = createTestimonialSchema.partial();

export const updateSiteSettingsSchema = z.object({
  value: z.record(z.string(), z.unknown()),
});

export type UpdateCmsContentInput = z.infer<typeof updateCmsContentSchema>;
export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
export type UpdateSiteSettingsInput = z.infer<typeof updateSiteSettingsSchema>;
