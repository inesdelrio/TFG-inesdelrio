const prisma = require("../../config/prisma");
const createEntityFollowedNotification = require("../notifications/create-entity-followed-notification.service");

async function createEntitySubscription(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;
  const createNotification =
    dependencies.createEntityFollowedNotification ||
    createEntityFollowedNotification;

  const entity = await prismaClient.entity.findUnique({
    where: {
      id: input.entityId,
    },
  });

  if (!entity) {
    const error = new Error("Entity not found.");
    error.code = "ENTITY_NOT_FOUND";
    throw error;
  }

  const existingSubscription = await prismaClient.entitySubscription.findUnique({
    where: {
      volunteerUserId_entityId: {
        volunteerUserId: input.volunteerUserId,
        entityId: input.entityId,
      },
    },
  });

  if (existingSubscription) {
    const error = new Error("Subscription already exists.");
    error.code = "ENTITY_SUBSCRIPTION_ALREADY_EXISTS";
    throw error;
  }

  return prismaClient.$transaction(async (transaction) => {
    const subscription = await transaction.entitySubscription.create({
      data: {
        volunteerUserId: input.volunteerUserId,
        entityId: input.entityId,
      },
    });

    await createNotification(
      {
        recipientUserId: entity.requestedByUserId,
        actorUserId: input.volunteerUserId,
        entityId: entity.id,
      },
      {
        prisma: transaction,
      },
    );

    return subscription;
  });
}

module.exports = createEntitySubscription;
