"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  // Close user menu on click outside
  useEffect(() => {
    const handleClickOutside = () => setIsUserMenuOpen(false);
    if (isUserMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isUserMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xs bg-background/60",
        isScrolled
          ? "border-b border-white/[0.06] shadow-lg shadow-black/20"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg",
                  "text-muted-foreground hover:text-foreground",
                  pathname === link.href && "text-foreground"
                )}
              >
                {link.title}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 bg-primary rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsUserMenuOpen(!isUserMenuOpen);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center justify-center size-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 text-primary font-semibold text-sm">
                    {(session.user?.name || "U").charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
                    {session.user?.name || "User"}
                  </span>
                  <ChevronDown className={cn("size-4 text-muted-foreground transition-transform", isUserMenuOpen && "rotate-180")} />
                </button>

                {/* User dropdown */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 rounded-xl border border-white/[0.08] bg-card shadow-2xl shadow-black/40 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-white/[0.06]">
                        <p className="text-sm font-medium text-foreground truncate">{session.user?.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{session.user?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href={userRole === "ADMIN" ? "/admin" : "/dashboard"}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors"
                        >
                          <LayoutDashboard className="size-4" />
                          {userRole === "ADMIN" ? "Admin Panel" : "Dashboard"}
                        </Link>
                        <Link
                          href="/dashboard/profile"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors"
                        >
                          <User className="size-4" />
                          Profile
                        </Link>
                      </div>
                      <div className="border-t border-white/[0.06] py-1">
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
                        >
                          <LogOut className="size-4" />
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
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 glow-subtle font-semibold px-6"
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
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden glass border-t border-white/[0.06]"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                      "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]",
                      pathname === link.href && "text-primary bg-primary/5"
                    )}
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-4 space-y-3 border-t border-white/[0.06]">
                {isAuthenticated ? (
                  <>
                    <Link href={userRole === "ADMIN" ? "/admin" : "/dashboard"} className="block">
                      <Button variant="outline" className="w-full">
                        <LayoutDashboard className="size-4 mr-2" />
                        {userRole === "ADMIN" ? "Admin Panel" : "Dashboard"}
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full text-muted-foreground hover:text-destructive"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      <LogOut className="size-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block">
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" className="block">
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-subtle font-semibold">
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
