import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { ArrowDownUp } from "lucide-react";

export default function UserWithdrawalsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Withdrawals"
        description="Request and track your profit withdrawals."
      />
      <EmptyState
        icon={ArrowDownUp}
        title="No withdrawals yet"
        description="You can request a withdrawal once you have profits in your funded account."
      />
    </div>
  );
}
