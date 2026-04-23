const prisma = require("../../config/prisma");
const getOwnedEventById = require("./get-owned-event-by-id.service");
const createEventNotifications = require("../notifications/create-event-notifications.service");

function buildStartsAt(eventDate, eventTime) {
  return new Date(`${eventDate}T${eventTime}:00`);
}

async function updateOwnedEvent(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;
  const getOwnedEvent =
    dependencies.getOwnedEventById ||
    ((payload) => getOwnedEventById(payload, { prisma: prismaClient }));
  const createNotifications =
    dependencies.createEventNotifications ||
    ((payload) => createEventNotifications(payload, { prisma: prismaClient }));

  const { event, entity } = await getOwnedEvent({
    userId: input.userId,
    eventId: input.eventId,
  });

  const updatedEvent = await prismaClient.event.update({
    where: {
      id: event.id,
    },
    data: {
      title: input.title,
      description: input.description,
      city: input.city,
      address: input.address,
      startsAt: buildStartsAt(input.eventDate, input.eventTime),
      totalSlots: Number(input.totalSlots),
    },
  });

  await createNotifications({
    entityId: entity.id,
    entityName: entity.organizationName,
    eventId: updatedEvent.id,
    eventTitle: updatedEvent.title,
    type: "EVENT_UPDATED",
  });

  return updatedEvent;
}

module.exports = updateOwnedEvent;
