-- Add an optional actor relation without affecting existing notifications.
ALTER TABLE "InternalNotification"
ADD COLUMN "actorUserId" INTEGER;

ALTER TABLE "InternalNotification"
ADD CONSTRAINT "InternalNotification_actorUserId_fkey"
FOREIGN KEY ("actorUserId") REFERENCES "User"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
