"use client";

import { useCartStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { X, Minus, Plus, ShoppingBag, Trash2, AlertCircle } from "lucide-react";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore();
  const router = useRouter();
  const [unavailableNames, setUnavailableNames] = useState<string[]>([]);
  const [checking, setChecking] = useState(false);

  const handleCheckout = async () => {
    setUnavailableNames([]);
    setChecking(true);
    try {
      const ids = items.map((i) => i.product.id).join(",");
      const res = await fetch(`/api/donuts?ids=${ids}`);
      if (!res.ok) throw new Error("API error");

      const fresh: Array<{ id: string; available: boolean }> = await res.json();

      const bad = items
        .filter((i) => {
          const match = fresh.find((f) => f.id === i.product.id);
          // unavailable dacă nu există în DB sau available === false
          return !match || match.available === false;
        })
        .map((i) => i.product.name);

      if (bad.length > 0) {
        setUnavailableNames(bad);
        setChecking(false);
        return;
      }

      setChecking(false);
      closeCart();
      router.push("/checkout");
    } catch {
      setChecking(false);
      // La eroare de rețea lasă serverul să valideze
      closeCart();
      router.push("/checkout");
    }
  };

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
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
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
                {/* Minimum order progress */}
                {(() => {
                  const totalQty = items.reduce((s, i) => s + i.quantity, 0);
                  const MIN = 16;
                  const canCheckout = totalQty >= MIN;
                  const pct = Math.min((totalQty / MIN) * 100, 100);
                  return (
                    <>
                      {!canCheckout && (
                        <div className="rounded-2xl p-3 space-y-2" style={{ background: "var(--surface)" }}>
                          <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-60)" }}>
                            <span>Minim {MIN} donuts</span>
                            <span style={{ color: "var(--text)" }}><strong>{totalQty}</strong> / {MIN}</span>
                          </div>
                          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.4 }}
                              className="h-full rounded-full bg-[#BC8157]"
                            />
                          </div>
                          <p className="text-xs" style={{ color: "var(--text-50)" }}>
                            Mai adaugă <strong style={{ color: "var(--text)" }}>{MIN - totalQty} donut{MIN - totalQty !== 1 ? "s" : ""}</strong> pentru a finaliza comanda.
                          </p>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: "var(--text-60)" }}>Total</span>
                        <span className="font-bold text-2xl" style={{ color: "var(--text)" }}>{totalPrice().toFixed(2)} lei</span>
                      </div>
                      {canCheckout ? (
                        <>
                          {unavailableNames.length > 0 && (
                            <div className="rounded-2xl p-4 space-y-2.5" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                              <div className="flex items-center gap-2">
                                <AlertCircle size={15} className="text-red-400 flex-shrink-0" />
                                <p className="text-xs font-semibold text-red-400">Produse indisponibile în coș</p>
                              </div>
                              <ul className="pl-5 space-y-1">
                                {unavailableNames.map((name) => (
                                  <li key={name} className="text-xs flex items-center gap-1.5" style={{ color: "var(--text-60)" }}>
                                    <span className="w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                                    {name}
                                  </li>
                                ))}
                              </ul>
                              <p className="text-xs pl-5" style={{ color: "var(--text-40)" }}>Elimină-le din coș pentru a continua.</p>
                            </div>
                          )}
                          <button onClick={handleCheckout} disabled={checking}
                            className="block w-full bg-[#BC8157] hover:bg-[#9a6540] disabled:opacity-60 disabled:cursor-not-allowed text-white text-center py-4 rounded-2xl font-semibold transition-colors">
                            {checking ? "Se verifică..." : "Finalizează comanda"}
                          </button>
                        </>
                      ) : (
                        <div
                          className="block w-full text-white text-center py-4 rounded-2xl font-semibold opacity-40 cursor-not-allowed select-none"
                          style={{ background: "#BC8157" }}>
                          Finalizează comanda
                        </div>
                      )}
                    </>
                  );
                })()}
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
