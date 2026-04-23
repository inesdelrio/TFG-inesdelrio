const prisma = require("../../config/prisma");

async function getAdminDashboardSummary(dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  const [
    totalUsers,
    totalVolunteers,
    totalEntities,
    pendingEntities,
    verifiedEntities,
    totalEvents,
    upcomingEvents,
  ] = await Promise.all([
    prismaClient.user.count(),
    prismaClient.user.count({
      where: {
        role: "VOLUNTARIO",
      },
    }),
    prismaClient.entity.count(),
    prismaClient.entity.count({
      where: {
        validationStatus: "PENDIENTE",
      },
    }),
    prismaClient.entity.count({
      where: {
        validationStatus: "VERIFICADA",
      },
    }),
    prismaClient.event.count(),
    prismaClient.event.count({
      where: {
        startsAt: {
          gt: new Date(),
        },
      },
    }),
  ]);

  return {
    totalUsers,
    totalVolunteers,
    totalEntities,
    pendingEntities,
    verifiedEntities,
    totalEvents,
    upcomingEvents,
  };
}

module.exports = getAdminDashboardSummary;
