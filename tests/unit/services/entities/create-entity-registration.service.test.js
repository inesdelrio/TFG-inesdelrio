const assert = require("node:assert/strict");

const createEntityRegistration = require("../../../../src/services/entities/create-entity-registration.service");

function buildInput(overrides = {}) {
  return {
    firstName: "Laura",
    lastName: "Garcia",
    email: "laura@example.com",
    phone: "612345678",
    password: "password123",
    organizationName: "Fundacion Madrid",
    legalName: "Fundacion Madrid Social",
    taxId: "G12345678",
    contactEmail: "laura@example.com",
    contactPhone: "612345678",
    city: "Madrid",
    address: "Calle Mayor 10",
    latitude: 40.4168,
    longitude: -3.7038,
    normalizedAddress: "Calle Mayor 10, Madrid",
    description: "Entidad dedicada a proyectos sociales dentro de Madrid.",
    supportingInfo: "Documentacion disponible.",
    ...overrides,
  };
}

async function testCreateEntityRegistrationCreatesEntityUserAndPendingEntity() {
  const createdUsers = [];
  const createdEntities = [];

  const prismaMock = {
    user: {
      findUnique: async () => null,
    },
    entity: {
      findUnique: async () => null,
    },
    $transaction: async (callback) =>
      callback({
        user: {
          create: async ({ data }) => {
            createdUsers.push(data);
            return { id: 7, ...data };
          },
        },
        entity: {
          create: async ({ data }) => {
            createdEntities.push(data);
            return { id: 11, ...data };
          },
        },
      }),
  };

  const result = await createEntityRegistration(buildInput(), {
    prisma: prismaMock,
    hashPassword: async () => "hashed-password",
  });

  assert.equal(createdUsers[0].role, "ENTIDAD");
  assert.equal(createdUsers[0].passwordHash, "hashed-password");
  assert.equal(createdEntities[0].requestedByUserId, 7);
  assert.equal(createdEntities[0].validationStatus, "PENDIENTE");
  assert.equal(createdEntities[0].latitude, 40.4168);
  assert.equal(createdEntities[0].longitude, -3.7038);
  assert.equal(result.user.id, 7);
  assert.equal(result.entity.id, 11);
}

async function testCreateEntityRegistrationRejectsDuplicateEmail() {
  const prismaMock = {
    user: {
      findUnique: async () => ({ id: 1 }),
    },
    entity: {
      findUnique: async () => null,
    },
  };

  await assert.rejects(
    () => createEntityRegistration(buildInput(), { prisma: prismaMock }),
    (error) => error.code === "EMAIL_ALREADY_EXISTS",
  );
}

async function testCreateEntityRegistrationRejectsDuplicateTaxId() {
  const prismaMock = {
    user: {
      findUnique: async () => null,
    },
    entity: {
      findUnique: async () => ({ id: 2 }),
    },
  };

  await assert.rejects(
    () => createEntityRegistration(buildInput(), { prisma: prismaMock }),
    (error) => error.code === "ENTITY_TAX_ID_ALREADY_EXISTS",
  );
}

module.exports = {
  testCreateEntityRegistrationCreatesEntityUserAndPendingEntity,
  testCreateEntityRegistrationRejectsDuplicateEmail,
  testCreateEntityRegistrationRejectsDuplicateTaxId,
};
