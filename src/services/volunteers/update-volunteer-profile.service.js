const prisma = require("../../config/prisma");

async function updateVolunteerProfile(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  const existingUser = await prismaClient.user.findUnique({
    where: {
      id: input.userId,
    },
  });

  if (!existingUser) {
    const error = new Error("Volunteer not found.");
    error.code = "VOLUNTEER_NOT_FOUND";
    throw error;
  }

  return prismaClient.user.update({
    where: {
      id: input.userId,
    },
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone || null,
    },
  });
}

module.exports = updateVolunteerProfile;
