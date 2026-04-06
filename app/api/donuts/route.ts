import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const donuts = await prisma.gogoasa.findMany({
      where: { available: true },
      orderBy: { createdAt: "asc" },
    });
    return Response.json({ donuts });
  } catch (err) {
    console.error("[donuts GET]", err);
    return Response.json({ error: "Eroare internă." }, { status: 500 });
  }
}
