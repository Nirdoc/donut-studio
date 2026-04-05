"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAuthStore } from "@/lib/store";
import { User, ShoppingBag, MapPin, LogOut, Phone, Mail, Clock } from "lucide-react";

const mockOrders = [
  {
    id: "#DS2024-001",
    date: "01 Apr 2025",
    items: ["Double Chocolate ×2", "Oreo Dream ×1", "Raspberry Blast ×1"],
    total: 48,
    status: "livrat",
    images: [
      "https://www.donutstudio.ro/wp-content/uploads/2024/07/Double-Chocolate.webp",
      "https://www.donutstudio.ro/wp-content/uploads/2024/07/Oreo-Dream.webp",
    ],
  },
  {
    id: "#DS2024-002",
    date: "28 Mar 2025",
    items: ["Pistachious ×3", "Caramel Dash ×2"],
    total: 60,
    status: "livrat",
    images: [
      "https://www.donutstudio.ro/wp-content/uploads/2024/07/Pistachious.webp",
      "https://www.donutstudio.ro/wp-content/uploads/2024/07/Caramel-Dash.webp",
    ],
  },
];

const statusColors: Record<string, string> = {
  livrat: "bg-green-100 text-green-700",
  "în procesare": "bg-amber-100 text-amber-700",
  anulat: "bg-red-100 text-red-600",
};

export default function AccountClient() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="font-display text-4xl text-[#f0ddc8]">Contul meu</h1>
            <p className="text-[#1a1008]/50 text-sm mt-1">
              Bună ziua, {user.name}! 👋
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-sm text-red-400 hover:text-red-600 transition-colors border border-red-200 px-4 py-2 rounded-full"
          >
            <LogOut size={15} />
            Deconectare
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-4">
            {/* Profile card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card rounded-3xl p-6"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-[#BC8157] flex items-center justify-center">
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-[#f0ddc8]">{user.name}</p>
                  <p className="text-[#1a1008]/50 text-xs">{user.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#1a1008]/60 text-sm">
                  <Mail size={14} className="text-[#BC8157]" />
                  {user.email}
                </div>
                <div className="flex items-center gap-2 text-[#1a1008]/60 text-sm">
                  <ShoppingBag size={14} className="text-[#BC8157]" />
                  {mockOrders.length} comenzi plasate
                </div>
              </div>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card rounded-3xl p-5"
            >
              <h3 className="font-semibold text-sm text-[#1a1008]/70 mb-3 uppercase tracking-wider">
                Acces rapid
              </h3>
              <div className="space-y-1">
                {[
                  { icon: ShoppingBag, label: "Mergi la meniu", href: "/menu" },
                  { icon: MapPin, label: "Locația noastră", href: "#" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#BC8157]/5 transition-colors text-sm text-[#1a1008]/70 hover:text-[#BC8157]"
                  >
                    <item.icon size={16} />
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-[#BC8157] rounded-3xl p-5 text-white"
            >
              <p className="font-semibold text-sm mb-3">Ai nevoie de ajutor?</p>
              <div className="space-y-2 text-white/80 text-xs">
                <div className="flex items-center gap-2">
                  <Phone size={12} />
                  <a href="tel:0745018888" className="hover:text-white">0745 018 888</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={12} />
                  <a href="mailto:contact@donutstudio.ro" className="hover:text-white">contact@donutstudio.ro</a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={12} />
                  <span>Lun–Vin: 11:00–19:00</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Orders */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <h2 className="font-display text-2xl text-[#1a1008] mb-5">
                Istoricul comenzilor
              </h2>

              <div className="space-y-4">
                {mockOrders.map((order, i) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    className="card rounded-3xl p-5 sm:p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <p className="font-bold text-[#1a1008] font-mono">{order.id}</p>
                        <p className="text-[#1a1008]/50 text-xs mt-0.5">{order.date}</p>
                      </div>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full self-start sm:self-auto ${statusColors[order.status]}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex -space-x-2">
                        {order.images.map((src, j) => (
                          <div key={j} className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm">
                            <Image src={src} alt="" width={36} height={36} className="object-cover w-full h-full" />
                          </div>
                        ))}
                      </div>
                      <div className="text-sm text-[#f0ddc8]/55">
                        {order.items.join(", ")}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#BC8157]/8">
                      <span className="text-sm text-[#f0ddc8]/45">Total comandă</span>
                      <span className="font-bold text-[#f0ddc8]">{order.total} lei</span>
                    </div>
                  </motion.div>
                ))}

                {mockOrders.length === 0 && (
                  <div className="card rounded-3xl p-10 text-center">
                    <ShoppingBag size={40} className="text-[#BC8157]/30 mx-auto mb-4" />
                    <p className="text-[#1a1008]/50 mb-4">Nu ai nicio comandă încă.</p>
                    <Link
                      href="/menu"
                      className="inline-flex items-center gap-2 bg-[#BC8157] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#9a6540] transition-colors"
                    >
                      Descoperă meniul
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
