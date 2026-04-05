import { Truck, Clock, Package, MapPin, Phone } from "lucide-react";

export const metadata = {
  title: "Politica de livrare – Donut Studio",
  description: "Informații despre livrarea comenzilor Donut Studio: program, zone de livrare și condiții.",
};

const items = [
  {
    icon: Clock,
    title: "Plasare comenzi",
    text: "Comenzile se plasează cu cel puțin o zi înaintea livrării — prin coșul de pe website, la 0745.018.888 (inclusiv WhatsApp) sau pe contact@donutstudio.ro.",
  },
  {
    icon: Truck,
    title: "Program livrări",
    text: "Livrăm de Luni până Duminică, în intervalul 08:00 – 22:00. Transportul este gratuit pentru București și județul Ilfov.",
  },
  {
    icon: Package,
    title: "Comandă minimă",
    text: "Comanda minimă este de 8 bucăți pentru București și 16 bucăți pentru județul Ilfov.",
  },
  {
    icon: MapPin,
    title: "Livrări în provincie",
    text: "Pentru evenimente în afara Bucureștiului, livrăm în limita a 250 km. Costul transportului variază în funcție de distanță și va fi comunicat în prealabil.",
  },
];

export default function PoliticaDeLivrare() {
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
            Politica de livrare
          </h1>
          <p className="text-lg max-w-xl" style={{ color: "var(--text-60)" }}>
            Tot ce trebuie să știi despre cum ajung gogoșile noastre la tine.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="section-base py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {items.map((item) => (
              <div key={item.title} className="card rounded-3xl p-6">
                <div className="w-10 h-10 rounded-2xl bg-[#BC8157]/15 flex items-center justify-center mb-4">
                  <item.icon size={18} className="text-[#D4956A]" />
                </div>
                <h3 className="font-semibold mb-2 text-sm">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-60)" }}>{item.text}</p>
              </div>
            ))}
          </div>

          {/* Full text */}
          <div className="card rounded-3xl p-8 space-y-5 text-sm leading-relaxed" style={{ color: "var(--text-70)" }}>
            <h2 className="font-display text-2xl mb-2">Detalii complete</h2>

            <p><strong style={{ color: "var(--text)" }}>1.1</strong> Comenzile se plasează cu cel puțin o zi înaintea livrării folosind una din următoarele variante: prin adăugarea produselor dorite în coșul de cumpărături și urmând instrucțiunile de pe website, la numărul de telefon 0745.018.888 sau prin WhatsApp, pe email contact@donutstudio.ro.</p>

            <p><strong style={{ color: "var(--text)" }}>1.2</strong> Livrările se fac de Luni până Duminică în intervalul orar 8:00 – 22:00, iar costul transportului este gratuit pentru București și județul Ilfov.</p>

            <p><strong style={{ color: "var(--text)" }}>1.3</strong> Comanda minimă este de 8 bucăți pentru București și 16 bucăți pentru județul Ilfov.</p>

            <p><strong style={{ color: "var(--text)" }}>1.4</strong> Pentru evenimente în provincie, livrările se fac în limita a 250 km și în funcție de cantitatea comandată. Costul transportului va varia în funcție de distanță și urmează să vă fie comunicat în prealabil. Pentru mai multe detalii ne puteți contacta prin email, telefon sau WhatsApp.</p>

            <p><strong style={{ color: "var(--text)" }}>1.5</strong> Produsele Donut Studio sunt artizanale și se livrează ambalate în cutii de diferite mărimi, în funcție de cantitatea comandată.</p>

            <p><strong style={{ color: "var(--text)" }}>1.6</strong> Pentru evenimente, livrarea se face în ambalaje adecvate etapelor de manipulare — transport între laboratorul de producție și destinația finală — care nu afectează proprietățile nutritive, fizico-chimice și organoleptice ale produselor.</p>

            <p><strong style={{ color: "var(--text)" }}>1.7</strong> Livrarea produselor Donut Studio se face cu mijloace proprii (nu sunt transportate cu firme de curierat).</p>
          </div>

          {/* Contact strip */}
          <div className="mt-8 card rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm font-medium" style={{ color: "var(--text-70)" }}>
              Ai întrebări despre livrare?
            </p>
            <div className="flex gap-3">
              <a href="tel:0745018888"
                className="inline-flex items-center gap-2 bg-[#BC8157] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#9a6540] transition-colors">
                <Phone size={14} /> 0745 018 888
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
