const prisma = require("../../config/prisma");
const { hashPassword } = require("../../utils/password");

async function createEntityRegistration(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;
  const passwordHasher = dependencies.hashPassword || hashPassword;

  const existingUser = await prismaClient.user.findUnique({
    where: {
      email: input.email,
    },
  });

  if (existingUser) {
    const error = new Error("Email already exists.");
    error.code = "EMAIL_ALREADY_EXISTS";
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

  const passwordHash = await passwordHasher(input.password);

  return prismaClient.$transaction(async (transaction) => {
    const user = await transaction.user.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone || null,
        passwordHash,
        role: "ENTIDAD",
      },
    });

    const entity = await transaction.entity.create({
      data: {
        organizationName: input.organizationName,
        legalName: input.legalName,
        taxId: input.taxId,
        contactEmail: input.contactEmail,
        contactPhone: input.contactPhone,
        city: input.city,
        address: input.address,
        latitude: input.latitude,
        longitude: input.longitude,
        normalizedAddress: input.normalizedAddress,
        description: input.description,
        supportingInfo: input.supportingInfo || null,
        validationStatus: "PENDIENTE",
        requestedByUserId: user.id,
      },
    });

    return {
      user,
      entity,
    };
  });
}

module.exports = createEntityRegistration;
