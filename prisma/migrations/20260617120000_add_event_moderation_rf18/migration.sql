-- CreateEnum
CREATE TYPE "EventPublicationStatus" AS ENUM ('ACTIVO', 'RETIRADO');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN "publicationStatus" "EventPublicationStatus" NOT NULL DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE "AdminActionLog" ALTER COLUMN "fromStatus" DROP NOT NULL,
ALTER COLUMN "toStatus" DROP NOT NULL,
ALTER COLUMN "entityId" DROP NOT NULL,
ADD COLUMN "eventId" INTEGER;

-- AddForeignKey
ALTER TABLE "AdminActionLog" ADD CONSTRAINT "AdminActionLog_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
