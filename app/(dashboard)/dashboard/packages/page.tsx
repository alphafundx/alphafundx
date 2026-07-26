"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import {
  Package,
  Loader2,
  CheckCircle,
  XCircle,
  TrendingUp,
  Clock,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

interface UserPackage {
  id: string;
  packageName: string;
  accountSize: number;
  status: string;
  currentBalance: number;
  currentProfit: number;
  profitPercentage: number;
  activatedAt: string;
  features: string[];
  rules: string[];
}

interface DashboardOrder {
  id: string;
  packageName: string;
  accountSize: number;
  amount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
}

const packageStatusBadge: Record<
  string,
  { bg: string; text: string; label: string; Icon: React.ElementType }
> = {
  ACTIVE: {
    bg: "bg-primary/10",
    text: "text-primary",
    label: "Active",
    Icon: CheckCircle,
  },
  BREACHED: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    label: "Breached",
    Icon: XCircle,
  },
  PASSED: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    label: "Passed",
    Icon: TrendingUp,
  },
  COMPLETED: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    label: "Completed",
    Icon: CheckCircle,
  },
};

const orderStatusBadge: Record<
  string,
  { bg: string; text: string; label: string; Icon: React.ElementType }
> = {
  PENDING: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
    label: "Processing",
    Icon: Clock,
  },
  COMPLETED: {
    bg: "bg-primary/10",
    text: "text-primary",
    label: "Approved",
    Icon: CheckCircle,
  },
  CANCELLED: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    label: "Rejected",
    Icon: XCircle,
  },
};

export default function UserPackagesPage() {
  const [packages, setPackages] = useState<UserPackage[]>([]);
  const [orders, setOrders] = useState<DashboardOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users/me/dashboard")
      .then((r) => r.json())
      .then((data) => {
        setPackages(data.packages || []);
        setOrders(data.orders || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <PageHeader title="My Packages" description="Loading..." />
        <div className="flex justify-center py-12">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  // Separate pending/rejected orders (not yet converted to a UserPackage)
  const pendingOrders = orders.filter((o) => o.status === "PENDING");
  const rejectedOrders = orders.filter((o) => o.status === "CANCELLED");
  const hasAnything =
    packages.length > 0 || pendingOrders.length > 0 || rejectedOrders.length > 0;

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Packages"
        description="View and manage your funded trading packages."
      />

      {!hasAnything ? (
        <div className="space-y-6">
          <EmptyState
            icon={Package}
            title="No packages yet"
            description="Purchase a funding package to start your trading journey."
          />
          <div className="text-center">
            <Link
              href="/#packages"
              className="inline-flex px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Browse Packages
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          {/* ===== Pending Orders (Processing) ===== */}
          {pendingOrders.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="size-5 text-yellow-400" />
                <h2 className="text-lg font-semibold text-foreground">
                  Payment Processing
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pendingOrders.map((order) => {
                  const badge = orderStatusBadge.PENDING;
                  const BadgeIcon = badge.Icon;
                  return (
                    <div
                      key={order.id}
                      className="rounded-xl border border-yellow-500/20 bg-card p-6 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-foreground">
                            {order.packageName}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}
                          >
                            <BadgeIcon className="size-3" />
                            {badge.label}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Account Size
                            </p>
                            <p className="text-base font-bold text-foreground">
                              ${order.accountSize.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Amount Paid
                            </p>
                            <p className="text-base font-bold text-foreground">
                              ${order.amount.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                          <AlertTriangle className="size-4 text-yellow-400 shrink-0" />
                          <p className="text-xs text-yellow-400/80">
                            Your payment proof has been submitted and is being
                            reviewed by our team. You will be notified once
                            approved.
                          </p>
                        </div>

                        <p className="text-xs text-muted-foreground mt-3">
                          Submitted:{" "}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===== Active / Approved Packages ===== */}
          {packages.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="size-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">
                  Your Packages
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {packages.map((pkg) => {
                  const badge =
                    packageStatusBadge[pkg.status] || packageStatusBadge.ACTIVE;
                  const BadgeIcon = badge.Icon;
                  return (
                    <div
                      key={pkg.id}
                      className="rounded-xl border border-white/[0.06] bg-card p-6 relative overflow-hidden"
                    >
                      {pkg.status === "ACTIVE" && (
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                      )}
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-foreground">
                            {pkg.packageName}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}
                          >
                            <BadgeIcon className="size-3" />
                            {badge.label}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Account Size
                            </p>
                            <p className="text-base font-bold text-foreground">
                              ${pkg.accountSize.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Balance
                            </p>
                            <p className="text-base font-bold text-foreground">
                              ${pkg.currentBalance.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Profit
                            </p>
                            <p
                              className={`text-base font-bold ${pkg.currentProfit >= 0 ? "text-primary" : "text-red-400"}`}
                            >
                              {pkg.currentProfit >= 0 ? "+" : ""}$
                              {pkg.currentProfit.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {/* Profit bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Profit Target</span>
                            <span>{pkg.profitPercentage}%</span>
                          </div>
                          <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-green-400 rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.min(Math.max(pkg.profitPercentage * 10, 0), 100)}%`,
                              }}
                            />
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground">
                          Activated:{" "}
                          {new Date(pkg.activatedAt).toLocaleDateString()}
                        </p>

                        {/* Telegram CTA for active packages */}
                        {pkg.status === "ACTIVE" && (
                          <a
                            href="https://t.me/Alphafundx"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-[#0088cc]/10 border border-[#0088cc]/20 text-[#29B6F6] font-semibold text-sm hover:bg-[#0088cc]/20 transition-all"
                          >
                            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.504-1.36 8.629-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                            Get your Trading Account — DM us on Telegram
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===== Rejected Orders ===== */}
          {rejectedOrders.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <XCircle className="size-5 text-red-400" />
                <h2 className="text-lg font-semibold text-foreground">
                  Rejected Payments
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rejectedOrders.map((order) => {
                  const badge = orderStatusBadge.CANCELLED;
                  const BadgeIcon = badge.Icon;
                  return (
                    <div
                      key={order.id}
                      className="rounded-xl border border-red-500/20 bg-card p-6 relative overflow-hidden opacity-75"
                    >
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-foreground">
                            {order.packageName}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}
                          >
                            <BadgeIcon className="size-3" />
                            {badge.label}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Account Size
                            </p>
                            <p className="text-base font-bold text-foreground">
                              ${order.accountSize.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Amount Paid
                            </p>
                            <p className="text-base font-bold text-foreground">
                              ${order.amount.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-red-400/70">
                          Your payment was rejected. Please contact support or
                          try again with a valid payment.
                        </p>

                        <p className="text-xs text-muted-foreground mt-3">
                          Submitted:{" "}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
