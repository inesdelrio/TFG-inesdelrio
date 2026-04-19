const prisma = require("../../config/prisma");

async function listPublishedEvents(options = {}, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;
  const page = Number.isInteger(options.page) && options.page > 0 ? options.page : 1;
  const pageSize = Number.isInteger(options.pageSize) && options.pageSize > 0 ? options.pageSize : 6;
  const now = options.now || new Date();
  const filters = options.filters || {};

  const where = {
    startsAt: {
      gte: now,
    },
  };

  if (filters.eventDate) {
    const dateStart = new Date(`${filters.eventDate}T00:00:00`);
    const dateEnd = new Date(`${filters.eventDate}T23:59:59.999`);

    where.startsAt = {
      gte: dateStart > now ? dateStart : now,
      lte: dateEnd,
    };
  }

  if (filters.city) {
    where.city = {
      contains: filters.city,
      mode: "insensitive",
    };
  }

  if (filters.entity) {
    where.entity = {
      organizationName: {
        contains: filters.entity,
        mode: "insensitive",
      },
    };
  }

  const totalCount = await prismaClient.event.count({ where });
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(page, totalPages);

  const events = await prismaClient.event.findMany({
    where,
    orderBy: {
      startsAt: "asc",
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
    include: {
      entity: {
        select: {
          id: true,
          organizationName: true,
          validationStatus: true,
        },
      },
    },
  });

  return {
    events,
    pagination: {
      currentPage,
      pageSize,
      totalCount,
      totalPages,
      hasPreviousPage: currentPage > 1,
      hasNextPage: currentPage < totalPages,
      previousPage: currentPage > 1 ? currentPage - 1 : null,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
    },
  };
}

module.exports = listPublishedEvents;
