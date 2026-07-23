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
  Eye,
  FileText,
  Activity,
  ChevronDown,
} from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import { Button } from "@/components/ui/button";
import { TestimonialCarousel } from "@/components/marketing/testimonial-carousel";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { usePackageStore } from "@/lib/stores/package-store";

// ==========================================
// Animation Variants (subtle, professional)
// ==========================================
const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
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
    icon: Eye,
    title: "Full Account Visibility",
    description:
      "Track your challenge progress, balance, and profit targets in real time through your personal dashboard. No guesswork.",
  },
  {
    icon: Scale,
    title: "Transparent Trading Rules",
    description:
      "Every rule is published upfront — drawdown limits, profit targets, and trading restrictions. No hidden conditions or surprises.",
  },
  {
    icon: Shield,
    title: "Manual Review Process",
    description:
      "Every account transition is reviewed by our team. No automated disqualifications. Fair, human-driven evaluation at every stage.",
  },
  {
    icon: Wallet,
    title: "Structured Withdrawal Process",
    description:
      "Request payouts directly from your dashboard. All withdrawals are reviewed and processed within 24 hours.",
  },
  {
    icon: HeadphonesIcon,
    title: "Direct Support Channel",
    description:
      "Reach our team via Telegram or email. Account delivery, challenge questions, and withdrawal support — we respond within hours.",
  },
  {
    icon: BarChart3,
    title: "Package Tracking & Status",
    description:
      "From purchase to funded account — every stage of your journey is tracked and visible. Know exactly where you stand.",
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

const steps = [
  {
    number: "01",
    title: "Choose a Plan",
    description: "Select a funding package based on your preferred account size and trading goals.",
  },
  {
    number: "02",
    title: "Complete the Challenge",
    description: "Trade on a demo account. Meet the profit target while staying within drawdown limits.",
  },
  {
    number: "03",
    title: "Get Funded",
    description: "Pass the evaluation and receive access to a real funded trading account.",
  },
  {
    number: "04",
    title: "Request Payouts",
    description: "Earn real profits and request withdrawals directly through your dashboard.",
  },
];

const faqs = [
  {
    question: "What is a funded trading challenge?",
    answer:
      "A funded trading challenge is a structured evaluation program. You trade on a demo account with specific rules — if you meet the profit target while respecting drawdown limits, you qualify for a real funded account with actual capital.",
  },
  {
    question: "How long do I have to complete the challenge?",
    answer:
      "There is no time limit. You can trade at your own pace and take as long as you need to reach the profit target. The only requirement is a minimum of 5 trading days per phase.",
  },
  {
    question: "What is the profit split?",
    answer:
      "Funded traders keep up to 80% of the profits they generate. The exact split depends on your account size and plan tier.",
  },
  {
    question: "How do withdrawals work?",
    answer:
      "Once funded, you can submit a withdrawal request through your dashboard at any time. Requests are reviewed by our team and processed within 24 hours via crypto (BTC, USDT) or bank transfer.",
  },
  {
    question: "What instruments can I trade?",
    answer:
      "You can trade Forex pairs, Indices, Commodities, and Crypto CFDs on MetaTrader 5. A wide range of instruments across multiple markets.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "If you pass the challenge and receive a funded account, your challenge fee is refunded with your first profit split payment. See our Refund Policy page for full details.",
  },
  {
    question: "What happens if I breach a rule?",
    answer:
      "If you exceed the daily or maximum drawdown limit, your account is closed. Depending on your plan, you may be eligible for a free retry to attempt the challenge again.",
  },
  {
    question: "Can I hold trades overnight or over the weekend?",
    answer:
      "Yes. There are no restrictions on holding duration. Overnight and weekend holds are permitted, but be mindful of market gaps.",
  },
];

// ==========================================
// Page Component
// ==========================================
export default function HomePage() {
  const storePackages = usePackageStore((s) => s.packages).filter((p) => p.isActive);
  const [stats, setStats] = useState(defaultStats);
  const defaultTestimonials = [
    {
      name: "Marcus T.",
      rating: 5,
      content: "AlphaFundX provided the capital I needed to scale my trading strategy. The dashboard is intuitive, and payouts are always processed within 24 hours without fail.",
      image: null,
    },
    {
      name: "Sarah L.",
      rating: 5,
      content: "The transparency is what sets them apart. No hidden rules or gotchas. You hit the target, respect the drawdown, and you get funded. It's that simple.",
      image: null,
    },
    {
      name: "David K.",
      rating: 4,
      content: "I've tried multiple prop firms, but the structured evaluation here feels the most professional. Support is highly responsive when you need them.",
      image: null,
    },
  ];

  const [testimonials, setTestimonials] = useState<
    { name: string; rating: number; content: string; image: string | null }[]
  >(defaultTestimonials);
  const [apiPackages, setApiPackages] = useState<typeof storePackages | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((data) => {
        if (data.stats) {
          setStats([
            { label: data.stats.fundedTradersLabel || "Funded Traders", value: data.stats.fundedTraders, icon: Users },
            { label: data.stats.capitalFundedLabel || "Capital Funded", value: data.stats.capitalFunded, icon: DollarSign },
            { label: data.stats.profitSplitLabel || "Profit Split", value: data.stats.profitSplit, icon: TrendingUp },
            { label: data.stats.countriesLabel || "Countries", value: data.stats.countries, icon: Globe },
          ]);
        }
        if (data.testimonials && data.testimonials.length > 0) {
          setTestimonials(
            data.testimonials.map(
              (t: {
                userName: string;
                rating: number;
                content: string;
                userImage: string | null;
              }) => ({
                name: t.userName,
                rating: t.rating,
                content: t.content,
                image: t.userImage,
              })
            )
          );
        }
      })
      .catch(() => { });

    fetch("/api/packages")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setApiPackages(
            data.map(
              (p: {
                id: string;
                name: string;
                accountSize: number;
                originalPrice: number;
                discountedPrice: number | null;
                discountPercentage: number | null;
                description?: string | null;
                features: string[];
                isPopular: boolean;
              }) => ({
                id: p.id,
                name: p.name,
                accountSize: p.accountSize,
                originalPrice: p.originalPrice,
                discountedPrice: p.discountedPrice || p.originalPrice,
                discountPercentage: p.discountPercentage || 0,
                profitSplit: "",
                description: p.description,
                features: Array.isArray(p.features) ? p.features : [],
                isPopular: p.isPopular,
                isActive: true,
              })
            )
          );
        }
      })
      .catch(() => { });
  }, []);

  const packages = apiPackages || storePackages;

  const gridCols =
    packages.length <= 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : packages.length === 4
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";

  return (
    <div className="relative bg-[#1C1A21]">
      {/* ========== HERO SECTION ========== */}
      <section className="relative pt-[136px] pb-16 lg:pt-[176px] lg:pb-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/assets/hero-bg-nolg.webp')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl py-12 lg:py-24">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold tracking-tight leading-[1.15] text-white">
                Get Funded Up to{" "}
                <span className="text-[#26FF5E]">$200,000</span>
                <br />
                <span className="text-white/60">
                  and Keep Up to 80% of Profits
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-white/60 leading-relaxed max-w-lg">
                AlphaFundX is a funded trading challenge platform.
                Prove your skills on a demo account, pass the evaluation,
                and trade with real capital. Transparent rules, no time limits,
                structured payouts.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/register">
                  <Button className="bg-[#26FF5E] text-[#0a0a0a] hover:bg-[#26FF5E]/90 font-semibold px-8 h-14 text-xl">
                    Start Your Challenge
                    <ArrowRight className="ml-2 size-5" />
                  </Button>
                </Link>
                <Link href="/#how-it-works">
                  <Button
                    variant="outline"
                    className="h-14 px-8 text-xl border-white/[0.1] text-white/70 hover:text-white hover:bg-white/[0.04] hover:border-white/[0.15]"
                  >
                    How It Works
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4 text-xs text-white/40">
                <div className="flex items-center gap-1.5">
                  <Shield className="size-3.5 text-[#26FF5E]/60" />
                  <span>No time limits</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-[#26FF5E]/60" />
                  <span>Transparent rules</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="size-3.5 text-[#26FF5E]/60" />
                  <span>24h payouts</span>
                </div>
              </div>
            </motion.div>


          </div>
        </div>
      </section>

      {/* ========== STATS BAR ========== */}
      <section className="relative border-y border-white/[0.04] bg-[#232930]/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.04]"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4 px-6 py-6 lg:py-8">
                <stat.icon className="size-5 text-[#26FF5E] shrink-0" />
                <div>
                  <p className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-lg text-white/40 mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section id="features" className="py-16 lg:py-20 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight mb-2">
              Platform Capabilities
            </h2>
            <p className="text-lg sm:text-xl font-medium text-[#19B226] tracking-tight">
              Built for Transparency and Accountability
            </p>
            <p className="mt-3 text-xl text-zinc-600 max-w-2xl">
              Every feature is designed to give traders clarity, visibility,
              and confidence throughout the evaluation and funding process.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 rounded-xl overflow-hidden border border-zinc-200"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeIn}
                transition={{ duration: 0.4 }}
                className="bg-white p-6 lg:p-8 hover:bg-zinc-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center size-9 rounded-lg bg-[#19B226]/10 border border-[#19B226]/20">
                    <feature.icon className="size-4.5 text-[#19B226]" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xl text-zinc-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== PACKAGES SECTION ========== */}
      <section id="packages" className="py-16 lg:py-20 bg-[#1C1A21]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-2">
              Funding Packages
            </h2>
            <p className="text-lg sm:text-xl font-medium text-[#26FF5E] tracking-tight">
              Choose Your Account Size
            </p>
            <p className="mt-3 text-xl text-white/60 max-w-3xl">
              Select a plan that matches your trading experience and capital requirements.
              All packages include the same transparent rules and evaluation process.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className={`grid ${gridCols} gap-4`}
          >
            {packages.map((pkg) => (
              <motion.div
                key={pkg.name}
                variants={fadeIn}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <BorderGlow
                  className={`!rounded-xl h-full transition-colors duration-200 ${pkg.isPopular
                      ? "!border-[#26FF5E]/40 ring-1 ring-[#26FF5E]/20"
                      : "!border-white/[0.08]"
                    }`}
                  backgroundColor="#232930"
                  glowColor={pkg.isPopular ? "135 100 57" : "0 0 100"}
                  colors={pkg.isPopular ? ["#26FF5E", "#19B226", "#0f3d17"] : ["#ffffff", "#aaaaaa", "#333333"]}
                  borderRadius={12}
                  glowRadius={40}
                  edgeSensitivity={40}
                  fillOpacity={0.15}
                  animated={true}
                >
                  <div className="relative h-full flex flex-col">
                  {/* Popular badge */}
                  {pkg.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#26FF5E] text-[10px] font-bold text-[#0a0a0a] uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}

                  <div className="p-5 lg:p-6 flex-1 flex flex-col">
                    {/* Package name & size */}
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-white">{pkg.name}</h3>
                      <p className="text-xl font-bold text-[#26FF5E] mt-1">
                        ${pkg.accountSize.toLocaleString()}
                        <span className="text-xs font-normal text-white/30 ml-1.5">account</span>
                      </p>
                    </div>

                    {/* Price */}
                    <div className="pb-4 mb-4 border-b border-white/[0.06]">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white">
                          ${pkg.discountedPrice}
                        </span>
                        {pkg.discountPercentage > 0 && (
                          <span className="text-xs text-white/30 line-through">
                            ${pkg.originalPrice}
                          </span>
                        )}
                      </div>
                      {pkg.discountPercentage > 0 && (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#26FF5E]/10 text-[#26FF5E]">
                          {pkg.discountPercentage}% OFF
                        </span>
                      )}
                    </div>

                    {/* Description & Features */}
                    <div className="flex-1 flex flex-col gap-4">
                      {pkg.description && (
                        <p className="text-xl text-white/70 leading-relaxed whitespace-pre-line">
                          {pkg.description}
                        </p>
                      )}
                      
                      {pkg.features && pkg.features.length > 0 && (
                        <ul className="space-y-2">
                          {pkg.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2 text-xl text-white/60"
                            >
                              <Check className="size-3.5 text-[#26FF5E]/70 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <Link href={`/checkout/${pkg.id}`} className="mt-5 block">
                      <Button
                        className={`w-full text-xl font-semibold h-14 ${pkg.isPopular
                            ? "bg-[#26FF5E] text-[#0a0a0a] hover:bg-[#26FF5E]/90"
                            : "bg-white/[0.06] text-white hover:bg-white/[0.1]"
                          }`}
                      >
                        Buy Challenge
                      </Button>
                    </Link>
                  </div>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="how-it-works" className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight mb-2">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl font-medium text-[#19B226] tracking-tight">
              From Purchase to Payout in Four Steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-zinc-200 rounded-xl overflow-hidden border border-zinc-200">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-zinc-50 p-6 lg:p-8 relative"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-[#19B226]">{step.number}</span>
                  {i < 3 && (
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-4">
                      <ChevronRight className="size-4 text-zinc-300" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">{step.title}</h3>
                <p className="text-xl text-zinc-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TRADING RULES ========== */}
      <section id="rules" className="py-16 lg:py-20 bg-[#1C1A21]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-2">
              Challenge Rules
            </h2>
            <p className="text-lg sm:text-xl font-medium text-[#26FF5E] tracking-tight">
              Trading Rules & Requirements
            </p>
            <p className="mt-3 text-xl text-white/60 max-w-3xl">
              All rules are applied to account equity and are consistent across all package sizes.
              No hidden conditions.
            </p>
          </motion.div>

          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            <div className="rounded-xl border border-white/[0.06] bg-[#232930] overflow-hidden">
              <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="px-4 sm:px-5 lg:px-6 py-4 text-left text-sm sm:text-lg font-semibold text-white/60 uppercase tracking-wider">
                      Rule
                    </th>
                    <th className="px-4 sm:px-5 lg:px-6 py-4 text-center text-sm sm:text-lg font-semibold text-white/60 uppercase tracking-wider">
                      Phase 1
                    </th>
                    <th className="px-4 sm:px-5 lg:px-6 py-4 text-center text-sm sm:text-lg font-semibold text-white/60 uppercase tracking-wider">
                      Phase 2
                    </th>
                    <th className="px-4 sm:px-5 lg:px-6 py-4 text-center text-sm sm:text-lg font-semibold text-[#26FF5E]/80 uppercase tracking-wider">
                      Funded
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tradingRules.map((item, i) => (
                    <tr
                      key={item.rule}
                      className={`border-b border-white/[0.03] ${i % 2 === 1 ? "bg-white/[0.01]" : ""
                        }`}
                    >
                      <td className="px-4 sm:px-5 lg:px-6 py-4 text-base sm:text-xl font-medium text-white/80">
                        {item.rule}
                      </td>
                      <td className="px-4 sm:px-5 lg:px-6 py-4 text-center text-base sm:text-xl text-white/60">
                        {item.phase1}
                      </td>
                      <td className="px-4 sm:px-5 lg:px-6 py-4 text-center text-base sm:text-xl text-white/60">
                        {item.phase2}
                      </td>
                      <td className="px-4 sm:px-5 lg:px-6 py-4 text-center text-base sm:text-xl font-medium text-white/80">
                        {item.funded}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <div className="px-4 sm:px-5 lg:px-6 py-3 bg-white/[0.01] border-t border-white/[0.03]">
                <p className="text-sm sm:text-lg text-white/30">
                  All rules apply to account equity. Drawdown limits are calculated from the highest equity point.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== BENEFITS SECTION ========== */}
      <section className="py-16 lg:py-20 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: content */}
            <motion.div
              {...fadeIn}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileInView="animate"
              initial="initial"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight mb-2">
                Why AlphaFundX
              </h2>
              <p className="text-lg sm:text-xl font-medium text-[#19B226] tracking-tight mb-4">
                A Platform Built on Discipline and Transparency
              </p>
              <p className="text-xl text-zinc-600 leading-relaxed mb-8">
                We focus on what matters to serious traders — clear rules,
                visible progress, fair evaluations, and reliable payouts.
                No hype, no hidden conditions.
              </p>

              <div className="space-y-4">
                {[
                  { label: "Up to 80% profit split", desc: "One of the highest splits available for funded traders." },
                  { label: "No time limits", desc: "Complete the challenge at your own pace. No pressure, no deadlines." },
                  { label: "Real-time account tracking", desc: "Monitor your balance, drawdown, and progress directly in your dashboard." },
                  { label: "24-hour withdrawal processing", desc: "Submit payout requests anytime. Processed within one business day." },
                  { label: "Free retry on eligible plans", desc: "If you don't pass on the first attempt, retake the challenge at no cost." },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="mt-0.5 flex items-center justify-center size-5 rounded-full bg-[#19B226]/10 border border-[#19B226]/20 shrink-0">
                      <Check className="size-3 text-[#19B226]" />
                    </div>
                    <div>
                      <p className="text-xl font-medium text-zinc-900">{item.label}</p>
                      <p className="text-xl text-zinc-600 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Key metrics panel */}
            <motion.div
              {...fadeIn}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileInView="animate"
              initial="initial"
              className="space-y-4"
            >
              <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                  Platform Highlights
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { metric: "Up to 80%", label: "Profit Split" },
                    { metric: "No Limit", label: "Time to Pass" },
                    { metric: "$200K", label: "Max Account Size" },
                    { metric: "24 Hours", label: "Payout Processing" },
                    { metric: "MT5", label: "Trading Platform" },
                    { metric: "Free", label: "Retry (Eligible Plans)" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg bg-zinc-50 border border-zinc-100">
                      <p className="text-xl font-bold text-zinc-900">{item.metric}</p>
                      <p className="text-xl text-zinc-500 mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                  Supported Instruments
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Forex Pairs", "Indices", "Commodities", "Crypto CFDs"].map((instrument) => (
                    <span
                      key={instrument}
                      className="px-3 py-1.5 rounded-md text-xl font-medium bg-zinc-50 border border-zinc-200 text-zinc-700"
                    >
                      {instrument}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-16 lg:py-20 bg-[#1C1A21]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-2">
              Trader Feedback
            </h2>
            <p className="text-lg sm:text-xl font-medium text-[#26FF5E] tracking-tight">
              From Our Funded Traders
            </p>
            <p className="mt-3 text-xl text-white/60 max-w-3xl">
              Real feedback from traders who have completed the evaluation and are trading with funded accounts.
            </p>
          </motion.div>

          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            {testimonials.length > 0 ? (
              <TestimonialCarousel testimonials={testimonials} />
            ) : (
              <div className="text-center py-8 text-white/30 text-sm">
                Loading testimonials...
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section id="faq" className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            className="mb-10"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight mb-2">
              FAQ
            </h2>
            <p className="text-lg sm:text-xl font-medium text-[#19B226] tracking-tight">
              Common Questions
            </p>
            <p className="mt-3 text-xl text-zinc-600">
              Clear answers to help you understand how the platform works before you get started.
            </p>
          </motion.div>

          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
          >
            <Accordion className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={index.toString()}
                  className="rounded-lg border border-zinc-200 bg-zinc-50 overflow-hidden px-5 hover:border-zinc-300 transition-colors duration-200"
                >
                  <AccordionTrigger className="text-xl text-zinc-900 font-medium hover:text-zinc-700 hover:no-underline transition-colors py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xl text-zinc-600 leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-16 lg:py-20 border-t border-white/[0.04] bg-[#1C1A21]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            className="space-y-5"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Ready to Begin Your Challenge?
            </h2>
            <p className="text-xl text-white/45 max-w-lg mx-auto">
              Select a package, complete the evaluation, and start trading with real capital.
              Transparent rules, no time pressure, structured payouts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href="/register">
                <Button className="bg-[#26FF5E] text-[#0a0a0a] hover:bg-[#26FF5E]/90 font-semibold px-10 h-14 text-xl">
                  Start Your Challenge
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="h-14 px-8 text-xl border-white/[0.1] text-white/70 hover:text-white hover:bg-white/[0.04] hover:border-white/[0.15]"
                >
                  Contact Support
                </Button>
              </Link>
            </div>
            <p className="text-lg text-white/25 pt-2">
              Trading involves risk. Past performance is not indicative of future results.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}