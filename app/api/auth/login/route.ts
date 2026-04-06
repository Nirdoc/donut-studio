import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email?.trim() || !password) {
      return Response.json(
        { error: "Completează toate câmpurile." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return Response.json(
        { error: "Email sau parolă incorectă." },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return Response.json(
        { error: "Email sau parolă incorectă." },
        { status: 401 }
      );
    }

    if (!user.verified) {
      return Response.json(
        {
          error:
            "Contul nu a fost verificat. Verifică emailul pentru linkul de confirmare.",
          unverified: true,
        },
        { status: 403 }
      );
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("[login] JWT_SECRET not set");
      return Response.json(
        { error: "Eroare de configurare server." },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      secret,
      { expiresIn: "30d" }
    );

    return Response.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("[login]", err);
    return Response.json(
      { error: "Eroare internă. Încearcă din nou." },
      { status: 500 }
    );
  }
}
