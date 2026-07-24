"use client";

import { useState, useEffect, useCallback } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { User, Mail, Phone, MessageCircle, Lock, Shield, Calendar, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface UserProfile {
  name: string | null;
  email: string;
  phone: string | null;
  telegramUsername: string | null;
  status: string;
  createdAt: string;
  role: string;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    telegramUsername: "",
  });

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/users/me");
      if (!res.ok) throw new Error("Failed to load profile");
      const data = await res.json();
      setProfile(data);
      
      const nameParts = (data.name || "").split(" ");
      setForm({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        phone: data.phone || "",
        telegramUsername: data.telegramUsername || "",
      });
    } catch {
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const fullName = `${form.firstName} ${form.lastName}`.trim();
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName || null,
          phone: form.phone || null,
          telegramUsername: form.telegramUsername || null,
        }),
      });
      
      if (!res.ok) throw new Error("Failed to update profile");
      toast.success("Profile updated successfully");
      fetchProfile();
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password update email sent");
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <PageHeader
        title="My Profile"
        description="Manage your account settings and personal information."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar info */}
        <div className="space-y-6">
          <div className="rounded-xl border border-white/[0.06] bg-card p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-3xl font-bold text-primary border-4 border-card outline outline-2 outline-primary/20">
              {profile?.name?.charAt(0) || "U"}
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {profile?.name || "Trader"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {profile?.email}
            </p>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
              {profile?.role === "ADMIN" ? "Administrator" : "Funded Trader"}
            </span>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-card p-6 space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Account Status</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Shield className="size-4" /> Status
                </span>
                <span className={`font-medium ${profile?.status === "ACTIVE" ? "text-primary" : "text-red-500"}`}>
                  {profile?.status === "ACTIVE" ? "Active" : "Suspended"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="size-4" /> Member Since
                </span>
                <span className="text-foreground">
                  {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : "—"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main form area */}
        <div className="md:col-span-2 space-y-6">
          {/* Personal Info Form */}
          <div className="rounded-xl border border-white/[0.06] bg-card overflow-hidden">
            <div className="border-b border-white/[0.06] px-6 py-4">
              <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
            </div>
            <form onSubmit={handleSaveProfile} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 size-4 text-muted-foreground" />
                    <Input id="firstName" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="pl-9 bg-white/[0.02]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 size-4 text-muted-foreground" />
                    <Input id="lastName" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="pl-9 bg-white/[0.02]" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input id="email" type="email" value={profile?.email || ""} className="pl-9 bg-white/[0.02]" disabled />
                </div>
                <p className="text-xs text-muted-foreground">Email address cannot be changed directly. Contact support if needed.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 size-4 text-muted-foreground" />
                    <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 (555) 000-0000" className="pl-9 bg-white/[0.02]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telegram">Telegram Username</Label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 size-4 text-muted-foreground" />
                    <Input id="telegram" value={form.telegramUsername} onChange={(e) => setForm({ ...form, telegramUsername: e.target.value })} placeholder="@username" className="pl-9 bg-white/[0.02]" />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit" disabled={isSaving} className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[120px]">
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>

          {/* Security Form */}
          <div className="rounded-xl border border-white/[0.06] bg-card overflow-hidden">
            <div className="border-b border-white/[0.06] px-6 py-4">
              <h3 className="text-lg font-semibold text-foreground">Security</h3>
            </div>
            <form onSubmit={handleUpdatePassword} className="p-6 space-y-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                    <Input id="currentPassword" type="password" placeholder="••••••••" className="pl-9 bg-white/[0.02]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                      <Input id="newPassword" type="password" placeholder="••••••••" className="pl-9 bg-white/[0.02]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                      <Input id="confirmPassword" type="password" placeholder="••••••••" className="pl-9 bg-white/[0.02]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit" variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
