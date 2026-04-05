import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--bg-footer)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo.svg"
                alt="Donut Studio"
                width={130}
                height={65}
                className="h-14 w-auto"
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
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors text-xs font-bold hover:bg-[#BC8157] hover:text-white"
                style={{ background: "var(--surface)", color: "var(--text-70)" }}
              >
                IG
              </a>
              <a
                href="https://www.facebook.com/donutstudioro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors text-xs font-bold hover:bg-[#BC8157] hover:text-white"
                style={{ background: "var(--surface)", color: "var(--text-70)" }}
              >
                FB
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

        <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
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
