import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as never);
const db = prisma as PrismaClient;

const imageMap: Record<string, string> = {
  "double-chocolate": "/donuts/double-chocolate.webp",
  "vanillian":        "/donuts/vanillian.webp",
  "orange-blossom":   "/donuts/orange-blossom.webp",
  "banana-fantasy":   "/donuts/banana-fantasy.webp",
  "coco-naughty":     "/donuts/coco-naughty.webp",
  "almond-famous":    "/donuts/almond-famous.webp",
  "oreo-dream":       "/donuts/oreo-dream.webp",
  "honey-buzz":       "/donuts/honey-buzz.webp",
  "blueberry-rush":   "/donuts/blueberry-rush.webp",
  "pistachious":      "/donuts/pistachious.webp",
  "caramel-dash":     "/donuts/caramel-dash.webp",
  "coffeelicious":    "/donuts/coffeelicious.webp",
  "raspberry-blast":  "/donuts/raspberry-blast.webp",
};

async function main() {
  const donuts = await db.gogoasa.findMany({ select: { id: true, slug: true, image: true } });

  for (const d of donuts) {
    const localPath = imageMap[d.slug];
    if (!localPath) { console.log(`⚠ No mapping for slug: ${d.slug}`); continue; }
    if (d.image === localPath) { console.log(`✓ Already correct: ${d.slug}`); continue; }

    await db.gogoasa.update({ where: { id: d.id }, data: { image: localPath } });
    console.log(`✓ Updated ${d.slug}: ${d.image} → ${localPath}`);
  }

  console.log("Done.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
