const prisma = require("../../config/prisma");

async function createEntityFollowedNotification(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  return prismaClient.internalNotification.create({
    data: {
      recipientUserId: input.recipientUserId,
      actorUserId: input.actorUserId,
      entityId: input.entityId,
      eventId: null,
      type: "ENTITY_FOLLOWED",
      title: "Nuevo seguidor",
      message: "Un voluntario ha empezado a seguir tu entidad.",
    },
  });
}

module.exports = createEntityFollowedNotification;
