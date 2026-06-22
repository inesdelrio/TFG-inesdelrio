const prisma = require("../../config/prisma");

async function createEventFullNotification(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  return prismaClient.internalNotification.create({
    data: {
      recipientUserId: input.recipientUserId,
      actorUserId: null,
      entityId: input.entityId,
      eventId: input.eventId,
      type: "EVENT_FULL",
      title: `Evento completo: ${input.eventTitle}`,
      message: `Tu evento ha completado todas sus plazas: ${input.eventTitle}`,
    },
  });
}

module.exports = createEventFullNotification;
