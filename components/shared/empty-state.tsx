import { cn } from "@/lib/utils";
import { InboxIcon, Package, FileText, Bell, CreditCard, Users, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
}

export function EmptyState({
  icon: Icon = InboxIcon,
  title,
  description,
  className,
  children,
  actionLabel,
  onAction,
  actionHref,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-4",
        className
      )}
    >
      <div className="relative mb-6">
        {/* Subtle glow behind icon */}
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-150" />
        <div className="relative flex items-center justify-center size-20 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <Icon className="size-9 text-muted-foreground/60" strokeWidth={1.5} />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-6">
          {description}
        </p>
      )}
      {actionLabel && (
        <div className="mb-6">
          {actionHref ? (
            <a href={actionHref}>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 font-semibold">
                {actionLabel}
              </Button>
            </a>
          ) : (
            <Button
              onClick={onAction}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 font-semibold"
            >
              {actionLabel}
            </Button>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

// Pre-configured empty states for common scenarios
export function EmptyPackages() {
  return (
    <EmptyState
      icon={Package}
      title="No Active Packages"
      description="You haven't purchased any trading packages yet. Browse our available packages to get started with funded trading."
      actionLabel="Browse Packages"
      actionHref="/#packages"
    />
  );
}

export function EmptyOrders() {
  return (
    <EmptyState
      icon={CreditCard}
      title="No Orders Yet"
      description="You haven't placed any orders. Choose a funding package to begin your trading journey."
      actionLabel="View Packages"
      actionHref="/#packages"
    />
  );
}

export function EmptyWithdrawals() {
  return (
    <EmptyState
      icon={FileText}
      title="No Withdrawals"
      description="You haven't made any withdrawal requests yet. Once you earn profits from trading, you can request a withdrawal here."
    />
  );
}

export function EmptyNotifications() {
  return (
    <EmptyState
      icon={Bell}
      title="All Caught Up"
      description="You have no notifications at the moment. We'll notify you about important updates and account activity."
    />
  );
}

export function EmptyUsers() {
  return (
    <EmptyState
      icon={Users}
      title="No Users Found"
      description="No users match the current filter criteria. Try adjusting your search or filters."
    />
  );
}

export function EmptyTestimonials() {
  return (
    <EmptyState
      icon={MessageSquare}
      title="No Testimonials"
      description="No testimonials have been added yet. Add testimonials to showcase trader success stories."
    />
  );
}
