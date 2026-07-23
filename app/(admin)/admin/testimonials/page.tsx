"use client";

import { useEffect, useState, useCallback } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, X, Star, ToggleLeft, ToggleRight, Loader2, MessageSquareQuote } from "lucide-react";
import { toast } from "sonner";

interface ApiTestimonial {
  id: string;
  userName: string;
  userImage: string | null;
  rating: number;
  content: string;
  isActive: boolean;
  createdAt: string;
}

const emptyForm = { userName: "", rating: 5, content: "", isActive: true };

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<ApiTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setTestimonials(data);
    } catch {
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (t: ApiTestimonial) => {
    setEditingId(t.id);
    setForm({ userName: t.userName, rating: t.rating, content: t.content, isActive: t.isActive });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.userName || !form.content) {
      toast.error("Name and content are required");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        const res = await fetch("/api/admin/testimonials", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ testimonialId: editingId, ...form }),
        });
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.details?.[0]?.message || errorData.error || "Failed to update");
        }
        toast.success("Testimonial updated");
      } else {
        const res = await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.details?.[0]?.message || errorData.error || "Failed to create");
        }
        toast.success("Testimonial created");
      }
      setModalOpen(false);
      fetchTestimonials();
    } catch (err: any) {
      toast.error(err.message || "Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (t: ApiTestimonial) => {
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testimonialId: t.id, isActive: !t.isActive }),
      });
      if (!res.ok) throw new Error("Failed to toggle");
      toast.success(`Testimonial ${!t.isActive ? "enabled" : "disabled"}`);
      fetchTestimonials();
    } catch {
      toast.error("Failed to update testimonial");
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testimonialId: id }),
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Testimonial deleted");
      fetchTestimonials();
    } catch {
      toast.error("Failed to delete testimonial");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <PageHeader title="Testimonials" description="Manage customer testimonials displayed on the homepage." />
        <Button onClick={openCreate} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="size-4 mr-2" /> Add Testimonial
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-[200px] rounded-xl border border-white/[0.06] bg-card animate-pulse" />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="rounded-xl border border-white/[0.06] bg-card p-12 text-center">
          <MessageSquareQuote className="size-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-foreground font-medium mb-2">No testimonials yet</p>
          <Button onClick={openCreate} className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4">
            <Plus className="size-4 mr-2" /> Add First Testimonial
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className={`rounded-xl border bg-card p-6 transition-all ${t.isActive ? "border-white/[0.06]" : "border-red-500/20 opacity-60"}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-white/10"}`}
                    />
                  ))}
                </div>
                {!t.isActive && (
                  <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs font-semibold">
                    Hidden
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                &ldquo;{t.content}&rdquo;
              </p>
              <p className="text-sm font-semibold text-foreground">{t.userName}</p>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.06]">
                <Button variant="outline" size="sm" onClick={() => openEdit(t)}>
                  <Edit className="size-3 mr-1" /> Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => toggleActive(t)}>
                  {t.isActive ? <ToggleRight className="size-3 mr-1 text-primary" /> : <ToggleLeft className="size-3 mr-1" />}
                  {t.isActive ? "Active" : "Hidden"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => deleteTestimonial(t.id)} className="ml-auto text-red-400 hover:text-red-300 hover:border-red-500/30">
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
          <div className="w-full max-w-lg mx-4 rounded-xl border border-white/[0.08] bg-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
              <h2 className="text-lg font-semibold text-foreground">
                {editingId ? "Edit Testimonial" : "Add Testimonial"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="size-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Customer Name *</Label>
                <Input value={form.userName} onChange={(e) => setForm({ ...form, userName: e.target.value })} placeholder="e.g. Alex Thompson" />
              </div>
              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      className="p-1"
                    >
                      <Star className={`size-6 transition-colors ${star <= form.rating ? "text-yellow-400 fill-yellow-400" : "text-white/10 hover:text-yellow-400/50"}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Testimonial Content *</Label>
                <textarea
                  className="w-full min-h-[100px] rounded-lg bg-white/[0.04] border border-white/[0.08] text-foreground text-sm p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="What did the customer say?"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="accent-[#26FF5E]"
                />
                <span className="text-sm text-foreground">Show on homepage</span>
              </label>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-white/[0.06]">
              <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90">
                {saving && <Loader2 className="size-4 animate-spin mr-2" />}
                {editingId ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
