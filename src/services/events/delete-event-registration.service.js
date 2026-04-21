const prisma = require("../../config/prisma");

async function deleteEventRegistration(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  const registration = await prismaClient.eventRegistration.findUnique({
    where: {
      volunteerUserId_eventId: {
        volunteerUserId: input.volunteerUserId,
        eventId: input.eventId,
      },
    },
  });

  if (!registration) {
    const error = new Error("Event registration not found.");
    error.code = "EVENT_REGISTRATION_NOT_FOUND";
    throw error;
  }

  return prismaClient.eventRegistration.delete({
    where: {
      id: registration.id,
    },
  });
}

module.exports = deleteEventRegistration;
