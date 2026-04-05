import { RotateCcw, AlertCircle, Mail } from "lucide-react";

export const metadata = {
  title: "Politica de retur – Donut Studio",
  description: "Politica de retur AMERICAN BITE S.R.L. — condiții și excepții privind returnarea produselor.",
};

export default function PoliticaDeRetur() {
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
            ✦ AMERICAN BITE S.R.L.
          </span>
          <h1 className="font-display text-5xl lg:text-6xl leading-tight mb-4">
            Politica de retur
          </h1>
          <p className="text-lg max-w-xl" style={{ color: "var(--text-60)" }}>
            Condiții privind dreptul de retragere din contract și returnarea produselor.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-base py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          {/* Capitolul I */}
          <div className="card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#BC8157]/15 flex items-center justify-center">
                <RotateCcw size={18} className="text-[#D4956A]" />
              </div>
              <h2 className="font-display text-2xl">Cap. I – Dispoziții generale</h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-70)" }}>
              <p>Termenii cu majuscule folosiți, dacă nu rezultă altfel din context, au înțelesul prevăzut în Termenii și Condițiile AMERICAN BITE S.R.L.</p>
              <p>În urma achiziționării produselor comercializate de Societate prin intermediul website-ului, între Dumneavoastră și Societate se încheie un Contract la distanță. Politica de retur prevede condițiile în care puteți beneficia de dreptul de a returna produsele, urmând a vă fi rambursate sumele achitate.</p>
            </div>
          </div>

          {/* Capitolul II */}
          <div className="card rounded-3xl p-8">
            <h2 className="font-display text-2xl mb-5">Cap. II – Dreptul de retragere (Consumatori)</h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-70)" }}>
              <p>În conformitate cu dispozițiile legale, dacă aveți calitatea de <strong style={{ color: "var(--text)" }}>Consumator</strong>, beneficiați de un drept de retragere din Contractul la distanță, fără a fi necesar să vă justificați decizia.</p>
              <p>Conform art. 9 alin. 1 din O.U.G. nr. 34/2014: <em>„Cu excepția cazurilor prevăzute la art. 16, consumatorul beneficiază de o perioadă de <strong style={{ color: "var(--text)" }}>14 zile</strong> pentru a se retrage dintr-un contract la distanță, fără a fi nevoit să justifice decizia de retragere și fără a suporta alte costuri."</em></p>
              <p style={{ color: "var(--text-50)" }}>Dreptul de retur nu este acordat Agenților Economici.</p>
            </div>
          </div>

          {/* Capitolul III — excepții */}
          <div className="card rounded-3xl p-8 border border-amber-500/20" style={{ background: "rgba(188,129,87,0.05)" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 flex items-center justify-center">
                <AlertCircle size={18} className="text-amber-500" />
              </div>
              <h2 className="font-display text-2xl">Cap. III – Excepții de la dreptul de retur</h2>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-70)" }}>
              Nu beneficiați de dreptul de retragere în următoarele situații (art. 16 din O.U.G. nr. 34/2014):
            </p>
            <ul className="space-y-3">
              {[
                "Produse susceptibile a se deteriora sau a expira rapid (ex: gogoșile artizanale).",
                "Produse sigilate desigilate de Dumneavoastră, care nu pot fi returnate din motive de igienă.",
                "Produse confecționate după specificațiile prezentate de Dvs. sau personalizate în mod clar.",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-70)" }}>
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-600 text-xs font-bold">{i + 1}</span>
                  </div>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Alte informații */}
          <div className="card rounded-3xl p-6">
            <h3 className="font-semibold mb-3 text-sm">Alte informații</h3>
            <div className="space-y-2 text-sm leading-relaxed" style={{ color: "var(--text-60)" }}>
              <p>Societatea își rezervă dreptul de a modifica Politica de retur după cum consideră necesar.</p>
              <p>Această Politică de retur a fost actualizată la data de <strong style={{ color: "var(--text)" }}>11.08.2024</strong>.</p>
            </div>
            <a href="mailto:contact@donutstudio.ro"
              className="inline-flex items-center gap-2 mt-4 text-[#BC8157] text-sm font-medium hover:text-[#9a6540] transition-colors">
              <Mail size={14} /> contact@donutstudio.ro
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
