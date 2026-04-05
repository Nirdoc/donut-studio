"use client";

import { useCartStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 flex flex-col"
            style={{ background: "var(--bg-dark)", borderLeft: "1px solid var(--border)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#BC8157]/10">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-[#BC8157]" />
                <h2 className="font-display text-xl" style={{ color: "var(--text)" }}>Coș</h2>
                {items.length > 0 && (
                  <span className="bg-[#BC8157] text-white text-xs rounded-full px-2 py-0.5">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button onClick={closeCart}
                className="p-2 hover:bg-[#BC8157]/10 rounded-full transition-colors hover:text-[#BC8157]"
                style={{ color: "var(--text-60)" }}>
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-[#BC8157]/10 border border-[#BC8157]/20 flex items-center justify-center">
                    <ShoppingBag size={32} className="text-[#BC8157]/50" />
                  </div>
                  <p className="text-sm" style={{ color: "var(--text-50)" }}>Coșul tău este gol.</p>
                  <button onClick={closeCart} className="text-[#BC8157] text-sm font-medium hover:underline">
                    Continuă cumpărăturile →
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="card-mid flex gap-4 p-3 rounded-2xl"
                      >
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate" style={{ color: "var(--text)" }}>{item.product.name}</p>
                          <p className="text-[#BC8157] font-bold text-sm mt-0.5">
                            {(item.product.price * item.quantity).toFixed(2)} lei
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-[#BC8157]/15 hover:bg-[#BC8157]/30 flex items-center justify-center transition-colors"
                              style={{ color: "var(--text)" }}>
                              <Minus size={11} />
                            </button>
                            <span className="text-sm font-medium w-5 text-center" style={{ color: "var(--text)" }}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-[#BC8157]/15 hover:bg-[#BC8157]/30 flex items-center justify-center transition-colors"
                              style={{ color: "var(--text)" }}>
                              <Plus size={11} />
                            </button>
                          </div>
                        </div>
                        <button onClick={() => removeItem(item.product.id)}
                          className="hover:text-red-400 transition-colors p-1"
                          style={{ color: "var(--text-25)" }}>
                          <Trash2 size={15} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-[#BC8157]/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: "var(--text-60)" }}>Total</span>
                  <span className="font-bold text-2xl" style={{ color: "var(--text)" }}>{totalPrice().toFixed(2)} lei</span>
                </div>
                <Link href="/checkout" onClick={closeCart}
                  className="block w-full bg-[#BC8157] hover:bg-[#9a6540] text-white text-center py-4 rounded-2xl font-semibold transition-colors">
                  Finalizează comanda
                </Link>
                <button onClick={closeCart}
                  className="block w-full text-center text-sm hover:text-[var(--text)] transition-colors"
                  style={{ color: "var(--text-40)" }}>
                  Continuă cumpărăturile
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
