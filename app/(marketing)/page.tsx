"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  TrendingUp,
  Zap,
  Target,
  Clock,
  DollarSign,
  ChevronRight,
  Star,
  Check,
  ArrowRight,
  BarChart3,
  Users,
  Award,
  Globe,
  Wallet,
  HeadphonesIcon,
  Scale,
  Repeat,
  BadgePercent,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/shared/glow-card";
import { BorderGlow } from "@/components/ui/border-glow";
import { TestimonialCarousel } from "@/components/marketing/testimonial-carousel";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Threads from "@/components/Threads";

// ==========================================
// Animation Variants
// ==========================================
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

// ==========================================
// Section Data
// ==========================================
const stats = [
  { label: "Funded Traders", value: "10,000+", icon: Users },
  { label: "Capital Funded", value: "$5M+", icon: DollarSign },
  { label: "Profit Split", value: "Up to 90%", icon: TrendingUp },
  { label: "Countries", value: "150+", icon: Globe },
];

const features = [
  {
    icon: TrendingUp,
    title: "Up to 90% Profit Split",
    description: "Keep up to 90% of the profits you generate. One of the highest splits in the industry.",
  },
  {
    icon: Clock,
    title: "No Time Limits",
    description: "Trade at your own pace. No rush to pass the challenge — take the time you need.",
  },
  {
    icon: Shield,
    title: "Secure & Transparent",
    description: "Real-time tracking, transparent rules, and instant notifications on your progress.",
  },
  {
    icon: Zap,
    title: "Instant Payouts",
    description: "Request withdrawals anytime. Get paid within 24 hours via crypto or bank transfer.",
  },
  {
    icon: Target,
    title: "Simple Rules",
    description: "Clear and fair trading rules. No hidden conditions or surprise disqualifications.",
  },
  {
    icon: DollarSign,
    title: "Affordable Entry",
    description: "Start your funded trading journey with plans as low as $49. Discounts available.",
  },
];

const packages = [
  {
    name: "Starter",
    accountSize: 10000,
    originalPrice: 99,
    discountedPrice: 49,
    discountPercentage: 50,
    isPopular: false,
    features: ["$10,000 Account", "80% Profit Split", "No Time Limit", "Daily Drawdown: 5%", "Max Drawdown: 10%"],
  },
  {
    name: "Standard",
    accountSize: 25000,
    originalPrice: 199,
    discountedPrice: 149,
    discountPercentage: 25,
    isPopular: false,
    features: ["$25,000 Account", "80% Profit Split", "No Time Limit", "Daily Drawdown: 5%", "Max Drawdown: 10%"],
  },
  {
    name: "Professional",
    accountSize: 50000,
    originalPrice: 299,
    discountedPrice: 199,
    discountPercentage: 33,
    isPopular: true,
    features: ["$50,000 Account", "85% Profit Split", "No Time Limit", "Daily Drawdown: 5%", "Max Drawdown: 10%"],
  },
  {
    name: "Elite",
    accountSize: 100000,
    originalPrice: 499,
    discountedPrice: 349,
    discountPercentage: 30,
    isPopular: false,
    features: ["$100,000 Account", "90% Profit Split", "No Time Limit", "Daily Drawdown: 5%", "Max Drawdown: 10%"],
  },
  {
    name: "Master",
    accountSize: 200000,
    originalPrice: 899,
    discountedPrice: 599,
    discountPercentage: 33,
    isPopular: false,
    features: ["$200,000 Account", "90% Profit Split", "No Time Limit", "Daily Drawdown: 5%", "Max Drawdown: 10%"],
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Choose Your Plan",
    description: "Select a funding package that matches your trading goals and risk appetite.",
  },
  {
    step: 2,
    title: "Pass the Challenge",
    description: "Demonstrate your trading skills by hitting the profit target while following the rules.",
  },
  {
    step: 3,
    title: "Get Funded",
    description: "Once you pass, receive your funded account and start trading real capital.",
  },
  {
    step: 4,
    title: "Earn & Withdraw",
    description: "Keep up to 90% of your profits. Request withdrawals anytime — paid within 24 hours.",
  },
];

const tradingRules = [
  { rule: "Profit Target", phase1: "8%", phase2: "5%", funded: "—" },
  { rule: "Daily Drawdown", phase1: "5%", phase2: "5%", funded: "5%" },
  { rule: "Max Drawdown", phase1: "10%", phase2: "10%", funded: "10%" },
  { rule: "Minimum Trading Days", phase1: "5 days", phase2: "5 days", funded: "—" },
  { rule: "Time Limit", phase1: "Unlimited", phase2: "Unlimited", funded: "Unlimited" },
  { rule: "Profit Split", phase1: "—", phase2: "—", funded: "Up to 90%" },
];

