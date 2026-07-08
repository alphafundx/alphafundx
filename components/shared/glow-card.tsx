"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  hoverGlow?: boolean;
  onClick?: () => void;
}

export function GlowCard({
  children,
  className,
  glowColor = "rgba(38, 255, 94, 0.15)",
  hoverGlow = true,
  onClick,
}: GlowCardProps) {
  return (
    <motion.div
      whileHover={hoverGlow ? { scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={cn(
        "relative rounded-xl border border-white/[0.06] bg-card overflow-hidden transition-all duration-300 group",
        hoverGlow && "hover:border-primary/30 cursor-pointer",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${glowColor} 50%, transparent 100%)`,
        }}
      />

      {/* Background glow on hover */}
      {hoverGlow && (
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ backgroundColor: glowColor }}
        />
      )}

      {/* Content */}
      <div className="relative">{children}</div>
    </motion.div>
  );
}
