"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, Award, Heart, Clock, ArrowRight, Quote, Star } from "lucide-react";

const values = [
  {
    icon: Clock,
    title: "Timp și răbdare",
    desc: "Credem că cele mai gustoase produse sunt cele cărora le oferi timp și răbdare să se dezvolte natural. Nu grăbim niciun proces.",
  },
  {
    icon: Leaf,
    title: "Ingrediente simple, premium",
    desc: "Lapte, ouă, unt, făină, zahăr — ingrediente de bază, dar de cea mai înaltă calitate, combinate cu glazuri premium.",
  },
  {
    icon: Award,
    title: "Experiență internațională",
    desc: "Ne-am inspirat din cele mai prestigioase cofetării de donuți din lume, adaptând rețete din culturi diferite.",
  },
  {
    icon: Heart,
    title: "Bucuria clientului",
    desc: "Satisfacția ta este raison d'être-ul nostru. Fiecare gogoașă este creată cu gândul la zâmbetul pe care îl va aduce.",
  },
];

const timeline = [
  {
    year: "2018",
    title: "Începuturile",
    desc: "Donut Studio s-a născut dintr-o pasiune sinceră pentru cofetăria artizanală. Primele rețete, primele arome, prima locație.",
  },
  {
    year: "2019",
    title: "Primele 5 arome",
    desc: "Am lansat primele 5 arome signature — Double Chocolate, Vanillian, Oreo Dream și altele care au devenit bestsellere instantaneu.",
  },
  {
    year: "2021",
    title: "Extinderea meniului",
    desc: "Am adăugat noi arome fructate și premium, ajungând la 13 varietăți artizanale. Fiecare nouă aromă — o nouă aventură.",
  },
  {
    year: "2023",
    title: "Evenimente & Catering",
    desc: "Am lansat serviciul de Donut Bar pentru evenimente — nunți, botezuri, corporate events. Succes imediat și recenzii 5 stele.",
  },
  {
    year: "2024",
    title: "Azi",
    desc: "Continuăm să aducem savoare în viețile oamenilor, cu aceeași pasiune și grijă pentru calitate cu care am început.",
  },
];

const donutGrid = [
  "https://www.donutstudio.ro/wp-content/uploads/2024/07/Double-Chocolate.webp",
  "https://www.donutstudio.ro/wp-content/uploads/2024/07/Pistachious.webp",
  "https://www.donutstudio.ro/wp-content/uploads/2024/07/Oreo-Dream.webp",
  "https://www.donutstudio.ro/wp-content/uploads/2024/07/Caramel-Dash.webp",
  "https://www.donutstudio.ro/wp-content/uploads/2021/08/Raspberry-Blast.webp",
  "https://www.donutstudio.ro/wp-content/uploads/2024/07/Orange-Blossom.webp",
];

const reviews = [
  {
    name: "Velcz Gabriela",
    text: "Livrare promptă, produs proaspăt, ambalaj îngrijit. Recomand cu toată inima!",
    stars: 5,
  },
  {
    name: "Delia Tamara Motoca",
    text: "Cei mai buni donuți pe care i-am gustat vreodată. Echipă profesionistă și dedicată.",
    stars: 5,
  },
  {
    name: "Domniță Ralu",
    text: "Proaspeți, aromați, au ridicat nivelul evenimentului nostru. 10 din 10!",
    stars: 5,
  },
];

