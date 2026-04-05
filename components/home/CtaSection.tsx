"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="section-brand py-24 overflow-hidden relative">
      {/* Decorative donuts */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 animate-spin-slow pointer-events-none">
        <div className="w-96 h-96 rounded-full border-[40px] border-white" />
      </div>
      <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-white/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl lg:text-6xl text-white mb-6 leading-tight">
              Comandă acum
              <br />& bucură-te!
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Creează-ți un cont, alege aromele preferate și plasează comanda
              ta. Gogoșile noastre artizanale te așteaptă!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 bg-white text-[#BC8157] hover:bg-[#1a1008] hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
              >
                Comandă online
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white hover:border-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
              >
                Cont gratuit
              </Link>
            </div>
          </motion.div>

          {/* Mini grid of donuts */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden lg:grid grid-cols-3 gap-4"
          >
            {[
              "https://www.donutstudio.ro/wp-content/uploads/2024/07/Double-Chocolate.webp",
              "https://www.donutstudio.ro/wp-content/uploads/2021/08/Raspberry-Blast.webp",
              "https://www.donutstudio.ro/wp-content/uploads/2024/07/Pistachious.webp",
              "https://www.donutstudio.ro/wp-content/uploads/2024/07/Blueberry-Rush-1.webp",
              "https://www.donutstudio.ro/wp-content/uploads/2024/07/Caramel-Dash.webp",
              "https://www.donutstudio.ro/wp-content/uploads/2024/07/Oreo-Dream.webp",
            ].map((src, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-xl"
              >
                <Image
                  src={src}
                  alt="donut"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
