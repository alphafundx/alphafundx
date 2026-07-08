import { z } from "zod/v4";

export const createPackageSchema = z.object({
  name: z.string().min(2, "Package name is required"),
  accountSize: z.number().positive("Account size must be positive"),
  description: z.string().optional().or(z.literal("")),
  features: z.array(z.string()).default([]),
  rules: z.array(z.string()).default([]),
  originalPrice: z.number().positive("Price must be positive"),
  discountedPrice: z.number().positive("Discounted price must be positive").optional(),
  discountPercentage: z.number().min(0).max(100).default(0),
  isActive: z.boolean().default(true),
  isPopular: z.boolean().default(false),
  displayOrder: z.number().int().default(0),
  currency: z.string().default("USD"),
});

export const updatePackageSchema = createPackageSchema.partial();

export type CreatePackageInput = z.infer<typeof createPackageSchema>;
export type UpdatePackageInput = z.infer<typeof updatePackageSchema>;
