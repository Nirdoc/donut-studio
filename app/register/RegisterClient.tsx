"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useAuthStore } from "@/lib/store";

export default function RegisterClient() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.confirm) { setError("Completează toate câmpurile."); return; }
    if (form.password !== form.confirm) { setError("Parolele nu coincid."); return; }
    if (form.password.length < 6) { setError("Parola trebuie să aibă minim 6 caractere."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    login(form.name, form.email);
    router.push("/account");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left — brand panel */}
      <div className="hidden lg:flex flex-col items-center justify-center relative section-dark overflow-hidden p-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(188,129,87,0.12) 0%, transparent 70%)" }} />
        </div>
        <div className="absolute inset-0 opacity-10">
          <Image src="https://www.donutstudio.ro/wp-content/uploads/2024/07/Pistachious.webp"
            alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0d0502]/80" />
        </div>
        <div className="relative z-10 text-center">
          <Image
            src="https://www.donutstudio.ro/wp-content/uploads/2024/07/donut-Studio-Artisanal-Pastry-logo_border.svg"
            alt="Donut Studio" width={160} height={80}
            className="h-20 w-auto mx-auto mb-10 brightness-0 invert"
            unoptimized
          />
          <h2 className="font-display text-4xl text-[#f0ddc8] mb-4 leading-tight">
            Alătură-te<br />comunității noastre!
          </h2>
          <p className="text-[#f0ddc8]/60 max-w-xs mx-auto mb-10">
            Creează un cont gratuit și bucură-te de gogoșile noastre artizanale.
          </p>
          <div className="card rounded-2xl p-5 max-w-xs mx-auto text-left">
            <p className="text-[#f0ddc8]/80 font-semibold text-sm mb-3">Beneficii cont:</p>
            {["Istoric comenzi", "Adrese salvate", "Oferte exclusive", "Comandă rapidă"].map((b) => (
              <div key={b} className="flex items-center gap-2 text-[#f0ddc8]/60 text-sm mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#BC8157]" />
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="section-warm flex items-center justify-center p-8 pt-28 lg:pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Image
              src="https://www.donutstudio.ro/wp-content/uploads/2024/07/donut-Studio-Artisanal-Pastry-logo_border.svg"
              alt="Donut Studio" width={110} height={55}
              className="h-12 w-auto brightness-0 invert" unoptimized
            />
          </div>

          <h1 className="font-display text-3xl text-[#f0ddc8] mb-2">Creează cont</h1>
          <p className="text-[#f0ddc8]/50 text-sm mb-8">
            Ai deja cont?{" "}
            <Link href="/login" className="text-[#BC8157] font-medium hover:underline">Autentifică-te</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-900/30 border border-red-700/40 text-red-400 text-sm px-4 py-3 rounded-2xl">{error}</div>
            )}
            {[
              { name: "name", label: "Nume complet", placeholder: "Ion Popescu", Icon: User, type: "text" },
              { name: "email", label: "Email", placeholder: "email@exemplu.ro", Icon: Mail, type: "email" },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-[#f0ddc8]/70 mb-1.5">{f.label}</label>
                <div className="relative">
                  <f.Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BC8157]/60" />
                  <input name={f.name} type={f.type} value={form[f.name as keyof typeof form]}
                    onChange={handleChange} placeholder={f.placeholder}
                    className="w-full pl-11 pr-4 py-3.5 input-dark rounded-2xl text-sm" />
                </div>
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-[#f0ddc8]/70 mb-1.5">Parolă</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BC8157]/60" />
                <input name="password" type={showPass ? "text" : "password"}
                  value={form.password} onChange={handleChange} placeholder="Minim 6 caractere"
                  className="w-full pl-11 pr-12 py-3.5 input-dark rounded-2xl text-sm" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#f0ddc8]/40 hover:text-[#f0ddc8]">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#f0ddc8]/70 mb-1.5">Confirmă parola</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BC8157]/60" />
                <input name="confirm" type={showPass ? "text" : "password"}
                  value={form.confirm} onChange={handleChange} placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 input-dark rounded-2xl text-sm" />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#BC8157] hover:bg-[#9a6540] disabled:opacity-60 text-white py-4 rounded-2xl font-semibold transition-all mt-2">
              {loading ? "Se creează contul..." : "Creează cont"}
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-[#f0ddc8]/30">
            Prin înregistrare ești de acord cu <span className="underline cursor-pointer">Termenii și condițiile</span> noastre.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
