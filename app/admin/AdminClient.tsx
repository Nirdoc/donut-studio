"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ShieldCheck, Users, Search, Plus, Pencil, Trash2,
  X, ChevronLeft, CheckCircle, XCircle, Loader2,
  UserCog, Mail, Lock, User as UserIcon, Cookie,
  ShoppingBag, FileText, MapPin, CreditCard, Banknote, Store,
  CalendarDays, Clock as ClockIcon, Download, BarChart2,
  TrendingUp, PackageCheck,
} from "lucide-react";
import { useAuthStore } from "@/lib/store";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AdminUser {
  id: string; name: string; email: string;
  role: "USER" | "ADMIN"; verified: boolean; createdAt: string;
}

interface AdminDonut {
  id: string; name: string; slug: string; price: number;
  image: string; description: string; ingredients: string[];
  allergens: string[]; calories: number;
  category: "classic" | "fruity" | "premium"; available: boolean;
  kcalServing: number; fatServing: number; carbsServing: number; proteinServing: number;
  kcal100g: number; fat100g: number; carbs100g: number; protein100g: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const initials = (name: string) =>
  name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

const avatarColors = ["bg-rose-500","bg-violet-500","bg-blue-500","bg-teal-500","bg-amber-500","bg-pink-500"];
const avatarColor = (id: string) => avatarColors[id.charCodeAt(0) % avatarColors.length];

const categoryLabel: Record<string, string> = { classic: "Clasic", fruity: "Fructat", premium: "Premium" };
const categoryColors: Record<string, string> = {
  classic: "bg-amber-500/12 text-amber-600 border-amber-500/25",
  fruity:  "bg-pink-500/12 text-pink-600 border-pink-500/25",
  premium: "bg-violet-500/12 text-violet-600 border-violet-500/25",
};

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
   .replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

// ─── Modal wrapper ────────────────────────────────────────────────────────────

function ModalOverlay({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
      <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onPointerDownOutside={(e) => e.preventDefault()}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }} transition={{ duration: 0.18 }}
          className="w-full max-w-lg rounded-3xl shadow-2xl card overflow-y-auto max-h-[90vh]"
        >
          {children}
        </motion.div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

// ─── Delete confirm ───────────────────────────────────────────────────────────

function DeleteConfirm({ open, onOpenChange, label, sublabel, onDelete }: {
  open: boolean; onOpenChange: (v: boolean) => void;
  label: string; sublabel: string;
  onDelete: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { if (open) setError(""); }, [open]);

  const go = async () => {
    setLoading(true);
    try { await onDelete(); onOpenChange(false); }
    catch (e: unknown) { setError(e instanceof Error ? e.message : "Eroare."); }
    finally { setLoading(false); }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <ModalOverlay>
        <div className="p-7 text-center">
          <div className="w-14 h-14 rounded-3xl bg-red-500/15 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
            <Trash2 size={22} className="text-red-500" />
          </div>
          <Dialog.Title className="text-lg font-semibold mb-1" style={{ color: "var(--text)" }}>
            Ștergi definitiv?
          </Dialog.Title>
          <p className="text-sm font-medium mb-0.5" style={{ color: "var(--text)" }}>{label}</p>
          <p className="text-xs mb-6" style={{ color: "var(--text-40)" }}>{sublabel}</p>
          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-2xl mb-4">{error}</div>}
          <div className="flex gap-3">
            <Dialog.Close className="flex-1 py-3 rounded-xl text-sm font-medium border transition-colors"
              style={{ color: "var(--text-50)", borderColor: "var(--border)" }}>Anulează</Dialog.Close>
            <button onClick={go} disabled={loading}
              className="flex-1 py-3 rounded-xl text-sm font-semibold bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white transition-colors flex items-center justify-center gap-2">
              {loading && <Loader2 size={14} className="animate-spin" />} Șterge
            </button>
          </div>
        </div>
      </ModalOverlay>
    </Dialog.Root>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// USERS TAB
// ═══════════════════════════════════════════════════════════════════════════════

function UserFormModal({ open, onOpenChange, editing, token, onSaved }: {
  open: boolean; onOpenChange: (v: boolean) => void;
  editing: AdminUser | null; token: string; onSaved: () => void;
}) {
  const isEdit = !!editing;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"USER" | "ADMIN">("USER");
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setName(editing?.name ?? ""); setEmail(editing?.email ?? "");
      setPassword(""); setRole(editing?.role ?? "USER");
      setVerified(editing?.verified ?? false); setError("");
    }
  }, [open, editing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const body: Record<string, unknown> = { name, email, role, verified };
      if (!isEdit) body.password = password;
      const res = await fetch(isEdit ? `/api/admin/users/${editing!.id}` : "/api/admin/users", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Eroare.");
      else { onSaved(); onOpenChange(false); }
    } catch { setError("Eroare de rețea."); } finally { setLoading(false); }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <ModalOverlay>
        <div className="p-7">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#BC8157]/20 flex items-center justify-center">
                {isEdit ? <UserCog size={18} className="text-[#BC8157]" /> : <Plus size={18} className="text-[#BC8157]" />}
              </div>
              <div>
                <Dialog.Title className="font-semibold" style={{ color: "var(--text)" }}>
                  {isEdit ? "Editează utilizator" : "Utilizator nou"}
                </Dialog.Title>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-40)" }}>
                  {isEdit ? `ID: ${editing!.id.slice(0, 8)}…` : "Completează datele"}
                </p>
              </div>
            </div>
            <Dialog.Close className="p-1.5 rounded-xl transition-colors" style={{ color: "var(--text-40)" }}>
              <X size={18} />
            </Dialog.Close>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-2xl">{error}</div>}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-50)" }}>Nume</label>
              <div className="relative">
                <UserIcon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#BC8157]/50" />
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ion Popescu" required
                  className="input-dark w-full pl-9 pr-4 py-3 rounded-xl text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-50)" }}>Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#BC8157]/50" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemplu.ro" required
                  className="input-dark w-full pl-9 pr-4 py-3 rounded-xl text-sm" />
              </div>
            </div>
            {!isEdit && (
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-50)" }}>Parolă</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#BC8157]/50" />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="min. 6 caractere" required
                    className="input-dark w-full pl-9 pr-4 py-3 rounded-xl text-sm" />
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-50)" }}>Rol</label>
                <select value={role} onChange={(e) => setRole(e.target.value as "USER" | "ADMIN")}
                  className="input-dark w-full px-3 py-3 rounded-xl text-sm appearance-none cursor-pointer">
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-50)" }}>Status</label>
                <button type="button" onClick={() => setVerified(!verified)}
                  className={`w-full px-3 py-3 rounded-xl text-sm font-medium border transition-all flex items-center justify-center gap-2 ${
                    verified ? "bg-emerald-500/15 border-emerald-500/25 text-emerald-600" : "border-[var(--border)]"
                  }`}
                  style={verified ? undefined : { color: "var(--text-40)", background: "var(--surface)" }}>
                  {verified ? <CheckCircle size={14} /> : <XCircle size={14} />}
                  {verified ? "Verificat" : "Neverificat"}
                </button>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Dialog.Close className="flex-1 py-3 rounded-xl text-sm font-medium border transition-colors"
                style={{ color: "var(--text-50)", borderColor: "var(--border)" }}>Anulează</Dialog.Close>
              <button type="submit" disabled={loading}
                className="flex-1 py-3 rounded-xl text-sm font-semibold bg-[#BC8157] hover:bg-[#9a6540] disabled:opacity-60 text-white transition-colors flex items-center justify-center gap-2">
                {loading && <Loader2 size={14} className="animate-spin" />}
                {isEdit ? "Salvează" : "Creează"}
              </button>
            </div>
          </form>
        </div>
      </ModalOverlay>
    </Dialog.Root>
  );
}

