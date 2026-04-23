const prisma = require("../../config/prisma");

function padMonth(value) {
  return String(value).padStart(2, "0");
}

function formatLocalDate(date) {
  return `${date.getFullYear()}-${padMonth(date.getMonth() + 1)}-${padMonth(date.getDate())}`;
}

function getMonthMeta(rawMonth, baseDate = new Date()) {
  const match =
    typeof rawMonth === "string"
      ? rawMonth.match(/^(\d{4})-(\d{2})$/)
      : null;

  const year = match ? Number(match[1]) : baseDate.getFullYear();
  const monthIndex = match ? Number(match[2]) - 1 : baseDate.getMonth();
  const monthStart = new Date(year, monthIndex, 1);
  const nextMonthStart = new Date(year, monthIndex + 1, 1);

  return {
    monthKey: `${monthStart.getFullYear()}-${padMonth(monthStart.getMonth() + 1)}`,
    monthLabel: monthStart.toLocaleDateString("es-ES", {
      month: "long",
      year: "numeric",
    }),
    monthStart,
    nextMonthStart,
    previousMonthKey: `${new Date(year, monthIndex - 1, 1).getFullYear()}-${padMonth(
      new Date(year, monthIndex - 1, 1).getMonth() + 1,
    )}`,
    nextMonthKey: `${new Date(year, monthIndex + 1, 1).getFullYear()}-${padMonth(
      new Date(year, monthIndex + 1, 1).getMonth() + 1,
    )}`,
  };
}

function buildCalendarDays(registrations, monthStart, nextMonthStart) {
  const eventsByDay = new Map();

  registrations.forEach((registration) => {
    const eventDate = new Date(registration.event.startsAt);
    const isoDate = formatLocalDate(eventDate);
    const dayEvents = eventsByDay.get(isoDate) || [];

    dayEvents.push({
      id: registration.event.id,
      title: registration.event.title,
      startsAt: registration.event.startsAt,
      city: registration.event.city,
      entityName: registration.event.entity.organizationName,
    });

    dayEvents.sort((left, right) => new Date(left.startsAt) - new Date(right.startsAt));
    eventsByDay.set(isoDate, dayEvents);
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

async function getVolunteerCalendar(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;
  const monthMeta = getMonthMeta(input.month);

  const registrations = await prismaClient.eventRegistration.findMany({
    where: {
      volunteerUserId: input.volunteerUserId,
      event: {
        startsAt: {
          gte: monthMeta.monthStart,
          lt: monthMeta.nextMonthStart,
        },
      },
    },
    include: {
      event: {
        include: {
          entity: {
            select: {
              organizationName: true,
            },
          },
        },
      },
    },
    orderBy: {
      event: {
        startsAt: "asc",
      },
    },
  });

  return {
    ...monthMeta,
    registrations,
    weeks: buildCalendarDays(
      registrations,
      monthMeta.monthStart,
      monthMeta.nextMonthStart,
    ),
  };
}

module.exports = {
  buildCalendarDays,
  getMonthMeta,
  getVolunteerCalendar,
};
