const prisma = require("../../config/prisma");
const getOwnedEventById = require("./get-owned-event-by-id.service");
const createEventNotifications = require("../notifications/create-event-notifications.service");
const { parseLocalDateTime } = require("./event-date-range.service");

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
      latitude: input.latitude,
      longitude: input.longitude,
      normalizedAddress: input.normalizedAddress,
      startsAt: input.startsAt || parseLocalDateTime(input.startDate || input.eventDate, input.startTime || input.eventTime),
      endsAt:
        input.endsAt ||
        parseLocalDateTime(
          input.endDate || input.startDate || input.eventDate,
          input.endTime || input.startTime || input.eventTime,
        ),
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