function UsersTab({ token }: { token: string }) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState<AdminUser | null>(null);

  const fetchUsers = useCallback(async (q = search) => {
    setLoading(true); setFetchError("");
    try {
      const res = await fetch(`/api/admin/users?search=${encodeURIComponent(q)}`,
        { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Eroare");
      setUsers(data.users);
    } catch (e: unknown) {
      setFetchError(e instanceof Error ? e.message : "Eroare.");
    } finally { setLoading(false); }
  }, [token, search]);

  useEffect(() => { fetchUsers(""); }, [token]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { const t = setTimeout(() => fetchUsers(search), 350); return () => clearTimeout(t); }, [search, fetchUsers]);

  return (
    <>
      {/* Toolbar */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-30)" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Caută după nume sau email…"
            className="input-dark w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm" />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-30)" }}>
              <X size={14} />
            </button>
          )}
        </div>
        <button onClick={() => { setEditing(null); setFormOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#BC8157] hover:bg-[#9a6540] text-white text-sm font-semibold transition-colors shadow-lg shadow-[#BC8157]/20 flex-shrink-0">
          <Plus size={16} /> Adaugă
        </button>
      </div>

      <div className="rounded-3xl overflow-hidden card">
        <div className="hidden sm:grid grid-cols-[2fr_2fr_1fr_1fr_1fr] gap-4 px-6 py-3.5 text-xs font-medium uppercase tracking-wider border-b"
          style={{ color: "var(--text-35)", borderColor: "var(--border)" }}>
          <span>Utilizator</span><span>Email</span><span>Rol</span><span>Status</span>
          <span className="text-right">Acțiuni</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3" style={{ color: "var(--text-40)" }}>
            <Loader2 size={20} className="animate-spin" /><span className="text-sm">Se încarcă…</span>
          </div>
        ) : fetchError ? (
          <div className="py-12 text-center text-red-500 text-sm">{fetchError}</div>
        ) : users.length === 0 ? (
          <div className="py-12 text-center text-sm" style={{ color: "var(--text-30)" }}>
            {search ? "Niciun utilizator găsit." : "Nu există utilizatori."}
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {users.map((u, i) => (
              <motion.div key={u.id}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                transition={{ delay: i * 0.02 }}
                className="grid grid-cols-1 sm:grid-cols-[2fr_2fr_1fr_1fr_1fr] gap-3 sm:gap-4 px-6 py-4 border-b last:border-0 transition-colors"
                style={{ borderColor: "var(--border)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${avatarColor(u.id)}`}>
                    {initials(u.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>{u.name}</p>
                    <p className="text-xs sm:hidden truncate" style={{ color: "var(--text-35)" }}>{u.email}</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center">
                  <span className="text-sm truncate" style={{ color: "var(--text-55)" }}>{u.email}</span>
                </div>
                <div className="flex items-center">
                  {u.role === "ADMIN" ? (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 border border-amber-500/25">Admin</span>
                  ) : (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full border"
                      style={{ color: "var(--text-50)", borderColor: "var(--border)", background: "var(--surface)" }}>User</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  {u.verified ? <CheckCircle size={15} className="text-emerald-500 flex-shrink-0" /> : <XCircle size={15} className="text-red-400 flex-shrink-0" />}
                  <span className={`text-xs ${u.verified ? "text-emerald-600" : "text-red-500"}`}>
                    {u.verified ? "Verificat" : "Neverificat"}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-1.5">
                  <button onClick={() => { setEditing(u); setFormOpen(true); }}
                    className="p-2 rounded-xl transition-colors hover:text-[#BC8157] hover:bg-[#BC8157]/10"
                    style={{ color: "var(--text-30)" }}><Pencil size={14} /></button>
                  <button onClick={() => { setDeleting(u); setDeleteOpen(true); }}
                    className="p-2 rounded-xl transition-colors hover:text-red-500 hover:bg-red-500/10"
                    style={{ color: "var(--text-30)" }}><Trash2 size={14} /></button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {!loading && !fetchError && users.length > 0 && (
          <div className="px-6 py-3 border-t text-xs" style={{ borderColor: "var(--border)", color: "var(--text-25)" }}>
            {users.length} {users.length === 1 ? "utilizator" : "utilizatori"} {search ? "găsiți" : "totali"}
          </div>
        )}
      </div>

      <UserFormModal open={formOpen} onOpenChange={setFormOpen} editing={editing} token={token} onSaved={() => fetchUsers()} />
      <DeleteConfirm
        open={deleteOpen} onOpenChange={setDeleteOpen}
        label={deleting?.name ?? ""} sublabel={deleting?.email ?? ""}
        onDelete={async () => {
          const res = await fetch(`/api/admin/users/${deleting!.id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error ?? "Eroare.");
          fetchUsers();
        }}
      />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DONUTS TAB
// ═══════════════════════════════════════════════════════════════════════════════

const emptyDonut = (): Partial<AdminDonut> => ({
  name: "", slug: "", price: 12, image: "", description: "",
  ingredients: [], allergens: [], calories: 0,
  category: "classic", available: true,
  kcalServing: 0, fatServing: 0, carbsServing: 0, proteinServing: 0,
  kcal100g: 0, fat100g: 0, carbs100g: 0, protein100g: 0,
});

function DonutFormModal({ open, onOpenChange, editing, token, onSaved }: {
  open: boolean; onOpenChange: (v: boolean) => void;
  editing: AdminDonut | null; token: string; onSaved: () => void;
}) {
  const isEdit = !!editing;
  const [form, setForm] = useState<Partial<AdminDonut>>(emptyDonut());
  const [ingredientsText, setIngredientsText] = useState("");
  const [allergensText, setAllergensText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(editing ?? emptyDonut());
      setIngredientsText((editing?.ingredients ?? []).join(", "));
      setAllergensText((editing?.allergens ?? []).join(", "));
      setError("");
    }
  }, [open, editing]);

  const set = (k: keyof AdminDonut, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const body = {
        ...form,
        ingredients: ingredientsText.split(",").map((s) => s.trim()).filter(Boolean),
        allergens: allergensText.split(",").map((s) => s.trim()).filter(Boolean),
      };
      const res = await fetch(isEdit ? `/api/admin/donuts/${editing!.id}` : "/api/admin/donuts", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Eroare.");
      else { onSaved(); onOpenChange(false); }
    } catch { setError("Eroare de rețea."); } finally { setLoading(false); }
  };

  const inputCls = "input-dark w-full px-3 py-2.5 rounded-xl text-sm";
  const labelCls = "block text-xs font-medium mb-1" as const;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <ModalOverlay>
        <div className="p-7">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#BC8157]/20 flex items-center justify-center">
                <Cookie size={18} className="text-[#BC8157]" />
              </div>
              <Dialog.Title className="font-semibold" style={{ color: "var(--text)" }}>
                {isEdit ? "Editează gogoașă" : "Gogoașă nouă"}
              </Dialog.Title>
            </div>
            <Dialog.Close className="p-1.5 rounded-xl transition-colors" style={{ color: "var(--text-40)" }}>
              <X size={18} />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-2xl">{error}</div>}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls} style={{ color: "var(--text-50)" }}>Nume *</label>
                <input value={form.name ?? ""} required
                  onChange={(e) => { set("name", e.target.value); if (!isEdit) set("slug", slugify(e.target.value)); }}
                  className={inputCls} placeholder="Double Chocolate" />
              </div>
              <div>
                <label className={labelCls} style={{ color: "var(--text-50)" }}>Slug *</label>
                <input value={form.slug ?? ""} required onChange={(e) => set("slug", e.target.value)}
                  className={inputCls} placeholder="double-chocolate" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls} style={{ color: "var(--text-50)" }}>Preț (lei) *</label>
                <input type="number" min={0} step={0.5} value={form.price ?? 12} required
                  onChange={(e) => set("price", e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls} style={{ color: "var(--text-50)" }}>Categorie *</label>
                <select value={form.category ?? "classic"} onChange={(e) => set("category", e.target.value)}
                  className={`${inputCls} appearance-none cursor-pointer`}>
                  <option value="classic">Clasic</option>
                  <option value="fruity">Fructat</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelCls} style={{ color: "var(--text-50)" }}>Imagine (cale sau URL)</label>
              <input value={form.image ?? ""} onChange={(e) => set("image", e.target.value)}
                className={inputCls} placeholder="/donuts/double-chocolate.webp" />
            </div>

            <div>
              <label className={labelCls} style={{ color: "var(--text-50)" }}>Descriere</label>
              <textarea value={form.description ?? ""} onChange={(e) => set("description", e.target.value)}
                rows={3} className={`${inputCls} resize-none`} placeholder="Descrie gogoașa…" />
            </div>

            <div>
              <label className={labelCls} style={{ color: "var(--text-50)" }}>Ingrediente (separate prin virgulă)</label>
              <input value={ingredientsText} onChange={(e) => setIngredientsText(e.target.value)}
                className={inputCls} placeholder="Făină, lapte, ouă, zahăr…" />
            </div>

            <div>
              <label className={labelCls} style={{ color: "var(--text-50)" }}>Alergeni (separate prin virgulă)</label>
              <input value={allergensText} onChange={(e) => setAllergensText(e.target.value)}
                className={inputCls} placeholder="Ouă, Lapte, Gluten…" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls} style={{ color: "var(--text-50)" }}>Calorii/porție</label>
                <input type="number" min={0} value={form.calories ?? 0}
                  onChange={(e) => { set("calories", e.target.value); set("kcalServing", e.target.value); }}
                  className={inputCls} />
              </div>
              <div>
                <label className={labelCls} style={{ color: "var(--text-50)" }}>Disponibil</label>
                <button type="button" onClick={() => set("available", !form.available)}
                  className={`w-full px-3 py-2.5 rounded-xl text-sm font-medium border transition-all flex items-center justify-center gap-2 ${
                    form.available ? "bg-emerald-500/15 border-emerald-500/25 text-emerald-600" : "border-[var(--border)]"
                  }`}
                  style={form.available ? undefined : { color: "var(--text-40)", background: "var(--surface)" }}>
                  {form.available ? <CheckCircle size={14} /> : <XCircle size={14} />}
                  {form.available ? "Disponibil" : "Indisponibil"}
                </button>
              </div>
            </div>

            {/* Nutrition */}
            <div className="rounded-2xl p-4 space-y-3" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-40)" }}>Valori nutriționale</p>
              <div className="grid grid-cols-3 gap-2">
                {(["fatServing","carbsServing","proteinServing"] as const).map((k) => (
                  <div key={k}>
                    <label className={labelCls} style={{ color: "var(--text-40)" }}>
                      {k === "fatServing" ? "Grăsimi/porție" : k === "carbsServing" ? "Carbohidrați/porție" : "Proteine/porție"}
                    </label>
                    <input type="number" min={0} step={0.01} value={(form[k] as number) ?? 0}
                      onChange={(e) => set(k, e.target.value)} className={inputCls} />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(["kcal100g","fat100g","carbs100g","protein100g"] as const).map((k) => (
                  <div key={k}>
                    <label className={labelCls} style={{ color: "var(--text-40)" }}>
                      {k === "kcal100g" ? "kcal" : k === "fat100g" ? "Grăsimi" : k === "carbs100g" ? "Carbo." : "Prot."} /100g
                    </label>
                    <input type="number" min={0} step={0.01} value={(form[k] as number) ?? 0}
                      onChange={(e) => set(k, e.target.value)} className={inputCls} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <Dialog.Close className="flex-1 py-3 rounded-xl text-sm font-medium border transition-colors"
                style={{ color: "var(--text-50)", borderColor: "var(--border)" }}>Anulează</Dialog.Close>
              <button type="submit" disabled={loading}
                className="flex-1 py-3 rounded-xl text-sm font-semibold bg-[#BC8157] hover:bg-[#9a6540] disabled:opacity-60 text-white transition-colors flex items-center justify-center gap-2">
                {loading && <Loader2 size={14} className="animate-spin" />}
                {isEdit ? "Salvează" : "Adaugă"}
              </button>
            </div>
          </form>
        </div>
      </ModalOverlay>
    </Dialog.Root>
  );
}

function DonutsTab({ token }: { token: string }) {
  const [donuts, setDonuts] = useState<AdminDonut[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminDonut | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState<AdminDonut | null>(null);

  const fetchDonuts = useCallback(async (q = search) => {
    setLoading(true); setFetchError("");
    try {
      const res = await fetch(`/api/admin/donuts?search=${encodeURIComponent(q)}`,
        { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Eroare");
      setDonuts(data.donuts);
    } catch (e: unknown) {
      setFetchError(e instanceof Error ? e.message : "Eroare.");
    } finally { setLoading(false); }
  }, [token, search]);

  useEffect(() => { fetchDonuts(""); }, [token]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { const t = setTimeout(() => fetchDonuts(search), 350); return () => clearTimeout(t); }, [search, fetchDonuts]);

  return (
    <>
      {/* Toolbar */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-30)" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Caută după nume sau descriere…"
            className="input-dark w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm" />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-30)" }}>
              <X size={14} />
            </button>
          )}
        </div>
        <button onClick={() => { setEditing(null); setFormOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#BC8157] hover:bg-[#9a6540] text-white text-sm font-semibold transition-colors shadow-lg shadow-[#BC8157]/20 flex-shrink-0">
          <Plus size={16} /> Adaugă
        </button>
      </div>

      <div className="rounded-3xl overflow-hidden card">
        <div className="hidden sm:grid grid-cols-[auto_2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3.5 text-xs font-medium uppercase tracking-wider border-b"
          style={{ color: "var(--text-35)", borderColor: "var(--border)" }}>
          <span className="w-10" />
          <span>Gogoașă</span><span>Categorie</span><span>Preț</span><span>Status</span>
          <span className="text-right">Acțiuni</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3" style={{ color: "var(--text-40)" }}>
            <Loader2 size={20} className="animate-spin" /><span className="text-sm">Se încarcă…</span>
          </div>
        ) : fetchError ? (
          <div className="py-12 text-center text-red-500 text-sm">{fetchError}</div>
        ) : donuts.length === 0 ? (
          <div className="py-12 text-center text-sm" style={{ color: "var(--text-30)" }}>
            {search ? "Nicio gogoașă găsită." : "Nu există gogoși."}
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {donuts.map((d, i) => (
              <motion.div key={d.id}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                transition={{ delay: i * 0.02 }}
                className="grid grid-cols-1 sm:grid-cols-[auto_2fr_1fr_1fr_1fr_auto] gap-3 sm:gap-4 px-6 py-3.5 border-b last:border-0 transition-colors items-center"
                style={{ borderColor: "var(--border)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div className="hidden sm:block w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center" style={{ background: "var(--surface-mid)" }}>
                  <img src={d.image} alt={d.name} className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>{d.name}</p>
                  <p className="text-xs truncate" style={{ color: "var(--text-35)" }}>{d.slug}</p>
                </div>
                <div className="flex items-center">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${categoryColors[d.category]}`}>
                    {categoryLabel[d.category]}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>{d.price} lei</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {d.available
                    ? <><CheckCircle size={15} className="text-emerald-500" /><span className="text-xs text-emerald-600">Disponibil</span></>
                    : <><XCircle size={15} className="text-red-400" /><span className="text-xs text-red-500">Indisponibil</span></>
                  }
                </div>
                <div className="flex items-center justify-end gap-1.5">
                  <button onClick={() => { setEditing(d); setFormOpen(true); }}
                    className="p-2 rounded-xl transition-colors hover:text-[#BC8157] hover:bg-[#BC8157]/10"
                    style={{ color: "var(--text-30)" }}><Pencil size={14} /></button>
                  <button onClick={() => { setDeleting(d); setDeleteOpen(true); }}
                    className="p-2 rounded-xl transition-colors hover:text-red-500 hover:bg-red-500/10"
                    style={{ color: "var(--text-30)" }}><Trash2 size={14} /></button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {!loading && !fetchError && donuts.length > 0 && (
          <div className="px-6 py-3 border-t text-xs" style={{ borderColor: "var(--border)", color: "var(--text-25)" }}>
            {donuts.length} {donuts.length === 1 ? "gogoașă" : "gogoși"} {search ? "găsite" : "totale"}
          </div>
        )}
      </div>

      <DonutFormModal open={formOpen} onOpenChange={setFormOpen} editing={editing} token={token} onSaved={() => fetchDonuts()} />
      <DeleteConfirm
        open={deleteOpen} onOpenChange={setDeleteOpen}
        label={deleting?.name ?? ""} sublabel={`${categoryLabel[deleting?.category ?? "classic"]} · ${deleting?.price ?? 0} lei`}
        onDelete={async () => {
          const res = await fetch(`/api/admin/donuts/${deleting!.id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error ?? "Eroare.");
          fetchDonuts();
        }}
      />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMENZI TAB
// ═══════════════════════════════════════════════════════════════════════════════

interface AdminOrder {
  id: string; orderNumber: string; firstName: string; lastName: string;
  email: string; phone: string; deliveryDate: string; deliveryTime: string;
  paymentMethod: string; subtotal: number; deliveryFee: number; total: number;
  status: string; createdAt: string;
  items: Array<{ name: string; price: number; quantity: number }>;
  factura?: { facturaNumber: string; emailed: boolean } | null;
}

const statusConfig: Record<string, { label: string; cls: string }> = {
  PLATITA:    { label: "Plătită",      cls: "bg-teal-500/12 text-teal-600 border-teal-500/25" },
  PROCESSING: { label: "În procesare", cls: "bg-blue-500/12 text-blue-600 border-blue-500/25" },
  FINALIZAT:  { label: "Finalizat",    cls: "bg-green-500/12 text-green-600 border-green-500/25" },
};

const statusBadgeConfig: Record<string, { label: string; cls: string }> = {
  PLATITA:    { label: "Plătită",      cls: "bg-teal-500/12 text-teal-600 border-teal-500/25" },
  PROCESSING: { label: "În procesare", cls: "bg-blue-500/12 text-blue-600 border-blue-500/25" },
  FINALIZAT:  { label: "Finalizat",    cls: "bg-green-500/12 text-green-600 border-green-500/25" },
  ANULAT:     { label: "Plată eșuată", cls: "bg-red-500/12 text-red-500 border-red-500/25" },
};

const paymentLabel: Record<string, { label: string; Icon: React.ElementType }> = {
  cash:   { label: "Numerar",  Icon: Banknote },
  card:   { label: "Card",     Icon: CreditCard },
  pickup: { label: "Ridicare", Icon: Store },
};

function ComenziTab({ token }: { token: string }) {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [marking, setMarking] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (filterStatus) params.set("status", filterStatus);
      const res = await fetch(`/api/admin/orders?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setOrders(await res.json());
    } finally { setLoading(false); }
  }, [q, filterStatus, token]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const markFinalizat = async (id: string) => {
    setConfirmId(null);
    setMarking(id);
    try {
      await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: "FINALIZAT" }),
      });
      fetchOrders();
    } finally { setMarking(null); }
  };

  return (
    <div className="space-y-4">
      {/* Confirm dialog */}
      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="rounded-2xl p-6 w-80 shadow-2xl space-y-4 border"
            style={{ background: "var(--mobile-menu-bg)", borderColor: "var(--border)" }}>
            <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>Confirmare schimbare status</p>
            <p className="text-sm" style={{ color: "var(--text-60)" }}>
              Ești sigur că vrei să marchezi această comandă ca <span className="font-semibold text-green-600">Finalizat</span>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmId(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-[#BC8157]/10"
                style={{ color: "var(--text)" }}
              >
                Anulează
              </button>
              <button
                onClick={() => markFinalizat(confirmId)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors"
              >
                Da, finalizează
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BC8157]/50" />
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Caută număr comandă, email, nume..."
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl input-dark bg-transparent text-[var(--text)]" />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 text-sm rounded-xl input-dark bg-transparent text-[var(--text)]">
          <option value="all">Toate statusurile</option>
          {Object.entries(statusConfig).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="card rounded-3xl overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 size={24} className="animate-spin text-[#BC8157]" /></div>
        ) : orders.length === 0 ? (
          <div className="py-16 text-center text-sm" style={{ color: "var(--text-40)" }}>Nu există comenzi.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Comandă", "Client", "Livrare", "Plată", "Total", "Status", ""].map((h) => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--text-35)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => {
                  const st = (o.status === "ANULAT" && o.paymentMethod === "card")
                    ? { label: "Plată eșuată", cls: "bg-red-500/12 text-red-500 border-red-500/25" }
                    : statusBadgeConfig[o.status] ?? statusBadgeConfig.PROCESSING;
                  const pm = paymentLabel[o.paymentMethod];
                  const isExpanded = expanded === o.id;
                  return (
                    <React.Fragment key={o.id}>
                      <tr className="hover:bg-[#BC8157]/4 transition-colors cursor-pointer"
                        style={{ borderBottom: "1px solid var(--border)" }}
                        onClick={() => setExpanded(isExpanded ? null : o.id)}>
                        <td className="px-5 py-4">
                          <p className="text-xs font-bold text-[#BC8157]">{o.orderNumber}</p>
                          <p className="text-xs mt-0.5" style={{ color: "var(--text-35)" }}>
                            {new Date(o.createdAt).toLocaleDateString("ro-RO")}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-[var(--text)]">{o.firstName} {o.lastName}</p>
                          <p className="text-xs" style={{ color: "var(--text-40)" }}>{o.email}</p>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-60)" }}>
                            <CalendarDays size={12} className="text-[#BC8157]" />
                            {o.deliveryDate}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs mt-1" style={{ color: "var(--text-40)" }}>
                            <ClockIcon size={12} />
                            {o.deliveryTime}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          {pm && (
                            <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-60)" }}>
                              <pm.Icon size={13} className="text-[#BC8157]" />
                              {pm.label}
                            </div>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm font-bold text-[#BC8157]">{o.total.toFixed(2)} lei</p>
                          {o.deliveryFee > 0 && (
                            <p className="text-xs" style={{ color: "var(--text-35)" }}>+{o.deliveryFee} lei liv.</p>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${st.cls}`}>
                            {st.label}
                          </span>
                          {o.factura && (
                            <p className="text-xs mt-1" style={{ color: o.factura.emailed ? "var(--text-35)" : "var(--text-50)" }}>
                              {o.factura.facturaNumber} {o.factura.emailed ? "· trimisă" : "· netrimisă"}
                            </p>
                          )}
                        </td>
                        <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                          {o.status !== "FINALIZAT" && o.status !== "ANULAT" && (
                            <button
                              onClick={() => setConfirmId(o.id)}
                              disabled={marking === o.id}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 transition-colors"
                            >
                              {marking === o.id
                                ? <Loader2 size={12} className="animate-spin" />
                                : <CheckCircle size={12} />}
                              Finalizat
                            </button>
                          )}
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
                          <td colSpan={7} className="px-5 py-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-35)" }}>
                                  Produse comandate
                                </p>
                                <div className="space-y-1">
                                  {o.items.map((item, i) => (
                                    <div key={i} className="flex justify-between text-xs" style={{ color: "var(--text-60)" }}>
                                      <span>{item.name} × {item.quantity}</span>
                                      <span className="text-[#BC8157]">{(item.price * item.quantity).toFixed(2)} lei</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-35)" }}>
                                  Contact & telefon
                                </p>
                                <p className="text-xs" style={{ color: "var(--text-60)" }}>{o.phone}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FACTURI TAB
// ═══════════════════════════════════════════════════════════════════════════════

interface AdminFactura {
  id: string; facturaNumber: string; firstName: string; lastName: string;
  email: string; subtotal: number; deliveryFee: number; total: number;
  emailed: boolean; createdAt: string;
  comanda: { orderNumber: string; status: string; paymentMethod: string };
}

function FacturiTab({ token }: { token: string }) {
  const [facturas, setFacturas] = useState<AdminFactura[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const fetchFacturas = useCallback(async () => {
    setLoading(true);
    try {
      const params = q ? `?q=${encodeURIComponent(q)}` : "";
      const res = await fetch(`/api/admin/facturas${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setFacturas(await res.json());
    } finally { setLoading(false); }
  }, [q, token]);

  useEffect(() => { fetchFacturas(); }, [fetchFacturas]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BC8157]/50" />
        <input value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="Caută număr factură, email, nume..."
          className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl input-dark bg-transparent text-[var(--text)]" />
      </div>

      <div className="card rounded-3xl overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 size={24} className="animate-spin text-[#BC8157]" /></div>
        ) : facturas.length === 0 ? (
          <div className="py-16 text-center text-sm" style={{ color: "var(--text-40)" }}>Nu există facturi.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Factură", "Comandă", "Client", "Total", "Status", "Emisă", ""].map((h) => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--text-35)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {facturas.map((f) => {
                  const pm = paymentLabel[f.comanda.paymentMethod];
                  const orderSt = statusBadgeConfig[f.comanda.status] ?? statusBadgeConfig.PROCESSING;
                  return (
                    <tr key={f.id} style={{ borderBottom: "1px solid var(--border)" }}
                      className="hover:bg-[#BC8157]/4 transition-colors">
                      <td className="px-5 py-4">
                        <p className="text-xs font-bold text-[#BC8157]">{f.facturaNumber}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-xs font-medium" style={{ color: "var(--text)" }}>{f.comanda.orderNumber}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs border ${orderSt.cls}`}>{orderSt.label}</span>
                          {pm && (
                            <span className="text-xs flex items-center gap-0.5" style={{ color: "var(--text-40)" }}>
                              <pm.Icon size={11} /> {pm.label}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{f.firstName} {f.lastName}</p>
                        <p className="text-xs" style={{ color: "var(--text-40)" }}>{f.email}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-[#BC8157]">{f.total.toFixed(2)} lei</p>
                      </td>
                      <td className="px-5 py-4">
                        {f.emailed ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border bg-green-500/12 text-green-600 border-green-500/25">
                            <CheckCircle size={11} /> Trimisă
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border bg-red-500/12 text-red-500 border-red-500/25">
                            <XCircle size={11} /> Netrimisă
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-xs" style={{ color: "var(--text-40)" }}>
                          {new Date(f.createdAt).toLocaleDateString("ro-RO")}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        {f.comanda.paymentMethod === "card" && (
                          <a
                            href={`/api/admin/facturas/${f.id}/pdf`}
                            download={`${f.facturaNumber}.pdf`}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              fetch(`/api/admin/facturas/${f.id}/pdf`, {
                                headers: { Authorization: `Bearer ${token}` },
                              })
                                .then((r) => r.blob())
                                .then((blob) => {
                                  const url = URL.createObjectURL(blob);
                                  const a = document.createElement("a");
                                  a.href = url;
                                  a.download = `${f.facturaNumber}.pdf`;
                                  a.click();
                                  URL.revokeObjectURL(url);
                                });
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#BC8157] border border-[#BC8157]/30 hover:bg-[#BC8157]/10 transition-colors"
                          >
                            <Download size={12} /> PDF
                          </a>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD TAB
// ═══════════════════════════════════════════════════════════════════════════════

interface DashboardData {
  kpis: {
    todayOrders: number; todayRevenue: number;
    yesterdayOrders: number; yesterdayRevenue: number;
    weekOrders: number; weekRevenue: number;
    prevWeekOrders: number; prevWeekRevenue: number;
    monthOrders: number; monthRevenue: number; prevMonthRevenue: number;
    avgOrderValue: number; prevAvgOrderValue: number;
    pendingOrders: number; cancelledMonth: number;
    newUsersWeek: number; newUsersPrevWeek: number;
    totalUsers: number; allTimeOrders: number; allTimeRevenue: number;
  };
  dailyStats: Array<{ date: string; count: number; revenue: number }>;
  statusBreakdown: Array<{ status: string; count: number }>;
  paymentBreakdown: Array<{ method: string; count: number; revenue: number }>;
  topProducts: Array<{ name: string; qty: number; revenue: number }>;
  topSlots: Array<{ slot: string; count: number }>;
}

const fmtLei = (n: number) =>
  n.toLocaleString("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " lei";

const fmtLeiCompact = (n: number) =>
  n >= 1000
    ? (n / 1000).toLocaleString("ro-RO", { maximumFractionDigits: 1 }) + "k lei"
    : n.toFixed(0) + " lei";

function trend(current: number, previous: number): { pct: number; up: boolean; neutral: boolean } {
  if (previous === 0) return { pct: current > 0 ? 100 : 0, up: current >= 0, neutral: previous === 0 && current === 0 };
  const pct = Math.round(((current - previous) / previous) * 100);
  return { pct: Math.abs(pct), up: pct >= 0, neutral: pct === 0 };
}

function TrendBadge({ current, previous, suffix = "" }: { current: number; previous: number; suffix?: string }) {
  const t = trend(current, previous);
  if (t.neutral) return <span className="text-[10px] px-1.5 py-0.5 rounded-md" style={{ color: "var(--text-30)", background: "var(--surface)" }}>—</span>;
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${t.up ? "bg-green-500/12 text-green-600" : "bg-red-500/12 text-red-500"}`}>
      {t.up ? "▲" : "▼"} {t.pct}%{suffix}
    </span>
  );
}

// SVG line chart
function LineChart({ data, color = "#BC8157", height = 80 }: {
  data: number[]; color?: string; height?: number;
}) {
  if (data.length < 2) return null;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const W = 300; const H = height;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / range) * H * 0.9 - H * 0.05;
    return `${x},${y}`;
  });
  const area = `M${pts[0]} L${pts.join(" L")} L${W},${H} L0,${H} Z`;
  const line = `M${pts[0]} L${pts.join(" L")}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }}>
      <defs>
        <linearGradient id={`g-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#g-${color.replace("#","")})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Bar chart (horizontal)
function HBar({ value, max, color = "#BC8157" }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.max((value / max) * 100, 2) : 2;
  return (
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

const STATUS_LABELS: Record<string, string> = {
  PLATITA: "Plătită", PROCESSING: "În procesare",
  FINALIZAT: "Finalizat", ANULAT: "Plată eșuată",
};
const STATUS_COLORS: Record<string, string> = {
  PLATITA: "#14b8a6", PROCESSING: "#3b82f6",
  FINALIZAT: "#22c55e", ANULAT: "#ef4444",
};
const PAYMENT_LABELS: Record<string, string> = { cash: "Numerar", card: "Card", pickup: "Ridicare" };
const PAYMENT_COLORS: Record<string, string> = { cash: "#22c55e", card: "#3b82f6", pickup: "#BC8157" };

function DashboardTab({ token }: { token: string }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chartMode, setChartMode] = useState<"orders" | "revenue">("revenue");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/dashboard", { headers: { Authorization: `Bearer ${token}` } });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Eroare");
        setData(json);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Eroare.");
      } finally { setLoading(false); }
    })();
  }, [token]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 gap-3">
      <Loader2 size={28} className="animate-spin text-[#BC8157]" />
      <p className="text-sm" style={{ color: "var(--text-40)" }}>Se încarcă statisticile…</p>
    </div>
  );
  if (error || !data) return <div className="py-16 text-center text-red-500 text-sm">{error || "Eroare."}</div>;

  const { kpis, dailyStats, statusBreakdown, paymentBreakdown, topProducts, topSlots } = data;

  const chartValues = chartMode === "revenue"
    ? dailyStats.map(d => d.revenue)
    : dailyStats.map(d => d.count);

  const maxProduct = Math.max(...topProducts.map(p => p.qty), 1);
  const maxSlot = Math.max(...topSlots.map(s => s.count), 1);
  const totalStatus = statusBreakdown.reduce((a, b) => a + b.count, 0) || 1;
  const totalPayment = paymentBreakdown.reduce((a, b) => a + b.count, 0) || 1;

  // Card helpers
  const card = "card rounded-2xl";

  return (
    <div className="space-y-5">

      {/* ── Row 1: Hero KPIs ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Venit luna */}
        <div className={`${card} p-5 lg:col-span-1`}>
          <div className="flex items-start justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#BC8157]/12 flex items-center justify-center">
              <TrendingUp size={16} className="text-[#BC8157]" />
            </div>
            <TrendBadge current={kpis.monthRevenue} previous={kpis.prevMonthRevenue} />
          </div>
          <p className="text-xl font-bold leading-tight" style={{ color: "var(--text)" }}>
            {fmtLeiCompact(kpis.monthRevenue)}
          </p>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-40)" }}>Venit luna aceasta</p>
          <p className="text-[10px] mt-2" style={{ color: "var(--text-30)" }}>
            vs. {fmtLeiCompact(kpis.prevMonthRevenue)} luna trecută
          </p>
        </div>

        {/* Comenzi saptamana */}
        <div className={`${card} p-5`}>
          <div className="flex items-start justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <ShoppingBag size={16} className="text-blue-500" />
            </div>
            <TrendBadge current={kpis.weekOrders} previous={kpis.prevWeekOrders} />
          </div>
          <p className="text-xl font-bold leading-tight" style={{ color: "var(--text)" }}>{kpis.weekOrders}</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-40)" }}>Comenzi săptămâna aceasta</p>
          <p className="text-[10px] mt-2" style={{ color: "var(--text-30)" }}>vs. {kpis.prevWeekOrders} săptămâna trecută</p>
        </div>

        {/* Valoare medie */}
        <div className={`${card} p-5`}>
          <div className="flex items-start justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center">
              <CreditCard size={16} className="text-violet-500" />
            </div>
            <TrendBadge current={kpis.avgOrderValue} previous={kpis.prevAvgOrderValue} />
          </div>
          <p className="text-xl font-bold leading-tight" style={{ color: "var(--text)" }}>
            {fmtLeiCompact(kpis.avgOrderValue)}
          </p>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-40)" }}>Valoare medie comandă (30 zile)</p>
          <p className="text-[10px] mt-2" style={{ color: "var(--text-30)" }}>
            vs. {fmtLeiCompact(kpis.prevAvgOrderValue)} luna trecută
          </p>
        </div>

        {/* Utilizatori noi */}
        <div className={`${card} p-5`}>
          <div className="flex items-start justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 flex items-center justify-center">
              <Users size={16} className="text-teal-500" />
            </div>
            <TrendBadge current={kpis.newUsersWeek} previous={kpis.newUsersPrevWeek} />
          </div>
          <p className="text-xl font-bold leading-tight" style={{ color: "var(--text)" }}>{kpis.newUsersWeek}</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-40)" }}>Utilizatori noi săptămâna aceasta</p>
          <p className="text-[10px] mt-2" style={{ color: "var(--text-30)" }}>
            {kpis.totalUsers.toLocaleString("ro-RO")} utilizatori total
          </p>
        </div>
      </div>

      {/* ── Row 2: Secondary KPIs (small) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Comenzi azi", value: kpis.todayOrders, sub: `vs. ${kpis.yesterdayOrders} ieri`, color: "#BC8157", trend: { c: kpis.todayOrders, p: kpis.yesterdayOrders } },
          { label: "Venit azi", value: fmtLeiCompact(kpis.todayRevenue), sub: `vs. ${fmtLeiCompact(kpis.yesterdayRevenue)} ieri`, color: "#BC8157", trend: { c: kpis.todayRevenue, p: kpis.yesterdayRevenue } },
          { label: "Venit săptămână", value: fmtLeiCompact(kpis.weekRevenue), sub: `vs. ${fmtLeiCompact(kpis.prevWeekRevenue)} prev.`, color: "#3b82f6", trend: { c: kpis.weekRevenue, p: kpis.prevWeekRevenue } },
          { label: "În așteptare", value: kpis.pendingOrders, sub: "necesită acțiune", color: "#f59e0b", trend: null },
          { label: "Plăți eșuate", value: kpis.cancelledMonth, sub: "din luna aceasta", color: "#ef4444", trend: null },
          { label: "Total comenzi", value: kpis.allTimeOrders.toLocaleString("ro-RO"), sub: fmtLeiCompact(kpis.allTimeRevenue) + " total", color: "#22c55e", trend: null },
        ].map(({ label, value, sub, color, trend: tr }) => (
          <div key={label} className={`${card} px-4 py-3.5`}>
            <p className="text-lg font-bold leading-tight" style={{ color }}>{value}</p>
            <p className="text-[10px] font-medium mt-0.5" style={{ color: "var(--text-50)" }}>{label}</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              {tr && <TrendBadge current={tr.c} previous={tr.p} />}
              <p className="text-[9px]" style={{ color: "var(--text-30)" }}>{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Row 3: Line chart ── */}
      <div className={`${card} p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart2 size={16} className="text-[#BC8157]" />
            <h3 className="text-sm font-semibold" style={{ color: "var(--text)" }}>
              {chartMode === "revenue" ? "Venit zilnic" : "Comenzi zilnice"} — ultimele 30 zile
            </h3>
          </div>
          <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
            {(["revenue", "orders"] as const).map((m) => (
              <button key={m} onClick={() => setChartMode(m)}
                className="px-3 py-1.5 text-xs font-medium transition-colors"
                style={chartMode === m
                  ? { background: "#BC8157", color: "#fff" }
                  : { color: "var(--text-50)" }}>
                {m === "revenue" ? "Venit" : "Comenzi"}
              </button>
            ))}
          </div>
        </div>

        {/* Y-axis labels + chart */}
        <div className="flex gap-3 items-end">
          <div className="flex flex-col justify-between text-right h-20 pb-4">
            {[1, 0.5, 0].map(f => {
              const maxV = Math.max(...chartValues, 1);
              const v = maxV * f;
              return (
                <span key={f} className="text-[9px]" style={{ color: "var(--text-25, rgba(240,221,200,0.25))" }}>
                  {chartMode === "revenue" ? fmtLeiCompact(v) : Math.round(v)}
                </span>
              );
            })}
          </div>
          <div className="flex-1">
            <LineChart data={chartValues} height={80} />
            {/* X-axis: first + mid + last */}
            <div className="flex justify-between text-[9px] mt-1 px-0.5" style={{ color: "var(--text-30)" }}>
              {[0, Math.floor(dailyStats.length / 2), dailyStats.length - 1].map(i => (
                <span key={i}>
                  {new Date(dailyStats[i]?.date).toLocaleDateString("ro-RO", { day: "2-digit", month: "2-digit" })}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Summary row */}
        <div className="flex gap-6 mt-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
          <div>
            <p className="text-xs font-semibold text-[#BC8157]">
              {fmtLei(dailyStats.reduce((s, d) => s + d.revenue, 0))}
            </p>
            <p className="text-[10px]" style={{ color: "var(--text-35)" }}>Venit total 30 zile</p>
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: "var(--text)" }}>
              {dailyStats.reduce((s, d) => s + d.count, 0)} comenzi
            </p>
            <p className="text-[10px]" style={{ color: "var(--text-35)" }}>Total 30 zile</p>
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: "var(--text)" }}>
              {fmtLei(dailyStats.reduce((s, d) => s + d.revenue, 0) / Math.max(dailyStats.filter(d => d.count > 0).length, 1))}
            </p>
            <p className="text-[10px]" style={{ color: "var(--text-35)" }}>Medie/zi activă</p>
          </div>
        </div>
      </div>

      {/* ── Row 4: 3 columns ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Top produse */}
        <div className={`${card} p-5`}>
          <div className="flex items-center gap-2 mb-4">
            <Cookie size={14} className="text-[#BC8157]" />
            <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-50)" }}>
              Top produse (90 zile)
            </h3>
          </div>
          {topProducts.length === 0
            ? <p className="text-xs text-center py-4" style={{ color: "var(--text-30)" }}>Fără date</p>
            : <div className="space-y-3">
              {topProducts.map((p, i) => (
                <div key={p.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-bold w-4 flex-shrink-0" style={{ color: "var(--text-30)" }}>
                        {i + 1}
                      </span>
                      <span className="text-xs font-medium truncate" style={{ color: "var(--text)" }}>{p.name}</span>
                    </div>
                    <span className="text-xs font-bold text-[#BC8157] flex-shrink-0 ml-2">{p.qty} buc</span>
                  </div>
                  <HBar value={p.qty} max={maxProduct} />
                  <p className="text-[9px] mt-0.5 text-right" style={{ color: "var(--text-30)" }}>
                    {fmtLeiCompact(p.revenue)}
                  </p>
                </div>
              ))}
            </div>
          }
        </div>

        {/* Metodă de plată + Status */}
        <div className="space-y-4">
          <div className={`${card} p-5`}>
            <div className="flex items-center gap-2 mb-4">
              <Banknote size={14} className="text-[#BC8157]" />
              <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-50)" }}>
                Metodă de plată
              </h3>
            </div>
            <div className="space-y-2.5">
              {paymentBreakdown.sort((a, b) => b.count - a.count).map(p => {
                const pct = Math.round((p.count / totalPayment) * 100);
                const color = PAYMENT_COLORS[p.method] ?? "#BC8157";
                return (
                  <div key={p.method}>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: "var(--text-60)" }}>{PAYMENT_LABELS[p.method] ?? p.method}</span>
                      <span className="font-semibold" style={{ color }}>{p.count} ({pct}%)</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`${card} p-5`}>
            <div className="flex items-center gap-2 mb-4">
              <PackageCheck size={14} className="text-[#BC8157]" />
              <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-50)" }}>
                Status comenzi (total)
              </h3>
            </div>
            <div className="space-y-2.5">
              {statusBreakdown.sort((a, b) => b.count - a.count).map(({ status, count }) => {
                const pct = Math.round((count / totalStatus) * 100);
                const color = STATUS_COLORS[status] ?? "#BC8157";
                return (
                  <div key={status}>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: "var(--text-60)" }}>{STATUS_LABELS[status] ?? status}</span>
                      <span className="font-semibold" style={{ color }}>{count} ({pct}%)</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Intervale orare livrare */}
        <div className={`${card} p-5`}>
          <div className="flex items-center gap-2 mb-4">
            <ClockIcon size={14} className="text-[#BC8157]" />
            <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-50)" }}>
              Intervale de livrare populare
            </h3>
          </div>
          {topSlots.length === 0
            ? <p className="text-xs text-center py-4" style={{ color: "var(--text-30)" }}>Fără date</p>
            : <div className="space-y-3">
              {topSlots.map((s, i) => {
                const pct = Math.round((s.count / topSlots[0].count) * 100);
                const isTop = i === 0;
                return (
                  <div key={s.slot}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {isTop && <span className="text-[9px] bg-[#BC8157]/15 text-[#BC8157] px-1.5 py-0.5 rounded-md font-semibold">TOP</span>}
                        <span className="text-xs font-medium" style={{ color: "var(--text)" }}>{s.slot}</span>
                      </div>
                      <span className="text-xs font-bold" style={{ color: isTop ? "#BC8157" : "var(--text-60)" }}>
                        {s.count} comenzi
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: isTop ? "#BC8157" : "rgba(188,129,87,0.4)" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          }
        </div>
      </div>

    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN SHELL
// ═══════════════════════════════════════════════════════════════════════════════

type Tab = "dashboard" | "users" | "donuts" | "comenzi" | "facturi";

export default function AdminClient() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!user) { router.push("/login"); return; }
    if (user.role !== "ADMIN") { router.push("/"); }
  }, [mounted, user, router]);

  if (!mounted || !user || user.role !== "ADMIN") return null;

  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8 pt-4">
          <button onClick={() => router.back()} className="p-2 rounded-xl transition-colors"
            style={{ color: "var(--text-40)", background: "var(--surface)" }}>
            <ChevronLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2.5 mb-0.5">
              <ShieldCheck size={20} className="text-[#BC8157]" />
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Panou Admin</h1>
            </div>
            <p className="text-xs pl-0.5" style={{ color: "var(--text-35)" }}>Gestionează platforma</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="flex gap-1 p-1 rounded-2xl mb-6 w-fit" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          {([
            { id: "dashboard" as Tab, icon: BarChart2,   label: "Dashboard" },
            { id: "users"     as Tab, icon: Users,       label: "Utilizatori" },
            { id: "donuts"    as Tab, icon: Cookie,       label: "Gogoși" },
            { id: "comenzi"   as Tab, icon: ShoppingBag,  label: "Comenzi" },
            { id: "facturi"   as Tab, icon: FileText,     label: "Facturi" },
          ]).map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => setTab(id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={tab === id ? { background: "#BC8157", color: "#fff" } : { color: "var(--text-50)" }}>
              <Icon size={15} /> {label}
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {tab === "dashboard" && <DashboardTab token={token ?? ""} />}
          {tab === "users"     && <UsersTab     token={token ?? ""} />}
          {tab === "donuts"    && <DonutsTab    token={token ?? ""} />}
          {tab === "comenzi"   && <ComenziTab   token={token ?? ""} />}
          {tab === "facturi"   && <FacturiTab   token={token ?? ""} />}
        </motion.div>
      </div>
    </div>
  );
}
