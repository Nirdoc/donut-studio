"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, ChevronDown, ChevronUp, X, ShieldCheck } from "lucide-react";

const STORAGE_KEY = "donut-cookie-consent";

interface ConsentState {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  savedAt: string;
}

const COOKIE_CATEGORIES = [
  {
    key: "necessary" as const,
    label: "Cookie-uri necesare",
    description:
      "Esențiale pentru funcționarea corectă a site-ului. Includ autentificarea, coșul de cumpărături și preferințele de temă. Nu pot fi dezactivate.",
    required: true,
  },
  {
    key: "analytics" as const,
    label: "Cookie-uri analitice",
    description:
      "Ne ajută să înțelegem cum utilizatorii interacționează cu site-ul (pagini vizitate, timp petrecut, erori). Datele sunt anonimizate.",
    required: false,
  },
  {
    key: "marketing" as const,
    label: "Cookie-uri de marketing",
    description:
      "Utilizate pentru a afișa reclame relevante și pentru a măsura eficiența campaniilor publicitare. Pot fi partajate cu parteneri terți.",
    required: false,
  },
];

function Toggle({
  checked,
  disabled,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      className={`relative w-10 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      } ${checked ? "bg-[#BC8157]" : "bg-[#BC8157]/20 border border-[#BC8157]/30"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [managing, setManaging] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (analytics: boolean, marketing: boolean) => {
    const consent: ConsentState = {
      necessary: true,
      analytics,
      marketing,
      savedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {}
    setVisible(false);
  };

  const acceptAll = () => save(true, true);
  const rejectAll = () => save(false, false);
  const savePrefs = () => save(prefs.analytics, prefs.marketing);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop blur only when managing */}
          {managing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              onClick={() => setManaging(false)}
            />
          )}

          <motion.div
            key="cookie-banner"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className={`fixed z-[61] ${
              managing
                ? "inset-0 flex items-center justify-center p-4"
                : "bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[420px]"
            }`}
          >
            <div
              className={`rounded-2xl shadow-2xl overflow-hidden ${
                managing ? "w-full max-w-lg max-h-[90vh] overflow-y-auto" : ""
              }`}
              style={{
                background: "var(--header-scrolled-bg, #110804)",
                border: "1px solid rgba(188,129,87,0.18)",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center gap-3 px-5 py-4 border-b"
                style={{ borderColor: "rgba(188,129,87,0.12)" }}
              >
                <div className="w-8 h-8 rounded-xl bg-[#BC8157]/15 flex items-center justify-center flex-shrink-0">
                  <Cookie size={15} className="text-[#BC8157]" />
                </div>
                <h2 className="text-sm font-semibold flex-1" style={{ color: "var(--text, #f0ddc8)" }}>
                  Gestionați Consimțământul pentru Cookie-uri
                </h2>
                {managing && (
                  <button
                    onClick={() => setManaging(false)}
                    className="p-1 rounded-lg hover:bg-[#BC8157]/10 transition-colors"
                    style={{ color: "var(--text-40, rgba(240,221,200,0.4))" }}
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              <div className="px-5 py-4">
                {/* Intro text */}
                {!managing ? (
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-60, rgba(240,221,200,0.6))" }}>
                    Folosim cookie-uri pentru a optimiza funcționalitatea site-ului și a vă oferi cea mai bună experiență.
                    Puteți alege ce categorii de cookie-uri acceptați sau le puteți gestiona individual.
                  </p>
                ) : (
                  <>
                    <p className="text-xs leading-relaxed mb-1" style={{ color: "var(--text-60, rgba(240,221,200,0.6))" }}>
                      Alegeți tipurile de cookie-uri pe care le acceptați. Cookie-urile necesare sunt întotdeauna active,
                      deoarece sunt esențiale pentru funcționarea site-ului.
                    </p>

                    {/* Policy link */}
                    <div
                      className="flex items-center gap-1.5 text-xs mb-4 mt-2 p-2.5 rounded-xl"
                      style={{ background: "rgba(188,129,87,0.06)", color: "var(--text-50, rgba(240,221,200,0.5))" }}
                    >
                      <ShieldCheck size={12} className="text-[#BC8157] flex-shrink-0" />
                      <span>
                        Conform{" "}
                        <strong className="text-[#BC8157]">GDPR (Regulamentul (UE) 2016/679)</strong>
                        {" "}și Legii nr. 506/2004 privind prelucrarea datelor personale.
                      </span>
                    </div>

                    {/* Cookie categories */}
                    <div className="space-y-2 mb-4">
                      {COOKIE_CATEGORIES.map((cat) => {
                        const isOn = cat.required ? true : prefs[cat.key as "analytics" | "marketing"];
                        const isOpen = expanded === cat.key;
                        return (
                          <div
                            key={cat.key}
                            className="rounded-xl overflow-hidden"
                            style={{ border: "1px solid rgba(188,129,87,0.12)", background: "rgba(188,129,87,0.04)" }}
                          >
                            <div className="flex items-center gap-3 px-4 py-3">
                              <Toggle
                                checked={isOn}
                                disabled={cat.required}
                                onChange={(v) =>
                                  setPrefs((p) => ({ ...p, [cat.key]: v }))
                                }
                              />
                              <span className="flex-1 text-xs font-medium" style={{ color: "var(--text, #f0ddc8)" }}>
                                {cat.label}
                                {cat.required && (
                                  <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-md bg-[#BC8157]/15 text-[#BC8157]">
                                    Întotdeauna activ
                                  </span>
                                )}
                              </span>
                              <button
                                onClick={() => setExpanded(isOpen ? null : cat.key)}
                                className="p-1 rounded-lg hover:bg-[#BC8157]/10 transition-colors"
                                style={{ color: "var(--text-40, rgba(240,221,200,0.4))" }}
                              >
                                {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                              </button>
                            </div>
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <p
                                    className="px-4 pb-3 text-xs leading-relaxed"
                                    style={{ color: "var(--text-50, rgba(240,221,200,0.5))" }}
                                  >
                                    {cat.description}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* Actions */}
                <div className={`flex gap-2 ${managing ? "flex-col sm:flex-row" : "flex-col"}`}>
                  <button
                    onClick={acceptAll}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-[#BC8157] hover:bg-[#9a6540] text-white transition-colors"
                  >
                    Acceptă tot
                  </button>
                  {managing ? (
                    <>
                      <button
                        onClick={savePrefs}
                        className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-colors border"
                        style={{
                          color: "var(--text, #f0ddc8)",
                          borderColor: "rgba(188,129,87,0.3)",
                          background: "rgba(188,129,87,0.08)",
                        }}
                      >
                        Salvează preferințele
                      </button>
                      <button
                        onClick={rejectAll}
                        className="flex-1 py-2.5 rounded-xl text-xs font-medium transition-colors"
                        style={{ color: "var(--text-50, rgba(240,221,200,0.5))" }}
                      >
                        Respinge tot
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={rejectAll}
                        className="flex-1 py-2.5 rounded-xl text-xs font-medium transition-colors border"
                        style={{
                          color: "var(--text-60, rgba(240,221,200,0.6))",
                          borderColor: "rgba(188,129,87,0.15)",
                        }}
                      >
                        Respinge tot
                      </button>
                      <button
                        onClick={() => setManaging(true)}
                        className="flex-1 py-2.5 rounded-xl text-xs font-medium transition-colors"
                        style={{ color: "var(--text-40, rgba(240,221,200,0.4))" }}
                      >
                        Gestionați preferințele
                      </button>
                    </>
                  )}
                </div>

                {/* Footer note */}
                <p className="text-[10px] text-center mt-3" style={{ color: "var(--text-30, rgba(240,221,200,0.3))" }}>
                  Puteți modifica preferințele oricând din{" "}
                  <button
                    onClick={() => { setManaging(true); }}
                    className="underline hover:text-[#BC8157] transition-colors"
                  >
                    setările de confidențialitate
                  </button>
                  .
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
