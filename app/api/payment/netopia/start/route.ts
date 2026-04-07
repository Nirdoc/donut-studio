import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAuth } from "@/lib/auth";
import { initiateNetopiaPayment } from "@/lib/netopia";

async function nextOrderNumber(): Promise<string> {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const count = await prisma.comanda.count();
  return `DS-${today}-${String(count + 1).padStart(4, "0")}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      deliveryDate, deliveryTime,
      contact, billingAddr, differentDelivery, deliveryAddr,
      deliveryFee, subtotal, total, items,
      browserData,
    } = body;

    let userId: string | undefined;
    try { userId = verifyAuth(req).id; } catch { /* guest */ }

    const orderNumber = await nextOrderNumber();
    const baseUrl    = process.env.NEXT_PUBLIC_BASE_URL    ?? "http://localhost:3000";
    const ipnBaseUrl = process.env.NETOPIA_IPN_BASE_URL   ?? baseUrl;

    // Creăm comanda cu status PENDING_PAYMENT
    await prisma.comanda.create({
      data: {
        orderNumber,
        userId,
        deliveryDate,
        deliveryTime,
        firstName:    contact.firstName,
        lastName:     contact.lastName,
        email:        contact.email,
        phone:        contact.phone,
        cui:          contact.cui || null,
        judet:        billingAddr.judet,
        city:         billingAddr.city,
        street:       billingAddr.street,
        number:       billingAddr.number,
        dwellingType: billingAddr.type,
        bloc:         billingAddr.bloc || null,
        scara:        billingAddr.scara || null,
        etaj:         billingAddr.etaj || null,
        apartament:   billingAddr.apartament || null,
        hasDiffDelivery: !!differentDelivery,
        delJudet:     differentDelivery ? deliveryAddr?.judet       : null,
        delCity:      differentDelivery ? deliveryAddr?.city        : null,
        delStreet:    differentDelivery ? deliveryAddr?.street      : null,
        delNumber:    differentDelivery ? deliveryAddr?.number      : null,
        delType:      differentDelivery ? deliveryAddr?.type        : null,
        delBloc:      differentDelivery ? deliveryAddr?.bloc        : null,
        delScara:     differentDelivery ? deliveryAddr?.scara       : null,
        delEtaj:      differentDelivery ? deliveryAddr?.etaj        : null,
        delApartament: differentDelivery ? deliveryAddr?.apartament : null,
        paymentMethod: "card",
        deliveryFee,
        subtotal,
        total,
        items,
        status: "PENDING_PAYMENT",
      },
    });

    // Apelăm Netopia
    const address = `${billingAddr.street} nr. ${billingAddr.number}${billingAddr.bloc ? `, bl. ${billingAddr.bloc}` : ""}`;

    const result = await initiateNetopiaPayment({
      orderID:     orderNumber,
      amount:      total,
      description: `Comanda ${orderNumber} - Donut Studio`,
      billing: {
        email:     contact.email,
        phone:     contact.phone,
        firstName: contact.firstName,
        lastName:  contact.lastName,
        city:      billingAddr.city || billingAddr.judet,
        state:     billingAddr.judet,
        postalCode: "000000",
        details:   address,
      },
      products: items.map((item: { name: string; id: string; price: number; quantity: number }) => ({
        name:     item.name,
        code:     item.id,
        category: "physical",
        price:    item.price,
        vat:      21,
        quantity: item.quantity,
      })),
      confirmUrl: `${ipnBaseUrl}/api/payment/netopia/ipn`,
      returnUrl:  `${baseUrl}/order-success`,
      browser:    browserData,
    });

    return NextResponse.json({ paymentUrl: result.paymentUrl, orderNumber });
  } catch (e) {
    console.error("[netopia/start]", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
