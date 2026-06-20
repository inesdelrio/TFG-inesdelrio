const prisma = require("../../config/prisma");

async function deleteEntitySubscription(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;
  const where = {
    volunteerUserId_entityId: {
      volunteerUserId: input.volunteerUserId,
      entityId: input.entityId,
    },
  };

  const existingSubscription = await prismaClient.entitySubscription.findUnique({
    where,
  });

  if (!existingSubscription) {
    return null;
  }

  return prismaClient.entitySubscription.delete({
    where,
  });
}

module.exports = deleteEntitySubscription;
