-- CreateEnum
CREATE TYPE "EntityValidationStatus" AS ENUM ('PENDIENTE', 'VERIFICADA', 'RECHAZADA', 'SUSPENDIDA');

-- CreateTable
CREATE TABLE "Entity" (
    "id" SERIAL NOT NULL,
    "organizationName" TEXT NOT NULL,
    "legalName" TEXT NOT NULL,
    "taxId" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "supportingInfo" TEXT,
    "validationStatus" "EntityValidationStatus" NOT NULL DEFAULT 'PENDIENTE',
    "requestedByUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entity_taxId_key" ON "Entity"("taxId");

-- CreateIndex
CREATE UNIQUE INDEX "Entity_requestedByUserId_key" ON "Entity"("requestedByUserId");

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_requestedByUserId_fkey" FOREIGN KEY ("requestedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
