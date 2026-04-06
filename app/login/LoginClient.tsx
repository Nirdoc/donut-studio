"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuthStore } from "@/lib/store";

export default function LoginClient() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Completează toate câmpurile."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Eroare necunoscută.");
      } else {
        login(data.user, data.token);
        router.push("/");
      }
    } catch {
      setError("Nu s-a putut conecta la server. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
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
          <Image src="https://www.donutstudio.ro/wp-content/uploads/2024/07/Double-Chocolate.webp"
            alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="relative z-10 text-center">
          <Image
            src="/logo.svg"
            alt="Donut Studio" width={160} height={80}
            className="h-20 w-auto mx-auto mb-10"
            unoptimized
          />
          <h2 className="font-display text-4xl mb-4 leading-tight" style={{ color: "var(--text)" }}>Bine ai revenit!</h2>
          <p className="max-w-xs mx-auto mb-10" style={{ color: "var(--text-60)" }}>
            Autentifică-te pentru a-ți accesa contul și a comanda aromat.
          </p>
          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
            {[
              "https://www.donutstudio.ro/wp-content/uploads/2021/08/Raspberry-Blast.webp",
              "https://www.donutstudio.ro/wp-content/uploads/2024/07/Pistachious.webp",
              "https://www.donutstudio.ro/wp-content/uploads/2024/07/Oreo-Dream.webp",
              "https://www.donutstudio.ro/wp-content/uploads/2024/07/Blueberry-Rush-1.webp",
            ].map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden aspect-square border border-[#BC8157]/20">
                <Image src={src} alt="" width={140} height={140} className="w-full h-full object-cover opacity-80" />
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
              src="/logo.svg"
              alt="Donut Studio" width={110} height={55}
              className="h-12 w-auto logo-adaptive" unoptimized
            />
          </div>

          <h1 className="font-display text-3xl mb-2" style={{ color: "var(--text)" }}>Autentificare</h1>
          <p className="text-sm mb-8" style={{ color: "var(--text-50)" }}>
            Nu ai cont?{" "}
            <Link href="/register" className="text-[#BC8157] font-medium hover:underline">Creează unul gratuit</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-900/30 border border-red-700/40 text-red-400 text-sm px-4 py-3 rounded-2xl">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-70)" }}>Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BC8157]/60" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@exemplu.ro"
                  className="w-full pl-11 pr-4 py-3.5 input-dark rounded-2xl text-sm" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium" style={{ color: "var(--text-70)" }}>Parolă</label>
                <Link href="/forgot-password" className="text-xs text-[#BC8157] hover:underline">Ai uitat parola?</Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BC8157]/60" />
                <input type={showPass ? "text" : "password"} value={password}
                  onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 input-dark rounded-2xl text-sm" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-[var(--text)] transition-colors"
                  style={{ color: "var(--text-40)" }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#BC8157] hover:bg-[#9a6540] disabled:opacity-60 text-white py-4 rounded-2xl font-semibold transition-all">
              {loading ? "Se autentifică..." : "Autentifică-te"}
            </button>
          </form>
          <p className="mt-8 text-center text-xs" style={{ color: "var(--text-30)" }}>
            Prin autentificare ești de acord cu <span className="underline cursor-pointer">Termenii și condițiile</span> noastre.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
