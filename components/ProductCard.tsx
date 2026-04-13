"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Plus } from "lucide-react";
import { useCartStore } from "@/lib/store";
import type { Product } from "@/lib/products";
import { useState } from "react";

const categoryClasses: Record<string, string> = {
  classic: "badge-classic",
  fruity:  "badge-fruity",
  premium: "badge-premium",
};
const categoryLabels: Record<string, string> = {
  classic: "Clasic",
  fruity:  "Fructat",
  premium: "Premium",
};

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const available = product.available !== false;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!available) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/produs/${product.slug}`} className="block">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`group card rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer ${
        available
          ? "hover:border-[#BC8157]/35 hover:shadow-2xl hover:shadow-[#BC8157]/10"
          : "opacity-60 grayscale"
      }`}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={product.image} alt={product.name} fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover brightness-125 transition-transform duration-500 ${available ? "group-hover:scale-110" : ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryClasses[product.category]}`}>
            {categoryLabels[product.category]}
          </span>
          {!available && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-800/80 text-gray-300 border border-gray-600/40">
              Indisponibil
            </span>
          )}
        </div>

        {available && (
          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-3 right-3 w-9 h-9 bg-[#BC8157] rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-white"
          >
            <Plus size={16} />
          </motion.button>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg mb-1" style={{ color: "var(--text)" }}>{product.name}</h3>
        <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--text-50)" }}>{product.description}</p>

        {/* Allergens */}
        {product.allergens.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.allergens.slice(0, 3).map((a) => (
              <span key={a}
                className="text-xs px-2 py-0.5 rounded-full border"
                style={{ color: "var(--text-35)", background: "var(--text-05)", borderColor: "var(--text-10)" }}>
                {a}
              </span>
            ))}
            {product.allergens.length > 3 && (
              <span className="text-xs" style={{ color: "var(--text-35)" }}>+{product.allergens.length - 3}</span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-xl" style={{ color: "var(--text)" }}>{product.price}</span>
            <span className="text-sm ml-1" style={{ color: "var(--text-40)" }}>lei</span>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-35)" }}>{product.calories} kcal</p>
          </div>
          {available ? (
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
          ) : (
            <span className="text-xs px-4 py-2.5 rounded-full border font-medium" style={{ color: "var(--text-35)", borderColor: "var(--text-10)" }}>
              Indisponibil
            </span>
          )}
        </div>
      </div>
    </motion.div>
    </Link>
  );
}
