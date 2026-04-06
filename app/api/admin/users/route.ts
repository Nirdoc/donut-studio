import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
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

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Error";
    return Response.json({ error: msg }, { status: msg === "Forbidden" ? 403 : 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() ?? "";

    const users = await prisma.user.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
      select: USER_SELECT,
      orderBy: { createdAt: "desc" },
    });

    return Response.json({ users });
  } catch (err) {
    console.error("[admin/users GET]", err);
    return Response.json({ error: "Eroare internă." }, { status: 500 });
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    requireAdmin(req);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Error";
    return Response.json({ error: msg }, { status: msg === "Forbidden" ? 403 : 401 });
  }

  try {
    const { name, email, password, role, verified } = await req.json();

    if (!name?.trim() || !email?.trim() || !password) {
      return Response.json({ error: "Câmpurile name, email și password sunt obligatorii." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return Response.json({ error: "Email invalid." }, { status: 400 });
    }
    if (password.length < 6) {
      return Response.json({ error: "Parola trebuie să aibă minim 6 caractere." }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (existing) {
      return Response.json({ error: "Există deja un cont cu acest email." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        passwordHash,
        role: role === "ADMIN" ? "ADMIN" : "USER",
        verified: verified === true,
      },
      select: USER_SELECT,
    });

    return Response.json({ user }, { status: 201 });
  } catch (err) {
    console.error("[admin/users POST]", err);
    return Response.json({ error: "Eroare internă." }, { status: 500 });
  }
}
