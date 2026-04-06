import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAuth } from "@/lib/auth";
import { sendOrderConfirmation } from "@/lib/email";

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
      paymentMethod, deliveryFee, subtotal, total, items,
    } = body;

    let userId: string | undefined;
    try { userId = verifyAuth(req).id; } catch { /* guest */ }

    const orderNumber = await nextOrderNumber();

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
        delJudet:     differentDelivery ? deliveryAddr?.judet      : null,
        delCity:      differentDelivery ? deliveryAddr?.city       : null,
        delStreet:    differentDelivery ? deliveryAddr?.street     : null,
        delNumber:    differentDelivery ? deliveryAddr?.number     : null,
        delType:      differentDelivery ? deliveryAddr?.type       : null,
        delBloc:      differentDelivery ? deliveryAddr?.bloc       : null,
        delScara:     differentDelivery ? deliveryAddr?.scara      : null,
        delEtaj:      differentDelivery ? deliveryAddr?.etaj       : null,
        delApartament: differentDelivery ? deliveryAddr?.apartament : null,
        paymentMethod,
        deliveryFee,
        subtotal,
        total,
        items,
        status: "PENDING",
      },
    });

    // Send confirmation email
    try {
      await sendOrderConfirmation({
        orderNumber,
        firstName: contact.firstName,
        email:     contact.email,
        deliveryDate,
        deliveryTime,
        paymentMethod,
        items,
        subtotal,
        deliveryFee,
        total,
      });
    } catch (emailErr) {
      console.error("Confirmation email failed:", emailErr);
    }

    return NextResponse.json({ orderNumber }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Eroare internă." }, { status: 500 });
  }
}
