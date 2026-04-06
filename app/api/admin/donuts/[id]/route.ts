import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try { requireAdmin(req); } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Error";
    return Response.json({ error: msg }, { status: msg === "Forbidden" ? 403 : 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();

    const existing = await prisma.gogoasa.findUnique({ where: { id } });
    if (!existing) return Response.json({ error: "Gogoașa nu există." }, { status: 404 });

    const data: Record<string, unknown> = {};
    const fields = ["name", "slug", "image", "description", "category"] as const;
    for (const f of fields) if (body[f] !== undefined) data[f] = typeof body[f] === "string" ? body[f].trim() : body[f];

    if (body.price !== undefined) data.price = Number(body.price);
    if (body.calories !== undefined) data.calories = Number(body.calories);
    if (body.available !== undefined) data.available = body.available;
    if (Array.isArray(body.ingredients)) data.ingredients = body.ingredients;
    if (Array.isArray(body.allergens)) data.allergens = body.allergens;

    const numFields = ["kcalServing","fatServing","carbsServing","proteinServing","kcal100g","fat100g","carbs100g","protein100g"] as const;
    for (const f of numFields) if (body[f] !== undefined) data[f] = Number(body[f]);

    const donut = await prisma.gogoasa.update({ where: { id }, data });
    return Response.json({ donut });
  } catch (err) {
    console.error("[admin/donuts PUT]", err);
    return Response.json({ error: "Eroare internă." }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try { requireAdmin(req); } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Error";
    return Response.json({ error: msg }, { status: msg === "Forbidden" ? 403 : 401 });
  }

  try {
    const { id } = await params;
    const existing = await prisma.gogoasa.findUnique({ where: { id } });
    if (!existing) return Response.json({ error: "Gogoașa nu există." }, { status: 404 });

    await prisma.gogoasa.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (err) {
    console.error("[admin/donuts DELETE]", err);
    return Response.json({ error: "Eroare internă." }, { status: 500 });
  }
}
