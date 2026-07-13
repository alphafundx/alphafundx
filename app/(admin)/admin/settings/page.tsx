"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Globe, Mail, Shield, Palette } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "AlphaFundX",
    siteTagline: "Trade Without Limits — Get Funded Today",
    contactEmail: "support@alphafundx.com",
    supportPhone: "+1 (555) 123-4567",
    twitterUrl: "https://twitter.com/alphafundx",
    discordUrl: "https://discord.gg/alphafundx",
    telegramUrl: "https://t.me/alphafundx",
    instagramUrl: "https://instagram.com/alphafundx",
    maintenanceMode: false,
    registrationEnabled: true,
    withdrawalsEnabled: true,
    minWithdrawal: "100",
    maxWithdrawal: "50000",
    defaultProfitSplit: "80",
    primaryColor: "#26FF5E",
    secondaryColor: "#19B226",
  });

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  const update = (key: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader title="Site Settings" description="Configure your platform's global settings." />

      {/* General */}
      <div className="rounded-xl border border-white/[0.06] bg-card overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
          <Globe className="size-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">General</h3>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Site Name</Label>
              <Input value={settings.siteName} onChange={(e) => update("siteName", e.target.value)} className="bg-white/[0.02]" />
            </div>
            <div className="space-y-2">
              <Label>Tagline</Label>
              <Input value={settings.siteTagline} onChange={(e) => update("siteTagline", e.target.value)} className="bg-white/[0.02]" />
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-xl border border-white/[0.06] bg-card overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
          <Mail className="size-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Contact & Social</h3>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Support Email</Label>
              <Input value={settings.contactEmail} onChange={(e) => update("contactEmail", e.target.value)} className="bg-white/[0.02]" />
            </div>
            <div className="space-y-2">
              <Label>Support Phone</Label>
              <Input value={settings.supportPhone} onChange={(e) => update("supportPhone", e.target.value)} className="bg-white/[0.02]" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Twitter URL</Label>
              <Input value={settings.twitterUrl} onChange={(e) => update("twitterUrl", e.target.value)} className="bg-white/[0.02]" />
            </div>
            <div className="space-y-2">
              <Label>Discord URL</Label>
              <Input value={settings.discordUrl} onChange={(e) => update("discordUrl", e.target.value)} className="bg-white/[0.02]" />
            </div>
            <div className="space-y-2">
              <Label>Telegram URL</Label>
              <Input value={settings.telegramUrl} onChange={(e) => update("telegramUrl", e.target.value)} className="bg-white/[0.02]" />
            </div>
            <div className="space-y-2">
              <Label>Instagram URL</Label>
              <Input value={settings.instagramUrl} onChange={(e) => update("instagramUrl", e.target.value)} className="bg-white/[0.02]" />
            </div>
          </div>
        </div>
      </div>

      {/* Platform Controls */}
      <div className="rounded-xl border border-white/[0.06] bg-card overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
          <Shield className="size-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Platform Controls</h3>
        </div>
        <div className="p-6 space-y-5">
          {/* Toggles */}
          <div className="space-y-4">
            {[
              { key: "maintenanceMode", label: "Maintenance Mode", description: "Temporarily disable access for non-admins" },
              { key: "registrationEnabled", label: "User Registration", description: "Allow new users to register" },
              { key: "withdrawalsEnabled", label: "Withdrawals", description: "Allow users to request withdrawals" },
            ].map((toggle) => (
              <div key={toggle.key} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{toggle.label}</p>
                  <p className="text-xs text-muted-foreground">{toggle.description}</p>
                </div>
                <button
                  onClick={() => update(toggle.key, !(settings as Record<string, unknown>)[toggle.key])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    (settings as Record<string, unknown>)[toggle.key] ? "bg-primary" : "bg-white/[0.1]"
                  }`}
                >
                  <span
                    className={`inline-block size-4 rounded-full bg-white transition-transform ${
                      (settings as Record<string, unknown>)[toggle.key] ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Withdrawal limits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
            <div className="space-y-2">
              <Label>Min Withdrawal ($)</Label>
              <Input type="number" value={settings.minWithdrawal} onChange={(e) => update("minWithdrawal", e.target.value)} className="bg-white/[0.02]" />
            </div>
            <div className="space-y-2">
              <Label>Max Withdrawal ($)</Label>
              <Input type="number" value={settings.maxWithdrawal} onChange={(e) => update("maxWithdrawal", e.target.value)} className="bg-white/[0.02]" />
            </div>
            <div className="space-y-2">
              <Label>Default Profit Split (%)</Label>
              <Input type="number" value={settings.defaultProfitSplit} onChange={(e) => update("defaultProfitSplit", e.target.value)} className="bg-white/[0.02]" />
            </div>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="rounded-xl border border-white/[0.06] bg-card overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
          <Palette className="size-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Appearance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <div className="flex items-center gap-3">
                <input type="color" value={settings.primaryColor} onChange={(e) => update("primaryColor", e.target.value)} className="size-10 rounded-lg border border-white/[0.06] bg-transparent cursor-pointer" />
                <Input value={settings.primaryColor} onChange={(e) => update("primaryColor", e.target.value)} className="bg-white/[0.02] flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Secondary Color</Label>
              <div className="flex items-center gap-3">
                <input type="color" value={settings.secondaryColor} onChange={(e) => update("secondaryColor", e.target.value)} className="size-10 rounded-lg border border-white/[0.06] bg-transparent cursor-pointer" />
                <Input value={settings.secondaryColor} onChange={(e) => update("secondaryColor", e.target.value)} className="bg-white/[0.02] flex-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end pt-2">
        <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
          <Save className="size-4 mr-2" /> Save All Settings
        </Button>
      </div>
    </div>
  );
}
