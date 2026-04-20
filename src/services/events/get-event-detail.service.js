const prisma = require("../../config/prisma");

async function getEventDetail(eventId, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  return prismaClient.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      _count: {
        select: {
          registrations: true,
        },
      },
      entity: {
        select: {
          id: true,
          organizationName: true,
          description: true,
          contactEmail: true,
          contactPhone: true,
          city: true,
          address: true,
          validationStatus: true,
        },
      },
    },
  });
}

module.exports = getEventDetail;
