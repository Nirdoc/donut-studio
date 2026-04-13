import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const MAX_CAPACITY = 3;

// Public: GET /api/blocked-slots?date=YYYY-MM-DD
// Returns labels of slots unavailable for booking:
// — manually blocked by admin, OR
// — at full capacity (MAX_CAPACITY orders already placed).
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date") ?? "";
  if (!date) return NextResponse.json([]);

  const [blockedRows, orderRows] = await Promise.all([
    prisma.blockedSlot.findMany({ where: { date }, select: { timeSlot: true } }),
    prisma.comanda.findMany({
      where: { deliveryDate: date, status: { not: "ANULAT" } },
      select: { deliveryTime: true },
    }),
  ]);

  // Count orders per slot
  const countMap: Record<string, number> = {};
  for (const o of orderRows) {
    countMap[o.deliveryTime] = (countMap[o.deliveryTime] ?? 0) + 1;
  }

  const fullSlots = Object.entries(countMap)
    .filter(([, count]) => count >= MAX_CAPACITY)
    .map(([label]) => label);

  const unavailable = [...new Set([...blockedRows.map((b) => b.timeSlot), ...fullSlots])];
  return NextResponse.json(unavailable);
}
