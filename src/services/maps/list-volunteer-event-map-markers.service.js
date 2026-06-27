const prisma = require("../../config/prisma");
const { mapEventToMarker } = require("./map-marker-utils");
const { buildCurrentOrFutureWhere } = require("../events/event-date-range.service");

async function listVolunteerEventMapMarkers(input = {}, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;
  const now = input.now || new Date();

  const events = await prismaClient.event.findMany({
    where: {
      publicationStatus: "ACTIVO",
      ...buildCurrentOrFutureWhere(now),
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
      _count: {
        select: {
          registrations: true,
        },
      },
      registrations: input.volunteerUserId
        ? {
            where: {
              volunteerUserId: input.volunteerUserId,
            },
            select: {
              id: true,
            },
          }
        : false,
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

  return events.map((event) => {
    const registrationsCount = event._count ? event._count.registrations : 0;
    const availableSlots = Math.max(0, event.totalSlots - registrationsCount);
    const isRegistered = Array.isArray(event.registrations) && event.registrations.length > 0;
    const registrationState = isRegistered
      ? "REGISTERED"
      : availableSlots === 0
        ? "FULL"
        : "AVAILABLE";
    const actionLabel =
      registrationState === "REGISTERED"
        ? "Ya estas inscrito"
        : registrationState === "FULL"
          ? "Evento completo"
          : "Inscribirme";

    return mapEventToMarker(event, {
      availableSlots,
      registrationsCount,
      registrationState,
      actionLabel,
      canRegister: registrationState === "AVAILABLE",
    });
  });
}

module.exports = listVolunteerEventMapMarkers;
