const assert = require("node:assert/strict");

const {
  buildEntityCalendarDays,
  getEntityCalendar,
} = require("../../../../src/services/entities/get-entity-calendar.service");

async function testGetEntityCalendarLoadsOnlyOwnedEventsForSelectedMonth() {
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
            title: "Banco de alimentos",
            city: "Madrid",
            startsAt: new Date(2099, 4, 10, 9, 0, 0),
          },
        ];
      },
    },
  };

  const result = await getEntityCalendar(
    {
      userId: 8,
      month: "2099-05",
    },
    {
      prisma: prismaMock,
    },
  );

  assert.equal(receivedEntityQuery.where.requestedByUserId, 8);
  assert.equal(receivedEventsQuery.where.entityId, 4);
  assert.equal(
    receivedEventsQuery.where.startsAt.gte.getTime(),
    new Date(2099, 4, 1).getTime(),
  );
  assert.equal(
    receivedEventsQuery.where.startsAt.lt.getTime(),
    new Date(2099, 5, 1).getTime(),
  );
  assert.equal(result.monthKey, "2099-05");
  assert.equal(result.events.length, 1);
}

function testBuildEntityCalendarDaysPlacesEventsOnTheirDate() {
  const monthStart = new Date(2099, 4, 1);
  const nextMonthStart = new Date(2099, 5, 1);
  const startsAt = new Date(2099, 4, 10, 9, 0, 0);
  const weeks = buildEntityCalendarDays(
    [
      {
        id: 17,
        title: "Banco de alimentos",
        city: "Madrid",
        startsAt,
      },
    ],
    monthStart,
    nextMonthStart,
  );

  const matchingDay = weeks
    .flat()
    .filter(Boolean)
    .find((day) => day.dayNumber === startsAt.getDate());

  assert.ok(matchingDay);
  assert.equal(matchingDay.events[0].title, "Banco de alimentos");
  assert.equal(matchingDay.events[0].city, "Madrid");
}

async function testGetEntityCalendarReturnsEmptyMonthWithoutEvents() {
  const result = await getEntityCalendar(
    {
      userId: 8,
      month: "2099-05",
    },
    {
      prisma: {
        entity: {
          findUnique: async () => ({
            id: 4,
            organizationName: "Entidad prueba",
          }),
        },
        event: {
          findMany: async () => [],
        },
      },
    },
  );

  assert.equal(result.events.length, 0);
  assert.equal(
    result.weeks.flat().filter(Boolean).every((day) => day.events.length === 0),
    true,
  );
}

module.exports = {
  testBuildEntityCalendarDaysPlacesEventsOnTheirDate,
  testGetEntityCalendarLoadsOnlyOwnedEventsForSelectedMonth,
  testGetEntityCalendarReturnsEmptyMonthWithoutEvents,
};