const benefits = [
  {
    icon: BadgePercent,
    title: "Up to 90% Profit Split",
    description: "Industry-leading payout ratios that reward your skill.",
  },
  {
    icon: Clock,
    title: "No Time Limits",
    description: "Trade at your own pace — no pressure, no deadlines.",
  },
  {
    icon: Wallet,
    title: "24-Hour Payouts",
    description: "Request withdrawals anytime and get paid within a day.",
  },
  {
    icon: Scale,
    title: "Fair & Transparent",
    description: "Clear rules with no hidden conditions or fine print.",
  },
  {
    icon: Repeat,
    title: "Free Retakes",
    description: "Hit the profit target? Get a free retry if you breach.",
  },
  {
    icon: ShieldCheck,
    title: "Real Capital",
    description: "Trade real funds — not simulated demo environments.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Dedicated support team available around the clock.",
  },
  {
    icon: TrendingUp,
    title: "Scaling Plan",
    description: "Grow your account size as you prove consistency.",
  },
];

const testimonials = [
  {
    name: "Alex Thompson",
    rating: 5,
    content: "AlphaFundX changed my trading career. Got funded within 2 weeks and already withdrawn over $5,000 in profits!",
    image: null,
  },
  {
    name: "Sarah Chen",
    rating: 5,
    content: "The most transparent prop firm I've worked with. No hidden rules, no surprises. Highly recommended.",
    image: null,
  },
  {
    name: "Michael Rivera",
    rating: 5,
    content: "Instant payouts, great support team, and fair rules. This is exactly what traders need.",
    image: null,
  },
  {
    name: "Emma Williams",
    rating: 4,
    content: "Started with the $25K account and scaled up to $100K. The profit split is amazing!",
    image: null,
  },
  {
    name: "David Park",
    rating: 5,
    content: "The scaling plan is incredible. Went from $50K to $200K in under 3 months. Best decision I ever made.",
    image: null,
  },
  {
    name: "Fatima Al-Rashid",
    rating: 5,
    content: "As a forex trader from Dubai, finding a trustworthy prop firm was crucial. AlphaFundX exceeded all my expectations.",
    image: null,
  },
];

const faqs = [
  {
    question: "What is a funded trading challenge?",
    answer: "A funded trading challenge is a program where you demonstrate your trading skills on a simulated account. Once you pass the challenge by meeting the profit target while staying within risk limits, you receive access to a real funded account to trade with.",
  },
  {
    question: "How long do I have to pass the challenge?",
    answer: "There is no time limit on any of our challenges. You can take as long as you need to reach the profit target. Trade at your own pace without pressure.",
  },
  {
    question: "What is the profit split?",
    answer: "Our profit split ranges from 80% to 90% depending on your account size. Larger accounts receive higher profit splits, with our Elite and Master plans offering up to 90%.",
  },
  {
    question: "How do withdrawals work?",
    answer: "Once you're funded, you can request a withdrawal at any time through your dashboard. We process withdrawals within 24 hours via cryptocurrency (BTC, USDT) or bank transfer.",
  },
  {
    question: "What trading instruments can I trade?",
    answer: "You can trade Forex pairs, Indices, Commodities, and Crypto CFDs. We support a wide range of instruments across multiple markets.",
  },
  {
    question: "Is there a refund policy?",
    answer: "Yes, we offer a full refund if you pass the challenge. The challenge fee is returned to you along with your first profit split payment.",
  },
  {
    question: "Can I hold trades overnight or over the weekend?",
    answer: "Yes, you can hold trades overnight. Weekend holding is also allowed but be mindful of gaps. There are no restrictions on holding duration.",
  },
  {
    question: "What happens if I breach a rule?",
    answer: "If you breach the daily drawdown or max drawdown limits, your account will be closed. However, depending on your plan, you may be eligible for a free retake so you can try again without additional cost.",
  },
];

