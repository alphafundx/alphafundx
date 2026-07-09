import Link from "next/link";
import { Logo } from "./logo";
import {
  MessageCircle,
  Send,
  Mail,
  MapPin,
  Phone,
  Globe,
  AtSign,
} from "lucide-react";

const footerLinks = {
  company: [
    { title: "About Us", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Careers", href: "#" },
    { title: "Blog", href: "#" },
  ],
  trading: [
    { title: "Funding Packages", href: "/#packages" },
    { title: "Trading Rules", href: "/#rules" },
    { title: "How It Works", href: "/#how-it-works" },
    { title: "FAQ", href: "/#faq" },
  ],
  legal: [
    { title: "Terms of Service", href: "#" },
    { title: "Privacy Policy", href: "#" },
    { title: "Refund Policy", href: "#" },
    { title: "Risk Disclosure", href: "#" },
  ],
};

const socialLinks = [
  { icon: AtSign, href: "#", label: "Twitter" },
  { icon: Globe, href: "#", label: "Instagram" },
  { icon: MessageCircle, href: "#", label: "Discord" },
  { icon: Send, href: "#", label: "Telegram" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#151319]">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Logo size="lg" />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              AlphaFundX provides funded trading accounts for talented traders.
              Pass our challenge and trade with up to $200,000 in capital with
              up to 90% profit split.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="size-4 text-primary/70" />
                <span>support@alphafundx.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="size-4 text-primary/70" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="size-4 text-primary/70" />
                <span>Dubai, UAE</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center size-10 rounded-lg bg-white/[0.04] border border-white/[0.06] text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                >
                  <social.icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Trading
            </h3>
            <ul className="space-y-3">
              {footerLinks.trading.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AlphaFundX. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Trading involves risk. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
