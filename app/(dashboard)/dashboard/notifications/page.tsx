"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import {
  Bell,
  Loader2,
  DollarSign,
  Package,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

function timeAgo(dateStr: string) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

const iconMap: Record<string, React.ElementType> = {
  WITHDRAWAL: DollarSign,
  PACKAGE: Package,
  SUCCESS: ShieldCheck,
  WARNING: AlertTriangle,
  SYSTEM: Bell,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users/me/dashboard")
      .then((r) => r.json())
      .then((data) => setNotifications(data.notifications || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <PageHeader title="Notifications" description="Loading..." />
        <div className="flex justify-center py-12">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Notifications"
        description="Stay updated with your account activity."
      />

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description="You're all caught up! New notifications will appear here."
        />
      ) : (
        <div className="rounded-xl border border-white/[0.06] bg-card overflow-hidden divide-y divide-white/[0.04]">
          {notifications.map((notif) => {
            const Icon = iconMap[notif.type] || Bell;
            return (
              <div
                key={notif.id}
                className={`flex items-start gap-4 p-5 transition-colors hover:bg-white/[0.01] ${
                  !notif.isRead ? "bg-primary/[0.02]" : ""
                }`}
              >
                <div className={`flex items-center justify-center size-10 rounded-full shrink-0 ${
                  notif.type === "WITHDRAWAL" ? "bg-primary/10 text-primary" :
                  notif.type === "WARNING" || notif.type === "ERROR" ? "bg-red-500/10 text-red-400" :
                  notif.type === "SUCCESS" ? "bg-green-500/10 text-green-500" :
                  "bg-white/5 text-muted-foreground"
                }`}>
                  <Icon className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{notif.title}</p>
                    {!notif.isRead && (
                      <span className="size-2 rounded-full bg-primary shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{notif.message}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">{timeAgo(notif.createdAt)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
