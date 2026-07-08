import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";

const martius = localFont({
  src: "../fonts/Martius-LV9L4.ttf",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tradexa | Funded Trading Challenges",
    template: "%s | Tradexa",
  },
  description:
    "Get funded to trade with Tradexa. Pass our trading challenge and access up to $200,000 in funded capital. Up to 90% profit split, no time limits.",
  keywords: [
    "funded trading",
    "prop firm",
    "trading challenge",
    "forex funded account",
    "funded trader",
    "prop trading",
    "Tradexa",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Tradexa",
    title: "Tradexa | Funded Trading Challenges",
    description:
      "Get funded to trade with Tradexa. Pass our trading challenge and access up to $200,000 in funded capital.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tradexa | Funded Trading Challenges",
    description:
      "Get funded to trade with Tradexa. Pass our trading challenge and access up to $200,000 in funded capital.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark h-full antialiased", martius.variable)}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
