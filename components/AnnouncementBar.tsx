"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "🍩 Comandă minimă: 16 donuts per livrare",
  "🚚 Livrare gratuită pentru toate comenzile",
  "🕐 Program: Luni – Vineri, 11:00 – 19:00",
  "✨ Gogoși artizanale cu ingrediente naturale de calitate",
  "📞 Comenzi telefonice: 0745 018 888",
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % messages.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="w-full h-9 flex items-center justify-center overflow-hidden relative z-50"
      style={{ background: "#BC8157" }}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="text-xs font-medium text-white tracking-wide text-center px-4"
        >
          {messages[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
