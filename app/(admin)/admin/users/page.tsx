import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { Users, Plus } from "lucide-react";

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="User Management" description="View, edit, and manage all platform users.">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
          <Plus className="size-4 mr-2" />
          Add User
        </Button>
      </PageHeader>
      <EmptyState
        icon={Users}
        title="No users found"
        description="Users will appear here once they register on the platform."
      />
    </div>
  );
}
