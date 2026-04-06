"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ShieldCheck, Users, Search, Plus, Pencil, Trash2,
  X, ChevronLeft, CheckCircle, XCircle, Loader2,
  UserCog, Mail, Lock, User as UserIcon, Cookie,
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
// MAIN SHELL
// ═══════════════════════════════════════════════════════════════════════════════

type Tab = "users" | "donuts";

export default function AdminClient() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const [tab, setTab] = useState<Tab>("users");

  useEffect(() => {
    if (!user) { router.push("/login"); return; }
    if (user.role !== "ADMIN") { router.push("/"); }
  }, [user, router]);

  if (!user || user.role !== "ADMIN") return null;

  return (
    <div className="min-h-screen pt-20 pb-12">
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
            { id: "users" as Tab, icon: Users, label: "Utilizatori" },
            { id: "donuts" as Tab, icon: Cookie, label: "Gogoși" },
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
          {tab === "users" ? <UsersTab token={token ?? ""} /> : <DonutsTab token={token ?? ""} />}
        </motion.div>
      </div>
    </div>
  );
}
