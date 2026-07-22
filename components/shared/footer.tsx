"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { Mail, Phone, MapPin } from "lucide-react";

interface PublicSettings {
  contactEmail?: string;
  supportPhone?: string;
  twitterUrl?: string;
  twitterEnabled?: boolean;
  discordUrl?: string;
  discordEnabled?: boolean;
  telegramUrl?: string;
  telegramEnabled?: boolean;
  instagramUrl?: string;
  instagramEnabled?: boolean;
}

const footerLinks = {
  company: [
    { title: "About Us", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
  trading: [
    { title: "Funding Packages", href: "/#packages" },
    { title: "Trading Rules", href: "/#rules" },
    { title: "How It Works", href: "/#how-it-works" },
    { title: "FAQ", href: "/#faq" },
  ],
  legal: [
    { title: "Terms & Conditions", href: "/terms" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Refund Policy", href: "/refund" },
  ],
};

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  const [settings, setSettings] = useState<PublicSettings | null>(null);

  useEffect(() => {
    fetch("/api/settings/public")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setSettings(data);
      })
      .catch(() => {});
  }, []);

  const socialLinks = [
    {
      name: "Twitter",
      url: settings?.twitterUrl || "https://twitter.com/alphafundx",
      enabled: settings?.twitterEnabled !== false,
      icon: TwitterIcon,
    },
    {
      name: "Discord",
      url: settings?.discordUrl || "https://discord.gg/alphafundx",
      enabled: settings?.discordEnabled !== false,
      icon: DiscordIcon,
    },
    {
      name: "Telegram",
      url: settings?.telegramUrl || "https://t.me/alphafundx",
      enabled: settings?.telegramEnabled !== false,
      icon: TelegramIcon,
    },
    {
      name: "Instagram",
      url: settings?.instagramUrl || "https://instagram.com/alphafundx",
      enabled: settings?.instagramEnabled !== false,
      icon: InstagramIcon,
    },
  ].filter((s) => s.enabled && s.url);

  return (
    <footer className="border-t border-white/[0.04] bg-[#1C1A21]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Logo size="lg" />
            <p className="text-sm text-white/40 leading-relaxed max-w-sm">
              AlphaFundX provides funded trading accounts for disciplined
              traders. Pass the evaluation and trade with up to $200,000 in
              real capital.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5">
              {settings?.contactEmail && (
                <div className="flex items-center gap-2.5 text-xs text-white/35">
                  <Mail className="size-3.5 text-[#26FF5E]/50" />
                  <span>{settings.contactEmail}</span>
                </div>
              )}
              {settings?.supportPhone && (
                <div className="flex items-center gap-2.5 text-xs text-white/35">
                  <Phone className="size-3.5 text-[#26FF5E]/50" />
                  <span>{settings.supportPhone}</span>
                </div>
              )}
              <div className="flex items-center gap-2.5 text-xs text-white/35">
                <MapPin className="size-3.5 text-[#26FF5E]/50" />
                <span>Dubai, UAE</span>
              </div>
            </div>

            {/* Enabled Social Media Links */}
            {socialLinks.length > 0 && (
              <div className="pt-2">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                  Follow Us
                </p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-[#26FF5E] hover:border-[#26FF5E]/30 hover:bg-[#26FF5E]/10 transition-all"
                      >
                        <Icon className="size-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Link Columns */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/35 hover:text-white/60 transition-colors duration-150"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Trading
            </h3>
            <ul className="space-y-2">
              {footerLinks.trading.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/35 hover:text-white/60 transition-colors duration-150"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/35 hover:text-white/60 transition-colors duration-150"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.04] py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/25">
            © {new Date().getFullYear()} AlphaFundX. All rights reserved.
          </p>
          <p className="text-[11px] text-white/20">
            Trading involves risk. Past performance is not indicative of
            future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