export default function PovesteaClient() {
  return (
    <div className="min-h-screen text-[#14090a]">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="section-dark relative overflow-hidden min-h-screen flex items-center">
        {/* Rotational ring decoration */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none hidden lg:block">
          <div className="w-full h-full rounded-full border border-[#BC8157]/10 animate-spin-slow" />
          <div className="absolute inset-8 rounded-full border border-[#BC8157]/15" style={{ animation: "spin-slow 14s linear infinite reverse" }} />
          <div className="absolute inset-20 rounded-full border border-[#BC8157]/20" style={{ animation: "spin-slow 8s linear infinite" }} />
        </div>

        {/* Large faded donut image right side */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 hidden lg:block">
          <Image
            src="https://www.donutstudio.ro/wp-content/uploads/2024/07/Double-Chocolate.webp"
            alt=""
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#14090a] to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#BC8157]/20 text-[#D4956A] px-4 py-1.5 rounded-full text-sm font-medium mb-8 border border-[#BC8157]/30"
          >
            ✦ Artisanal Pastry · București, din 2018
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-8xl text-white leading-none mb-8 max-w-2xl"
          >
            Povestea
            <br />
            <span className="text-[#D4956A]">noastră</span>
            {/* SCHIMBAT: text-[#BC8157] → text-[#D4956A] */}
          </motion.h1>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="max-w-xl"
          >
            <Quote size={28} className="text-[#D4956A]/70 mb-3" />
            {/* SCHIMBAT: /50 → /70 — mai vizibil */}
            <p className="text-white/90 text-xl italic leading-relaxed">
              {/* SCHIMBAT: text-white/70 → text-white/90 — mult mai lizibil pe dark */}
              Credem că cele mai gustoase produse sunt cele cărora le oferi
              timp și răbdare să se dezvolte natural.
            </p>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-[#BC8157] hover:bg-[#9a6540] text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-xl hover:shadow-[#BC8157]/30 hover:-translate-y-0.5"
            >
              Descoperă aromele
              <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────────── */}
      <section className="section-light py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[#9A6540] text-sm font-medium uppercase tracking-widest mb-4">
                Cine suntem
              </p>
              <h2 className="font-display text-4xl lg:text-5xl text-[#E8C9A0] mb-7 leading-tight">
                Pasiune pentru
                <br />
                <span className="text-[#9A6540]">artizanat autentic</span>
              </h2>
              <div className="space-y-4 text-[#F5E6D3] leading-relaxed">
                <p>
                  Donut Studio s-a născut dintr-o pasiune autentică pentru
                  cofetărie artizanală. Ne-am dorit să aducem în București gogoși
                  cu adevărat speciale — nu doar dulciuri, ci experiențe complete.
                </p>
                <p>
                  Am adunat experiență de la cele mai prestigioase cofetării de
                  donuți din lume și am combinat-o cu rețete din culturi diferite,
                  creând un concept unic în România.
                </p>
                <p>
                  Ingredientele noastre sunt simple: lapte, ouă, unt, făină,
                  zahăr — dar de cea mai înaltă calitate. Secretul stă în procesul
                  manual, în răbdare și în glazurile premium care fac diferența.
                </p>
              </div>
            </motion.div>

            {/* Grid imagini */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-3"
            >
              {donutGrid.map((src, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  className={`rounded-2xl overflow-hidden shadow-md ${i === 0 ? "col-span-2 row-span-1" : ""}`}
                  style={{ aspectRatio: i === 0 ? "2/1" : "1/1" }}
                >
                  <Image
                    src={src}
                    alt=""
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────── */}
      <section className="section-dark py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#D4956A] text-sm font-medium uppercase tracking-widest mb-3">
              {/* SCHIMBAT: text-[#BC8157] → text-[#D4956A] — mai luminos pe dark */}
              Valorile noastre
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-white">
              Ce ne definește
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-dark rounded-3xl p-7 group hover:border-[#BC8157]/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#BC8157]/15 flex items-center justify-center mb-5 group-hover:bg-[#BC8157]/25 transition-colors">
                  <v.icon size={22} className="text-[#D4956A]" />
                  {/* SCHIMBAT: text-[#BC8157] → text-[#D4956A] */}
                </div>
                <h3 className="font-semibold text-white mb-3">{v.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{v.desc}</p>
                {/* SCHIMBAT: text-white/55 → text-white/80 — DIFERENȚA MAJORĂ, mult mai lizibil */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────── */}
      <section className="section-light py-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#9A6540] text-sm font-medium uppercase tracking-widest mb-3">
              {/* SCHIMBAT: text-[#BC8157] → text-[#9A6540] */}
              Drumul nostru
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-[#E8C9A0]">
              Fiecare an,<br />
              <span className="text-[#9A6540]">un nou capitol</span>
              {/* SCHIMBAT: text-[#BC8157] → text-[#9A6540] */}
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-[#BC8157]/20 lg:-translate-x-1/2" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex gap-8 lg:gap-0 ${
                    i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 pl-16 lg:pl-0 ${i % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                    <div className="card-light rounded-3xl p-7">
                      <span className="font-display text-4xl text-[#9A6540] block mb-2">{item.year}</span>
                      {/* SCHIMBAT: text-[#BC8157] → text-[#9A6540] */}
                      <h3 className="font-semibold text-[#14090a] text-lg mb-2">{item.title}</h3>
                      <p className="text-[#F5E6D3] text-sm leading-relaxed">{item.desc}</p>
                      {/* SCHIMBAT: text-[#14090a]/60 → text-[#3D1F12] — contrast WCAG AA compliant */}
                    </div>
                  </div>

                  {/* Dot — mobile left, desktop center */}
                  <div className="absolute left-8 lg:left-1/2 top-8 w-4 h-4 rounded-full bg-[#BC8157] lg:-translate-x-1/2 border-4 border-[#f5ede3] shadow-md" />

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ─────────────────────────────────────────── */}
      <section className="section-warm py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full border border-[#BC8157] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full border border-[#BC8157] translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <p className="text-[#D4956A] text-sm font-medium uppercase tracking-widest mb-3">
              {/* SCHIMBAT: text-[#BC8157] → text-[#D4956A] */}
              Testimoniale
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-white">
              Ce spun <span className="text-[#D4956A]">clienții</span>
              {/* SCHIMBAT: text-[#BC8157] → text-[#D4956A] */}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="card-dark rounded-3xl p-7"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <Quote size={20} className="text-[#D4956A]/60 mb-3" />
                {/* SCHIMBAT: /40 → /60 */}
                <p className="text-white/90 text-sm leading-relaxed mb-5 italic">{r.text}</p>
                {/* SCHIMBAT: text-white/70 → text-white/90 — DIFERENȚA MAJORĂ */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#BC8157] flex items-center justify-center text-white text-sm font-bold">
                    {r.name[0]}
                  </div>
                  <p className="font-semibold text-sm text-white">{r.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
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
            Fă parte din povestea noastră
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/90 text-lg mb-10"
          >
            Descoperă toate aromele noastre artizanale și comandă acum — sau
            vizitează-ne la Piața Victoriei, București.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 bg-[#14090a] text-white hover:bg-[#2a1506] px-8 py-4 rounded-full font-semibold transition-all"
            >
              Explorează meniul
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/evenimente"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white hover:border-white px-8 py-4 rounded-full font-semibold transition-all"
              // SCHIMBAT: border-white/30 → border-white/50 — mai vizibil
            >
              Evenimente
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}