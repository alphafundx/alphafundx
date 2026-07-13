"use client";

import { useState } from "react";
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
} from "lucide-react";
import { toast } from "sonner";
import { usePackageStore, type PackageItem } from "@/lib/stores/package-store";

const emptyForm = {
  name: "",
  accountSize: 0,
  originalPrice: 0,
  discountedPrice: 0,
  discountPercentage: 0,
  profitSplit: "80%",
  features: "",
  isPopular: false,
  isActive: true,
};

export default function AdminPackagesPage() {
  const { packages, addPackage, updatePackage, deletePackage, toggleActive } = usePackageStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (pkg: PackageItem) => {
    setEditingId(pkg.id);
    setForm({
      name: pkg.name,
      accountSize: pkg.accountSize,
      originalPrice: pkg.originalPrice,
      discountedPrice: pkg.discountedPrice,
      discountPercentage: pkg.discountPercentage,
      profitSplit: pkg.profitSplit,
      features: pkg.features.join("\n"),
      isPopular: pkg.isPopular,
      isActive: pkg.isActive,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name || form.accountSize <= 0) {
      toast.error("Name and account size are required");
      return;
    }

    const featuresList = form.features
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    if (editingId) {
      updatePackage(editingId, {
        name: form.name,
        accountSize: form.accountSize,
        originalPrice: form.originalPrice,
        discountedPrice: form.discountedPrice,
        discountPercentage: form.discountPercentage,
        profitSplit: form.profitSplit,
        features: featuresList,
        isPopular: form.isPopular,
        isActive: form.isActive,
      });
      toast.success("Package updated — changes reflected on the home page");
    } else {
      addPackage({
        name: form.name,
        accountSize: form.accountSize,
        originalPrice: form.originalPrice,
        discountedPrice: form.discountedPrice,
        discountPercentage: form.discountPercentage,
        profitSplit: form.profitSplit,
        features: featuresList,
        isPopular: form.isPopular,
        isActive: form.isActive,
      });
      toast.success("Package created — now visible on the home page");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deletePackage(id);
    toast.success("Package deleted — removed from the home page");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Manage Packages" description="Create, edit, and manage the funding packages that users see and purchase.">
        <Button onClick={openCreate} className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
          <Plus className="size-4 mr-2" />
          Add New Package
        </Button>
      </PageHeader>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-xl border bg-card p-6 space-y-4 transition-all ${
              pkg.isActive ? "border-white/[0.06]" : "border-white/[0.03] opacity-50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground">{pkg.name}</h3>
                  {pkg.isPopular && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase">
                      <Star className="size-3 fill-primary" /> Popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  ${pkg.accountSize.toLocaleString()} Account • {pkg.profitSplit} Split
                </p>
              </div>
              <button
                onClick={() => toggleActive(pkg.id)}
                className="text-muted-foreground hover:text-primary transition-colors"
                title={pkg.isActive ? "Disable (hide from users)" : "Enable (show to users)"}
              >
                {pkg.isActive ? (
                  <ToggleRight className="size-6 text-primary" />
                ) : (
                  <ToggleLeft className="size-6" />
                )}
              </button>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">${pkg.discountedPrice}</span>
              {pkg.originalPrice !== pkg.discountedPrice && (
                <>
                  <span className="text-sm text-muted-foreground line-through">${pkg.originalPrice}</span>
                  <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold">
                    -{pkg.discountPercentage}%
                  </span>
                </>
              )}
            </div>

            {/* Features preview */}
            <div className="text-xs text-muted-foreground space-y-1 border-t border-white/[0.04] pt-3">
              {pkg.features.slice(0, 3).map((f, i) => (
                <p key={i}>• {f}</p>
              ))}
              {pkg.features.length > 3 && (
                <p className="text-primary/70">+{pkg.features.length - 3} more</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/[0.04]">
              <button
                onClick={() => openEdit(pkg)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.08] transition-colors"
              >
                <Edit className="size-3.5" /> Edit
              </button>
              <button
                onClick={() => handleDelete(pkg.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] text-sm text-muted-foreground hover:text-red-500 hover:bg-red-500/5 transition-colors"
              >
                <Trash2 className="size-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}

        {/* Add New Package Card */}
        <button
          onClick={openCreate}
          className="rounded-xl border-2 border-dashed border-white/[0.08] bg-transparent p-6 flex flex-col items-center justify-center gap-3 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all min-h-[250px]"
        >
          <Plus className="size-8" />
          <span className="text-sm font-medium">Add New Package</span>
        </button>
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.08] bg-card shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] sticky top-0 bg-card z-10">
              <h3 className="text-lg font-semibold text-foreground">
                {editingId ? "Edit Package" : "Create New Package"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-muted-foreground">
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <Label>Package Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Professional" className="bg-white/[0.02]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Account Size ($)</Label>
                  <Input type="number" value={form.accountSize || ""} onChange={(e) => setForm({ ...form, accountSize: Number(e.target.value) })} className="bg-white/[0.02]" />
                </div>
                <div className="space-y-2">
                  <Label>Profit Split</Label>
                  <Input value={form.profitSplit} onChange={(e) => setForm({ ...form, profitSplit: e.target.value })} placeholder="e.g. 85%" className="bg-white/[0.02]" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Original Price ($)</Label>
                  <Input type="number" value={form.originalPrice || ""} onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value) })} className="bg-white/[0.02]" />
                </div>
                <div className="space-y-2">
                  <Label>Sale Price ($)</Label>
                  <Input type="number" value={form.discountedPrice || ""} onChange={(e) => setForm({ ...form, discountedPrice: Number(e.target.value) })} className="bg-white/[0.02]" />
                </div>
                <div className="space-y-2">
                  <Label>Discount %</Label>
                  <Input type="number" value={form.discountPercentage || ""} onChange={(e) => setForm({ ...form, discountPercentage: Number(e.target.value) })} className="bg-white/[0.02]" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Features (one per line)</Label>
                <textarea
                  rows={5}
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/[0.06] rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 resize-none text-sm"
                  placeholder={"$50,000 Account\n85% Profit Split\nNo Time Limit"}
                />
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-2 border-t border-white/[0.04]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Mark as Popular</p>
                    <p className="text-xs text-muted-foreground">Highlights this package on the home page</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, isPopular: !form.isPopular })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      form.isPopular ? "bg-primary" : "bg-white/[0.1]"
                    }`}
                  >
                    <span className={`inline-block size-4 rounded-full bg-white transition-transform ${form.isPopular ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Active / Visible</p>
                    <p className="text-xs text-muted-foreground">Visible to users on the marketing page</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, isActive: !form.isActive })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      form.isActive ? "bg-primary" : "bg-white/[0.1]"
                    }`}
                  >
                    <span className={`inline-block size-4 rounded-full bg-white transition-transform ${form.isActive ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/[0.06]">
              <Button variant="outline" onClick={() => setModalOpen(false)} className="border-white/[0.08]">Cancel</Button>
              <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
                {editingId ? "Save Changes" : "Create Package"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
