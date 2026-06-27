const prisma = require("../../config/prisma");
const {
  mapEntityToMarker,
  mapEventToMarker,
} = require("./map-marker-utils");

async function listAdminMapMarkers(input = {}, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;
  const events = await prismaClient.event.findMany({
    where: {
      latitude: {
        not: null,
      },
      longitude: {
        not: null,
      },
    },
    include: {
      entity: {
        select: {
          organizationName: true,
        },
      },
    },
    orderBy: {
      startsAt: "asc",
    },
  });
  const entities = await prismaClient.entity.findMany({
    where: {
      latitude: {
        not: null,
      },
      longitude: {
        not: null,
      },
    },
    include: {
      requestedByUser: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
    orderBy: {
      organizationName: "asc",
    },
  });

  return [
    ...events.map(mapEventToMarker),
    ...entities.map(mapEntityToMarker),
  ];
}

module.exports = listAdminMapMarkers;
