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

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Dashboard"
        description="Overview of your platform analytics and activity."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Users" value={0} icon={Users} />
        <StatCard title="Active Users" value={0} icon={UserCheck} />
        <StatCard title="Packages Sold" value={0} icon={Package} />
        <StatCard title="Total Revenue" value={0} prefix="$" icon={DollarSign} />
        <StatCard title="Pending Withdrawals" value={0} icon={ArrowDownUp} />
        <StatCard title="Approved Payouts" value={0} prefix="$" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart placeholder */}
        <div className="rounded-xl border border-white/[0.06] bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Registrations</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
            No registration data yet.
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Trend</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
            No revenue data yet.
          </div>
        </div>
      </div>

      {/* Latest Users */}
      <div className="rounded-xl border border-white/[0.06] bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Latest Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Joined</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No users yet.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
