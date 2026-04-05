import nodemailer from "nodemailer";

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendPasswordResetEmail(
  email: string,
  name: string,
  token: string
) {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const link = `${base}/reset-password?token=${token}`;

  const transporter = createTransporter();

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? "Donut Studio <noreply@donutstudio.ro>",
    to: email,
    subject: "Resetează parola — Donut Studio",
    html: `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#160a04;font-family:Inter,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#160a04;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0"
          style="background:#1e0e05;border:1px solid rgba(188,129,87,0.25);border-radius:20px;overflow:hidden;max-width:560px;">

          <tr>
            <td style="background:#BC8157;padding:28px 40px;text-align:center;">
              <p style="margin:0;color:#fff;font-size:26px;font-weight:800;letter-spacing:0.5px;">🍩 Donut Studio</p>
            </td>
          </tr>

          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 12px;color:#f0ddc8;font-size:22px;font-weight:700;">
                Bună, ${name}!
              </h2>
              <p style="margin:0 0 8px;color:rgba(240,221,200,0.80);font-size:15px;line-height:1.7;">
                Am primit o solicitare de resetare a parolei pentru contul tău de la <strong style="color:#D4956A;">Donut Studio</strong>.
              </p>
              <p style="margin:0 0 32px;color:rgba(240,221,200,0.80);font-size:15px;line-height:1.7;">
                Apasă butonul de mai jos pentru a-ți seta o parolă nouă:
              </p>

              <a href="${link}"
                style="display:inline-block;background:#BC8157;color:#fff;text-decoration:none;
                       padding:15px 40px;border-radius:50px;font-weight:700;font-size:15px;
                       letter-spacing:0.3px;">
                🔑 Resetează parola
              </a>

              <p style="margin:32px 0 0;color:rgba(240,221,200,0.40);font-size:12px;line-height:1.7;">
                Linkul este valabil <strong style="color:rgba(240,221,200,0.55);">1 oră</strong>.<br>
                Dacă nu ai solicitat resetarea parolei, poți ignora în siguranță acest email.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 40px;border-top:1px solid rgba(188,129,87,0.12);text-align:center;">
              <p style="margin:0;color:rgba(240,221,200,0.28);font-size:11px;">
                © ${new Date().getFullYear()} Donut Studio · Piața Victoriei, București
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  });
}

export async function sendVerificationEmail(
  email: string,
  name: string,
  token: string
) {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const link = `${base}/api/auth/verify?token=${token}`;

  const transporter = createTransporter();

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? "Donut Studio <noreply@donutstudio.ro>",
    to: email,
    subject: "Confirmă adresa de email — Donut Studio",
    html: `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#160a04;font-family:Inter,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#160a04;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0"
          style="background:#1e0e05;border:1px solid rgba(188,129,87,0.25);border-radius:20px;overflow:hidden;max-width:560px;">

          <tr>
            <td style="background:#BC8157;padding:28px 40px;text-align:center;">
              <p style="margin:0;color:#fff;font-size:26px;font-weight:800;letter-spacing:0.5px;">🍩 Donut Studio</p>
            </td>
          </tr>

          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 12px;color:#f0ddc8;font-size:22px;font-weight:700;">
                Bună, ${name}!
              </h2>
              <p style="margin:0 0 8px;color:rgba(240,221,200,0.80);font-size:15px;line-height:1.7;">
                Mulțumim că ți-ai creat un cont la <strong style="color:#D4956A;">Donut Studio</strong>.
              </p>
              <p style="margin:0 0 32px;color:rgba(240,221,200,0.80);font-size:15px;line-height:1.7;">
                Un singur pas mai rămâne — confirmă adresa de email apăsând butonul de mai jos:
              </p>

              <a href="${link}"
                style="display:inline-block;background:#BC8157;color:#fff;text-decoration:none;
                       padding:15px 40px;border-radius:50px;font-weight:700;font-size:15px;
                       letter-spacing:0.3px;">
                ✉ Confirmă adresa de email
              </a>

              <p style="margin:32px 0 0;color:rgba(240,221,200,0.40);font-size:12px;line-height:1.7;">
                Linkul este valabil <strong style="color:rgba(240,221,200,0.55);">24 de ore</strong>.<br>
                Dacă nu ai creat un cont, poți ignora în siguranță acest email.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 40px;border-top:1px solid rgba(188,129,87,0.12);text-align:center;">
              <p style="margin:0;color:rgba(240,221,200,0.28);font-size:11px;">
                © ${new Date().getFullYear()} Donut Studio · Piața Victoriei, București
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  });
}
