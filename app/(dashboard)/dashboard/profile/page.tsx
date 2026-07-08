import { PageHeader } from "@/components/shared/page-header";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Profile"
        description="Manage your account information and settings."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Info */}
        <div className="rounded-xl border border-white/[0.06] bg-card p-6 space-y-6">
          <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
          <div className="space-y-4">
            {[
              { label: "Full Name", value: "Loading..." },
              { label: "Email", value: "Loading..." },
              { label: "Phone", value: "Loading..." },
              { label: "Telegram", value: "Not set" },
            ].map((field) => (
              <div key={field.label} className="space-y-1">
                <label className="text-sm text-muted-foreground">{field.label}</label>
                <div className="h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 flex items-center text-sm text-foreground">
                  {field.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Change Password */}
        <div className="rounded-xl border border-white/[0.06] bg-card p-6 space-y-6">
          <h3 className="text-lg font-semibold text-foreground">Change Password</h3>
          <div className="space-y-4">
            {["Current Password", "New Password", "Confirm Password"].map((label) => (
              <div key={label} className="space-y-1">
                <label className="text-sm text-muted-foreground">{label}</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-10 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
