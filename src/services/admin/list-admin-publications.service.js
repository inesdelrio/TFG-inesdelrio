const prisma = require("../../config/prisma");

async function listAdminPublications(dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  return prismaClient.event.findMany({
    orderBy: {
      startsAt: "desc",
    },
    include: {
      entity: {
        select: {
          id: true,
          organizationName: true,
          validationStatus: true,
        },
      },
      _count: {
        select: {
          registrations: true,
        },
      },
    },
  });
}

module.exports = listAdminPublications;
