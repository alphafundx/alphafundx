"use client";

import { motion } from "framer-motion";

function SkeletonPulse({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-white/[0.06] ${className}`}
    />
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero skeleton */}
      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <SkeletonPulse className="h-5 w-40 mx-auto" />
            <SkeletonPulse className="h-14 w-[70%] mx-auto" />
            <SkeletonPulse className="h-14 w-[50%] mx-auto" />
            <SkeletonPulse className="h-6 w-[60%] mx-auto" />
            <div className="flex justify-center gap-4 pt-4">
              <SkeletonPulse className="h-12 w-40 rounded-full" />
              <SkeletonPulse className="h-12 w-40 rounded-full" />
            </div>
          </motion.div>

          {/* Stats skeleton */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonPulse key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        </div>
      </section>

      {/* Features skeleton */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <SkeletonPulse className="h-5 w-32 mx-auto" />
            <SkeletonPulse className="h-12 w-80 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonPulse
                key={i}
                className={`h-48 rounded-[24px] ${i === 0 || i === 5 ? "md:col-span-2" : ""}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
