import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
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
          value={50000}
          prefix="$"
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Current Profit"
          value={3250}
          prefix="$"
          icon={TrendingUp}
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatCard
          title="Profit Percentage"
          value={6.5}
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

      {/* Placeholder content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart area */}
        <div className="lg:col-span-2 rounded-xl border border-white/[0.06] bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Profit Overview</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
            Chart will be rendered here with real data
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-xl border border-white/[0.06] bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { text: "Account activated", time: "2 hours ago" },
              { text: "Package purchased", time: "1 day ago" },
              { text: "Account created", time: "2 days ago" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0"
              >
                <span className="text-sm text-foreground">{item.text}</span>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
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
