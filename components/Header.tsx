"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, Menu, X, User, LogOut, Sun, Moon, ShieldCheck } from "lucide-react";
import { useCartStore, useAuthStore, useThemeStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Acasă" },
  { href: "/menu", label: "Meniu" },
  { href: "/galerie", label: "Galerie" },
  { href: "/evenimente", label: "Evenimente" },
  { href: "/povestea-noastra", label: "Povestea noastră" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const totalItems = useCartStore((s) => s.totalItems);
  const openCart = useCartStore((s) => s.openCart);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggle);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? "backdrop-blur-xl shadow-xl border-b border-[#BC8157]/10"
        : "bg-transparent"
    }`}
      style={scrolled ? { background: "var(--header-scrolled-bg)" } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="Donut Studio"
              width={160} height={80}
              className="h-20 w-auto group-hover:scale-105 transition-transform"
              unoptimized
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}
                  className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={{ color: active ? "var(--brand-text)" : scrolled ? "var(--text-70)" : theme === "dark" ? "rgba(240,221,200,0.85)" : "rgba(26,8,4,0.75)" }}
                >
                  {link.label}
                  {active && (
                    <motion.div layoutId="nav-indicator"
                      className="absolute inset-0 bg-[#BC8157]/10 rounded-full border border-[#BC8157]/20"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            {mounted && (
              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-full hover:bg-[#BC8157]/10 transition-colors"
                style={{ color: scrolled ? "var(--text-70)" : theme === "dark" ? "rgba(240,221,200,0.75)" : "rgba(26,8,4,0.65)" }}
                aria-label="Schimbă tema"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            )}

            {mounted && (user ? (
              <div className="hidden lg:flex items-center gap-2">
                <Link href="/account"
                  className="flex items-center gap-1.5 text-sm hover:text-[#BC8157] transition-colors px-3 py-2 rounded-full hover:bg-[#BC8157]/10"
                  style={{ color: scrolled ? "var(--text-70)" : theme === "dark" ? "rgba(240,221,200,0.85)" : "rgba(26,8,4,0.75)" }}
                >
                  <User size={15} />
                  <span>{user.name.split(" ")[0]}</span>
                </Link>
                <button onClick={logout}
                  className="p-2 rounded-full hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  style={{ color: scrolled ? "var(--text-40)" : theme === "dark" ? "rgba(240,221,200,0.55)" : "rgba(26,8,4,0.45)" }}
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link href="/login"
                  className="text-sm hover:text-[#BC8157] font-medium px-4 py-2 rounded-full hover:bg-[#BC8157]/10 transition-all"
                  style={{ color: scrolled ? "var(--text-70)" : theme === "dark" ? "rgba(240,221,200,0.85)" : "rgba(26,8,4,0.75)" }}
                >
                  Autentificare
                </Link>
                <Link href="/register"
                  className="text-sm bg-[#BC8157] text-white px-5 py-2.5 rounded-full hover:bg-[#9a6540] transition-all font-medium shadow-lg shadow-[#BC8157]/20"
                >
                  Cont nou
                </Link>
              </div>
            ))}

            {/* Admin icon */}
            {mounted && user?.role === "ADMIN" && (
              <motion.button
                onClick={() => router.push("/admin")}
                whileTap={{ scale: 0.9 }}
                title="Panou admin"
                className="relative p-2.5 rounded-full transition-colors"
                style={{ color: "#BC8157", background: "rgba(188,129,87,0.12)" }}
              >
                <ShieldCheck size={18} />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#BC8157] rounded-full" />
              </motion.button>
            )}

            {/* Cart */}
            <button onClick={openCart}
              className="relative p-2.5 rounded-full hover:text-[#BC8157] hover:bg-[#BC8157]/10 transition-colors"
              style={{ color: scrolled ? "var(--text-80)" : theme === "dark" ? "rgba(240,221,200,0.90)" : "rgba(26,8,4,0.80)" }}
            >
              <ShoppingBag size={20} />
              {mounted && (
                <AnimatePresence>
                  {totalItems() > 0 && (
                    <motion.span
                      key={totalItems()}
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#BC8157] text-white text-[10px] rounded-full flex items-center justify-center font-bold"
                    >
                      {totalItems()}
                    </motion.span>
                  )}
                </AnimatePresence>
              )}
            </button>

            {/* Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-[#BC8157]/10 transition-colors"
              style={{ color: scrolled ? "var(--text-80)" : theme === "dark" ? "rgba(240,221,200,0.90)" : "rgba(26,8,4,0.80)" }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden backdrop-blur-xl border-t border-[#BC8157]/10 shadow-2xl"
            style={{ background: "var(--mobile-menu-bg)" }}
          >
            <div className="px-5 py-5 flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                      active ? "bg-[#BC8157]/15" : "hover:bg-[#BC8157]/10"
                    }`}
                    style={{ color: active ? "var(--brand-text)" : "var(--text-70)" }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="border-t border-[#BC8157]/10 mt-3 pt-4 flex flex-col gap-2">
                {mounted && (user ? (
                  <>
                    {user.role === "ADMIN" && (
                      <Link href="/admin" onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm"
                        style={{ color: "#BC8157", background: "rgba(188,129,87,0.08)" }}>
                        <ShieldCheck size={15} /> Panou admin
                      </Link>
                    )}
                    <Link href="/account" onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm hover:bg-[#BC8157]/10"
                      style={{ color: "var(--text-70)" }}>
                      <User size={15} /> Contul meu
                    </Link>
                    <button onClick={() => { logout(); setMobileOpen(false); }}
                      className="px-4 py-3 rounded-2xl text-sm text-left text-red-500 hover:bg-red-500/10">
                      Deconectare
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setMobileOpen(false)}
                      className="text-sm font-medium text-center border border-[#BC8157]/30 text-[#BC8157] px-4 py-3 rounded-2xl hover:bg-[#BC8157]/10">
                      Autentificare
                    </Link>
                    <Link href="/register" onClick={() => setMobileOpen(false)}
                      className="text-sm font-medium text-center bg-[#BC8157] text-white px-4 py-3 rounded-2xl hover:bg-[#9a6540]">
                      Cont nou
                    </Link>
                  </>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
