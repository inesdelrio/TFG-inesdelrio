const prisma = require("../../config/prisma");

async function createEventRegistration(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  const event = await prismaClient.event.findUnique({
    where: {
      id: input.eventId,
    },
    include: {
      entity: {
        select: {
          validationStatus: true,
        },
      },
      _count: {
        select: {
          registrations: true,
        },
      },
    },
  });

  if (!event) {
    const error = new Error("Event not found.");
    error.code = "EVENT_NOT_FOUND";
    throw error;
  }

  if (event.startsAt <= new Date()) {
    const error = new Error("Event is no longer active.");
    error.code = "EVENT_NOT_ACTIVE";
    throw error;
  }

  if (event.publicationStatus !== "ACTIVO" || event.entity.validationStatus !== "VERIFICADA") {
    const error = new Error("Event is no longer visible.");
    error.code = "EVENT_NOT_ACTIVE";
    throw error;
  }

  const existingRegistration = await prismaClient.eventRegistration.findUnique({
    where: {
      volunteerUserId_eventId: {
        volunteerUserId: input.volunteerUserId,
        eventId: input.eventId,
      },
    },
  });

  if (existingRegistration) {
    const error = new Error("Registration already exists.");
    error.code = "EVENT_REGISTRATION_ALREADY_EXISTS";
    throw error;
  }

  if (event._count.registrations >= event.totalSlots) {
    const error = new Error("Event is full.");
    error.code = "EVENT_FULL";
    throw error;
  }

  return prismaClient.eventRegistration.create({
    data: {
      volunteerUserId: input.volunteerUserId,
      eventId: input.eventId,
    },
  });
}

module.exports = createEventRegistration;
