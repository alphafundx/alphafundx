"use client";

import { motion } from "framer-motion";

function SkeletonPulse({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-white/[0.06] ${className}`} />
  );
}

export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md space-y-6"
      >
        {/* Logo */}
        <SkeletonPulse className="h-8 w-40 mx-auto" />

        {/* Title */}
        <div className="text-center space-y-2">
          <SkeletonPulse className="h-8 w-56 mx-auto" />
          <SkeletonPulse className="h-5 w-72 mx-auto" />
        </div>

        {/* Form card */}
        <div className="rounded-xl border border-white/[0.06] bg-card p-8 space-y-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <SkeletonPulse className="h-4 w-20" />
              <SkeletonPulse className="h-11 w-full rounded-lg" />
            </div>
          ))}
          <SkeletonPulse className="h-11 w-full rounded-full mt-4" />
        </div>

        {/* Footer link */}
        <SkeletonPulse className="h-5 w-60 mx-auto" />
      </motion.div>
    </div>
  );
}
