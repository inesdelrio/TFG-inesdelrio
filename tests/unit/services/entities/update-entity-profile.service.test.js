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
      latitude: 40.4168,
      longitude: -3.7038,
      normalizedAddress: "Calle Mayor 10, Madrid",
    },
    {
      prisma: prismaMock,
    },
  );

  assert.equal(updatedPayload.organizationName, "Fundacion Horizonte Vivo");
  assert.equal(updatedPayload.contactEmail, "contacto@horizonte.org");
  assert.equal(updatedPayload.latitude, 40.4168);
  assert.equal(updatedPayload.longitude, -3.7038);
  assert.equal(updatedPayload.normalizedAddress, "Calle Mayor 10, Madrid");
  assert.equal(updatedEntity.city, "Madrid");
}

module.exports = {
  testUpdateEntityProfileUpdatesAllowedFields,
};
