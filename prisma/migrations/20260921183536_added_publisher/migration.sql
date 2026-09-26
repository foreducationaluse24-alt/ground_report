-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "articleId" TEXT;

-- CreateTable
CREATE TABLE "Outlet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Outlet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Outlet_domain_key" ON "Outlet"("domain");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Outlet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
