"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, X, Star, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  content: string;
  isActive: boolean;
}

const initialTestimonials: Testimonial[] = [
  { id: "1", name: "Alex Thompson", rating: 5, content: "AlphaFundX changed my trading career. Got funded within 2 weeks and already withdrawn over $5,000 in profits!", isActive: true },
  { id: "2", name: "Sarah Chen", rating: 5, content: "The most transparent prop firm I've worked with. No hidden rules, no surprises. Highly recommended.", isActive: true },
  { id: "3", name: "Michael Rivera", rating: 5, content: "Instant payouts, great support team, and fair rules. This is exactly what traders need.", isActive: true },
  { id: "4", name: "Emma Williams", rating: 4, content: "Started with the $25K account and scaled up to $100K. The profit split is amazing!", isActive: true },
  { id: "5", name: "David Park", rating: 5, content: "The scaling plan is incredible. Went from $50K to $200K in under 3 months.", isActive: true },
  { id: "6", name: "Fatima Al-Rashid", rating: 5, content: "As a forex trader from Dubai, finding a trustworthy prop firm was crucial. AlphaFundX exceeded all my expectations.", isActive: true },
];

const emptyTestimonial = { name: "", rating: 5, content: "", isActive: true };

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyTestimonial);

  const openCreate = () => { setEditingId(null); setForm(emptyTestimonial); setModalOpen(true); };

  const openEdit = (t: Testimonial) => { setEditingId(t.id); setForm({ name: t.name, rating: t.rating, content: t.content, isActive: t.isActive }); setModalOpen(true); };

  const handleSave = () => {
    if (!form.name || !form.content) { toast.error("Name and content are required"); return; }
    if (editingId) {
      setTestimonials((prev) => prev.map((t) => (t.id === editingId ? { ...form, id: editingId } : t)));
      toast.success("Testimonial updated");
    } else {
      setTestimonials((prev) => [...prev, { ...form, id: Date.now().toString() }]);
      toast.success("Testimonial created");
    }
    setModalOpen(false);
  };

  const toggleActive = (id: string) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t)));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    toast.success("Testimonial deleted");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Testimonial Management" description="Manage testimonials displayed on the marketing page.">
        <Button onClick={openCreate} className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
          <Plus className="size-4 mr-2" /> Add Testimonial
        </Button>
      </PageHeader>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {testimonials.map((t) => (
          <div key={t.id} className={`rounded-xl border bg-card p-5 space-y-3 transition-all ${t.isActive ? "border-white/[0.06]" : "border-white/[0.03] opacity-50"}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`size-3 ${i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"}`} />
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => toggleActive(t.id)} title={t.isActive ? "Disable" : "Enable"}>
                {t.isActive ? <ToggleRight className="size-5 text-primary" /> : <ToggleLeft className="size-5 text-muted-foreground" />}
              </button>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">&ldquo;{t.content}&rdquo;</p>

            <div className="flex items-center gap-2 pt-2 border-t border-white/[0.04]">
              <button onClick={() => openEdit(t)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.04] text-xs text-muted-foreground hover:text-foreground hover:bg-white/[0.08] transition-colors">
                <Edit className="size-3" /> Edit
              </button>
              <button onClick={() => deleteTestimonial(t.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.04] text-xs text-muted-foreground hover:text-red-500 hover:bg-red-500/5 transition-colors">
                <Trash2 className="size-3" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/[0.08] bg-card shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <h3 className="text-lg font-semibold text-foreground">{editingId ? "Edit Testimonial" : "Add Testimonial"}</h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-muted-foreground"><X className="size-5" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Trader name" className="bg-white/[0.02]" />
              </div>
              <div className="space-y-2">
                <Label>Rating (1–5)</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button key={r} onClick={() => setForm({ ...form, rating: r })} className="p-1">
                      <Star className={`size-6 transition-colors ${r <= form.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30 hover:text-yellow-400/50"}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Content</Label>
                <textarea rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full bg-white/[0.02] border border-white/[0.06] rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 resize-none text-sm" placeholder="What the trader said..." />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/[0.06]">
              <Button variant="outline" onClick={() => setModalOpen(false)} className="border-white/[0.08]">Cancel</Button>
              <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">{editingId ? "Save" : "Create"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
