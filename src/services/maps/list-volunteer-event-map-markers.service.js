const prisma = require("../../config/prisma");
const { mapEventToMarker } = require("./map-marker-utils");

async function listVolunteerEventMapMarkers(input = {}, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;
  const now = input.now || new Date();

  const events = await prismaClient.event.findMany({
    where: {
      publicationStatus: "ACTIVO",
      startsAt: {
        gte: now,
      },
      latitude: {
        not: null,
      },
      longitude: {
        not: null,
      },
      entity: {
        validationStatus: "VERIFICADA",
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

  return events.map(mapEventToMarker);
}

module.exports = listVolunteerEventMapMarkers;
