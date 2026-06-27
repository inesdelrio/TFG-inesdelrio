const prisma = require("../../config/prisma");
const {
  hasCoordinates,
  mapEntityToMarker,
  mapEventToMarker,
} = require("./map-marker-utils");

async function listEntityMapMarkers(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;
  const entity = await prismaClient.entity.findUnique({
    where: {
      requestedByUserId: input.userId,
    },
    select: {
      id: true,
      organizationName: true,
      address: true,
      normalizedAddress: true,
      latitude: true,
      longitude: true,
    },
  });

  if (!entity) {
    const error = new Error("Entity not found.");
    error.code = "ENTITY_NOT_FOUND";
    throw error;
  }

  const events = await prismaClient.event.findMany({
    where: {
      entityId: entity.id,
      latitude: {
        not: null,
      },
      longitude: {
        not: null,
      },
    },
    orderBy: {
      startsAt: "asc",
    },
  });

  const markers = [];

  if (hasCoordinates(entity)) {
    markers.push(
      mapEntityToMarker(entity, {
        url: "/entidad/perfil",
      }),
    );
  }

  events.forEach((event) => {
    markers.push(
      mapEventToMarker(event, {
        entityName: entity.organizationName,
      }),
    );
  });

  return markers;
}

module.exports = listEntityMapMarkers;
