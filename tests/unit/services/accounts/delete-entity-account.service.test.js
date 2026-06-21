const assert = require("node:assert/strict");

const deleteEntityAccount = require("../../../../src/services/accounts/delete-entity-account.service");

async function testDeleteEntityAccountAnonymizesAndCleansFutureData() {
  const calls = [];
  const now = new Date("2099-05-01T10:00:00Z");
  const transaction = {
    user: {
      findUnique: async () => ({ id: 11, role: "ENTIDAD" }),
      update: async (query) => {
        calls.push({ operation: "updateUser", query });
        return query.data;
      },
    },
    entity: {
      findUnique: async () => ({ id: 4, requestedByUserId: 11 }),
      update: async (query) => {
        calls.push({ operation: "updateEntity", query });
        return query.data;
      },
    },
    event: {
      findMany: async (query) => {
        calls.push({ operation: "findEvents", query });
        return query.where.startsAt.gte ? [{ id: 20 }] : [{ id: 10 }];
      },
      updateMany: async (query) => {
        calls.push({ operation: "retireEvents", query });
        return { count: 1 };
      },
    },
    eventRegistration: {
      deleteMany: async (query) => {
        calls.push({ operation: "deleteRegistrations", query });
        return { count: 1 };
      },
    },
    entitySubscription: {
      deleteMany: async (query) => {
        calls.push({ operation: "deleteSubscriptions", query });
        return { count: 1 };
      },
    },
    internalNotification: {
      deleteMany: async (query) => {
        calls.push({ operation: "deleteNotifications", query });
        return { count: 1 };
      },
      updateMany: async (query) => {
        calls.push({ operation: "updateNotifications", query });
        return { count: 1 };
      },
    },
  };

  await deleteEntityAccount(
    { userId: 11, now },
    {
      prisma: {
        $transaction: async (callback) => callback(transaction),
      },
      createAnonymizedUserData: async () => ({
        firstName: "Usuario",
        lastName: "eliminado",
        email: "deleted-user-11@volunred.local",
        phone: null,
        passwordHash: "unusable-hash",
      }),
    },
  );

  const futureRegistrationCall = calls.find(
    (call) =>
      call.operation === "deleteRegistrations" &&
      call.query.where.eventId,
  );
  assert.deepEqual(futureRegistrationCall.query.where.eventId.in, [20]);

  const retireCall = calls.find((call) => call.operation === "retireEvents");
  assert.deepEqual(retireCall.query.where.id.in, [20]);
  assert.equal(retireCall.query.data.publicationStatus, "RETIRADO");

  const notificationDelete = calls.find(
    (call) => call.operation === "deleteNotifications",
  );
  assert.deepEqual(notificationDelete.query.where.eventId.in, [20]);

  const notificationUpdate = calls.find(
    (call) => call.operation === "updateNotifications",
  );
  assert.equal(notificationUpdate.query.where.entityId, 4);
  assert.deepEqual(notificationUpdate.query.where.eventId.in, [10]);

  const entityUpdate = calls.find((call) => call.operation === "updateEntity");
  assert.equal(entityUpdate.query.data.taxId, "deleted-entity-4");
  assert.equal(entityUpdate.query.data.validationStatus, "SUSPENDIDA");

  const userUpdate = calls.find((call) => call.operation === "updateUser");
  assert.equal(userUpdate.query.data.email, "deleted-user-11@volunred.local");
}

async function testDeleteEntityAccountRejectsMissingEntity() {
  await assert.rejects(
    () =>
      deleteEntityAccount(
        { userId: 11 },
        {
          prisma: {
            $transaction: async (callback) =>
              callback({
                user: {
                  findUnique: async () => ({ id: 11, role: "ENTIDAD" }),
                },
                entity: {
                  findUnique: async () => null,
                },
              }),
          },
          createAnonymizedUserData: async () => ({}),
        },
      ),
    (error) => error && error.code === "ENTITY_ACCOUNT_NOT_FOUND",
  );
}

module.exports = {
  testDeleteEntityAccountAnonymizesAndCleansFutureData,
  testDeleteEntityAccountRejectsMissingEntity,
};
