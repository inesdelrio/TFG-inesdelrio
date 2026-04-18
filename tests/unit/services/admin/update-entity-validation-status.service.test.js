const assert = require("node:assert/strict");

const updateEntityValidationStatus = require("../../../../src/services/admin/update-entity-validation-status.service");

async function testUpdateEntityValidationStatusChangesStatusAndCreatesAdminLog() {
  const createdLogs = [];

  const prismaMock = {
    $transaction: async (callback) =>
      callback({
        entity: {
          findUnique: async () => ({
            id: 1,
            validationStatus: "PENDIENTE",
            requestedByUser: {
              id: 2,
            },
          }),
          update: async ({ data }) => ({
            id: 1,
            validationStatus: data.validationStatus,
          }),
        },
        adminActionLog: {
          create: async ({ data }) => {
            createdLogs.push(data);
            return { id: 1, ...data };
          },
        },
      }),
  };

  const entity = await updateEntityValidationStatus(
    {
      adminUserId: 10,
      entityId: 1,
      nextStatus: "VERIFICADA",
      notes: "Documentacion correcta.",
    },
    {
      prisma: prismaMock,
    },
  );

  assert.equal(entity.validationStatus, "VERIFICADA");
  assert.equal(createdLogs[0].action, "ENTITY_APPROVED");
  assert.equal(createdLogs[0].fromStatus, "PENDIENTE");
  assert.equal(createdLogs[0].toStatus, "VERIFICADA");
}

module.exports = {
  testUpdateEntityValidationStatusChangesStatusAndCreatesAdminLog,
};
