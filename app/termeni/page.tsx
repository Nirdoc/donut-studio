import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Termeni și condiții — Donut Studio",
};

export default function TermeniPage() {
  return (
    <div className="section-base min-h-screen pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[#BC8157] text-sm font-medium mb-10 hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Înapoi
        </Link>

        <h1 className="font-display text-4xl text-[var(--text)] mb-2">Termeni și condiții</h1>
        <p className="text-sm mb-10" style={{ color: "var(--text-40)" }}>Ultima actualizare: Aprilie 2026</p>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: "var(--text-60)" }}>

          <section>
            <h2 className="font-semibold text-base text-[var(--text)] mb-3">1. Despre Donut Studio</h2>
            <p>
              Donut Studio este o patiserie artizanală specializată în gogoși premium, cu livrare în București și județul Ilfov.
              Prin utilizarea platformei noastre online, ești de acord cu termenii și condițiile descrise în acest document.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base text-[var(--text)] mb-3">2. Plasarea comenzilor</h2>
            <p>
              Comenzile pot fi plasate online prin intermediul platformei noastre. O comandă este confirmată după primirea
              notificării de confirmare prin email. Ne rezervăm dreptul de a anula comenzile în cazul indisponibilității
              produselor sau al erorilor de preț.
            </p>
            <p className="mt-2">
              Comanda minimă este de 16 gogoși. Termenul de livrare este ales de client în momentul plasării comenzii,
              cu condiția respectării intervalelor orare disponibile.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base text-[var(--text)] mb-3">3. Prețuri și plată</h2>
            <p>
              Toate prețurile afișate includ TVA. Taxa de livrare variază în funcție de zona de livrare:
              25 lei pentru Sectoarele 1, 2, 6 din București, respectiv 35 lei pentru Sectoarele 3, 4, 5 și județul Ilfov.
            </p>
            <p className="mt-2">
              Plata se poate efectua numerar la livrare, cu cardul online (prin Netopia Payments) sau prin ridicare
              din magazin (fără taxă de livrare, disponibilă cu minimum 24h în avans).
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base text-[var(--text)] mb-3">4. Livrare</h2>
            <p>
              Livrăm în București (toate sectoarele) și în județul Ilfov. Intervalele de livrare sunt afișate
              la plasarea comenzii. Nu garantăm livrarea exactă în intervalul ales, însă ne angajăm să respectăm
              fereastra orară selectată.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base text-[var(--text)] mb-3">5. Anulare și retur</h2>
            <p>
              Datorită naturii perisabile a produselor noastre, nu acceptăm returnuri. Comenzile pot fi anulate
              cu cel puțin 12 ore înainte de data livrării selectate, prin contactarea noastră directă.
              În cazul plăților cu cardul, rambursarea se procesează în 3-5 zile lucrătoare.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base text-[var(--text)] mb-3">6. Alergeni și ingrediente</h2>
            <p>
              Informațiile despre alergeni sunt afișate pentru fiecare produs în parte. Produsele noastre sunt
              preparate într-un spațiu unde se utilizează gluten, lactate, ouă și nuci. Clienții cu alergii
              severe sunt sfătuiți să ia în calcul riscul de contaminare încrucișată.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base text-[var(--text)] mb-3">7. Cont de utilizator</h2>
            <p>
              Crearea unui cont este opțională. Prin înregistrare, ești de acord cu colectarea și stocarea
              datelor tale de contact în scopul procesării comenzilor. Nu vindem și nu partajăm datele tale
              cu terți în scopuri comerciale.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base text-[var(--text)] mb-3">8. Contact</h2>
            <p>
              Pentru orice întrebări legate de comenzi sau de acești termeni, ne poți contacta la adresa de
              email sau prin numărul de telefon afișate pe site.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
