"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Users,
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Ban,
  Trash2,
  KeyRound,
  ChevronLeft,
  ChevronRight,
  X,
  DollarSign,
  TrendingUp,
  Shield,
} from "lucide-react";
import { toast } from "sonner";

type UserStatus = "Active" | "Suspended";
type UserRole = "USER" | "ADMIN";

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  balance: number;
  profit: number;
  joined: string;
  phone: string;
  telegram: string;
}

const mockUsers: MockUser[] = [
  { id: "1", name: "Alex Thompson", email: "alex@example.com", role: "USER", status: "Active", balance: 104100, profit: 4100, joined: "Oct 15, 2023", phone: "+1 555-0101", telegram: "@alexthompson" },
  { id: "2", name: "Sarah Chen", email: "sarah.c@example.com", role: "USER", status: "Active", balance: 50000, profit: 2300, joined: "Nov 02, 2023", phone: "+1 555-0102", telegram: "@sarahchen" },
  { id: "3", name: "Michael Rivera", email: "m.rivera@example.com", role: "USER", status: "Active", balance: 25000, profit: 890, joined: "Nov 10, 2023", phone: "+1 555-0103", telegram: "@mrivera" },
  { id: "4", name: "Emma Williams", email: "emma.w@example.com", role: "USER", status: "Suspended", balance: 0, profit: -1200, joined: "Dec 01, 2023", phone: "+44 7700 900001", telegram: "@emmaw" },
  { id: "5", name: "David Park", email: "david@example.com", role: "USER", status: "Active", balance: 200000, profit: 12500, joined: "Sep 20, 2023", phone: "+82 10-1234-5678", telegram: "@davidpark" },
  { id: "6", name: "Fatima Al-Rashid", email: "fatima@example.com", role: "USER", status: "Active", balance: 100000, profit: 8400, joined: "Aug 15, 2023", phone: "+971 50 123 4567", telegram: "@fatimaar" },
  { id: "7", name: "John Doe", email: "john.doe@example.com", role: "USER", status: "Active", balance: 10000, profit: 320, joined: "Jan 05, 2024", phone: "+1 555-0107", telegram: "@johndoe" },
  { id: "8", name: "Carlos Santana", email: "carlos@example.com", role: "USER", status: "Active", balance: 50000, profit: 1800, joined: "Feb 14, 2024", phone: "+34 612 345 678", telegram: "@carloss" },
  { id: "9", name: "Yuki Tanaka", email: "yuki@example.com", role: "USER", status: "Active", balance: 200000, profit: 15200, joined: "Jul 22, 2023", phone: "+81 90-1234-5678", telegram: "@yukitanaka" },
  { id: "10", name: "Liam O'Connor", email: "liam@example.com", role: "USER", status: "Suspended", balance: 0, profit: -500, joined: "Mar 01, 2024", phone: "+353 85 123 4567", telegram: "@liamoconnor" },
  { id: "11", name: "Platform Admin", email: "admin@alphafundx.com", role: "ADMIN", status: "Active", balance: 0, profit: 0, joined: "Jan 01, 2023", phone: "+1 555-0000", telegram: "@afxadmin" },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | UserStatus>("all");
  const [filterRole, setFilterRole] = useState<"all" | UserRole>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const [editBalance, setEditBalance] = useState("");
  const [editProfit, setEditProfit] = useState("");
  const perPage = 8;

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || u.status === filterStatus;
    const matchesRole = filterRole === "all" || u.role === filterRole;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Suspended" as UserStatus : "Active" as UserStatus }
          : u
      )
    );
    toast.success("User status updated");
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.success("User deleted");
  };

  const saveUserEdits = () => {
    if (!selectedUser) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id
          ? {
              ...u,
              balance: editBalance !== "" ? parseFloat(editBalance) : u.balance,
              profit: editProfit !== "" ? parseFloat(editProfit) : u.profit,
            }
          : u
      )
    );
    toast.success("User updated successfully");
    setSelectedUser(null);
  };

  const openUserDetail = (user: MockUser) => {
    setSelectedUser(user);
    setEditBalance(user.balance.toString());
    setEditProfit(user.profit.toString());
  };

  return (
    <div className="space-y-6">
      <PageHeader title="User Management" description="View, edit, and manage all platform users." />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="pl-9 bg-white/[0.02]"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value as "all" | UserStatus); setCurrentPage(1); }}
          className="px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-sm text-foreground focus:outline-none focus:border-primary/50"
        >
          <option value="all" className="bg-card">All Status</option>
          <option value="Active" className="bg-card">Active</option>
          <option value="Suspended" className="bg-card">Suspended</option>
        </select>
        <select
          value={filterRole}
          onChange={(e) => { setFilterRole(e.target.value as "all" | UserRole); setCurrentPage(1); }}
          className="px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-sm text-foreground focus:outline-none focus:border-primary/50"
        >
          <option value="all" className="bg-card">All Roles</option>
          <option value="USER" className="bg-card">User</option>
          <option value="ADMIN" className="bg-card">Admin</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/[0.06] bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-white/[0.02] border-b border-white/[0.06]">
              <tr>
                <th className="px-5 py-4 font-semibold">User</th>
                <th className="px-5 py-4 font-semibold">Role</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Balance</th>
                <th className="px-5 py-4 font-semibold">Profit</th>
                <th className="px-5 py-4 font-semibold">Joined</th>
                <th className="px-5 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((user) => (
                <tr key={user.id} className="border-b border-white/[0.04] hover:bg-white/[0.015] transition-colors">
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      user.role === "ADMIN" ? "bg-purple-500/10 text-purple-400" : "bg-blue-500/10 text-blue-400"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      user.status === "Active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium text-foreground">${user.balance.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={user.profit >= 0 ? "text-green-500" : "text-red-500"}>
                      {user.profit >= 0 ? "+" : ""}${user.profit.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{user.joined}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openUserDetail(user)}
                        className="p-2 rounded-lg hover:bg-white/[0.06] text-muted-foreground hover:text-foreground transition-colors"
                        title="View / Edit"
                      >
                        <Eye className="size-4" />
                      </button>
                      <button
                        onClick={() => toggleStatus(user.id)}
                        className="p-2 rounded-lg hover:bg-white/[0.06] text-muted-foreground hover:text-yellow-500 transition-colors"
                        title={user.status === "Active" ? "Suspend" : "Activate"}
                      >
                        <Ban className="size-4" />
                      </button>
                      <button
                        onClick={() => toast.info("Password reset email sent")}
                        className="p-2 rounded-lg hover:bg-white/[0.06] text-muted-foreground hover:text-blue-400 transition-colors"
                        title="Reset Password"
                      >
                        <KeyRound className="size-4" />
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="p-2 rounded-lg hover:bg-white/[0.06] text-muted-foreground hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-muted-foreground">
                    No users match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-white/[0.06]">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-white/[0.06] hover:bg-white/[0.04] text-muted-foreground disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="size-4" />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === i + 1
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-white/[0.04]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-white/[0.06] hover:bg-white/[0.04] text-muted-foreground disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/[0.08] bg-card shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <h3 className="text-lg font-semibold text-foreground">User Details</h3>
              <button onClick={() => setSelectedUser(null)} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-muted-foreground">
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Profile Info */}
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">{selectedUser.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      selectedUser.status === "Active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    }`}>
                      {selectedUser.status}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      selectedUser.role === "ADMIN" ? "bg-purple-500/10 text-purple-400" : "bg-blue-500/10 text-blue-400"
                    }`}>
                      {selectedUser.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Phone</p>
                  <p className="text-foreground font-medium">{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Telegram</p>
                  <p className="text-foreground font-medium">{selectedUser.telegram}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Member Since</p>
                  <p className="text-foreground font-medium">{selectedUser.joined}</p>
                </div>
              </div>

              {/* Editable Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5 text-muted-foreground">
                    <DollarSign className="size-3.5" /> Balance
                  </Label>
                  <Input
                    type="number"
                    value={editBalance}
                    onChange={(e) => setEditBalance(e.target.value)}
                    className="bg-white/[0.02]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5 text-muted-foreground">
                    <TrendingUp className="size-3.5" /> Profit
                  </Label>
                  <Input
                    type="number"
                    value={editProfit}
                    onChange={(e) => setEditProfit(e.target.value)}
                    className="bg-white/[0.02]"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/[0.06]">
              <Button variant="outline" onClick={() => setSelectedUser(null)} className="border-white/[0.08]">
                Cancel
              </Button>
              <Button onClick={saveUserEdits} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
