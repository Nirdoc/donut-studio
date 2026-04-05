"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Plus } from "lucide-react";
import { useCartStore } from "@/lib/store";
import type { Product } from "@/lib/products";
import { useState } from "react";

const categoryColors: Record<string, string> = {
  classic: "bg-amber-900/50 text-amber-300 border border-amber-700/30",
  fruity:  "bg-pink-900/50 text-pink-300 border border-pink-700/30",
  premium: "bg-purple-900/50 text-purple-300 border border-purple-700/30",
};
const categoryLabels: Record<string, string> = {
  classic: "Clasic",
  fruity:  "Fructat",
  premium: "Premium",
};

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group card rounded-3xl overflow-hidden hover:border-[#BC8157]/35 transition-all duration-300 hover:shadow-2xl hover:shadow-[#BC8157]/10"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={product.image} alt={product.name} fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        <div className="absolute top-3 left-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[product.category]}`}>
            {categoryLabels[product.category]}
          </span>
        </div>

        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-3 right-3 w-9 h-9 bg-[#BC8157] rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-white"
        >
          <Plus size={16} />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg text-[#f0ddc8] mb-1">{product.name}</h3>
        <p className="text-[#f0ddc8]/50 text-xs leading-relaxed mb-4 line-clamp-2">{product.description}</p>

        {/* Allergens */}
        {product.allergens.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.allergens.slice(0, 3).map((a) => (
              <span key={a} className="text-xs text-[#f0ddc8]/35 bg-[#f0ddc8]/5 px-2 py-0.5 rounded-full border border-[#f0ddc8]/10">
                {a}
              </span>
            ))}
            {product.allergens.length > 3 && (
              <span className="text-xs text-[#f0ddc8]/35">+{product.allergens.length - 3}</span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-xl text-[#f0ddc8]">{product.price}</span>
            <span className="text-[#f0ddc8]/40 text-sm ml-1">lei</span>
            <p className="text-xs text-[#f0ddc8]/35 mt-0.5">{product.calories} kcal</p>
          </div>
          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
              added ? "bg-green-600 text-white" : "bg-[#BC8157] text-white hover:bg-[#9a6540]"
            }`}
          >
            <ShoppingBag size={15} />
            {added ? "Adăugat!" : "Adaugă"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
