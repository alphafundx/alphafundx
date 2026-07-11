"use client";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { DollarSign, TrendingUp, Package, ArrowDownUp, ShieldCheck, ChevronRight, Bell } from "lucide-react";
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

const profitData = [
  { date: "Mon", profit: 0 },
  { date: "Tue", profit: 120 },
  { date: "Wed", profit: 80 },
  { date: "Thu", profit: 350 },
  { date: "Fri", profit: 290 },
  { date: "Sat", profit: 450 },
  { date: "Sun", profit: 410 },
];

const recentActivity = [
  { id: 1, title: "Passed Phase 1", time: "2 days ago", icon: ShieldCheck, type: "success" },
  { id: 2, title: "Withdrawal Approved ($1,200)", time: "5 days ago", icon: DollarSign, type: "success" },
  { id: 3, title: "New Package Purchased", time: "1 week ago", icon: Package, type: "info" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your trading account."
      />

      {/* Active Package Banner */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold text-foreground">Pro Trader Challenge</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                Phase 2
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              $100,000 Account Size • 5% Profit Target Remaining
            </p>
          </div>
          <Link
            href="/dashboard/packages"
            className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(38,255,94,0.3)]"
          >
            Go to Trading Platform
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Account Balance"
          value={104100}
          prefix="$"
          icon={DollarSign}
        />
        <StatCard
          title="Current Profit"
          value={4100}
          prefix="$"
          icon={TrendingUp}
        />
        <StatCard
          title="Profit Percentage"
          value={4.1}
          suffix="%"
          icon={TrendingUp}
          decimals={1}
        />
        <StatCard
          title="Active Packages"
          value={1}
          icon={Package}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart area */}
        <div className="lg:col-span-2 rounded-xl border border-white/[0.06] bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Profit Overview</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={profitData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#26FF5E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#26FF5E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: "#232930", 
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    color: "#F0F0F0"
                  }}
                  itemStyle={{ color: "#26FF5E" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#26FF5E" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorProfit)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-xl border border-white/[0.06] bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            <button className="text-sm text-primary hover:text-primary/80">View all</button>
          </div>
          <div className="space-y-6">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className={`flex items-center justify-center size-10 rounded-full shrink-0 ${
                  activity.type === 'success' ? 'bg-primary/10 text-primary' : 'bg-white/5 text-muted-foreground'
                }`}>
                  <activity.icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{activity.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
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
            Notification Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
