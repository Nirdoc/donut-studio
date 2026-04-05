"use client";

import { motion } from "framer-motion";
import { Cake, Users, Camera } from "lucide-react";
import Image from "next/image";

const events = [
  {
    icon: Cake,
    title: "Nunți & Botezuri",
    desc: "Servicii complete de catering cu gogoși artizanale pentru cele mai importante momente ale vieții tale.",
    image: "https://www.donutstudio.ro/wp-content/uploads/2024/07/Almond-Famous-1.webp",
  },
  {
    icon: Camera,
    title: "Donut Wall",
    desc: "Instalații spectaculoase de gogoși — perfecte pentru fotografii și un plus de savoare la orice eveniment.",
    image: "https://www.donutstudio.ro/wp-content/uploads/2024/07/Coffeelicious.webp",
  },
  {
    icon: Users,
    title: "Corporate Events",
    desc: "Cutii cu mini-gogoși asortate, ideale pentru întâlniri de afaceri, conferințe sau team-buildinguri.",
    image: "https://www.donutstudio.ro/wp-content/uploads/2024/07/Orange-Blossom.webp",
  },
];

export default function EventsSection() {
  return (
    <section className="section-base py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#BC8157] font-medium text-sm uppercase tracking-widest mb-3">Evenimente</p>
          <h2 className="font-display text-4xl lg:text-5xl text-[var(--text)]">
            Perfecte pentru<br />
            <span className="text-[#BC8157]">orice ocazie</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group card rounded-3xl overflow-hidden hover:border-[#BC8157]/35 transition-all duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <Image src={event.image} alt={event.title} fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="w-10 h-10 rounded-xl bg-[#BC8157] flex items-center justify-center">
                    <event.icon size={18} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-[var(--text)] mb-2">{event.title}</h3>
                <p className="text-[var(--text-80)] text-sm leading-relaxed">{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
