"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

const previewDonuts = [
  "/donuts/double-chocolate.webp",
  "/donuts/vanillian.webp",
  "/donuts/oreo-dream.webp",
];

export default function HeroSection() {
  return (
    <section className="section-dark relative min-h-screen flex items-center overflow-hidden lg:overflow-visible">
      {/* Decorative ring */}
      <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none hidden lg:block">
        <div className="w-full h-full rounded-full border border-[#BC8157]/10 animate-spin-slow" />
        <div className="absolute inset-8 rounded-full border border-[#BC8157]/15" style={{ animation: "spin-slow 14s linear infinite reverse" }} />
      </div>

      {/* Blob lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-[500px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(188,129,87,0.12) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(188,129,87,0.07) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 items-center">

          {/* ── Text ── */}
          <div>
<motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-none mb-6"
            >
              Add{" "}
              <span className="text-[#BC8157] relative inline-block">
                flavour
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M1 5.5C50 1.5 150 1.5 199 5.5" stroke="#BC8157" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              to your day
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/60 text-lg leading-relaxed mb-10 max-w-md"
            >
              Gogoși artizanale realizate cu ingrediente naturale premium,
              rețete originale și multă dragoste. Fiecare gogoașă spune o
              poveste unică de gust.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 bg-[#BC8157] hover:bg-[#9a6540] text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-xl hover:shadow-[#BC8157]/30 hover:-translate-y-0.5"
              >
                Descoperă meniul
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 border border-[var(--border-mid)] hover:border-[#BC8157] text-[var(--text-70)] hover:text-[#BC8157] px-8 py-4 rounded-full font-semibold transition-all"
              >
                Creează cont
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {previewDonuts.map((src, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-[#BC8157]/40 overflow-hidden shadow-md">
                    <Image src={src} alt="" width={36} height={36} className="object-cover w-full h-full" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
                </div>
                <p className="text-xs text-white/40 mt-0.5">Apreciat de sute de clienți</p>
              </div>
            </motion.div>
          </div>

          {/* ── Video ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center lg:pl-4 lg:-mr-20"
          >
            <div className="relative w-full">
              {/* Glow */}
              <div className="absolute -inset-6 rounded-[2.5rem] blur-3xl opacity-35 pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(188,129,87,0.5) 0%, transparent 70%)" }} />
              {/* Video */}
              <div className="relative rounded-[2rem] overflow-hidden border border-[#BC8157]/20 shadow-2xl shadow-[#BC8157]/20" style={{ aspectRatio: "16/9" }}>
                <video
                  src="/hero.mp4"
                  autoPlay muted loop playsInline
                  className="w-full h-full object-cover block"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#080300]/60 to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
