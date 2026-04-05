import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  if (!token) {
    return Response.redirect(`${base}/verify-email?status=invalid`);
  }

  try {
    const record = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!record) {
      return Response.redirect(`${base}/verify-email?status=invalid`);
    }

    if (record.expiresAt < new Date()) {
      await prisma.verificationToken.delete({ where: { token } });
      return Response.redirect(`${base}/verify-email?status=expired`);
    }

    await prisma.user.update({
      where: { id: record.userId },
      data: { verified: true },
    });

    await prisma.verificationToken.delete({ where: { token } });

    return Response.redirect(`${base}/verify-email?status=success`);
  } catch (err) {
    console.error("[verify]", err);
    return Response.redirect(`${base}/verify-email?status=error`);
  }
}
