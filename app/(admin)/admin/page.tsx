"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import {
  Users,
  DollarSign,
  Package,
  ArrowDownUp,
  TrendingUp,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";

interface AnalyticsData {
  stats: {
    totalUsers: number;
    activeUsers: number;
    totalOrders: number;
    completedOrders: number;
    pendingWithdrawals: number;
    totalRevenue: number;
    totalPaidOut: number;
  };
  recentUsers: {
    id: string;
    name: string | null;
    email: string;
    role: string;
    status: string;
    createdAt: string;
  }[];
  recentOrders: {
    id: string;
    amount: number;
    status: string;
    createdAt: string;
    user: { name: string | null; email: string };
    package: { name: string; accountSize: number };
  }[];
  monthlyRegistrations: { month: string; count: number }[];
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

const CHART_COLORS = ["#26FF5E", "#19B226", "#264C47", "#34D399", "#6EE7B7"];

const tooltipStyle = {
  backgroundColor: "#232930",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "8px",
  color: "#F0F0F0",
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [packageDist, setPackageDist] = useState<{ name: string; value: number; color: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const [analyticsRes, packagesRes] = await Promise.all([
          fetch("/api/admin/analytics"),
          fetch("/api/admin/packages"),
        ]);

        if (!analyticsRes.ok) throw new Error("Failed to fetch analytics");

        const analytics: AnalyticsData = await analyticsRes.json();
        setData(analytics);

        // Build package distribution from real data
        if (packagesRes.ok) {
          const packages = await packagesRes.json();
          const dist = packages
            .filter((p: { isActive: boolean }) => p.isActive)
            .map((p: { name: string; accountSize: number; _count: { orders: number } }, i: number) => ({
              name: `${p.name} ($${(p.accountSize / 1000).toFixed(0)}K)`,
              value: p._count.orders,
              color: CHART_COLORS[i % CHART_COLORS.length],
            }))
            .filter((d: { value: number }) => d.value > 0);
          setPackageDist(dist);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <PageHeader title="Admin Dashboard" description="Loading analytics..." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[100px] rounded-xl border border-white/[0.06] bg-card animate-pulse" />
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
        <PageHeader title="Admin Dashboard" description="Overview of your platform analytics." />
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">
          <AlertCircle className="size-10 text-destructive mx-auto mb-4" />
          <p className="text-foreground font-medium">Failed to load analytics</p>
          <p className="text-muted-foreground text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Dashboard"
        description="Overview of your platform analytics and activity."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Users" value={data.stats.totalUsers} icon={Users} />
        <StatCard title="Active Users" value={data.stats.activeUsers} icon={UserCheck} />
        <StatCard title="Packages Sold" value={data.stats.completedOrders} icon={Package} />
        <StatCard title="Total Revenue" value={data.stats.totalRevenue} prefix="$" icon={DollarSign} />
        <StatCard title="Pending Payouts" value={data.stats.pendingWithdrawals} icon={ArrowDownUp} />
        <StatCard title="Total Paid Out" value={data.stats.totalPaidOut} prefix="$" icon={TrendingUp} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Registrations */}
        <div className="rounded-xl border border-white/[0.06] bg-card p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-foreground mb-6">Monthly Registrations</h3>
          <div className="h-80 w-full">
            {data.monthlyRegistrations.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.monthlyRegistrations} margin={{ left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255, 255, 255, 0.05)" }} />
                  <Bar dataKey="count" fill="#26FF5E" radius={[4, 4, 0, 0]} maxBarSize={40} name="Users" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                No registration data yet
              </div>
            )}
          </div>
        </div>

        {/* Package Distribution */}
        <div className="rounded-xl border border-white/[0.06] bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Package Share</h3>
          <div className="h-80 w-full flex flex-col justify-between">
            {packageDist.length > 0 ? (
              <>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={packageDist}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {packageDist.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {packageDist.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-semibold text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                No order data yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Users */}
        <div className="rounded-xl border border-white/[0.06] bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Latest Users</h3>
            <Link href="/admin/users" className="text-sm text-primary hover:text-primary/80">View all</Link>
          </div>
          <div className="overflow-x-auto">
            {data.recentUsers.length > 0 ? (
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-white/[0.02] border-b border-white/[0.06]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{user.name || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          user.status === "ACTIVE" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                        }`}>
                          {user.status === "ACTIVE" ? "Active" : "Suspended"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{timeAgo(user.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted-foreground text-sm text-center py-8">No users yet</p>
            )}
          </div>
        </div>

        {/* Recent Purchases */}
        <div className="rounded-xl border border-white/[0.06] bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Purchases</h3>
            <Link href="/admin/orders" className="text-sm text-primary hover:text-primary/80">View all</Link>
          </div>
          <div className="overflow-x-auto">
            {data.recentOrders.length > 0 ? (
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-white/[0.02] border-b border-white/[0.06]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">User</th>
                    <th className="px-4 py-3 font-semibold">Package</th>
                    <th className="px-4 py-3 font-semibold">Amount</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors">
                      <td className="px-4 py-3 text-muted-foreground">{order.user.name || order.user.email}</td>
                      <td className="px-4 py-3 text-muted-foreground">{order.package.name}</td>
                      <td className="px-4 py-3 font-medium text-foreground">${order.amount.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          order.status === "COMPLETED"
                            ? "bg-green-500/10 text-green-500"
                            : order.status === "PENDING"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-red-500/10 text-red-500"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted-foreground text-sm text-center py-8">No orders yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
