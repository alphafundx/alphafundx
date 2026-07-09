"use client";

import { Bell, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

interface TopBarProps {
  className?: string;
}

export function TopBar({ className }: TopBarProps) {
  const { data: session } = useSession();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex items-center justify-between h-16 lg:h-20 px-6 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl",
        className
      )}
    >
      {/* Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/30 transition-all"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button
          className="relative flex items-center justify-center size-10 rounded-lg bg-white/[0.04] border border-white/[0.06] text-muted-foreground hover:text-foreground hover:bg-white/[0.08] transition-all"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          {/* Notification dot */}
          <span className="absolute top-2 right-2 size-2 rounded-full bg-primary pulse-green" />
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-foreground truncate max-w-[120px]">
              {session?.user?.name || "User"}
            </p>
            <p className="text-xs text-muted-foreground">
              {session?.user?.email || "user@alphafundx.com"}
            </p>
          </div>
          <div className="flex items-center justify-center size-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 text-primary font-semibold text-sm">
            {(session?.user?.name || "U").charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
