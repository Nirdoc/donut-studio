import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try { requireAdmin(req); } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Error";
    return Response.json({ error: msg }, { status: msg === "Forbidden" ? 403 : 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() ?? "";

    const donuts = await prisma.gogoasa.findMany({
      where: search ? {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      } : undefined,
      orderBy: { createdAt: "asc" },
    });

    return Response.json({ donuts });
  } catch (err) {
    console.error("[admin/donuts GET]", err);
    return Response.json({ error: "Eroare internă." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try { requireAdmin(req); } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Error";
    return Response.json({ error: msg }, { status: msg === "Forbidden" ? 403 : 401 });
  }

  try {
    const body = await req.json();
    const { name, slug, price, image, description, ingredients, allergens,
            calories, category, available,
            kcalServing, fatServing, carbsServing, proteinServing,
            kcal100g, fat100g, carbs100g, protein100g } = body;

    if (!name?.trim() || !slug?.trim() || !price || !category) {
      return Response.json({ error: "Câmpurile name, slug, price și category sunt obligatorii." }, { status: 400 });
    }

    const existing = await prisma.gogoasa.findUnique({ where: { slug } });
    if (existing) return Response.json({ error: "Există deja o gogoașă cu acest slug." }, { status: 409 });

    const donut = await prisma.gogoasa.create({
      data: {
        name: name.trim(), slug: slug.trim(), price: Number(price),
        image: image?.trim() || "/donuts/placeholder.webp",
        description: description?.trim() || "",
        ingredients: Array.isArray(ingredients) ? ingredients : [],
        allergens: Array.isArray(allergens) ? allergens : [],
        calories: Number(calories) || 0,
        category,
        available: available !== false,
        kcalServing: Number(kcalServing) || 0, fatServing: Number(fatServing) || 0,
        carbsServing: Number(carbsServing) || 0, proteinServing: Number(proteinServing) || 0,
        kcal100g: Number(kcal100g) || 0, fat100g: Number(fat100g) || 0,
        carbs100g: Number(carbs100g) || 0, protein100g: Number(protein100g) || 0,
      },
    });

    return Response.json({ donut }, { status: 201 });
  } catch (err) {
    console.error("[admin/donuts POST]", err);
    return Response.json({ error: "Eroare internă." }, { status: 500 });
  }
}
