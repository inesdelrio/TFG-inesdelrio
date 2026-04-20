const prisma = require("../../config/prisma");

async function getEntitySubscriptionStatus(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  if (!input.volunteerUserId || !input.entityId) {
    return false;
  }

  const subscription = await prismaClient.entitySubscription.findUnique({
    where: {
      volunteerUserId_entityId: {
        volunteerUserId: input.volunteerUserId,
        entityId: input.entityId,
      },
    },
  });

  return Boolean(subscription);
}

module.exports = getEntitySubscriptionStatus;
