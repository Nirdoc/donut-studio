"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const IMAGES = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  src: `/galerie/${i + 1}.webp`,
  alt: `Donut Studio — fotografie ${i + 1}`,
}));

// Assign span classes for masonry-like effect
const SPANS = [
  "row-span-2", "row-span-1", "row-span-1", "row-span-2", "row-span-1",
  "row-span-1", "row-span-2", "row-span-1", "row-span-1", "row-span-2",
  "row-span-1", "row-span-1", "row-span-2", "row-span-1", "row-span-1",
  "row-span-2", "row-span-1", "row-span-1", "row-span-2", "row-span-1",
  "row-span-1", "row-span-2", "row-span-1", "row-span-1", "row-span-2",
  "row-span-1", "row-span-1", "row-span-2", "row-span-1", "row-span-1",
  "row-span-2", "row-span-1", "row-span-1", "row-span-2", "row-span-1",
  "row-span-1", "row-span-2", "row-span-1", "row-span-1", "row-span-2",
];

export default function GalerieClient() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => setLightbox(index), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prev = useCallback(() => {
    setLightbox((i) => (i !== null ? (i - 1 + IMAGES.length) % IMAGES.length : null));
  }, []);

  const next = useCallback(() => {
    setLightbox((i) => (i !== null ? (i + 1) % IMAGES.length : null));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") closeLightbox();
    },
    [prev, next, closeLightbox]
  );

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#BC8157]/8 rounded-full blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-[#BC8157] mb-4 px-4 py-1.5 rounded-full border border-[#BC8157]/25 bg-[#BC8157]/8">
            Vizualuri
          </span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[var(--text)] leading-[1.05] mb-5">
            Galerie
          </h1>
          <p className="text-[var(--text-muted)] text-lg max-w-xl mx-auto leading-relaxed">
            Fiecare fotografie spune o poveste despre pasiunea și arta din spatele fiecărui donut artizanal.
          </p>
        </motion.div>
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mx-auto mt-10 w-16 h-px bg-gradient-to-r from-transparent via-[#BC8157] to-transparent"
        />
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] gap-3"
        >
          {IMAGES.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (index % 8) * 0.05 }}
              onClick={() => openLightbox(index)}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-[#1e0e05] ${SPANS[index]}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0502]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full bg-[#BC8157]/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <ZoomIn size={18} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-[#0d0502]/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-sm text-[var(--text-muted)] font-medium tabular-nums">
              {lightbox + 1} / {IMAGES.length}
            </div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#BC8157]/15 border border-[#BC8157]/20 text-[var(--text)] flex items-center justify-center hover:bg-[#BC8157]/30 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#BC8157]/15 border border-[#BC8157]/20 text-[var(--text)] flex items-center justify-center hover:bg-[#BC8157]/30 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#BC8157]/15 border border-[#BC8157]/20 text-[var(--text)] flex items-center justify-center hover:bg-[#BC8157]/30 transition-colors"
            >
              <ChevronRight size={20} />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-2xl overflow-hidden shadow-2xl border border-[#BC8157]/15"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMAGES[lightbox].src}
                alt={IMAGES[lightbox].alt}
                className="block max-w-[90vw] max-h-[85vh] w-auto h-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
