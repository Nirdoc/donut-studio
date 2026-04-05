import { Banknote, CreditCard, ShieldCheck, Zap } from "lucide-react";

export const metadata = {
  title: "Modalități de plată – Donut Studio",
  description: "Opțiuni de plată disponibile la Donut Studio: numerar la livrare și plată cu cardul.",
};

export default function ModalitatiDePlata() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section-dark pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(188,129,87,0.3) 0%, transparent 70%)" }} />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-flex items-center gap-2 bg-[#BC8157]/20 text-[#D4956A] px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-[#BC8157]/30">
            ✦ Donut Studio
          </span>
          <h1 className="font-display text-5xl lg:text-6xl leading-tight mb-4">
            Modalități de plată
          </h1>
          <p className="text-lg max-w-xl" style={{ color: "var(--text-60)" }}>
            Opțiuni flexibile pentru o experiență de cumpărare fără bătăi de cap.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-base py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          {/* Numerar */}
          <div className="card rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#BC8157]/15 flex items-center justify-center">
                <Banknote size={22} className="text-[#D4956A]" />
              </div>
              <div>
                <h2 className="font-display text-2xl">Plata cu Numerar la Livrare</h2>
                <p className="text-sm" style={{ color: "var(--text-50)" }}>Control total, plată la primire</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-70)" }}>
              Dacă preferați să plătiți în numerar la primirea comenzii, vă oferim această opțiune pentru a vă asigura că aveți control total asupra plăților.
            </p>
            <ul className="space-y-2">
              {[
                "Plasați comanda online și selectați «Plata cu Numerar la Livrare».",
                "Plata se face în numerar direct curierului la momentul livrării.",
                "Asigurați-vă că aveți suma exactă pregătită pentru a facilita procesul.",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-70)" }}>
                  <div className="w-5 h-5 rounded-full bg-[#BC8157]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#D4956A] text-xs font-bold">{i + 1}</span>
                  </div>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Card */}
          <div className="card rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#BC8157]/15 flex items-center justify-center">
                <CreditCard size={22} className="text-[#D4956A]" />
              </div>
              <div>
                <h2 className="font-display text-2xl">Plata cu Cardul</h2>
                <p className="text-sm" style={{ color: "var(--text-50)" }}>Sigur, rapid, fără numerar</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-70)" }}>
              Optând pentru plata cu cardul, vă oferim o modalitate sigură și rapidă de a finaliza tranzacția online.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: "var(--surface)" }}>
                <ShieldCheck size={16} className="text-[#D4956A] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold mb-0.5">Securitate</p>
                  <p className="text-xs" style={{ color: "var(--text-55)" }}>Plăți protejate cu tehnologii de criptare.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: "var(--surface)" }}>
                <Zap size={16} className="text-[#D4956A] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold mb-0.5">Rapiditate</p>
                  <p className="text-xs" style={{ color: "var(--text-55)" }}>Finalizați comanda fără numerar sau rest.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="card rounded-3xl p-6">
            <h3 className="font-semibold mb-3 text-sm">Informații importante</h3>
            <ul className="space-y-2">
              {[
                "Pentru plata cu cardul, asigurați-vă că aveți cardul și detaliile de plată la îndemână.",
                "Costurile exacte vor fi afișate în timpul procesului de checkout în funcție de opțiunile selectate și locație.",
                "La Donut Studio ne străduim să vă oferim o experiență de cumpărare fără probleme.",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-60)" }}>
                  <span className="text-[#D4956A] mt-0.5">·</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
}
