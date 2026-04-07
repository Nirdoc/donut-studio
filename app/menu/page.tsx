import MenuClient from "./MenuClient";
import { prisma } from "@/lib/db";
import type { Product } from "@/lib/products";

export const metadata = {
  title: "Meniu — Donut Studio",
  description: "Descoperă toate aromele noastre artizanale de gogoși premium.",
};

export const revalidate = 60;

export default async function MenuPage() {
  const rows = await prisma.gogoasa.findMany({
    orderBy: { createdAt: "asc" },
  });

  const products: Product[] = rows.map((d) => ({
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

  return <MenuClient products={products} />;
}
