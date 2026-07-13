"use client";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import {
  Users,
  DollarSign,
  Package,
  ArrowDownUp,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data for analytics
const registrationData = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 210 },
  { month: "Mar", users: 340 },
  { month: "Apr", users: 480 },
  { month: "May", users: 640 },
  { month: "Jun", users: 810 },
  { month: "Jul", users: 950 },
];

const revenueData = [
  { month: "Jan", revenue: 5800 },
  { month: "Feb", revenue: 10400 },
  { month: "Mar", revenue: 16800 },
  { month: "Apr", revenue: 23500 },
  { month: "May", revenue: 31200 },
  { month: "Jun", revenue: 39500 },
  { month: "Jul", revenue: 47200 },
];

const packageDistribution = [
  { name: "Starter ($10K)", value: 450, color: "#26FF5E" },
  { name: "Standard ($25K)", value: 300, color: "#19B226" },
  { name: "Professional ($50K)", value: 210, color: "#264C47" },
  { name: "Elite ($100K)", value: 120, color: "#34D399" },
  { name: "Master ($200K)", value: 60, color: "#6EE7B7" },
];

const latestUsers = [
  { id: "1", name: "Alex Thompson", email: "alex@example.com", status: "Active", joined: "2 hours ago" },
  { id: "2", name: "Sarah Chen", email: "sarah.c@example.com", status: "Active", joined: "4 hours ago" },
  { id: "3", name: "Michael Rivera", email: "m.rivera@example.com", status: "Active", joined: "1 day ago" },
  { id: "4", name: "Emma Williams", email: "emma.w@example.com", status: "Suspended", joined: "2 days ago" },
  { id: "5", name: "David Park", email: "david@example.com", status: "Active", joined: "3 days ago" },
];

const recentPurchases = [
  { id: "ORD-9821", name: "Fatima Al-Rashid", package: "Elite ($100K)", amount: 349.00, status: "Paid", date: "1 hour ago" },
  { id: "ORD-9820", name: "John Doe", package: "Standard ($25K)", amount: 149.00, status: "Paid", date: "3 hours ago" },
  { id: "ORD-9819", name: "Carlos Santana", package: "Professional ($50K)", amount: 199.00, status: "Pending", date: "5 hours ago" },
  { id: "ORD-9818", name: "Yuki Tanaka", package: "Master ($200K)", amount: 599.00, status: "Paid", date: "1 day ago" },
  { id: "ORD-9817", name: "Liam O'Connor", package: "Starter ($10K)", amount: 49.00, status: "Failed", date: "2 days ago" },
];

const tooltipStyle = {
  backgroundColor: "#232930",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "8px",
  color: "#F0F0F0",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Dashboard"
        description="Overview of your platform analytics and activity."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Users" value={1140} icon={Users} />
        <StatCard title="Active Users" value={980} icon={UserCheck} />
        <StatCard title="Packages Sold" value={1140} icon={Package} />
        <StatCard title="Total Revenue" value={174400} prefix="$" icon={DollarSign} />
        <StatCard title="Pending Payouts" value={4} icon={ArrowDownUp} />
        <StatCard title="Total Paid Out" value={18400} prefix="$" icon={TrendingUp} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Registrations */}
        <div className="rounded-xl border border-white/[0.06] bg-card p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-foreground mb-6">Monthly Registrations</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={registrationData} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="users" fill="#26FF5E" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Package Distribution */}
        <div className="rounded-xl border border-white/[0.06] bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Package Share</h3>
          <div className="h-80 w-full flex flex-col justify-between">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={packageDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {packageDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {packageDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="rounded-xl border border-white/[0.06] bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Cumulative Revenue Trend</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData} margin={{ left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} tickFormatter={(val) => `$${val / 1000}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]} />
              <Line type="monotone" dataKey="revenue" stroke="#26FF5E" strokeWidth={3} dot={{ fill: "#26FF5E", r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Users */}
        <div className="rounded-xl border border-white/[0.06] bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Latest Users</h3>
          <div className="overflow-x-auto">
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
                {latestUsers.map((user) => (
                  <tr key={user.id} className="border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{user.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        user.status === "Active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{user.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Purchases */}
        <div className="rounded-xl border border-white/[0.06] bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Purchases</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-white/[0.02] border-b border-white/[0.06]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Order ID</th>
                  <th className="px-4 py-3 font-semibold">User</th>
                  <th className="px-4 py-3 font-semibold">Package</th>
                  <th className="px-4 py-3 font-semibold">Amount</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPurchases.map((purchase) => (
                  <tr key={purchase.id} className="border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors">
                    <td className="px-4 py-3 font-semibold text-foreground">{purchase.id}</td>
                    <td className="px-4 py-3 text-muted-foreground">{purchase.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{purchase.package}</td>
                    <td className="px-4 py-3 font-medium text-foreground">${purchase.amount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        purchase.status === "Paid"
                          ? "bg-green-500/10 text-green-500"
                          : purchase.status === "Pending"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-red-500/10 text-red-500"
                      }`}>
                        {purchase.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
