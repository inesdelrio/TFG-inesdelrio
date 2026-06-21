const prisma = require("../../config/prisma");
const {
  createAnonymizedUserData,
} = require("./account-anonymization");

function buildAnonymizedEntityData(entityId) {
  return {
    organizationName: "Entidad eliminada",
    legalName: `Entidad eliminada ${entityId}`,
    taxId: `deleted-entity-${entityId}`,
    contactEmail: `deleted-entity-${entityId}@volunred.local`,
    contactPhone: "No disponible",
    city: "No disponible",
    address: "No disponible",
    description: "Entidad eliminada.",
    supportingInfo: null,
    validationStatus: "SUSPENDIDA",
  };
}

async function deleteEntityAccount(input, dependencies = {}) {
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
    const entity = await transaction.entity.findUnique({
      where: {
        requestedByUserId: input.userId,
      },
      select: {
        id: true,
        requestedByUserId: true,
      },
    });

    if (!user || user.role !== "ENTIDAD" || !entity) {
      const error = new Error("Entity account not found.");
      error.code = "ENTITY_ACCOUNT_NOT_FOUND";
      throw error;
    }

    const futureEvents = await transaction.event.findMany({
      where: {
        entityId: entity.id,
        startsAt: {
          gte: now,
        },
      },
      select: {
        id: true,
      },
    });
    const pastEvents = await transaction.event.findMany({
      where: {
        entityId: entity.id,
        startsAt: {
          lt: now,
        },
      },
      select: {
        id: true,
      },
    });
    const futureEventIds = futureEvents.map((event) => event.id);
    const pastEventIds = pastEvents.map((event) => event.id);

    if (futureEventIds.length > 0) {
      await transaction.eventRegistration.deleteMany({
        where: {
          eventId: {
            in: futureEventIds,
          },
        },
      });
      await transaction.internalNotification.deleteMany({
        where: {
          eventId: {
            in: futureEventIds,
          },
        },
      });
      await transaction.event.updateMany({
        where: {
          id: {
            in: futureEventIds,
          },
        },
        data: {
          publicationStatus: "RETIRADO",
        },
      });
    }

    if (pastEventIds.length > 0) {
      await transaction.internalNotification.updateMany({
        where: {
          entityId: entity.id,
          eventId: {
            in: pastEventIds,
          },
        },
        data: {
          message: "Notificacion historica de una entidad eliminada.",
        },
      });
    }

    await transaction.entitySubscription.deleteMany({
      where: {
        entityId: entity.id,
      },
    });
    await transaction.entitySubscription.deleteMany({
      where: {
        volunteerUserId: user.id,
      },
    });
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

    await transaction.entity.update({
      where: {
        id: entity.id,
      },
      data: buildAnonymizedEntityData(entity.id),
    });

    return transaction.user.update({
      where: {
        id: user.id,
      },
      data: anonymizedUserData,
    });
  });
}

module.exports = deleteEntityAccount;
