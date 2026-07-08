import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Settings" description="Configure your platform settings.">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
          <Save className="size-4 mr-2" />
          Save Changes
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="rounded-xl border border-white/[0.06] bg-card p-6 space-y-6">
          <h3 className="text-lg font-semibold text-foreground">General</h3>
          <div className="space-y-4">
            {[
              { label: "Site Name", value: "Tradexa", type: "text" },
              { label: "Contact Email", value: "support@tradexa.com", type: "email" },
              { label: "Support Phone", value: "+1 (555) 123-4567", type: "tel" },
            ].map((field) => (
              <div key={field.label} className="space-y-1">
                <label className="text-sm text-muted-foreground">{field.label}</label>
                <input
                  type={field.type}
                  defaultValue={field.value}
                  className="w-full h-10 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="rounded-xl border border-white/[0.06] bg-card p-6 space-y-6">
          <h3 className="text-lg font-semibold text-foreground">Social Links</h3>
          <div className="space-y-4">
            {["Twitter/X", "Instagram", "Discord", "Telegram"].map((platform) => (
              <div key={platform} className="space-y-1">
                <label className="text-sm text-muted-foreground">{platform}</label>
                <input
                  type="url"
                  placeholder={`https://${platform.toLowerCase()}.com/tradexa`}
                  className="w-full h-10 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
