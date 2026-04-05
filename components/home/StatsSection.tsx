"use client";

import { motion } from "framer-motion";

const stats = [
  { number: "13+", label: "Arome unice" },
  { number: "100%", label: "Ingrediente naturale" },
  { number: "Zilnic", label: "Proaspăt copt" },
  { number: "★ 5.0", label: "Rating clienți" },
];

export default function StatsSection() {
  return (
    <section className="section-warm py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-display text-3xl lg:text-4xl text-[#BC8157] mb-2">
                {stat.number}
              </p>
              <p className="text-[#f0ddc8]/55 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
