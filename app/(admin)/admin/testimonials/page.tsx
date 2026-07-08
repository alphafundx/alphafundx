import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { MessageSquareQuote, Plus } from "lucide-react";

export default function AdminTestimonialsPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Testimonials" description="Manage user testimonials displayed on the website.">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
          <Plus className="size-4 mr-2" />
          Add Testimonial
        </Button>
      </PageHeader>
      <EmptyState
        icon={MessageSquareQuote}
        title="No testimonials"
        description="Add testimonials to showcase on your landing page."
      />
    </div>
  );
}
