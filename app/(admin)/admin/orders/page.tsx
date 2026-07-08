import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { ShoppingCart } from "lucide-react";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Orders" description="View all package purchase orders." />
      <EmptyState
        icon={ShoppingCart}
        title="No orders yet"
        description="Orders will appear here when users purchase packages."
      />
    </div>
  );
}
