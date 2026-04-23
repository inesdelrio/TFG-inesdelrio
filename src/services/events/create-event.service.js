const prisma = require("../../config/prisma");
const {
  assertEntityCanPublishEvents,
} = require("../entities/entity-publication-access.service");
const createEventNotifications = require("../notifications/create-event-notifications.service");

function buildStartsAt(eventDate, eventTime) {
  return new Date(`${eventDate}T${eventTime}:00`);
}

async function createEvent(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;
  const createNotifications =
    dependencies.createEventNotifications ||
    ((payload) => createEventNotifications(payload, { prisma: prismaClient }));

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

  assertEntityCanPublishEvents(entity);

  const event = await prismaClient.event.create({
    data: {
      title: input.title,
      description: input.description,
      city: input.city,
      address: input.address,
      startsAt: buildStartsAt(input.eventDate, input.eventTime),
      totalSlots: Number(input.totalSlots),
      entityId: entity.id,
    },
    include: {
      entity: true,
    },
  });

  await createNotifications({
    entityId: entity.id,
    entityName: entity.organizationName,
    eventId: event.id,
    eventTitle: event.title,
    type: "EVENT_PUBLISHED",
  });

  return event;
}

module.exports = createEvent;
