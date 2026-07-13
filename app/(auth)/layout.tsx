import type { Metadata } from "next";
import { Logo } from "@/components/shared/logo";

export const metadata: Metadata = {
  title: {
    template: "%s | AlphaFundX",
    default: "Sign In | AlphaFundX",
  },
  robots: { index: false, follow: false },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-hero bg-grid relative">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-accent/5 blur-[80px] pointer-events-none" />

      {/* Logo */}
      <div className="mb-8">
        <Logo size="lg" />
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-md px-4">{children}</div>

      {/* Footer text */}
      <p className="mt-8 text-xs text-muted-foreground/60">
        © {new Date().getFullYear()} AlphaFundX. All rights reserved.
      </p>
    </div>
  );
}
