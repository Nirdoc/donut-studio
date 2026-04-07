import { prisma } from "@/lib/db";
import type { Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function FeaturedProducts() {
  const rows = await prisma.gogoasa.findMany({
    orderBy: { createdAt: "asc" },
    take: 6,
  });

  const featured: Product[] = rows.map((d) => ({
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
  }));

  return (
    <section className="section-mid py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-[#BC8157] font-medium text-sm uppercase tracking-widest mb-2">Bestsellers</p>
            <h2 className="font-display text-4xl lg:text-5xl text-[var(--text)]">
              Cele mai iubite<br />
              <span className="text-[#BC8157]">arome</span>
            </h2>
          </div>
          <Link href="/menu" className="inline-flex items-center gap-2 text-[#BC8157] font-semibold hover:gap-3 transition-all">
            Vezi tot meniul <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
