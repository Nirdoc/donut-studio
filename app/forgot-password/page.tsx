"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Eroare necunoscută.");
    } else {
      setSent(true);
    }
  };

  return (
    <div className="section-warm min-h-screen flex items-center justify-center px-4 pt-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Link href="/login"
          className="inline-flex items-center gap-2 text-[var(--text-50)] hover:text-[#BC8157] text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Înapoi la autentificare
        </Link>

        <div className="card rounded-3xl p-8">
          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="w-14 h-14 rounded-2xl bg-[#BC8157]/15 border border-[#BC8157]/25 flex items-center justify-center mb-6">
                  <Mail size={24} className="text-[#BC8157]" />
                </div>
                <h1 className="font-display text-3xl text-[var(--text)] mb-2">Ai uitat parola?</h1>
                <p className="text-[var(--text-55)] text-sm mb-8 leading-relaxed">
                  Introdu adresa de email asociată contului tău și îți vom trimite un link pentru resetarea parolei.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-900/30 border border-red-700/40 text-red-400 text-sm px-4 py-3 rounded-2xl">{error}</div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-70)] mb-1.5">Adresa de email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BC8157]/60" />
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@exemplu.ro" required
                        className="w-full pl-11 pr-4 py-3.5 input-dark rounded-2xl text-sm" />
                    </div>
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full bg-[#BC8157] hover:bg-[#9a6540] disabled:opacity-60 text-white py-4 rounded-2xl font-semibold transition-all">
                    {loading ? "Se trimite..." : "Trimite link de resetare"}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-green-900/30 border border-green-700/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h2 className="font-display text-2xl text-[var(--text)] mb-3">Email trimis!</h2>
                <p className="text-[var(--text-55)] text-sm leading-relaxed mb-8">
                  Am trimis un link de resetare la <strong className="text-[var(--text)]">{email}</strong>. Verifică și spam-ul dacă nu îl găsești.
                </p>
                <Link href="/login"
                  className="inline-flex items-center gap-2 bg-[#BC8157] text-white px-6 py-3 rounded-full font-medium hover:bg-[#9a6540] transition-colors">
                  <ArrowLeft size={16} /> Înapoi la autentificare
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
