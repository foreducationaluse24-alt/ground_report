/*
  Warnings:

  - A unique constraint covering the columns `[hashedContent]` on the table `Article` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "hashedContent" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Article_hashedContent_key" ON "Article"("hashedContent");
