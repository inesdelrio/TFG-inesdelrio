const prisma = require("../../config/prisma");
const { getEffectiveEndsAt } = require("../events/event-date-range.service");

function mapEventToHistoryItem(event) {
  return {
    eventId: event.id,
    title: event.title,
    startsAt: event.startsAt,
    endsAt: event.endsAt,
    city: event.city,
    address: event.address,
    publicationStatus: event.publicationStatus,
    totalSlots: event.totalSlots,
    registrationsCount: event._count.registrations,
    canOpenDetail: event.publicationStatus === "ACTIVO",
  };
}

async function getEntityHistory(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;
  const now = input.now || new Date();

  const entity = await prismaClient.entity.findUnique({
    where: {
      requestedByUserId: input.userId,
    },
    select: {
      id: true,
      organizationName: true,
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
    },
    select: {
      id: true,
      title: true,
      startsAt: true,
      endsAt: true,
      city: true,
      address: true,
      publicationStatus: true,
      totalSlots: true,
      _count: {
        select: {
          registrations: true,
        },
      },
    },
    orderBy: {
      startsAt: "asc",
    },
  });

  const historyEvents = events.map(mapEventToHistoryItem);

  return {
    entity,
    futureEvents: historyEvents.filter((event) => getEffectiveEndsAt(event) >= now),
    pastEvents: historyEvents.filter((event) => getEffectiveEndsAt(event) < now),
  };
}

module.exports = getEntityHistory;
