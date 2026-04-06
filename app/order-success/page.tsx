"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ShoppingBag, Home } from "lucide-react";
import Image from "next/image";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 pt-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={48} className="text-green-500" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-4xl mb-3" style={{ color: "var(--text)" }}
        >
          Comandă plasată!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base leading-relaxed mb-8" style={{ color: "var(--text-60)" }}
        >
          Mulțumim pentru comanda ta! Vei primi o confirmare pe email în
          câteva minute. Gogoșile tale artizanale sunt pregătite cu drag!
        </motion.p>

        {/* Mini donuts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-3 mb-10"
        >
          {[
            "/donuts/double-chocolate.webp",
            "/donuts/raspberry-blast.webp",
            "/donuts/pistachious.webp",
          ].map((src, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              className="w-16 h-16 rounded-full overflow-hidden shadow-md border-2 border-white"
            >
              <Image src={src} alt="" width={64} height={64} className="object-cover w-full h-full" />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/account"
            className="inline-flex items-center justify-center gap-2 border-2 border-[#BC8157] text-[#BC8157] px-6 py-3 rounded-full font-semibold hover:bg-[#BC8157] hover:text-white transition-all"
          >
            <ShoppingBag size={16} />
            Istoricul meu
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#BC8157] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#9a6540] transition-colors"
          >
            <Home size={16} />
            Acasă
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
