"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import type { Product } from "@/lib/products";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const available = product.available !== false;

  const handleAdd = () => {
    if (!available) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (!available) {
    return (
      <div className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-base border cursor-not-allowed select-none"
        style={{ color: "var(--text-35)", borderColor: "var(--text-10)" }}>
        Momentan indisponibil
      </div>
    );
  }

  return (
    <motion.button
      onClick={handleAdd}
      whileTap={{ scale: 0.95 }}
      className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-base transition-all duration-300 ${
        added ? "bg-green-600 text-white" : "bg-[#BC8157] text-white hover:bg-[#9a6540]"
      }`}
    >
      <ShoppingBag size={18} />
      {added ? "Adăugat în coș!" : "Adaugă în coș"}
    </motion.button>
  );
}
