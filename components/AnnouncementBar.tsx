"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
  "🚚 Livrăm doar în București și Ilfov",
  "🍩 Comandă minimă: 16 donuts per livrare",
];

export default function AnnouncementBar({ visible }: { visible: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="overflow-hidden transition-all duration-500 ease-in-out"
      style={{ maxHeight: visible ? "32px" : "0px", opacity: visible ? 1 : 0 }}
    >
      <div
        className="h-8 flex items-center justify-center overflow-hidden"
        style={{
          background: "#0A0503",
          borderBottom: "1px solid rgba(188,129,87,0.18)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            className="text-[10px] font-semibold uppercase tracking-[0.22em] text-center px-4"
            style={{ color: "#BC8157" }}
          >
            {MESSAGES[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
