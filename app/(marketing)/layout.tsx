import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { AnnouncementBanner } from "@/components/shared/announcement-banner";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
