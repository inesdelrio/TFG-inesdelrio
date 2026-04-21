const prisma = require("../../config/prisma");
const getOwnedEventById = require("./get-owned-event-by-id.service");

async function listOwnedEventRegistrations(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;
  const getOwnedEvent =
    dependencies.getOwnedEventById ||
    ((payload) => getOwnedEventById(payload, { prisma: prismaClient }));

  const { event, entity } = await getOwnedEvent({
    userId: input.userId,
    eventId: input.eventId,
  });

  const registrations = await prismaClient.eventRegistration.findMany({
    where: {
      eventId: event.id,
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      volunteerUser: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
      },
    },
  });

  return {
    entity,
    event,
    registrations,
  };
}

module.exports = listOwnedEventRegistrations;
