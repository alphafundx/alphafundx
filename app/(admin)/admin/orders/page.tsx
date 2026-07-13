"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

type OrderStatus = "Paid" | "Pending" | "Failed" | "Refunded";

interface Order {
  id: string;
  user: string;
  email: string;
  package: string;
  amount: number;
  status: OrderStatus;
  paymentMethod: string;
  date: string;
}

const orders: Order[] = [
  { id: "ORD-9821", user: "Fatima Al-Rashid", email: "fatima@example.com", package: "Elite ($100K)", amount: 349, status: "Paid", paymentMethod: "Crypto", date: "Jul 12, 2024" },
  { id: "ORD-9820", user: "John Doe", email: "john.doe@example.com", package: "Standard ($25K)", amount: 149, status: "Paid", paymentMethod: "Stripe", date: "Jul 11, 2024" },
  { id: "ORD-9819", user: "Carlos Santana", email: "carlos@example.com", package: "Professional ($50K)", amount: 199, status: "Pending", paymentMethod: "Stripe", date: "Jul 10, 2024" },
  { id: "ORD-9818", user: "Yuki Tanaka", email: "yuki@example.com", package: "Master ($200K)", amount: 599, status: "Paid", paymentMethod: "Crypto", date: "Jul 09, 2024" },
  { id: "ORD-9817", user: "Liam O'Connor", email: "liam@example.com", package: "Starter ($10K)", amount: 49, status: "Failed", paymentMethod: "Stripe", date: "Jul 08, 2024" },
  { id: "ORD-9816", user: "Alex Thompson", email: "alex@example.com", package: "Professional ($50K)", amount: 199, status: "Paid", paymentMethod: "Crypto", date: "Jul 07, 2024" },
  { id: "ORD-9815", user: "Sarah Chen", email: "sarah.c@example.com", package: "Elite ($100K)", amount: 349, status: "Refunded", paymentMethod: "Stripe", date: "Jul 06, 2024" },
  { id: "ORD-9814", user: "David Park", email: "david@example.com", package: "Master ($200K)", amount: 599, status: "Paid", paymentMethod: "Crypto", date: "Jul 05, 2024" },
];

const statusColors: Record<OrderStatus, string> = {
  Paid: "bg-green-500/10 text-green-500",
  Pending: "bg-yellow-500/10 text-yellow-500",
  Failed: "bg-red-500/10 text-red-500",
  Refunded: "bg-purple-500/10 text-purple-400",
};

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | OrderStatus>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.user.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="space-y-6">
      <PageHeader title="Order Management" description="View all orders and payment history." />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input placeholder="Search by user or order ID..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} className="pl-9 bg-white/[0.02]" />
        </div>
        <div className="flex items-center gap-2">
          {(["all", "Paid", "Pending", "Failed", "Refunded"] as const).map((s) => (
            <button
              key={s}
              onClick={() => { setFilterStatus(s); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterStatus === s ? "bg-primary text-primary-foreground" : "bg-white/[0.04] text-muted-foreground hover:bg-white/[0.08]"
              }`}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/[0.06] bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-white/[0.02] border-b border-white/[0.06]">
              <tr>
                <th className="px-5 py-4 font-semibold">Order ID</th>
                <th className="px-5 py-4 font-semibold">User</th>
                <th className="px-5 py-4 font-semibold">Package</th>
                <th className="px-5 py-4 font-semibold">Amount</th>
                <th className="px-5 py-4 font-semibold">Payment</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((order) => (
                <tr key={order.id} className="border-b border-white/[0.04] hover:bg-white/[0.015] transition-colors">
                  <td className="px-5 py-4 font-semibold text-foreground">{order.id}</td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-foreground">{order.user}</p>
                    <p className="text-xs text-muted-foreground">{order.email}</p>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{order.package}</td>
                  <td className="px-5 py-4 font-medium text-foreground">${order.amount}</td>
                  <td className="px-5 py-4 text-muted-foreground">{order.paymentMethod}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{order.date}</td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-muted-foreground">No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-white/[0.06]">
            <p className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg border border-white/[0.06] hover:bg-white/[0.04] text-muted-foreground disabled:opacity-30"><ChevronLeft className="size-4" /></button>
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-white/[0.06] hover:bg-white/[0.04] text-muted-foreground disabled:opacity-30"><ChevronRight className="size-4" /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
