const prisma = require("../../config/prisma");

function mapRegistrationToActivity(registration) {
  const event = registration.event;

  return {
    registrationId: registration.id,
    eventId: event.id,
    title: event.title,
    entityName: event.entity.organizationName,
    startsAt: event.startsAt,
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
    futureActivities: activities.filter((activity) => activity.startsAt >= now),
    pastActivities: activities.filter((activity) => activity.startsAt < now),
  };
}

module.exports = getVolunteerHistory;
