-- CreateEnum
CREATE TYPE "Category" AS ENUM ('classic', 'fruity', 'premium');

-- CreateTable
CREATE TABLE "Gogoasa" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ingredients" TEXT[],
    "allergens" TEXT[],
    "calories" INTEGER NOT NULL,
    "category" "Category" NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "kcalServing" DOUBLE PRECISION NOT NULL,
    "fatServing" DOUBLE PRECISION NOT NULL,
    "carbsServing" DOUBLE PRECISION NOT NULL,
    "proteinServing" DOUBLE PRECISION NOT NULL,
    "kcal100g" DOUBLE PRECISION NOT NULL,
    "fat100g" DOUBLE PRECISION NOT NULL,
    "carbs100g" DOUBLE PRECISION NOT NULL,
    "protein100g" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gogoasa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gogoasa_slug_key" ON "Gogoasa"("slug");
