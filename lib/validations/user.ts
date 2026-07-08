import { z } from "zod/v4";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional().or(z.literal("")),
  telegramUsername: z.string().optional().or(z.literal("")),
});

export const adminUpdateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.email("Please enter a valid email address").optional(),
  phone: z.string().optional().or(z.literal("")),
  role: z.enum(["USER", "ADMIN"]).optional(),
  status: z.enum(["ACTIVE", "SUSPENDED"]).optional(),
  telegramUsername: z.string().optional().or(z.literal("")),
});

export const adminUpdateBalanceSchema = z.object({
  currentBalance: z.number().min(0, "Balance cannot be negative"),
  currentProfit: z.number(),
  profitPercentage: z.number().min(0).max(100),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type AdminUpdateUserInput = z.infer<typeof adminUpdateUserSchema>;
export type AdminUpdateBalanceInput = z.infer<typeof adminUpdateBalanceSchema>;
