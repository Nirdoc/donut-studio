// npx tsx scripts/generate-presentation.ts

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const FONT_REGULAR = path.join(process.cwd(), "lib/fonts/Arial-Regular.ttf");
const FONT_BOLD    = path.join(process.cwd(), "lib/fonts/Arial-Bold.ttf");
const LOGO_PNG     = path.join(process.cwd(), "lib/fonts/logo.png");

const BRAND  = "#BC8157";
const BLACK  = "#1A1A1A";
const DGRAY  = "#444444";
const GRAY   = "#888888";
const LGRAY  = "#CCCCCC";
const WHITE  = "#FFFFFF";
const BG_WARM  = "#F9F5F0";

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const M      = 48;
const CONTENT_W = PAGE_W - M * 2;
const BOTTOM_MARGIN = 60;

function generatePdf(): Promise<void> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 0, autoFirstPage: false,
      info: { Title: "Donut Studio — Documentație Funcționalități", Author: "Donut Studio" } });

    const outPath = path.join(process.cwd(), "public", "donut-studio-prezentare.pdf");
    const stream  = fs.createWriteStream(outPath);
    doc.pipe(stream);

    // ─── font helpers ──────────────────────────────────────────────────────
    const reg  = (s: number) => doc.font(FONT_REGULAR).fontSize(s);
    const bold = (s: number) => doc.font(FONT_BOLD).fontSize(s);

    // ─── page management ───────────────────────────────────────────────────
    function addPage() {
      doc.addPage({ size: "A4", margin: 0 });
      // footer rule
      doc.save().moveTo(M, PAGE_H - 38).lineTo(PAGE_W - M, PAGE_H - 38)
        .strokeColor(LGRAY).lineWidth(0.4).stroke().restore();
      reg(7.5).fillColor(GRAY)
        .text("Donut Studio — Documentație funcționalități © 2026", M, PAGE_H - 28,
          { width: CONTENT_W, align: "center" });
      doc.y = M;
    }

    /** Add a new page only if less than `need` pts remain on the current page */
    function checkY(need = 60) {
      if (doc.y + need > PAGE_H - BOTTOM_MARGIN) addPage();
    }

    // ─── layout helpers ────────────────────────────────────────────────────

    function sectionTitle(title: string) {
      checkY(50);
      const y = doc.y;
      doc.save().rect(M, y, 4, 22).fill(BRAND).restore();
      bold(14).fillColor(BLACK).text(title, M + 14, y + 3, { width: CONTENT_W - 14 });
      doc.y = doc.y + 10;
    }

    function subTitle(title: string) {
      checkY(36);
      bold(10.5).fillColor(BRAND).text(title, M, doc.y, { width: CONTENT_W });
      doc.y = doc.y + 6;
    }

    function bodyText(text: string, indent = 0) {
      checkY(30);
      reg(9.5).fillColor(DGRAY).text(text, M + indent, doc.y, { width: CONTENT_W - indent, lineGap: 2 });
      doc.y = doc.y + 5;
    }

    function bullet(text: string, indent = 0) {
      checkY(20);
      const y = doc.y;
      doc.save().circle(M + 8 + indent, y + 4.5, 2).fill(BRAND).restore();
      reg(9.5).fillColor(DGRAY).text(text, M + 18 + indent, y, { width: CONTENT_W - 26 - indent, lineGap: 2 });
      doc.y = doc.y + 3;
    }

    function divider() {
      checkY(20);
      doc.save().moveTo(M, doc.y).lineTo(PAGE_W - M, doc.y)
        .strokeColor(LGRAY).lineWidth(0.4).stroke().restore();
      doc.y = doc.y + 12;
    }

    function spacer(h = 10) { doc.y = doc.y + h; }

    function infoBox(lines: string[]) {
      const lineH = 14;
      const boxH = lines.length * lineH + 16;
      checkY(boxH);
      const y = doc.y;
      doc.save().roundedRect(M, y, CONTENT_W, boxH, 6).fill(BG_WARM).restore();
      doc.save().roundedRect(M, y, 4, boxH, 3).fill(BRAND).restore();
      let cy = y + 8;
      lines.forEach(l => {
        reg(8.5).fillColor(DGRAY).text(l, M + 14, cy, { width: CONTENT_W - 22, lineBreak: false });
        cy += lineH;
      });
      doc.y = y + boxH + 6;
    }

    function tableHeader(headers: string[], colW: number[]) {
      checkY(40);
      const y = doc.y;
      doc.save().rect(M, y, CONTENT_W, 18).fill(BRAND).restore();
      let cx = M + 4;
      headers.forEach((h, i) => {
        bold(8.5).fillColor(WHITE).text(h, cx, y + 4, { width: colW[i] - 8, lineBreak: false });
        cx += colW[i];
      });
      doc.y = y + 18;
    }

    function tableRow(cells: string[], colW: number[], colors: string[], rowIdx: number) {
      checkY(18);
      const y = doc.y;
      const bg = rowIdx % 2 === 0 ? WHITE : BG_WARM;
      doc.save().rect(M, y, CONTENT_W, 16).fill(bg).restore();
      let cx = M + 4;
      cells.forEach((cell, i) => {
        if (i === 0) bold(8.5).fillColor(colors[0]);
        else reg(8.5).fillColor(colors[i] ?? GRAY);
        doc.text(cell, cx, y + 3.5, { width: colW[i] - 8, lineBreak: false });
        cx += colW[i];
      });
      doc.y = y + 16;
    }

    function badge(label: string, x: number, y: number, color: string) {
      const w = bold(7.5).widthOfString(label) + 12;
      doc.save().roundedRect(x, y, w, 14, 4).fill(color).restore();
      bold(7.5).fillColor(WHITE).text(label, x + 6, y + 3.5, { width: w - 12, lineBreak: false });
      return w;
    }

    // ══════════════════════════════════════════════════════════════════════
    // PAGE 1 — COVER
    // ══════════════════════════════════════════════════════════════════════
    doc.addPage({ size: "A4", margin: 0 });

    doc.rect(0, 0, PAGE_W, PAGE_H).fill("#160a04");
    doc.save().circle(PAGE_W / 2, 220, 260).fillOpacity(0.06).fill(BRAND).restore();
    doc.save().circle(PAGE_W / 2, 220, 180).fillOpacity(0.08).fill(BRAND).restore();
    doc.fillOpacity(1);

    if (fs.existsSync(LOGO_PNG)) {
      doc.image(LOGO_PNG, PAGE_W / 2 - 70, 110, { width: 140 });
    } else {
      bold(28).fillColor(BRAND).text("DONUT STUDIO", M, 130, { width: CONTENT_W, align: "center" });
    }

    bold(29).fillColor(WHITE).text("Documentație Funcționalități", M, 270, { width: CONTENT_W, align: "center" });
    reg(12).fillColor("#D4956A").text("Ghid complet pentru oaspeți, utilizatori autentificați și administratori",
      M, 310, { width: CONTENT_W, align: "center" });

    doc.save().moveTo(PAGE_W / 2 - 80, 342).lineTo(PAGE_W / 2 + 80, 342)
      .strokeColor(BRAND).lineWidth(1).stroke().restore();

    const pills = [
      { label: "Next.js 15", color: "#2d2d2d" },
      { label: "PostgreSQL", color: "#336791" },
      { label: "Prisma 7", color: "#0f172a" },
      { label: "Netopia Payments", color: "#1d4ed8" },
    ];
    let px = PAGE_W / 2 - 148;
    pills.forEach(p => {
      const w = bold(8).widthOfString(p.label) + 18;
      doc.save().roundedRect(px, 358, w, 20, 6).fill(p.color).restore();
      bold(8).fillColor(WHITE).text(p.label, px + 9, 363, { lineBreak: false });
      px += w + 8;
    });

    const boxes = [
      { num: "13", label: "Produse" },
      { num: "3", label: "Metode plată" },
      { num: "5", label: "Stări comandă" },
      { num: "4", label: "Emailuri auto" },
    ];
    const bw = (CONTENT_W - 24) / 4;
    boxes.forEach((b, i) => {
      const bx = M + i * (bw + 8);
      doc.save().roundedRect(bx, 406, bw, 68, 8).fillOpacity(0.12).fill(BRAND).restore();
      doc.save().roundedRect(bx, 406, bw, 68, 8).strokeColor(BRAND).lineWidth(0.5).fillOpacity(0).stroke().restore();
      doc.fillOpacity(1);
      bold(26).fillColor(BRAND).text(b.num, bx, 421, { width: bw, align: "center" });
      reg(9).fillColor(WHITE).fillOpacity(0.65).text(b.label, bx, 449, { width: bw, align: "center" });
      doc.fillOpacity(1);
    });

    reg(8).fillColor(WHITE).fillOpacity(0.28)
      .text("Donut Studio · Piața Victoriei, București · contact@donutstudio.ro · 0745.018.888",
        M, PAGE_H - 38, { width: CONTENT_W, align: "center" });
    doc.fillOpacity(1);

    // ══════════════════════════════════════════════════════════════════════
    // PAGE 2 — TABLE OF CONTENTS
    // ══════════════════════════════════════════════════════════════════════
    addPage();
    bold(20).fillColor(BLACK).text("Cuprins", M, M, { width: CONTENT_W });
    doc.y = M + 34;
    divider();

    const toc = [
      ["1.", "Prezentare generală & Technology Stack"],
      ["2.", "Schema bazei de date"],
      ["3.", "Pagini publice & Catalog produse"],
      ["4.", "Coșul de cumpărături"],
      ["5.", "Autentificare & Cont de utilizator"],
      ["6.", "Procesul de checkout — pas cu pas"],
      ["7.", "Metode de plată"],
      ["8.", "Adrese salvate"],
      ["9.", "Panoul de administrare"],
      ["10.", "Emailuri automate & Facturare"],
      ["11.", "Referință rapidă: Roluri & Stări comenzi"],
    ];

    toc.forEach(([num, label]) => {
      const y = doc.y;
      doc.save().moveTo(M + 20, y + 7).lineTo(PAGE_W - M - 4, y + 7)
        .strokeColor(LGRAY).lineWidth(0.3).dash(2, { space: 3 }).stroke().restore();
      bold(10).fillColor(BRAND).text(num, M, y, { width: 22, lineBreak: false });
      reg(10).fillColor(BLACK).text(label, M + 24, y, { lineBreak: false });
      doc.y = y + 22;
    });

    // ══════════════════════════════════════════════════════════════════════
    // SECTION 1 — OVERVIEW + STACK
    // ══════════════════════════════════════════════════════════════════════
    addPage();

    sectionTitle("1. Prezentare generală");
    bodyText(
      "Donut Studio este o platformă de e-commerce specializată în vânzarea și livrarea de gogoși artizanale premium în București și județul Ilfov. Permite clienților să răsfoiască catalogul, să adauge produse în coș, să finalizeze comenzi — autentificați sau ca oaspeți — și să achite prin mai multe metode de plată. Administratorii au acces la un panou complet de management al comenzilor, utilizatorilor și produselor."
    );
    spacer(4);
    bodyText("Livrare în toate sectoarele Bucureștiului și județul Ilfov. Comanda minimă: 16 gogoși. Program comenzi: luni–vineri.");
    spacer(10);
    divider();

    sectionTitle("2. Technology Stack");

    const stack: [string, string][] = [
      ["Next.js 15 (App Router)", "React Server Components + Client Components, ISR, Route Handlers"],
      ["TypeScript", "Tip-safe pe întreg proiectul (frontend + backend)"],
      ["Tailwind CSS v4", "Stilizare utility-first + CSS Variables pentru teme light/dark adaptivă"],
      ["Framer Motion", "Animații și tranziții fluide între pagini și componente UI"],
      ["Radix UI", "Componente accesibile (Dialog, etc.) conform standardelor WCAG"],
      ["Zustand + persist", "State management global cu persistență în localStorage (coș + auth)"],
      ["Prisma 7 ORM", "Adapter @prisma/adapter-neon pentru PostgreSQL serverless (Neon)"],
      ["PostgreSQL (Neon)", "Baza de date managed, serverless, cu conexiuni pooled"],
      ["JWT (jsonwebtoken)", "Autentificare stateless, token cu expirare 30 zile"],
      ["Netopia Payments v3", "Procesare plăți card online cu 3D Secure și IPN webhook"],
      ["Nodemailer (SMTP)", "Emailuri tranzacționale HTML (confirmare, factură, verificare)"],
      ["PDFKit", "Generare facturi fiscale PDF server-side"],
      ["Vercel", "Hosting Next.js optimizat cu Fluid Compute"],
      ["Lucide React", "Iconițe SVG consistente în toată interfața"],
    ];

    stack.forEach(([tech, desc], i) => {
      checkY(22);
      const y = doc.y;
      const bg = i % 2 === 0 ? BG_WARM : WHITE;
      doc.save().roundedRect(M, y, CONTENT_W, 20, 4).fill(bg).restore();
      bold(9).fillColor(BRAND).text(tech, M + 8, y + 5, { width: 155, lineBreak: false });
      reg(9).fillColor(DGRAY).text(desc, M + 170, y + 5, { width: CONTENT_W - 178, lineBreak: false });
      doc.y = y + 22;
    });

    // ══════════════════════════════════════════════════════════════════════
    // SECTION 2 — DATABASE SCHEMA
    // ══════════════════════════════════════════════════════════════════════
    addPage();
    sectionTitle("2. Schema bazei de date");
    bodyText("Baza de date PostgreSQL conține 5 tabele principale gestionate prin Prisma ORM:");
    spacer(8);

    const colW3 = [118, 130, CONTENT_W - 248];
    const hdr3 = ["Câmp", "Tip", "Descriere"];
    const rowColors = [BRAND, DGRAY, GRAY];

    // User
    subTitle("Tabel: User");
    tableHeader(hdr3, colW3);
    [
      ["id", "String (cuid)", "Identificator unic generat automat"],
      ["name", "String", "Numele complet"],
      ["email", "String (unique)", "Adresă email — folosită la autentificare"],
      ["password", "String", "Parolă hash-uită cu bcrypt"],
      ["role", "USER | ADMIN", "Rolul în platformă; implicit USER"],
      ["verified", "Boolean", "Email confirmat? Implicit false"],
      ["verifyToken", "String?", "Token verificare email (UUID, valabil 24h)"],
      ["resetToken", "String?", "Token resetare parolă (UUID, valabil 1h)"],
      ["createdAt", "DateTime", "Data creării contului"],
      ["addresses", "Address[]", "Relație 1:N — adresele salvate ale utilizatorului"],
      ["comenzi", "Comanda[]", "Relație 1:N — comenzile plasate"],
    ].forEach((r, i) => tableRow(r, colW3, rowColors, i));

    spacer(12);
    subTitle("Tabel: Address (adrese salvate)");
    tableHeader(hdr3, colW3);
    [
      ["id", "String (cuid)", "Identificator unic"],
      ["userId", "String", "FK → User.id (proprietarul adresei)"],
      ["label", "String", "Eticheta adresei (ex: Acasă, Birou)"],
      ["addrType", "String", "\"billing\" (facturare) sau \"delivery\" (livrare)"],
      ["judet / city", "String", "Județul și localitatea"],
      ["street / number", "String", "Strada și numărul"],
      ["type", "String", "Tipul locuinței: \"casa\" sau \"bloc\""],
      ["bloc / scara / etaj / apartament", "String?", "Câmpuri opționale pentru bloc"],
      ["createdAt", "DateTime", "Data salvării adresei"],
    ].forEach((r, i) => tableRow(r, colW3, rowColors, i));

    addPage();
    sectionTitle("2. Schema bazei de date (continuare)");

    subTitle("Tabel: Comanda");
    tableHeader(hdr3, colW3);
    [
      ["id", "String (cuid)", "Identificator intern unic"],
      ["orderNumber", "String (unique)", "Număr afișat clientului (ex: DS-20260408-0001)"],
      ["userId", "String?", "FK → User.id; NULL pentru comenzi guest"],
      ["status", "String", "PROCESSING | PENDING_PAYMENT | PLATITA | FINALIZAT | ANULAT"],
      ["firstName / lastName", "String", "Numele clientului"],
      ["email / phone", "String", "Date de contact client"],
      ["cui", "String?", "CUI firmă — opțional, pentru facturi B2B"],
      ["judet / city / street / number", "String", "Adresa de facturare"],
      ["dwellingType", "String", "casa sau bloc"],
      ["bloc / scara / etaj / apartament", "String?", "Date adiționale bloc"],
      ["hasDiffDelivery", "Boolean", "True dacă adresa livrare ≠ adresa facturare"],
      ["delJudet...delApartament", "String?", "Adresa de livrare (dacă diferă)"],
      ["deliveryDate / deliveryTime", "String", "Data și intervalul orar de livrare"],
      ["paymentMethod", "String", "cash | card | pickup"],
      ["subtotal / deliveryFee / total", "Float", "Valorile financiare (lei)"],
      ["items", "Json", "Array produse: [{ name, price, quantity }]"],
      ["createdAt", "DateTime", "Timestamp plasare comandă"],
      ["factura", "Factura?", "Relație 1:1 — factura fiscală asociată"],
    ].forEach((r, i) => tableRow(r, colW3, rowColors, i));

    spacer(12);
    subTitle("Tabel: Factura");
    tableHeader(hdr3, colW3);
    [
      ["id", "String (cuid)", "Identificator unic"],
      ["facturaNumber", "String (unique)", "Număr fiscal (ex: F-2026-00001)"],
      ["comandaId", "String (unique)", "FK → Comanda.id — relație 1:1"],
      ["userId", "String?", "FK → User.id — NULL pentru guest"],
      ["emailed", "Boolean", "A fost trimisă pe email? Implicit false"],
      ["firstName...items...total", "various", "Copie completă a datelor comenzii la emitere"],
      ["createdAt", "DateTime", "Data emiterii facturii"],
    ].forEach((r, i) => tableRow(r, colW3, rowColors, i));

    spacer(12);
    subTitle("Tabel: Gogoasa (produse)");
    tableHeader(hdr3, colW3);
    [
      ["id", "String (cuid)", "Identificator unic"],
      ["name / slug", "String", "Numele și slug-ul URL (unic, normalizat unicode)"],
      ["price", "Float", "Prețul per bucată (lei, include TVA 21%)"],
      ["image", "String", "Calea relativă la imaginea produsului"],
      ["description", "String", "Descrierea produsului"],
      ["ingredients / allergens", "String[]", "Liste cu ingrediente și alergeni"],
      ["calories", "Int", "Calorii per porție"],
      ["category", "String", "classic | fruity | premium"],
      ["available", "Boolean", "Disponibil pentru comandă? Implicit true"],
      ["kcalServing...protein100g", "Float", "8 câmpuri nutriționale (per porție și per 100g)"],
      ["createdAt", "DateTime", "Data adăugării în catalog"],
    ].forEach((r, i) => tableRow(r, colW3, rowColors, i));

    spacer(14);
    subTitle("Relații între tabele");
    [
      "User (1) ——→ (N) Address     — un utilizator poate salva mai multe adrese",
      "User (1) ——→ (N) Comanda     — un utilizator poate plasa mai multe comenzi",
      "Comanda (1) ——→ (0..1) Factura  — o comandă generează cel mult o factură fiscală",
      "User (0..1) ——→ (N) Factura  — un utilizator poate fi asociat mai multor facturi",
      "Comanda ← ——→ Gogoasa         — relație indirectă prin câmpul JSON items[]",
    ].forEach(r => bullet(r));

    spacer(6);
    infoBox([
      "Comenzile pot fi plasate și de utilizatori neautentificați (guest): câmpul userId din Comanda și Factura",
      "este NULL în acest caz. Coșul oaspeților este persistent în localStorage — rămâne activ chiar și după",
      "închiderea tab-ului sau browserului.",
    ]);

    // ══════════════════════════════════════════════════════════════════════
    // SECTION 3 — PUBLIC PAGES + CATALOG
    // ══════════════════════════════════════════════════════════════════════
    addPage();
    sectionTitle("3. Pagini publice");
    bodyText("Toate paginile de mai jos sunt accesibile fără autentificare:");
    spacer(8);

    const pages: [string, string, string][] = [
      ["/", "Pagina principală", "Hero animat, produse recomandate, secțiune brandstory, link la meniu și contact."],
      ["/menu", "Meniu complet", "Lista celor 13 gogoși. Filtrare pe categorie + căutare după nume/descriere."],
      ["/produs/[slug]", "Detalii produs", "Descriere, ingrediente, alergeni, tabel nutrițional complet, buton Adaugă în coș."],
      ["/povestea-noastra", "Povestea noastră", "Istoria brandului, misiunea și valorile companiei."],
      ["/galerie", "Galerie foto", "Galerie vizuală cu produsele și atelierul Donut Studio."],
      ["/evenimente", "Evenimente", "Informații despre comenzi pentru evenimente speciale și corporate."],
      ["/contact", "Contact", "Formular de contact, adresă fizică, hartă, telefon și email."],
      ["/termeni", "Termeni și condiții", "Termeni legali: comenzi, prețuri, livrare, anulare, alergeni, GDPR."],
      ["/politica-de-confidentialitate", "Politica de conf.", "GDPR — colectare date, drepturi utilizator, stocarea datelor."],
      ["/politica-cookie-uri", "Politica cookies", "Tipuri de cookies folosite și cum pot fi gestionate."],
      ["/politica-de-livrare", "Politica de livrare", "Zone de livrare, tarife, intervale orare disponibile."],
      ["/politica-de-retur", "Politica de retur", "Condiții de anulare și retur; produse perisabile, rambursare card."],
      ["/modalitati-de-plata", "Modalități de plată", "Detalii despre metodele acceptate: numerar, card online, ridicare."],
    ];

    pages.forEach(([url, name, desc], i) => {
      checkY(26);
      const y = doc.y;
      const bg = i % 2 === 0 ? BG_WARM : WHITE;
      doc.save().roundedRect(M, y, CONTENT_W, 22, 4).fill(bg).restore();
      bold(8.5).fillColor(BRAND).text(url, M + 8, y + 6, { width: 128, lineBreak: false });
      bold(9).fillColor(BLACK).text(name, M + 144, y + 6, { width: 110, lineBreak: false });
      reg(8.5).fillColor(GRAY).text(desc, M + 262, y + 6, { width: CONTENT_W - 270, lineBreak: false });
      doc.y = y + 24;
    });

    spacer(10);
    divider();
    sectionTitle("3b. Catalog produse");

    subTitle("Cele 13 gogoși disponibile");
    const donuts = [
      ["Double Chocolate", "classic"], ["Vanillian", "classic"], ["Oreo Dream", "classic"],
      ["Honey Buzz", "classic"], ["Coco Naughty", "classic"],
      ["Orange Blossom", "fruity"], ["Banana Fantasy", "fruity"],
      ["Blueberry Rush", "fruity"], ["Raspberry Blast", "fruity"],
      ["Almond Famous", "premium"], ["Pistachious", "premium"],
      ["Caramel Dash", "premium"], ["Coffeelicious", "premium"],
    ];
    const catColor: Record<string, string> = { classic: "#BC8157", fruity: "#e879a0", premium: "#7c3aed" };

    donuts.forEach((d, i) => {
      checkY(20);
      const col = i % 3;
      const colW2 = (CONTENT_W - 16) / 3;
      const dx = M + col * (colW2 + 8);
      const y = col === 0 ? doc.y : doc.y - (donuts[i - 1] ? 17 : 0);
      if (col === 0 && i > 0) { doc.y += 1; }
      if (col === 0) {
        checkY(20);
      }
      const rowY = col === 0 ? doc.y : doc.y;
      if (col === 0) {
        doc.save().roundedRect(M, rowY, CONTENT_W, 18, 4).fill(i % 6 < 3 ? BG_WARM : WHITE).restore();
      }
      const bw2 = badge(d[1], dx + 2, rowY + 2, catColor[d[1]]);
      reg(9).fillColor(DGRAY).text(d[0], dx + bw2 + 8, rowY + 4, { width: colW2 - bw2 - 10, lineBreak: false });
      if (col === 2 || i === donuts.length - 1) doc.y = rowY + 20;
    });

    spacer(10);
    subTitle("Funcționalități pagina produs");
    [
      "Imagine hero cu efect de parallax vizual",
      "Lista completă de ingrediente",
      "Alergeni evidențiați vizual",
      "Tabel nutrițional: per porție și per 100g (kcal, grăsimi, carbohidrați, proteine)",
      "Buton 'Adaugă în coș' — dezactivat cu mesaj 'Momentan indisponibil' dacă produsul e marcat ca unavailable",
      "Produse indisponibile afișate în grayscale cu badge 'Indisponibil' pe card și pe pagina de detalii",
      "Pagini generate static cu revalidare ISR la 60 de secunde",
    ].forEach(f => bullet(f));

    // ══════════════════════════════════════════════════════════════════════
    // SECTION 4 — CART
    // ══════════════════════════════════════════════════════════════════════
    addPage();
    sectionTitle("4. Coșul de cumpărături");

    const cartItems: [string, string][] = [
      ["Persistență cross-session", "Coșul este salvat în localStorage prin Zustand persist middleware — rămâne activ după închiderea browserului, atât pentru utilizatori autentificați cât și pentru oaspeți (guest)."],
      ["Drawer animat", "Se deschide din colțul dreapta-sus. Conține lista produselor, cantitățile și totalul calculat în timp real."],
      ["Ajustare cantitate", "Butoane + și − pentru fiecare produs. Cantitatea minimă este 1; scăderea sub 1 elimină produsul."],
      ["Ștergere produs", "Buton de eliminare individual pentru fiecare produs din coș."],
      ["Verificare disponibilitate live", "La click pe 'Finalizează comanda', se face un apel API care verifică disponibilitatea fiecărui produs în baza de date. Dacă un produs a devenit indisponibil între timp, utilizatorul vede lista produselor cu probleme și nu poate continua."],
      ["Counter în header", "Numărul total de produse din coș este afișat în timp real în iconița coșului din header."],
      ["Golire automată", "Coșul este golit automat după plasarea cu succes a comenzii."],
    ];

    cartItems.forEach(([label, desc]) => {
      checkY(30);
      const y = doc.y;
      bold(9.5).fillColor(BRAND).text(label + ": ", M + 14, y, { continued: true, lineBreak: false });
      reg(9.5).fillColor(DGRAY).text(desc, { width: CONTENT_W - 14 });
      doc.y = doc.y + 6;
    });

    spacer(8);
    divider();

    // ══════════════════════════════════════════════════════════════════════
    // SECTION 5 — AUTH
    // ══════════════════════════════════════════════════════════════════════
    sectionTitle("5. Autentificare & Cont de utilizator");

    subTitle("5.1 Înregistrare (/register)");
    ["Câmpuri: Nume complet, Email, Parolă (min. 6 caractere), Confirmare parolă.",
      "Validare client-side: câmpuri obligatorii, parole identice, lungime minimă.",
      "La submit: se trimite email de verificare cu link unic valabil 24 de ore.",
      "Contul nu este activat până la confirmarea email-ului (verified = false).",
      "Dacă email-ul există deja, se afișează eroare specifică.",
    ].forEach(s => bullet(s));

    spacer(6);
    subTitle("5.2 Autentificare (/login)");
    ["Câmpuri: Email și Parolă (cu buton toggle vizibilitate).",
      "Link 'Ai uitat parola?' pentru inițierea procesului de resetare.",
      "La autentificare reușită: token JWT stocat în Zustand + localStorage (expirare 30 zile).",
      "Datele utilizatorului (id, name, email, role) disponibile global în întreaga aplicație.",
      "Redirecționare automată la pagina principală după autentificare.",
    ].forEach(s => bullet(s));

    spacer(6);
    subTitle("5.3 Resetare parolă (/forgot-password → /reset-password)");
    ["Utilizatorul introduce email-ul și primește un link de resetare valabil 1 oră.",
      "Link-ul conține un token unic UUID stocat în baza de date cu câmp de expirare.",
      "Pe pagina de resetare: utilizatorul introduce noua parolă cu confirmare.",
      "Parola veche este înlocuită cu hash-ul noii parole. Token-ul este invalidat după utilizare.",
      "Dacă email-ul nu există în baza de date, nu se returnează eroare (securitate anti-enumeration).",
    ].forEach(s => bullet(s));

    spacer(6);
    subTitle("5.4 Verificare email (/verify-email)");
    bodyText(
      "La crearea contului se trimite automat un email cu link /api/auth/verify?token=.... Apăsarea link-ului marchează contul ca verified=true și redirecționează la login cu mesaj de confirmare. Link-ul expirat sau invalid afișează eroare.",
      14
    );

    spacer(6);
    subTitle("5.5 Pagina de cont (/account)");
    ["Informații cont: afișează numele, email-ul și data creării contului.",
      "Comenzile mele: lista completă a comenzilor proprii, paginată (5 per pagină) cu navigare prev/next.",
      "Fiecare comandă este expandabilă — arată produsele, adresele, metoda de plată, data livrării și totalul.",
      "Stări comenzi codificate color: În procesare (galben), Plătită (teal), Finalizat (verde), Anulată/Eșuată (roșu).",
      "Adresele mele: lista adreselor salvate, separate pe Facturare și Livrare, cu buton ștergere individual.",
      "Buton de delogare — șterge token-ul și starea din store și localStorage.",
    ].forEach(f => bullet(f));

    // ══════════════════════════════════════════════════════════════════════
    // SECTION 6 — CHECKOUT
    // ══════════════════════════════════════════════════════════════════════
    addPage();
    sectionTitle("6. Procesul de checkout — pas cu pas");
    bodyText("Checkout-ul este structurat în 3 pași, cu navigare înapoi/înainte și validare la fiecare pas.");
    spacer(8);

    subTitle("Poarta de autentificare (pre-checkout)");
    bodyText("Înainte de a accesa pașii de checkout, utilizatorul vede un ecran de selecție:", 14);
    ["Autentifică-te — dacă are deja cont.",
      "Creează cont — redirecționat la /register.",
      "Continuă fără cont (guest) — trece direct la checkout fără autentificare.",
    ].forEach(s => bullet(s, 14));
    spacer(10);

    const steps = [
      {
        title: "Pasul 1: Data & ora livrării",
        items: [
          "Calendar interactiv navigabil (prev/next lună) pentru selectarea datei dorite.",
          "Date din trecut dezactivate automat — comanda minimă cu 24h înainte.",
          "Grid cu intervale orare disponibile (ex: 10:00–12:00, 12:00–14:00 etc.).",
          "Butonul 'Continuă' se activează doar după selectarea ambelor: dată + interval orar.",
        ],
      },
      {
        title: "Pasul 2: Date personale & adrese",
        items: [
          "Formular contact: Prenume, Nume, Email, Telefon, CUI (opțional — pentru facturi B2B).",
          "Adresă de facturare: Județ, Localitate, Stradă, Număr, Tip locuință (casă/bloc).",
          "Câmpuri opționale pentru bloc: Bloc, Scară, Etaj, Apartament (afișate condiționat).",
          "Checkbox 'Adresa de livrare este diferită' — dacă bifat, apare un formular separat pentru livrare.",
          "Adrese de facturare salvate (doar utilizatori autentificați): click populează formularul automat.",
          "Adrese de livrare salvate: același mecanism, separat, pentru adresa de livrare.",
          "Checkbox 'Salvează adresa în cont' — salvează adresa în baza de date. Dezactivat dacă adresa curentă coincide cu una salvată (previne duplicate).",
          "Deselecție adresă salvată: click din nou pe adresa selectată o deselectează și resetează formularul.",
          "Metode de plată: Numerar la livrare, Card online (Netopia), Ridicare din magazin.",
          "Taxa de livrare calculată automat: 25 lei (Sect. 1, 2, 6) sau 35 lei (Sect. 3, 4, 5 și Ilfov); 0 lei pentru pickup.",
        ],
      },
      {
        title: "Pasul 3: Confirmare & plasare comandă",
        items: [
          "Rezumat complet: produse cu cantități și prețuri, adrese, dată livrare, metodă de plată.",
          "Total final: subtotal + taxă livrare (afișate separat).",
          "Buton 'Plasează comanda' — trimite toate datele la API.",
          "Validare server-side a disponibilității produselor înainte de a crea comanda.",
          "Numerar/Pickup: comanda creată direct cu status PROCESSING, email de confirmare trimis imediat.",
          "Card: utilizatorul redirecționat la pagina Netopia 3D Secure. Comanda creată cu PENDING_PAYMENT.",
          "Coșul se golește automat după plasarea cu succes.",
        ],
      },
    ];

    steps.forEach(step => {
      checkY(50);
      const y = doc.y;
      doc.save().roundedRect(M, y, CONTENT_W, 20, 5).fill(BRAND).restore();
      bold(10).fillColor(WHITE).text(step.title, M + 10, y + 5, { width: CONTENT_W - 20 });
      doc.y = y + 24;
      step.items.forEach(item => bullet(item, 6));
      spacer(8);
    });

    // ══════════════════════════════════════════════════════════════════════
    // SECTION 7 — PAYMENT
    // ══════════════════════════════════════════════════════════════════════
    addPage();
    sectionTitle("7. Metode de plată");

    const payments = [
      {
        name: "Numerar la livrare",
        color: "#166534",
        items: [
          "Clientul plătește curier la momentul livrării.",
          "Comanda creată cu status PROCESSING.",
          "La finalizare de admin: email de confirmare finalizare trimis clientului.",
          "Nu se generează factură fiscală pentru această metodă.",
        ],
      },
      {
        name: "Card online — Netopia Payments (3D Secure)",
        color: "#1d4ed8",
        items: [
          "Integrare nativă cu Netopia Payments v3 API — procesator autorizat în România.",
          "Comanda creată inițial cu status PENDING_PAYMENT.",
          "Clientul redirecționat la pagina Netopia pentru autentificare 3D Secure.",
          "IPN (Instant Payment Notification) primit de la Netopia → status actualizat la PLATITA sau ANULAT.",
          "Datele cardului nu trec niciodată prin serverele Donut Studio — procesate exclusiv de Netopia.",
          "La finalizare de admin: factură PDF generată automat și trimisă pe email.",
        ],
      },
      {
        name: "Ridicare din magazin (pickup)",
        color: "#92400e",
        items: [
          "Disponibil cu minim 24h înainte. Fără taxă de livrare (0 lei).",
          "Clientul ridică personal comanda de la sediul Donut Studio.",
          "Comanda creată cu status PROCESSING.",
          "La finalizare de admin: email de confirmare finalizare trimis clientului.",
        ],
      },
    ];

    payments.forEach(pm => {
      checkY(50);
      const y = doc.y;
      doc.save().roundedRect(M, y, CONTENT_W, 20, 5).fill(pm.color).restore();
      bold(10).fillColor(WHITE).text(pm.name, M + 10, y + 5, { width: CONTENT_W - 20 });
      doc.y = y + 24;
      pm.items.forEach(i => bullet(i, 6));
      spacer(8);
    });

    spacer(4);
    divider();
    sectionTitle("8. Adrese salvate");
    bodyText(
      "Utilizatorii autentificați pot salva adrese de facturare și de livrare pentru a accelera comenzile viitoare. Adresele sunt stocate în tabelul Address și sunt separate în două categorii distincte."
    );
    spacer(6);
    ["Adresele de facturare și livrare sunt afișate separat în checkout, în secțiuni dedicate.",
      "Click pe o adresă salvată populează automat câmpurile formularului corespunzător.",
      "Click din nou pe adresa selectată o deselectează și resetează formularul.",
      "Checkbox 'Salvează adresa' este dezactivat automat dacă adresa din formular coincide exact cu una deja salvată.",
      "Adresele pot fi șterse oricând din pagina /account → secțiunea 'Adresele mele'.",
      "Oaspeții (guest) nu pot salva adrese — funcționalitate exclusivă pentru utilizatori autentificați.",
    ].forEach(f => bullet(f));

    // ══════════════════════════════════════════════════════════════════════
    // SECTION 9 — ADMIN
    // ══════════════════════════════════════════════════════════════════════
    addPage();
    sectionTitle("9. Panoul de administrare (/admin)");
    bodyText(
      "Accesibil exclusiv utilizatorilor cu rolul ADMIN. Protejat atât client-side (redirecționare automată) cât și server-side (funcția requireAdmin verifică JWT + rol la fiecare request API de admin)."
    );
    spacer(8);

    const adminTabs = [
      {
        tab: "Dashboard",
        items: [
          "Statistici în timp real: Total comenzi, Comenzi active, Venit total (lei), Comenzi finalizate.",
          "Grafic distribuție comenzi pe stare.",
          "Lista ultimelor comenzi recente cu număr, client, total și status.",
        ],
      },
      {
        tab: "Comenzi",
        items: [
          "Afișare implicită: comenzile active (PROCESSING și PLATITA).",
          "Filtrare după status: Toate, PROCESSING, PLATITA, FINALIZAT, PENDING_PAYMENT, ANULAT.",
          "Căutare în timp real după: număr comandă, email, prenume sau nume client.",
          "Expandare comandă: produse comandate, date client, adrese facturare/livrare, interval livrare, metodă plată, total.",
          "Schimbarea stării comenzii din dropdown cu confirmare vizuală.",
          "La trecerea la FINALIZAT: declanșare automată generare factură PDF + trimitere email (card) sau email finalizare (cash/pickup).",
          "Badge indicator dacă factura a fost generată și trimisă pe email.",
          "Buton descărcare factură PDF direct din panoul admin.",
        ],
      },
      {
        tab: "Produse (Gogoși)",
        items: [
          "Lista completă a produselor cu imagine, categorie, preț și status disponibilitate.",
          "Adăugare produs nou: formular complet (nume, slug auto-generat, preț, imagine, descriere, ingrediente, alergeni, calorii, categorie, 8 câmpuri nutriționale).",
          "Editare produs: toate câmpurile editabile, inclusiv disponibilitatea (toggle on/off).",
          "Ștergere produs cu dialog de confirmare.",
          "Produsele indisponibile evidențiate vizual cu badge 'Indisponibil'.",
          "Slug-ul este generat automat din nume cu normalizare unicode (diacritice convertite).",
        ],
      },
      {
        tab: "Utilizatori",
        items: [
          "Lista tuturor utilizatorilor cu avatar inițiale, nume, email, rol și status verificare.",
          "Căutare în timp real după nume sau email.",
          "Creare utilizator direct din admin (fără flux email verificare).",
          "Editare utilizator: modificare nume, email, rol (USER/ADMIN), status verificare.",
          "Ștergere utilizator cu confirmare.",
        ],
      },
      {
        tab: "Facturi",
        items: [
          "Lista tuturor facturilor emise cu număr factură, număr comandă, client și total.",
          "Badge 'Email trimis' / 'Email netrimis' pentru fiecare factură.",
          "Descărcare PDF pentru orice factură direct din admin.",
          "Facturile sunt generate automat — nu se pot crea manual.",
        ],
      },
    ];

    adminTabs.forEach(t => {
      checkY(50);
      const y = doc.y;
      doc.save().roundedRect(M, y, CONTENT_W, 20, 5).fill(BRAND).restore();
      bold(10).fillColor(WHITE).text(`Tab: ${t.tab}`, M + 10, y + 5, { width: CONTENT_W - 20 });
      doc.y = y + 24;
      t.items.forEach(i => bullet(i, 6));
      spacer(8);
    });

    // ══════════════════════════════════════════════════════════════════════
    // SECTION 10 — EMAILS + INVOICING
    // ══════════════════════════════════════════════════════════════════════
    addPage();
    sectionTitle("10. Emailuri automate & Facturare");
    bodyText(
      "Toate emailurile sunt trimise prin Nodemailer via SMTP și au design HTML custom, consistent cu brandingul Donut Studio. Există 4 tipuri de emailuri automate:"
    );
    spacer(8);

    const emails = [
      {
        title: "1. Email verificare adresă",
        trigger: "La: crearea unui cont nou | Destinatar: utilizatorul nou înregistrat",
        items: [
          "Conține link unic /api/auth/verify?token=... valabil 24 de ore.",
          "La click, contul devine activ (verified=true) și utilizatorul este redirecționat la login.",
          "Link-ul expirat sau invalid returnează eroare explicită.",
        ],
      },
      {
        title: "2. Email resetare parolă",
        trigger: "La: solicitarea resetării parolei | Destinatar: utilizatorul care a solicitat",
        items: [
          "Conține butonul 'Resetează parola' cu link unic valabil 1 oră.",
          "Token-ul este invalidat după utilizare sau la expirare.",
          "Dacă email-ul nu există în DB, nu se trimite nimic (securitate anti-enumeration).",
        ],
      },
      {
        title: "3. Email confirmare comandă",
        trigger: "La: plasarea oricărei comenzi cu succes | Destinatari: clientul + adminul (intern)",
        items: [
          "Conține: numărul comenzii, produsele cu cantități și prețuri, totalul defalcat.",
          "Detalii livrare: data și intervalul orar ales.",
          "Adresele de facturare și de livrare.",
          "Notă specifică metodei de plată: card → 'Factura va fi trimisă la finalizare'; cash/pickup → mesaj standard.",
        ],
      },
      {
        title: "4. Email factură PDF / Email finalizare comandă",
        trigger: "La: adminul marchează comanda FINALIZAT | Destinatar: clientul",
        items: [
          "Card: factură PDF generată server-side, atașată la email. Subiect: 'Factură F-2026-XXXXX'.",
          "Cash/Pickup: email de confirmare finalizare fără atașament.",
          "Factura conține: date emitent (American Bite S.R.L.), date client, CUI dacă furnizat, TVA 21% defalcat.",
        ],
      },
    ];

    emails.forEach(em => {
      checkY(60);
      const y = doc.y;
      doc.save().roundedRect(M, y, CONTENT_W, 20, 5).fill(BRAND).restore();
      bold(10).fillColor(WHITE).text(em.title, M + 10, y + 5, { width: CONTENT_W - 20 });
      doc.y = y + 24;
      reg(8.5).fillColor(BRAND).text(em.trigger, M + 10, doc.y, { width: CONTENT_W - 20 });
      doc.y = doc.y + 8;
      em.items.forEach(i => bullet(i, 6));
      spacer(8);
    });

    spacer(4);
    divider();
    subTitle("Facturare automată (PDFKit)");
    ["Facturile fiscale sunt generate automat server-side cu PDFKit, exclusiv pentru comenzile plătite cu cardul.",
      "Numerotare secvențială: F-{an}-{5 cifre} (ex: F-2026-00001).",
      "Conțin: antetul companiei emitente (American Bite S.R.L., CUI RO 36991079, Reg. J23/7328/2023), datele clientului, CUI-ul companiei clientului (B2B), lista produselor cu preț unitar și cantitate.",
      "TVA 21% defalcat: total fără TVA, valoare TVA, total cu TVA.",
      "Factura este stocată în DB și marcată emailed=true după trimitere cu succes.",
      "Adminii pot descărca oricând factura din panoul admin, indiferent dacă a fost trimisă pe email.",
      "Cash și pickup nu generează factură fiscală — clientul primește email de confirmare finalizare.",
    ].forEach(f => bullet(f));

    // ══════════════════════════════════════════════════════════════════════
    // SECTION 11 — QUICK REFERENCE
    // ══════════════════════════════════════════════════════════════════════
    addPage();
    sectionTitle("11. Referință rapidă — Roluri & Permisiuni");
    spacer(4);

    const roles = [
      {
        role: "GUEST (oaspete neautentificat)",
        color: GRAY,
        perms: [
          "Navighează pe toate paginile publice",
          "Vede catalogul de produse, detalii și informații nutriționale",
          "Adaugă produse în coș (persistent în localStorage între sesiuni)",
          "Finalizează o comandă fără cont (guest checkout)",
          "Alege data, intervalul orar, adresa și metoda de plată",
          "Primește email de confirmare comandă",
          "NU poate salva adrese pentru utilizare ulterioară",
          "NU are acces la istoricul comenzilor",
        ],
      },
      {
        role: "USER (utilizator autentificat)",
        color: "#0d9488",
        perms: [
          "Toate permisiunile guest, plus:",
          "Salvează adrese de facturare și de livrare separat",
          "Autofill adresă la checkout din adresele salvate",
          "Vede istoricul complet al propriilor comenzi",
          "Expandează fiecare comandă pentru detalii complete",
          "Șterge adresele salvate din pagina /account",
          "Delogare cu ștergerea sesiunii locale",
        ],
      },
      {
        role: "ADMIN (administrator)",
        color: BRAND,
        perms: [
          "Toate permisiunile user, plus:",
          "Acces la panoul /admin",
          "Vede și gestionează TOATE comenzile din platformă",
          "Schimbă starea comenzilor (PROCESSING → PLATITA → FINALIZAT → ANULAT)",
          "Declanșează generarea facturii PDF și trimiterea emailului de finalizare",
          "Descarcă facturi PDF din admin",
          "Adaugă, editează și șterge produse din catalog",
          "Activează/dezactivează disponibilitatea unui produs",
          "Gestionează utilizatori: creare, editare, schimbare rol, ștergere",
          "Vede statistici și grafice pe dashboard",
          "Caută comenzi după număr, email sau nume client",
        ],
      },
    ];

    roles.forEach(r => {
      checkY(r.perms.length * 16 + 40);
      const y = doc.y;
      doc.save().roundedRect(M, y, CONTENT_W, 22, 6).fill(r.color).restore();
      bold(11).fillColor(WHITE).text(r.role, M + 12, y + 6, { width: CONTENT_W - 24 });
      doc.y = y + 26;
      r.perms.forEach(p => bullet(p, 4));
      spacer(10);
    });

    divider();
    subTitle("Stările comenzilor");
    spacer(4);

    const statuses: [string, string, string][] = [
      ["PROCESSING", "#d97706", "Comandă plasată (cash/pickup) sau IPN card nereceptionat. În așteptare la admin."],
      ["PENDING_PAYMENT", "#6b7280", "Plata cu cardul inițiată dar neconfirmată de Netopia (client redirecționat)."],
      ["PLATITA", "#0d9488", "IPN pozitiv de la Netopia — plata procesată cu succes. Poate fi finalizată."],
      ["FINALIZAT", "#16a34a", "Admin a marcat finalizată. Factură PDF / email finalizare trimis clientului."],
      ["ANULAT", "#dc2626", "IPN negativ de la Netopia (plată eșuată) sau anulată manual de admin."],
    ];

    statuses.forEach(([status, color, desc]) => {
      checkY(22);
      const y = doc.y;
      const bw2 = badge(status, M, y + 2, color);
      reg(9).fillColor(DGRAY).text(desc, M + bw2 + 10, y + 2, { width: CONTENT_W - bw2 - 10 });
      doc.y = doc.y + 6;
    });

    spacer(14);
    infoBox([
      "Numerotare comenzi: DS-{YYYYMMDD}-{număr 4 cifre} (ex: DS-20260408-0001)",
      "Numerotare facturi: F-{an}-{număr 5 cifre} (ex: F-2026-00001)",
      "Taxa livrare: 25 lei (Sectoarele 1, 2, 6) · 35 lei (Sectoarele 3, 4, 5 + Ilfov) · 0 lei (pickup)",
      "Autentificare: JWT cu expirare 30 zile, stocat în localStorage",
    ]);

    // ── end ────────────────────────────────────────────────────────────────
    doc.end();
    stream.on("finish", () => { console.log("✅ PDF generat:", outPath); resolve(); });
    stream.on("error", reject);
  });
}

generatePdf().catch(console.error);
