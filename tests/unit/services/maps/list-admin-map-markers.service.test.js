const assert = require("node:assert/strict");

const listAdminMapMarkers = require("../../../../src/services/maps/list-admin-map-markers.service");

async function testListAdminMapMarkersIncludesEventsAndEntitiesWithCoordinates() {
  const markers = await listAdminMapMarkers(
    {},
    {
      prisma: {
        event: {
          findMany: async (query) => {
            assert.deepEqual(query.where.latitude, { not: null });
            return [
              {
                id: 4,
                title: "Evento admin",
                startsAt: new Date("2099-04-01T10:00:00.000Z"),
                publicationStatus: "ACTIVO",
                address: "Calle Evento",
                normalizedAddress: "Calle Evento, Madrid",
                latitude: "40.416800",
                longitude: "-3.703800",
                entity: {
                  organizationName: "Entidad Uno",
                },
              },
            ];
          },
        },
        entity: {
          findMany: async (query) => {
            assert.deepEqual(query.where.longitude, { not: null });
            return [
              {
                id: 2,
                organizationName: "Entidad Uno",
                validationStatus: "VERIFICADA",
                contactEmail: "contacto@uno.test",
                address: "Calle Entidad",
                normalizedAddress: "Calle Entidad, Madrid",
                latitude: "40.42",
                longitude: "-3.71",
                requestedByUser: {
                  firstName: "Ana",
                  lastName: "Lopez",
                  email: "ana@example.com",
                },
              },
            ];
          },
        },
      },
    },
  );

  assert.equal(markers.length, 2);
  assert.equal(markers[0].type, "EVENT");
  assert.equal(markers[0].url, "/eventos/4");
  assert.equal(markers[1].type, "ENTITY");
  assert.equal(markers[1].url, "/admin/entidades/2");
  assert.equal(markers[1].requesterEmail, "ana@example.com");
}

module.exports = {
  testListAdminMapMarkersIncludesEventsAndEntitiesWithCoordinates,
};
