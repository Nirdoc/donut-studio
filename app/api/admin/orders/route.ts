import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() ?? "";
    const status = searchParams.get("status") ?? "";

    const where: Record<string, unknown> = {};
    if (q) {
      where.OR = [
        { orderNumber: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
        { firstName: { contains: q, mode: "insensitive" } },
        { lastName: { contains: q, mode: "insensitive" } },
      ];
    }
    if (status) where.status = status;

    const orders = await prisma.comanda.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { factura: { select: { facturaNumber: true, emailed: true } } },
    });

    return NextResponse.json(orders);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Eroare.";
    return NextResponse.json({ error: msg }, { status: msg === "Unauthorized" ? 401 : 500 });
  }
}
