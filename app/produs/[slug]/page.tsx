import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import type { Product } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";

export const revalidate = 60;

export async function generateStaticParams() {
  const rows = await prisma.gogoasa.findMany({ select: { slug: true } });
  return rows.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const row = await prisma.gogoasa.findUnique({ where: { slug }, select: { name: true } });
  if (!row) return {};
  return { title: `${row.name} – Donut Studio` };
}

const categoryColors: Record<string, string> = {
  classic: "bg-amber-900/50 text-amber-300 border border-amber-700/30",
  fruity: "bg-pink-900/50 text-pink-300 border border-pink-700/30",
  premium: "bg-purple-900/50 text-purple-300 border border-purple-700/30",
};
const categoryLabels: Record<string, string> = {
  classic: "Clasic",
  fruity: "Fructat",
  premium: "Premium",
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = await prisma.gogoasa.findUnique({ where: { slug } });
  if (!d) notFound();

  const product: Product = {
    id: d.id,
    name: d.name,
    slug: d.slug,
    price: d.price,
    image: d.image,
    description: d.description,
    ingredients: d.ingredients,
    allergens: d.allergens,
    calories: d.calories,
    available: d.available,
    category: d.category as Product["category"],
    nutrition: {
      perServing: { kcal: d.kcalServing, fat: d.fatServing, carbs: d.carbsServing, protein: d.proteinServing },
      per100g:    { kcal: d.kcal100g,    fat: d.fat100g,    carbs: d.carbs100g,    protein: d.protein100g },
    },
  };

  const { nutrition } = product;

  return (
    <div className="section-base min-h-screen pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-[#BC8157] text-sm font-medium mb-8 hover:gap-3 transition-all"
        >
          <ArrowLeft size={16} />
          Înapoi la meniu
        </Link>

        {/* Hero card */}
        <div className={`card rounded-3xl overflow-hidden mb-8 ${!product.available ? "opacity-70 grayscale" : ""}`}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative h-72 md:h-auto md:min-h-[420px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover brightness-125"
                priority
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[product.category]}`}>
                  {categoryLabels[product.category]}
                </span>
                {!product.available && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-800/80 text-gray-300 border border-gray-600/40">
                    Indisponibil
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <h1 className="font-display text-4xl text-[var(--text)] mb-3">
                  {product.name}
                </h1>
                <p className="text-[var(--text-60)] leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Allergens */}
                {product.allergens.length > 0 && (
                  <div className="mb-6">
                    <p className="text-[var(--text-40)] text-xs uppercase tracking-widest mb-2">
                      Alergeni
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.allergens.map((a) => (
                        <span
                          key={a}
                          className="text-xs text-[var(--text-60)] bg-[var(--surface)] px-3 py-1 rounded-full border border-[var(--border)]"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-end gap-1 mb-6">
                  <span className="font-bold text-4xl text-[var(--text)]">
                    {product.price}
                  </span>
                  <span className="text-[var(--text-40)] text-lg mb-1">lei</span>
                </div>
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div className="card rounded-3xl p-8">
            <h2 className="font-display text-2xl text-[var(--text)] mb-5">
              Ingrediente
            </h2>
            <p className="text-[var(--text-60)] text-sm leading-relaxed">
              {product.ingredients.join(", ")}.
            </p>
          </div>

          {/* Nutrition */}
          <div className="card rounded-3xl p-8">
            <h2 className="font-display text-2xl text-[var(--text)] mb-5">
              Valori nutriționale
            </h2>
            <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left px-4 py-3 text-[var(--text-40)] font-medium text-xs uppercase tracking-wide">
                      Nutrient
                    </th>
                    <th className="text-right px-4 py-3 text-[var(--text-40)] font-medium text-xs uppercase tracking-wide">
                      Per porție
                    </th>
                    <th className="text-right px-4 py-3 text-[var(--text-40)] font-medium text-xs uppercase tracking-wide">
                      Per 100g
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Energie",      serving: `${nutrition.perServing.kcal} kcal`, per100: `${nutrition.per100g.kcal} kcal` },
                    { label: "Grăsimi",      serving: `${nutrition.perServing.fat} g`,     per100: `${nutrition.per100g.fat} g` },
                    { label: "Carbohidrați", serving: `${nutrition.perServing.carbs} g`,   per100: `${nutrition.per100g.carbs} g` },
                    { label: "Proteine",     serving: `${nutrition.perServing.protein} g`, per100: `${nutrition.per100g.protein} g` },
                  ].map((row, i) => (
                    <tr key={row.label} className={i < 3 ? "border-b border-[var(--border)]" : ""}>
                      <td className="px-4 py-3 text-[var(--text-70)]">{row.label}</td>
                      <td className="px-4 py-3 text-right text-[var(--text)] font-medium">{row.serving}</td>
                      <td className="px-4 py-3 text-right text-[var(--text-50)]">{row.per100}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
