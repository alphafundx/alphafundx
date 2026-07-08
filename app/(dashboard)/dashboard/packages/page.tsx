import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Package } from "lucide-react";

export default function UserPackagesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="My Packages"
        description="View and manage your funded trading packages."
      />
      <EmptyState
        icon={Package}
        title="No packages yet"
        description="Purchase a funding package to start your trading journey."
      />
    </div>
  );
}
