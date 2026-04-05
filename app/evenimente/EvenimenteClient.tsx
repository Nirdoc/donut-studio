"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart, Building2, Baby, Cake, MapPin, Phone, Mail,
  ArrowRight, Check, Star
} from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Nunți",
    desc: "Transformă masa dulce a nunții tale într-un moment iconic. Donut wall-ul nostru devine centrul atenției — eleganță pură, gust de neuitat.",
    image: "https://www.donutstudio.ro/wp-content/uploads/2024/07/Caramel-Dash.webp",
    color: "from-rose-900/80 to-rose-950/90",
  },
  {
    icon: Baby,
    title: "Botezuri",
    desc: "Celebrează cele mai duioase momente cu aranjamente delicate de mini-gogoși, croite după culorile și tema botezului.",
    image: "https://www.donutstudio.ro/wp-content/uploads/2024/07/Blueberry-Rush-1.webp",
    color: "from-sky-900/80 to-sky-950/90",
  },
  {
    icon: Cake,
    title: "Zile de naștere",
    desc: "Renunță la tortul clasic. Un donut wall personalizat este cadoul perfect — surprinzător, delicios, fotogenic.",
    image: "https://www.donutstudio.ro/wp-content/uploads/2024/07/Oreo-Dream.webp",
    color: "from-violet-900/80 to-violet-950/90",
  },
  {
    icon: Building2,
    title: "Corporate Events",
    desc: "Impresionează-ți colegii și partenerii cu cutii de mini-gogoși asortate — ideale pentru conferințe, team-buildinguri sau lansări.",
    image: "https://www.donutstudio.ro/wp-content/uploads/2024/07/Coffeelicious.webp",
    color: "from-stone-900/80 to-stone-950/90",
  },
];

const features = [
  "Gogoși proaspete, coapte în ziua evenimentului",
  "13 arome artizanale disponibile",
  "Donut wall decorativ inclus (la cerere)",
  "Personalizare după culorile evenimentului",
  "Livrare în raza de 250 km",
  "Asistență și consultanță gratuită",
];

const reviews = [
  {
    name: "Velcz Gabriela",
    text: "Livrare promptă, produs proaspăt, ambalaj îngrijit. Am comandat pentru botezul fiicei mele și toți invitații au fost entuziasmați!",
    stars: 5,
  },
  {
    name: "Delia Tamara Motoca",
    text: "Echipă profesionistă! Donut wall-ul de la nunta noastră a fost spectaculos. Cei mai buni donuți pe care i-am gustat vreodată.",
    stars: 5,
  },
  {
    name: "Domniță Ralu",
    text: "Proaspeți, aromați, au ridicat nivelul evenimentului nostru. Note 10 din 10, recomand cu toată inima!",
    stars: 5,
  },
];

const donutImages = [
  "https://www.donutstudio.ro/wp-content/uploads/2024/07/Double-Chocolate.webp",
  "https://www.donutstudio.ro/wp-content/uploads/2024/07/Pistachious.webp",
  "https://www.donutstudio.ro/wp-content/uploads/2024/07/Almond-Famous-1.webp",
  "https://www.donutstudio.ro/wp-content/uploads/2024/07/Honey-Buzz.webp",
  "https://www.donutstudio.ro/wp-content/uploads/2024/07/Orange-Blossom.webp",
  "https://www.donutstudio.ro/wp-content/uploads/2024/07/Banana-Fantasy.webp",
  "https://www.donutstudio.ro/wp-content/uploads/2024/07/Coco-Naughty.webp",
  "https://www.donutstudio.ro/wp-content/uploads/2024/07/Vanillian.webp",
];

