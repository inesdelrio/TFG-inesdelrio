-- AlterTable
ALTER TABLE "Entity" ADD COLUMN     "latitude" DECIMAL(9,6),
ADD COLUMN     "longitude" DECIMAL(9,6),
ADD COLUMN     "normalizedAddress" TEXT;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "latitude" DECIMAL(9,6),
ADD COLUMN     "longitude" DECIMAL(9,6),
ADD COLUMN     "normalizedAddress" TEXT;
