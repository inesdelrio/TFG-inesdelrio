const assert = require("node:assert/strict");

const updateEntityProfile = require("../../../../src/services/entities/update-entity-profile.service");

async function testUpdateEntityProfileUpdatesAllowedFields() {
  let updatedPayload = null;
  const prismaMock = {
    entity: {
      findUnique: async ({ where }) =>
        where.requestedByUserId === 11
          ? { id: 4, requestedByUserId: 11, taxId: "G12345678" }
          : null,
      update: async ({ data }) => {
        updatedPayload = data;
        return { id: 4, ...data };
      },
    },
  };

  const updatedEntity = await updateEntityProfile(
    {
      userId: 11,
      organizationName: "Fundacion Horizonte Vivo",
      contactEmail: "contacto@horizonte.org",
      contactPhone: "699112233",
      city: "Madrid",
      address: "Calle Mayor 10",
      description: "Entidad centrada en programas de acompanamiento y accion social.",
      supportingInfo: "Actualizacion del dosier institucional",
    },
    {
      prisma: prismaMock,
    },
  );

  assert.equal(updatedPayload.organizationName, "Fundacion Horizonte Vivo");
  assert.equal(updatedPayload.contactEmail, "contacto@horizonte.org");
  assert.equal(updatedEntity.city, "Madrid");
}

module.exports = {
  testUpdateEntityProfileUpdatesAllowedFields,
};
