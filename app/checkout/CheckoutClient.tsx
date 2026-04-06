"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore, useAuthStore } from "@/lib/store";
import {
  ShoppingBag, CreditCard, ChevronLeft, Lock,
  Calendar, Clock, User, Building2, Banknote, Store, Check, Home,
} from "lucide-react";

type Step = 1 | 2 | 3;
type PaymentMethod = "cash" | "card" | "pickup";
type DwellingType = "casa" | "bloc";

const TIME_SLOTS = [
  { label: "08:00 – 10:00", startHour: 8 },
  { label: "10:00 – 12:00", startHour: 10 },
  { label: "12:00 – 14:00", startHour: 12 },
  { label: "14:00 – 16:00", startHour: 14 },
  { label: "16:00 – 18:00", startHour: 16 },
  { label: "18:00 – 20:00", startHour: 18 },
  { label: "20:00 – 22:00", startHour: 20 },
];

const DELIVERY_FEE = 25;

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

type AddressState = {
  judet: string;
  city: string;
  street: string;
  number: string;
  type: DwellingType;
  bloc: string;
  scara: string;
  etaj: string;
  apartament: string;
};

const emptyAddress = (): AddressState => ({
  judet: "", city: "", street: "", number: "",
  type: "casa",
  bloc: "", scara: "", etaj: "", apartament: "",
});

const SECTORS = ["Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5", "Sector 6"];

