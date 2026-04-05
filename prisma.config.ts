import path from "node:path";
import { defineConfig, env } from "prisma/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

export default defineConfig({
  earlyAccess: true,
  schema: "./prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
  migrate: {
    async adapter() {
      const url = process.env.DATABASE_URL!;
      const dbPath = url.replace("file:", "");
      const absolutePath = path.isAbsolute(dbPath)
        ? dbPath
        : path.resolve(process.cwd(), dbPath);
      return new PrismaBetterSqlite3({ url: absolutePath });
    },
  },
});
