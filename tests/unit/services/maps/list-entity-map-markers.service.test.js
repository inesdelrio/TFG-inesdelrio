const assert = require("node:assert/strict");

const listEntityMapMarkers = require("../../../../src/services/maps/list-entity-map-markers.service");

async function testListEntityMapMarkersIncludesOwnOrganizationAndEvents() {
  const markers = await listEntityMapMarkers(
    {
      userId: 5,
    },
    {
      prisma: {
        entity: {
          findUnique: async () => ({
            id: 3,
            organizationName: "Entidad Centro",
            address: "Calle A 1",
            normalizedAddress: "Calle A 1, Madrid",
            latitude: "40.416800",
            longitude: "-3.703800",
          }),
        },
        event: {
          findMany: async (query) => {
            assert.equal(query.where.entityId, 3);
            assert.deepEqual(query.where.latitude, { not: null });
            return [
              {
                id: 9,
                title: "Evento propio",
                startsAt: new Date("2099-03-01T10:00:00.000Z"),
                publicationStatus: "ACTIVO",
                address: "Calle B 2",
                normalizedAddress: "Calle B 2, Madrid",
                latitude: "40.42",
                longitude: "-3.7",
              },
            ];
          },
        },
      },
    },
  );

  assert.equal(markers.length, 2);
  assert.equal(markers[0].type, "ENTITY");
  assert.equal(markers[0].name, "Entidad Centro");
  assert.equal(markers[1].type, "EVENT");
  assert.equal(markers[1].title, "Evento propio");
  assert.equal(markers[1].url, "/eventos/9");
}

async function testListEntityMapMarkersRejectsMissingEntity() {
  await assert.rejects(
    () =>
      listEntityMapMarkers(
        { userId: 999 },
        {
          prisma: {
            entity: {
              findUnique: async () => null,
            },
          },
        },
      ),
    {
      code: "ENTITY_NOT_FOUND",
    },
  );
}

module.exports = {
  testListEntityMapMarkersIncludesOwnOrganizationAndEvents,
  testListEntityMapMarkersRejectsMissingEntity,
};
