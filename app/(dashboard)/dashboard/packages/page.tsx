"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Package, Loader2, CheckCircle, AlertTriangle, XCircle, TrendingUp } from "lucide-react";
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

const statusBadge: Record<string, { bg: string; text: string; label: string; Icon: React.ElementType }> = {
  ACTIVE: { bg: "bg-primary/10", text: "text-primary", label: "Active", Icon: CheckCircle },
  BREACHED: { bg: "bg-red-500/10", text: "text-red-400", label: "Breached", Icon: XCircle },
  PASSED: { bg: "bg-blue-500/10", text: "text-blue-400", label: "Passed", Icon: TrendingUp },
  COMPLETED: { bg: "bg-emerald-500/10", text: "text-emerald-400", label: "Completed", Icon: CheckCircle },
};

export default function UserPackagesPage() {
  const [packages, setPackages] = useState<UserPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users/me/dashboard")
      .then((r) => r.json())
      .then((data) => setPackages(data.packages || []))
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

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Packages"
        description="View and manage your funded trading packages."
      />

      {packages.length === 0 ? (
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.map((pkg) => {
            const badge = statusBadge[pkg.status] || statusBadge.ACTIVE;
            const BadgeIcon = badge.Icon;
            return (
              <div key={pkg.id} className="rounded-xl border border-white/[0.06] bg-card p-6 relative overflow-hidden">
                {pkg.status === "ACTIVE" && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                )}
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground">{pkg.packageName}</h3>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
                      <BadgeIcon className="size-3" />
                      {badge.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Account Size</p>
                      <p className="text-base font-bold text-foreground">${pkg.accountSize.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Balance</p>
                      <p className="text-base font-bold text-foreground">${pkg.currentBalance.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Profit</p>
                      <p className={`text-base font-bold ${pkg.currentProfit >= 0 ? "text-primary" : "text-red-400"}`}>
                        {pkg.currentProfit >= 0 ? "+" : ""}${pkg.currentProfit.toLocaleString()}
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
                        style={{ width: `${Math.min(Math.max(pkg.profitPercentage * 10, 0), 100)}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Activated: {new Date(pkg.activatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
