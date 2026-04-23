const prisma = require("../../config/prisma");

async function markNotificationAsRead(input, dependencies = {}) {
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

  if (notification.volunteerUserId !== input.volunteerUserId) {
    const error = new Error("Notification does not belong to current volunteer.");
    error.code = "NOTIFICATION_FORBIDDEN";
    throw error;
  }

  if (notification.isRead) {
    return notification;
  }

  return prismaClient.internalNotification.update({
    where: {
      id: notification.id,
    },
    data: {
      isRead: true,
    },
  });
}

module.exports = markNotificationAsRead;
