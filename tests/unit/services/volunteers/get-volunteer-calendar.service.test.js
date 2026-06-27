const assert = require("node:assert/strict");

const {
  buildCalendarDays,
  getMonthMeta,
  getVolunteerCalendar,
} = require("../../../../src/services/volunteers/get-volunteer-calendar.service");

async function testGetVolunteerCalendarLoadsRegisteredEventsForSelectedMonth() {
  let receivedQuery = null;
  const prismaMock = {
    eventRegistration: {
      findMany: async (query) => {
        receivedQuery = query;
        return [
          {
            id: 1,
            event: {
              id: 17,
              title: "Banco de alimentos",
              city: "Madrid",
              startsAt: new Date("2099-05-10T09:00:00Z"),
              endsAt: new Date("2099-05-10T11:00:00Z"),
              entity: {
                organizationName: "Fundacion Horizonte",
              },
            },
          },
        ];
      },
    },
  };

  const result = await getVolunteerCalendar(
    {
      volunteerUserId: 8,
      month: "2099-05",
    },
    {
      prisma: prismaMock,
    },
  );

  assert.equal(receivedQuery.where.volunteerUserId, 8);
  assert.equal(receivedQuery.where.event.startsAt.lt.getTime(), new Date(2099, 5, 1).getTime());
  assert.equal(receivedQuery.where.event.OR[0].endsAt.gte.getTime(), new Date(2099, 4, 1).getTime());
  assert.equal(receivedQuery.where.event.OR[1].endsAt, null);
  assert.equal(result.monthKey, "2099-05");
  assert.equal(result.registrations.length, 1);
  assert.equal(result.weeks.flat().filter(Boolean).some((day) => day.events.length === 1), true);
}

function testBuildCalendarDaysPlacesEventsOnTheirDate() {
  const monthStart = new Date(2099, 4, 1);
  const nextMonthStart = new Date(2099, 5, 1);
  const startsAt = new Date(2099, 4, 10, 9, 0, 0);
  const weeks = buildCalendarDays(
    [
      {
        event: {
          id: 17,
          title: "Banco de alimentos",
          city: "Madrid",
          startsAt,
          endsAt: new Date(2099, 4, 10, 11, 0, 0),
          entity: {
            organizationName: "Fundacion Horizonte",
          },
        },
      },
    ],
    monthStart,
    nextMonthStart,
  );

  const expectedDayNumber = startsAt.getDate();
  const matchingDay = weeks
    .flat()
    .filter(Boolean)
    .find((day) => day.dayNumber === expectedDayNumber);

  assert.ok(matchingDay);
  assert.equal(matchingDay.events[0].title, "Banco de alimentos");
}

function testBuildCalendarDaysExpandsMultiDayEvents() {
  const monthStart = new Date(2099, 4, 1);
  const nextMonthStart = new Date(2099, 5, 1);
  const weeks = buildCalendarDays(
    [
      {
        event: {
          id: 17,
          title: "Banco de alimentos",
          city: "Madrid",
          startsAt: new Date(2099, 4, 10, 9, 0, 0),
          endsAt: new Date(2099, 4, 12, 11, 0, 0),
          entity: {
            organizationName: "Fundacion Horizonte",
          },
        },
      },
    ],
    monthStart,
    nextMonthStart,
  );

  const daysWithEvent = weeks
    .flat()
    .filter(Boolean)
    .filter((day) => day.events.some((event) => event.id === 17))
    .map((day) => day.dayNumber);

  assert.deepEqual(daysWithEvent, [10, 11, 12]);
}

function testGetMonthMetaNormalizesInvalidMonthInput() {
  const result = getMonthMeta("dato-invalido", new Date(2099, 6, 4));

  assert.equal(result.monthKey, "2099-07");
  assert.equal(result.previousMonthKey, "2099-06");
  assert.equal(result.nextMonthKey, "2099-08");
}

module.exports = {
  testBuildCalendarDaysExpandsMultiDayEvents,
  testBuildCalendarDaysPlacesEventsOnTheirDate,
  testGetMonthMetaNormalizesInvalidMonthInput,
  testGetVolunteerCalendarLoadsRegisteredEventsForSelectedMonth,
};
