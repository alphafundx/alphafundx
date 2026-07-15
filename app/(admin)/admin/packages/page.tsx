"use client";

import { useEffect, useState, useCallback } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Edit,
  Trash2,
  X,
  ToggleLeft,
  ToggleRight,
  Star,
  Loader2,
  Package,
} from "lucide-react";
import { toast } from "sonner";

interface DbPackage {
  id: string;
  name: string;
  accountSize: number;
  description: string | null;
  features: string[];
  rules: string[];
  originalPrice: number;
  discountedPrice: number | null;
  discountPercentage: number | null;
  isActive: boolean;
  isPopular: boolean;
  displayOrder: number;
  currency: string;
  _count: { orders: number; userPackages: number };
}

const emptyForm = {
  name: "",
  accountSize: 0,
  description: "",
  originalPrice: 0,
  discountedPrice: 0,
  discountPercentage: 0,
  features: "",
  rules: "",
  isPopular: false,
  isActive: true,
  displayOrder: 0,
};

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<DbPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchPackages = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/packages");
      if (!res.ok) throw new Error("Failed to fetch packages");
      const data = await res.json();
      setPackages(data);
    } catch {
      toast.error("Failed to load packages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...emptyForm, displayOrder: packages.length + 1 });
    setModalOpen(true);
  };

  const openEdit = (pkg: DbPackage) => {
    setEditingId(pkg.id);
    setForm({
      name: pkg.name,
      accountSize: pkg.accountSize,
      description: pkg.description || "",
      originalPrice: pkg.originalPrice,
      discountedPrice: pkg.discountedPrice || 0,
      discountPercentage: pkg.discountPercentage || 0,
      features: Array.isArray(pkg.features) ? pkg.features.join("\n") : "",
      rules: Array.isArray(pkg.rules) ? pkg.rules.join("\n") : "",
      isPopular: pkg.isPopular,
      isActive: pkg.isActive,
      displayOrder: pkg.displayOrder,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.accountSize || !form.originalPrice) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: form.name,
        accountSize: Number(form.accountSize),
        description: form.description || null,
        originalPrice: Number(form.originalPrice),
        discountedPrice: Number(form.discountedPrice) || null,
        discountPercentage: Number(form.discountPercentage) || 0,
        features: form.features.split("\n").filter(Boolean),
        rules: form.rules.split("\n").filter(Boolean),
        isPopular: form.isPopular,
        isActive: form.isActive,
        displayOrder: Number(form.displayOrder),
      };

      if (editingId) {
        const res = await fetch("/api/admin/packages", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ packageId: editingId, ...payload }),
        });
        if (!res.ok) throw new Error("Failed to update package");
        toast.success("Package updated successfully");
      } else {
        const res = await fetch("/api/admin/packages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create package");
        toast.success("Package created successfully");
      }

      setModalOpen(false);
      fetchPackages();
    } catch {
      toast.error(editingId ? "Failed to update package" : "Failed to create package");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this package? If it has existing orders, it will be disabled instead.")) return;
    try {
      const res = await fetch("/api/admin/packages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: id }),
      });
      if (!res.ok) throw new Error("Failed to delete package");
      const result = await res.json();
      toast.success(result.message);
      fetchPackages();
    } catch {
      toast.error("Failed to delete package");
    }
  };

  const handleToggleActive = async (pkg: DbPackage) => {
    try {
      const res = await fetch("/api/admin/packages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: pkg.id, isActive: !pkg.isActive }),
      });
      if (!res.ok) throw new Error("Failed to toggle");
      toast.success(`Package ${!pkg.isActive ? "enabled" : "disabled"}`);
      fetchPackages();
    } catch {
      toast.error("Failed to toggle package status");
    }
  };

  const handleTogglePopular = async (pkg: DbPackage) => {
    try {
      const res = await fetch("/api/admin/packages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: pkg.id, isPopular: !pkg.isPopular }),
      });
      if (!res.ok) throw new Error("Failed to toggle");
      toast.success(`${!pkg.isPopular ? "Marked" : "Unmarked"} as popular`);
      fetchPackages();
    } catch {
      toast.error("Failed to update package");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Package Management"
          description="Manage your trading challenge packages."
        />
        <Button onClick={openCreate} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="size-4 mr-2" /> Add Package
        </Button>
      </div>

      {/* Packages Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-[300px] rounded-xl border border-white/[0.06] bg-card animate-pulse" />
          ))}
        </div>
      ) : packages.length === 0 ? (
        <div className="rounded-xl border border-white/[0.06] bg-card p-12 text-center">
          <Package className="size-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-foreground font-medium mb-2">No packages yet</p>
          <p className="text-muted-foreground text-sm mb-6">Create your first trading challenge package</p>
          <Button onClick={openCreate} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="size-4 mr-2" /> Create Package
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-xl border bg-card p-6 relative transition-all duration-200 ${
                pkg.isActive ? "border-white/[0.06]" : "border-red-500/20 opacity-60"
              }`}
            >
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                {pkg.isPopular && (
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center gap-1">
                    <Star className="size-3" /> Popular
                  </span>
                )}
                {!pkg.isActive && (
                  <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs font-semibold">
                    Disabled
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground text-xs ml-auto">
                  Order #{pkg.displayOrder}
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground">{pkg.name}</h3>
              <p className="text-2xl font-bold text-primary mt-1">
                ${pkg.accountSize.toLocaleString()}
              </p>

              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-xl font-bold text-foreground">
                  ${pkg.discountedPrice || pkg.originalPrice}
                </span>
                {pkg.discountedPrice && pkg.discountedPrice < pkg.originalPrice && (
                  <>
                    <span className="text-sm text-muted-foreground line-through">${pkg.originalPrice}</span>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                      {pkg.discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>

              <div className="mt-3 text-xs text-muted-foreground">
                {pkg._count.orders} orders • {pkg._count.userPackages} active users
              </div>

              {/* Features preview */}
              {Array.isArray(pkg.features) && pkg.features.length > 0 && (
                <div className="mt-4 space-y-1">
                  {(pkg.features as string[]).slice(0, 3).map((f, i) => (
                    <p key={i} className="text-xs text-muted-foreground">• {f}</p>
                  ))}
                  {pkg.features.length > 3 && (
                    <p className="text-xs text-muted-foreground/60">+{pkg.features.length - 3} more</p>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/[0.06]">
                <Button variant="outline" size="sm" onClick={() => openEdit(pkg)}>
                  <Edit className="size-3 mr-1" /> Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleToggleActive(pkg)}>
                  {pkg.isActive ? <ToggleRight className="size-3 mr-1 text-primary" /> : <ToggleLeft className="size-3 mr-1" />}
                  {pkg.isActive ? "Active" : "Disabled"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleTogglePopular(pkg)}>
                  <Star className={`size-3 mr-1 ${pkg.isPopular ? "text-yellow-400 fill-yellow-400" : ""}`} />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(pkg.id)} className="ml-auto text-red-400 hover:text-red-300 hover:border-red-500/30">
                  <Trash2 className="size-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
          <div className="w-full max-w-xl mx-4 max-h-[90vh] overflow-y-auto rounded-xl border border-white/[0.08] bg-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
              <h2 className="text-lg font-semibold text-foreground">
                {editingId ? "Edit Package" : "Create Package"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Package Name *</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Professional" />
                </div>
                <div className="space-y-2">
                  <Label>Account Size *</Label>
                  <Input type="number" value={form.accountSize || ""} onChange={(e) => setForm({ ...form, accountSize: Number(e.target.value) })} placeholder="e.g. 50000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Original Price *</Label>
                  <Input type="number" value={form.originalPrice || ""} onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Discounted Price</Label>
                  <Input type="number" value={form.discountedPrice || ""} onChange={(e) => setForm({ ...form, discountedPrice: Number(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Discount %</Label>
                  <Input type="number" value={form.discountPercentage || ""} onChange={(e) => setForm({ ...form, discountPercentage: Number(e.target.value) })} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input type="number" value={form.displayOrder || ""} onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })} />
              </div>

              <div className="space-y-2">
                <Label>Features (one per line)</Label>
                <textarea
                  className="w-full min-h-[100px] rounded-lg bg-white/[0.04] border border-white/[0.08] text-foreground text-sm p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  placeholder="$50,000 Account&#10;85% Profit Split&#10;No Time Limit"
                />
              </div>

              <div className="space-y-2">
                <Label>Rules (one per line)</Label>
                <textarea
                  className="w-full min-h-[80px] rounded-lg bg-white/[0.04] border border-white/[0.08] text-foreground text-sm p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={form.rules}
                  onChange={(e) => setForm({ ...form, rules: e.target.value })}
                  placeholder="Daily drawdown: 5%&#10;Max drawdown: 10%"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isPopular}
                    onChange={(e) => setForm({ ...form, isPopular: e.target.checked })}
                    className="accent-[#26FF5E]"
                  />
                  <span className="text-sm text-foreground">Popular</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="accent-[#26FF5E]"
                  />
                  <span className="text-sm text-foreground">Active</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-white/[0.06]">
              <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90">
                {saving && <Loader2 className="size-4 animate-spin mr-2" />}
                {editingId ? "Update Package" : "Create Package"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
