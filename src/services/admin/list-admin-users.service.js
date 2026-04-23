const prisma = require("../../config/prisma");

async function listAdminUsers(dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  return prismaClient.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
}

module.exports = listAdminUsers;
