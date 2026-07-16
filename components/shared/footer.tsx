import Link from "next/link";
import { Logo } from "./logo";
import { Mail, MapPin, Phone } from "lucide-react";

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

export function Footer() {
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
              <div className="flex items-center gap-2.5 text-xs text-white/35">
                <Mail className="size-3.5 text-[#26FF5E]/50" />
                <span>support@alphafundx.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/35">
                <Phone className="size-3.5 text-[#26FF5E]/50" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/35">
                <MapPin className="size-3.5 text-[#26FF5E]/50" />
                <span>Dubai, UAE</span>
              </div>
            </div>
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
