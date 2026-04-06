import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { generateInvoicePdf } from "@/lib/pdf";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin(req);

    const { id } = await params;

    const factura = await prisma.factura.findUnique({
      where: { id },
      include: {
        comanda: {
          select: {
            orderNumber: true,
            phone: true,
            cui: true,
          },
        },
      },
    });

    if (!factura) {
      return NextResponse.json({ error: "Factură negăsită." }, { status: 404 });
    }

    const pdf = await generateInvoicePdf({
      facturaNumber: factura.facturaNumber,
      orderNumber:   factura.comanda.orderNumber,
      createdAt:     factura.createdAt,
      firstName:     factura.firstName,
      lastName:      factura.lastName,
      email:         factura.email,
      phone:         factura.comanda.phone,
      cui:           factura.comanda.cui ?? null,
      judet:         factura.judet,
      city:          factura.city,
      street:        factura.street,
      number:        factura.number,
      dwellingType:  factura.dwellingType,
      bloc:          factura.bloc ?? null,
      apartament:    null,
      items:         factura.items as Array<{ name: string; price: number; quantity: number }>,
      subtotal:      factura.subtotal,
      deliveryFee:   factura.deliveryFee,
      total:         factura.total,
    });

    return new NextResponse(pdf, {
      status: 200,
      headers: {
        "Content-Type":        "application/pdf",
        "Content-Disposition": `attachment; filename="${factura.facturaNumber}.pdf"`,
        "Content-Length":      String(pdf.length),
      },
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Eroare.";
    return NextResponse.json({ error: msg }, { status: msg === "Unauthorized" ? 401 : 500 });
  }
}
