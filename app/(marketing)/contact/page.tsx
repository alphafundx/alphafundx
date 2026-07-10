"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-gradient-section">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Get in <span className="text-gradient-green">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our challenges? Need support with your account? Our team is available 24/7.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-8"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="How can we help?"
                ></textarea>
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-subtle font-semibold py-6 text-base">
                Send Message
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8 flex flex-col justify-center"
          >
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10 shrink-0">
                <Mail className="size-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Email Support</h3>
                <p className="text-muted-foreground mt-1">support@alphafundx.com</p>
                <p className="text-sm text-muted-foreground mt-1">We aim to reply within 2 hours.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10 shrink-0">
                <Phone className="size-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Phone Support</h3>
                <p className="text-muted-foreground mt-1">+1 (555) 123-4567</p>
                <p className="text-sm text-muted-foreground mt-1">Mon-Fri from 8am to 5pm EST.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10 shrink-0">
                <MapPin className="size-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Headquarters</h3>
                <p className="text-muted-foreground mt-1">Dubai, UAE</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
