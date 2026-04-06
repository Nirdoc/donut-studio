"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/lib/store";
import {
  User, ShoppingBag, MapPin, LogOut, Phone, Mail, Clock,
  CalendarDays, ChevronDown, ChevronLeft, ChevronRight,
} from "lucide-react";

type OrderItem = { name: string; price: number; quantity: number };
type Order = {
  id: string; orderNumber: string; createdAt: string;
  items: OrderItem[]; subtotal: number; deliveryFee: number;
  total: number; status: string; deliveryDate: string; deliveryTime: string;
};

const STATUS: Record<string, { label: string; dot: string; badge: string }> = {
  PENDING:   { label: "În procesare", dot: "bg-amber-400",  badge: "bg-amber-400/15 text-amber-400" },
  FINALIZAT: { label: "Finalizat",    dot: "bg-green-400",  badge: "bg-green-400/15  text-green-400" },
  ANULAT:    { label: "Anulat",       dot: "bg-red-400",    badge: "bg-red-400/15    text-red-400"   },
};

const PAGE_SIZE = 5;

function OrderRow({ order, index }: { order: Order; index: number }) {
  const [open, setOpen] = useState(false);
  const s = STATUS[order.status] ?? { label: order.status, dot: "bg-gray-400", badge: "bg-gray-400/15 text-gray-400" };
  const totalQty = order.items.reduce((a, i) => a + i.quantity, 0);
  const fmtDelivery = new Date(order.deliveryDate + "T12:00:00").toLocaleDateString("ro-RO", { day: "numeric", month: "short" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="card rounded-2xl overflow-hidden"
    >
      {/* Collapsed header — always visible */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-[#BC8157]/4 transition-colors group"
      >
        {/* Status dot */}
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />

        {/* Order number */}
        <span className="font-mono font-semibold text-sm text-[var(--text)] flex-shrink-0 w-36 truncate">
          {order.orderNumber}
        </span>

        {/* Delivery date */}
        <span className="hidden sm:flex items-center gap-1.5 text-xs text-[var(--text-40)] flex-shrink-0">
          <CalendarDays size={11} />
          {fmtDelivery}
        </span>

        {/* Item summary */}
        <span className="text-xs text-[var(--text-40)] flex-1 truncate hidden md:block">
          {order.items.map((i) => `${i.name} ×${i.quantity}`).join("  ·  ")}
        </span>
        <span className="text-xs text-[var(--text-40)] md:hidden flex-1">
          {totalQty} produs{totalQty !== 1 ? "e" : ""}
        </span>

        {/* Status badge */}
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 hidden sm:block ${s.badge}`}>
          {s.label}
        </span>

        {/* Total */}
        <span className="font-bold text-sm text-[var(--text)] flex-shrink-0 w-20 text-right">
          {order.total.toFixed(2)} lei
        </span>

        {/* Chevron */}
        <ChevronDown
          size={15}
          className={`text-[var(--text-30)] flex-shrink-0 transition-transform duration-200 group-hover:text-[var(--text-60)] ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Expanded details */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-[var(--border)] pt-4 space-y-3">

              {/* Meta row */}
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-[var(--text-40)]">
                <span>Plasată: {new Date(order.createdAt).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}</span>
                <span className="sm:hidden">Status: {s.label}</span>
                <span>Livrare: {fmtDelivery}{order.deliveryTime ? ` · ${order.deliveryTime}` : ""}</span>
                {order.deliveryFee > 0
                  ? <span>Taxă livrare: {order.deliveryFee.toFixed(2)} lei</span>
                  : <span>Ridicare din magazin</span>}
              </div>

              {/* Items */}
              <div className="divide-y divide-[var(--border)] rounded-xl overflow-hidden">
                {order.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-3 py-2.5 px-3 bg-[#BC8157]/4">
                    <span className="text-sm text-[var(--text-80)] flex-1">{item.name}</span>
                    <span className="text-xs text-[var(--text-35)] w-8 text-center">×{item.quantity}</span>
                    <span className="text-sm font-medium text-[var(--text-70)] w-20 text-right">
                      {(item.price * item.quantity).toFixed(2)} lei
                    </span>
                  </div>
                ))}
              </div>

              {/* Total line */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-[var(--text-35)]">Subtotal fără TVA: {(order.total / 1.19).toFixed(2)} lei · TVA 19%: {(order.total - order.total / 1.19).toFixed(2)} lei</span>
                <span className="font-bold text-base text-[#BC8157]">{order.total.toFixed(2)} lei</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AccountClient() {
  const router = useRouter();
  const user   = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const [mounted, setMounted]     = useState(false);
  const [orders, setOrders]       = useState<Order[]>([]);
  const [loading, setLoading]     = useState(true);
  const [page, setPage]           = useState(0);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!user) { router.push("/login"); return; }
    fetch("/api/orders", {
      headers: { Authorization: `Bearer ${useAuthStore.getState().token}` },
    })
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setOrders(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [mounted, user, router]);

  if (!mounted || !user) return null;

  const totalPages  = Math.ceil(orders.length / PAGE_SIZE);
  const pageOrders  = orders.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="min-h-screen bg-transparent pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="font-display text-4xl text-[var(--text)]">Contul meu</h1>
            <p className="text-[var(--text-60)] text-sm mt-1">Hei, {user.name}! 👋</p>
          </div>
          <button onClick={() => { logout(); router.push("/"); }}
            className="inline-flex items-center gap-2 text-sm text-red-400 hover:text-red-500 transition-colors border border-red-400/20 px-4 py-2 rounded-full">
            <LogOut size={15} />
            Deconectare
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Sidebar ── */}
          <div className="space-y-4">
            {/* Profile */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card rounded-3xl p-6">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#BC8157] to-[#9a6540] flex items-center justify-center shadow-lg">
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--text)]">{user.name}</p>
                  <p className="text-[var(--text-50)] text-xs mt-0.5">{user.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#BC8157]/8 rounded-xl p-3 text-center">
                  <p className="font-bold text-xl text-[var(--text)]">{loading ? "—" : orders.length}</p>
                  <p className="text-[var(--text-40)] text-xs mt-0.5">Comenzi</p>
                </div>
                <div className="bg-[#BC8157]/8 rounded-xl p-3 text-center">
                  <p className="font-bold text-xl text-[var(--text)]">
                    {loading ? "—" : orders.filter((o) => o.status === "FINALIZAT").length}
                  </p>
                  <p className="text-[var(--text-40)] text-xs mt-0.5">Finalizate</p>
                </div>
              </div>
            </motion.div>

            {/* Quick links */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card rounded-3xl p-5">
              <h3 className="text-xs font-semibold text-[var(--text-30)] uppercase tracking-widest mb-3">Acces rapid</h3>
              <div className="space-y-1">
                {[
                  { icon: ShoppingBag, label: "Mergi la meniu", href: "/menu" },
                  { icon: MapPin, label: "Locația noastră", href: "#" },
                ].map((item) => (
                  <Link key={item.label} href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#BC8157]/8 transition-colors text-sm text-[var(--text-50)] hover:text-[#BC8157]">
                    <item.icon size={15} />
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Contact — păstrăm text-white, fundalul portocaliu funcționează în ambele teme */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="bg-gradient-to-br from-[#BC8157] to-[#9a6540] rounded-3xl p-5 text-white">
              <p className="font-semibold text-sm mb-3">Ai nevoie de ajutor?</p>
              <div className="space-y-2 text-white/80 text-xs">
                <div className="flex items-center gap-2"><Phone size={12} /><a href="tel:0745018888" className="hover:text-white">0745 018 888</a></div>
                <div className="flex items-center gap-2"><Mail size={12} /><a href="mailto:contact@donutstudio.ro" className="hover:text-white">contact@donutstudio.ro</a></div>
                <div className="flex items-center gap-2"><Clock size={12} /><span>Lun–Vin: 11:00–19:00</span></div>
              </div>
            </motion.div>
          </div>

          {/* ── Orders panel ── */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>

              {/* Panel header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-2xl text-[var(--text)]">Istoricul comenzilor</h2>
                {!loading && orders.length > 0 && (
                  <span className="text-xs text-[var(--text-30)]">{orders.length} comenzi</span>
                )}
              </div>

              {/* Column labels */}
              {!loading && orders.length > 0 && (
                <div className="flex items-center gap-3 px-5 mb-2 text-[11px] font-medium text-[var(--text-25)] uppercase tracking-wider">
                  <span className="w-2" />
                  <span className="w-36">Comandă</span>
                  <span className="hidden sm:block w-16">Livrare</span>
                  <span className="flex-1 hidden md:block">Produse</span>
                  <span className="flex-1 md:hidden">Produse</span>
                  <span className="hidden sm:block w-24 text-center">Status</span>
                  <span className="w-20 text-right">Total</span>
                  <span className="w-4" />
                </div>
              )}

              {/* Loading skeleton */}
              {loading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="card rounded-2xl px-5 py-4 animate-pulse flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#BC8157]/15" />
                      <div className="h-3 bg-[#BC8157]/10 rounded w-32" />
                      <div className="h-3 bg-[#BC8157]/10 rounded w-20 hidden sm:block" />
                      <div className="h-3 bg-[#BC8157]/10 rounded flex-1 hidden md:block" />
                      <div className="h-5 bg-[#BC8157]/10 rounded-full w-20 hidden sm:block" />
                      <div className="h-3 bg-[#BC8157]/10 rounded w-16 ml-auto" />
                    </div>
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div className="card rounded-3xl p-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#BC8157]/10 flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag size={28} className="text-[#BC8157]/40" />
                  </div>
                  <p className="text-[var(--text-40)] text-sm mb-5">Nu ai nicio comandă încă.</p>
                  <Link href="/menu"
                    className="inline-flex items-center gap-2 bg-[#BC8157] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#9a6540] transition-colors">
                    Descoperă meniul
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    {pageOrders.map((order, i) => (
                      <OrderRow key={order.id} order={order} index={i} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--border)]">
                      <span className="text-xs text-[var(--text-30)]">
                        {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, orders.length)} din {orders.length}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setPage((p) => p - 1)}
                          disabled={page === 0}
                          className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-50)] hover:text-[var(--text)] hover:border-[#BC8157]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <ChevronLeft size={14} />
                        </button>
                        {Array.from({ length: totalPages }).map((_, i) => (
                          <button key={i} onClick={() => setPage(i)}
                            className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                              i === page
                                ? "bg-[#BC8157] text-white"
                                : "border border-[var(--border)] text-[var(--text-40)] hover:text-[var(--text)] hover:border-[#BC8157]/30"
                            }`}>
                            {i + 1}
                          </button>
                        ))}
                        <button
                          onClick={() => setPage((p) => p + 1)}
                          disabled={page === totalPages - 1}
                          className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-50)] hover:text-[var(--text)] hover:border-[#BC8157]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
