import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Notifications"
        description="Stay updated with your account activity."
      />
      <EmptyState
        icon={Bell}
        title="No notifications"
        description="You're all caught up! New notifications will appear here."
      />
    </div>
  );
}
