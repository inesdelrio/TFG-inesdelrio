const prisma = require("../../config/prisma");

async function createEntityRegistrationNotification(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  return prismaClient.internalNotification.create({
    data: {
      recipientUserId: input.recipientUserId,
      actorUserId: input.actorUserId,
      entityId: input.entityId,
      eventId: input.eventId,
      type: "EVENT_REGISTRATION_CREATED",
      title: `Nueva inscripcion: ${input.eventTitle}`,
      message: `Un voluntario se ha inscrito en tu evento: ${input.eventTitle}`,
    },
  });
}

module.exports = createEntityRegistrationNotification;
