const prisma = require("../../config/prisma");

async function getOwnedEventById(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  const entity = await prismaClient.entity.findUnique({
    where: {
      requestedByUserId: input.userId,
    },
  });

  if (!entity) {
    const error = new Error("Entity not found.");
    error.code = "ENTITY_NOT_FOUND";
    throw error;
  }

  const event = await prismaClient.event.findUnique({
    where: {
      id: input.eventId,
    },
  });

  if (!event) {
    const error = new Error("Event not found.");
    error.code = "EVENT_NOT_FOUND";
    throw error;
  }

  if (event.entityId !== entity.id) {
    const error = new Error("Event does not belong to current entity.");
    error.code = "EVENT_NOT_OWNED_BY_ENTITY";
    throw error;
  }

  if (entity.validationStatus === "SUSPENDIDA") {
    const error = new Error("Suspended entity cannot operate events.");
    error.code = "ENTITY_SUSPENDED_FOR_EVENT_OPERATION";
    throw error;
  }

  if (event.publicationStatus === "RETIRADO") {
    const error = new Error("Withdrawn event cannot be operated.");
    error.code = "EVENT_WITHDRAWN";
    throw error;
  }

  return {
    event,
    entity,
  };
}

module.exports = getOwnedEventById;
