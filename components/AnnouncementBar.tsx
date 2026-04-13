"use client";

import { useState, useEffect } from "react";
import { Phone, Mail } from "lucide-react";

const MESSAGES = [
  "🚚 Livrăm doar în București și Ilfov",
  "🍩 Comandă minimă: 16 donuts per livrare",
];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function AnnouncementBar({ visible }: { visible: boolean }) {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % MESSAGES.length);
      }, 350);
      setTimeout(() => {
        setShow(true);
      }, 400);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="overflow-hidden transition-all duration-500 ease-in-out"
      style={{ maxHeight: visible ? "48px" : "0px", opacity: visible ? 1 : 0 }}
    >
      <div
        className="relative h-12 flex items-center"
        style={{
          background: "linear-gradient(90deg, #080300 0%, #0f0602 50%, #080300 100%)",
          borderBottom: "1px solid rgba(188,129,87,0.15)",
        }}
      >
        {/* Center — rotating announcements */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          {MESSAGES.map((msg, i) => (
            <p
              key={i}
              className="absolute text-[12px] font-semibold uppercase tracking-[0.22em] text-center whitespace-nowrap transition-opacity duration-300"
              style={{
                color: "rgba(188,129,87,0.55)",
                opacity: i === index ? (show ? 1 : 0) : 0,
              }}
            >
              {msg}
            </p>
          ))}
        </div>

        {/* Right — contact chips */}
        <div className="relative ml-auto flex items-center gap-2 pr-5 sm:pr-8">
          {/* Phone */}
          <a
            href="tel:0745018888"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#BC8157]/30 bg-[#BC8157]/8 hover:bg-[#BC8157]/18 hover:border-[#BC8157]/60 transition-all duration-200 group"
          >
            <Phone size={11} className="text-[#BC8157] shrink-0" />
            <span className="text-[11px] font-semibold tracking-wide text-[#BC8157] whitespace-nowrap hidden sm:inline">
              0745 018 888
            </span>
          </a>

          {/* Email */}
          <a
            href="mailto:contact@donutstudio.ro"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#BC8157]/30 bg-[#BC8157]/8 hover:bg-[#BC8157]/18 hover:border-[#BC8157]/60 transition-all duration-200 group"
          >
            <Mail size={11} className="text-[#BC8157] shrink-0" />
            <span className="text-[11px] font-semibold tracking-wide text-[#BC8157] whitespace-nowrap hidden md:inline">
              contact@donutstudio.ro
            </span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/40745018888"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#25D366]/40 bg-[#25D366]/8 hover:bg-[#25D366]/18 hover:border-[#25D366]/70 transition-all duration-200 group"
          >
            <span className="text-[#25D366]">
              <WhatsAppIcon />
            </span>
            <span className="text-[11px] font-semibold tracking-wide text-[#25D366] whitespace-nowrap hidden sm:inline">
              WhatsApp
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
