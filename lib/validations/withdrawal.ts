import { z } from "zod/v4";

export const createWithdrawalSchema = z.object({
  userPackageId: z.string().min(1, "Please select a package"),
  amount: z.number().positive("Amount must be greater than 0"),
  paymentMethod: z.enum(["CRYPTO_BTC", "CRYPTO_USDT", "BANK_TRANSFER", "PAYPAL"], {
    error: "Please select a payment method",
  }),
  paymentDetails: z.object({
    walletAddress: z.string().optional(),
    bankName: z.string().optional(),
    accountNumber: z.string().optional(),
    routingNumber: z.string().optional(),
    paypalEmail: z.string().optional(),
    network: z.string().optional(),
  }),
});

export const adminUpdateWithdrawalSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED", "PAID"]),
  adminNote: z.string().optional().or(z.literal("")),
});

export type CreateWithdrawalInput = z.infer<typeof createWithdrawalSchema>;
export type AdminUpdateWithdrawalInput = z.infer<typeof adminUpdateWithdrawalSchema>;
