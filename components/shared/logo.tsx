import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ className, size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 40, text: "text-xl" },
    md: { icon: 64, text: "text-3xl" },
    lg: { icon: 80, text: "text-4xl" },
  };

  const { icon, text } = sizes[size];

  return (
    <Link href="/" className={cn("flex items-center gap-2.5 group", className)}>
      {/* Logo Mark */}
      <div className="relative flex items-center justify-center">
        <Image
          src="/assets/logo-green.png"
          alt="AlphaFundX Logo"
          width={icon}
          height={icon}
          quality={100}
          priority
          className="object-contain transition-transform duration-300 group-hover:scale-110"
        />
        {/* Glow behind logo */}
        <div className="absolute inset-0 rounded-full bg-[#26FF5E]/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Wordmark */}
      {showText && (
        <span
          className={cn(
            "font-bold tracking-tight",
            text
          )}
        >
          <span className="text-foreground">AlphaFund</span>
          <span className="text-gradient-green">X</span>
        </span>
      )}
    </Link>
  );
}
