const prisma = require("../../config/prisma");
const {
  createAnonymizedUserData,
} = require("./account-anonymization");

async function deleteVolunteerAccount(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;
  const anonymizeUser =
    dependencies.createAnonymizedUserData || createAnonymizedUserData;
  const now = input.now || new Date();
  const anonymizedUserData = await anonymizeUser(input.userId);

  return prismaClient.$transaction(async (transaction) => {
    const user = await transaction.user.findUnique({
      where: {
        id: input.userId,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user || user.role !== "VOLUNTARIO") {
      const error = new Error("Volunteer account not found.");
      error.code = "VOLUNTEER_ACCOUNT_NOT_FOUND";
      throw error;
    }

    await transaction.eventRegistration.deleteMany({
      where: {
        volunteerUserId: user.id,
        event: {
          startsAt: {
            gte: now,
          },
        },
      },
    });

    await transaction.entitySubscription.deleteMany({
      where: {
        volunteerUserId: user.id,
      },
    });

    return transaction.user.update({
      where: {
        id: user.id,
      },
      data: anonymizedUserData,
    });
  });
}

module.exports = deleteVolunteerAccount;
