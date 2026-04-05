"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ArrowRight,
  Globe,
  Share2,
  CheckCircle2,
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Adresă",
    value: "Piața Victoriei, București",
    sub: "Sector 1, București",
    href: "https://maps.google.com",
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+40 721 000 000",
    sub: "Luni–Duminică, 09:00–20:00",
    href: "tel:+40721000000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "ene.cdr@gmail.com",
    sub: "Răspundem în max. 24h",
    href: "mailto:ene.cdr@gmail.com",
  },
  {
    icon: Clock,
    label: "Program",
    value: "09:00 – 20:00",
    sub: "Luni — Duminică",
    href: null,
  },
];

const socials = [
  {
    icon: Globe,
    label: "Instagram",
    handle: "@donutstudio.ro",
    href: "https://instagram.com",
  },
  {
    icon: Share2,
    label: "Facebook",
    handle: "Donut Studio",
    href: "https://facebook.com",
  },
];

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="min-h-screen text-[#f0ddc8]">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="section-dark relative overflow-hidden min-h-[55vh] flex items-end pb-20">
        {/* Decorative rings */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none hidden lg:block opacity-30">
          <div className="w-full h-full rounded-full border border-[#BC8157]/15 animate-spin-slow" />
          <div className="absolute inset-12 rounded-full border border-[#BC8157]/20" style={{ animation: "spin-slow 14s linear infinite reverse" }} />
          <div className="absolute inset-28 rounded-full border border-[#BC8157]/25" style={{ animation: "spin-slow 8s linear infinite" }} />
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0d0502] to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 w-full">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#BC8157]/20 text-[#D4956A] px-4 py-1.5 rounded-full text-sm font-medium mb-8 border border-[#BC8157]/30"
          >
            ✦ Suntem aici pentru tine
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-8xl text-white leading-none mb-6 max-w-2xl"
          >
            Hai să
            <br />
            <span className="text-[#D4956A]">vorbim</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="text-white/75 text-lg max-w-lg leading-relaxed"
          >
            Ai o întrebare, o comandă specială sau vrei să colaborăm?
            Scrie-ne și te contactăm în cel mai scurt timp.
          </motion.p>
        </div>
      </section>

      {/* ── CONTACT INFO CARDS ───────────────────────────────── */}
      <section className="section-base py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group block card rounded-3xl p-6 hover:border-[#BC8157]/40 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#BC8157]/10"
                  >
                    <CardInner item={item} />
                  </a>
                ) : (
                  <div className="card rounded-3xl p-6">
                    <CardInner item={item} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + MAP ───────────────────────────────────────── */}
      <section className="section-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <p className="text-[#D4956A] text-sm font-medium uppercase tracking-widest mb-3">
                Trimite-ne un mesaj
              </p>
              <h2 className="font-display text-4xl lg:text-5xl text-white mb-10 leading-tight">
                Scrie-ne
                <br />
                <span className="text-[#D4956A]">oricând</span>
              </h2>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card rounded-3xl p-10 text-center"
                >
                  <CheckCircle2 size={52} className="text-[#BC8157] mx-auto mb-5" />
                  <h3 className="font-display text-3xl text-white mb-3">Mesaj trimis!</h3>
                  <p className="text-white/75 leading-relaxed">
                    Mulțumim că ai luat legătura cu noi. Te vom contacta în cel mai scurt timp.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-8 inline-flex items-center gap-2 text-[#D4956A] hover:text-[#BC8157] text-sm font-medium transition-colors"
                  >
                    Trimite alt mesaj <ArrowRight size={15} />
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-[#f0ddc8]/60 mb-2 font-medium">Nume complet</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Ion Popescu"
                        className="input-dark w-full rounded-2xl px-5 py-3.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#f0ddc8]/60 mb-2 font-medium">Email</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="ion@email.com"
                        className="input-dark w-full rounded-2xl px-5 py-3.5 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#f0ddc8]/60 mb-2 font-medium">Subiect</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="input-dark w-full rounded-2xl px-5 py-3.5 text-sm appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Selectează subiectul</option>
                      <option value="comanda">Comandă specială</option>
                      <option value="eveniment">Eveniment / Catering</option>
                      <option value="colaborare">Colaborare / Parteneriat</option>
                      <option value="feedback">Feedback</option>
                      <option value="altele">Altele</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-[#f0ddc8]/60 mb-2 font-medium">Mesaj</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Spune-ne cum te putem ajuta..."
                      className="input-dark w-full rounded-2xl px-5 py-3.5 text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-3 bg-[#BC8157] hover:bg-[#9a6540] text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-xl hover:shadow-[#BC8157]/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Se trimite...
                      </>
                    ) : (
                      <>
                        Trimite mesajul
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Side info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Map placeholder */}
              <div className="card rounded-3xl overflow-hidden aspect-[4/3] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2847.7!2d26.0852!3d44.4534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b201ff9eb42c6b%3A0x2a3c9d843f3f0b0!2sPia%C8%9Ba+Victoriei%2C+Bucure%C8%99ti!5e0!3m2!1sro!2sro!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.7) brightness(0.85)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Donut Studio locație"
                  className="absolute inset-0"
                />
              </div>

              {/* Social */}
              <div className="card rounded-3xl p-7">
                <p className="text-[#D4956A] text-xs font-medium uppercase tracking-widest mb-5">
                  Social media
                </p>
                <div className="space-y-4">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 text-[#f0ddc8]/70 hover:text-[#D4956A] transition-colors"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-[#BC8157]/15 group-hover:bg-[#BC8157]/25 flex items-center justify-center transition-colors flex-shrink-0">
                        <s.icon size={18} className="text-[#D4956A]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white group-hover:text-[#D4956A] transition-colors">{s.label}</p>
                        <p className="text-xs text-[#f0ddc8]/50">{s.handle}</p>
                      </div>
                      <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────────── */}
      <section className="section-brand py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/8 animate-spin-slow" />
          <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-black/10" />
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl lg:text-5xl text-white mb-5 leading-tight"
          >
            Pregătit să guști ceva special?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/90 text-lg mb-10"
          >
            Explorează aromele noastre artizanale sau rezervă un Donut Bar
            pentru evenimentul tău.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/menu"
              className="inline-flex items-center justify-center gap-2 bg-[#14090a] text-white hover:bg-[#2a1506] px-8 py-4 rounded-full font-semibold transition-all"
            >
              Explorează meniul <ArrowRight size={17} />
            </a>
            <a
              href="/evenimente"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white hover:border-white px-8 py-4 rounded-full font-semibold transition-all"
            >
              Evenimente
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

function CardInner({ item }: { item: typeof contactInfo[0] }) {
  return (
    <>
      <div className="w-11 h-11 rounded-2xl bg-[#BC8157]/15 flex items-center justify-center mb-5 group-hover:bg-[#BC8157]/25 transition-colors">
        <item.icon size={20} className="text-[#D4956A]" />
      </div>
      <p className="text-[#f0ddc8]/50 text-xs font-medium uppercase tracking-widest mb-1">{item.label}</p>
      <p className="text-white font-semibold text-sm leading-snug mb-1">{item.value}</p>
      <p className="text-[#f0ddc8]/50 text-xs">{item.sub}</p>
    </>
  );
}
