import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return Response.json({ error: "Date lipsă." }, { status: 400 });
    }
    if (password.length < 6) {
      return Response.json(
        { error: "Parola trebuie să aibă minim 6 caractere." },
        { status: 400 }
      );
    }

    const record = await prisma.passwordResetToken.findUnique({ where: { token } });

    if (!record) {
      return Response.json({ error: "Link invalid sau expirat." }, { status: 400 });
    }
    if (record.expiresAt < new Date()) {
      await prisma.passwordResetToken.delete({ where: { token } });
      return Response.json({ error: "Link-ul a expirat. Solicită unul nou." }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { id: record.userId },
      data: { passwordHash },
    });

    await prisma.passwordResetToken.delete({ where: { token } });

    return Response.json({ success: true });
  } catch (err) {
    console.error("[reset-password]", err);
    return Response.json({ error: "Eroare internă. Încearcă din nou." }, { status: 500 });
  }
}
