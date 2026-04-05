import { NextRequest } from "next/server";
import crypto from "node:crypto";
import { prisma } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email?.trim()) {
      return Response.json({ error: "Email obligatoriu." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return Response.json(
        { error: "Nu există niciun cont cu această adresă de email." },
        { status: 404 }
      );
    }

    // Delete any existing reset token for this user
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordResetToken.create({
      data: { token, userId: user.id, expiresAt },
    });

    try {
      await sendPasswordResetEmail(user.email, user.name, token);
    } catch (emailErr) {
      console.error("[forgot-password] email send failed:", emailErr);
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("[forgot-password]", err);
    return Response.json({ error: "Eroare internă. Încearcă din nou." }, { status: 500 });
  }
}
