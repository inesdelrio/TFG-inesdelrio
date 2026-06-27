const prisma = require("../../config/prisma");
const { getEffectiveEndsAt } = require("../events/event-date-range.service");

function mapRegistrationToActivity(registration) {
  const event = registration.event;

  return {
    registrationId: registration.id,
    eventId: event.id,
    title: event.title,
    entityName: event.entity.organizationName,
    startsAt: event.startsAt,
    endsAt: event.endsAt,
    city: event.city,
    address: event.address,
    publicationStatus: event.publicationStatus,
    entityValidationStatus: event.entity.validationStatus,
    canOpenDetail:
      event.publicationStatus === "ACTIVO" &&
      event.entity.validationStatus === "VERIFICADA",
  };
}

async function getVolunteerHistory(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;
  const now = input.now || new Date();

  const registrations = await prismaClient.eventRegistration.findMany({
    where: {
      volunteerUserId: input.volunteerUserId,
    },
    include: {
      event: {
        include: {
          entity: {
            select: {
              organizationName: true,
              validationStatus: true,
            },
          },
        },
      },
    },
    orderBy: {
      event: {
        startsAt: "asc",
      },
    },
  });

  const activities = registrations.map(mapRegistrationToActivity);

  return {
    futureActivities: activities.filter((activity) => getEffectiveEndsAt(activity) >= now),
    pastActivities: activities.filter((activity) => getEffectiveEndsAt(activity) < now),
  };
}

module.exports = getVolunteerHistory;