// ── Reusable address block ───────────────────────────────────────────────────
function AddressFields({
  value,
  onChange,
  required = true,
}: {
  value: AddressState;
  onChange: (next: AddressState) => void;
  required?: boolean;
}) {
  const set = (field: keyof AddressState, val: string) =>
    onChange({ ...value, [field]: val });

  const inp = "w-full px-4 py-3 rounded-xl text-sm input-dark bg-transparent text-[var(--text)]";
  const sel = `${inp} appearance-none`;
  const lbl = "block text-sm font-medium mb-1.5";

  const isBucuresti = value.city === "București";

  const handleCityChange = (city: string) => {
    // When switching to București, clear judet so user picks a sector
    // When switching away, auto-set judet to Ilfov and clear city text
    if (city === "București") {
      onChange({ ...value, city, judet: "" });
    } else {
      onChange({ ...value, city: "", judet: "Ilfov" });
    }
  };

  return (
    <div className="space-y-4">
      {/* Oraș */}
      <div>
        <label className={lbl} style={{ color: "var(--label-text)" }}>
          Oraș {required && <span className="text-red-400">*</span>}
        </label>
        <select
          required={required}
          value={value.city}
          onChange={(e) => handleCityChange(e.target.value)}
          className={sel}
        >
          <option value="">— Selectează orașul —</option>
          <option value="București">București</option>
        </select>
      </div>

      {/* Județ / Sector — depends on city */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={lbl} style={{ color: "var(--label-text)" }}>
            {isBucuresti ? "Sector" : "Județ"} {required && <span className="text-red-400">*</span>}
          </label>
          {isBucuresti ? (
            <select
              required={required}
              value={value.judet}
              onChange={(e) => set("judet", e.target.value)}
              className={sel}
            >
              <option value="">— Selectează sectorul —</option>
              {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          ) : (
            <input
              readOnly
              value="Ilfov"
              className={`${inp} opacity-60 cursor-default`}
            />
          )}
        </div>

        {/* Localitate — only shown for Ilfov */}
        {!isBucuresti && (
          <div>
            <label className={lbl} style={{ color: "var(--label-text)" }}>
              Localitate {required && <span className="text-red-400">*</span>}
            </label>
            <input
              required={required}
              value={value.city === "București" ? "" : ""}
              onChange={(e) => onChange({ ...value, city: e.target.value, judet: "Ilfov" })}
              placeholder="Voluntari, Otopeni..."
              className={inp}
            />
          </div>
        )}
      </div>

      {/* Stradă + Număr */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="col-span-2 sm:col-span-2">
          <label className={lbl} style={{ color: "var(--label-text)" }}>
            Stradă {required && <span className="text-red-400">*</span>}
          </label>
          <input
            required={required}
            value={value.street}
            onChange={(e) => set("street", e.target.value)}
            placeholder="Str. Exemplu"
            className={inp}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className={lbl} style={{ color: "var(--label-text)" }}>
            Număr {required && <span className="text-red-400">*</span>}
          </label>
          <input
            required={required}
            value={value.number}
            onChange={(e) => set("number", e.target.value)}
            placeholder="10"
            className={inp}
          />
        </div>
      </div>

      {/* Tip locuință toggle */}
      <div>
        <label className={lbl} style={{ color: "var(--label-text)" }}>Tip locuință</label>
        <div className="grid grid-cols-2 gap-2">
          {([
            { id: "casa" as DwellingType, label: "Casă / Curte", Icon: Home },
            { id: "bloc" as DwellingType, label: "Bloc / Apartament", Icon: Building2 },
          ]).map(({ id, label, Icon }) => {
            const active = value.type === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onChange({ ...value, type: id, bloc: "", scara: "", etaj: "", apartament: "" })}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  active
                    ? "border-[#BC8157] bg-[#BC8157]/8 text-[#BC8157]"
                    : "border-[#BC8157]/15 text-[var(--text-60)] hover:border-[#BC8157]/35"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bloc fields */}
      <AnimatePresence>
        {value.type === "bloc" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="col-span-2 sm:col-span-1">
                <label className={lbl} style={{ color: "var(--label-text)" }}>
                  Bloc {required && <span className="text-red-400">*</span>}
                </label>
                <input
                  required={required && value.type === "bloc"}
                  value={value.bloc}
                  onChange={(e) => set("bloc", e.target.value)}
                  placeholder="A12"
                  className={inp}
                />
              </div>
              <div>
                <label className={lbl} style={{ color: "var(--label-text)" }}>
                  Scară
                  <span className="text-[var(--text-35)] font-normal text-xs ml-1">(opt.)</span>
                </label>
                <input
                  value={value.scara}
                  onChange={(e) => set("scara", e.target.value)}
                  placeholder="1"
                  className={inp}
                />
              </div>
              <div>
                <label className={lbl} style={{ color: "var(--label-text)" }}>
                  Etaj
                  <span className="text-[var(--text-35)] font-normal text-xs ml-1">(opt.)</span>
                </label>
                <input
                  value={value.etaj}
                  onChange={(e) => set("etaj", e.target.value)}
                  placeholder="3"
                  className={inp}
                />
              </div>
              <div>
                <label className={lbl} style={{ color: "var(--label-text)" }}>
                  Apartament {required && <span className="text-red-400">*</span>}
                </label>
                <input
                  required={required && value.type === "bloc"}
                  value={value.apartament}
                  onChange={(e) => set("apartament", e.target.value)}
                  placeholder="42"
                  className={inp}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function CheckoutClient() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const user = useAuthStore((s) => s.user);

  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);

  // Step 1
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  // Step 2 — contact
  const [contact, setContact] = useState({
    firstName: user?.name.split(" ")[0] ?? "",
    lastName:  user?.name.split(" ").slice(1).join(" ") ?? "",
    email:     user?.email ?? "",
    phone:     "",
    cui:       "",
  });
  const [billingAddr, setBillingAddr] = useState<AddressState>(emptyAddress());
  const [differentDelivery, setDifferentDelivery] = useState(false);
  const [deliveryAddr, setDeliveryAddr] = useState<AddressState>(emptyAddress());

  // Step 3
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });

  // Derived
  const totalQty = items.reduce((s, i) => s + i.quantity, 0);
  const fee = paymentMethod === "pickup" ? 0 : DELIVERY_FEE;
  const grandTotal = totalPrice() + fee;

  const availableSlots = useMemo(() => {
    if (!deliveryDate) return TIME_SLOTS;
    if (deliveryDate === todayISO()) {
      const nowHour = new Date().getHours();
      return TIME_SLOTS.filter((s) => s.startHour > nowHour);
    }
    return TIME_SLOTS;
  }, [deliveryDate]);

  // Pickup requires delivery date at least 24h in the future
  const pickupAllowed = useMemo(() => {
    if (!deliveryDate) return false;
    const deliveryMidnight = new Date(deliveryDate + "T00:00:00").getTime();
    return deliveryMidnight - Date.now() >= 24 * 60 * 60 * 1000;
  }, [deliveryDate]);

  // Reset payment method if pickup is selected but delivery date no longer qualifies
  useEffect(() => {
    if (!pickupAllowed && paymentMethod === "pickup") {
      setPaymentMethod("cash");
    }
  }, [pickupAllowed, paymentMethod]);

  const handleDateChange = (val: string) => {
    setDeliveryDate(val);
    setDeliveryTime("");
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const token = typeof window !== "undefined"
        ? (() => { try { return JSON.parse(localStorage.getItem("donut-auth") ?? "{}").state?.token ?? ""; } catch { return ""; } })()
        : "";

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          deliveryDate,
          deliveryTime,
          contact,
          billingAddr,
          differentDelivery,
          deliveryAddr: differentDelivery ? deliveryAddr : null,
          paymentMethod,
          deliveryFee: fee,
          subtotal: totalPrice(),
          total: grandTotal,
          items: items.map((i) => ({ id: i.product.id, name: i.product.name, price: i.product.price, quantity: i.quantity })),
        }),
      });

      if (!res.ok) throw new Error("Eroare server.");
      clearCart();
      router.push("/order-success");
    } catch {
      setLoading(false);
    }
  };

  if (items.length === 0 && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-20">
        <ShoppingBag size={48} className="text-[#BC8157]/40" />
        <h2 className="font-display text-2xl text-[var(--text)]">Coșul e gol</h2>
        <Link href="/menu" className="bg-[#BC8157] text-white px-6 py-3 rounded-full font-medium hover:bg-[#9a6540] transition-colors">
          Mergi la meniu
        </Link>
      </div>
    );
  }

  if (totalQty < 16 && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-20 px-4 text-center">
        <div className="text-5xl">🍩</div>
        <h2 className="font-display text-2xl text-[var(--text)]">Comandă minimă: 16 donuts</h2>
        <p className="text-sm max-w-xs" style={{ color: "var(--text-60)" }}>
          Ai {totalQty} donut{totalQty !== 1 ? "s" : ""} în coș. Mai adaugă {16 - totalQty} pentru a putea plasa comanda.
        </p>
        <Link href="/menu" className="bg-[#BC8157] text-white px-6 py-3 rounded-full font-medium hover:bg-[#9a6540] transition-colors">
          Adaugă mai multe
        </Link>
      </div>
    );
  }

  const stepLabels = ["Date livrare", "Date facturare", "Plată"];

  return (
    <div className="section-base min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link href="/menu" className="p-2 hover:bg-[#BC8157]/10 rounded-full transition-colors" style={{ color: "var(--text-60)" }}>
            <ChevronLeft size={20} />
          </Link>
          <h1 className="font-display text-3xl text-[var(--text)]">Finalizare comandă</h1>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-10">
          {([1, 2, 3] as Step[]).map((s, i) => {
            const done = step > s;
            const active = step === s;
            return (
              <div key={s} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => done && setStep(s)}
                  className={`flex items-center gap-2 transition-opacity ${done ? "cursor-pointer hover:opacity-75" : "cursor-default"} ${active ? "text-[#BC8157]" : done ? "text-green-500" : "text-[var(--text-25)]"}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    active ? "border-[#BC8157] bg-[#BC8157] text-white" :
                    done   ? "border-green-500 bg-green-500 text-white" :
                             "border-current text-current"
                  }`}>
                    {done ? <Check size={13} /> : s}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{stepLabels[i]}</span>
                </button>
                {i < 2 && (
                  <div className={`w-10 lg:w-16 h-px transition-colors ${step > s ? "bg-green-500/40" : "bg-[#BC8157]/15"}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">

              {/* ── STEP 1: Date livrare ─────────────────── */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="card rounded-3xl p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-10 h-10 rounded-xl bg-[#BC8157]/15 flex items-center justify-center">
                      <Calendar size={18} className="text-[#BC8157]" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg text-[var(--text)]">Date livrare</h2>
                      <p className="text-xs" style={{ color: "var(--text-40)" }}>Alege data și intervalul orar preferat</p>
                    </div>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center gap-1.5" style={{ color: "var(--label-text)" }}>
                        <Calendar size={13} className="text-[#BC8157]" />
                        Data de livrare <span className="text-red-400">*</span>
                      </label>
                      <input
                        required type="date" min={todayISO()}
                        value={deliveryDate}
                        onChange={(e) => handleDateChange(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm input-dark bg-transparent text-[var(--text)]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center gap-1.5" style={{ color: "var(--label-text)" }}>
                        <Clock size={13} className="text-[#BC8157]" />
                        Interval orar <span className="text-red-400">*</span>
                      </label>
                      {deliveryDate && availableSlots.length === 0 ? (
                        <div className="rounded-xl p-4 text-sm text-amber-500 border border-amber-500/20 bg-amber-500/10">
                          Nu mai sunt intervale disponibile pentru astăzi. Te rugăm să alegi o altă dată.
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                          {(deliveryDate ? availableSlots : TIME_SLOTS).map((slot) => {
                            const selected = deliveryTime === slot.label;
                            return (
                              <button key={slot.label} type="button" onClick={() => setDeliveryTime(slot.label)}
                                className={`px-3 py-3 rounded-xl text-xs font-medium text-center transition-all border ${
                                  selected
                                    ? "bg-[#BC8157] border-[#BC8157] text-white shadow-lg shadow-[#BC8157]/20"
                                    : "border-[#BC8157]/20 text-[var(--text-70)] hover:border-[#BC8157]/50 hover:bg-[#BC8157]/5"
                                }`}>
                                {slot.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 mt-2">
                      <Link href="/menu"
                        className="px-6 py-4 border border-[#BC8157]/20 rounded-2xl text-sm font-medium hover:border-[#BC8157]/50 transition-colors text-[var(--text)]">
                        ← Înapoi
                      </Link>
                      <button type="submit" disabled={!deliveryDate || !deliveryTime}
                        className="flex-1 bg-[#BC8157] hover:bg-[#9a6540] disabled:opacity-40 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-semibold transition-colors">
                        Continuă →
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* ── STEP 2: Date facturare ───────────────── */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="card rounded-3xl p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-10 h-10 rounded-xl bg-[#BC8157]/15 flex items-center justify-center">
                      <User size={18} className="text-[#BC8157]" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg text-[var(--text)]">Date facturare</h2>
                      <p className="text-xs" style={{ color: "var(--text-40)" }}>Date de contact și adresa de facturare</p>
                    </div>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-5">

                    {/* ── Contact ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { key: "firstName", label: "Prenume", placeholder: "Ion" },
                        { key: "lastName",  label: "Nume",    placeholder: "Popescu" },
                      ].map((f) => (
                        <div key={f.key}>
                          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--label-text)" }}>
                            {f.label} <span className="text-red-400">*</span>
                          </label>
                          <input required
                            value={contact[f.key as keyof typeof contact]}
                            onChange={(e) => setContact((p) => ({ ...p, [f.key]: e.target.value }))}
                            placeholder={f.placeholder}
                            className="w-full px-4 py-3 rounded-xl text-sm input-dark bg-transparent text-[var(--text)]"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--label-text)" }}>
                          Email <span className="text-red-400">*</span>
                        </label>
                        <input required type="email"
                          value={contact.email}
                          onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))}
                          placeholder="email@exemplu.ro"
                          className="w-full px-4 py-3 rounded-xl text-sm input-dark bg-transparent text-[var(--text)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--label-text)" }}>
                          Telefon <span className="text-red-400">*</span>
                        </label>
                        <input required type="tel"
                          value={contact.phone}
                          onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))}
                          placeholder="07XX XXX XXX"
                          className="w-full px-4 py-3 rounded-xl text-sm input-dark bg-transparent text-[var(--text)]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5 flex items-center gap-1.5" style={{ color: "var(--label-text)" }}>
                        <Building2 size={13} className="text-[#BC8157]/70" />
                        CUI Companie
                        <span className="text-[var(--text-35)] font-normal text-xs">(opțional)</span>
                      </label>
                      <input
                        value={contact.cui}
                        onChange={(e) => setContact((p) => ({ ...p, cui: e.target.value }))}
                        placeholder="RO12345678"
                        className="w-full px-4 py-3 rounded-xl text-sm input-dark bg-transparent text-[var(--text)]"
                      />
                    </div>

                    {/* ── Adresă facturare ── */}
                    <div className="border-t border-[#BC8157]/10 pt-5">
                      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-40)" }}>
                        Adresă facturare
                      </p>
                      <AddressFields value={billingAddr} onChange={setBillingAddr} />
                    </div>

                    {/* ── Checkbox altă adresă livrare ── */}
                    <label className="flex items-start gap-3 p-4 rounded-2xl border border-[#BC8157]/15 hover:border-[#BC8157]/30 cursor-pointer transition-colors select-none"
                      style={{ background: "var(--surface)" }}>
                      <div className="relative mt-0.5">
                        <input type="checkbox" checked={differentDelivery}
                          onChange={(e) => setDifferentDelivery(e.target.checked)} className="sr-only" />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                          differentDelivery ? "bg-[#BC8157] border-[#BC8157]" : "border-[#BC8157]/40"
                        }`}>
                          {differentDelivery && <Check size={11} className="text-white" strokeWidth={3} />}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text)]">Livrare la altă adresă</p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-40)" }}>Adresa de livrare diferă de cea de facturare</p>
                      </div>
                    </label>

                    {/* ── Adresă livrare alternativă ── */}
                    <AnimatePresence>
                      {differentDelivery && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden">
                          <div className="border-t border-[#BC8157]/10 pt-5">
                            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-40)" }}>
                              Adresă livrare
                            </p>
                            <AddressFields value={deliveryAddr} onChange={setDeliveryAddr} required={differentDelivery} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setStep(1)}
                        className="px-6 py-4 border border-[#BC8157]/20 rounded-2xl text-sm font-medium hover:border-[#BC8157]/50 transition-colors text-[var(--text)]">
                        ← Înapoi
                      </button>
                      <button type="submit"
                        className="flex-1 bg-[#BC8157] hover:bg-[#9a6540] text-white py-4 rounded-2xl font-semibold transition-colors">
                        Continuă spre plată →
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* ── STEP 3: Plată ───────────────────────── */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-5">
                  <div className="card rounded-3xl p-6 lg:p-8">
                    <div className="flex items-center gap-3 mb-7">
                      <div className="w-10 h-10 rounded-xl bg-[#BC8157]/15 flex items-center justify-center">
                        <CreditCard size={18} className="text-[#BC8157]" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-lg text-[var(--text)]">Metodă de plată</h2>
                        <p className="text-xs" style={{ color: "var(--text-40)" }}>Alege cum dorești să plătești sau ridici comanda</p>
                      </div>
                      <div className="ml-auto flex items-center gap-1 text-xs" style={{ color: "var(--text-35)" }}>
                        <Lock size={12} /> Securizat
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {[
                        { id: "cash"   as PaymentMethod, icon: Banknote,   title: "Numerar la livrare",   desc: `Taxa de livrare: ${DELIVERY_FEE} lei`,                   disabled: false },
                        { id: "card"   as PaymentMethod, icon: CreditCard, title: "Plată cu cardul",      desc: `Taxa de livrare: ${DELIVERY_FEE} lei`,                   disabled: false },
                        { id: "pickup" as PaymentMethod, icon: Store,       title: "Ridicare din magazin", desc: "Fără taxă de livrare · Piața Victoriei, București",      disabled: !pickupAllowed },
                      ].map((opt) => {
                        const selected = paymentMethod === opt.id;
                        return (
                          <button key={opt.id} type="button"
                            onClick={() => !opt.disabled && setPaymentMethod(opt.id)}
                            disabled={opt.disabled}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                              opt.disabled
                                ? "border-[#BC8157]/8 opacity-50 cursor-not-allowed"
                                : selected
                                  ? "border-[#BC8157] bg-[#BC8157]/8"
                                  : "border-[#BC8157]/15 hover:border-[#BC8157]/35"
                            }`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                              selected && !opt.disabled ? "bg-[#BC8157] text-white" : "bg-[#BC8157]/10 text-[#BC8157]"
                            }`}>
                              <opt.icon size={18} />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-sm text-[var(--text)]">{opt.title}</p>
                              <p className="text-xs mt-0.5" style={{ color: "var(--text-45)" }}>
                                {opt.id === "pickup" && !pickupAllowed
                                  ? "Necesită dată de livrare cu minim 24h înainte"
                                  : opt.desc}
                              </p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              selected && !opt.disabled ? "border-[#BC8157] bg-[#BC8157]" : "border-[#BC8157]/30"
                            }`}>
                              {selected && !opt.disabled && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Card fields */}
                    <AnimatePresence>
                      {paymentMethod === "card" && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden">
                          <div className="border-t border-[#BC8157]/10 pt-5 space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--label-text)" }}>
                                Număr card <span className="text-red-400">*</span>
                              </label>
                              <input value={card.number}
                                onChange={(e) => {
                                  const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                                  setCard((p) => ({ ...p, number: v.replace(/(.{4})/g, "$1 ").trim() }));
                                }}
                                placeholder="1234 5678 9012 3456"
                                className="w-full px-4 py-3 rounded-xl text-sm input-dark bg-transparent text-[var(--text)] font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--label-text)" }}>
                                Nume pe card <span className="text-red-400">*</span>
                              </label>
                              <input value={card.name}
                                onChange={(e) => setCard((p) => ({ ...p, name: e.target.value }))}
                                placeholder="ION POPESCU"
                                className="w-full px-4 py-3 rounded-xl text-sm input-dark bg-transparent text-[var(--text)] uppercase"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--label-text)" }}>
                                  Expiră <span className="text-red-400">*</span>
                                </label>
                                <input value={card.expiry}
                                  onChange={(e) => {
                                    const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                                    setCard((p) => ({ ...p, expiry: v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v }));
                                  }}
                                  placeholder="MM/YY"
                                  className="w-full px-4 py-3 rounded-xl text-sm input-dark bg-transparent text-[var(--text)] font-mono"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--label-text)" }}>
                                  CVV <span className="text-red-400">*</span>
                                </label>
                                <input value={card.cvv}
                                  onChange={(e) => setCard((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) }))}
                                  placeholder="123"
                                  className="w-full px-4 py-3 rounded-xl text-sm input-dark bg-transparent text-[var(--text)] font-mono"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-3 mt-6">
                      <button type="button" onClick={() => setStep(2)}
                        className="px-6 py-4 border border-[#BC8157]/20 rounded-2xl text-sm font-medium hover:border-[#BC8157]/50 transition-colors text-[var(--text)]">
                        ← Înapoi
                      </button>
                      <button type="button" onClick={handlePlaceOrder}
                        disabled={loading || (paymentMethod === "card" && (!card.number || !card.name || !card.expiry || !card.cvv))}
                        className="flex-1 bg-[#BC8157] hover:bg-[#9a6540] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-semibold transition-colors">
                        {loading
                          ? "Se procesează..."
                          : paymentMethod === "card"
                            ? `Plătește · ${grandTotal.toFixed(2)} lei`
                            : `Finalizează comanda · ${grandTotal.toFixed(2)} lei`}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="card rounded-3xl p-6 sticky top-24">
              <h3 className="font-semibold mb-4 text-[var(--text)]">Sumarul comenzii</h3>

              <div className="space-y-3 mb-5 max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-[var(--text)]">{item.product.name}</p>
                      <p className="text-xs" style={{ color: "var(--text-45)" }}>× {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-[var(--text)]">
                      {(item.product.price * item.quantity).toFixed(2)} lei
                    </p>
                  </div>
                ))}
              </div>

              {deliveryDate && deliveryTime && (
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl mb-4 text-xs" style={{ background: "var(--surface)" }}>
                  <Calendar size={13} className="text-[#BC8157] flex-shrink-0" />
                  <span style={{ color: "var(--text-60)" }}>
                    {new Date(deliveryDate + "T12:00:00").toLocaleDateString("ro-RO", { day: "numeric", month: "long" })}
                    {" · "}{deliveryTime}
                  </span>
                </div>
              )}

              <div className="border-t border-[#BC8157]/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm" style={{ color: "var(--text-55)" }}>
                  <span>Subtotal</span>
                  <span>{totalPrice().toFixed(2)} lei</span>
                </div>
                <div className="flex justify-between text-sm" style={{ color: "var(--text-55)" }}>
                  <span>Livrare</span>
                  {paymentMethod === "pickup"
                    ? <span className="text-green-500 font-medium">Gratuită</span>
                    : <span>{DELIVERY_FEE} lei</span>}
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 text-[var(--text)]">
                  <span>Total</span>
                  <span className="text-[#BC8157]">{grandTotal.toFixed(2)} lei</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
