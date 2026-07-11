"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  MessageCircle,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/shared/glow-card";
import { toast } from "sonner";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "We aim to reply within 2 hours.",
    value: "support@alphafundx.com",
    href: "mailto:support@alphafundx.com",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Mon-Fri from 8am to 5pm EST.",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our team in real time.",
    value: "Available 24/7",
    href: "#",
  },
  {
    icon: MapPin,
    title: "Headquarters",
    description: "Visit us at our office.",
    value: "Dubai, UAE",
    href: "#",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Message sent successfully! We'll get back to you soon.");

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="relative min-h-screen">
      {/* ========== HERO ========== */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">
              Contact Us
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Get in{" "}
              <span className="text-gradient-green">Touch</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Have questions about our challenges? Need support with your
              account? Our team is available 24/7 to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== CONTACT METHODS ========== */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {contactMethods.map((method, i) => (
              <motion.a
                key={method.title}
                href={method.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="block"
              >
                <GlowCard className="h-full">
                  <div className="p-5 space-y-3 text-center">
                    <div className="flex items-center justify-center size-11 rounded-xl bg-primary/10 mx-auto">
                      <method.icon className="size-5 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {method.title}
                    </h3>
                    <p className="text-sm text-primary font-medium">
                      {method.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {method.description}
                    </p>
                  </div>
                </GlowCard>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== CONTACT FORM + INFO ========== */}
      <section className="py-20 bg-gradient-section">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              {...fadeInUp}
              whileInView="animate"
              initial="initial"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Send us a Message
                </h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Fill out the form below and we&apos;ll get back to you as soon
                  as possible.
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Subject
                    </label>
                    <select className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                      <option value="" className="bg-card">
                        Select a topic
                      </option>
                      <option value="general" className="bg-card">
                        General Inquiry
                      </option>
                      <option value="challenge" className="bg-card">
                        Challenge Questions
                      </option>
                      <option value="payout" className="bg-card">
                        Payout / Withdrawal
                      </option>
                      <option value="technical" className="bg-card">
                        Technical Support
                      </option>
                      <option value="partnership" className="bg-card">
                        Partnership
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-subtle font-semibold py-6 text-base disabled:opacity-60"
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle2 className="mr-2 size-5" />
                        Message Sent!
                      </>
                    ) : isSubmitting ? (
                      <>
                        <div className="mr-2 size-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 size-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Info sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Office hours */}
              <div className="glass rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-semibold text-foreground">
                  Office Hours
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Mon — Fri</span>
                    <span className="text-foreground">8:00 AM — 8:00 PM EST</span>
                  </div>
                  <div className="h-px bg-white/[0.04]" />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="text-foreground">9:00 AM — 5:00 PM EST</span>
                  </div>
                  <div className="h-px bg-white/[0.04]" />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="text-foreground">Closed</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Live chat and email support available 24/7.
                </p>
              </div>

              {/* Social links */}
              <div className="glass rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-semibold text-foreground">
                  Follow Us
                </h3>
                <p className="text-xs text-muted-foreground">
                  Stay updated with the latest news and announcements.
                </p>
                <div className="flex items-center gap-3">
                  {[
                    { label: "Twitter", icon: "𝕏" },
                    { label: "Discord", icon: "💬" },
                    { label: "Telegram", icon: "✈️" },
                    { label: "Instagram", icon: "📷" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href="#"
                      title={social.label}
                      className="flex items-center justify-center size-10 rounded-lg bg-white/[0.04] border border-white/[0.06] text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 text-sm"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
