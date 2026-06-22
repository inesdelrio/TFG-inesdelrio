const prisma = require("../../config/prisma");

async function setNotificationReadStatus(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  const notification = await prismaClient.internalNotification.findUnique({
    where: {
      id: input.notificationId,
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

  if (notification.isRead === input.isRead) {
    return notification;
  }

  return prismaClient.internalNotification.update({
    where: {
      id: notification.id,
    },
    data: {
      isRead: input.isRead,
    },
  });
}

module.exports = setNotificationReadStatus;
