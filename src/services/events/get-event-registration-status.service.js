const prisma = require("../../config/prisma");

async function getEventRegistrationStatus(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  if (!input.volunteerUserId || !input.eventId) {
    return false;
  }

  const registration = await prismaClient.eventRegistration.findUnique({
    where: {
      volunteerUserId_eventId: {
        volunteerUserId: input.volunteerUserId,
        eventId: input.eventId,
      },
    },
  });

  return Boolean(registration);
}

module.exports = getEventRegistrationStatus;
