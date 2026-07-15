"use client";

import { useEffect, useState } from "react";
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
import { ProcessTimeline } from "@/components/marketing/process-timeline";
import { BenefitsSection } from "@/components/marketing/benefits-section";
import { TestimonialCarousel } from "@/components/marketing/testimonial-carousel";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Threads from "@/components/Threads";
import { usePackageStore } from "@/lib/stores/package-store";

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
const defaultStats = [
  { label: "Funded Traders", value: "—", icon: Users },
  { label: "Capital Funded", value: "—", icon: DollarSign },
  { label: "Profit Split", value: "Up to 80%", icon: TrendingUp },
  { label: "Countries", value: "150+", icon: Globe },
];

const features = [
  {
    icon: TrendingUp,
    title: "Up to 80% Profit Split",
    description: "Keep up to 80% of the profits you generate. One of the highest splits in the industry.",
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

const tradingRules = [
  { rule: "Profit Target", phase1: "8%", phase2: "5%", funded: "—" },
  { rule: "Daily Drawdown", phase1: "5%", phase2: "5%", funded: "5%" },
  { rule: "Max Drawdown", phase1: "10%", phase2: "10%", funded: "10%" },
  { rule: "Minimum Trading Days", phase1: "5 days", phase2: "5 days", funded: "—" },
  { rule: "Time Limit", phase1: "Unlimited", phase2: "Unlimited", funded: "Unlimited" },
  { rule: "Profit Split", phase1: "—", phase2: "—", funded: "Up to 80%" },
];

// Old benefits array removed

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
    answer: "Our profit split ranges from 70% to 80% depending on your account size. Larger accounts receive higher profit splits, with our Elite and Master plans offering up to 80%.",
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
  const storePackages = usePackageStore((s) => s.packages).filter((p) => p.isActive);
  const [stats, setStats] = useState(defaultStats);
  const [testimonials, setTestimonials] = useState<{ name: string; rating: number; content: string; image: string | null }[]>([]);
  const [apiPackages, setApiPackages] = useState<typeof storePackages | null>(null);

  useEffect(() => {
    // Fetch stats and testimonials from API
    fetch("/api/stats")
      .then((r) => r.json())
      .then((data) => {
        if (data.stats) {
          setStats([
            { label: "Funded Traders", value: data.stats.fundedTraders, icon: Users },
            { label: "Capital Funded", value: data.stats.capitalFunded, icon: DollarSign },
            { label: "Profit Split", value: data.stats.profitSplit, icon: TrendingUp },
            { label: "Countries", value: data.stats.countries, icon: Globe },
          ]);
        }
        if (data.testimonials) {
          setTestimonials(
            data.testimonials.map((t: { userName: string; rating: number; content: string; userImage: string | null }) => ({
              name: t.userName,
              rating: t.rating,
              content: t.content,
              image: t.userImage,
            }))
          );
        }
      })
      .catch(() => {});

    // Fetch packages from API
    fetch("/api/packages")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setApiPackages(
            data.map((p: { id: string; name: string; accountSize: number; originalPrice: number; discountedPrice: number | null; discountPercentage: number | null; features: string[]; isPopular: boolean }) => ({
              id: p.id,
              name: p.name,
              accountSize: p.accountSize,
              originalPrice: p.originalPrice,
              discountedPrice: p.discountedPrice || p.originalPrice,
              discountPercentage: p.discountPercentage || 0,
              profitSplit: "",
              features: Array.isArray(p.features) ? p.features : [],
              isPopular: p.isPopular,
              isActive: true,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const packages = apiPackages || storePackages;

  // Dynamically compute the grid columns based on number of packages
  const gridCols =
    packages.length <= 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : packages.length === 4
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";

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
              <span className="text-primary font-semibold">80% profit split</span>{" "}
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
                className="flex flex-col items-center gap-3 p-4"
              >
                <stat.icon className="size-6 md:size-8 text-primary" />
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-center">
                  {typeof stat.value === "string" && stat.value.toLowerCase().startsWith("up to ") ? (
                    <span className="flex flex-col items-center">
                      <span className="text-xl md:text-2xl text-muted-foreground font-semibold tracking-tight mb-[-4px]">Up to</span>
                      <span>{stat.value.replace(/up to /i, "")}</span>
                    </span>
                  ) : (
                    stat.value
                  )}
                </p>
                <p className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</p>
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
            className={`grid ${gridCols} gap-5`}
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
      <ProcessTimeline />

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
            <div className="rounded-2xl border border-white/[0.08] bg-card/80 backdrop-blur-sm shadow-2xl shadow-black/20 relative z-10 overflow-hidden">
              {/* Gradient top border accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-gradient-to-r from-primary/[0.04] via-primary/[0.06] to-primary/[0.04]">
                    <th className="px-6 lg:px-8 py-5 text-left text-sm font-bold text-foreground tracking-wide">
                      Rule
                    </th>
                    <th className="px-6 lg:px-8 py-5 text-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                        Phase 1
                      </span>
                    </th>
                    <th className="px-6 lg:px-8 py-5 text-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                        Phase 2
                      </span>
                    </th>
                    <th className="px-6 lg:px-8 py-5 text-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
                        ✦ Funded
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tradingRules.map((item, i) => (
                    <tr
                      key={item.rule}
                      className={`border-b border-white/[0.04] transition-colors duration-200 hover:bg-primary/[0.02] ${
                        i % 2 === 0 ? "" : "bg-white/[0.015]"
                      }`}
                    >
                      <td className="px-6 lg:px-8 py-5 text-sm font-semibold text-foreground">
                        <div className="flex items-center gap-2">
                          <div className="size-1.5 rounded-full bg-primary/60" />
                          {item.rule}
                        </div>
                      </td>
                      <td className="px-6 lg:px-8 py-5 text-center">
                        <span className={`text-sm font-medium ${
                          item.phase1 === "—" ? "text-muted-foreground/50" : "text-foreground"
                        }`}>
                          {item.phase1}
                        </span>
                      </td>
                      <td className="px-6 lg:px-8 py-5 text-center">
                        <span className={`text-sm font-medium ${
                          item.phase2 === "—" ? "text-muted-foreground/50" : "text-foreground"
                        }`}>
                          {item.phase2}
                        </span>
                      </td>
                      <td className="px-6 lg:px-8 py-5 text-center">
                        <span className={`text-sm font-medium ${
                          item.funded === "—"
                            ? "text-muted-foreground/50"
                            : item.funded.includes("90%")
                            ? "text-primary font-bold"
                            : "text-foreground"
                        }`}>
                          {item.funded}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Bottom gradient accent */}
              <div className="px-6 lg:px-8 py-4 bg-gradient-to-r from-primary/[0.02] to-transparent border-t border-white/[0.04]">
                <p className="text-xs text-muted-foreground/70">
                  ✦ All rules are applied to your account equity, not balance. No hidden conditions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== BENEFITS SECTION ========== */}
      <BenefitsSection />

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
            {testimonials.length > 0 ? (
              <TestimonialCarousel testimonials={testimonials} />
            ) : (
              <div className="text-center py-12 text-muted-foreground text-sm">Loading testimonials...</div>
            )}
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