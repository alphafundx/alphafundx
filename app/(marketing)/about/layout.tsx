import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about AlphaFundX — a funded trading platform built by traders, for traders. Discover our mission to democratize access to trading capital with fair rules and high profit splits.",
  openGraph: {
    title: "About AlphaFundX",
    description:
      "Built by traders, for traders. Learn how AlphaFundX is making funded trading accessible to everyone.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
