"use client";

import { useEffect, useState, useCallback } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ShoppingCart,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface ApiOrder {
  id: string;
  amount: number;
  status: string;
  paymentMethod: string;
  paymentReference: string | null;
  paymentScreenshot: string | null;
  createdAt: string;
  user: { id: string; name: string | null; email: string };
  package: { name: string; accountSize: number };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const statusColors: Record<string, string> = {
  COMPLETED: "bg-green-500/10 text-green-500",
  PENDING: "bg-yellow-500/10 text-yellow-500",
  CANCELLED: "bg-red-500/10 text-red-500",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [processing, setProcessing] = useState<string | null>(null);
  const [screenshotModal, setScreenshotModal] = useState<string | null>(null);

  const fetchOrders = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: "20" });
      if (search) params.set("search", search);
      if (filterStatus) params.set("status", filterStatus);

      const res = await fetch(`/api/admin/orders?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setOrders(data.orders);
      setPagination(data.pagination);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [search, filterStatus]);

  useEffect(() => {
    fetchOrders(1);
  }, [fetchOrders]);

  const handleAction = async (orderId: string, action: "APPROVE" | "REJECT") => {
    setProcessing(orderId);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, action }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Action failed");
        return;
      }

      toast.success(
        action === "APPROVE"
          ? "Order approved! Package activated for the user."
          : "Order rejected."
      );
      fetchOrders(pagination.page);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Order Management" description={`${pagination.total} total orders.`} />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by user name or email..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] text-foreground text-sm px-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="COMPLETED">Completed</option>
          <option value="PENDING">Pending</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/[0.06] bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-white/[0.02] border-b border-white/[0.06]">
              <tr>
                <th className="px-4 py-3 font-semibold">Order ID</th>
                <th className="px-4 py-3 font-semibold">User</th>
                <th className="px-4 py-3 font-semibold">Package</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Payment</th>
                <th className="px-4 py-3 font-semibold">Screenshot</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <Loader2 className="size-6 animate-spin text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">Loading orders...</p>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <ShoppingCart className="size-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">No orders found</p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{order.id.slice(0, 12)}...</td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-foreground">{order.user.name || "—"}</p>
                        <p className="text-xs text-muted-foreground">{order.user.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {order.package.name} (${(order.package.accountSize / 1000).toFixed(0)}K)
                    </td>
                    <td className="px-4 py-3 font-semibold text-foreground">${order.amount.toFixed(2)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{order.paymentMethod}</td>
                    <td className="px-4 py-3">
                      {order.paymentScreenshot ? (
                        <button
                          onClick={() => setScreenshotModal(order.paymentScreenshot!)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-semibold hover:bg-blue-500/20 transition-colors"
                        >
                          <ImageIcon className="size-3.5" />
                          View
                        </button>
                      ) : (
                        <span className="text-muted-foreground/40 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[order.status] || "bg-white/5 text-muted-foreground"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {order.status === "PENDING" ? (
                        <div className="flex items-center gap-1.5">
                          <Button
                            size="sm"
                            onClick={() => handleAction(order.id, "APPROVE")}
                            disabled={processing === order.id}
                            className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-0 h-8 px-3 text-xs font-semibold"
                          >
                            {processing === order.id ? (
                              <Loader2 className="size-3 animate-spin" />
                            ) : (
                              <CheckCircle className="size-3.5 mr-1" />
                            )}
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAction(order.id, "REJECT")}
                            disabled={processing === order.id}
                            className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-0 h-8 px-3 text-xs font-semibold"
                          >
                            <XCircle className="size-3.5 mr-1" />
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-muted-foreground/30 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06]">
            <p className="text-xs text-muted-foreground">
              Showing {(pagination.page - 1) * pagination.limit + 1}–{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={pagination.page <= 1} onClick={() => fetchOrders(pagination.page - 1)}>
                <ChevronLeft className="size-4" />
              </Button>
              <span className="text-sm text-muted-foreground">{pagination.page} / {pagination.totalPages}</span>
              <Button variant="outline" size="sm" disabled={pagination.page >= pagination.totalPages} onClick={() => fetchOrders(pagination.page + 1)}>
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Screenshot Modal */}
      {screenshotModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setScreenshotModal(null)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[80vh] rounded-2xl overflow-hidden bg-card border border-white/[0.1]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
              <h3 className="text-sm font-semibold text-foreground">Payment Screenshot</h3>
              <button
                onClick={() => setScreenshotModal(null)}
                className="p-1 rounded-md hover:bg-white/[0.06] transition-colors"
              >
                <X className="size-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 flex items-center justify-center">
              <img
                src={screenshotModal}
                alt="Payment screenshot"
                className="w-full h-auto max-h-[65vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
