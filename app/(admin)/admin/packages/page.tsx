import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { Package, Plus } from "lucide-react";

export default function AdminPackagesPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Package Management" description="Create, edit, and manage funding packages.">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
          <Plus className="size-4 mr-2" />
          Create Package
        </Button>
      </PageHeader>
      <EmptyState
        icon={Package}
        title="No packages created"
        description="Create your first funding package to start accepting traders."
      />
    </div>
  );
}
