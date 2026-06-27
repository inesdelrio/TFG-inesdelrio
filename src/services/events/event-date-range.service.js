const MAX_EVENT_DAYS = 30;

function pad(value) {
  return String(value).padStart(2, "0");
}

function formatLocalDate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseLocalDateTime(dateValue, timeValue) {
  return new Date(`${dateValue}T${timeValue}:00`);
}

function getEffectiveEndsAt(event) {
  return event.endsAt ? new Date(event.endsAt) : new Date(event.startsAt);
}

function getInclusiveDaySpan(startDate, endDate) {
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  return Math.floor((end - start) / millisecondsPerDay) + 1;
}

function expandEventDates(event, rangeStart, rangeEnd) {
  const startsAt = new Date(event.startsAt);
  const endsAt = getEffectiveEndsAt(event);
  const firstDay = new Date(startsAt.getFullYear(), startsAt.getMonth(), startsAt.getDate());
  const lastDay = new Date(endsAt.getFullYear(), endsAt.getMonth(), endsAt.getDate());
  const clippedStart = firstDay < rangeStart ? rangeStart : firstDay;
  const lastVisibleDay = new Date(rangeEnd.getFullYear(), rangeEnd.getMonth(), rangeEnd.getDate() - 1);
  const clippedEnd = lastDay > lastVisibleDay ? lastVisibleDay : lastDay;
  const dates = [];

  for (
    let current = new Date(clippedStart);
    current <= clippedEnd;
    current = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1)
  ) {
    dates.push(formatLocalDate(current));
  }

  return dates;
}

function buildEventRangeWhere(rangeStart, rangeEnd) {
  return {
    startsAt: {
      lt: rangeEnd,
    },
    OR: [
      {
        endsAt: {
          gte: rangeStart,
        },
      },
      {
        endsAt: null,
        startsAt: {
          gte: rangeStart,
        },
      },
    ],
  };
}

function buildCurrentOrFutureWhere(now) {
  return {
    OR: [
      {
        endsAt: {
          gte: now,
        },
      },
      {
        endsAt: null,
        startsAt: {
          gte: now,
        },
      },
    ],
  };
}

module.exports = {
  MAX_EVENT_DAYS,
  buildCurrentOrFutureWhere,
  buildEventRangeWhere,
  expandEventDates,
  formatLocalDate,
  getEffectiveEndsAt,
  getInclusiveDaySpan,
  parseLocalDateTime,
};
