const prisma = require("../../config/prisma");

async function createEntitySubscription(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

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

  return prismaClient.entitySubscription.create({
    data: {
      volunteerUserId: input.volunteerUserId,
      entityId: input.entityId,
    },
  });
}

module.exports = createEntitySubscription;
