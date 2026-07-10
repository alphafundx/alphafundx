"use client";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { EmptyState } from "@/components/shared/empty-state";
import { DollarSign, TrendingUp, Package, ArrowDownUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your trading account."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Account Balance"
          value={0}
          prefix="$"
          icon={DollarSign}
        />
        <StatCard
          title="Current Profit"
          value={0}
          prefix="$"
          icon={TrendingUp}
        />
        <StatCard
          title="Profit Percentage"
          value={0}
          suffix="%"
          icon={TrendingUp}
          decimals={1}
        />
        <StatCard
          title="Active Packages"
          value={0}
          icon={Package}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart area */}
        <div className="lg:col-span-2 rounded-xl border border-white/[0.06] bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Profit Overview</h3>
          <div className="h-64 flex items-center justify-center">
            <EmptyState
              title="No Data Yet"
              description="Purchase a package to start tracking your profits."
            />
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-xl border border-white/[0.06] bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-muted-foreground">No recent activity.</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-white/[0.06] bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
            <ArrowDownUp className="size-4 inline mr-2" />
            Request Withdrawal
          </button>
          <button className="px-4 py-2 rounded-lg bg-white/[0.04] text-foreground text-sm font-medium hover:bg-white/[0.08] transition-colors">
            <Package className="size-4 inline mr-2" />
            View Rules
          </button>
        </div>
      </div>
    </div>
  );
}
