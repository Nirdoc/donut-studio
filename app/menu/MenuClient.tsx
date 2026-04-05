"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";
import { Search } from "lucide-react";

type Category = "all" | "classic" | "fruity" | "premium";

const categoryLabels: Record<Category, string> = {
  all: "Toate",
  classic: "Clasice",
  fruity: "Fructate",
  premium: "Premium",
};

export default function MenuClient({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="section-base min-h-screen">
      {/* Hero */}
      <div className="section-dark pt-32 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-30"
            style={{ background: "radial-gradient(ellipse, rgba(188,129,87,0.4) 0%, transparent 70%)", transform: "translateX(-50%) translateY(-50%)" }} />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#BC8157] font-medium text-sm uppercase tracking-widest mb-3"
        >
          Artisanal Pastry
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl lg:text-6xl text-white mb-4"
        >
          Meniu
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/60 max-w-md mx-auto"
        >
          13 arome artizanale, fiecare cu povestea ei unică. Coapte proaspăt
          zilnic, de luni până vineri.
        </motion.p>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BC8157]/60"
            />
            <input
              type="text"
              placeholder="Caută o aromă..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#BC8157]/15 input-dark text-sm"
            />
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap">
            {(["all", "classic", "fruity", "premium"] as Category[]).map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-[#BC8157] text-white shadow-md shadow-[#BC8157]/30"
                      : "bg-white text-[#1a1008]/70 border border-[#BC8157]/15 hover:border-[#BC8157]"
                  }`}
                >
                  {categoryLabels[cat]}
                </button>
              )
            )}
          </div>
        </div>

        {/* Results count */}
        <p className="text-[var(--text-40)] text-sm mb-6">
          {filtered.length} {filtered.length === 1 ? "produs" : "produse"}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-[#1a1008]/40 text-lg">
              Nu am găsit produse pentru "{search}"
            </p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("all"); }}
              className="mt-4 text-[#BC8157] font-medium hover:underline"
            >
              Resetează filtrele
            </button>
          </div>
        )}

        {/* Info box */}
        <div className="mt-16 card rounded-3xl p-8 text-center">
          <p className="text-[var(--text)] font-semibold mb-2">
            Comandă pentru evenimente?
          </p>
          <p className="text-[var(--text-55)] text-sm mb-4">
            Oferim cutii cu mini-gogoși asortate, donut walls și servicii
            complete de catering pentru nunți, botezuri și corporate events.
          </p>
          <a
            href="tel:0745018888"
            className="inline-flex items-center gap-2 bg-[#BC8157] text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-[#9a6540] transition-colors"
          >
            Contactează-ne: 0745 018 888
          </a>
        </div>
      </div>
    </div>
  );
}
