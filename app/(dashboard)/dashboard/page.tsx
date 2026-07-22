"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { DollarSign, TrendingUp, Package, ArrowDownUp, Bell, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface DashboardPackage {
  id: string;
  packageName: string;
  accountSize: number;
  status: string;
  currentBalance: number;
  currentProfit: number;
  profitPercentage: number;
  activatedAt: string;
}

interface DashboardNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

interface DashboardData {
  packages: DashboardPackage[];
  stats: {
    totalBalance: number;
    totalProfit: number;
    avgProfitPercentage: number;
    activePackageCount: number;
    totalWithdrawn: number;
    pendingWithdrawals: number;
  };
  notifications: DashboardNotification[];
}

function timeAgo(dateStr: string) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

const statusBadge: Record<string, { bg: string; text: string; label: string }> = {
  ACTIVE: { bg: "bg-primary/20", text: "text-primary", label: "Active" },
  BREACHED: { bg: "bg-red-500/20", text: "text-red-400", label: "Breached" },
  PASSED: { bg: "bg-blue-500/20", text: "text-blue-400", label: "Passed" },
  COMPLETED: { bg: "bg-emerald-500/20", text: "text-emerald-400", label: "Completed" },
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/users/me/dashboard");
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <PageHeader title="Dashboard" description="Loading your trading account data..." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-[120px] rounded-xl border border-white/[0.06] bg-card animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[380px] rounded-xl border border-white/[0.06] bg-card animate-pulse" />
          <div className="h-[380px] rounded-xl border border-white/[0.06] bg-card animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-8">
        <PageHeader title="Dashboard" description="Welcome back!" />
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">
          <AlertCircle className="size-10 text-destructive mx-auto mb-4" />
          <p className="text-foreground font-medium">Failed to load dashboard data</p>
          <p className="text-muted-foreground text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  const activePackage = data.packages.find((p) => p.status === "ACTIVE");
  const hasPackages = data.packages.length > 0;

  // Build a simple profit chart from package data
  const profitChartData = activePackage
    ? [
        { label: "Start", value: 0 },
        { label: "Current", value: activePackage.currentProfit },
      ]
    : [];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your trading account."
      />

      {/* Active Package Banner or No Package Message */}
      {activePackage ? (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-foreground">
                  {activePackage.packageName}
                </h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusBadge[activePackage.status]?.bg} ${statusBadge[activePackage.status]?.text}`}>
                  {statusBadge[activePackage.status]?.label || activePackage.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                ${activePackage.accountSize.toLocaleString()} Account Size •{" "}
                {activePackage.profitPercentage}% Profit
              </p>
            </div>
            <Link
              href="/dashboard/withdrawals"
              className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(38,255,94,0.3)]"
            >
              Request Withdrawal
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-white/[0.06] bg-card p-8 text-center">
          <Package className="size-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h2 className="text-lg font-semibold text-foreground mb-2">No Active Package</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Get started by purchasing a trading challenge package.
          </p>
          <Link
            href="/#packages"
            className="inline-flex px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Browse Packages
          </Link>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Account Balance"
          value={data.stats.totalBalance}
          prefix="$"
          icon={DollarSign}
        />
        <StatCard
          title="Current Profit"
          value={data.stats.totalProfit}
          prefix="$"
          icon={TrendingUp}
        />
        <StatCard
          title="Profit Percentage"
          value={data.stats.avgProfitPercentage}
          suffix="%"
          icon={TrendingUp}
          decimals={1}
        />
        <StatCard
          title="Active Packages"
          value={data.stats.activePackageCount}
          icon={Package}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* All Packages List or Profit Chart */}
        <div className="lg:col-span-2 rounded-xl border border-white/[0.06] bg-card p-6">
          {hasPackages ? (
            <>
              <h3 className="text-lg font-semibold text-foreground mb-6">
                {activePackage ? "Profit Overview" : "Your Packages"}
              </h3>
              {activePackage && profitChartData.length > 0 ? (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={profitChartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#26FF5E" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#26FF5E" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
                      <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#9CA3AF", fontSize: 12 }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#9CA3AF", fontSize: 12 }}
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#232930",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: "8px",
                          color: "#F0F0F0"
                        }}
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, "Profit"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#26FF5E"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorProfit)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.packages.map((pkg) => (
                    <div key={pkg.id} className="flex items-center justify-between p-4 rounded-lg border border-white/[0.04] bg-white/[0.01]">
                      <div>
                        <p className="text-sm font-medium text-foreground">{pkg.packageName}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          ${pkg.accountSize.toLocaleString()} • Activated{" "}
                          {new Date(pkg.activatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusBadge[pkg.status]?.bg} ${statusBadge[pkg.status]?.text}`}>
                        {statusBadge[pkg.status]?.label || pkg.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <Package className="size-10 text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground text-sm">No packages yet</p>
            </div>
          )}
        </div>

        {/* Recent activity */}
        <div className="rounded-xl border border-white/[0.06] bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          </div>
          <div className="space-y-6">
            {data.notifications.length > 0 ? (
              data.notifications.map((notif) => (
                <div key={notif.id} className="flex items-start gap-4">
                  <div className={`flex items-center justify-center size-10 rounded-full shrink-0 ${
                    notif.type === "SUCCESS" || notif.type === "WITHDRAWAL"
                      ? "bg-primary/10 text-primary"
                      : notif.type === "WARNING" || notif.type === "ERROR"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-white/5 text-muted-foreground"
                  }`}>
                    {notif.type === "WITHDRAWAL" ? (
                      <DollarSign className="size-5" />
                    ) : notif.type === "PACKAGE" ? (
                      <Package className="size-5" />
                    ) : notif.type === "SUCCESS" ? (
                      <ShieldCheck className="size-5" />
                    ) : (
                      <Bell className="size-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{notif.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{timeAgo(notif.createdAt)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bell className="size-8 text-muted-foreground/40 mb-3" />
                <p className="text-muted-foreground text-sm">No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-white/[0.06] bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Link href="/dashboard/withdrawals" className="flex items-center px-5 py-2.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors border border-primary/20">
            <ArrowDownUp className="size-4 mr-2" />
            Request Withdrawal
          </Link>
          <Link href="/dashboard/profile" className="flex items-center px-5 py-2.5 rounded-lg bg-white/[0.04] text-foreground text-sm font-medium hover:bg-white/[0.08] transition-colors border border-white/[0.06]">
            <Bell className="size-4 mr-2" />
            Profile & Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
