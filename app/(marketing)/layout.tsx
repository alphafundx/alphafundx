import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { AnnouncementBanner } from "@/components/shared/announcement-banner";

export const dynamic = "force-dynamic";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBanner />
      <Navbar />
      <main className="flex-1 -mt-20 lg:-mt-24">{children}</main>
      <Footer />
    </>
  );
}
