const prisma = require("../../config/prisma");

async function deleteEventRegistration(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  const registration = await prismaClient.eventRegistration.findUnique({
    where: {
      volunteerUserId_eventId: {
        volunteerUserId: input.volunteerUserId,
        eventId: input.eventId,
      },
    },
    include: {
      event: {
        select: {
          entity: {
            select: {
              requestedByUserId: true,
            },
          },
        },
      },
    },
  });

  if (!registration) {
    const error = new Error("Event registration not found.");
    error.code = "EVENT_REGISTRATION_NOT_FOUND";
    throw error;
  }

  return prismaClient.$transaction(async (transaction) => {
    const deletedRegistration = await transaction.eventRegistration.delete({
      where: {
        id: registration.id,
      },
    });

    await transaction.internalNotification.deleteMany({
      where: {
        recipientUserId: registration.event.entity.requestedByUserId,
        actorUserId: input.volunteerUserId,
        eventId: input.eventId,
        type: "EVENT_REGISTRATION_CREATED",
      },
    });

    await transaction.internalNotification.deleteMany({
      where: {
        recipientUserId: registration.event.entity.requestedByUserId,
        eventId: input.eventId,
        type: "EVENT_FULL",
      },
    });

    return deletedRegistration;
  });
}

module.exports = deleteEventRegistration;
