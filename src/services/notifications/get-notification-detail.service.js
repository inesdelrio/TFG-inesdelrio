const prisma = require("../../config/prisma");

async function getNotificationDetail(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;
  const notification = await prismaClient.internalNotification.findUnique({
    where: {
      id: input.notificationId,
    },
    include: {
      actorUser: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
      },
      entity: {
        select: {
          id: true,
          organizationName: true,
        },
      },
      event: {
        select: {
          id: true,
          title: true,
          startsAt: true,
          city: true,
        },
      },
    },
  });

  if (!notification) {
    const error = new Error("Notification not found.");
    error.code = "NOTIFICATION_NOT_FOUND";
    throw error;
  }

  if (notification.recipientUserId !== input.recipientUserId) {
    const error = new Error("Notification does not belong to current user.");
    error.code = "NOTIFICATION_FORBIDDEN";
    throw error;
  }

  return notification;
}

module.exports = getNotificationDetail;
