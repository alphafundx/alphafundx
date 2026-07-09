// ==========================================
// AlphaFundX Shared TypeScript Types
// ==========================================

import type {
  User,
  Package,
  Order,
  UserPackage,
  Withdrawal,
  Testimonial,
  CmsContent,
  SiteSettings,
  Notification,
  UserRole,
  UserStatus,
  OrderStatus,
  PackageStatus,
  WithdrawalStatus,
  NotificationType,
} from "@prisma/client";

// Re-export Prisma types
export type {
  User,
  Package,
  Order,
  UserPackage,
  Withdrawal,
  Testimonial,
  CmsContent,
  SiteSettings,
  Notification,
  UserRole,
  UserStatus,
  OrderStatus,
  PackageStatus,
  WithdrawalStatus,
  NotificationType,
};

// ==========================================
// API Response Types
// ==========================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = unknown> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ==========================================
// Auth Types
// ==========================================

export interface SessionUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: UserRole;
  status: UserStatus;
}

// ==========================================
// Dashboard Types
// ==========================================

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  packagesSold: number;
  totalRevenue: number;
  pendingWithdrawals: number;
  approvedWithdrawals: number;
  monthlyRegistrations: { month: string; count: number }[];
  revenueByMonth: { month: string; amount: number }[];
}

export interface UserDashboardData {
  user: Pick<User, "id" | "name" | "email" | "phone" | "telegramUsername" | "image" | "createdAt">;
  activePackage: (UserPackage & { package: Package }) | null;
  recentWithdrawals: Withdrawal[];
  notifications: Notification[];
}

// ==========================================
// Package Display Types
// ==========================================

export interface PackageCardData {
  id: string;
  name: string;
  accountSize: number;
  description: string | null;
  features: string[];
  originalPrice: number;
  discountedPrice: number | null;
  discountPercentage: number | null;
  isPopular: boolean;
  currency: string;
}

// ==========================================
// Navigation Types
// ==========================================

export interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: NavItem[];
}

export interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  isActive?: boolean;
}
