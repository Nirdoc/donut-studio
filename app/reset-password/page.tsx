"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("Parola trebuie să aibă minim 6 caractere."); return; }
    if (password !== confirm) { setError("Parolele nu coincid."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Eroare necunoscută.");
      } else {
        setDone(true);
        setTimeout(() => router.push("/login"), 3000);
      }
    } catch {
      setError("Nu s-a putut conecta la server. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center py-4">
        <p className="text-red-400 mb-6">Link invalid. Solicită un nou email de resetare.</p>
        <Link href="/forgot-password" className="text-[#BC8157] hover:underline">
          Solicită resetare parolă
        </Link>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {!done ? (
        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="w-14 h-14 rounded-2xl bg-[#BC8157]/15 border border-[#BC8157]/25 flex items-center justify-center mb-6">
            <Lock size={24} className="text-[#BC8157]" />
          </div>
          <h1 className="font-display text-3xl text-[var(--text)] mb-2">Parolă nouă</h1>
          <p className="text-[var(--text-55)] text-sm mb-8 leading-relaxed">
            Alege o parolă nouă pentru contul tău.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-900/30 border border-red-700/40 text-red-400 text-sm px-4 py-3 rounded-2xl">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium text-[var(--text-70)] mb-1.5">Parolă nouă</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BC8157]/60" />
                <input type={showPass ? "text" : "password"} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minim 6 caractere" required
                  className="w-full pl-11 pr-12 py-3.5 input-dark rounded-2xl text-sm" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-40)] hover:text-[var(--text)]">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-70)] mb-1.5">Confirmă parola</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BC8157]/60" />
                <input type={showPass ? "text" : "password"} value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repetă parola" required
                  className="w-full pl-11 pr-4 py-3.5 input-dark rounded-2xl text-sm" />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#BC8157] hover:bg-[#9a6540] disabled:opacity-60 text-white py-4 rounded-2xl font-semibold transition-all">
              {loading ? "Se salvează..." : "Salvează parola nouă"}
            </button>
          </form>
        </motion.div>
      ) : (
        <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center py-4">
          <div className="w-16 h-16 rounded-full bg-green-900/30 border border-green-700/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-green-400" />
          </div>
          <h2 className="font-display text-2xl text-[var(--text)] mb-3">Parolă schimbată!</h2>
          <p className="text-[var(--text-55)] text-sm leading-relaxed mb-8">
            Parola ta a fost actualizată. Vei fi redirecționat la autentificare...
          </p>
          <Link href="/login"
            className="inline-flex items-center gap-2 bg-[#BC8157] text-white px-6 py-3 rounded-full font-medium hover:bg-[#9a6540] transition-colors">
            <ArrowLeft size={16} /> Autentifică-te
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="section-warm min-h-screen flex items-center justify-center px-4 pt-28">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Link href="/login"
          className="inline-flex items-center gap-2 text-[var(--text-50)] hover:text-[#BC8157] text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Înapoi la autentificare
        </Link>
        <div className="card rounded-3xl p-8">
          <Suspense>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </motion.div>
    </div>
  );
}
