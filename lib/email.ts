import nodemailer from "nodemailer";
import type { InvoiceData } from "./pdf";

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

// ─── Shared email shell ────────────────────────────────────────────────────────

function emailShell(body: string) {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="ro">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#160a04;font-family:Inter,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#160a04;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0"
        style="background:#1e0e05;border:1px solid rgba(188,129,87,0.25);border-radius:20px;overflow:hidden;max-width:560px;">
        <tr>
          <td style="background:#BC8157;padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#fff;font-size:24px;font-weight:800;">🍩 Donut Studio</p>
          </td>
        </tr>
        <tr><td style="padding:36px 40px;">${body}</td></tr>
        <tr>
          <td style="padding:18px 40px;border-top:1px solid rgba(188,129,87,0.12);text-align:center;">
            <p style="margin:0;color:rgba(240,221,200,0.28);font-size:11px;">
              © ${year} Donut Studio · Piața Victoriei, București
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export interface OrderEmailData {
  orderNumber: string; firstName: string; email: string;
  deliveryDate: string; deliveryTime: string; paymentMethod: string;
  items: Array<{ name: string; price: number; quantity: number }>;
  subtotal: number; deliveryFee: number; total: number;
  // Billing address
  billingName: string;
  billingStreet: string; billingNumber: string;
  billingCity: string; billingJudet: string;
  billingBloc?: string | null;
  // Delivery address (may differ)
  hasDiffDelivery: boolean;
  deliveryStreet?: string; deliveryNumber?: string;
  deliveryCity?: string; deliveryJudet?: string;
  deliveryBloc?: string | null;
}

export async function sendOrderConfirmation(data: OrderEmailData) {
  const payLabel =
    data.paymentMethod === "card"   ? "Plată cu cardul" :
    data.paymentMethod === "pickup" ? "Ridicare din magazin" : "Numerar la livrare";

  const itemsHtml = data.items.map((i) =>
    `<tr>
      <td style="padding:7px 0;color:rgba(240,221,200,0.85);font-size:14px;">${i.name}</td>
      <td style="padding:7px 0;color:rgba(240,221,200,0.55);font-size:14px;text-align:center;">×${i.quantity}</td>
      <td style="padding:7px 0;color:#D4956A;font-size:14px;text-align:right;font-weight:600;">${(i.price * i.quantity).toFixed(2)} lei</td>
    </tr>`
  ).join("");

  const invoiceNote = data.paymentMethod === "card"
    ? `<p style="margin:24px 0 0;color:rgba(240,221,200,0.55);font-size:13px;">Factura în format PDF va fi trimisă pe email după ce comanda este <strong style="color:#D4956A;">finalizată</strong>.</p>`
    : `<p style="margin:24px 0 0;color:rgba(240,221,200,0.55);font-size:13px;">Vei primi un email de confirmare după ce comanda ta este <strong style="color:#D4956A;">finalizată</strong>.</p>`;

  const body = `
    <h2 style="margin:0 0 6px;color:#f0ddc8;font-size:20px;font-weight:700;">Comandă confirmată!</h2>
    <p style="margin:0 0 24px;color:rgba(240,221,200,0.65);font-size:14px;">
      Bună, <strong style="color:#D4956A;">${data.firstName}</strong>! Comanda ta a fost plasată cu succes.
    </p>
    <div style="background:rgba(188,129,87,0.10);border:1px solid rgba(188,129,87,0.20);border-radius:12px;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0 0 4px;color:rgba(240,221,200,0.45);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Număr comandă</p>
      <p style="margin:0;color:#BC8157;font-size:18px;font-weight:800;">${data.orderNumber}</p>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;border-collapse:collapse;">
      <tr>
        <td style="padding:7px 0;border-bottom:1px solid rgba(188,129,87,0.12);color:rgba(240,221,200,0.45);font-size:12px;text-transform:uppercase;">Produs</td>
        <td style="padding:7px 0;border-bottom:1px solid rgba(188,129,87,0.12);color:rgba(240,221,200,0.45);font-size:12px;text-align:center;">Cant.</td>
        <td style="padding:7px 0;border-bottom:1px solid rgba(188,129,87,0.12);color:rgba(240,221,200,0.45);font-size:12px;text-align:right;">Total</td>
      </tr>
      ${itemsHtml}
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="color:rgba(240,221,200,0.50);font-size:13px;padding:4px 0;">Subtotal</td>
        <td style="color:rgba(240,221,200,0.70);font-size:13px;text-align:right;padding:4px 0;">${data.subtotal.toFixed(2)} lei</td>
      </tr>
      <tr>
        <td style="color:rgba(240,221,200,0.50);font-size:13px;padding:4px 0;">Livrare</td>
        <td style="font-size:13px;text-align:right;padding:4px 0;${data.deliveryFee === 0 ? "color:#4ade80;" : "color:rgba(240,221,200,0.70);"}">
          ${data.deliveryFee === 0 ? "Gratuită" : data.deliveryFee.toFixed(2) + " lei"}
        </td>
      </tr>
      <tr style="border-top:1px solid rgba(188,129,87,0.15);">
        <td style="color:#f0ddc8;font-size:15px;font-weight:700;padding:10px 0 4px;">TOTAL</td>
        <td style="color:#BC8157;font-size:15px;font-weight:800;text-align:right;padding:10px 0 4px;">${data.total.toFixed(2)} lei</td>
      </tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <tr>
        <td width="50%" style="padding-right:8px;">
          <div style="background:rgba(188,129,87,0.08);border:1px solid rgba(188,129,87,0.15);border-radius:10px;padding:12px 14px;">
            <p style="margin:0 0 2px;color:rgba(240,221,200,0.40);font-size:10px;text-transform:uppercase;">Data livrării</p>
            <p style="margin:0;color:#f0ddc8;font-size:13px;font-weight:600;">${data.deliveryDate}</p>
            <p style="margin:2px 0 0;color:rgba(240,221,200,0.55);font-size:12px;">${data.deliveryTime}</p>
          </div>
        </td>
        <td width="50%" style="padding-left:8px;">
          <div style="background:rgba(188,129,87,0.08);border:1px solid rgba(188,129,87,0.15);border-radius:10px;padding:12px 14px;">
            <p style="margin:0 0 2px;color:rgba(240,221,200,0.40);font-size:10px;text-transform:uppercase;">Metodă plată</p>
            <p style="margin:0;color:#f0ddc8;font-size:13px;font-weight:600;">${payLabel}</p>
          </div>
        </td>
      </tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td width="50%" style="padding-right:8px;vertical-align:top;">
          <div style="background:rgba(188,129,87,0.08);border:1px solid rgba(188,129,87,0.15);border-radius:10px;padding:12px 14px;">
            <p style="margin:0 0 6px;color:rgba(240,221,200,0.40);font-size:10px;text-transform:uppercase;letter-spacing:0.08em;">Adresă facturare</p>
            <p style="margin:0;color:#f0ddc8;font-size:13px;font-weight:600;">${data.billingName}</p>
            <p style="margin:3px 0 0;color:rgba(240,221,200,0.65);font-size:12px;line-height:1.5;">
              ${data.billingStreet}, Nr. ${data.billingNumber}${data.billingBloc ? `, Bl. ${data.billingBloc}` : ""}<br>
              ${data.billingCity}, ${data.billingJudet}
            </p>
          </div>
        </td>
        <td width="50%" style="padding-left:8px;vertical-align:top;">
          <div style="background:rgba(188,129,87,0.08);border:1px solid rgba(188,129,87,0.15);border-radius:10px;padding:12px 14px;">
            <p style="margin:0 0 6px;color:rgba(240,221,200,0.40);font-size:10px;text-transform:uppercase;letter-spacing:0.08em;">Adresă livrare</p>
            ${data.hasDiffDelivery
              ? `<p style="margin:0;color:rgba(240,221,200,0.65);font-size:12px;line-height:1.5;">
                  ${data.deliveryStreet}, Nr. ${data.deliveryNumber}${data.deliveryBloc ? `, Bl. ${data.deliveryBloc}` : ""}<br>
                  ${data.deliveryCity}, ${data.deliveryJudet}
                </p>`
              : `<p style="margin:0;color:rgba(240,221,200,0.65);font-size:12px;line-height:1.5;">Aceeași cu adresa de facturare</p>`
            }
          </div>
        </td>
      </tr>
    </table>
    ${invoiceNote}
  `;

  const transporter = createTransporter();
  const from = process.env.SMTP_FROM ?? "Donut Studio <noreply@donutstudio.ro>";
  const html = emailShell(body);

  await Promise.all([
    transporter.sendMail({
      from,
      to: data.email,
      subject: `Comandă confirmată ${data.orderNumber} — Donut Studio`,
      html,
    }),
    transporter.sendMail({
      from,
      to: "ene.cdr@gmail.com",
      subject: `Comandă nouă ${data.orderNumber} — Donut Studio`,
      html,
    }),
  ]);
}

export async function sendInvoiceEmail(invoiceData: InvoiceData, pdfBuffer: Buffer) {
  const body = `
    <h2 style="margin:0 0 6px;color:#f0ddc8;font-size:20px;font-weight:700;">Factura ta este gata!</h2>
    <p style="margin:0 0 24px;color:rgba(240,221,200,0.65);font-size:14px;">
      Bună, <strong style="color:#D4956A;">${invoiceData.firstName}</strong>!
      Găsești factura pentru comanda <strong style="color:#BC8157;">${invoiceData.orderNumber}</strong> atașată la acest email.
    </p>
    <div style="background:rgba(188,129,87,0.10);border:1px solid rgba(188,129,87,0.20);border-radius:12px;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0 0 4px;color:rgba(240,221,200,0.45);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Factură</p>
      <p style="margin:0;color:#BC8157;font-size:18px;font-weight:800;">${invoiceData.facturaNumber}</p>
    </div>
    ${invoiceData.cui ? `<p style="margin:0 0 8px;color:rgba(240,221,200,0.55);font-size:13px;">CUI Companie: <strong style="color:#D4956A;">${invoiceData.cui}</strong></p>` : ""}
    <p style="margin:0;color:rgba(240,221,200,0.55);font-size:13px;">
      Total: <strong style="color:#D4956A;">${invoiceData.total.toFixed(2)} lei</strong>
    </p>
  `;

  await createTransporter().sendMail({
    from: process.env.SMTP_FROM ?? "Donut Studio <noreply@donutstudio.ro>",
    to: invoiceData.email,
    subject: `Factură ${invoiceData.facturaNumber} — Donut Studio`,
    html: emailShell(body),
    attachments: [{
      filename: `Factura-${invoiceData.facturaNumber}.pdf`,
      content: pdfBuffer,
      contentType: "application/pdf",
    }],
  });
}

export async function sendOrderCompletedEmail(data: {
  firstName: string;
  email: string;
  orderNumber: string;
  paymentMethod: string;
}) {
  const payLabel =
    data.paymentMethod === "pickup" ? "Ridicare din magazin" : "Numerar la livrare";

  const body = `
    <h2 style="margin:0 0 6px;color:#f0ddc8;font-size:20px;font-weight:700;">Comanda ta a fost finalizată! 🎉</h2>
    <p style="margin:0 0 24px;color:rgba(240,221,200,0.65);font-size:14px;">
      Bună, <strong style="color:#D4956A;">${data.firstName}</strong>!
      Comanda ta a fost finalizată cu succes. Îți mulțumim că ai ales <strong style="color:#BC8157;">Donut Studio</strong>!
    </p>
    <div style="background:rgba(188,129,87,0.10);border:1px solid rgba(188,129,87,0.20);border-radius:12px;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0 0 4px;color:rgba(240,221,200,0.45);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Număr comandă</p>
      <p style="margin:0;color:#BC8157;font-size:18px;font-weight:800;">${data.orderNumber}</p>
      <p style="margin:6px 0 0;color:rgba(240,221,200,0.45);font-size:12px;">${payLabel}</p>
    </div>
    <p style="margin:0 0 16px;color:rgba(240,221,200,0.65);font-size:14px;line-height:1.7;">
      Sperăm că gogoșile noastre ți-au adus un zâmbet pe față! 🍩<br>
      Ne-ar face plăcere să te revedem curând.
    </p>
    <p style="margin:0;color:rgba(240,221,200,0.40);font-size:13px;line-height:1.7;">
      Dacă ai întrebări sau nelămuriri, ne poți contacta la
      <a href="mailto:contact@donutstudio.ro" style="color:#BC8157;">contact@donutstudio.ro</a>
      sau la <a href="tel:0745018888" style="color:#BC8157;">0745.018.888</a>.
    </p>
  `;

  const transporter = createTransporter();
  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? "Donut Studio <noreply@donutstudio.ro>",
    to: data.email,
    subject: `Comanda ${data.orderNumber} a fost finalizată — Donut Studio`,
    html: emailShell(body),
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
