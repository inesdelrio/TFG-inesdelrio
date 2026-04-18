const assert = require("node:assert/strict");

const createEntityRequest = require("../../../../src/services/entities/create-entity-request.service");

async function testCreateEntityRequestCreatesPendingEntityAndPromotesUserRole() {
  const updatedUsers = [];

  const prismaMock = {
    entity: {
      findUnique: async () => null,
    },
    $transaction: async (callback) =>
      callback({
        entity: {
          create: async ({ data }) => ({
            id: 99,
            ...data,
          }),
        },
        user: {
          update: async ({ data }) => {
            updatedUsers.push(data);
            return { id: 1, role: data.role };
          },
        },
      }),
  };

  const entity = await createEntityRequest(
    {
      userId: 1,
      organizationName: "Fundacion Demo",
      legalName: "Fundacion Demo Legal",
      taxId: "G12345678",
      contactEmail: "entidad@example.com",
      contactPhone: "612345678",
      city: "Madrid",
      address: "Calle Mayor 10",
      description: "Entidad dedicada a proyectos sociales y de apoyo comunitario.",
      supportingInfo: "Memoria y CIF disponibles para revision.",
    },
    {
      prisma: prismaMock,
    },
  );

  assert.equal(entity.validationStatus, "PENDIENTE");
  assert.equal(entity.requestedByUserId, 1);
  assert.equal(updatedUsers[0].role, "ENTIDAD");
}

module.exports = {
  testCreateEntityRequestCreatesPendingEntityAndPromotesUserRole,
};
