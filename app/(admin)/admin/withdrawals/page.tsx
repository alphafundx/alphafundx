"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type WithdrawalStatus = "Pending" | "Approved" | "Rejected" | "Paid";

interface Withdrawal {
  id: string;
  user: string;
  email: string;
  amount: number;
  method: string;
  address: string;
  status: WithdrawalStatus;
  date: string;
  note: string;
}

const initialWithdrawals: Withdrawal[] = [
  { id: "WTH-1001", user: "Alex Thompson", email: "alex@example.com", amount: 1250, method: "Crypto (USDT)", address: "TXyz...abc123", status: "Pending", date: "Jul 12, 2024", note: "" },
  { id: "WTH-1002", user: "Sarah Chen", email: "sarah.c@example.com", amount: 800, method: "Bank Transfer", address: "IBAN: DE89...4321", status: "Pending", date: "Jul 11, 2024", note: "" },
  { id: "WTH-1003", user: "David Park", email: "david@example.com", amount: 3200, method: "Crypto (BTC)", address: "bc1q...xyz789", status: "Pending", date: "Jul 10, 2024", note: "" },
  { id: "WTH-1004", user: "Fatima Al-Rashid", email: "fatima@example.com", amount: 2100, method: "Crypto (USDT)", address: "TAbC...def456", status: "Approved", date: "Jul 09, 2024", note: "" },
  { id: "WTH-1005", user: "Michael Rivera", email: "m.rivera@example.com", amount: 500, method: "Bank Transfer", address: "IBAN: ES91...7890", status: "Paid", date: "Jul 08, 2024", note: "" },
  { id: "WTH-1006", user: "Yuki Tanaka", email: "yuki@example.com", amount: 4500, method: "Crypto (USDT)", address: "TDef...ghi789", status: "Paid", date: "Jul 07, 2024", note: "" },
  { id: "WTH-1007", user: "Liam O'Connor", email: "liam@example.com", amount: 200, method: "Bank Transfer", address: "IBAN: IE29...5678", status: "Rejected", date: "Jul 06, 2024", note: "Insufficient trading days" },
  { id: "WTH-1008", user: "Carlos Santana", email: "carlos@example.com", amount: 1800, method: "Crypto (BTC)", address: "bc1q...mno321", status: "Paid", date: "Jul 05, 2024", note: "" },
];

const statusConfig: Record<WithdrawalStatus, { color: string; icon: React.ElementType }> = {
  Pending: { color: "bg-yellow-500/10 text-yellow-500", icon: Clock },
  Approved: { color: "bg-blue-500/10 text-blue-400", icon: CheckCircle2 },
  Rejected: { color: "bg-red-500/10 text-red-500", icon: XCircle },
  Paid: { color: "bg-green-500/10 text-green-500", icon: DollarSign },
};

