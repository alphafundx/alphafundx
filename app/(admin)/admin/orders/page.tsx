"use client";

import { useEffect, useState, useCallback } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight, Loader2, ShoppingCart } from "lucide-react";

interface ApiOrder {
  id: string;
  amount: number;
  status: string;
  paymentMethod: string;
  paymentReference: string | null;
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
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <Loader2 className="size-6 animate-spin text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">Loading orders...</p>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
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
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[order.status] || "bg-white/5 text-muted-foreground"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
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
    </div>
  );
}
