-- Rename the recipient column without deleting existing notification data.
ALTER TABLE "InternalNotification"
DROP CONSTRAINT "InternalNotification_volunteerUserId_fkey";

ALTER TABLE "InternalNotification"
RENAME COLUMN "volunteerUserId" TO "recipientUserId";

ALTER TABLE "InternalNotification"
ADD CONSTRAINT "InternalNotification_recipientUserId_fkey"
FOREIGN KEY ("recipientUserId") REFERENCES "User"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;
