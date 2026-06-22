const prisma = require("../../config/prisma");

async function deleteNotification(input, dependencies = {}) {
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

  return prismaClient.internalNotification.delete({
    where: {
      id: notification.id,
    },
  });
}

module.exports = deleteNotification;
