const prisma = require("../../config/prisma");
const getOwnedEventById = require("./get-owned-event-by-id.service");

async function deleteOwnedEvent(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;
  const getOwnedEvent =
    dependencies.getOwnedEventById ||
    ((payload) => getOwnedEventById(payload, { prisma: prismaClient }));

  const { event } = await getOwnedEvent({
    userId: input.userId,
    eventId: input.eventId,
  });

  return prismaClient.event.delete({
    where: {
      id: event.id,
    },
  });
}

module.exports = deleteOwnedEvent;
