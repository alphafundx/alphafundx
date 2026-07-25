"use client";

import { Sidebar } from "@/components/shared/sidebar";
import { TopBar } from "@/components/shared/top-bar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PageLoading } from "@/components/shared/loading-spinner";
import { PageTransition } from "@/components/shared/page-transition";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    } else if (status === "authenticated" && (session?.user as { role?: string })?.role === "ADMIN") {
      router.replace("/admin");
    }
  }, [status, session, router]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <PageLoading message="Loading dashboard..." />
      </div>
    );
  }

  if ((session?.user as { role?: string })?.role === "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <PageLoading message="Redirecting..." />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar variant="user" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 p-6 lg:p-8 relative transform-gpu">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