// ==========================================
// Page Component
// ==========================================
export default function HomePage() {
  return (
    <div className="relative">
      {/* ========== FIXED ANIMATED BACKGROUND ========== */}
      <div className="fixed inset-0 z-[-1] bg-[#1C1A21]">
        <Threads
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
          color={[0.15, 1.0, 0.37]}
        />
      </div>

      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Trade Without{" "}
              <span className="text-gradient-green glow-text">Limits</span>
              <br />
              <span className="text-muted-foreground">Get Funded Today</span>
            </h1>

            {/* Subheading */}
            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Prove your trading skills and get funded with up to{" "}
              <span className="text-foreground font-semibold">$200,000</span> in
              capital. Keep up to{" "}
              <span className="text-primary font-semibold">90% profit split</span>{" "}
              with no time limits.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow font-semibold px-8 h-12 text-base"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link href="/#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base border-white/10 hover:bg-white/5"
                >
                  How It Works
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
              >
                <stat.icon className="size-5 text-primary" />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section id="features" className="py-24 lg:py-32 bg-gradient-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Why Choose AlphaFundX
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Everything You Need to{" "}
              <span className="text-gradient-green">Succeed</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide the tools, capital, and support you need to become a successful funded trader.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={fadeInUp} transition={{ duration: 0.5 }}>
                <GlowCard className="h-full">
                  <div className="p-6 lg:p-8 space-y-4">
                    <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10">
                      <feature.icon className="size-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== PACKAGES SECTION ========== */}
      <section id="packages" className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Funding Packages
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Start With <span className="text-gradient-green">$49</span>
              <br />
              <span className="text-muted-foreground text-2xl sm:text-3xl">
                Choose the plan that fits your goals
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
          >
            {packages.map((pkg) => (
              <motion.div key={pkg.name} variants={fadeInUp} transition={{ duration: 0.5 }} className="h-full">
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="135 100 57"
                  backgroundColor="#232930"
                  borderRadius={12}
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={false}
                  colors={['#26FF5E', '#19B226', '#34D399']}
                  className="h-full"
                >
                  <div
                    className={`relative p-6 transition-all duration-300 h-full flex flex-col ${pkg.isPopular
                      ? "shadow-lg shadow-primary/10"
                      : ""
                      }`}
                  >
                    {/* Popular badge */}
                    {pkg.isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-green text-xs font-bold text-primary-foreground uppercase">
                        Most Popular
                      </div>
                    )}

                    <div className="space-y-4 flex-1">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{pkg.name}</h3>
                        <p className="text-2xl font-bold text-primary mt-1">
                          ${pkg.accountSize.toLocaleString()}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="space-y-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-foreground">
                            ${pkg.discountedPrice}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            ${pkg.originalPrice}
                          </span>
                        </div>
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-primary/10 text-primary">
                          {pkg.discountPercentage}% OFF
                        </span>
                      </div>

                      {/* Features */}
                      <ul className="space-y-2.5 pt-2">
                        {pkg.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <Check className="size-4 text-primary shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link href="/register" className="mt-6 block">
                      <Button
                        className={`w-full font-semibold ${pkg.isPopular
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-subtle"
                          : "bg-white/[0.06] text-foreground hover:bg-white/10"
                          }`}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-gradient-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Start Trading in{" "}
              <span className="text-gradient-green">4 Simple Steps</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Connector line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[calc(100%-20%)] h-px bg-gradient-to-r from-primary/30 to-transparent" />
                )}

                <div className="text-center lg:text-left space-y-4">
                  <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-bold text-xl">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== TRADING RULES ========== */}
      <section id="rules" className="py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Trading Rules
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Clear & <span className="text-gradient-green">Fair Rules</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              No hidden conditions. Know exactly what you need to achieve.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            <div className="rounded-xl border border-white/[0.06] bg-card shadow-2xl relative z-10 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Rule
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-primary">
                      Phase 1
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-primary">
                      Phase 2
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-primary">
                      Funded
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tradingRules.map((item, i) => (
                    <tr
                      key={item.rule}
                      className={`border-b border-white/[0.04] ${i % 2 === 0 ? "" : "bg-white/[0.01]"
                        }`}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {item.rule}
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-muted-foreground">
                        {item.phase1}
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-muted-foreground">
                        {item.phase2}
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-muted-foreground">
                        {item.funded}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== BENEFITS SECTION ========== */}
      <section id="benefits" className="py-24 lg:py-32 bg-gradient-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Benefits
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Why Traders{" "}
              <span className="text-gradient-green">Choose Us</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We&apos;ve built the most trader-friendly funded program in the industry.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="group"
              >
                <div className="relative p-5 lg:p-6 rounded-xl border border-white/[0.06] bg-card hover:border-primary/20 transition-all duration-300 h-full">
                  {/* Hover glow */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative space-y-3">
                    <div className="flex items-center justify-center size-11 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors duration-300">
                      <benefit.icon className="size-5 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Real Results From{" "}
              <span className="text-gradient-green">Real Traders</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Don&apos;t just take our word for it — hear from traders who&apos;ve been funded.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            <TestimonialCarousel testimonials={testimonials} />
          </motion.div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section id="faq" className="py-24 lg:py-32 bg-gradient-section">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Frequently Asked{" "}
              <span className="text-gradient-green">Questions</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know before getting started.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            <Accordion className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={index}
                  className="rounded-xl border border-white/[0.06] bg-card overflow-hidden px-6 hover:border-primary/15 transition-colors duration-300"
                >
                  <AccordionTrigger className="text-foreground font-medium hover:text-primary hover:no-underline transition-colors py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-transparent">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            className="space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Ready to Start Your{" "}
              <span className="text-gradient-green glow-text">Funded</span>{" "}
              Trading Journey?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of traders who are already earning with AlphaFundX.
              Your trading career starts here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-strong font-semibold px-10 h-14 text-lg"
                >
                  Get Funded Today
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg border-white/10 hover:bg-white/5"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}