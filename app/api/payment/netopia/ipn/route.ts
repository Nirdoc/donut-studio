/**
 * IPN (Instant Payment Notification) — Netopia trimite un POST aici
 * după fiecare eveniment de plată.
 *
 * ⚠️  În development (localhost) Netopia nu poate ajunge la acest endpoint.
 *     Folosește ngrok: `ngrok http 3000` și setează
 *     NEXT_PUBLIC_BASE_URL la URL-ul public ngrok.
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendOrderConfirmation } from "@/lib/email";
import { NETOPIA_STATUS } from "@/lib/netopia";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[netopia/ipn] payload:", JSON.stringify(body, null, 2));

    const payment  = body.payment;
    const orderID  = (body.order?.orderID ?? payment?.orderID) as string | undefined;
    const status   = payment?.status as number | undefined;

    if (!orderID || status === undefined) {
      console.error("[netopia/ipn] missing orderID or status. order:", body.order, "payment:", payment);
      return NextResponse.json({ error: { code: "1", message: "Invalid payload" } }, { status: 400 });
    }

    const comanda = await prisma.comanda.findUnique({ where: { orderNumber: orderID } });

    if (!comanda) {
      // Răspundem OK ca Netopia să nu repete notificarea
      return NextResponse.json({ error: { code: "0", message: "Order not found, ignored" } });
    }

    if (status === NETOPIA_STATUS.CONFIRMED) {
      // Plată confirmată
      await prisma.comanda.update({
        where: { orderNumber: orderID },
        data:  { status: "PLATITA" },
      });

      // Trimitem email de confirmare
      try {
        await sendOrderConfirmation({
          orderNumber:   comanda.orderNumber,
          firstName:     comanda.firstName,
          email:         comanda.email,
          deliveryDate:  comanda.deliveryDate,
          deliveryTime:  comanda.deliveryTime,
          paymentMethod: "card",
          items:         comanda.items as Array<{ name: string; price: number; quantity: number }>,
          subtotal:      comanda.subtotal,
          deliveryFee:   comanda.deliveryFee,
          total:         comanda.total,
          billingName:   `${comanda.firstName} ${comanda.lastName}`,
          billingStreet: comanda.street,
          billingNumber: comanda.number,
          billingCity:   comanda.city,
          billingJudet:  comanda.judet,
          billingBloc:   comanda.bloc ?? null,
          hasDiffDelivery: comanda.hasDiffDelivery,
          deliveryStreet: comanda.delStreet  ?? undefined,
          deliveryNumber: comanda.delNumber  ?? undefined,
          deliveryCity:   comanda.delCity    ?? undefined,
          deliveryJudet:  comanda.delJudet   ?? undefined,
          deliveryBloc:   comanda.delBloc    ?? null,
        });
      } catch (emailErr) {
        console.error("[netopia/ipn] email failed:", emailErr);
      }
    } else {
      // Orice alt status (VOIDED, DECLINED, PENDING) → ANULAT
      await prisma.comanda.update({
        where: { orderNumber: orderID },
        data:  { status: "ANULAT" },
      });
    }

    // Netopia așteaptă întotdeauna acest răspuns
    return NextResponse.json({ error: { code: "0", message: "Confirmed" } });
  } catch (e) {
    console.error("[netopia/ipn]", e);
    return NextResponse.json({ error: { code: "1", message: String(e) } }, { status: 500 });
  }
}
