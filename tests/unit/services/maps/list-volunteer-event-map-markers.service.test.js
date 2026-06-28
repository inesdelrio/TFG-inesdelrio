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
                endsAt: new Date("2099-02-02T12:00:00.000Z"),
                address: "Calle Mayor 10",
                normalizedAddress: "Calle Mayor 10, Madrid",
                latitude: "40.416800",
                longitude: "-3.703800",
                totalSlots: 3,
                _count: {
                  registrations: 1,
                },
                registrations: [],
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
  assert.equal(receivedQuery.where.OR[0].endsAt.gte, now);
  assert.equal(receivedQuery.where.OR[1].endsAt, null);
  assert.deepEqual(receivedQuery.where.OR[1].startsAt, { gte: now });
  assert.deepEqual(receivedQuery.where.entity, { validationStatus: "VERIFICADA" });
  assert.deepEqual(receivedQuery.where.latitude, { not: null });
  assert.equal(markers.length, 1);
  assert.equal(markers[0].type, "EVENT");
  assert.equal(markers[0].title, "Recogida solidaria");
  assert.equal(markers[0].entityName, "Fundacion Horizonte");
  assert.equal(markers[0].latitude, 40.4168);
  assert.equal(markers[0].url, "/eventos/7");
  assert.equal(markers[0].detailUrl, "/eventos/7");
  assert.equal(markers[0].timeLabel, "11:00 - 13:00");
  assert.equal(markers[0].availableSlots, 2);
  assert.equal(markers[0].registrationState, "AVAILABLE");
  assert.equal(markers[0].actionLabel, "Inscribirme");
  assert.equal(markers[0].colorClass, "calendar-event-pastel-1");
  assert.match(markers[0].markerColor, /^#[0-9a-f]{6}$/i);
}

async function testListVolunteerEventMapMarkersMarksRegisteredAndFullEvents() {
  const markers = await listVolunteerEventMapMarkers(
    {
      volunteerUserId: 42,
      now: new Date("2099-01-01T00:00:00.000Z"),
    },
    {
      prisma: {
        event: {
          findMany: async (query) => {
            assert.deepEqual(query.include.registrations.where, {
              volunteerUserId: 42,
            });

            return [
              {
                id: 8,
                title: "Evento inscrito",
                startsAt: new Date("2099-02-01T10:00:00.000Z"),
                address: "Calle A",
                latitude: "40.416800",
                longitude: "-3.703800",
                totalSlots: 5,
                _count: {
                  registrations: 2,
                },
                registrations: [{ id: 1 }],
                entity: {
                  organizationName: "Entidad",
                },
              },
              {
                id: 9,
                title: "Evento completo",
                startsAt: new Date("2099-02-01T10:00:00.000Z"),
                address: "Calle B",
                latitude: "40.416800",
                longitude: "-3.703800",
                totalSlots: 2,
                _count: {
                  registrations: 2,
                },
                registrations: [],
                entity: {
                  organizationName: "Entidad",
                },
              },
            ];
          },
        },
      },
    },
  );

  assert.equal(markers[0].registrationState, "REGISTERED");
  assert.equal(markers[0].actionLabel, "Ya estas inscrito");
  assert.equal(markers[1].registrationState, "FULL");
  assert.equal(markers[1].actionLabel, "Evento completo");
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
  testListVolunteerEventMapMarkersMarksRegisteredAndFullEvents,
  testListVolunteerEventMapMarkersReturnsVisibleFutureEventsWithCoordinates,
};
