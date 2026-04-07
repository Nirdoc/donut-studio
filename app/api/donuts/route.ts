import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const idsParam = req.nextUrl.searchParams.get("ids");
    const where = idsParam ? { id: { in: idsParam.split(",") } } : {};
    const donuts = await prisma.gogoasa.findMany({
      where,
      orderBy: { createdAt: "asc" },
    });
    if (idsParam) {
      // Return flat array with just id + available when filtering by IDs
      return Response.json(donuts.map((d) => ({ id: d.id, available: d.available })));
    }
    return Response.json({ donuts });
  } catch (err) {
    console.error("[donuts GET]", err);
    return Response.json({ error: "Eroare internă." }, { status: 500 });
  }
}
