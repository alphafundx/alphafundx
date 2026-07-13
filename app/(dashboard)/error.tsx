"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md space-y-6"
      >
        <div className="flex justify-center">
          <div className="flex items-center justify-center size-20 rounded-2xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="size-10 text-red-400" strokeWidth={1.5} />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Dashboard Error
          </h2>
          <p className="text-muted-foreground">
            Something went wrong while loading your dashboard. Your data is safe
            — try refreshing the page.
          </p>
        </div>

        {error.digest && (
          <p className="text-xs text-muted-foreground/60 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 gap-2"
          >
            <RefreshCw className="size-4" />
            Try Again
          </Button>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="rounded-full px-6 gap-2 border-white/10 hover:bg-white/5 w-full"
            >
              <LayoutDashboard className="size-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
