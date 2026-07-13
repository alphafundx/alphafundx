"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Clock,
  Zap,
  Scale,
  Repeat,
  Target,
  HeadphonesIcon,
  BarChart3,
} from "lucide-react";

const benefits = [
  {
    title: "High Profit Split",
    description:
      "Retain up to 90% of the profits you generate with a structure built to reward performance.",
    icon: TrendingUp,
    featured: true,
    tag: "Industry Leading",
  },
  {
    title: "Flexible Trading Window",
    description:
      "Trade without unnecessary pressure and complete the process on a timeline that suits you.",
    icon: Clock,
    featured: false,
  },
  {
    title: "Quick Withdrawals",
    description:
      "Once eligible, access your earnings through a streamlined payout process.",
    icon: Zap,
    featured: false,
  },
  {
    title: "Clear, Fair Rules",
    description:
      "Work within transparent guidelines designed to keep the process simple and predictable.",
    icon: Scale,
    featured: false,
  },
  {
    title: "Included Retry Opportunity",
    description:
      "If your first attempt falls short, one retry is available to help you move forward.",
    icon: Repeat,
    featured: false,
  },
  {
    title: "Live Account Access",
    description:
      "Qualify for a real trading account and trade with actual capital.",
    icon: Target,
    featured: true,
    tag: "The Ultimate Goal",
  },
  {
    title: "Trader-Focused Support",
    description:
      "Receive prompt assistance from a team that understands the trading journey.",
    icon: HeadphonesIcon,
    featured: false,
  },
  {
    title: "Account Scaling Potential",
    description:
      "Continue growing with opportunities to expand as you prove consistency.",
    icon: BarChart3,
    featured: false,
  },
];

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-24 lg:py-32 relative overflow-hidden bg-background">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          whileInView="animate"
          initial="initial"
          className="text-center mb-16 lg:mb-24"
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/50" />
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em]">
              Why Serious Traders Choose Us
            </p>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            Built for <span className="bg-gradient-to-r from-[#26FF5E] via-[#34D399] to-[#26FF5E] bg-clip-text text-transparent drop-shadow-sm">Serious Traders</span>
          </h2>
          
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto font-medium">
            Designed to help traders grow with clarity, speed, and fairness.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {benefits.map((benefit, index) => {
            let spanClass = "col-span-1";
            if (index === 0 || index === 5 || index === 6 || index === 7) {
              spanClass = "md:col-span-2";
            }

            return (
              <motion.div
                key={benefit.title}
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className={`group relative overflow-hidden rounded-[24px] border border-white/[0.06] bg-white/[0.03] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all duration-400 hover:border-primary/30 hover:bg-white/[0.05] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] ${spanClass} ${
                  index % 2 !== 0 && index < 6 ? "lg:translate-y-4" : "" 
                }`}
              >
                {/* Accent line at top */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-primary/50 transition-colors duration-500" />
                
                <div className="flex flex-col h-full relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    {/* Icon container */}
                    <div className="flex items-center justify-center size-14 rounded-[16px] bg-primary/[0.03] border border-primary/10 text-primary shadow-[0_0_15px_rgba(38,255,94,0.05)] transition-all duration-500 group-hover:bg-primary/[0.08] group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(38,255,94,0.15)] group-hover:scale-110">
                      <benefit.icon className="size-6" strokeWidth={1.5} />
                    </div>
                    
                    {/* Optional Tag */}
                    {benefit.tag && (
                      <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20">
                        {benefit.tag}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-auto">
                    <h3 className={`font-semibold tracking-tight text-white mb-3 ${benefit.featured ? 'text-2xl' : 'text-xl'}`}>
                      {benefit.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/50 group-hover:text-white/70 transition-colors duration-300">
                      {benefit.description}
                    </p>
                  </div>
                </div>

                {/* Subtle hover gradient background */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
