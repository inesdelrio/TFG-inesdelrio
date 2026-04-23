-- CreateTable
CREATE TABLE "InternalNotification" (
    "id" SERIAL NOT NULL,
    "volunteerUserId" INTEGER NOT NULL,
    "entityId" INTEGER NOT NULL,
    "eventId" INTEGER,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InternalNotification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InternalNotification" ADD CONSTRAINT "InternalNotification_volunteerUserId_fkey" FOREIGN KEY ("volunteerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternalNotification" ADD CONSTRAINT "InternalNotification_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternalNotification" ADD CONSTRAINT "InternalNotification_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
