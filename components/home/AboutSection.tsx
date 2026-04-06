"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Award, Heart } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Ingrediente naturale",
    desc: "Folosim exclusiv ingrediente de calitate: lapte proaspăt, unt 80%, ouă, drojdie proaspătă și esențe naturale.",
  },
  {
    icon: Award,
    title: "Rețete originale",
    desc: "Fiecare aromă este creată cu grijă, combinând tehnici artizanale cu inspirație contemporană.",
  },
  {
    icon: Heart,
    title: "Coapte cu dragoste",
    desc: "Fiecare gogoașă este un mic act de dragoste față de cei care o savurează, pregătită proaspăt zilnic.",
  },
];

export default function AboutSection() {
  return (
    <section className="section-dark py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden h-52">
                  <Image
                    src="/donuts/caramel-dash.webp"
                    alt="Caramel Dash"
                    width={300}
                    height={208}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden h-36">
                  <Image
                    src="/donuts/blueberry-rush.webp"
                    alt="Blueberry Rush"
                    width={300}
                    height={144}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-3xl overflow-hidden h-36">
                  <Image
                    src="/donuts/pistachious.webp"
                    alt="Pistachious"
                    width={300}
                    height={144}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden h-52">
                  <Image
                    src="/donuts/honey-buzz.webp"
                    alt="Honey Buzz"
                    width={300}
                    height={208}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-[#BC8157] rounded-2xl p-4 shadow-xl">
              <p className="font-display text-2xl text-white">2018</p>
              <p className="text-white/80 text-xs">Fondată în</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#BC8157] font-medium text-sm uppercase tracking-widest mb-3">
              Povestea noastră
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-[var(--text)] mb-6 leading-tight">
              Pasiune pentru
              <br />
              <span className="text-[#BC8157]">artizanat</span>
            </h2>
            <p className="text-[var(--text-70)] leading-relaxed mb-6">
              Donut Studio s-a născut dintr-o pasiune sinceră pentru cofetărie
              artizanală. Ne-am dorit să aducem în București gogoși cu adevărat
              speciale — nu doar dulciuri, ci experiențe.
            </p>
            <p className="text-[var(--text-70)] leading-relaxed mb-10">
              Locația noastră din zona Piața Victoriei este mai mult decât un
              magazin: este un spațiu în care fiecare aromă spune o poveste,
              iar fiecare mușcătură devine un moment de neuitat. Venim cu
              ingrediente naturale, rețete originale și multă dragoste pentru
              meseria noastră.
            </p>

            <div className="space-y-5">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#BC8157]/20 flex items-center justify-center flex-shrink-0">
                    <v.icon size={18} className="text-[#BC8157]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text)] text-sm mb-1">
                      {v.title}
                    </h4>
                    <p className="text-[var(--text-55)] text-sm leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
