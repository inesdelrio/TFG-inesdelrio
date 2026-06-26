const prisma = require("../../config/prisma");

const STATUS_OPTIONS = ["TODAS", "PENDIENTE", "VERIFICADA", "RECHAZADA", "SUSPENDIDA"];
const FILTERABLE_STATUSES = new Set(STATUS_OPTIONS.filter((status) => status !== "TODAS"));

function normalizeStatus(status) {
  return FILTERABLE_STATUSES.has(status) ? status : "TODAS";
}

async function listAdminEntities(input = {}, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;
  const selectedStatus = normalizeStatus(input.status);
  const where =
    selectedStatus === "TODAS"
      ? undefined
      : {
          validationStatus: selectedStatus,
        };

  const entities = await prismaClient.entity.findMany({
    ...(where ? { where } : {}),
    orderBy: {
      createdAt: "desc",
    },
    include: {
      requestedByUser: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });

  return {
    entities,
    selectedStatus,
    statusOptions: STATUS_OPTIONS,
  };
}

module.exports = listAdminEntities;
