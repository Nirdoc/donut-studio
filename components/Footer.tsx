import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a1008] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="https://www.donutstudio.ro/wp-content/uploads/2024/07/donut-Studio-Artisanal-Pastry-logo_border.svg"
                alt="Donut Studio"
                width={130}
                height={65}
                className="h-14 w-auto brightness-0 invert"
                unoptimized
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Gogoși artizanale realizate cu ingrediente naturale de calitate. Adaugă savoare zilei tale.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/donut.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-[#BC8157] rounded-full flex items-center justify-center transition-colors text-xs font-bold"
              >
                IG
              </a>
              <a
                href="https://www.facebook.com/donutstudioro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-[#BC8157] rounded-full flex items-center justify-center transition-colors text-xs font-bold"
              >
                FB
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-semibold text-white/90 mb-4 text-sm uppercase tracking-widest">
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
                    className="text-white/60 hover:text-[#BC8157] transition-colors text-sm"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white/90 mb-4 text-sm uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={14} className="text-[#BC8157] mt-0.5 flex-shrink-0" />
                <span>Sos. Nicolae Titulescu 10-12, București (Piața Victoriei)</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Phone size={14} className="text-[#BC8157] flex-shrink-0" />
                <a href="tel:0745018888" className="hover:text-white transition-colors">
                  0745 018 888
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mail size={14} className="text-[#BC8157] flex-shrink-0" />
                <a href="mailto:contact@donutstudio.ro" className="hover:text-white transition-colors">
                  contact@donutstudio.ro
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-white/90 mb-4 text-sm uppercase tracking-widest">
              Program
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Clock size={14} className="text-[#BC8157] flex-shrink-0" />
                <span>Luni – Vineri: 11:00 – 19:00</span>
              </li>
              <li className="text-white/40 text-xs pl-5">
                Sâmbătă – Duminică: Închis
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Donut Studio. Toate drepturile rezervate.
          </p>
          <p className="text-white/40 text-xs">
            Artisanal Pastry · București, România
          </p>
        </div>
      </div>
    </footer>
  );
}
