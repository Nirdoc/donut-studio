import { Cookie, ShieldCheck, Settings, ToggleLeft, Mail } from "lucide-react";

export const metadata = {
  title: "Politica înștiințare cookie-uri – Donut Studio",
  description:
    "Informații despre utilizarea cookie-urilor pe donutstudio.ro — ce sunt, ce tipuri folosim și cum vă gestionați preferințele.",
};

const cookieTypes = [
  {
    name: "Cookie-uri strict necesare",
    retention: "Sesiune / max. 1 an",
    examples: ["auth-token (autentificare cont)", "cart-store (coș de cumpărături)", "donut-theme (preferință temă)"],
    desc: "Sunt indispensabile pentru funcționarea corectă a site-ului. Fără acestea, serviciile de bază (autentificare, coș, temă) nu pot funcționa. Nu necesită consimțământ conform art. 5 alin. (3) din Directiva 2002/58/CE.",
    required: true,
  },
  {
    name: "Cookie-uri analitice",
    retention: "Max. 2 ani",
    examples: ["_ga, _gid (Google Analytics)", "statistici pagini vizitate", "timp petrecut pe site"],
    desc: "Ne ajută să înțelegem cum utilizatorii interacționează cu site-ul (pagini vizitate, surse de trafic, erori). Datele sunt agregate și anonimizate. Sunt activate doar cu consimțământul Dumneavoastră explicit.",
    required: false,
  },
  {
    name: "Cookie-uri de marketing",
    retention: "Max. 90 zile",
    examples: ["_fbp (Facebook Pixel)", "campanii publicitare", "remarketing"],
    desc: "Utilizate pentru a afișa reclame relevante pe platforme terțe (Facebook, Google Ads) și pentru a măsura eficiența campaniilor. Pot fi partajate cu parteneri publicitari. Sunt activate doar cu consimțământul Dumneavoastră explicit.",
    required: false,
  },
];

const rights = [
  {
    title: "Retragerea consimțământului",
    desc: 'Puteți retrage consimțământul oricând prin butonul "Gestionați preferințele" din bannerul de cookie-uri sau din setările browserului.',
  },
  {
    title: "Ștergerea cookie-urilor",
    desc: "Puteți șterge cookie-urile stocate din setările browserului (Setări → Confidențialitate → Șterge date de navigare).",
  },
  {
    title: "Blocarea cookie-urilor",
    desc: "Puteți configura browserul să blocheze toate cookie-urile sau doar pe cele de la terți. Atenție: blocarea cookie-urilor necesare poate afecta funcționalitatea site-ului.",
  },
  {
    title: "Plângere la ANSPDCP",
    desc: "Bd. G-ral. Gheorghe Magheru 28-30, Sector 1, București · www.dataprotection.ro",
  },
];

