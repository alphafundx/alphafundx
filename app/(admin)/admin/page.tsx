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
        <StatCard title="Total Users" value={1250} icon={Users} trend={{ value: 15, isPositive: true }} />
        <StatCard title="Active Users" value={890} icon={UserCheck} trend={{ value: 8, isPositive: true }} />
        <StatCard title="Packages Sold" value={456} icon={Package} trend={{ value: 12, isPositive: true }} />
        <StatCard title="Total Revenue" value={67500} prefix="$" icon={DollarSign} trend={{ value: 22, isPositive: true }} />
        <StatCard title="Pending Withdrawals" value={23} icon={ArrowDownUp} />
        <StatCard title="Approved Payouts" value={34200} prefix="$" icon={TrendingUp} trend={{ value: 5, isPositive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart placeholder */}
        <div className="rounded-xl border border-white/[0.06] bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Registrations</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
            Bar chart will render with real data
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Trend</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
            Line chart will render with real data
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
                  No users yet. Data will populate once the database is connected.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
