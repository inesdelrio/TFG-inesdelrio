const prisma = require("../../config/prisma");

const ALLOWED_TARGET_STATUSES = new Set([
  "PENDIENTE",
  "VERIFICADA",
  "RECHAZADA",
  "SUSPENDIDA",
]);

function buildActionLabel(nextStatus) {
  switch (nextStatus) {
    case "PENDIENTE":
      return "ENTITY_MARKED_PENDING";
    case "VERIFICADA":
      return "ENTITY_APPROVED";
    case "RECHAZADA":
      return "ENTITY_REJECTED";
    case "SUSPENDIDA":
      return "ENTITY_SUSPENDED";
    default:
      return "ENTITY_STATUS_UPDATED";
  }
}

async function updateEntityValidationStatus(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  if (!ALLOWED_TARGET_STATUSES.has(input.nextStatus)) {
    const error = new Error("Invalid status transition.");
    error.code = "INVALID_ENTITY_STATUS_TRANSITION";
    throw error;
  }

  return prismaClient.$transaction(async (transaction) => {
    const entity = await transaction.entity.findUnique({
      where: {
        id: input.entityId,
      },
      include: {
        requestedByUser: true,
      },
    });

    if (!entity) {
      const error = new Error("Entity not found.");
      error.code = "ENTITY_NOT_FOUND";
      throw error;
    }

    if (entity.validationStatus === input.nextStatus) {
      const error = new Error("Invalid status transition.");
      error.code = "INVALID_ENTITY_STATUS_TRANSITION";
      throw error;
    }

    const updatedEntity = await transaction.entity.update({
      where: {
        id: input.entityId,
      },
      data: {
        validationStatus: input.nextStatus,
      },
    });

    await transaction.adminActionLog.create({
      data: {
        action: buildActionLabel(input.nextStatus),
        fromStatus: entity.validationStatus,
        toStatus: input.nextStatus,
        notes: input.notes || null,
        adminUserId: input.adminUserId,
        entityId: entity.id,
      },
    });

    return updatedEntity;
  });
}

module.exports = updateEntityValidationStatus;
