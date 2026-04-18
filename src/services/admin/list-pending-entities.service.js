const prisma = require("../../config/prisma");

async function listPendingEntities(dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  return prismaClient.entity.findMany({
    where: {
      validationStatus: "PENDIENTE",
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      requestedByUser: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });
}

module.exports = listPendingEntities;
