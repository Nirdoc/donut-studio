import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--bg-footer)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo.svg"
                alt="Donut Studio"
                width={130}
                height={65}
                className=""
                unoptimized
              />
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-60)" }}>
              Gogoși artizanale realizate cu ingrediente naturale de calitate. Adaugă savoare zilei tale.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/donut.studio"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "var(--surface)", color: "var(--text-70)" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" className="hover:text-[#E1306C] transition-colors">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/donutstudioro"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "var(--surface)", color: "var(--text-70)" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" className="hover:text-[#1877F2] transition-colors">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest" style={{ color: "var(--text)" }}>
              Navigare
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Acasă" },
                { href: "/menu", label: "Meniu" },
                { href: "/login", label: "Autentificare" },
                { href: "/register", label: "Cont nou" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hover:text-[#BC8157] transition-colors text-sm"
                    style={{ color: "var(--text-60)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Magazin */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest" style={{ color: "var(--text)" }}>
              Magazin
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/politica-de-livrare", label: "Politica de livrare" },
                { href: "/politica-de-retur", label: "Politica de retur" },
                { href: "/politica-de-confidentialitate", label: "Politica de confidențialitate" },
                { href: "/politica-cookie-uri", label: "Politica înștiințare cookie-uri" },
                { href: "/modalitati-de-plata", label: "Modalități de plată" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hover:text-[#BC8157] transition-colors text-sm"
                    style={{ color: "var(--text-60)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest" style={{ color: "var(--text)" }}>
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm" style={{ color: "var(--text-60)" }}>
                <MapPin size={14} className="text-[#BC8157] mt-0.5 flex-shrink-0" />
                <span>Sos. Nicolae Titulescu 10-12, București (Piața Victoriei)</span>
              </li>
              <li className="flex items-center gap-3 text-sm" style={{ color: "var(--text-60)" }}>
                <Phone size={14} className="text-[#BC8157] flex-shrink-0" />
                <a href="tel:0745018888" className="hover:text-[#BC8157] transition-colors">
                  0745 018 888
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm" style={{ color: "var(--text-60)" }}>
                <Mail size={14} className="text-[#BC8157] flex-shrink-0" />
                <a href="mailto:contact@donutstudio.ro" className="hover:text-[#BC8157] transition-colors">
                  contact@donutstudio.ro
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest" style={{ color: "var(--text)" }}>
              Program
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-sm" style={{ color: "var(--text-60)" }}>
                <Clock size={14} className="text-[#BC8157] flex-shrink-0" />
                <span>Luni – Vineri: 11:00 – 19:00</span>
              </li>
              <li className="text-xs pl-5" style={{ color: "var(--text-40)" }}>
                Sâmbătă – Duminică: Închis
              </li>
            </ul>
          </div>
        </div>

        {/* Protecția consumatorului + Plăți securizate */}
        <div className="border-t mt-12 pt-8" style={{ borderColor: "var(--border)" }}>
          <div className="flex flex-wrap items-start justify-between gap-8 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--text-40)" }}>
                Protecția consumatorului
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <a
                  href="https://anpc.ro/ce-este-sal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Soluționarea Alternativă a Litigiilor — ANPC"
                  className="opacity-70 hover:opacity-100 transition-opacity duration-200"
                >
                  <Image
                    src="/anpc-sal.png"
                    alt="ANPC — Soluționarea Alternativă a Litigiilor"
                    width={180}
                    height={45}
                    className="h-10 w-auto"
                    unoptimized
                  />
                </a>
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Soluționarea Online a Litigiilor — SOL"
                  className="opacity-70 hover:opacity-100 transition-opacity duration-200"
                >
                  <Image
                    src="/sol-odr.png"
                    alt="SOL — Soluționarea Online a Litigiilor"
                    width={220}
                    height={55}
                    className="h-10 w-auto"
                    unoptimized
                  />
                </a>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--text-40)" }}>
                Plăți securizate
              </p>
              <a
                href="https://netopia-payments.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Plăți securizate prin Netopia Payments"
                className="opacity-70 hover:opacity-100 transition-opacity duration-200 inline-block"
              >
                <Image
                  src="/netopia.svg"
                  alt="Netopia Payments"
                  width={140}
                  height={40}
                  className="h-8 w-auto"
                  unoptimized
                />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--text-40)" }}>
            © {new Date().getFullYear()} Donut Studio. Toate drepturile rezervate.
          </p>
          <p className="text-xs" style={{ color: "var(--text-40)" }}>
            Artisanal Pastry · București, România
          </p>
        </div>
      </div>
    </footer>
  );
}
