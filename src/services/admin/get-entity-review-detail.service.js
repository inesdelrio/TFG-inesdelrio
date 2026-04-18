const prisma = require("../../config/prisma");

async function getEntityReviewDetail(entityId, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  return prismaClient.entity.findUnique({
    where: {
      id: entityId,
    },
    include: {
      requestedByUser: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        },
      },
      adminActionLogs: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          adminUser: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      },
    },
  });
}

module.exports = getEntityReviewDetail;
