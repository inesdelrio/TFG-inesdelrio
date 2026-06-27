const assert = require("node:assert/strict");

const getEntityHistory = require("../../../../src/services/entities/get-entity-history.service");

async function testGetEntityHistorySeparatesFutureAndPastEvents() {
  const now = new Date("2099-05-15T10:00:00.000Z");
  let receivedEntityQuery = null;
  let receivedEventsQuery = null;
  const prismaMock = {
    entity: {
      findUnique: async (query) => {
        receivedEntityQuery = query;
        return {
          id: 4,
          organizationName: "Entidad prueba",
        };
      },
    },
    event: {
      findMany: async (query) => {
        receivedEventsQuery = query;
        return [
          {
            id: 17,
            title: "Evento pasado",
            city: "Madrid",
            address: "Calle A",
            startsAt: new Date("2099-05-01T09:00:00.000Z"),
            endsAt: new Date("2099-05-01T11:00:00.000Z"),
            publicationStatus: "ACTIVO",
            totalSlots: 20,
            _count: {
              registrations: 8,
            },
          },
          {
            id: 18,
            title: "Evento futuro",
            city: "Madrid",
            address: "Calle B",
            startsAt: new Date("2099-05-14T09:00:00.000Z"),
            endsAt: new Date("2099-05-16T11:00:00.000Z"),
            publicationStatus: "RETIRADO",
            totalSlots: 10,
            _count: {
              registrations: 3,
            },
          },
        ];
      },
    },
  };

  const history = await getEntityHistory(
    {
      userId: 8,
      now,
    },
    {
      prisma: prismaMock,
    },
  );

  assert.equal(receivedEntityQuery.where.requestedByUserId, 8);
  assert.equal(receivedEventsQuery.where.entityId, 4);
  assert.deepEqual(receivedEventsQuery.orderBy, { startsAt: "asc" });
  assert.equal(history.entity.organizationName, "Entidad prueba");
  assert.equal(history.pastEvents.length, 1);
  assert.equal(history.pastEvents[0].title, "Evento pasado");
  assert.equal(history.pastEvents[0].registrationsCount, 8);
  assert.equal(history.pastEvents[0].canOpenDetail, true);
  assert.equal(history.futureEvents.length, 1);
  assert.equal(history.futureEvents[0].title, "Evento futuro");
  assert.equal(history.futureEvents[0].registrationsCount, 3);
  assert.equal(history.futureEvents[0].canOpenDetail, false);
}

async function testGetEntityHistoryRejectsMissingEntity() {
  const prismaMock = {
    entity: {
      findUnique: async () => null,
    },
  };

  await assert.rejects(
    () =>
      getEntityHistory(
        {
          userId: 8,
        },
        {
          prisma: prismaMock,
        },
      ),
    {
      code: "ENTITY_NOT_FOUND",
    },
  );
}

module.exports = {
  testGetEntityHistoryRejectsMissingEntity,
  testGetEntityHistorySeparatesFutureAndPastEvents,
};
