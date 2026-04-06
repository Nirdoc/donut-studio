import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as never);
const db = prisma as PrismaClient;

// ─── Admin user ──────────────────────────────────────────────────────────────

async function seedAdmin() {
  const email = (process.env.ADMIN_EMAIL ?? "admin@donutstudio.ro").toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD ?? "Admin@2024!";
  const name = process.env.ADMIN_NAME ?? "Administrator";

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`✓ Admin already exists: ${email}`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await db.user.create({
    data: { name, email, passwordHash, verified: true, role: "ADMIN" },
  });
  console.log(`✓ Admin created: ${email} / ${password}`);
}

// ─── Gogosi ──────────────────────────────────────────────────────────────────

const donuts = [
  {
    name: "Double Chocolate",
    slug: "double-chocolate",
    price: 12,
    image: "/donuts/double-chocolate.webp",
    description: "Încântă-ți papilele gustative cu gogoașa Double Chocolate, o adevărată desfătare pentru iubitorii de ciocolată. Aluat pufos umplut cu cremă de ciocolată, glazurat cu ciocolată neagră premium.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "ciocolată neagră", "ciocolată cu lapte", "ciocolată albă"],
    allergens: ["Ouă", "Lapte", "Gluten"],
    calories: 256,
    category: "classic" as const,
    kcalServing: 256, fatServing: 13.44, carbsServing: 29.03, proteinServing: 4.28,
    kcal100g: 427, fat100g: 22.4, carbs100g: 48.38, protein100g: 7.13,
  },
  {
    name: "Vanillian",
    slug: "vanillian",
    price: 12,
    image: "/donuts/vanillian.webp",
    description: "Descoperă rafinamentul simplu al gogoașei Vanillian, un desert care celebrează eleganța vaniliei clasice. Aluat pufos umplut cu cremă fină de vanilie, glazurat cu ciocolată cu lapte premium.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "cremă de vanilie", "ciocolată cu lapte", "ciocolată albă"],
    allergens: ["Ouă", "Lapte", "Gluten"],
    calories: 225,
    category: "classic" as const,
    kcalServing: 225, fatServing: 8.37, carbsServing: 35.26, proteinServing: 3.18,
    kcal100g: 375, fat100g: 13.95, carbs100g: 58.77, protein100g: 5.3,
  },
  {
    name: "Orange Blossom",
    slug: "orange-blossom",
    price: 12,
    image: "/donuts/orange-blossom.webp",
    description: "Răsfață-ți simțurile cu gogoașa Orange Blossom, o delicatesă sofisticată cu aromă revigorantă de portocale. Glazură delicată de portocale, decorată cu coajă de portocală confiată și semințe de rodie.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "pastă de portocale", "cremă de ciocolată albă", "portocale confiate", "semințe de rodie"],
    allergens: ["Ouă", "Lapte", "Gluten", "Soia"],
    calories: 163,
    category: "fruity" as const,
    kcalServing: 163, fatServing: 7.39, carbsServing: 21.48, proteinServing: 2.4,
    kcal100g: 354, fat100g: 16.07, carbs100g: 46.7, protein100g: 5.22,
  },
  {
    name: "Banana Fantasy",
    slug: "banana-fantasy",
    price: 12,
    image: "/donuts/banana-fantasy.webp",
    description: "Răsfață-te cu gogoașa Banana Fantasy, un desert visător care îmbină textura pufoasă cu aroma intensă de banană. Decorată cu chipsuri de banană crocante pentru un contrast de texturi irezistibil.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "pastă de banană", "cremă de ciocolată albă", "chipsuri de banană"],
    allergens: ["Ouă", "Lapte", "Gluten", "Soia"],
    calories: 174,
    category: "fruity" as const,
    kcalServing: 174, fatServing: 8.46, carbsServing: 21.52, proteinServing: 2.4,
    kcal100g: 395, fat100g: 19.23, carbs100g: 48.91, protein100g: 5.45,
  },
  {
    name: "Coco Naughty",
    slug: "coco-naughty",
    price: 12,
    image: "/donuts/coco-naughty.webp",
    description: "Răsfață-ți papilele gustative cu gogoașa Coco Naughty, o combinație irezistibilă între textura pufoasă și aroma bogată a nucii de cocos. Glazură de ciocolată neagră cu fulgi de cocos crocant.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "ciocolată neagră", "fulgi de cocos"],
    allergens: ["Ouă", "Lapte", "Gluten"],
    calories: 154,
    category: "classic" as const,
    kcalServing: 154, fatServing: 7.95, carbsServing: 17.01, proteinServing: 2.68,
    kcal100g: 384, fat100g: 19.87, carbs100g: 42.53, protein100g: 6.7,
  },
  {
    name: "Almond Famous",
    slug: "almond-famous",
    price: 12,
    image: "/donuts/almond-famous.webp",
    description: "Încântă-ți simțurile cu gogoașa Almond Famous, o capodoperă delicioasă care combină textura pufoasă cu gustul rafinat și crocant al migdalelor. Glazură de ciocolată cu lapte și fulgi de migdale.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "ciocolată cu lapte", "fulgi de migdale"],
    allergens: ["Ouă", "Lapte", "Gluten", "Migdale"],
    calories: 178,
    category: "premium" as const,
    kcalServing: 178, fatServing: 9.95, carbsServing: 17.87, proteinServing: 4.11,
    kcal100g: 405, fat100g: 22.61, carbs100g: 40.61, protein100g: 9.34,
  },
  {
    name: "Oreo Dream",
    slug: "oreo-dream",
    price: 12,
    image: "/donuts/oreo-dream.webp",
    description: "Intră în lumea viselor dulci cu gogoașa Oreo Dream, o combinație irezistibilă de textură pufoasă și aromă intensă de Oreo. Glazură de ciocolată albă, decorată generos cu biscuiți Oreo.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "ciocolată albă", "biscuiți Oreo"],
    allergens: ["Ouă", "Lapte", "Gluten", "Soia"],
    calories: 173,
    category: "classic" as const,
    kcalServing: 173, fatServing: 8.73, carbsServing: 20.75, proteinServing: 2.93,
    kcal100g: 392, fat100g: 19.84, carbs100g: 47.16, protein100g: 6.66,
  },
  {
    name: "Honey Buzz",
    slug: "honey-buzz",
    price: 12,
    image: "/donuts/honey-buzz.webp",
    description: "Descoperă deliciul natural al gogoașei Honey Buzz, o combinație perfectă de textură pufoasă și dulceața delicată a mierii. Glazurată generos cu miere poliflora aurie și decorată cu biscuiți.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "miere poliflora", "biscuiți"],
    allergens: ["Ouă", "Lapte", "Gluten"],
    calories: 151,
    category: "classic" as const,
    kcalServing: 151, fatServing: 4.61, carbsServing: 23.85, proteinServing: 2.36,
    kcal100g: 342, fat100g: 10.48, carbs100g: 54.2, protein100g: 5.36,
  },
  {
    name: "Blueberry Rush",
    slug: "blueberry-rush",
    price: 12,
    image: "/donuts/blueberry-rush.webp",
    description: "Descoperă explozia de savoare a gogoașei Blueberry Rush! Glazură dulce de afine cu afine confiate, oferind note proaspete și natural dulci. Ideală pentru iubitorii de fructe.",
    ingredients: ["Făină", "lapte integral 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "pastă de afine", "fondant", "afine confiate"],
    allergens: ["Ouă", "Lapte", "Gluten"],
    calories: 156,
    category: "fruity" as const,
    kcalServing: 156, fatServing: 4.47, carbsServing: 26.05, proteinServing: 2.18,
    kcal100g: 279, fat100g: 7.98, carbs100g: 46.52, protein100g: 3.89,
  },
  {
    name: "Pistachious",
    slug: "pistachious",
    price: 12,
    image: "/donuts/pistachious.webp",
    description: "Savurează deliciul autentic al gogoașei Pistachious, o combinație rafinată cu aromă distinctă de fistic. Glazură cremoasă cu gust intens de fistic și note subtil de nucă, decorată cu fistic verde proaspăt măcinat.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "pastă de fistic", "cremă de ciocolată albă", "fistic verde"],
    allergens: ["Ouă", "Lapte", "Gluten", "Fistic", "Alune", "Soia"],
    calories: 176,
    category: "premium" as const,
    kcalServing: 176, fatServing: 9.03, carbsServing: 20.74, proteinServing: 2.8,
    kcal100g: 400, fat100g: 20.52, carbs100g: 47.14, protein100g: 6.36,
  },
  {
    name: "Caramel Dash",
    slug: "caramel-dash",
    price: 12,
    image: "/donuts/caramel-dash.webp",
    description: "Răsfață-ți papilele gustative cu gogoașa Caramel Dash! O adevărată capodoperă cu textură moale și pufoasă, glazurată generos cu caramel auriu și decorată cu bucăți de alune crocante.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "caramel", "alune de pădure"],
    allergens: ["Ouă", "Lapte", "Gluten", "Alune"],
    calories: 173,
    category: "premium" as const,
    kcalServing: 173, fatServing: 6.55, carbsServing: 25.32, proteinServing: 3,
    kcal100g: 346, fat100g: 13.1, carbs100g: 50.64, protein100g: 6,
  },
  {
    name: "Coffeelicious",
    slug: "coffeelicious",
    price: 12,
    image: "/donuts/coffeelicious.webp",
    description: "Bucură-te de rafinamentul cafelei în fiecare mușcătură cu gogoașa Coffeelicious! Îmbinând gustul intens al cafelei cu textura pufoasă a unui aluat proaspăt, această gogoașă oferă o experiență senzorială completă.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "esență de vanilie", "apă", "ulei vegetal", "ciocolată cu lapte", "cafea"],
    allergens: ["Ouă", "Lapte", "Gluten"],
    calories: 134,
    category: "premium" as const,
    kcalServing: 134, fatServing: 6.43, carbsServing: 16.7, proteinServing: 2.42,
    kcal100g: 352, fat100g: 16.93, carbs100g: 43.95, protein100g: 6.38,
  },
  {
    name: "Raspberry Blast",
    slug: "raspberry-blast",
    price: 12,
    image: "/donuts/raspberry-blast.webp",
    description: "Descoperă explozia de arome oferită de gogoașa Raspberry Blast! Glazură de zmeură cu nuanță roz naturală, echilibrată de note ușor acrișoare de zmeură liofilizată. O experiență gustativă și vizuală deopotrivă.",
    ingredients: ["Făină", "lapte 3.5%", "ouă", "unt 80%", "drojdie proaspătă", "zahăr", "sare", "extract de vanilie", "apă", "ulei vegetal", "pastă de zmeură", "fondant", "zmeură liofilizată"],
    allergens: ["Ouă", "Lapte", "Gluten"],
    calories: 155,
    category: "fruity" as const,
    kcalServing: 155, fatServing: 4.49, carbsServing: 25.91, proteinServing: 2.25,
    kcal100g: 309, fat100g: 8.98, carbs100g: 51.82, protein100g: 4.5,
  },
];

async function seedDonuts() {
  const existing = await db.gogoasa.count();
  if (existing > 0) {
    console.log(`✓ Donuts already seeded (${existing} records)`);
    return;
  }

  for (const d of donuts) {
    await db.gogoasa.create({ data: d });
    console.log(`✓ Gogoasa: ${d.name}`);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  await seedAdmin();
  await seedDonuts();
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
