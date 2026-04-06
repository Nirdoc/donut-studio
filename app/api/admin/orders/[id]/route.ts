import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { generateInvoicePdf } from "@/lib/pdf";
import { sendInvoiceEmail } from "@/lib/email";

async function nextFacturaNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const count = await prisma.factura.count();
  return `F-${year}-${String(count + 1).padStart(5, "0")}`;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin(req);
    const { id } = await params;
    const { status } = await req.json();

    const comanda = await prisma.comanda.update({
      where: { id },
      data: { status },
      include: { factura: true },
    });

    // When marked FINALIZAT → create Factura + send PDF invoice
    if (status === "FINALIZAT" && !comanda.factura) {
      const facturaNumber = await nextFacturaNumber();
      const items = comanda.items as Array<{ name: string; price: number; quantity: number }>;

      const factura = await prisma.factura.create({
        data: {
          facturaNumber,
          comandaId:   comanda.id,
          userId:      comanda.userId ?? undefined,
          firstName:   comanda.firstName,
          lastName:    comanda.lastName,
          email:       comanda.email,
          phone:       comanda.phone,
          cui:         comanda.cui,
          judet:       comanda.judet,
          city:        comanda.city,
          street:      comanda.street,
          number:      comanda.number,
          dwellingType: comanda.dwellingType,
          bloc:        comanda.bloc,
          subtotal:    comanda.subtotal,
          deliveryFee: comanda.deliveryFee,
          total:       comanda.total,
          items,
          emailed:     false,
        },
      });

      const invoiceData = {
        facturaNumber,
        orderNumber:  comanda.orderNumber,
        createdAt:    factura.createdAt,
        firstName:    comanda.firstName,
        lastName:     comanda.lastName,
        email:        comanda.email,
        phone:        comanda.phone,
        cui:          comanda.cui,
        judet:        comanda.judet,
        city:         comanda.city,
        street:       comanda.street,
        number:       comanda.number,
        dwellingType: comanda.dwellingType,
        bloc:         comanda.bloc,
        apartament:   comanda.apartament,
        items,
        subtotal:     comanda.subtotal,
        deliveryFee:  comanda.deliveryFee,
        total:        comanda.total,
      };

      try {
        console.log("[invoice] generating PDF for", facturaNumber);
        const pdf = await generateInvoicePdf(invoiceData);
        console.log("[invoice] PDF generated, size:", pdf.length);
        await sendInvoiceEmail(invoiceData, pdf);
        console.log("[invoice] email sent to", invoiceData.email);
        await prisma.factura.update({ where: { id: factura.id }, data: { emailed: true } });
        console.log("[invoice] factura marked emailed");
      } catch (emailErr) {
        console.error("[invoice] FAILED:", emailErr);
        return NextResponse.json({ ok: true, invoiceError: String(emailErr) });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Eroare.";
    return NextResponse.json({ error: msg }, { status: msg === "Unauthorized" ? 401 : 500 });
  }
}
