"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

type Step = {
  number: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Choose Your Package",
    description:
      "Select the package that fits your trading goals and preferred account size.",
  },
  {
    number: "02",
    title: "Get Your Demo Account",
    description:
      "After payment, you’ll receive access to a demo trading account to begin your journey.",
  },
  {
    number: "03",
    title: "Pass the Evaluation",
    description:
      "Trade with discipline and meet the required profit target to prove your consistency.",
  },
  {
    number: "04",
    title: "Earn Real Profits",
    description:
      "Once you qualify, move to a real trading account and earn from the profits you generate.",
  },
];

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.2"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const springHeight = useSpring(lineHeight, { stiffness: 120, damping: 20 });

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-background/20 backdrop-blur-sm py-24 text-white"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,102,0.12),transparent_35%),radial-gradient(circle_at_bottom,rgba(0,255,102,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-[#66ff99]">
            How It Works
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            A simple process to{" "}
            <span className="text-[#66ff99]">get started</span>
          </h2>
          <p className="mt-5 text-base leading-7 text-white/65">
            Follow these four steps to move from package selection to earning
            real profits through live trading.
          </p>
        </div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block">
            <div className="absolute inset-0 bg-white/10" />
            <motion.div
              className="absolute top-0 left-0 w-px bg-gradient-to-b from-[#66ff99] via-[#1eea6f] to-[#66ff99] shadow-[0_0_24px_rgba(102,255,153,0.85)]"
              style={{ height: springHeight }}
            />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-[#66ff99] shadow-[0_0_30px_rgba(102,255,153,0.95)]" />
          </div>

          <div className="space-y-10 md:space-y-0">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.number}
                  className="relative grid items-center gap-6 md:grid-cols-2 md:gap-0 md:py-10"
                >
                  {/* Left Column */}
                  <div className={`flex w-full ${isLeft ? "justify-end md:pr-16 md:text-right" : ""}`}>
                    {isLeft && (
                      <StepCard step={step} index={index} side="left" />
                    )}
                  </div>

                  {/* Absolute Center Dot */}
                  <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 justify-center md:flex">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative z-10 h-5 w-5 rounded-full bg-[#66ff99] shadow-[0_0_24px_rgba(102,255,153,0.95)]"
                    >
                      <span className="absolute inset-0 animate-ping rounded-full bg-[#66ff99] opacity-30" />
                    </motion.div>
                  </div>

                  {/* Right Column */}
                  <div className={`flex w-full ${!isLeft ? "justify-start md:pl-16" : ""}`}>
                    {!isLeft && <StepCard step={step} index={index} side="right" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
  side,
}: {
  step: Step;
  index: number;
  side: "left" | "right";
}) {
  const isLeft = side === "left";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:border-[#66ff99]/30 hover:bg-white/7 md:max-w-md ${
        isLeft ? "md:ml-auto" : ""
      }`}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#66ff99]/25 bg-[#66ff99]/10 text-sm font-semibold text-[#66ff99] shadow-[0_0_20px_rgba(102,255,153,0.12)]">
          {step.number}
        </div>

        <div className="h-px flex-1 bg-gradient-to-r from-[#66ff99]/30 to-transparent" />
      </div>

      <h3 className="text-xl font-semibold tracking-tight text-white">
        {step.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-white/65">{step.description}</p>

      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5 group-hover:ring-[#66ff99]/20" />
      <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-r from-[#66ff99]/0 via-[#66ff99]/0 to-[#66ff99]/0 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}
