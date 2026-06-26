const assert = require("node:assert/strict");

const listAdminEntities = require("../../../../src/services/admin/list-admin-entities.service");

function createPrismaMock() {
  const calls = [];
  return {
    calls,
    entity: {
      findMany: async (query) => {
        calls.push(query);
        return [
          {
            id: 1,
            organizationName: "Banco Solidario",
            validationStatus: query.where?.validationStatus || "VERIFICADA",
          },
        ];
      },
    },
  };
}

async function testListAdminEntitiesReturnsAllEntitiesWithoutFilter() {
  const prismaMock = createPrismaMock();

  const result = await listAdminEntities({}, { prisma: prismaMock });

  assert.equal(result.entities.length, 1);
  assert.equal(result.selectedStatus, "TODAS");
  assert.equal(prismaMock.calls[0].where, undefined);
}

async function testListAdminEntitiesFiltersPendingEntities() {
  const prismaMock = createPrismaMock();

  const result = await listAdminEntities(
    { status: "PENDIENTE" },
    { prisma: prismaMock },
  );

  assert.equal(result.selectedStatus, "PENDIENTE");
  assert.deepEqual(prismaMock.calls[0].where, {
    validationStatus: "PENDIENTE",
  });
}

async function testListAdminEntitiesFiltersVerifiedEntities() {
  const prismaMock = createPrismaMock();

  const result = await listAdminEntities(
    { status: "VERIFICADA" },
    { prisma: prismaMock },
  );

  assert.equal(result.selectedStatus, "VERIFICADA");
  assert.deepEqual(prismaMock.calls[0].where, {
    validationStatus: "VERIFICADA",
  });
}

async function testListAdminEntitiesFiltersRejectedEntities() {
  const prismaMock = createPrismaMock();

  const result = await listAdminEntities(
    { status: "RECHAZADA" },
    { prisma: prismaMock },
  );

  assert.equal(result.selectedStatus, "RECHAZADA");
  assert.deepEqual(prismaMock.calls[0].where, {
    validationStatus: "RECHAZADA",
  });
}

async function testListAdminEntitiesFiltersSuspendedEntities() {
  const prismaMock = createPrismaMock();

  const result = await listAdminEntities(
    { status: "SUSPENDIDA" },
    { prisma: prismaMock },
  );

  assert.equal(result.selectedStatus, "SUSPENDIDA");
  assert.deepEqual(prismaMock.calls[0].where, {
    validationStatus: "SUSPENDIDA",
  });
}

async function testListAdminEntitiesTreatsInvalidFilterAsAll() {
  const prismaMock = createPrismaMock();

  const result = await listAdminEntities(
    { status: "CADUCADA" },
    { prisma: prismaMock },
  );

  assert.equal(result.selectedStatus, "TODAS");
  assert.equal(prismaMock.calls[0].where, undefined);
}

module.exports = {
  testListAdminEntitiesFiltersPendingEntities,
  testListAdminEntitiesFiltersRejectedEntities,
  testListAdminEntitiesFiltersSuspendedEntities,
  testListAdminEntitiesFiltersVerifiedEntities,
  testListAdminEntitiesReturnsAllEntitiesWithoutFilter,
  testListAdminEntitiesTreatsInvalidFilterAsAll,
};
