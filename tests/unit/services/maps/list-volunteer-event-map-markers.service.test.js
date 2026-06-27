const assert = require("node:assert/strict");

const listVolunteerEventMapMarkers = require("../../../../src/services/maps/list-volunteer-event-map-markers.service");

async function testListVolunteerEventMapMarkersReturnsVisibleFutureEventsWithCoordinates() {
  let receivedQuery = null;
  const now = new Date("2099-01-01T00:00:00.000Z");
  const markers = await listVolunteerEventMapMarkers(
    { now },
    {
      prisma: {
        event: {
          findMany: async (query) => {
            receivedQuery = query;
            return [
              {
                id: 7,
                title: "Recogida solidaria",
                startsAt: new Date("2099-02-01T10:00:00.000Z"),
                address: "Calle Mayor 10",
                normalizedAddress: "Calle Mayor 10, Madrid",
                latitude: "40.416800",
                longitude: "-3.703800",
                entity: {
                  organizationName: "Fundacion Horizonte",
                },
              },
            ];
          },
        },
      },
    },
  );

  assert.equal(receivedQuery.where.publicationStatus, "ACTIVO");
  assert.deepEqual(receivedQuery.where.startsAt, { gte: now });
  assert.deepEqual(receivedQuery.where.entity, { validationStatus: "VERIFICADA" });
  assert.deepEqual(receivedQuery.where.latitude, { not: null });
  assert.equal(markers.length, 1);
  assert.equal(markers[0].type, "EVENT");
  assert.equal(markers[0].title, "Recogida solidaria");
  assert.equal(markers[0].entityName, "Fundacion Horizonte");
  assert.equal(markers[0].latitude, 40.4168);
  assert.equal(markers[0].url, "/eventos/7");
}

async function testListVolunteerEventMapMarkersExcludesEventsWithoutCoordinates() {
  let receivedQuery = null;

  await listVolunteerEventMapMarkers(
    {},
    {
      prisma: {
        event: {
          findMany: async (query) => {
            receivedQuery = query;
            return [];
          },
        },
      },
    },
  );

  assert.deepEqual(receivedQuery.where.latitude, { not: null });
  assert.deepEqual(receivedQuery.where.longitude, { not: null });
}

module.exports = {
  testListVolunteerEventMapMarkersExcludesEventsWithoutCoordinates,
  testListVolunteerEventMapMarkersReturnsVisibleFutureEventsWithCoordinates,
};
