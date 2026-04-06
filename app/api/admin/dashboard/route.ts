import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);

    const now = new Date();
    const tod = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

    const today       = tod(now);
    const yesterday   = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
    const weekStart   = new Date(today); weekStart.setDate(weekStart.getDate() - 6);
    const prevWeekS   = new Date(today); prevWeekS.setDate(prevWeekS.getDate() - 13);
    const prevWeekE   = new Date(today); prevWeekE.setDate(prevWeekE.getDate() - 7);
    const monthStart  = new Date(today.getFullYear(), today.getMonth(), 1);
    const prevMonthS  = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const prevMonthE  = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59, 999);
    const thirtyAgo   = new Date(today); thirtyAgo.setDate(thirtyAgo.getDate() - 29);
    const ninetyAgo   = new Date(today); ninetyAgo.setDate(ninetyAgo.getDate() - 89);

    // ── Fetch all orders for last 90 days (for top products + slots)
    const recentOrders = await prisma.comanda.findMany({
      where: { createdAt: { gte: ninetyAgo } },
      select: {
        id: true, total: true, status: true, createdAt: true,
        paymentMethod: true, deliveryTime: true,
        items: true,
      },
      orderBy: { createdAt: "asc" },
    });

    const notCancelled = (o: { status: string }) => o.status !== "ANULAT" && o.status !== "PENDING_PAYMENT";

    const inRange = (d: Date, from: Date, to?: Date) =>
      d >= from && (!to || d < to);

    const rev = (orders: typeof recentOrders) =>
      orders.filter(notCancelled).reduce((s, o) => s + o.total, 0);

    const todayOrders    = recentOrders.filter(o => inRange(new Date(o.createdAt), today));
    const yesterdayOrds  = recentOrders.filter(o => inRange(new Date(o.createdAt), yesterday, today));
    const weekOrders     = recentOrders.filter(o => inRange(new Date(o.createdAt), weekStart));
    const prevWeekOrds   = recentOrders.filter(o => inRange(new Date(o.createdAt), prevWeekS, prevWeekE));
    const monthOrders    = recentOrders.filter(o => inRange(new Date(o.createdAt), monthStart));
    const prevMonthOrds  = recentOrders.filter(o => inRange(new Date(o.createdAt), prevMonthS, new Date(prevMonthE.getTime() + 1)));
    const thirtyOrders   = recentOrders.filter(o => inRange(new Date(o.createdAt), thirtyAgo));

    const avgVal = (orders: typeof recentOrders) => {
      const valid = orders.filter(notCancelled);
      return valid.length ? rev(valid) / valid.length : 0;
    };

    // Pending (all time)
    const pendingOrders = await prisma.comanda.count({
      where: { status: { in: ["PENDING", "PROCESSING"] } },
    });

    // Cancelled this month
    const cancelledMonth = monthOrders.filter(o => o.status === "ANULAT").length;

    // All-time totals
    const allTimeAgg = await prisma.comanda.aggregate({
      where: { status: { notIn: ["ANULAT", "PENDING_PAYMENT"] } },
      _count: { id: true },
      _sum: { total: true },
    });

    // Users
    const newUsersWeek = await prisma.user.count({ where: { createdAt: { gte: weekStart } } });
    const newUsersPrevWeek = await prisma.user.count({ where: { createdAt: { gte: prevWeekS, lt: prevWeekE } } });
    const totalUsers = await prisma.user.count();

    // ── Daily stats (30 days)
    const dailyMap: Record<string, { count: number; revenue: number }> = {};
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today); d.setDate(d.getDate() - i);
      dailyMap[d.toISOString().slice(0, 10)] = { count: 0, revenue: 0 };
    }
    for (const o of thirtyOrders) {
      const key = new Date(o.createdAt).toISOString().slice(0, 10);
      if (dailyMap[key]) {
        dailyMap[key].count += 1;
        if (notCancelled(o)) dailyMap[key].revenue += o.total;
      }
    }
    const dailyStats = Object.entries(dailyMap).map(([date, v]) => ({
      date,
      count: v.count,
      revenue: Math.round(v.revenue * 100) / 100,
    }));

    // ── Status breakdown (all time)
    const statusGroups = await prisma.comanda.groupBy({
      by: ["status"],
      _count: { status: true },
    });
    const statusBreakdown = statusGroups.map(g => ({
      status: g.status,
      count: g._count.status,
    }));

    // ── Payment breakdown (last 90 days)
    const paymentMap: Record<string, { count: number; revenue: number }> = {};
    for (const o of recentOrders.filter(notCancelled)) {
      const m = o.paymentMethod;
      if (!paymentMap[m]) paymentMap[m] = { count: 0, revenue: 0 };
      paymentMap[m].count += 1;
      paymentMap[m].revenue += o.total;
    }
    const paymentBreakdown = Object.entries(paymentMap).map(([method, v]) => ({
      method,
      count: v.count,
      revenue: Math.round(v.revenue * 100) / 100,
    }));

    // ── Top products (last 90 days, completed orders)
    const productMap: Record<string, { qty: number; revenue: number }> = {};
    for (const o of recentOrders.filter(notCancelled)) {
      const items = o.items as Array<{ name: string; price: number; quantity: number }>;
      for (const item of items) {
        if (!productMap[item.name]) productMap[item.name] = { qty: 0, revenue: 0 };
        productMap[item.name].qty += item.quantity;
        productMap[item.name].revenue += item.price * item.quantity;
      }
    }
    const topProducts = Object.entries(productMap)
      .map(([name, v]) => ({ name, qty: v.qty, revenue: Math.round(v.revenue * 100) / 100 }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 6);

    // ── Top delivery time slots (last 90 days)
    const slotMap: Record<string, number> = {};
    for (const o of recentOrders.filter(notCancelled)) {
      const slot = o.deliveryTime;
      slotMap[slot] = (slotMap[slot] ?? 0) + 1;
    }
    const topSlots = Object.entries(slotMap)
      .map(([slot, count]) => ({ slot, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const round2 = (n: number) => Math.round(n * 100) / 100;

    return NextResponse.json({
      kpis: {
        todayOrders:       todayOrders.length,
        todayRevenue:      round2(rev(todayOrders)),
        yesterdayOrders:   yesterdayOrds.length,
        yesterdayRevenue:  round2(rev(yesterdayOrds)),
        weekOrders:        weekOrders.length,
        weekRevenue:       round2(rev(weekOrders)),
        prevWeekOrders:    prevWeekOrds.length,
        prevWeekRevenue:   round2(rev(prevWeekOrds)),
        monthOrders:       monthOrders.length,
        monthRevenue:      round2(rev(monthOrders)),
        prevMonthRevenue:  round2(rev(prevMonthOrds)),
        avgOrderValue:     round2(avgVal(thirtyOrders)),
        prevAvgOrderValue: round2(avgVal(prevMonthOrds)),
        pendingOrders,
        cancelledMonth,
        newUsersWeek,
        newUsersPrevWeek,
        totalUsers,
        allTimeOrders:  allTimeAgg._count.id,
        allTimeRevenue: round2(allTimeAgg._sum.total ?? 0),
      },
      dailyStats,
      statusBreakdown,
      paymentBreakdown,
      topProducts,
      topSlots,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Eroare.";
    return NextResponse.json({ error: msg }, { status: msg === "Unauthorized" ? 401 : 500 });
  }
}
