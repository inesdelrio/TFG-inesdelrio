const prisma = require("../../config/prisma");

async function listVolunteerNotifications(volunteerUserId, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  return prismaClient.internalNotification.findMany({
    where: {
      volunteerUserId,
    },
    include: {
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
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

module.exports = listVolunteerNotifications;
