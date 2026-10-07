/*
  Warnings:

  - You are about to drop the column `source` on the `Article` table. All the data in the column will be lost.
  - Made the column `outletId` on table `Article` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_outletId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "source",
ALTER COLUMN "outletId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES "Outlet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
