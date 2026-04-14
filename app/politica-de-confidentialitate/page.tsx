import { ShieldCheck, Database, Users, Lock, Mail } from "lucide-react";

export const metadata = {
  title: "Politica de confidențialitate – Donut Studio",
  description: "Politica GDPR a AMERICAN BITE S.R.L. — prelucrarea datelor cu caracter personal.",
};

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

          {/* Intro */}
          <div className="card rounded-3xl p-8 space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-70)" }}>
            <p>Politica de confidențialitate referitoare la prelucrarea datelor cu caracter personal – AMERICAN BITE S.R.L.</p>
            <p>Ca în orice activitate economică, la fel ca alți operatori economici, și Societatea noastră prelucrează o serie de date cu caracter personal ale clienților și colaboratorilor săi.</p>
            <p>În conformitate cu dispozițiile legale naționale și europene, prelucrarea datelor cu caracter personal trebuie realizată în conformitate cu Regulamentul (UE) 2016/679 al Parlamentului European și al Consiliului din 27 aprilie 2016 privind protecția persoanelor fizice în ceea ce privește prelucrarea datelor cu caracter personal și privind libera circulație a acestor date și de abrogare a Directivei 95/46/CE (Regulamentul general privind protecția datelor), denumit în continuare „Regulamentul GDPR" și celelalte acte, naționale sau europene, emise în vederea aplicării acestuia.</p>
            <p>Societatea noastră respectă dispozițiile din materia prelucrării datelor cu caracter personal, urmărind să vă ofere toate informațiile necesare despre modul în care prelucrează aceste date, respectiv modul de colectare, utilizare, transferare și protecție atunci când navigați Website-ul, când vă creați Contul Dumneavoastră, când plasați o comandă sau când intrați în contact cu Noi.</p>
            <p>Vă rugăm să consultați și Politica privind modulele cookies și Termenii și Condițiile AMERICAN BITE S.R.L., acestea putând fi accesate prin intermediul Website-ului și fiind aplicabile în toate interacțiunile pe care le aveți cu Noi.</p>
          </div>

          {/* Cap I */}
          <div className="card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#BC8157]/15 flex items-center justify-center">
                <ShieldCheck size={18} className="text-[#D4956A]" />
              </div>
              <h2 className="font-display text-2xl">Capitolul I – Dispoziții generale</h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-70)" }}>
              <div>
                <p className="font-semibold mb-2" style={{ color: "var(--text)" }}>Înțelesul unor termeni</p>
                <p>Termenii cu majusculă folosiți în continuare, dacă nu rezultă altfel din context, au înțelesul prevăzut în Termenii și Condițiile AMERICAN BITE S.R.L.</p>
              </div>
              <div>
                <p className="font-semibold mb-2" style={{ color: "var(--text)" }}>Despre Societate și datele de contact</p>
                <p className="mb-3">Website-ul este deținut de Noi, respectiv de societatea <strong style={{ color: "var(--text)" }}>AMERICAN BITE S.R.L.</strong>, societate cu răspundere limitată organizată și funcționând conform legilor din România, înregistrată la Registrul Comerțului cu nr. J23/7328/2023, având sediul social în Strada Crinului, nr 25 L, Comuna Chiajna, Sat Rosu, jud. Ilfov, România, locul de desfășurare a activității: Strada Gârlei, nr 45, sector 1, București, numărul de identificare fiscală RO36991079, contul bancar RO86BTRLRONCRT0383442601, deschis la Banca Transilvania, capital social: 200 RON, Obiect de activitate: Cod CAEN: 1071 – Fabricarea pâinii, fabricarea prăjiturilor și a produselor proaspete de patiserie, cu datele de contact:</p>
                <div className="flex flex-wrap gap-3">
                  <a href="mailto:contact@donutstudio.ro" className="inline-flex items-center gap-2 text-[#BC8157] font-medium hover:text-[#9a6540] transition-colors">
                    <Mail size={13} /> contact@donutstudio.ro
                  </a>
                  <a href="tel:0745018888" className="inline-flex items-center gap-2 text-[#BC8157] font-medium hover:text-[#9a6540] transition-colors">
                    ☎ 0745.018.888
                  </a>
                </div>
              </div>
              <p>În conformitate cu Regulamentul GDPR, atunci când prelucrăm datele cu caracter personal Noi avem calitatea de operator, iar Dumneavoastră aveți calitatea de persoană vizată.</p>
              <p>Ne puteți contacta oricând la coordonatele de contact menționate mai sus în cazul în care aveți nevoie de informații suplimentare cu privire la prelucrarea datelor de către Societate.</p>
            </div>
          </div>

          {/* Cap II */}
          <div className="card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#BC8157]/15 flex items-center justify-center">
                <Database size={18} className="text-[#D4956A]" />
              </div>
              <h2 className="font-display text-2xl">Capitolul II – Categorii de date prelucrate, scopurile și temeiurile prelucrării, durata de stocare, destinatarii datelor și securitatea acestora</h2>
            </div>
            <div className="space-y-6 text-sm leading-relaxed" style={{ color: "var(--text-70)" }}>

              <div>
                <p className="font-semibold mb-3" style={{ color: "var(--text)" }}>Categorii de date prelucrate</p>
                <div className="space-y-3">
                  <p>Prelucrăm unele date de identificare, date de cont și date de contact, cum ar fi numele și prenumele, adresa de facturare și livrare, email-ul, numărul de telefon, username-ul, comenzile plasate și recenziile acordate, pentru încheierea și executarea Contractului la distanță, pentru a vă putea înregistra Contul Dumneavoastră, în măsura în care optați pentru crearea unui cont, pentru a prelua comenzile plasate și a vă putea contacta în legătură cu acestea și altele asemenea. De asemenea, o parte din aceste date le prelucrăm și în vederea îndeplinirii obligațiilor legale referitoare la păstrarea evidențelor contabile și, în cazul în care sunteți de acord, în scop de marketing.</p>
                  <p>Totodată, prelucrăm unele date referitoare la plată, cum ar fi informațiile referitoare la efectuarea plăților prin contul sau cardul bancar, pentru a urmări executarea Contractului la distanță încheiat cu Dumneavoastră, respectiv pentru a verifica faptul că a fost efectuată plata sau pentru a vă restitui sumele achitate, în cazul retragerii din Contractul la distanță. De asemenea, o parte din aceste date le prelucrăm și în vederea îndeplinirii obligațiilor legale referitoare la păstrarea evidențelor contabile.</p>
                  <p>Prin intermediul Website-ului sunt prelucrate și unele date tehnice, cum ar fi cele referitoare la adresa IP, tipul de browser și versiunea, setările privind locația și ora, modalitatea de utilizare a Website-ului și altele asemenea, pentru asigurarea securității Website-ului, pentru a vă oferi o experiență de navigare cât mai plăcută și pentru a înțelege modalitatea în care interacționați cu Website-ul. Pentru detalii cu privire la modalitatea de prelucrare a acestor date, vă rugăm să consultați și Politica privind modulele cookies.</p>
                  <p>Uneori, prelucrăm și unele date de marketing, cum ar fi preferințele Dumneavoastră pentru primirea materialelor comerciale, prin email sau telefon, și de a fi contactați în legătură cu acestea și recenziile pe care le lăsați. De asemenea, unele date de marketing pot fi colectate prin modulele cookies folosite de Website. Pentru mai multe detalii în legătură cu acest subiect, vă rugăm să consultați Politica privind modulele cookies.</p>
                  <p>Nu prelucrăm date genetice, date biometrice, date privind sănătatea sau condamnările ori date referitoare la confesiunea religioasă, convingerile filozofice, apartenența la sindicate, originea rasială sau etnică, opiniile politice, viața sexuală sau orientarea sexuală.</p>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-3" style={{ color: "var(--text)" }}>Scopurile și temeiurile de prelucrare a datelor</p>
                <div className="space-y-3">
                  <p>Prelucrăm datele în temeiul consimțământului Dumneavoastră, în temeiul îndeplinirii unor obligații legale ale Societății, în temeiul încheierii și executării contractelor cu Dumneavoastră și în vederea realizării intereselor legitime ale Societății, cum sunt cele referitoare la realizarea obiectului de activitate, identificarea de noi clienți, îndeplinirea strategiei de marketing, efectuarea unor analize asupra traficului de pe Website și altele asemenea.</p>
                  <p>Prelucrăm datele de identificare, datele de cont, datele de contact și datele referitoare la plată în vederea încheierii și executării Contractului la distanță, a înregistrării Contului Dumneavoastră și a gestionării relației pe care o aveți cu Noi. Aceste date le preluăm direct, în baza acordului pe care îl furnizați cu ocazia transmiterii datelor și sunt necesare în vederea încheierii și executării contractului dintre noi și Dumneavoastră. În măsura în care nu doriți să ne furnizați aceste date, trebuie să aveți în vedere că este posibil să nu mai putem încheia sau executa contractul încheiat cu Dumneavoastră.</p>
                  <p>De asemenea, prelucrăm aceste date și în vederea îndeplinirii unor obligații legale aflate în sarcina noastră, cum sunt obligațiile legale din materie fiscală sau cele referitoare la ținerea contabilității, arhivare și altele similare.</p>
                  <p>Totodată, în baza consimțământului expres, aceste date le putem prelucra și în scopul realizării strategiei de marketing a Societății, cum ar fi contractarea Dumneavoastră pentru a vă prezenta ofertele Societății, publicarea review-urilor pe Website și altele asemenea.</p>
                  <p>Datele tehnice le prelucrăm în vederea furnizării unei experiențe cât mai optime când navigați Website-ul, dar și din motive de securitate și protejare a datelor sau pentru a înțelege modalitatea în care interacționați cu acesta, cum ar fi unele preferințe pe care le aveți, în timp ce unele date tehnice sunt prelucrate în scop de marketing. De principiu, aceste date le prelucrăm în baza acordului oferit de Dumneavoastră, dar pot fi și cazuri când le prelucrăm în vederea realizării interesului legitim al Societății, cum ar fi datele prelucrate din motive de securitate și protecție, prelucrarea fiind realizată în acest caz în vederea protejării Societății de diferite atacuri cibernetice și altele asemenea.</p>
                  <p>Datele de marketing le prelucrăm în vederea elaborării și urmării politicii comerciale a Societății și în vederea transmiterii comunicărilor comerciale, a ofertelor cu privire la Produsele Societății și pentru a vă contacta în legătură cu acestea. Aceste date le colectăm și utilizăm în baza acordului pe care ni-l furnizați.</p>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-3" style={{ color: "var(--text)" }}>Durata de stocare a datelor</p>
                <div className="space-y-3">
                  <p>De principiu, cu excepția celor menționate în continuare, păstrăm datele colectate pe perioada în care aveți Contul Dumneavoastră înregistrat prin intermediul Website-ului. Ulterior închiderii contului, datele vor fi păstrate doar pentru timpul necesar îndeplinirii scopurilor precizate anterior și nu mai mult de 5 ani de la data închiderii contului, cu excepția situațiilor în care este necesar să le păstrăm pe o altă perioadă prevăzută de lege, mai lungă, strict în vederea îndeplinirii obligațiilor legale pe care le are Societatea, cum sunt, spre exemplu, cele de arhivare a documentelor contabile și altele asemenea (cum este spre exemplu cazul documentelor justificative financiar-contabile pentru care termenul de păstrare prevăzut de lege este de 10 ani de la data încheierii exercițiului financiar în cursul căruia au fost întocmite).</p>
                  <p>În cazul în care nu optați pentru crearea unui cont, datele vor fi stocate pentru o perioadă necesară îndeplinirii scopurilor pentru care sunt colectate, dar nu mai mult de 5 ani, cu excepția situațiilor în care este necesar să le păstrăm pe o altă perioadă prevăzută de lege, mai lungă, strict în vederea îndeplinirii obligațiilor legale pe care le are Societatea, cum sunt, spre exemplu, cele de arhivare a documentelor contabile și altele asemenea (cum este spre exemplu cazul documentelor justificative financiar-contabile pentru care termenul de păstrare prevăzut de lege este de 10 ani de la data încheierii exercițiului financiar în cursul căruia au fost întocmite).</p>
                  <p>Datele tehnice vor fi stocate conform preferințelor Dumneavoastră. Pentru mai multe informații în legătură cu aceste date, vă rugăm să consultați și Politica privind modulele cookies.</p>
                  <p>Datele de marketing vor fi stocate până la retragerea consimțământului Dumneavoastră sau, în absența acestui eveniment, până la îndeplinirea scopului pentru care au fost colectate.</p>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-3" style={{ color: "var(--text)" }}>Destinatarii datelor</p>
                <div className="space-y-3">
                  <p>Ca în orice activitate economică, și Noi avem o serie de parteneri comerciali cu care colaborăm în vederea desfășurării activității noastre în condiții cât mai bune.</p>
                  <p>În acest context, în unele cazuri, este necesar să transmitem acestor parteneri comerciali unele date colectate.</p>
                  <p>Astfel, în unele cazuri, transmitem datele colectate către:</p>
                  <ul className="space-y-1 pl-4">
                    <li>– Procesatorului de plăți cu care colaborăm în vederea facilitării plăților prin intermediul cardurilor bancare;</li>
                    <li>– Societății cu care colaborăm în vederea păstrării evidențelor contabile, în conformitate cu dispozițiile legale;</li>
                    <li>– Societății cu care colaborăm pentru realizarea mentenanței Website-ului.</li>
                  </ul>
                  <p>Nu intenționăm să transmitem datele Dumneavoastră către o țară non-UE. Cu toate acestea, folosim serviciile Google (Google Analytics) și Facebook pentru realizarea intereselor legitime ale Societății, sens în care vă rugăm să consultați și politicile de confidențialitate ale acestor entități.</p>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-3" style={{ color: "var(--text)" }}>Securitatea datelor</p>
                <div className="space-y-3">
                  <p>Păstrăm securitatea datelor conform standardelor din industrie, implementând măsuri tehnice, fizice și organizatorice pentru prevenirea distrugerii, modificării sau accesării neautorizate a datelor.</p>
                  <p>Urmărim să luăm măsurile tehnice necesare protejării securității și confidențialității datelor prelucrate, interzicând orice acces neautorizat la acestea. Datele sunt divulgate doar acelor persoane sau entități îndreptățite să le cunoască.</p>
                  <p>Ne asigurăm că partenerii noștri și persoanele care au acces la date le prelucrează doar în scopurile necesare pentru care au primit accesul și ne asigurăm că aceștia respectă confidențialitatea datelor.</p>
                  <p>În cazul unor riscuri sau incidente de securitate cu privire la datele prelucrate, vom îndeplini toate obligațiile prevăzute de Regulamentul GDPR, luând toate măsurile necesare pentru înlăturarea și gestionarea acestora. În toate cazurile, vă vom informa, în conformitate cu Regulamentul GDPR, cu privire la aceste situații.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cap III */}
          <div className="card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#BC8157]/15 flex items-center justify-center">
                <Users size={18} className="text-[#D4956A]" />
              </div>
              <h2 className="font-display text-2xl">Capitolul III – Drepturile Dumneavoastră</h2>
            </div>
            <div className="space-y-5 text-sm leading-relaxed" style={{ color: "var(--text-70)" }}>
              <p>Puteți oricând să contactați Societatea în vederea exercitării drepturilor descrise în continuare, la oricare din coordonatele de contact ale Societății.</p>

              {[
                {
                  title: "Dreptul de acces la datele cu caracter personal prelucrate",
                  text: "Aveți dreptul de a obține o confirmare din partea noastră cu privire la datele cu caracter personal pe care le prelucrăm în privința Dumneavoastră și informații cu privire la: a) scopurile prelucrării; b) categoriile de date cu caracter personal prelucrate; c) categoriile de destinatari ai datelor; d) durata de stocare a datelor; e) dreptul de a solicita rectificarea sau ștergerea datelor prelucrate ori dreptul de a restricționa sau de a vă opune cu privire la prelucrarea acestora; f) dreptul de a depune o plângere în fața ANSPDCP.",
                },
                {
                  title: "Dreptul la rectificarea datelor cu caracter personal prelucrate",
                  text: "Aveți dreptul să ne solicitați rectificarea sau completarea datelor cu caracter personal inexacte pe care le avem în privința Dumneavoastră.",
                },
                {
                  title: "Dreptul la ștergerea datelor cu caracter personal prelucrate",
                  text: "Aveți dreptul să ne solicitați ștergerea datelor cu caracter personal pe care le avem cu privire la Dumneavoastră. Cu toate acestea, în anumite situații nu putem da curs solicitării Dumneavoastră. Spre exemplu, nu putem proceda la ștergerea datelor în cazul în care avem obligația legală de a le păstra pentru o anumită perioadă, cum este cazul obligațiilor legale care ne impun să păstrăm datele pentru perioada prevăzută de lege, din rațiuni fiscale și de contabilitate. De asemenea, în măsura în care este necesar să păstrăm datele pentru constatarea, exercitarea sau apărarea unui drept în instanță, nu vom putea da curs solicitării Dumneavoastră.",
                },
                {
                  title: "Dreptul de a restricționa prelucrarea datelor cu caracter personal",
                  text: "Puteți obține restricționarea prelucrării datelor în cazurile descrise în art. 18 din Regulamentul GDPR.",
                },
                {
                  title: "Dreptul de a vă opune prelucrării datelor cu caracter personal",
                  text: "Aveți dreptul de a vă opune la prelucrarea datelor în situațiile descrise de art. 21 din Regulamentul GDPR.",
                },
                {
                  title: "Dreptul de a porta datele cu caracter personal prelucrate",
                  text: "Aveți dreptul de a primi datele cu caracter personal pe care ni le-ați furnizat și le avem în privința Dumneavoastră, în condițiile descrise de art. 20 din Regulamentul GDPR.",
                },
                {
                  title: "Dreptul de a vă retrage consimțământul acordat cu privire la prelucrarea datelor cu caracter personal",
                  text: "În orice moment, aveți dreptul de a vă modifica sau retrage consimțământul/acordul cu privire la prelucrarea datelor pe care ni le-ați furnizat. Trebuie să aveți în vedere că în acest caz este posibil să nu mai putem derula relațiile comerciale cu Dumneavoastră. Totodată, trebuie să aveți în considerare și faptul că, în urma modificării sau retragerii consimțământului acordat, este posibil ca acest lucru să nu afecteze prelucrările de date efectuate anterior sau să nu determine ștergerea anumitor date pentru care Societatea are o obligație legală de prelucrare sau un interes legitim în păstrarea acestora.",
                },
                {
                  title: "Dreptul de a depune o plângere în fața autorității naționale de supraveghere a prelucrării datelor cu caracter personal",
                  text: "Aveți dreptul de a depune o plângere în fața Autorității Naționale de Supraveghere a Prelucrării Datelor cu Caracter Personal, cu sediul în Bd. G-ral. Gheorghe Magheru, Nr. 28-30, Sector 1, 010336, București, România, website: https://www.dataprotection.ro/?page=contact&lang=ro. Fără a vă afecta într-un fel acest drept, dacă aveți orice neclaritate sau sesizare cu privire la prelucrarea datelor cu caracter personal de către Societate, ne-o puteți adresa la coordonatele prevăzute pentru contact, iar Noi vom face tot posibilul să lămurim orice aspect.",
                },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-2xl" style={{ background: "var(--surface)" }}>
                  <p className="font-semibold mb-2" style={{ color: "var(--text)" }}>{item.title}</p>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cap IV */}
          <div className="card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#BC8157]/15 flex items-center justify-center">
                <Lock size={18} className="text-[#D4956A]" />
              </div>
              <h2 className="font-display text-2xl">Capitolul IV – Alte aspecte</h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--text-70)" }}>
              <p>Din când în când, vom proceda la revizuirea Politicii de confidențialitate. În acest sens, vă rugăm să o consultați de fiecare dată când considerați necesar, iar dacă modificările efectuate vă prejudiciază în vreun fel, să ne informați pentru a discuta această situație.</p>
              <p>Orice întrebări pe care le aveți cu privire la prelucrarea datelor cu caracter personal de către Societate le puteți adresa la: <a href="mailto:contact@donutstudio.ro" className="text-[#BC8157] hover:text-[#9a6540] transition-colors">contact@donutstudio.ro</a> sau la numărul de telefon: <a href="tel:0745018888" className="text-[#BC8157] hover:text-[#9a6540] transition-colors">0745.018.888</a>.</p>
              <p>Această Politică de confidențialitate a fost actualizată la data de <strong style={{ color: "var(--text)" }}>11.08.2024</strong>.</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
