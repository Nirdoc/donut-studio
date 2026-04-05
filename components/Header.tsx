"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, User, LogOut } from "lucide-react";
import { useCartStore, useAuthStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Acasă" },
  { href: "/menu", label: "Meniu" },
  { href: "/evenimente", label: "Evenimente" },
  { href: "/povestea-noastra", label: "Povestea noastră" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems);
  const openCart = useCartStore((s) => s.openCart);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? "bg-[#0d0502]/95 backdrop-blur-xl shadow-xl border-b border-[#BC8157]/10"
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <Image
              src="https://www.donutstudio.ro/wp-content/uploads/2024/07/donut-Studio-Artisanal-Pastry-logo_border.svg"
              alt="Donut Studio"
              width={120} height={60}
              className="h-11 w-auto group-hover:scale-105 transition-transform brightness-0 invert"
              unoptimized
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    active ? "text-[#BC8157]" : "text-[#f0ddc8]/70 hover:text-[#BC8157]"
                  }`}
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
            {user ? (
              <div className="hidden lg:flex items-center gap-2">
                <Link href="/account"
                  className="flex items-center gap-1.5 text-sm text-[#f0ddc8]/70 hover:text-[#BC8157] transition-colors px-3 py-2 rounded-full hover:bg-[#BC8157]/10"
                >
                  <User size={15} />
                  <span>{user.name.split(" ")[0]}</span>
                </Link>
                <button onClick={logout}
                  className="p-2 rounded-full text-[#f0ddc8]/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link href="/login"
                  className="text-sm text-[#f0ddc8]/70 hover:text-[#BC8157] font-medium px-4 py-2 rounded-full hover:bg-[#BC8157]/10 transition-all"
                >
                  Autentificare
                </Link>
                <Link href="/register"
                  className="text-sm bg-[#BC8157] text-white px-5 py-2.5 rounded-full hover:bg-[#9a6540] transition-all font-medium shadow-lg shadow-[#BC8157]/20"
                >
                  Cont nou
                </Link>
              </div>
            )}

            {/* Cart */}
            <button onClick={openCart}
              className="relative p-2.5 rounded-full text-[#f0ddc8]/80 hover:text-[#BC8157] hover:bg-[#BC8157]/10 transition-colors"
            >
              <ShoppingBag size={20} />
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
            </button>

            {/* Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-full text-[#f0ddc8]/80 hover:bg-[#BC8157]/10 transition-colors"
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
            className="lg:hidden bg-[#0d0502]/98 backdrop-blur-xl border-t border-[#BC8157]/10 shadow-2xl"
          >
            <div className="px-5 py-5 flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                      active ? "bg-[#BC8157]/15 text-[#BC8157]" : "text-[#f0ddc8]/70 hover:bg-[#BC8157]/10 hover:text-[#BC8157]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="border-t border-[#BC8157]/10 mt-3 pt-4 flex flex-col gap-2">
                {user ? (
                  <>
                    <Link href="/account" onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm text-[#f0ddc8]/70 hover:bg-[#BC8157]/10">
                      <User size={15} /> Contul meu
                    </Link>
                    <button onClick={() => { logout(); setMobileOpen(false); }}
                      className="px-4 py-3 rounded-2xl text-sm text-left text-red-400 hover:bg-red-500/10">
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
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
