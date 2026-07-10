"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-gradient-section">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            About <span className="text-gradient-green">AlphaFundX</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            AlphaFundX was founded by traders, for traders. Our mission is to empower talented individuals by providing the capital they need to unlock their full potential in the global markets.
          </p>
          <div className="glass rounded-2xl p-8 md:p-12 text-left space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              We believe that lack of capital shouldn't be the barrier that stops skilled traders from making a living. We have built an ecosystem that rewards consistency, discipline, and risk management with up to $200,000 in funded capital.
            </p>
            <h2 className="text-2xl font-bold text-foreground mt-8">Why We Are Different</h2>
            <p className="text-muted-foreground leading-relaxed">
              Unlike traditional prop firms, we focus heavily on transparency and fairness. There are no hidden rules, no time limits, and our profit splits are among the highest in the industry. We succeed only when our traders succeed.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
