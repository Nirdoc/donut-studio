import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { prisma } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name?.trim() || !email?.trim() || !password) {
      return Response.json(
        { error: "Toate câmpurile sunt obligatorii." },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email)) {
      return Response.json(
        { error: "Adresă de email invalidă." },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return Response.json(
        { error: "Parola trebuie să aibă minim 6 caractere." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
    if (existing) {
      return Response.json(
        { error: "Există deja un cont cu această adresă de email." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        passwordHash,
      },
    });

    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: { token, userId: user.id, expiresAt },
    });

    try {
      await sendVerificationEmail(user.email, user.name, token);
    } catch (emailErr) {
      // Log SMTP errors but don't fail the request — user + token are saved,
      // admin can see the error, user can request a new email later.
      console.error("[register] email send failed:", emailErr);
    }

    return Response.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[register]", err);
    return Response.json(
      { error: "Eroare internă. Încearcă din nou." },
      { status: 500 }
    );
  }
}
