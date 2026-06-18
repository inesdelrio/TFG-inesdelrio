const prisma = require("../../config/prisma");

async function withdrawEventPublication(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  return prismaClient.$transaction(async (transaction) => {
    const event = await transaction.event.findUnique({
      where: {
        id: input.eventId,
      },
    });

    if (!event) {
      const error = new Error("Event not found.");
      error.code = "EVENT_NOT_FOUND";
      throw error;
    }

    if (event.publicationStatus === "RETIRADO") {
      return event;
    }

    const updatedEvent = await transaction.event.update({
      where: {
        id: event.id,
      },
      data: {
        publicationStatus: "RETIRADO",
      },
    });

    await transaction.adminActionLog.create({
      data: {
        action: "EVENT_WITHDRAWN",
        notes: input.notes || null,
        adminUserId: input.adminUserId,
        entityId: event.entityId,
        eventId: event.id,
      },
    });

    return updatedEvent;
  });
}

module.exports = withdrawEventPublication;