export default function PoliticaCookieUri() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section-dark pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(188,129,87,0.3) 0%, transparent 70%)",
            }}
          />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-flex items-center gap-2 bg-[#BC8157]/20 text-[#D4956A] px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-[#BC8157]/30">
            <Cookie size={13} /> Cookie Policy · AMERICAN BITE S.R.L.
          </span>
          <h1 className="font-display text-5xl lg:text-6xl leading-tight mb-4">
            Politica înștiințare<br />
            <span className="text-[#BC8157]">cookie-uri</span>
          </h1>
          <p className="text-lg max-w-xl" style={{ color: "var(--text-60)" }}>
            Informații despre utilizarea cookie-urilor pe{" "}
            <strong style={{ color: "var(--text)" }}>donutstudio.ro</strong> în
            conformitate cu Legea nr. 506/2004 și Directiva 2002/58/CE.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-base py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          {/* Ce sunt cookie-urile */}
          <div className="card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#BC8157]/15 flex items-center justify-center">
                <Cookie size={18} className="text-[#D4956A]" />
              </div>
              <h2 className="font-display text-2xl">Ce sunt cookie-urile?</h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--text-70)" }}>
              <p>
                Cookie-urile sunt fișiere text de mici dimensiuni stocate pe dispozitivul
                Dumneavoastră (calculator, telefon, tabletă) atunci când vizitați un site web.
                Ele permit site-ului să vă recunoască la vizitele ulterioare și să rețină
                preferințele Dumneavoastră.
              </p>
              <p>
                Cookie-urile nu conțin viruși și nu pot accesa fișierele de pe dispozitivul Dumneavoastră.
                Operatorul acestui site este{" "}
                <strong style={{ color: "var(--text)" }}>AMERICAN BITE S.R.L.</strong>,
                CIF RO36991079, J23/7328/2023.
              </p>
            </div>
          </div>

          {/* Tipuri de cookie-uri */}
          <div className="card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#BC8157]/15 flex items-center justify-center">
                <Settings size={18} className="text-[#D4956A]" />
              </div>
              <h2 className="font-display text-2xl">Tipuri de cookie-uri utilizate</h2>
            </div>
            <div className="space-y-4">
              {cookieTypes.map((ct) => (
                <div
                  key={ct.name}
                  className="rounded-2xl p-5"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                      {ct.name}
                    </h3>
                    {ct.required ? (
                      <span className="flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-[#BC8157]/15 text-[#BC8157] font-medium border border-[#BC8157]/20">
                        Întotdeauna activ
                      </span>
                    ) : (
                      <span className="flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-medium border border-amber-500/20">
                        Necesită consimțământ
                      </span>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-60)" }}>
                    {ct.desc}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--text-35)" }}>
                      Retenție: <span className="text-[#BC8157]">{ct.retention}</span>
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {ct.examples.map((ex) => (
                      <span
                        key={ex}
                        className="text-[10px] px-2 py-0.5 rounded-md font-mono"
                        style={{ background: "var(--bg-dark, rgba(0,0,0,0.2))", color: "var(--text-50)" }}
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gestionarea consimțământului */}
          <div className="card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#BC8157]/15 flex items-center justify-center">
                <ToggleLeft size={18} className="text-[#D4956A]" />
              </div>
              <h2 className="font-display text-2xl">Gestionarea consimțământului</h2>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-70)" }}>
              La prima vizită pe site, vă este prezentat un banner prin care puteți accepta,
              respinge sau personaliza utilizarea cookie-urilor. Preferințele Dumneavoastră
              sunt salvate local (în <code className="text-[#BC8157] text-xs">localStorage</code>)
              și pot fi modificate oricând.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rights.map((r) => (
                <div key={r.title} className="p-4 rounded-2xl" style={{ background: "var(--surface)" }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>
                    {r.title}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-55)" }}>
                    {r.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Terți */}
          <div className="card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#BC8157]/15 flex items-center justify-center">
                <ShieldCheck size={18} className="text-[#D4956A]" />
              </div>
              <h2 className="font-display text-2xl">Cookie-uri de la terți</h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--text-70)" }}>
              <p>
                Site-ul poate integra servicii de la terți care plasează propriile cookie-uri
                pe dispozitivul Dumneavoastră, conform politicilor proprii:
              </p>
              <ul className="space-y-2 pl-4">
                {[
                  { name: "Google Analytics", url: "https://policies.google.com/privacy", scope: "Cookie-uri analitice" },
                  { name: "Facebook Pixel (Meta)", url: "https://www.facebook.com/privacy/policy", scope: "Cookie-uri de marketing" },
                  { name: "Netopia Payments", url: "https://netopia-payments.com/privacy-policy/", scope: "Procesare plăți securizată" },
                ].map((t) => (
                  <li key={t.name} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#BC8157] mt-1.5 flex-shrink-0" />
                    <span>
                      <strong style={{ color: "var(--text)" }}>{t.name}</strong>
                      {" "}— {t.scope}.{" "}
                      <a
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#BC8157] hover:text-[#9a6540] transition-colors underline"
                      >
                        Politica de confidențialitate
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact & actualizare */}
          <div className="card rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Mail size={15} className="text-[#D4956A]" />
              <h3 className="font-semibold text-sm" style={{ color: "var(--text)" }}>
                Contact & actualizări
              </h3>
            </div>
            <div className="space-y-2 text-sm leading-relaxed" style={{ color: "var(--text-60)" }}>
              <p>
                Pentru orice întrebări legate de utilizarea cookie-urilor, ne puteți contacta la:{" "}
                <a href="mailto:contact@donutstudio.ro" className="text-[#BC8157] hover:text-[#9a6540] transition-colors">
                  contact@donutstudio.ro
                </a>{" "}
                sau{" "}
                <a href="tel:0745018888" className="text-[#BC8157] hover:text-[#9a6540] transition-colors">
                  0745.018.888
                </a>
                .
              </p>
              <p>
                Această politică poate fi actualizată periodic pentru a reflecta modificările
                legislative sau ale serviciilor utilizate. Vă recomandăm să o consultați periodic.
              </p>
              <p>
                Actualizată la data de{" "}
                <strong style={{ color: "var(--text)" }}>07.04.2025</strong>.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
