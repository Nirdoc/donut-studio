import { ShieldCheck, Database, Users, Lock, Mail } from "lucide-react";

export const metadata = {
  title: "Politica de confidențialitate – Donut Studio",
  description: "Politica GDPR a AMERICAN BITE S.R.L. — prelucrarea datelor cu caracter personal.",
};

const rights = [
  { title: "Dreptul de acces", desc: "Puteți solicita informații despre datele prelucrate în privința Dumneavoastră." },
  { title: "Dreptul la rectificare", desc: "Puteți solicita corectarea datelor inexacte sau incomplete." },
  { title: "Dreptul la ștergere", desc: "Puteți solicita ștergerea datelor, cu excepția obligațiilor legale de păstrare." },
  { title: "Dreptul la restricționare", desc: "Puteți limita prelucrarea în cazurile prevăzute de art. 18 GDPR." },
  { title: "Dreptul de opoziție", desc: "Vă puteți opune prelucrării în situațiile prevăzute de art. 21 GDPR." },
  { title: "Dreptul la portabilitate", desc: "Puteți primi datele furnizate în format structurat (art. 20 GDPR)." },
  { title: "Retragerea consimțământului", desc: "Puteți retrage oricând acordul pentru prelucrare." },
  { title: "Plângere la ANSPDCP", desc: "Bd. G-ral. Gheorghe Magheru 28-30, Sector 1, București · dataprotection.ro" },
];

export default function PoliticaDeConfidentialitate() {
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
            ✦ GDPR · AMERICAN BITE S.R.L.
          </span>
          <h1 className="font-display text-5xl lg:text-6xl leading-tight mb-4">
            Politica de confidențialitate
          </h1>
          <p className="text-lg max-w-xl" style={{ color: "var(--text-60)" }}>
            Prelucrarea datelor cu caracter personal în conformitate cu Regulamentul (UE) 2016/679.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-base py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          {/* Cap I */}
          <div className="card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#BC8157]/15 flex items-center justify-center">
                <ShieldCheck size={18} className="text-[#D4956A]" />
              </div>
              <h2 className="font-display text-2xl">Cap. I – Operator de date</h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--text-70)" }}>
              <p>Website-ul este deținut de <strong style={{ color: "var(--text)" }}>AMERICAN BITE S.R.L.</strong>, înregistrată la Registrul Comerțului cu nr. J23/7328/2023, CIF RO36991079, sediu social: Strada Crinului 25 L, Comuna Chiajna, Sat Rosu, jud. Ilfov.</p>
              <p>Loc de desfășurare a activității: Strada Gârlei 45, Sector 1, București. Cont bancar: RO86BTRLRONCRT0383442601 — Banca Transilvania.</p>
              <div className="flex flex-wrap gap-3 mt-2">
                <a href="mailto:contact@donutstudio.ro" className="inline-flex items-center gap-2 text-[#BC8157] text-sm font-medium hover:text-[#9a6540] transition-colors">
                  <Mail size={13} /> contact@donutstudio.ro
                </a>
                <a href="tel:0745018888" className="inline-flex items-center gap-2 text-[#BC8157] text-sm font-medium hover:text-[#9a6540] transition-colors">
                  ☎ 0745.018.888
                </a>
              </div>
            </div>
          </div>

          {/* Cap II */}
          <div className="card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#BC8157]/15 flex items-center justify-center">
                <Database size={18} className="text-[#D4956A]" />
              </div>
              <h2 className="font-display text-2xl">Cap. II – Date prelucrate</h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "Date de identificare și contact",
                  desc: "Nume, prenume, adresă de facturare/livrare, email, telefon, username, comenzi și recenzii — pentru executarea contractului și înregistrarea contului.",
                },
                {
                  title: "Date de plată",
                  desc: "Informații referitoare la plăți prin cont/card bancar — pentru urmărirea executării contractului și restituirea sumelor, dacă este cazul.",
                },
                {
                  title: "Date tehnice",
                  desc: "Adresă IP, tip browser, setări locație, modalitate de utilizare a website-ului — pentru securitate și experiență de navigare optimă.",
                },
                {
                  title: "Date de marketing",
                  desc: "Preferințe pentru comunicări comerciale și recenzii — prelucrate pe baza consimțământului explicit.",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: "var(--surface)" }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#BC8157] mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold mb-1">{item.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-60)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}

              <div className="pt-2 text-sm leading-relaxed" style={{ color: "var(--text-70)" }}>
                <p className="mb-2"><strong style={{ color: "var(--text)" }}>Durată de stocare:</strong> Datele se păstrează pe perioada deținerii contului și cel mult 5 ani după închiderea acestuia, cu excepția documentelor contabile (10 ani, conform legii).</p>
                <p><strong style={{ color: "var(--text)" }}>Destinatari:</strong> Procesatorul de plăți, contabilul, prestatorul de mentenanță website. Datele nu se transferă în afara UE, cu excepția serviciilor Google Analytics și Facebook (conform politicilor proprii ale acestor entități).</p>
              </div>
            </div>
          </div>

          {/* Cap III — Drepturi */}
          <div className="card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#BC8157]/15 flex items-center justify-center">
                <Users size={18} className="text-[#D4956A]" />
              </div>
              <h2 className="font-display text-2xl">Cap. III – Drepturile Dumneavoastră</h2>
            </div>
            <p className="text-sm mb-5" style={{ color: "var(--text-60)" }}>
              Puteți exercita oricând aceste drepturi contactând Societatea la coordonatele de contact.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rights.map((r) => (
                <div key={r.title} className="p-4 rounded-2xl" style={{ background: "var(--surface)" }}>
                  <p className="text-sm font-semibold mb-1">{r.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-55)" }}>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cap IV */}
          <div className="card rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Lock size={15} className="text-[#D4956A]" />
              <h3 className="font-semibold text-sm">Securitate și actualizări</h3>
            </div>
            <div className="space-y-2 text-sm leading-relaxed" style={{ color: "var(--text-60)" }}>
              <p>Implementăm măsuri tehnice, fizice și organizatorice pentru prevenirea accesului neautorizat la date.</p>
              <p>Politica de confidențialitate poate fi revizuită periodic. Vă rugăm să o consultați ori de câte ori considerați necesar.</p>
              <p>Actualizată la data de <strong style={{ color: "var(--text)" }}>11.08.2024</strong>.</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
