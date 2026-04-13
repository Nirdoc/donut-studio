import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const MAX_CAPACITY = 3;

const SLOT_LABELS = [
  "08:00 – 10:00",
  "10:00 – 12:00",
  "12:00 – 14:00",
  "14:00 – 16:00",
  "16:00 – 18:00",
  "18:00 – 20:00",
  "20:00 – 22:00",
];

// GET /api/admin/blocked-slots?date=YYYY-MM-DD
// Returns full slot info for all 7 slots on that date.
export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);
    const date = req.nextUrl.searchParams.get("date") ?? "";
    if (!date) return NextResponse.json({ error: "date required" }, { status: 400 });

    const [blockedRows, orderRows] = await Promise.all([
      prisma.blockedSlot.findMany({
        where: { date },
        select: { id: true, timeSlot: true },
      }),
      prisma.comanda.findMany({
        where: { deliveryDate: date, status: { not: "ANULAT" } },
        select: { deliveryTime: true, orderNumber: true, firstName: true, lastName: true },
      }),
    ]);

    const blockedMap = new Map(blockedRows.map((b) => [b.timeSlot, b.id]));

    // Group orders by timeSlot
    const orderMap = new Map<string, Array<{ orderNumber: string; firstName: string; lastName: string }>>();
    for (const o of orderRows) {
      if (!orderMap.has(o.deliveryTime)) orderMap.set(o.deliveryTime, []);
      orderMap.get(o.deliveryTime)!.push({ orderNumber: o.orderNumber, firstName: o.firstName, lastName: o.lastName });
    }

    const slots = SLOT_LABELS.map((label) => {
      const orders = orderMap.get(label) ?? [];
      return {
        label,
        blockedId: blockedMap.get(label) ?? null,
        orders,
        orderCount: orders.length,
        isFull: orders.length >= MAX_CAPACITY,
      };
    });

    return NextResponse.json({ slots, maxCapacity: MAX_CAPACITY });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Eroare.";
    return NextResponse.json({ error: msg }, { status: msg === "Unauthorized" ? 401 : 500 });
  }
}

// POST /api/admin/blocked-slots  { date, timeSlot }
export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req);
    const { date, timeSlot } = await req.json();
    if (!date || !timeSlot) {
      return NextResponse.json({ error: "date și timeSlot sunt obligatorii." }, { status: 400 });
    }

    const slot = await prisma.blockedSlot.create({ data: { date, timeSlot } });
    return NextResponse.json(slot, { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Eroare.";
    if (msg.includes("Unique constraint")) {
      return NextResponse.json({ error: "Intervalul este deja blocat." }, { status: 409 });
    }
    return NextResponse.json({ error: msg }, { status: msg === "Unauthorized" ? 401 : 500 });
  }
}
