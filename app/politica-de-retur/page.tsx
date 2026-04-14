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
              <h2 className="font-display text-2xl">Capitolul I – Dispoziții generale</h2>
            </div>
            <div className="space-y-5 text-sm leading-relaxed" style={{ color: "var(--text-70)" }}>
              <div>
                <p className="font-semibold mb-2" style={{ color: "var(--text)" }}>Înțelesul unor termeni</p>
                <p>Termenii cu majuscule folosiți în continuare, dacă nu rezultă altfel din context, au înțelesul prevăzut în Termenii și Condițiile – AMERICAN BITE S.R.L.</p>
              </div>
              <div>
                <p className="font-semibold mb-2" style={{ color: "var(--text)" }}>Completarea Politicii de retur</p>
                <p className="mb-3">În urma achiziționării Produselor comercializate de Societate, prin intermediul Website-ului, între Dumneavoastră și Societate se încheie un Contract la distanță. Conținutul acestui Contract la distanță este prevăzut de Termenii și Condițiile AMERICAN BITE S.R.L. împreună cu dispozițiile legale ce se aplică în completare, de Politicile GDPR și de prezenta Politică de retur.</p>
                <p>Politica de retur prevede, în continuare, condițiile în care puteți beneficia de dreptul de a returna Produsele, urmând a vă fi rambursate sumele achitate cu ocazia achiziției.</p>
              </div>
            </div>
          </div>

          {/* Capitolul II */}
          <div className="card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#BC8157]/15 flex items-center justify-center">
                <RotateCcw size={18} className="text-[#D4956A]" />
              </div>
              <h2 className="font-display text-2xl">Capitolul II – Dreptul de retragere din contract (dreptul de retur al Produselor) acordat Consumatorilor</h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-70)" }}>
              <p>În conformitate cu dispozițiile legale, dacă aveți calitatea de <strong style={{ color: "var(--text)" }}>Consumator</strong>, beneficiați de un drept de retragere din Contractul la distanță încheiat, fără a fi necesar să vă justificați în vreun fel decizia. Altfel spus, aveți posibilitatea de a returna Produsele achiziționate în urma încheierii Contractului la distanță, în condițiile descrise mai jos, fără a fi necesar să vă justificați decizia, urmând ca Societatea să vă restituie sumele de bani achitate cu titlu de preț. Dispozițiile legale conținute în art. 9 alin. 1 din O.U.G. nr. 34/2014 prevăd următoarele: „Cu excepția cazurilor prevăzute la art. 16, consumatorul beneficiază de o perioadă de <strong style={{ color: "var(--text)" }}>14 zile</strong> pentru a se retrage dintr-un contract la distanță sau dintr-un contract în afara spațiilor comerciale, fără a fi nevoit să justifice decizia de retragere și fără a suporta alte costuri decât cele prevăzute la art. 13 alin. (3) și la art. 14".</p>
              <p>Dreptul de retur nu este acordat Agenților Economici.</p>
            </div>
          </div>

          {/* Capitolul III */}
          <div className="card rounded-3xl p-8 border border-amber-500/20" style={{ background: "rgba(188,129,87,0.05)" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 flex items-center justify-center">
                <AlertCircle size={18} className="text-amber-500" />
              </div>
              <h2 className="font-display text-2xl">Capitolul III – Lipsa/Încetarea/Pierderea dreptului de retragere din Contractul la distanță (dreptului de retur)</h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-70)" }}>
              <p>În conformitate cu dispozițiile legale, nu beneficiați de dreptul de retragere din Contractul la distanță (dreptul de retur la Produselor) în cazurile prevăzute de art. 16 din O.U.G. nr. 34/2014, în special în următoarele situații:</p>
              <ul className="space-y-2 pl-4">
                <li>– În cazul în care achiziționați Produse susceptibile a se deteriora sau a expira rapid;</li>
                <li>– În cazul în care ați achiziționat Produse sigilate, iar acestea au fost desigilate de Dumneavoastră și astfel nu mai pot fi returnate din motive de protecție a sănătății sau din motive de igienă;</li>
                <li>– În cazul în care achiziționați Produse confecționate după specificațiile prezentate de Dvs. sau personalizate în mod clar.</li>
              </ul>
              <p>Dacă unul din Produsele achiziționate intră în categoria menționată mai sus, atunci nu mai puteți returna Produsul în cauză.</p>
              <p>Astfel, înțelegeți și acceptați că în măsura în care Produsul comandat are un termen de valabilitate redus sau este susceptibil de deteriorare rapidă datorită naturii acestuia (cum sunt de exemplu: gogoșile artizanale), nu veți putea returna Produsul comandat, această situație fiind exceptată de la acordarea dreptului de retur, conform dispozițiilor legale.</p>
              <p>De asemenea, în măsura în care ați comandat un Produs sigilat, înțelegeți și acceptați, în mod expres, că acesta nu mai poate fi returnat în situația în care Produsul a fost desigilat, iar măsura se impune din motive de protecție a sănătății sau din motive de igienă.</p>
              <p>Totodată, în măsura în care Produsul comandat a fost realizat conform specificațiilor dorite de Dvs. sau personalizat în mod clar, înțelegeți și acceptați, în mod expres, că acesta nu mai poate fi returnat, având în vedere dispozițiile legale aplicabile.</p>
            </div>
          </div>

          {/* Alte informații */}
          <div className="card rounded-3xl p-8">
            <h3 className="font-display text-2xl mb-5">Alte informații</h3>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--text-70)" }}>
              <p><strong style={{ color: "var(--text)" }}>10.</strong> În măsura în care aveți nevoie de alte informații cu privire la Politica de retur, vă rugăm să ne scrieți la coordonatele indicate pentru contact sau la adresa: <a href="mailto:contact@donutstudio.ro" className="text-[#BC8157] hover:text-[#9a6540] transition-colors">contact@donutstudio.ro</a>.</p>
              <p><strong style={{ color: "var(--text)" }}>11.</strong> Societatea își rezervă dreptul de a modifica Politica de retur după cum consideră necesar. În măsura în care, după efectuarea acestor modificări, nu sunteți de acord cu noul conținut, vă rugăm să nu mai utilizați Website-ul sau Produsele Societății.</p>
              <p><strong style={{ color: "var(--text)" }}>12.</strong> Această Politică de retur a fost actualizată la data de <strong style={{ color: "var(--text)" }}>11.08.2024</strong>.</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
