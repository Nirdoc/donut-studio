import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { id } = verifyAuth(req);
    const addresses = await prisma.address.findMany({
      where: { userId: id },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(addresses);
  } catch (e) {
    console.error("[addresses GET]", e);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { id } = verifyAuth(req);
    const body = await req.json();
    const { label, addrType, judet, city, street, number, type, bloc, scara, etaj, apartament } = body;

    const address = await prisma.address.create({
      data: {
        userId: id,
        label:      label      || "Adresă",
        addrType:   addrType   || "billing",
        judet,
        city,
        street,
        number,
        type:       type       || "casa",
        bloc:       bloc       || null,
        scara:      scara      || null,
        etaj:       etaj       || null,
        apartament: apartament || null,
      },
    });
    return NextResponse.json(address, { status: 201 });
  } catch (e) {
    console.error("[addresses POST]", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
