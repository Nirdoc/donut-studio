import PDFDocument from "pdfkit";
import path from "path";

const FONT_REGULAR = path.join(process.cwd(), "lib/fonts/Arial-Regular.ttf");
const FONT_BOLD    = path.join(process.cwd(), "lib/fonts/Arial-Bold.ttf");
const LOGO_PNG     = path.join(process.cwd(), "lib/fonts/logo.png");

const COMPANY = {
  name:    "AMERICAN BITE S.R.L.",
  cui:     "RO 36991079",
  regCom:  "J23/7328/2023",
  capital: "200 RON",
  address: "Str. Crinului, nr. 25L",
  sat:     "Sat Rosu, Localitate Chiajna",
  judet:   "ILFOV",
  tara:    "ROMANIA",
  bank:    "BANCA TRANSILVANIA",
  iban:    "RO86BTRLRONCRT0383442601",
  phone:   "0745018888",
  email:   "contact@donutstudio.ro",
  web:     "http://www.donutstudio.ro",
};

const TVA_RATE = 0.21;
const BRAND    = "#BC8157";
const BLACK    = "#1A1A1A";
const DGRAY    = "#444444";
const GRAY     = "#888888";
const LGRAY    = "#BBBBBB";
const BG_ALT   = "#F9F6F3";
const BG_BOX   = "#FBF8F5";

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

    doc.registerFont("Regular", FONT_REGULAR);
    doc.registerFont("Bold",    FONT_BOLD);

    const PAGE_W = 595.28;
    const PAGE_H = 841.89;
    const M      = 40;
    const BODY_W = PAGE_W - M * 2;

    const fmtDate = (d: Date) =>
      d.toLocaleDateString("ro-RO", { day: "2-digit", month: "2-digit", year: "numeric" });

    const dateStr = fmtDate(data.createdAt);

    // ── White page ───────────────────────────────────────────────────────────
    doc.rect(0, 0, PAGE_W, PAGE_H).fill("#FFFFFF");

    // ── Top accent bar ───────────────────────────────────────────────────────
    doc.rect(0, 0, PAGE_W, 4).fill(BRAND);

    // ── HEADER ───────────────────────────────────────────────────────────────
    const HDR_Y = 18;

    // Logo only — no company name beside it
    try { doc.image(LOGO_PNG, M, HDR_Y, { width: 72, height: 72 }); } catch { /* skip */ }

    // Invoice title block — right side (3 date rows)
    const TITLE_X = PAGE_W - M - 190;
    doc.rect(TITLE_X - 12, HDR_Y - 4, 206, 94).fill(BG_BOX);
    doc.rect(TITLE_X - 12, HDR_Y - 4, 4, 94).fill(BRAND);

    doc.font("Bold").fontSize(20).fill(BRAND)
      .text("FACTURĂ", TITLE_X, HDR_Y + 4, { width: 186 });
    doc.font("Bold").fontSize(11).fill(BLACK)
      .text(data.facturaNumber, TITLE_X, HDR_Y + 28, { width: 186 });
    doc.font("Regular").fontSize(8).fill(DGRAY)
      .text(`Data emitere:    ${dateStr}`, TITLE_X, HDR_Y + 46, { width: 186 })
      .text(`Data scadenta:  ${dateStr}`,  TITLE_X, HDR_Y + 58, { width: 186 })
      .text(`Data platii:       ${dateStr}`, TITLE_X, HDR_Y + 70, { width: 186 });

    // ── Divider ──────────────────────────────────────────────────────────────
    const DIV1_Y = HDR_Y + 94 + 8;
    doc.moveTo(M, DIV1_Y).lineTo(PAGE_W - M, DIV1_Y)
      .strokeColor(LGRAY).lineWidth(0.5).stroke();

    // ── TWO-COLUMN INFO ───────────────────────────────────────────────────────
    const COL_W   = BODY_W / 2 - 8;
    const LEFT_X  = M;
    const RIGHT_X = M + COL_W + 16;
    const INFO_Y  = DIV1_Y + 12;

    const kv = (x: number, y: number, key: string, val: string, w = COL_W): number => {
      const kw = doc.font("Bold").fontSize(8).widthOfString(key + " ");
      doc.font("Bold").fontSize(8).fill(BLACK).text(key, x, y, { continued: false });
      doc.font("Regular").fontSize(8).fill(DGRAY).text(val, x + kw, y, { width: w - kw });
      return y + 13;
    };
    const line = (x: number, y: number, txt: string, w = COL_W): number => {
      doc.font("Regular").fontSize(8).fill(DGRAY).text(txt, x, y, { width: w });
      return y + 13;
    };

    // ── Furnizor box ─────────────────────────────────────────────────────────
    doc.rect(LEFT_X, INFO_Y, COL_W, 14).fill(BLACK);
    doc.font("Bold").fontSize(7.5).fill("#FFFFFF")
      .text("FURNIZOR", LEFT_X + 8, INFO_Y + 3.5);

    let ly = INFO_Y + 20;
    doc.font("Bold").fontSize(11).fill(BLACK)
      .text(COMPANY.name, LEFT_X, ly, { width: COL_W });
    ly += 18;

    ly = kv(LEFT_X, ly, "CUI:", COMPANY.cui);
    ly = kv(LEFT_X, ly, "Reg. Com.:", COMPANY.regCom);
    ly = kv(LEFT_X, ly, "Capital social:", COMPANY.capital);
    ly = kv(LEFT_X, ly, "Adresa:", COMPANY.address);
    ly = line(LEFT_X, ly, COMPANY.sat);
    ly = kv(LEFT_X, ly, "Judet:", COMPANY.judet);
    ly = kv(LEFT_X, ly, "Tara:", COMPANY.tara);
    ly += 3;
    ly = line(LEFT_X, ly, COMPANY.bank);
    ly = line(LEFT_X, ly, COMPANY.iban);
    ly += 3;
    ly = kv(LEFT_X, ly, "Email:", COMPANY.email);
    ly = kv(LEFT_X, ly, "Telefon:", COMPANY.phone);
    kv(LEFT_X, ly, "Web:", COMPANY.web);

    // ── Client box ───────────────────────────────────────────────────────────
    doc.rect(RIGHT_X, INFO_Y, COL_W, 14).fill(BRAND);
    doc.font("Bold").fontSize(7.5).fill("#FFFFFF")
      .text("CLIENT", RIGHT_X + 8, INFO_Y + 3.5);

    const clientName = `${data.firstName} ${data.lastName}`.toUpperCase();
    const clientAddr = `${data.street}, Nr. ${data.number}` +
      (data.dwellingType === "bloc" && data.bloc
        ? `, Bl. ${data.bloc}${data.apartament ? `, Ap. ${data.apartament}` : ""}` : "");

    let ry = INFO_Y + 20;
    doc.font("Bold").fontSize(11).fill(BLACK)
      .text(clientName, RIGHT_X, ry, { width: COL_W });
    ry += 18;

    if (data.cui) { ry = kv(RIGHT_X, ry, "CUI Comp.:", data.cui); }
    ry = kv(RIGHT_X, ry, "Judet:", data.judet);
    ry = kv(RIGHT_X, ry, "Localitate:", data.city);
    ry = kv(RIGHT_X, ry, "Adresa:", clientAddr);
    ry = kv(RIGHT_X, ry, "Telefon:", data.phone);
    kv(RIGHT_X, ry, "Email:", data.email);

    // ── PRODUCTS TABLE ────────────────────────────────────────────────────────
    const TABLE_Y = Math.max(ly, ry) + 20;

    // Column positions:
    // Nr. | Denumire | U.M. | Cant. | Pret unitar (fara TVA) -Lei- | Valoare (fara TVA) -Lei- | TVA (21%)
    const C_NR      = M;
    const C_NAME    = M + 20;
    const C_UM      = M + BODY_W - 252;
    const C_QTY     = M + BODY_W - 220;
    const C_PRICE   = M + BODY_W - 186;   // "Pret unitar (fara TVA) -Lei-"
    const C_VALOARE = M + BODY_W - 112;   // "Valoare (fara TVA) -Lei-"
    const C_TVA     = M + BODY_W - 52;    // "TVA (21%)"
    const NAME_W    = C_UM - C_NAME - 4;

    // Header (height 33 for 3-line text)
    const HDR_H = 33;
    doc.rect(M, TABLE_Y, BODY_W, HDR_H).fill(BLACK);
    doc.font("Bold").fontSize(7).fill("#FFFFFF");
    const TH1 = TABLE_Y + 3;
    const TH2 = TABLE_Y + 12;
    const TH3 = TABLE_Y + 21;

    doc.text("Nr.",         C_NR,      TH1, { width: 18, align: "center" });
    doc.text("Denumire",    C_NAME,    TH1, { width: NAME_W });
    doc.text("U.M.",        C_UM,      TH1, { width: 28, align: "center" });
    doc.text("Cant.",       C_QTY,     TH1, { width: 32, align: "center" });

    // Three-line headers for price/value columns, two-line for TVA
    doc.text("Pret unitar",      C_PRICE,   TH1, { width: 72, align: "center" });
    doc.text("(fara TVA)",       C_PRICE,   TH2, { width: 72, align: "center" });
    doc.text("-Lei-",            C_PRICE,   TH3, { width: 72, align: "center" });

    doc.text("Valoare",          C_VALOARE, TH1, { width: 58, align: "center" });
    doc.text("(fara TVA)",       C_VALOARE, TH2, { width: 58, align: "center" });
    doc.text("-Lei-",            C_VALOARE, TH3, { width: 58, align: "center" });

    doc.text("TVA",              C_TVA,     TH1, { width: 52, align: "center" });
    doc.text("(21%)",            C_TVA,     TH2, { width: 52, align: "center" });
    doc.text("-Lei-",            C_TVA,     TH3, { width: 52, align: "center" });

    // Build rows: product items + transport (if any)
    type TableRow = { name: string; qty: number; priceNoTva: number; valNoTva: number; tvaAmt: number };
    const rows: TableRow[] = data.items.map((item) => {
      const pNoTva  = item.price / (1 + TVA_RATE);
      const vNoTva  = pNoTva * item.quantity;
      const tva     = item.price * item.quantity - vNoTva;
      return { name: item.name, qty: item.quantity, priceNoTva: pNoTva, valNoTva: vNoTva, tvaAmt: tva };
    });

    if (data.deliveryFee > 0) {
      const pNoTva = data.deliveryFee / (1 + TVA_RATE);
      rows.push({ name: "Servicii transport", qty: 1, priceNoTva: pNoTva, valNoTva: pNoTva, tvaAmt: data.deliveryFee - pNoTva });
    }

    let rowY = TABLE_Y + HDR_H;
    rows.forEach((row, i) => {
      const bg = i % 2 === 0 ? "#FFFFFF" : BG_ALT;
      doc.rect(M, rowY, BODY_W, 15).fill(bg);

      doc.font("Regular").fontSize(8).fill(DGRAY);
      doc.text(String(i + 1),                  C_NR,      rowY + 3.5, { width: 18,  align: "center" });
      doc.text(row.name,                        C_NAME,    rowY + 3.5, { width: NAME_W });
      doc.text("buc",                           C_UM,      rowY + 3.5, { width: 28,  align: "center" });
      doc.text(String(row.qty),                 C_QTY,     rowY + 3.5, { width: 32,  align: "center" });
      doc.text(row.priceNoTva.toFixed(2),       C_PRICE,   rowY + 3.5, { width: 72,  align: "center" });
      doc.text(row.valNoTva.toFixed(2),         C_VALOARE, rowY + 3.5, { width: 58,  align: "center" });
      doc.text(row.tvaAmt.toFixed(2),           C_TVA,     rowY + 3.5, { width: 52,  align: "center" });

      rowY += 15;
    });

    doc.moveTo(M, rowY).lineTo(PAGE_W - M, rowY)
      .strokeColor(LGRAY).lineWidth(0.5).stroke();

    // ── TOTALS ────────────────────────────────────────────────────────────────
    const TOT_X = PAGE_W - M - 220;
    const VAL_X = PAGE_W - M - 80;
    const VAL_W = 80;
    let totY = rowY + 12;

    const totRow = (label: string, value: string, bold = false) => {
      const f   = bold ? "Bold" : "Regular";
      const sz  = bold ? 10 : 8.5;
      const col = bold ? BLACK : DGRAY;
      doc.font(f).fontSize(sz).fill(col)
        .text(label, TOT_X, totY, { width: VAL_X - TOT_X - 8 });
      doc.font(f).fontSize(sz).fill(col)
        .text(value, VAL_X, totY, { width: VAL_W, align: "right" });
      totY += bold ? 16 : 14;
    };

    const totalValNoTva = rows.reduce((s, r) => s + r.valNoTva, 0);
    const totalTva      = rows.reduce((s, r) => s + r.tvaAmt, 0);

    totRow("Total valoare fara TVA:", `${totalValNoTva.toFixed(2)} lei`);
    totRow("TVA (21%):",              `${totalTva.toFixed(2)} lei`);

    totY += 2;
    doc.moveTo(TOT_X, totY).lineTo(PAGE_W - M, totY)
      .strokeColor(BRAND).lineWidth(1).stroke();
    totY += 6;

    doc.rect(TOT_X - 6, totY - 3, PAGE_W - M - TOT_X + 6, 22).fill(BG_BOX);
    doc.rect(TOT_X - 6, totY - 3, 3, 22).fill(BRAND);
    totRow("TOTAL:", `${data.total.toFixed(2)} Lei`, true);

    // ── FOOTER ───────────────────────────────────────────────────────────────
    const FOOT_Y = PAGE_H - 42;
    doc.rect(0, FOOT_Y - 8, PAGE_W, 1).fill(BRAND).opacity(0.3);
    doc.opacity(1);

    doc.font("Regular").fontSize(6.5).fill(GRAY)
      .text(
        "Factura circula fara semnatura si stampila cf. art.V, alin (2) din Ordonanta nr.17/2015 si art. 319 alin (29) din Legea nr. 227/2015 privind Codul fiscal.",
        M, FOOT_Y,
        { width: BODY_W, align: "center" },
      );

    doc.end();
  });
}
