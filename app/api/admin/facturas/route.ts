import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() ?? "";

    const where: Record<string, unknown> = {
      comanda: { paymentMethod: "card" },
    };
    if (q) {
      where.OR = [
        { facturaNumber: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
        { firstName: { contains: q, mode: "insensitive" } },
        { lastName: { contains: q, mode: "insensitive" } },
      ];
    }

    const facturas = await prisma.factura.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { comanda: { select: { orderNumber: true, status: true, paymentMethod: true } } },
    });

    return NextResponse.json(facturas);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Eroare.";
    return NextResponse.json({ error: msg }, { status: msg === "Unauthorized" ? 401 : 500 });
  }
}
