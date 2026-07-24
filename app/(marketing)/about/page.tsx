"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  TrendingUp,
  Users,
  Globe,
  Award,
  Heart,
  Target,
  Zap,
  DollarSign,
} from "lucide-react";
import { GlowCard } from "@/components/shared/glow-card";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const values = [
  {
    icon: Shield,
    title: "Transparency",
    description:
      "No hidden rules, no fine print. Every condition is clearly stated before you begin.",
  },
  {
    icon: Heart,
    title: "Trader-First",
    description:
      "Every decision we make starts with one question: does this help our traders succeed?",
  },
  {
    icon: Target,
    title: "Fairness",
    description:
      "Our rules are designed to be achievable. We want you to pass — that's how we grow.",
  },
  {
    icon: Zap,
    title: "Speed",
    description:
      "Fast account activation, instant dashboard updates, and 24-hour payouts.",
  },
];

const milestones = [
  { year: "2023", title: "Founded", description: "AlphaFundX launched with a mission to democratize funded trading." },
  { year: "2023", title: "1,000 Traders", description: "Reached our first thousand funded traders within 6 months." },
  { year: "2024", title: "$2M Funded", description: "Crossed $2 million in total capital allocated to traders." },
  { year: "2024", title: "Global Reach", description: "Expanded to serve traders in over 100 countries worldwide." },
  { year: "2025", title: "10,000+ Traders", description: "Community grew to over 10,000 active traders across all plans." },
  { year: "2025", title: "$5M+ Funded", description: "Over $5 million in funded capital with a 95% payout rate." },
];

const defaultStats = [
  { value: "10,000+", label: "Funded Traders", icon: Users },
  { value: "$5M+", label: "Capital Funded", icon: DollarSign },
  { value: "150+", label: "Countries", icon: Globe },
  { value: "95%", label: "Payout Rate", icon: Award },
];

export default function AboutPage() {
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) {
          setStats([
            { label: data.stats.fundedTradersLabel || "Funded Traders", value: data.stats.fundedTraders, icon: Users },
            { label: data.stats.capitalFundedLabel || "Capital Funded", value: data.stats.capitalFunded, icon: DollarSign },
            { label: data.stats.profitSplitLabel || "Profit Split", value: data.stats.profitSplit, icon: TrendingUp },
            { label: data.stats.countriesLabel || "Countries", value: data.stats.countries, icon: Globe },
          ]);
        }
      })
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* ========== HERO ========== */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">
              Our Story
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Built by Traders,{" "}
              <span className="text-gradient-green">For Traders</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              AlphaFundX was founded with a simple belief: lack of capital
              shouldn&apos;t stop skilled traders from building a career. We
              provide the funding — you bring the talent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== STATS BAR ========== */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 p-6 rounded-xl border border-white/[0.06] bg-card"
              >
                <stat.icon className="size-6 text-primary" />
                <p className="text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== MISSION ========== */}
      <section className="py-24 bg-gradient-section">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              {...fadeInUp}
              whileInView="animate"
              initial="initial"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">
                Our Mission
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Empowering the Next Generation of{" "}
                <span className="text-gradient-green">Funded Traders</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe that every talented trader deserves access to
                institutional-grade capital. Our platform removes the financial
                barrier by providing funded accounts ranging from $10,000 to
                $200,000 — with some of the highest profit splits in the
                industry.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Unlike traditional prop firms, we focus on simplicity,
                transparency, and fairness. No hidden conditions, no time
                pressure, and support available around the clock.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass rounded-2xl p-8 space-y-6"
            >
              <h3 className="text-xl font-bold text-foreground">
                Why We&apos;re Different
              </h3>
              <ul className="space-y-4">
                {[
                  "Up to 90% profit split — one of the highest in the industry",
                  "No time limits — trade at your own pace",
                  "24-hour payout processing for all withdrawals",
                  "Transparent rules with zero hidden conditions",
                  "Free retakes when eligible — we want you to succeed",
                  "Dedicated support team available 24/7",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <div className="mt-1 flex items-center justify-center size-5 rounded-full bg-primary/10 shrink-0">
                      <div className="size-2 rounded-full bg-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== VALUES ========== */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Our Values
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              What We{" "}
              <span className="text-gradient-green">Stand For</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
              >
                <GlowCard className="h-full">
                  <div className="p-6 lg:p-8 flex items-start gap-5">
                    <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10 shrink-0">
                      <value.icon className="size-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== TIMELINE ========== */}
      <section className="py-24 bg-gradient-section">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Our Journey
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Key{" "}
              <span className="text-gradient-green">Milestones</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center gap-6 ${
                    index % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center size-8 rounded-full bg-card border-2 border-primary/40 z-10">
                    <div className="size-3 rounded-full bg-primary" />
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                      index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
                    }`}
                  >
                    <div className="glass rounded-xl p-5 space-y-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                        {milestone.year}
                      </span>
                      <h3 className="text-base font-semibold text-foreground">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            {...fadeInUp}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to Join{" "}
              <span className="text-gradient-green glow-text">
                10,000+ Traders
              </span>
              ?
            </h2>
            <p className="text-lg text-muted-foreground">
              Start your funded trading journey with AlphaFundX today.
            </p>
            <div className="pt-2">
              <a
                href="/register"
                className="inline-flex items-center justify-center px-10 h-14 text-lg font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 glow-strong transition-all duration-200"
              >
                Get Started Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
