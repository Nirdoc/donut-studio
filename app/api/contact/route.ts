import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const subjectLabels: Record<string, string> = {
  comanda: "Comandă specială",
  eveniment: "Eveniment / Catering",
  colaborare: "Colaborare / Parteneriat",
  feedback: "Feedback",
  altele: "Altele",
};

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Câmpuri lipsă." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: "ene.cdr@gmail.com",
    replyTo: email,
    subject: `[Donut Studio Contact] ${subjectLabels[subject] ?? subject} — ${name}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#fef9f5;border-radius:16px;overflow:hidden;border:1px solid #e8d5c0;">
        <div style="background:#BC8157;padding:24px 32px;">
          <p style="margin:0;color:#fff;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;font-weight:600;">Donut Studio · Mesaj nou</p>
        </div>
        <div style="padding:32px;">
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr><td style="padding:8px 0;color:#9a6540;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;width:110px;">De la</td><td style="padding:8px 0;color:#1a0804;font-size:14px;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#9a6540;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">Email</td><td style="padding:8px 0;font-size:14px;"><a href="mailto:${email}" style="color:#BC8157;text-decoration:none;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#9a6540;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">Subiect</td><td style="padding:8px 0;color:#1a0804;font-size:14px;">${subjectLabels[subject] ?? subject}</td></tr>
          </table>
          <div style="background:#fff8f3;border-left:3px solid #BC8157;border-radius:8px;padding:20px 24px;">
            <p style="margin:0;color:#1a0804;font-size:14px;line-height:1.7;white-space:pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
          </div>
          <p style="margin:24px 0 0;color:#9a7060;font-size:12px;">Răspunde direct la acest email pentru a contacta ${name}.</p>
        </div>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
