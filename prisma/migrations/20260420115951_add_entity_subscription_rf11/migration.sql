-- CreateTable
CREATE TABLE "EntitySubscription" (
    "id" SERIAL NOT NULL,
    "volunteerUserId" INTEGER NOT NULL,
    "entityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EntitySubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EntitySubscription_volunteerUserId_entityId_key" ON "EntitySubscription"("volunteerUserId", "entityId");

-- AddForeignKey
ALTER TABLE "EntitySubscription" ADD CONSTRAINT "EntitySubscription_volunteerUserId_fkey" FOREIGN KEY ("volunteerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntitySubscription" ADD CONSTRAINT "EntitySubscription_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
