import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAuth } from "@/lib/auth";
import { sendOrderConfirmation } from "@/lib/email";

export async function GET(req: NextRequest) {
  try {
    const { id } = verifyAuth(req);
    const orders = await prisma.comanda.findMany({
      where: { userId: id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        orderNumber: true,
        createdAt: true,
        items: true,
        subtotal: true,
        deliveryFee: true,
        total: true,
        status: true,
        deliveryDate: true,
        deliveryTime: true,
        paymentMethod: true,
      },
    });
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

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
        status: "PROCESSING",
      },
    });

    // Send confirmation email
    try {
      await sendOrderConfirmation({
        orderNumber,
        firstName:    contact.firstName,
        email:        contact.email,
        deliveryDate,
        deliveryTime,
        paymentMethod,
        items,
        subtotal,
        deliveryFee,
        total,
        billingName:   `${contact.firstName} ${contact.lastName}`,
        billingStreet: billingAddr.street,
        billingNumber: billingAddr.number,
        billingCity:   billingAddr.city,
        billingJudet:  billingAddr.judet,
        billingBloc:   billingAddr.bloc || null,
        hasDiffDelivery: !!differentDelivery,
        deliveryStreet: differentDelivery ? deliveryAddr?.street  : undefined,
        deliveryNumber: differentDelivery ? deliveryAddr?.number  : undefined,
        deliveryCity:   differentDelivery ? deliveryAddr?.city    : undefined,
        deliveryJudet:  differentDelivery ? deliveryAddr?.judet   : undefined,
        deliveryBloc:   differentDelivery ? deliveryAddr?.bloc || null : undefined,
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
