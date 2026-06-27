const prisma = require("../../config/prisma");

async function updateEntityProfile(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  const existingEntity = await prismaClient.entity.findUnique({
    where: {
      requestedByUserId: input.userId,
    },
  });

  if (!existingEntity) {
    const error = new Error("Entity not found.");
    error.code = "ENTITY_NOT_FOUND";
    throw error;
  }

  return prismaClient.entity.update({
    where: {
      id: existingEntity.id,
    },
    data: {
      organizationName: input.organizationName,
      contactEmail: input.contactEmail,
      contactPhone: input.contactPhone,
      city: input.city,
      address: input.address,
      latitude: input.latitude,
      longitude: input.longitude,
      normalizedAddress: input.normalizedAddress,
      description: input.description,
      supportingInfo: input.supportingInfo || null,
    },
  });
}

module.exports = updateEntityProfile;
