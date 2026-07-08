import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ className, size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-xl" },
    lg: { icon: 40, text: "text-2xl" },
  };

  const { icon, text } = sizes[size];

  return (
    <Link href="/" className={cn("flex items-center gap-2.5 group", className)}>
      {/* Logo Mark */}
      <div className="relative">
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-110"
        >
          {/* Outer ring */}
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke="#26FF5E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 6"
            className="opacity-40"
          />
          {/* Inner hexagon shape */}
          <path
            d="M20 4L33.856 12V28L20 36L6.144 28V12L20 4Z"
            fill="url(#logo-gradient)"
            fillOpacity="0.15"
            stroke="#26FF5E"
            strokeWidth="1.5"
          />
          {/* T letter stylized */}
          <path
            d="M12 14H28M20 14V28"
            stroke="#26FF5E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Arrow up (trading) */}
          <path
            d="M20 28L20 18M20 18L16 22M20 18L24 22"
            stroke="#26FF5E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-60"
          />
          <defs>
            <linearGradient
              id="logo-gradient"
              x1="6"
              y1="4"
              x2="34"
              y2="36"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#26FF5E" />
              <stop offset="1" stopColor="#19B226" />
            </linearGradient>
          </defs>
        </svg>
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
          <span className="text-foreground">Trade</span>
          <span className="text-gradient-green">xa</span>
        </span>
      )}
    </Link>
  );
}
