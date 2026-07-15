"use client";

import { useEffect, useState, useCallback } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ArrowDownUp,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface ApiWithdrawal {
  id: string;
  amount: number;
  paymentMethod: string;
  paymentDetails: Record<string, string> | null;
  status: string;
  adminNote: string | null;
  createdAt: string;
  user: { id: string; name: string | null; email: string };
  userPackage: { package: { name: string; accountSize: number } } | null;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  PENDING: { color: "bg-yellow-500/10 text-yellow-500", icon: Clock },
  APPROVED: { color: "bg-blue-500/10 text-blue-400", icon: CheckCircle2 },
  REJECTED: { color: "bg-red-500/10 text-red-500", icon: XCircle },
  PAID: { color: "bg-green-500/10 text-green-500", icon: DollarSign },
};

export default function AdminWithdrawalsPage() {
  const [withdrawals, setWithdrawals] = useState<ApiWithdrawal[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");

  // Action modal
  const [actionModal, setActionModal] = useState<{ withdrawal: ApiWithdrawal; action: string } | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [processing, setProcessing] = useState(false);

  const fetchWithdrawals = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: "20" });
      if (filterStatus) params.set("status", filterStatus);

      const res = await fetch(`/api/admin/withdrawals?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setWithdrawals(data.withdrawals);
      setPagination(data.pagination);
    } catch {
      toast.error("Failed to load withdrawals");
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => {
    fetchWithdrawals(1);
  }, [fetchWithdrawals]);

  const handleStatusUpdate = async (withdrawalId: string, newStatus: string, note: string) => {
    setProcessing(true);
    try {
      const res = await fetch("/api/admin/withdrawals", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ withdrawalId, status: newStatus, adminNote: note || undefined }),
      });
      if (!res.ok) throw new Error("Failed to update");
      toast.success(`Withdrawal ${newStatus.toLowerCase()}`);
      setActionModal(null);
      setAdminNote("");
      fetchWithdrawals(pagination.page);
    } catch {
      toast.error("Failed to update withdrawal");
    } finally {
      setProcessing(false);
    }
  };

  const pendingCount = withdrawals.filter((w) => w.status === "PENDING").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Withdrawal Management"
        description={`${pagination.total} total withdrawals${pendingCount > 0 ? ` • ${pendingCount} pending review` : ""}`}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          className="h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] text-foreground text-sm px-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="PAID">Paid</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/[0.06] bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-white/[0.02] border-b border-white/[0.06]">
              <tr>
                <th className="px-4 py-3 font-semibold">User</th>
                <th className="px-4 py-3 font-semibold">Package</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Method</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <Loader2 className="size-6 animate-spin text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">Loading withdrawals...</p>
                  </td>
                </tr>
              ) : withdrawals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <ArrowDownUp className="size-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">No withdrawals found</p>
                  </td>
                </tr>
              ) : (
                withdrawals.map((w) => {
                  const config = statusConfig[w.status] || statusConfig.PENDING;
                  const StatusIcon = config.icon;
                  return (
                    <tr key={w.id} className="border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground">{w.user.name || "—"}</p>
                        <p className="text-xs text-muted-foreground">{w.user.email}</p>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {w.userPackage?.package.name || "—"} {w.userPackage ? `($${(w.userPackage.package.accountSize / 1000).toFixed(0)}K)` : ""}
                      </td>
                      <td className="px-4 py-3 font-semibold text-foreground">${w.amount.toFixed(2)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{w.paymentMethod}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${config.color}`}>
                          <StatusIcon className="size-3" />
                          {w.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{new Date(w.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-right">
                        {w.status === "PENDING" && (
                          <div className="flex items-center gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-500 border-green-500/20 hover:bg-green-500/10"
                              onClick={() => { setActionModal({ withdrawal: w, action: "APPROVED" }); setAdminNote(""); }}
                            >
                              <CheckCircle2 className="size-3 mr-1" /> Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-400 border-red-500/20 hover:bg-red-500/10"
                              onClick={() => { setActionModal({ withdrawal: w, action: "REJECTED" }); setAdminNote(""); }}
                            >
                              <XCircle className="size-3 mr-1" /> Reject
                            </Button>
                          </div>
                        )}
                        {w.status === "APPROVED" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-primary border-primary/20 hover:bg-primary/10"
                            onClick={() => handleStatusUpdate(w.id, "PAID", "")}
                          >
                            <DollarSign className="size-3 mr-1" /> Mark Paid
                          </Button>
                        )}
                        {w.adminNote && (
                          <p className="text-xs text-muted-foreground mt-1 italic">Note: {w.adminNote}</p>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06]">
            <p className="text-xs text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={pagination.page <= 1} onClick={() => fetchWithdrawals(pagination.page - 1)}>
                <ChevronLeft className="size-4" />
              </Button>
              <Button variant="outline" size="sm" disabled={pagination.page >= pagination.totalPages} onClick={() => fetchWithdrawals(pagination.page + 1)}>
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Action Modal */}
      {actionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setActionModal(null)}>
          <div className="w-full max-w-md mx-4 rounded-xl border border-white/[0.08] bg-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
              <h2 className="text-lg font-semibold text-foreground">
                {actionModal.action === "APPROVED" ? "Approve" : "Reject"} Withdrawal
              </h2>
              <button onClick={() => setActionModal(null)} className="text-muted-foreground hover:text-foreground">
                <X className="size-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <p className="text-sm text-muted-foreground">User: <span className="text-foreground font-medium">{actionModal.withdrawal.user.name}</span></p>
                <p className="text-sm text-muted-foreground">Amount: <span className="text-foreground font-semibold">${actionModal.withdrawal.amount.toFixed(2)}</span></p>
                <p className="text-sm text-muted-foreground">Method: <span className="text-foreground">{actionModal.withdrawal.paymentMethod}</span></p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Admin Note (optional)</label>
                <textarea
                  className="w-full min-h-[80px] rounded-lg bg-white/[0.04] border border-white/[0.08] text-foreground text-sm p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder={actionModal.action === "REJECTED" ? "Reason for rejection..." : "Optional note..."}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-white/[0.06]">
              <Button variant="outline" onClick={() => setActionModal(null)}>Cancel</Button>
              <Button
                onClick={() => handleStatusUpdate(actionModal.withdrawal.id, actionModal.action, adminNote)}
                disabled={processing}
                className={actionModal.action === "APPROVED" ? "bg-green-600 hover:bg-green-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"}
              >
                {processing && <Loader2 className="size-4 animate-spin mr-2" />}
                {actionModal.action === "APPROVED" ? "Approve" : "Reject"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
