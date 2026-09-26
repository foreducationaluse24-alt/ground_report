/*
  Warnings:

  - You are about to drop the column `articleId` on the `Article` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_articleId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "articleId",
ADD COLUMN     "outletId" TEXT;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES "Outlet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
