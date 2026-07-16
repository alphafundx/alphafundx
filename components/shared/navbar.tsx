"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Packages", href: "/#packages" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated" && !!session?.user;
  const userRole = (session?.user as { role?: string })?.role;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = () => setIsUserMenuOpen(false);
    if (isUserMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () =>
        document.removeEventListener("click", handleClickOutside);
    }
  }, [isUserMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        isScrolled
          ? "bg-[#1C1A21]/95 backdrop-blur-md border-b border-white/[0.05]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between lg:h-16">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3.5 py-2 text-[13px] font-medium transition-colors duration-150 rounded-md",
                  "text-white/50 hover:text-white/80",
                  pathname === link.href && "text-white"
                )}
              >
                {link.title}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-5 bg-[#26FF5E]"
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.5,
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-2.5">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsUserMenuOpen(!isUserMenuOpen);
                  }}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center justify-center size-7 rounded-full bg-[#26FF5E]/10 border border-[#26FF5E]/20 text-[#26FF5E] font-semibold text-xs">
                    {(session.user?.name || "U").charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[13px] font-medium text-white/70 max-w-[100px] truncate">
                    {session.user?.name || "User"}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-3.5 text-white/30 transition-transform",
                      isUserMenuOpen && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.12 }}
                      className="absolute right-0 mt-1.5 w-48 rounded-lg border border-white/[0.06] bg-[#232930] shadow-xl shadow-black/40 overflow-hidden"
                    >
                      <div className="px-3.5 py-2.5 border-b border-white/[0.05]">
                        <p className="text-[13px] font-medium text-white/80 truncate">
                          {session.user?.name}
                        </p>
                        <p className="text-[11px] text-white/30 truncate">
                          {session.user?.email}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          href={
                            userRole === "ADMIN" ? "/admin" : "/dashboard"
                          }
                          className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-white/50 hover:text-white hover:bg-white/[0.04] transition-colors"
                        >
                          <LayoutDashboard className="size-3.5" />
                          {userRole === "ADMIN"
                            ? "Admin Panel"
                            : "Dashboard"}
                        </Link>
                        <Link
                          href="/dashboard/profile"
                          className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-white/50 hover:text-white hover:bg-white/[0.04] transition-colors"
                        >
                          <User className="size-3.5" />
                          Profile
                        </Link>
                      </div>
                      <div className="border-t border-white/[0.05] py-1">
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="flex items-center gap-2.5 w-full px-3.5 py-2 text-[13px] text-white/50 hover:text-red-400 hover:bg-red-500/5 transition-colors"
                        >
                          <LogOut className="size-3.5" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/50 hover:text-white text-[13px] h-8 px-3"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className="bg-[#26FF5E] text-[#0a0a0a] hover:bg-[#26FF5E]/90 font-semibold text-[13px] h-8 px-5"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-white/50 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-[#1C1A21]/98 backdrop-blur-md border-t border-white/[0.05]"
          >
            <div className="px-4 py-5 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                    "text-white/50 hover:text-white hover:bg-white/[0.03]",
                    pathname === link.href && "text-white bg-white/[0.04]"
                  )}
                >
                  {link.title}
                </Link>
              ))}

              <div className="pt-3 space-y-2 border-t border-white/[0.05] mt-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      href={
                        userRole === "ADMIN" ? "/admin" : "/dashboard"
                      }
                      className="block"
                    >
                      <Button
                        variant="outline"
                        className="w-full text-sm h-9 border-white/[0.06] text-white/60"
                      >
                        <LayoutDashboard className="size-3.5 mr-2" />
                        {userRole === "ADMIN"
                          ? "Admin Panel"
                          : "Dashboard"}
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full text-sm h-9 text-white/40 hover:text-red-400"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      <LogOut className="size-3.5 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block">
                      <Button
                        variant="outline"
                        className="w-full text-sm h-9 border-white/[0.06] text-white/60"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" className="block">
                      <Button className="w-full text-sm h-9 bg-[#26FF5E] text-[#0a0a0a] hover:bg-[#26FF5E]/90 font-semibold">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