export default function EvenimenteClient() {
  return (
    <div className="min-h-screen text-[#14090a]">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="section-dark relative min-h-[90vh] flex items-end overflow-hidden">
        {/* Background mosaic */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-0 opacity-25">
          {donutImages.map((src, i) => (
            <div key={i} className="relative overflow-hidden">
              <Image src={src} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14090a] via-[#14090a]/70 to-[#14090a]/30" />

        {/* Floating ring */}
        <div className="absolute top-1/4 right-10 w-64 h-64 rounded-full border border-[#BC8157]/20 animate-spin-slow pointer-events-none hidden lg:block" />
        <div className="absolute top-1/4 right-10 w-80 h-80 rounded-full border border-[#BC8157]/10 animate-spin-slow pointer-events-none hidden lg:block" style={{ animationDuration: "30s", animationDirection: "reverse" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-40">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/50 text-white/ px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20"
          >
            ✦ Servicii evenimente
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-8xl text-white leading-none mb-6 max-w-3xl"
          >
            Donut Bar
            <br />
            <span className="text-[#BC8157]">pentru evenimentul</span>
            <br />
            tău
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="!text-white opacity-65 text-lg max-w-xl leading-relaxed mb-10"
          >
            Transformăm orice eveniment într-o experiență de neuitat prin
            gogoși artizanale premium, prezentare elegantă și servicii
            personalizate.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="tel:0745018888"
              className="inline-flex items-center gap-2 bg-[#BC8157] hover:bg-[#9a6540] text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-xl hover:shadow-[#BC8157]/30 hover:-translate-y-0.5"
            >
              <Phone size={17} />
              Cere ofertă acum
            </a>
            <a
              href="mailto:contact@donutstudio.ro"
              className="inline-flex items-center gap-2 border border-white/30 text-white/80 hover:border-[#BC8157] hover:text-[#BC8157] px-8 py-4 rounded-full font-semibold transition-all"
            >
              <Mail size={17} />
              Trimite email
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ──────────────────────────────────────── */}
      <div className="section-brand py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-white/80 text-sm font-medium flex items-center gap-4">
              ✦ Nunți &nbsp;·&nbsp; Botezuri &nbsp;·&nbsp; Zile de naștere &nbsp;·&nbsp; Corporate Events &nbsp;·&nbsp; Donut Wall
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section className="section-light py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#BC8157] text-sm font-medium uppercase tracking-widest mb-3">Ce oferim</p>
            <h2 className="font-display text-4xl lg:text-6xl text-[var(--text)]">
              Perfecte pentru
              <br />
              <span className="text-[#9A6540]">orice ocazie</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${s.color} opacity-80 group-hover:opacity-90 transition-opacity`} />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="w-11 h-11 rounded-2xl bg-[#BC8157] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <s.icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-display text-3xl mb-2" style={{ color: "white" }}>{s.title}</h3>
                  <p style={{ color: "rgba(240,235,225,0.9)" }} className="text-sm leading-relaxed max-w-xs">
                    {s.desc}
                  </p>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                  <ArrowRight size={16} className="text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES SPLIT ───────────────────────────────────── */}
      <section className="section-dark py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                "https://www.donutstudio.ro/wp-content/uploads/2024/07/Almond-Famous-1.webp",
                "https://www.donutstudio.ro/wp-content/uploads/2024/07/Caramel-Dash.webp",
                "https://www.donutstudio.ro/wp-content/uploads/2024/07/Honey-Buzz.webp",
                "https://www.donutstudio.ro/wp-content/uploads/2024/07/Pistachious.webp",
              ].map((src, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className={`rounded-3xl overflow-hidden ${i === 0 ? "col-span-2 h-56" : "h-44"}`}
                >
                  <Image src={src} alt="" width={400} height={224} className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[#BC8157] text-sm font-medium uppercase tracking-widest mb-3">De ce noi?</p>
              <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">
                Tot ce ai nevoie
                <br />
                <span className="text-[#BC8157]">pentru un eveniment</span>
                <br />
                perfect
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                Combinăm gogoși artizanale premium cu o prezentare elegantă și
                un serviciu complet — de la consultanță până la montarea
                decorurilor la locație.
              </p>

              <ul className="space-y-3 mb-10">
                {features.map((f, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 text-[var(--text-80)] text-sm"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#BC8157] flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-white" />
                    </div>
                    {f}
                  </motion.li>
                ))}
              </ul>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#BC8157]/10 border border-[#BC8157]/20">
                <MapPin size={18} className="text-[#BC8157] flex-shrink-0" />
                <p className="text-white/70 text-sm">
                  Livrăm la evenimentul tău în <strong className="text-[var(--text)]">raza de 250 km</strong> față de București.
                  Costurile de transport variază în funcție de distanță.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ─────────────────────────────────────────── */}
      <section className="section-light py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#BC8157] text-sm font-medium uppercase tracking-widest mb-3">Testimoniale</p>
            <h2 className="font-display text-4xl lg:text-5xl text-[#E8C9A0]">
              Ce spun <span className="text-[#BC8157]">clienții noștri</span>
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
                className="card-light rounded-3xl p-7"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[#F5E6D3]/70 text-sm leading-relaxed mb-5 italic">
                  "{r.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#BC8157] flex items-center justify-center text-white text-sm font-bold">
                    {r.name[0]}
                  </div>
                  <p className="font-semibold text-sm text-[#F5E6D3]">{r.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="section-warm py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-2 border-[#BC8157] animate-spin-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#BC8157]" style={{ animation: "spin-slow 15s linear infinite reverse" }} />
        </div>

        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#BC8157] text-sm font-medium uppercase tracking-widest mb-4"
          >
            Hai să planificăm împreună
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl lg:text-6xl text-white mb-6 leading-tight"
          >
            Evenimentul tău
            <br />
            <span className="text-[#BC8157]">merită cel mai bun</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 mb-10"
          >
            Contactează-ne pentru o ofertă personalizată. Suntem disponibili
            luni–vineri, 11:00–19:00.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0745018888"
              className="inline-flex items-center justify-center gap-2 bg-[#BC8157] hover:bg-[#9a6540] text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-xl hover:shadow-[#BC8157]/30"
            >
              <Phone size={17} />
              0745 018 888
            </a>
            <a
              href="mailto:contact@donutstudio.ro"
              className="inline-flex items-center justify-center gap-2 border border-[var(--border-mid)] text-[var(--text-70)] hover:border-[#BC8157] hover:text-[#BC8157] px-8 py-4 rounded-full font-semibold transition-all"
            >
              <Mail size={17} />
              contact@donutstudio.ro
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
