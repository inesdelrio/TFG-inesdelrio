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
    include: {
      entity: {
        select: {
          requestedByUserId: true,
        },
      },
    },
  });

  if (!existingSubscription) {
    return null;
  }

  return prismaClient.$transaction(async (transaction) => {
    const deletedSubscription = await transaction.entitySubscription.delete({
      where,
    });

    await transaction.internalNotification.deleteMany({
      where: {
        recipientUserId: existingSubscription.entity.requestedByUserId,
        actorUserId: input.volunteerUserId,
        entityId: input.entityId,
        type: "ENTITY_FOLLOWED",
      },
    });

    return deletedSubscription;
  });
}

module.exports = deleteEntitySubscription;
