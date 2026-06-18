const assert = require("node:assert/strict");

const listPublishedEvents = require("../../../../src/services/events/list-published-events.service");

async function testListPublishedEventsReturnsOrderedPaginatedActiveEvents() {
  const calls = [];
  const prismaMock = {
    event: {
      count: async ({ where }) => {
        calls.push({ type: "count", where });
        return 8;
      },
      findMany: async (query) => {
        calls.push({ type: "findMany", query });
        return [
          {
            id: 1,
            title: "Evento 1",
            entityId: 7,
            entity: {
              id: 7,
              organizationName: "Entidad",
              validationStatus: "VERIFICADA",
            },
          },
        ];
      },
    },
  };

  const result = await listPublishedEvents(
    {
      page: 2,
      pageSize: 3,
      now: new Date("2099-01-01T00:00:00Z"),
    },
    {
      prisma: prismaMock,
    },
  );

  assert.equal(result.events.length, 1);
  assert.equal(result.pagination.currentPage, 2);
  assert.equal(result.pagination.totalPages, 3);
  assert.equal(calls[1].query.skip, 3);
  assert.equal(calls[1].query.take, 3);
}

async function testListPublishedEventsAppliesCombinedFilters() {
  const calls = [];
  const prismaMock = {
    event: {
      count: async ({ where }) => {
        calls.push({ type: "count", where });
        return 1;
      },
      findMany: async (query) => {
        calls.push({ type: "findMany", query });
        return [];
      },
    },
  };

  await listPublishedEvents(
    {
      page: 1,
      pageSize: 6,
      now: new Date("2099-03-01T00:00:00Z"),
      filters: {
        eventDate: "2099-03-12",
        city: "Madrid",
        entity: "Horizonte",
      },
    },
    {
      prisma: prismaMock,
    },
  );

  assert.equal(calls[0].where.city.contains, "Madrid");
  assert.equal(calls[0].where.entity.organizationName.contains, "Horizonte");
  assert.ok(calls[0].where.startsAt.gte);
  assert.ok(calls[0].where.startsAt.lte);
}

async function testListPublishedEventsExcludesWithdrawnEventsAndSuspendedEntities() {
  const calls = [];
  const prismaMock = {
    event: {
      count: async ({ where }) => {
        calls.push({ type: "count", where });
        return 0;
      },
      findMany: async (query) => {
        calls.push({ type: "findMany", query });
        return [];
      },
    },
  };

  await listPublishedEvents(
    {
      now: new Date("2099-01-01T00:00:00Z"),
    },
    {
      prisma: prismaMock,
    },
  );

  assert.equal(calls[0].where.publicationStatus, "ACTIVO");
  assert.equal(calls[0].where.entity.validationStatus, "VERIFICADA");
  assert.equal(calls[1].query.where.publicationStatus, "ACTIVO");
  assert.equal(calls[1].query.where.entity.validationStatus, "VERIFICADA");
}

module.exports = {
  testListPublishedEventsAppliesCombinedFilters,
  testListPublishedEventsExcludesWithdrawnEventsAndSuspendedEntities,
  testListPublishedEventsReturnsOrderedPaginatedActiveEvents,
};
