import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";

const googleSans = localFont({
  src: [
    {
      path: "../fonts/Google_Sans/static/GoogleSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Google_Sans/static/GoogleSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Google_Sans/static/GoogleSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Google_Sans/static/GoogleSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-google-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AlphaFundX | Funded Trading Challenges",
    template: "%s | AlphaFundX",
  },
  description:
    "Get funded to trade with AlphaFundX. Pass our trading challenge and access up to $200,000 in funded capital. Up to 90% profit split, no time limits.",
  keywords: [
    "funded trading",
    "prop firm",
    "trading challenge",
    "forex funded account",
    "funded trader",
    "prop trading",
    "AlphaFundX",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "AlphaFundX",
    title: "AlphaFundX | Funded Trading Challenges",
    description:
      "Get funded to trade with AlphaFundX. Pass our trading challenge and access up to $200,000 in funded capital.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlphaFundX | Funded Trading Challenges",
    description:
      "Get funded to trade with AlphaFundX. Pass our trading challenge and access up to $200,000 in funded capital.",
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
    <html lang="en" className={cn("dark h-full antialiased", googleSans.variable)}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
