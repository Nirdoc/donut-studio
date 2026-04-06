import PDFDocument from "pdfkit";
import path from "path";

const FONT_REGULAR = path.join(process.cwd(), "lib/fonts/Arial-Regular.ttf");
const FONT_BOLD    = path.join(process.cwd(), "lib/fonts/Arial-Bold.ttf");

// Donut Studio company details
const COMPANY = {
  name:    "DONUT STUDIO S.R.L.",
  cui:     "RO 00000000",
  regCom:  "J40/0000/2024",
  address: "Piata Victoriei, Nr. 1",
  city:    "Bucuresti, Sector 1",
  county:  "ILFOV",
  bank:    "Banca Transilvania",
  iban:    "RO00BTRLEURCRT0000000000",
  phone:   "0745 018 888",
  email:   "contact@donutstudio.ro",
};

export interface InvoiceData {
  facturaNumber: string;
  orderNumber: string;
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cui?: string | null;
  judet: string;
  city: string;
  street: string;
  number: string;
  dwellingType: string;
  bloc?: string | null;
  apartament?: string | null;
  items: Array<{ name: string; price: number; quantity: number }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export function generateInvoicePdf(data: InvoiceData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 0,
      info: { Title: `Factura ${data.facturaNumber}`, Author: "Donut Studio" },
    });

    const chunks: Buffer[] = [];
    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end",  () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // ── Register fonts ────────────────────────────────────
    doc.registerFont("Regular", FONT_REGULAR);
    doc.registerFont("Bold",    FONT_BOLD);

    const PAGE_W = 595.28;
    const MARGIN = 40;
    const COL_W  = (PAGE_W - MARGIN * 2) / 2 - 10;

    const BRAND  = "#BC8157";
    const DARK   = "#1a0804";
    const GRAY   = "#666666";
    const LGRAY  = "#999999";
    const WHITE  = "#FFFFFF";

    // ── Header bar ────────────────────────────────────────
    doc.rect(0, 0, PAGE_W, 56).fill(BRAND);

    doc.font("Bold").fontSize(18).fill(WHITE)
      .text("DONUT STUDIO", MARGIN, 14, { continued: true })
      .font("Regular").fontSize(10).fill("rgba(255,255,255,0.75)")
      .text("  |  Artizan Pastry", { baseline: "middle" });

    doc.font("Bold").fontSize(13).fill(WHITE)
      .text("FACTURA", 0, 18, { align: "right", width: PAGE_W - MARGIN });

    doc.font("Regular").fontSize(9).fill("rgba(255,255,255,0.80)")
      .text(data.facturaNumber, 0, 33, { align: "right", width: PAGE_W - MARGIN });

    // ── Date row ──────────────────────────────────────────
    const dateY = 68;
    const fmtDate = (d: Date) =>
      d.toLocaleDateString("ro-RO", { day: "2-digit", month: "2-digit", year: "numeric" });

    doc.rect(MARGIN, dateY, PAGE_W - MARGIN * 2, 22).fill("#f9f1ea");

    doc.font("Regular").fontSize(8).fill(GRAY)
      .text(`Data emiterii: `, MARGIN + 8, dateY + 7, { continued: true })
      .font("Bold").text(fmtDate(data.createdAt), { continued: true })
      .font("Regular").text(`     Comanda: `, { continued: true })
      .font("Bold").text(data.orderNumber);

    // ── Two-column block: Furnizor | Client ───────────────
    const blockY = dateY + 32;
    const LEFT_X  = MARGIN;
    const RIGHT_X = MARGIN + COL_W + 20;

    // Column headers
    doc.rect(LEFT_X, blockY, COL_W, 18).fill(DARK);
    doc.rect(RIGHT_X, blockY, COL_W, 18).fill(DARK);

    doc.font("Bold").fontSize(8).fill(WHITE)
      .text("FURNIZOR", LEFT_X + 8, blockY + 5)
      .text("CLIENT",   RIGHT_X + 8, blockY + 5);

    // Column content
    const infoY = blockY + 24;
    const lineH = 13;

    function labelVal(x: number, y: number, label: string, value: string): number {
      doc.font("Regular").fontSize(8).fill(LGRAY)
        .text(label, x, y, { width: 55, continued: false });
      doc.font("Regular").fontSize(8).fill(DARK)
        .text(value, x + 58, y, { width: COL_W - 66 });
      return y + lineH;
    }

    // Furnizor
    let ly = infoY;
    doc.font("Bold").fontSize(9).fill(DARK).text(COMPANY.name, LEFT_X, ly); ly += lineH + 2;
    ly = labelVal(LEFT_X, ly, "CUI:",      COMPANY.cui);
    ly = labelVal(LEFT_X, ly, "Reg. Com.:", COMPANY.regCom);
    ly = labelVal(LEFT_X, ly, "Adresa:",   COMPANY.address);
    ly = labelVal(LEFT_X, ly, "Localit.:", COMPANY.city);
    ly = labelVal(LEFT_X, ly, "Judet:",    COMPANY.county);
    ly = labelVal(LEFT_X, ly, "IBAN:",     COMPANY.iban);
    ly = labelVal(LEFT_X, ly, "Banca:",    COMPANY.bank);
    ly = labelVal(LEFT_X, ly, "Tel:",      COMPANY.phone);
    labelVal(LEFT_X, ly, "Email:",   COMPANY.email);

    // Client
    const clientName = `${data.firstName} ${data.lastName}`.toUpperCase();
    const clientAddr1 = `${data.street}, Nr. ${data.number}` +
      (data.dwellingType === "bloc" && data.bloc
        ? `, Bl. ${data.bloc}${data.apartament ? `, Ap. ${data.apartament}` : ""}`
        : "");

    let ry = infoY;
    doc.font("Bold").fontSize(9).fill(DARK).text(clientName, RIGHT_X, ry); ry += lineH + 2;
    if (data.cui) { ry = labelVal(RIGHT_X, ry, "CUI:", data.cui); }
    ry = labelVal(RIGHT_X, ry, "Judet:",   data.judet);
    ry = labelVal(RIGHT_X, ry, "Localit.:", data.city);
    ry = labelVal(RIGHT_X, ry, "Adresa:",  clientAddr1);
    ry = labelVal(RIGHT_X, ry, "Tel:",     data.phone);
    labelVal(RIGHT_X, ry, "Email:",  data.email);

    // Divider after columns
    const tableY = Math.max(ly, ry) + 24;

    // ── Products table ────────────────────────────────────
    // Column positions
    const C_NR    = MARGIN;
    const C_NAME  = MARGIN + 24;
    const C_UM    = PAGE_W - MARGIN - 200;
    const C_QTY   = PAGE_W - MARGIN - 160;
    const C_PRICE = PAGE_W - MARGIN - 110;
    const C_TVA   = PAGE_W - MARGIN - 56;
    const C_TOTAL = PAGE_W - MARGIN - 4;

    // Table header
    doc.rect(MARGIN, tableY, PAGE_W - MARGIN * 2, 18).fill(DARK);
    doc.font("Bold").fontSize(7.5).fill(WHITE);

    const thY = tableY + 5;
    doc.text("Nr.",        C_NR,    thY, { width: 20,  align: "center" });
    doc.text("Denumire",   C_NAME,  thY, { width: 130 });
    doc.text("UM",         C_UM,    thY, { width: 36,  align: "center" });
    doc.text("Cant.",      C_QTY,   thY, { width: 44,  align: "right" });
    doc.text("Pret (lei)", C_PRICE, thY, { width: 50,  align: "right" });
    doc.text("TVA",        C_TVA,   thY, { width: 50,  align: "right" });
    doc.text("Total (lei)", C_TOTAL, thY, { width: 60,  align: "right" });

    // Table rows
    const TVA_RATE = 0.19;
    let rowY = tableY + 18;

    data.items.forEach((item, i) => {
      const bg = i % 2 === 0 ? "#FFFFFF" : "#fdf7f2";
      doc.rect(MARGIN, rowY, PAGE_W - MARGIN * 2, 16).fill(bg);

      const priceNoTva = item.price / (1 + TVA_RATE);
      const tvaAmt     = item.price - priceNoTva;
      const lineTotal  = item.price * item.quantity;

      doc.font("Regular").fontSize(8).fill(DARK);
      doc.text(String(i + 1),               C_NR,    rowY + 4, { width: 20,  align: "center" });
      doc.text(item.name,                    C_NAME,  rowY + 4, { width: 130 });
      doc.text("buc",                        C_UM,    rowY + 4, { width: 36,  align: "center" });
      doc.text(String(item.quantity),        C_QTY,   rowY + 4, { width: 44,  align: "right" });
      doc.text(priceNoTva.toFixed(2),        C_PRICE, rowY + 4, { width: 50,  align: "right" });
      doc.text(`19% / ${(tvaAmt * item.quantity).toFixed(2)}`, C_TVA, rowY + 4, { width: 50, align: "right" });
      doc.text(lineTotal.toFixed(2),         C_TOTAL, rowY + 4, { width: 60,  align: "right" });

      rowY += 16;
    });

    // Delivery fee row (if any)
    if (data.deliveryFee > 0) {
      const bg = data.items.length % 2 === 0 ? "#FFFFFF" : "#fdf7f2";
      doc.rect(MARGIN, rowY, PAGE_W - MARGIN * 2, 16).fill(bg);

      const priceNoTva = data.deliveryFee / (1 + TVA_RATE);
      const tvaAmt     = data.deliveryFee - priceNoTva;

      doc.font("Regular").fontSize(8).fill(DARK);
      doc.text(String(data.items.length + 1), C_NR,    rowY + 4, { width: 20,  align: "center" });
      doc.text("Taxa de livrare",             C_NAME,  rowY + 4, { width: 130 });
      doc.text("buc",                         C_UM,    rowY + 4, { width: 36,  align: "center" });
      doc.text("1",                           C_QTY,   rowY + 4, { width: 44,  align: "right" });
      doc.text(priceNoTva.toFixed(2),         C_PRICE, rowY + 4, { width: 50,  align: "right" });
      doc.text(`19% / ${tvaAmt.toFixed(2)}`,  C_TVA,   rowY + 4, { width: 50,  align: "right" });
      doc.text(data.deliveryFee.toFixed(2),   C_TOTAL, rowY + 4, { width: 60,  align: "right" });

      rowY += 16;
    }

    // Table bottom border
    doc.moveTo(MARGIN, rowY).lineTo(PAGE_W - MARGIN, rowY)
      .strokeColor("#cccccc").lineWidth(0.5).stroke();

    // ── Totals block ──────────────────────────────────────
    const TOT_X = PAGE_W - MARGIN - 200;
    const TOT_W = 200;
    let totY = rowY + 10;

    const tvaTotal = data.total - data.total / (1 + TVA_RATE);
    const baseTotal = data.total - tvaTotal;

    const totRow = (label: string, value: string, bold = false) => {
      doc.font(bold ? "Bold" : "Regular").fontSize(9)
        .fill(bold ? DARK : GRAY)
        .text(label, TOT_X, totY, { width: 110 })
        .text(value, TOT_X + 110, totY, { width: TOT_W - 110, align: "right" });
      totY += 14;
    };

    totRow("Subtotal fara TVA:", `${baseTotal.toFixed(2)} lei`);
    totRow("TVA (19%):",         `${tvaTotal.toFixed(2)} lei`);
    if (data.deliveryFee > 0) {
      totRow("Taxa livrare:", `${data.deliveryFee.toFixed(2)} lei`);
    }

    totY += 2;
    doc.moveTo(TOT_X, totY).lineTo(PAGE_W - MARGIN, totY)
      .strokeColor(BRAND).lineWidth(1).stroke();
    totY += 6;

    // TOTAL row with background
    doc.rect(TOT_X - 4, totY - 2, TOT_W + 8, 20).fill("#f9f1ea");
    doc.font("Bold").fontSize(11).fill(BRAND)
      .text("TOTAL:", TOT_X, totY + 2, { width: 110 })
      .text(`${data.total.toFixed(2)} Lei`, TOT_X + 110, totY + 2, { width: TOT_W - 110, align: "right" });

    // ── Footer ────────────────────────────────────────────
    const footY = 800;
    doc.moveTo(MARGIN, footY).lineTo(PAGE_W - MARGIN, footY)
      .strokeColor("#dddddd").lineWidth(0.5).stroke();

    doc.font("Regular").fontSize(7.5).fill(LGRAY)
      .text(
        "Factura este valabila fara semnatura si stampila conform art. 4, alin (2) din Ordonanta nr. 17/2015.",
        MARGIN, footY + 8,
        { width: PAGE_W - MARGIN * 2, align: "center" }
      );

    doc.font("Regular").fontSize(7).fill(LGRAY)
      .text(
        `Donut Studio S.R.L.  |  ${COMPANY.email}  |  ${COMPANY.phone}  |  ${COMPANY.address}, ${COMPANY.city}`,
        MARGIN, footY + 20,
        { width: PAGE_W - MARGIN * 2, align: "center" }
      );

    doc.end();
  });
}
