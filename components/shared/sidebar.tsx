"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ArrowDownUp,
  User,
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings,
  Users,
  FileText,
  MessageSquareQuote,
  BarChart3,
  Globe,
  ShoppingCart,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import type { SidebarItem } from "@/types";

const userSidebarItems: SidebarItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "My Packages", href: "/dashboard/packages", icon: Package },
  { title: "Withdrawals", href: "/dashboard/withdrawals", icon: ArrowDownUp },
  { title: "Profile", href: "/dashboard/profile", icon: User },
  { title: "Notifications", href: "/dashboard/notifications", icon: Bell },
];

const adminSidebarItems: SidebarItem[] = [
  { title: "Dashboard", href: "/admin", icon: BarChart3 },
  { title: "Users", href: "/admin/users", icon: Users },
  { title: "Manage Packages", href: "/admin/packages", icon: Package },
  { title: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { title: "Discount Codes", href: "/admin/discount-codes", icon: Tag },
  { title: "Withdrawals", href: "/admin/withdrawals", icon: ArrowDownUp },
  { title: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { title: "CMS", href: "/admin/cms", icon: FileText },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

interface SidebarProps {
  variant?: "user" | "admin";
  className?: string;
}

export function Sidebar({ variant = "user", className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const items = variant === "admin" ? adminSidebarItems : userSidebarItems;

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen flex flex-col border-r border-white/[0.06] bg-sidebar transition-all duration-300",
        isCollapsed ? "w-[72px]" : "w-64",
        className
      )}
    >
      {/* Header */}
      <div className={cn(
        "flex items-center h-16 lg:h-20 px-4 border-b border-white/[0.06]",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        <Logo size={isCollapsed ? "sm" : "md"} showText={!isCollapsed} />
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex items-center justify-center size-7 rounded-md bg-white/[0.04] text-muted-foreground hover:text-foreground hover:bg-white/[0.08] transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <ChevronLeft className="size-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              item.href !== "/admin" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]",
                isCollapsed && "justify-center px-0"
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId={`sidebar-indicator-${variant}`}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <item.icon
                className={cn(
                  "size-5 shrink-0 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}
              />

              {!isCollapsed && (
                <span className="truncate">{item.title}</span>
              )}

              {/* Badge */}
              {item.badge && !isCollapsed && (
                <span className="ml-auto flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-primary/15 text-primary text-xs font-semibold">
                  {item.badge}
                </span>
              )}

              {/* Tooltip when collapsed */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2.5 py-1.5 rounded-md bg-popover border border-white/[0.06] text-foreground text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 shadow-lg">
                  {item.title}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/[0.06] p-3">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className={cn(
            "flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all duration-200",
            isCollapsed && "justify-center px-0"
          )}
        >
          <LogOut className="size-5 shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
