const assert = require("node:assert/strict");

const withdrawEventPublication = require("../../../../src/services/admin/withdraw-event-publication.service");

async function testWithdrawEventPublicationMarksEventAsWithdrawnAndCreatesAdminLog() {
  const calls = [];
  const existingEvent = {
    id: 12,
    title: "Actividad moderada",
    publicationStatus: "ACTIVO",
    entityId: 4,
  };

  const transaction = {
    event: {
      findUnique: async (query) => {
        calls.push({ type: "findUnique", query });
        return existingEvent;
      },
      update: async (query) => {
        calls.push({ type: "update", query });
        return {
          ...existingEvent,
          publicationStatus: query.data.publicationStatus,
        };
      },
    },
    adminActionLog: {
      create: async (query) => {
        calls.push({ type: "log", query });
        return { id: 99 };
      },
    },
  };

  const prismaMock = {
    $transaction: async (callback) => callback(transaction),
  };

  const result = await withdrawEventPublication(
    {
      adminUserId: 1,
      eventId: 12,
      notes: "Contenido retirado por moderacion",
    },
    {
      prisma: prismaMock,
    },
  );

  assert.equal(result.publicationStatus, "RETIRADO");
  assert.equal(calls[1].query.data.publicationStatus, "RETIRADO");
  assert.deepEqual(calls[2].query.data, {
    action: "EVENT_WITHDRAWN",
    notes: "Contenido retirado por moderacion",
    adminUserId: 1,
    entityId: 4,
    eventId: 12,
  });
}

module.exports = {
  testWithdrawEventPublicationMarksEventAsWithdrawnAndCreatesAdminLog,
};
