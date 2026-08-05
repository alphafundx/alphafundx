"use client";

import { useEffect, useState, useCallback } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tag,
  Plus,
  Trash2,
  Loader2,
  X,
  ToggleLeft,
  ToggleRight,
  Percent,
  DollarSign,
  Copy,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

interface DiscountCode {
  id: string;
  code: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  maxUses: number | null;
  currentUses: number;
  minOrderAmount: number | null;
  expiresAt: string | null;
  isActive: boolean;
  applicablePackageIds: string[];
  createdAt: string;
  _count: { orders: number };
}

interface PkgOption {
  id: string;
  name: string;
  accountSize: number;
}

export default function AdminDiscountCodesPage() {
  const [codes, setCodes] = useState<DiscountCode[]>([]);
  const [packages, setPackages] = useState<PkgOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form state
  const [form, setForm] = useState({
    code: "",
    type: "PERCENTAGE" as "PERCENTAGE" | "FIXED",
    value: "",
    maxUses: "",
    minOrderAmount: "",
    expiresAt: "",
    isActive: true,
    applicablePackageIds: [] as string[],
  });

  const fetchCodes = useCallback(async () => {
    try {
      const [codesRes, pkgRes] = await Promise.all([
        fetch("/api/admin/discount-codes"),
        fetch("/api/packages"),
      ]);
      if (codesRes.ok) {
        const data = await codesRes.json();
        setCodes(data);
      }
      if (pkgRes.ok) {
        const data = await pkgRes.json();
        setPackages(data);
      }
    } catch {
      toast.error("Failed to load discount codes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCodes();
  }, [fetchCodes]);

  const resetForm = () => {
    setForm({
      code: "",
      type: "PERCENTAGE",
      value: "",
      maxUses: "",
      minOrderAmount: "",
      expiresAt: "",
      isActive: true,
      applicablePackageIds: [],
    });
  };

  const handleCreate = async () => {
    if (!form.code.trim()) {
      toast.error("Code is required");
      return;
    }
    if (!form.value || parseFloat(form.value) <= 0) {
      toast.error("Value must be greater than 0");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/discount-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: form.code,
          type: form.type,
          value: parseFloat(form.value),
          maxUses: form.maxUses ? parseInt(form.maxUses) : null,
          minOrderAmount: form.minOrderAmount ? parseFloat(form.minOrderAmount) : null,
          expiresAt: form.expiresAt || null,
          isActive: form.isActive,
          applicablePackageIds: form.applicablePackageIds,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create");
      }

      toast.success("Discount code created!");
      setShowForm(false);
      resetForm();
      fetchCodes();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create discount code");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (id: string, currentActive: boolean) => {
    try {
      const res = await fetch("/api/admin/discount-codes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: !currentActive }),
      });
      if (!res.ok) throw new Error("Failed to update");
      toast.success(currentActive ? "Code deactivated" : "Code activated");
      fetchCodes();
    } catch {
      toast.error("Failed to update discount code");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this discount code? This cannot be undone.")) return;

    try {
      const res = await fetch(`/api/admin/discount-codes?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Discount code deleted");
      fetchCodes();
    } catch {
      toast.error("Failed to delete discount code");
    }
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast.success("Code copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isExpired = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  const isMaxedOut = (code: DiscountCode) => {
    if (code.maxUses === null) return false;
    return code.currentUses >= code.maxUses;
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <PageHeader title="Discount Codes" description="Loading..." />
        <div className="flex justify-center py-12">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Discount Codes"
          description="Create and manage discount codes for your packages."
        />
        <Button
          onClick={() => { setShowForm(!showForm); resetForm(); }}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {showForm ? <X className="size-4 mr-2" /> : <Plus className="size-4 mr-2" />}
          {showForm ? "Cancel" : "New Code"}
        </Button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="rounded-xl border border-primary/20 bg-card p-6 space-y-5 animate-in fade-in slide-in-from-top-2">
          <h3 className="text-lg font-semibold text-foreground">Create Discount Code</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Code *</Label>
              <Input
                value={form.code}
                onChange={(e) => setForm((p) => ({ ...p, code: e.target.value.toUpperCase() }))}
                placeholder="e.g. SUMMER25"
                className="uppercase"
              />
            </div>

            <div className="space-y-2">
              <Label>Discount Type</Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, type: "PERCENTAGE" }))}
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                    form.type === "PERCENTAGE"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-white/[0.06] bg-white/[0.02] text-muted-foreground hover:bg-white/[0.04]"
                  }`}
                >
                  <Percent className="size-4" />
                  Percentage
                </button>
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, type: "FIXED" }))}
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                    form.type === "FIXED"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-white/[0.06] bg-white/[0.02] text-muted-foreground hover:bg-white/[0.04]"
                  }`}
                >
                  <DollarSign className="size-4" />
                  Fixed Amount
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>
                Value * {form.type === "PERCENTAGE" ? "(% off)" : "($ off)"}
              </Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                max={form.type === "PERCENTAGE" ? 100 : undefined}
                value={form.value}
                onChange={(e) => setForm((p) => ({ ...p, value: e.target.value }))}
                placeholder={form.type === "PERCENTAGE" ? "e.g. 25" : "e.g. 50"}
              />
            </div>

            <div className="space-y-2">
              <Label>Usage Limit (optional)</Label>
              <Input
                type="number"
                min="1"
                value={form.maxUses}
                onChange={(e) => setForm((p) => ({ ...p, maxUses: e.target.value }))}
                placeholder="Unlimited"
              />
            </div>

            <div className="space-y-2">
              <Label>Min. Order Amount (optional)</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={form.minOrderAmount}
                onChange={(e) => setForm((p) => ({ ...p, minOrderAmount: e.target.value }))}
                placeholder="No minimum"
              />
            </div>

            <div className="space-y-2">
              <Label>Expiry Date (optional)</Label>
              <Input
                type="datetime-local"
                value={form.expiresAt}
                onChange={(e) => setForm((p) => ({ ...p, expiresAt: e.target.value }))}
              />
            </div>

            {/* Applicable Packages */}
            <div className="space-y-2 sm:col-span-2">
              <Label>Applicable Packages (leave empty = all packages)</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {packages.map((pkg) => {
                  const selected = form.applicablePackageIds.includes(pkg.id);
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => {
                        setForm((p) => ({
                          ...p,
                          applicablePackageIds: selected
                            ? p.applicablePackageIds.filter((id) => id !== pkg.id)
                            : [...p.applicablePackageIds, pkg.id],
                        }));
                      }}
                      className={`px-3 py-2 rounded-lg border text-xs font-medium text-left transition-colors ${
                        selected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-white/[0.06] bg-white/[0.02] text-muted-foreground hover:bg-white/[0.04]"
                      }`}
                    >
                      {pkg.name} (${(pkg.accountSize / 1000).toFixed(0)}K)
                    </button>
                  );
                })}
              </div>
              {form.applicablePackageIds.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {form.applicablePackageIds.length} package(s) selected
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleCreate}
              disabled={saving}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {saving ? "Creating..." : "Create Code"}
            </Button>
            <Button
              variant="outline"
              onClick={() => { setShowForm(false); resetForm(); }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Codes Table */}
      <div className="rounded-xl border border-white/[0.06] bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-white/[0.02] border-b border-white/[0.06]">
              <tr>
                <th className="px-6 py-4 font-semibold">Code</th>
                <th className="px-6 py-4 font-semibold">Discount</th>
                <th className="px-6 py-4 font-semibold">Packages</th>
                <th className="px-6 py-4 font-semibold">Usage</th>
                <th className="px-6 py-4 font-semibold">Expires</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {codes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                    <Tag className="size-8 mx-auto mb-3 opacity-40" />
                    <p>No discount codes yet</p>
                  </td>
                </tr>
              ) : (
                codes.map((dc) => {
                  const expired = isExpired(dc.expiresAt);
                  const maxed = isMaxedOut(dc);
                  const effectivelyActive = dc.isActive && !expired && !maxed;

                  return (
                    <tr
                      key={dc.id}
                      className={`border-b border-white/[0.04] hover:bg-white/[0.01] ${
                        !effectivelyActive ? "opacity-60" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-foreground tracking-wider">
                            {dc.code}
                          </span>
                          <button
                            onClick={() => copyCode(dc.code, dc.id)}
                            className="p-1 rounded hover:bg-white/[0.06] text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {copiedId === dc.id ? (
                              <CheckCircle className="size-3.5 text-primary" />
                            ) : (
                              <Copy className="size-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-foreground font-medium">
                        {dc.type === "PERCENTAGE"
                          ? `${dc.value}% off`
                          : `$${dc.value.toFixed(2)} off`}
                      </td>
                      <td className="px-6 py-4">
                        {dc.applicablePackageIds && dc.applicablePackageIds.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {dc.applicablePackageIds.map((pkgId) => {
                              const pkg = packages.find((p) => p.id === pkgId);
                              return (
                                <span
                                  key={pkgId}
                                  className="px-1.5 py-0.5 rounded bg-white/[0.04] text-xs text-muted-foreground"
                                >
                                  {pkg ? pkg.name : pkgId.slice(0, 6)}
                                </span>
                              );
                            })}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">All</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {dc.currentUses}
                        {dc.maxUses !== null ? ` / ${dc.maxUses}` : " / ∞"}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {dc.expiresAt ? (
                          <span className={expired ? "text-red-400" : ""}>
                            {new Date(dc.expiresAt).toLocaleDateString()}
                            {expired && " (expired)"}
                          </span>
                        ) : (
                          "Never"
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            effectivelyActive
                              ? "bg-green-500/10 text-green-500"
                              : expired
                              ? "bg-red-500/10 text-red-400"
                              : maxed
                              ? "bg-orange-500/10 text-orange-400"
                              : "bg-white/5 text-muted-foreground"
                          }`}
                        >
                          {expired
                            ? "Expired"
                            : maxed
                            ? "Limit Reached"
                            : dc.isActive
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => toggleActive(dc.id, dc.isActive)}
                            className="p-1.5 rounded hover:bg-white/[0.06] text-muted-foreground hover:text-foreground transition-colors"
                            title={dc.isActive ? "Deactivate" : "Activate"}
                          >
                            {dc.isActive ? (
                              <ToggleRight className="size-5 text-primary" />
                            ) : (
                              <ToggleLeft className="size-5" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(dc.id)}
                            className="p-1.5 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
