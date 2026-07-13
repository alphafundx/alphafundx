
"use client";

import { motion } from "framer-motion";

function SkeletonPulse({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-white/[0.06] ${className}`} />
  );
}

export default function DashboardLoading() {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="space-y-2">
          <SkeletonPulse className="h-8 w-48" />
          <SkeletonPulse className="h-5 w-72" />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonPulse key={i} className="h-32 rounded-xl" />
          ))}
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SkeletonPulse className="h-80 rounded-xl lg:col-span-2" />
          <SkeletonPulse className="h-80 rounded-xl" />
        </div>

        {/* Table skeleton */}
        <div className="rounded-xl border border-white/[0.06] overflow-hidden">
          <SkeletonPulse className="h-12 w-full rounded-none" />
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonPulse key={i} className="h-14 w-full rounded-none border-t border-white/[0.04]" />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
