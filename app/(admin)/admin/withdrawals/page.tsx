import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { ArrowDownUp } from "lucide-react";

export default function AdminWithdrawalsPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Withdrawal Management" description="Review and process user withdrawal requests." />
      <EmptyState
        icon={ArrowDownUp}
        title="No withdrawal requests"
        description="Withdrawal requests from users will appear here."
      />
    </div>
  );
}
