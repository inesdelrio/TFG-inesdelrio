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

async function testUpdateEntityValidationStatusAllowsPendingStatus() {
  const createdLogs = [];

  const prismaMock = {
    $transaction: async (callback) =>
      callback({
        entity: {
          findUnique: async () => ({
            id: 1,
            validationStatus: "RECHAZADA",
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
      nextStatus: "PENDIENTE",
      notes: "Reabrir revision.",
    },
    {
      prisma: prismaMock,
    },
  );

  assert.equal(entity.validationStatus, "PENDIENTE");
  assert.equal(createdLogs[0].action, "ENTITY_MARKED_PENDING");
  assert.equal(createdLogs[0].fromStatus, "RECHAZADA");
  assert.equal(createdLogs[0].toStatus, "PENDIENTE");
}

async function testUpdateEntityValidationStatusRejectsMissingEntity() {
  const prismaMock = {
    $transaction: async (callback) =>
      callback({
        entity: {
          findUnique: async () => null,
        },
        adminActionLog: {
          create: async () => {
            throw new Error("No log should be created for missing entity.");
          },
        },
      }),
  };

  await assert.rejects(
    () =>
      updateEntityValidationStatus(
        {
          adminUserId: 10,
          entityId: 999,
          nextStatus: "VERIFICADA",
          notes: "",
        },
        {
          prisma: prismaMock,
        },
      ),
    {
      code: "ENTITY_NOT_FOUND",
    },
  );
}

async function testUpdateEntityValidationStatusRejectsSameStatus() {
  const prismaMock = {
    $transaction: async (callback) =>
      callback({
        entity: {
          findUnique: async () => ({
            id: 1,
            validationStatus: "VERIFICADA",
            requestedByUser: {
              id: 2,
            },
          }),
          update: async () => {
            throw new Error("Entity should not be updated.");
          },
        },
        adminActionLog: {
          create: async () => {
            throw new Error("No log should be created for invalid transition.");
          },
        },
      }),
  };

  await assert.rejects(
    () =>
      updateEntityValidationStatus(
        {
          adminUserId: 10,
          entityId: 1,
          nextStatus: "VERIFICADA",
          notes: "",
        },
        {
          prisma: prismaMock,
        },
      ),
    {
      code: "INVALID_ENTITY_STATUS_TRANSITION",
    },
  );
}

module.exports = {
  testUpdateEntityValidationStatusAllowsPendingStatus,
  testUpdateEntityValidationStatusChangesStatusAndCreatesAdminLog,
  testUpdateEntityValidationStatusRejectsMissingEntity,
  testUpdateEntityValidationStatusRejectsSameStatus,
};
