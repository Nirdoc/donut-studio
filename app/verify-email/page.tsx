import Link from "next/link";
import { CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";

type Status = "success" | "expired" | "invalid" | "error";

const states: Record<
  Status,
  { icon: React.ElementType; color: string; title: string; body: string }
> = {
  success: {
    icon: CheckCircle2,
    color: "text-emerald-400",
    title: "Email confirmat!",
    body: "Contul tău Donut Studio a fost activat cu succes. Te poți autentifica acum.",
  },
  expired: {
    icon: Clock,
    color: "text-amber-400",
    title: "Link expirat",
    body: "Linkul de confirmare a expirat (valabil 24h). Creează un cont nou pentru a primi un link proaspăt.",
  },
  invalid: {
    icon: XCircle,
    color: "text-red-400",
    title: "Link invalid",
    body: "Acest link de confirmare nu este valid sau a fost deja folosit.",
  },
  error: {
    icon: AlertCircle,
    color: "text-red-400",
    title: "Eroare",
    body: "A apărut o eroare. Te rugăm să încerci din nou sau să ne contactezi.",
  },
};

export const metadata = {
  title: "Verificare email — Donut Studio",
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const key: Status =
    status === "success" || status === "expired" || status === "invalid" || status === "error"
      ? status
      : "invalid";

  const { icon: Icon, color, title, body } = states[key];

  return (
    <div className="min-h-screen section-dark flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        {/* Decorative ring */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border border-[#BC8157]/20 animate-spin-slow" />
          <div className="absolute inset-3 rounded-full border border-[#BC8157]/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon size={36} className={color} />
          </div>
        </div>

        <h1 className="font-display text-4xl text-white mb-4">{title}</h1>
        <p className="text-white/70 leading-relaxed mb-10">{body}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {key === "success" && (
            <Link
              href="/login"
              className="inline-flex items-center justify-center bg-[#BC8157] hover:bg-[#9a6540] text-white px-8 py-4 rounded-full font-semibold transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#BC8157]/30"
            >
              Autentifică-te
            </Link>
          )}
          {(key === "expired" || key === "invalid") && (
            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-[#BC8157] hover:bg-[#9a6540] text-white px-8 py-4 rounded-full font-semibold transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#BC8157]/30"
            >
              Creează cont nou
            </Link>
          )}
          {key === "error" && (
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#BC8157] hover:bg-[#9a6540] text-white px-8 py-4 rounded-full font-semibold transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#BC8157]/30"
            >
              Contactează-ne
            </Link>
          )}
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-[#BC8157]/40 text-[#BC8157] hover:border-[#BC8157] px-8 py-4 rounded-full font-semibold transition-all"
          >
            Acasă
          </Link>
        </div>
      </div>
    </div>
  );
}
