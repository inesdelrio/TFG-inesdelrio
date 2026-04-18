const prisma = require("../../config/prisma");

async function createEntityRequest(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  const existingEntityForUser = await prismaClient.entity.findUnique({
    where: {
      requestedByUserId: input.userId,
    },
  });

  if (existingEntityForUser) {
    const error = new Error("Entity already exists for user.");
    error.code = "ENTITY_ALREADY_EXISTS_FOR_USER";
    throw error;
  }

  const existingEntityByTaxId = await prismaClient.entity.findUnique({
    where: {
      taxId: input.taxId,
    },
  });

  if (existingEntityByTaxId) {
    const error = new Error("Entity tax id already exists.");
    error.code = "ENTITY_TAX_ID_ALREADY_EXISTS";
    throw error;
  }

  return prismaClient.$transaction(async (transaction) => {
    const entity = await transaction.entity.create({
      data: {
        organizationName: input.organizationName,
        legalName: input.legalName,
        taxId: input.taxId,
        contactEmail: input.contactEmail,
        contactPhone: input.contactPhone,
        city: input.city,
        address: input.address,
        description: input.description,
        supportingInfo: input.supportingInfo || null,
        validationStatus: "PENDIENTE",
        requestedByUserId: input.userId,
      },
    });

    await transaction.user.update({
      where: {
        id: input.userId,
      },
      data: {
        role: "ENTIDAD",
      },
    });

    return entity;
  });
}

module.exports = createEntityRequest;
