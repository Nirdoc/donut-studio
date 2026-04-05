"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCartStore, useAuthStore } from "@/lib/store";
import { ShoppingBag, MapPin, CreditCard, ChevronLeft, Lock } from "lucide-react";

type Step = "details" | "payment";

export default function CheckoutClient() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const user = useAuthStore((s) => s.user);
  const [step, setStep] = useState<Step>("details");
  const [loading, setLoading] = useState(false);

  const [details, setDetails] = useState({
    firstName: user?.name.split(" ")[0] || "",
    lastName: user?.name.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "București",
    notes: "",
  });

  const [payment, setPayment] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    clearCart();
    router.push("/order-success");
  };

  if (items.length === 0 && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-20">
        <ShoppingBag size={48} className="text-[#BC8157]/40" />
        <h2 className="font-display text-2xl text-[#f0ddc8]">Coșul e gol</h2>
        <Link href="/menu" className="bg-[#BC8157] text-white px-6 py-3 rounded-full font-medium hover:bg-[#9a6540] transition-colors">
          Mergi la meniu
        </Link>
      </div>
    );
  }

  return (
    <div className="section-base min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link href="/menu" className="p-2 hover:bg-[#BC8157]/10 rounded-full transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="font-display text-3xl text-[#f0ddc8]">Finalizare comandă</h1>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center gap-3 mb-10">
          {(["details", "payment"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 ${step === s ? "text-[#BC8157]" : i < (step === "payment" ? 1 : 0) ? "text-green-500" : "text-[#f0ddc8]/20"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${step === s ? "border-[#BC8157] bg-[#BC8157] text-white" : i < (step === "payment" ? 1 : 0) ? "border-green-500 bg-green-500 text-white" : "border-current"}`}>
                  {i + 1}
                </div>
                <span className="text-sm font-medium hidden sm:block">
                  {s === "details" ? "Date livrare" : "Plată"}
                </span>
              </div>
              {i < 1 && <div className="w-12 h-px bg-[#BC8157]/15" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === "details" ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card rounded-3xl p-6 lg:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#BC8157]/10 flex items-center justify-center">
                    <MapPin size={18} className="text-[#BC8157]" />
                  </div>
                  <h2 className="font-semibold text-lg text-[#f0ddc8]">Date de livrare</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "firstName", label: "Prenume", placeholder: "Ion" },
                    { name: "lastName", label: "Nume", placeholder: "Popescu" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block text-sm font-medium text-[#1a1008]/70 mb-1.5">{f.label}</label>
                      <input
                        name={f.name}
                        value={details[f.name as keyof typeof details]}
                        onChange={handleDetailsChange}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 border-0 rounded-xl text-sm input-dark bg-transparent transition-colors text-[#f0ddc8]"
                      />
                    </div>
                  ))}
                  {[
                    { name: "email", label: "Email", placeholder: "email@exemplu.ro", type: "email" },
                    { name: "phone", label: "Telefon", placeholder: "07XX XXX XXX", type: "tel" },
                    { name: "address", label: "Adresă livrare", placeholder: "Str. Exemplu nr. 10, ap. 5" },
                    { name: "city", label: "Oraș", placeholder: "București" },
                  ].map((f) => (
                    <div key={f.name} className="sm:col-span-2">
                      <label className="block text-sm font-medium text-[#1a1008]/70 mb-1.5">{f.label}</label>
                      <input
                        name={f.name}
                        type={f.type || "text"}
                        value={details[f.name as keyof typeof details]}
                        onChange={handleDetailsChange}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 border-0 rounded-xl text-sm input-dark bg-transparent transition-colors text-[#f0ddc8]"
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-[#1a1008]/70 mb-1.5">Mențiuni (opțional)</label>
                    <textarea
                      name="notes"
                      value={details.notes}
                      onChange={handleDetailsChange}
                      placeholder="Ex: Sună la interfon, etaj 3..."
                      rows={3}
                      className="w-full px-4 py-3 border-0 rounded-xl text-sm input-dark bg-transparent transition-colors text-[#f0ddc8] resize-none"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep("payment")}
                  className="w-full mt-6 bg-[#BC8157] hover:bg-[#9a6540] text-white py-4 rounded-2xl font-semibold transition-colors"
                >
                  Continuă spre plată →
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card rounded-3xl p-6 lg:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#BC8157]/10 flex items-center justify-center">
                    <CreditCard size={18} className="text-[#BC8157]" />
                  </div>
                  <h2 className="font-semibold text-lg text-[#f0ddc8]">Informații plată</h2>
                  <div className="ml-auto flex items-center gap-1 text-xs text-[#f0ddc8]/35">
                    <Lock size={12} />
                    Securizat
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1a1008]/70 mb-1.5">Număr card</label>
                    <input
                      name="cardNumber"
                      value={payment.cardNumber}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                        const formatted = v.replace(/(.{4})/g, "$1 ").trim();
                        setPayment((p) => ({ ...p, cardNumber: formatted }));
                      }}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border-0 rounded-xl text-sm input-dark bg-transparent transition-colors text-[#f0ddc8] font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1008]/70 mb-1.5">Nume pe card</label>
                    <input
                      name="cardName"
                      value={payment.cardName}
                      onChange={(e) => setPayment((p) => ({ ...p, cardName: e.target.value }))}
                      placeholder="ION POPESCU"
                      className="w-full px-4 py-3 border-0 rounded-xl text-sm input-dark bg-transparent transition-colors text-[#f0ddc8] uppercase"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1a1008]/70 mb-1.5">Expiră</label>
                      <input
                        name="expiry"
                        value={payment.expiry}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                          const formatted = v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v;
                          setPayment((p) => ({ ...p, expiry: formatted }));
                        }}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border-0 rounded-xl text-sm input-dark bg-transparent transition-colors text-[#f0ddc8] font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1a1008]/70 mb-1.5">CVV</label>
                      <input
                        name="cvv"
                        value={payment.cvv}
                        onChange={(e) => setPayment((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) }))}
                        placeholder="123"
                        className="w-full px-4 py-3 border-0 rounded-xl text-sm input-dark bg-transparent transition-colors text-[#f0ddc8] font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep("details")}
                    className="px-6 py-4 border border-[#BC8157]/20 rounded-2xl text-sm font-medium hover:border-[#BC8157] transition-colors"
                  >
                    ← Înapoi
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="flex-1 bg-[#BC8157] hover:bg-[#9a6540] disabled:opacity-60 text-white py-4 rounded-2xl font-semibold transition-colors"
                  >
                    {loading ? "Se procesează..." : `Plătește ${totalPrice().toFixed(2)} lei`}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="card rounded-3xl p-6 sticky top-24">
              <h3 className="font-semibold text-[#1a1008] mb-4">Sumarul comenzii</h3>
              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1a1008] truncate">{item.product.name}</p>
                      <p className="text-xs text-[#f0ddc8]/45">× {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-[#f0ddc8]">
                      {(item.product.price * item.quantity).toFixed(2)} lei
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#BC8157]/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-[#f0ddc8]/55">
                  <span>Subtotal</span>
                  <span>{totalPrice().toFixed(2)} lei</span>
                </div>
                <div className="flex justify-between text-sm text-[#f0ddc8]/55">
                  <span>Livrare</span>
                  <span className="text-green-600 font-medium">Gratuită</span>
                </div>
                <div className="flex justify-between font-bold text-[#1a1008] text-lg pt-2">
                  <span>Total</span>
                  <span>{totalPrice().toFixed(2)} lei</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
