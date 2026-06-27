const prisma = require("../../config/prisma");
const {
  getMonthMeta,
} = require("../volunteers/get-volunteer-calendar.service");
const {
  buildEventRangeWhere,
  expandEventDates,
  formatLocalDate,
} = require("../events/event-date-range.service");
const { getEventColorData } = require("../events/event-color.service");

function buildEntityCalendarDays(events, monthStart, nextMonthStart) {
  const eventsByDay = new Map();

  events.forEach((event) => {
    expandEventDates(event, monthStart, nextMonthStart).forEach((isoDate) => {
      const dayEvents = eventsByDay.get(isoDate) || [];

      dayEvents.push({
        ...event,
        colorClass: getEventColorData(event.id).colorClass,
      });
      dayEvents.sort((left, right) => new Date(left.startsAt) - new Date(right.startsAt));
      eventsByDay.set(isoDate, dayEvents);
    });
  });

  const totalDays = new Date(
    monthStart.getFullYear(),
    monthStart.getMonth() + 1,
    0,
  ).getDate();
  const leadingEmptyDays = (monthStart.getDay() + 6) % 7;
  const weeks = [];
  let currentWeek = [];

  for (let index = 0; index < leadingEmptyDays; index += 1) {
    currentWeek.push(null);
  }

  for (let dayNumber = 1; dayNumber <= totalDays; dayNumber += 1) {
    const currentDate = new Date(
      monthStart.getFullYear(),
      monthStart.getMonth(),
      dayNumber,
    );

    if (currentDate < monthStart || currentDate >= nextMonthStart) {
      continue;
    }

    const isoDate = formatLocalDate(currentDate);

    currentWeek.push({
      isoDate,
      dayNumber,
      events: eventsByDay.get(isoDate) || [],
    });

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }

    weeks.push(currentWeek);
  }

  return weeks;
}

async function getEntityCalendar(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;
  const monthMeta = getMonthMeta(input.month);
  const entity = await prismaClient.entity.findUnique({
    where: {
      requestedByUserId: input.userId,
    },
    select: {
      id: true,
      organizationName: true,
    },
  });

  if (!entity) {
    const error = new Error("Entity not found.");
    error.code = "ENTITY_NOT_FOUND";
    throw error;
  }

  const events = await prismaClient.event.findMany({
    where: {
      entityId: entity.id,
      ...buildEventRangeWhere(monthMeta.monthStart, monthMeta.nextMonthStart),
    },
    select: {
      id: true,
      title: true,
      startsAt: true,
      endsAt: true,
      city: true,
      address: true,
    },
    orderBy: {
      startsAt: "asc",
    },
  });

  return {
    ...monthMeta,
    entity,
    events,
    weeks: buildEntityCalendarDays(
      events,
      monthMeta.monthStart,
      monthMeta.nextMonthStart,
    ),
  };
}

module.exports = {
  buildEntityCalendarDays,
  getEntityCalendar,
};
