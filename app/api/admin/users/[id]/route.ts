import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const USER_SELECT = {
  id: true,
  name: true,
  email: true,
  role: true,
  verified: true,
  createdAt: true,
};

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    requireAdmin(req);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Error";
    return Response.json({ error: msg }, { status: msg === "Forbidden" ? 403 : 401 });
  }

  try {
    const { id } = await params;
    const { name, email, role, verified } = await req.json();

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      return Response.json({ error: "Utilizatorul nu există." }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};
    if (name?.trim()) updateData.name = name.trim();
    if (email?.trim()) updateData.email = email.toLowerCase().trim();
    if (role === "ADMIN" || role === "USER") updateData.role = role;
    if (typeof verified === "boolean") updateData.verified = verified;

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: USER_SELECT,
    });

    return Response.json({ user });
  } catch (err) {
    console.error("[admin/users PUT]", err);
    return Response.json({ error: "Eroare internă." }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let callerId: string;
  try {
    const payload = requireAdmin(req);
    callerId = payload.id;
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Error";
    return Response.json({ error: msg }, { status: msg === "Forbidden" ? 403 : 401 });
  }

  try {
    const { id } = await params;

    if (id === callerId) {
      return Response.json({ error: "Nu îți poți șterge propriul cont." }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      return Response.json({ error: "Utilizatorul nu există." }, { status: 404 });
    }

    await prisma.user.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (err) {
    console.error("[admin/users DELETE]", err);
    return Response.json({ error: "Eroare internă." }, { status: 500 });
  }
}
