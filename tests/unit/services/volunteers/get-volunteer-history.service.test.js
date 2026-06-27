const assert = require("node:assert/strict");

const getVolunteerHistory = require("../../../../src/services/volunteers/get-volunteer-history.service");

async function testGetVolunteerHistorySeparatesFutureAndPastRegistrations() {
  let receivedQuery = null;
  const prismaMock = {
    eventRegistration: {
      findMany: async (query) => {
        receivedQuery = query;
        return [
          {
            id: 1,
            event: {
              id: 10,
              title: "Actividad pasada",
              startsAt: new Date("2099-01-10T09:00:00Z"),
              endsAt: new Date("2099-01-12T10:00:00Z"),
              city: "Madrid",
              address: "Calle Pasada 1",
              publicationStatus: "ACTIVO",
              entity: {
                organizationName: "Entidad Pasada",
                validationStatus: "VERIFICADA",
              },
            },
          },
          {
            id: 2,
            event: {
              id: 11,
              title: "Actividad futura",
              startsAt: new Date("2099-01-31T09:00:00Z"),
              endsAt: new Date("2099-02-02T10:00:00Z"),
              city: "Sevilla",
              address: "Calle Futura 2",
              publicationStatus: "ACTIVO",
              entity: {
                organizationName: "Entidad Futura",
                validationStatus: "VERIFICADA",
              },
            },
          },
          {
            id: 3,
            event: {
              id: 12,
              title: "Actividad retirada",
              startsAt: new Date("2099-03-10T09:00:00Z"),
              endsAt: null,
              city: "Valencia",
              address: "Calle Retirada 3",
              publicationStatus: "RETIRADO",
              entity: {
                organizationName: "Entidad Retirada",
                validationStatus: "VERIFICADA",
              },
            },
          },
        ];
      },
    },
  };

  const history = await getVolunteerHistory(
    {
      volunteerUserId: 7,
      now: new Date("2099-02-01T00:00:00Z"),
    },
    {
      prisma: prismaMock,
    },
  );

  assert.equal(receivedQuery.where.volunteerUserId, 7);
  assert.equal(receivedQuery.include.event.include.entity.select.organizationName, true);
  assert.equal(history.pastActivities.length, 1);
  assert.equal(history.futureActivities.length, 2);
  assert.equal(history.pastActivities[0].title, "Actividad pasada");
  assert.equal(history.futureActivities[0].title, "Actividad futura");
  assert.equal(history.futureActivities[1].publicationStatus, "RETIRADO");
  assert.equal(history.futureActivities[1].canOpenDetail, false);
}

module.exports = {
  testGetVolunteerHistorySeparatesFutureAndPastRegistrations,
};
