const assert = require("node:assert/strict");

const getAdminDashboardSummary = require("../../../../src/services/admin/get-admin-dashboard-summary.service");

async function testGetAdminDashboardSummaryReturnsBasicCounters() {
  const countCalls = [];
  const prismaMock = {
    user: {
      count: async (query) => {
        countCalls.push(["user", query || null]);

        if (!query) {
          return 12;
        }

        if (query.where.role === "VOLUNTARIO") {
          return 8;
        }

        return 0;
      },
    },
    entity: {
      count: async (query) => {
        countCalls.push(["entity", query || null]);

        if (!query) {
          return 4;
        }

        if (query.where.validationStatus === "PENDIENTE") {
          return 1;
        }

        if (query.where.validationStatus === "VERIFICADA") {
          return 2;
        }

        return 0;
      },
    },
    event: {
      count: async (query) => {
        countCalls.push(["event", query || null]);
        return query ? 5 : 7;
      },
    },
  };

  const result = await getAdminDashboardSummary({
    prisma: prismaMock,
  });

  assert.equal(result.totalUsers, 12);
  assert.equal(result.totalVolunteers, 8);
  assert.equal(result.totalEntities, 4);
  assert.equal(result.pendingEntities, 1);
  assert.equal(result.verifiedEntities, 2);
  assert.equal(result.totalEvents, 7);
  assert.equal(result.upcomingEvents, 5);
  assert.equal(countCalls.length, 7);
}

module.exports = {
  testGetAdminDashboardSummaryReturnsBasicCounters,
};