export default function AdminWithdrawalsPage() {
  const [withdrawals, setWithdrawals] = useState(initialWithdrawals);
  const [filterStatus, setFilterStatus] = useState<"all" | WithdrawalStatus>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const filtered = withdrawals.filter((w) => {
    const matchesSearch =
      w.user.toLowerCase().includes(search.toLowerCase()) ||
      w.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || w.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const updateStatus = (id: string, newStatus: WithdrawalStatus, note = "") => {
    setWithdrawals((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: newStatus, note } : w))
    );
    toast.success(`Withdrawal ${id} marked as ${newStatus}`);
  };

  const bulkAction = (newStatus: WithdrawalStatus) => {
    if (selected.size === 0) {
      toast.error("No withdrawals selected");
      return;
    }
    setWithdrawals((prev) =>
      prev.map((w) => (selected.has(w.id) ? { ...w, status: newStatus } : w))
    );
    toast.success(`${selected.size} withdrawal(s) marked as ${newStatus}`);
    setSelected(new Set());
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === paginated.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paginated.map((w) => w.id)));
    }
  };

  // Stats
  const pendingCount = withdrawals.filter((w) => w.status === "Pending").length;
  const pendingTotal = withdrawals.filter((w) => w.status === "Pending").reduce((a, w) => a + w.amount, 0);
  const paidTotal = withdrawals.filter((w) => w.status === "Paid").reduce((a, w) => a + w.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader title="Withdrawal Management" description="Review, approve, and process trader withdrawals." />

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5">
          <p className="text-sm text-yellow-500 font-medium">Pending Requests</p>
          <p className="text-2xl font-bold text-foreground mt-1">{pendingCount}</p>
          <p className="text-xs text-muted-foreground mt-1">${pendingTotal.toLocaleString()} total</p>
        </div>
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
          <p className="text-sm text-green-500 font-medium">Total Paid Out</p>
          <p className="text-2xl font-bold text-foreground mt-1">${paidTotal.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-card p-5">
          <p className="text-sm text-muted-foreground font-medium">Total Requests</p>
          <p className="text-2xl font-bold text-foreground mt-1">{withdrawals.length}</p>
        </div>
      </div>

      {/* Filters & Bulk Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by user or ID..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="pl-9 bg-white/[0.02]"
          />
        </div>
        <div className="flex items-center gap-2">
          {(["all", "Pending", "Approved", "Rejected", "Paid"] as const).map((s) => (
            <button
              key={s}
              onClick={() => { setFilterStatus(s); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterStatus === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-white/[0.04] text-muted-foreground hover:bg-white/[0.08]"
              }`}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
        {selected.size > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-muted-foreground">{selected.size} selected</span>
            <Button size="sm" onClick={() => bulkAction("Approved")} className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
              Approve
            </Button>
            <Button size="sm" onClick={() => bulkAction("Paid")} className="bg-green-600 hover:bg-green-700 text-white text-xs h-8">
              Mark Paid
            </Button>
            <Button size="sm" onClick={() => bulkAction("Rejected")} variant="outline" className="border-red-500/30 text-red-500 hover:bg-red-500/10 text-xs h-8">
              Reject
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/[0.06] bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-white/[0.02] border-b border-white/[0.06]">
              <tr>
                <th className="px-5 py-4 w-10">
                  <input
                    type="checkbox"
                    checked={selected.size === paginated.length && paginated.length > 0}
                    onChange={toggleAll}
                    className="rounded accent-primary"
                  />
                </th>
                <th className="px-5 py-4 font-semibold">ID</th>
                <th className="px-5 py-4 font-semibold">User</th>
                <th className="px-5 py-4 font-semibold">Amount</th>
                <th className="px-5 py-4 font-semibold">Method</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Date</th>
                <th className="px-5 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((w) => {
                const cfg = statusConfig[w.status];
                return (
                  <tr key={w.id} className="border-b border-white/[0.04] hover:bg-white/[0.015] transition-colors">
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={selected.has(w.id)}
                        onChange={() => toggleSelect(w.id)}
                        className="rounded accent-primary"
                      />
                    </td>
                    <td className="px-5 py-4 font-semibold text-foreground">{w.id}</td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-foreground">{w.user}</p>
                      <p className="text-xs text-muted-foreground">{w.email}</p>
                    </td>
                    <td className="px-5 py-4 font-semibold text-foreground">${w.amount.toLocaleString()}</td>
                    <td className="px-5 py-4 text-muted-foreground">
                      <p>{w.method}</p>
                      <p className="text-xs text-muted-foreground/70 truncate max-w-[120px]">{w.address}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${cfg.color}`}>
                        <cfg.icon className="size-3" />
                        {w.status}
                      </span>
                      {w.note && (
                        <p className="text-xs text-muted-foreground mt-1 italic">{w.note}</p>
                      )}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{w.date}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {w.status === "Pending" && (
                          <>
                            <button
                              onClick={() => updateStatus(w.id, "Approved")}
                              className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-medium hover:bg-blue-500/20 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateStatus(w.id, "Rejected", "Admin rejected")}
                              className="px-2.5 py-1 rounded-md bg-red-500/10 text-red-500 text-xs font-medium hover:bg-red-500/20 transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {w.status === "Approved" && (
                          <button
                            onClick={() => updateStatus(w.id, "Paid")}
                            className="px-2.5 py-1 rounded-md bg-green-500/10 text-green-500 text-xs font-medium hover:bg-green-500/20 transition-colors"
                          >
                            Mark Paid
                          </button>
                        )}
                        {(w.status === "Paid" || w.status === "Rejected") && (
                          <span className="text-xs text-muted-foreground/50">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-muted-foreground">
                    No withdrawals match your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-white/[0.06]">
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg border border-white/[0.06] hover:bg-white/[0.04] text-muted-foreground disabled:opacity-30">
                <ChevronLeft className="size-4" />
              </button>
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-white/[0.06] hover:bg-white/[0.04] text-muted-foreground disabled:opacity-30">
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
