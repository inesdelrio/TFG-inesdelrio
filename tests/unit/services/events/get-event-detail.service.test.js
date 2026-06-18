const assert = require("node:assert/strict");

const getEventDetail = require("../../../../src/services/events/get-event-detail.service");

async function testGetEventDetailReturnsEventWithOrganizerData() {
  let receivedWhere = null;
  const prismaMock = {
    event: {
      findFirst: async ({ where }) => {
        receivedWhere = where;
        return {
        id: where.id,
        title: "Evento detalle",
        entity: {
          organizationName: "Entidad organizadora",
          contactEmail: "entidad@example.com",
        },
        };
      },
    },
  };

  const event = await getEventDetail(5, {
    prisma: prismaMock,
  });

  assert.equal(event.id, 5);
  assert.equal(event.entity.organizationName, "Entidad organizadora");
  assert.equal(receivedWhere.publicationStatus, "ACTIVO");
  assert.equal(receivedWhere.entity.validationStatus, "VERIFICADA");
}

module.exports = {
  testGetEventDetailReturnsEventWithOrganizerData,
};
