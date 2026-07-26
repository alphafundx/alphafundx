"use client";

import { useEffect, useState, useCallback } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Users,
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
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface ApiUser {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  role: string;
  status: string;
  telegramUsername: string | null;
  createdAt: string;
  _count: { orders: number; withdrawals: number };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface UserDetail {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  role: string;
  status: string;
  telegramUsername: string | null;
  createdAt: string;
  userPackages: {
    id: string;
    status: string;
    currentBalance: number;
    currentProfit: number;
    profitPercentage: number;
    package: { name: string; accountSize: number };
  }[];
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // Detail modal
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  // Edit mode in detail
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", phone: "", telegramUsername: "", status: "" });

  // Action menu
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);

  const fetchUsers = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      });
      if (search) params.set("search", search);
      if (statusFilter) params.set("status", statusFilter);
      if (roleFilter) params.set("role", roleFilter);

      const res = await fetch(`/api/admin/users?${params}`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data.users);
      setPagination(data.pagination);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, roleFilter]);

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  const fetchUserDetail = async (userId: string) => {
    setDetailLoading(true);
    setDetailOpen(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch user details");
      const data = await res.json();
      setSelectedUser(data);
      setEditForm({
        name: data.name || "",
        phone: data.phone || "",
        telegramUsername: data.telegramUsername || "",
        status: data.status,
      });
    } catch {
      toast.error("Failed to load user details");
      setDetailOpen(false);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedUser.id, ...editForm }),
      });
      if (!res.ok) throw new Error("Failed to update user");
      toast.success("User updated successfully");
      setEditing(false);
      fetchUsers(pagination.page);
      fetchUserDetail(selectedUser.id);
    } catch {
      toast.error("Failed to update user");
    }
  };

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      toast.success(`User ${newStatus === "ACTIVE" ? "activated" : "suspended"}`);
      fetchUsers(pagination.page);
      setActionMenuId(null);
    } catch {
      toast.error("Failed to update user status");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error("Failed to delete user");
      toast.success("User deleted");
      fetchUsers(pagination.page);
      setActionMenuId(null);
    } catch {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="User Management"
        description={`${pagination.total} total users on the platform.`}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] text-foreground text-sm px-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="SUSPENDED">Suspended</option>
        </select>
        <select
          className="h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] text-foreground text-sm px-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="rounded-xl border border-white/[0.06] bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-white/[0.02] border-b border-white/[0.06]">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Orders</th>
                <th className="px-4 py-3 font-semibold">Joined</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <Loader2 className="size-6 animate-spin text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">Loading users...</p>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <Users className="size-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">No users found</p>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{user.name || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        user.role === "ADMIN" ? "bg-purple-500/10 text-purple-400" : "bg-white/5 text-muted-foreground"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        user.status === "ACTIVE" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                      }`}>
                        {user.status === "ACTIVE" ? "Active" : "Suspended"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{user._count.orders}</td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setActionMenuId(actionMenuId === user.id ? null : user.id)}
                          className="p-1.5 rounded-lg hover:bg-white/[0.06] text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <MoreHorizontal className="size-4" />
                        </button>
                        {actionMenuId === user.id && (
                          <div className="absolute right-0 mt-1 w-48 rounded-xl border border-white/[0.08] bg-card shadow-2xl shadow-black/40 overflow-hidden z-50">
                            <button
                              onClick={() => { fetchUserDetail(user.id); setActionMenuId(null); }}
                              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                            >
                              <Eye className="size-4" /> View Details
                            </button>
                            <button
                              onClick={() => handleToggleStatus(user.id, user.status)}
                              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                            >
                              {user.status === "ACTIVE" ? <Ban className="size-4" /> : <CheckCircle className="size-4" />}
                              {user.status === "ACTIVE" ? "Suspend" : "Activate"}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/5"
                            >
                              <Trash2 className="size-4" /> Delete
                            </button>
                          </div>
                        )}
                      </div>
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
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page <= 1}
                onClick={() => fetchUsers(pagination.page - 1)}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {pagination.page} / {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => fetchUsers(pagination.page + 1)}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {detailOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => { setDetailOpen(false); setEditing(false); }}>
          <div className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto rounded-xl border border-white/[0.08] bg-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
              <h2 className="text-lg font-semibold text-foreground">User Details</h2>
              <button onClick={() => { setDetailOpen(false); setEditing(false); }} className="text-muted-foreground hover:text-foreground">
                <X className="size-5" />
              </button>
            </div>

            {detailLoading ? (
              <div className="p-12 text-center">
                <Loader2 className="size-8 animate-spin text-primary mx-auto" />
              </div>
            ) : selectedUser ? (
              <div className="p-6 space-y-6">
                {/* User Info */}
                <div className="grid grid-cols-2 gap-4">
                  {editing ? (
                    <>
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Telegram</Label>
                        <Input value={editForm.telegramUsername} onChange={(e) => setEditForm({ ...editForm, telegramUsername: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <select
                          className="w-full h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] text-foreground text-sm px-3"
                          value={editForm.status}
                          onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                        >
                          <option value="ACTIVE">Active</option>
                          <option value="SUSPENDED">Suspended</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-xs text-muted-foreground">Name</p>
                        <p className="text-sm font-medium text-foreground">{selectedUser.name || "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="text-sm font-medium text-foreground">{selectedUser.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="text-sm font-medium text-foreground">{selectedUser.phone || "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Telegram</p>
                        <p className="text-sm font-medium text-foreground">{selectedUser.telegramUsername || "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          selectedUser.status === "ACTIVE" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                        }`}>
                          {selectedUser.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Joined</p>
                        <p className="text-sm font-medium text-foreground">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Packages */}
                {selectedUser.userPackages.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">Active Packages</h3>
                    <div className="space-y-3">
                      {selectedUser.userPackages.map((up) => (
                        <UserPackageCard
                          key={up.id}
                          userId={selectedUser.id}
                          userPackage={up}
                          onUpdated={() => fetchUserDetail(selectedUser.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3 pt-2">
                  {editing ? (
                    <>
                      <Button onClick={handleUpdateUser} className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setEditing(false)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" onClick={() => setEditing(true)}>
                        <Edit className="size-4 mr-2" /> Edit User
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleToggleStatus(selectedUser.id, selectedUser.status)}
                      >
                        {selectedUser.status === "ACTIVE" ? <Ban className="size-4 mr-2" /> : <CheckCircle className="size-4 mr-2" />}
                        {selectedUser.status === "ACTIVE" ? "Suspend" : "Activate"}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Editable Package Card ───────────────────────────────────────
function UserPackageCard({
  userId,
  userPackage: up,
  onUpdated,
}: {
  userId: string;
  userPackage: UserDetail["userPackages"][number];
  onUpdated: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [balance, setBalance] = useState(up.currentBalance.toString());
  const [profit, setProfit] = useState(up.currentProfit.toString());
  const [profitPct, setProfitPct] = useState(up.profitPercentage.toString());

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}/balance`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentBalance: parseFloat(balance) || 0,
          currentProfit: parseFloat(profit) || 0,
          profitPercentage: parseFloat(profitPct) || 0,
        }),
      });
      if (!res.ok) throw new Error("Failed to update");
      toast.success("Balance & profit updated!");
      setIsEditing(false);
      onUpdated();
    } catch {
      toast.error("Failed to update balance");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 rounded-lg border border-white/[0.06] bg-white/[0.01]">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-medium text-foreground">
          {up.package.name} (${up.package.accountSize.toLocaleString()})
        </p>
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              up.status === "ACTIVE"
                ? "bg-green-500/10 text-green-500"
                : "bg-yellow-500/10 text-yellow-500"
            }`}
          >
            {up.status}
          </span>
          {up.status === "ACTIVE" && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 rounded hover:bg-white/[0.06] text-muted-foreground hover:text-foreground transition-colors"
              title="Edit balance & profit"
            >
              <Edit className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Balance ($)</Label>
              <Input
                type="number"
                step="0.01"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Profit ($)</Label>
              <Input
                type="number"
                step="0.01"
                value={profit}
                onChange={(e) => setProfit(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Profit %</Label>
              <Input
                type="number"
                step="0.1"
                value={profitPct}
                onChange={(e) => setProfitPct(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={saving}
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-7 text-xs px-3"
            >
              {saving ? "Saving..." : "Update"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setBalance(up.currentBalance.toString());
                setProfit(up.currentProfit.toString());
                setProfitPct(up.profitPercentage.toString());
              }}
              className="h-7 text-xs px-3"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <p className="text-muted-foreground">Balance</p>
            <p className="font-semibold text-foreground">
              ${up.currentBalance.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Profit</p>
            <p className="font-semibold text-primary">
              ${up.currentProfit.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Profit %</p>
            <p className="font-semibold text-foreground">
              {up.profitPercentage}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
