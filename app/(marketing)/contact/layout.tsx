import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with AlphaFundX. Reach our support team via email, live chat, or our contact form. We typically respond within 24 hours.",
  openGraph: {
    title: "Contact AlphaFundX",
    description:
      "Have questions? Reach out to our support team — we're here to help.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
