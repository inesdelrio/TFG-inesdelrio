const prisma = require("../../config/prisma");

function buildNotificationContent({ type, entityName, eventTitle }) {
  if (type === "EVENT_UPDATED") {
    return {
      title: `Actividad actualizada: ${eventTitle}`,
      message: `${entityName} ha actualizado la actividad "${eventTitle}".`,
    };
  }

  return {
    title: `Nueva actividad: ${eventTitle}`,
    message: `${entityName} ha publicado una nueva actividad: "${eventTitle}".`,
  };
}

async function createEventNotifications(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  const subscriptions = await prismaClient.entitySubscription.findMany({
    where: {
      entityId: input.entityId,
    },
    select: {
      volunteerUserId: true,
    },
  });

  if (subscriptions.length === 0) {
    return { createdCount: 0 };
  }

  const content = buildNotificationContent(input);

  const result = await prismaClient.internalNotification.createMany({
    data: subscriptions.map((subscription) => ({
      volunteerUserId: subscription.volunteerUserId,
      entityId: input.entityId,
      eventId: input.eventId,
      type: input.type,
      title: content.title,
      message: content.message,
    })),
  });

  return {
    createdCount: result.count,
  };
}

module.exports = createEventNotifications;
