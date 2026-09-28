/*
  Warnings:

  - The `bias` column on the `Outlet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "bias" AS ENUM ('LEFT', 'LEAN_LEFT', 'CENTRE', 'LEAN_RIGHT', 'RIGHT');

-- AlterTable
ALTER TABLE "Outlet" DROP COLUMN "bias",
ADD COLUMN     "bias" "bias";
