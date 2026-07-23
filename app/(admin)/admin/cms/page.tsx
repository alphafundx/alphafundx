"use client";

import { useState, useEffect, useCallback } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Section = "hero" | "about" | "features" | "faq" | "rules" | "stats" | "contact" | "footer";

interface CMSSection {
  id: Section;
  label: string;
  fields: { key: string; label: string; type: "text" | "textarea"; value: string }[];
}

const initialSections: CMSSection[] = [
  {
    id: "hero",
    label: "Hero Section",
    fields: [
      { key: "title", label: "Heading", type: "text", value: "Trade Without Limits" },
      { key: "subtitle", label: "Subheading", type: "textarea", value: "Prove your trading skills and get funded with up to $200,000 in capital. Keep up to 90% profit split with no time limits." },
      { key: "cta_primary", label: "Primary CTA Text", type: "text", value: "Get Started Now" },
      { key: "cta_secondary", label: "Secondary CTA Text", type: "text", value: "How It Works" },
    ],
  },
  {
    id: "about",
    label: "About Section",
    fields: [
      { key: "title", label: "Title", type: "text", value: "Built by Traders, For Traders" },
      { key: "description", label: "Description", type: "textarea", value: "AlphaFundX was founded with a simple belief: lack of capital shouldn't stop skilled traders from building a career." },
    ],
  },
  {
    id: "stats",
    label: "Stats Bar",
    fields: [
      { key: "stat1", label: "Stat 1 Value", type: "text", value: "10,000+" },
      { key: "stat1_label", label: "Stat 1 Label", type: "text", value: "Funded Traders" },
      { key: "stat2", label: "Stat 2 Value", type: "text", value: "$5M+" },
      { key: "stat2_label", label: "Stat 2 Label", type: "text", value: "Capital Funded" },
      { key: "stat3", label: "Stat 3 Value", type: "text", value: "Up to 90%" },
      { key: "stat3_label", label: "Stat 3 Label", type: "text", value: "Profit Split" },
      { key: "stat4", label: "Stat 4 Value", type: "text", value: "150+" },
      { key: "stat4_label", label: "Stat 4 Label", type: "text", value: "Countries" },
    ],
  },
  {
    id: "contact",
    label: "Contact Section",
    fields: [
      { key: "email", label: "Support Email", type: "text", value: "support@alphafundx.com" },
      { key: "phone", label: "Phone Number", type: "text", value: "+1 (555) 123-4567" },
      { key: "address", label: "Office Location", type: "text", value: "Dubai, UAE" },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    fields: [
      { key: "copyright", label: "Copyright Text", type: "text", value: "© 2024 AlphaFundX. All rights reserved." },
      { key: "twitter", label: "Twitter URL", type: "text", value: "https://twitter.com/alphafundx" },
      { key: "discord", label: "Discord URL", type: "text", value: "https://discord.gg/alphafundx" },
      { key: "telegram", label: "Telegram URL", type: "text", value: "https://t.me/alphafundx" },
    ],
  },
];

export default function AdminCMSPage() {
  const [sections, setSections] = useState(initialSections);
  const [activeTab, setActiveTab] = useState<Section>("hero");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const activeSection = sections.find((s) => s.id === activeTab)!;

  // Load saved CMS data from database on mount
  const loadCmsData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/cms");
      if (!res.ok) return;
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setSections((prev) =>
          prev.map((section) => {
            // Find matching DB record for this section
            const dbRecord = data.find(
              (d: { key: string; content: Record<string, string> }) => d.key === section.id
            );
            if (!dbRecord || !dbRecord.content) return section;

            const content = dbRecord.content as Record<string, string>;
            return {
              ...section,
              fields: section.fields.map((field) => ({
                ...field,
                value: content[field.key] !== undefined ? content[field.key] : field.value,
              })),
            };
          })
        );
      }
    } catch {
      // Silently fall back to defaults
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCmsData();
  }, [loadCmsData]);

  const updateField = (key: string, value: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === activeTab
          ? { ...s, fields: s.fields.map((f) => (f.key === key ? { ...f, value } : f)) }
          : s
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Build content object from all fields in the active section
      const content: Record<string, string> = {};
      activeSection.fields.forEach((field) => {
        content[field.key] = field.value;
      });

      const res = await fetch("/api/admin/cms", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: activeSection.id,
          title: activeSection.label,
          content,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to save");
      }

      toast.success(`${activeSection.label} content saved`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="CMS Management" description="Edit marketing page content and site copy." />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar tabs */}
        <div className="rounded-xl border border-white/[0.06] bg-card overflow-hidden">
          <div className="p-3 space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                  activeTab === s.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                }`}
              >
                <FileText className="size-4 shrink-0" />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="lg:col-span-3 rounded-xl border border-white/[0.06] bg-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <h3 className="text-lg font-semibold text-foreground">{activeSection.label}</h3>
            <Button onClick={handleSave} disabled={saving || loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {saving ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Save className="size-4 mr-2" />}
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
          <div className="p-6 space-y-5">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="size-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              activeSection.fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label>{field.label}</Label>
                  {field.type === "text" ? (
                    <Input
                      value={field.value}
                      onChange={(e) => updateField(field.key, e.target.value)}
                      className="bg-white/[0.02]"
                    />
                  ) : (
                    <textarea
                      rows={4}
                      value={field.value}
                      onChange={(e) => updateField(field.key, e.target.value)}
                      className="w-full bg-white/[0.02] border border-white/[0.06] rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 resize-none text-sm"
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
