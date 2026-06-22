const assert = require("node:assert/strict");

const deleteEntitySubscription = require("../../../../src/services/entities/delete-entity-subscription.service");

async function testDeleteEntitySubscriptionDeletesExistingSubscription() {
  let deletedWhere = null;
  let deletedNotificationWhere = null;
  let transactionUsed = false;
  const transaction = {
    entitySubscription: {
      delete: async ({ where }) => {
        deletedWhere = where;
        return { id: 7, volunteerUserId: 4, entityId: 9 };
      },
    },
    internalNotification: {
      deleteMany: async ({ where }) => {
        deletedNotificationWhere = where;
        return { count: 1 };
      },
    },
  };
  const prismaMock = {
    $transaction: async (callback) => {
      transactionUsed = true;
      return callback(transaction);
    },
    entitySubscription: {
      findUnique: async () => ({
        id: 7,
        volunteerUserId: 4,
        entityId: 9,
        entity: {
          requestedByUserId: 12,
        },
      }),
    },
  };

  const deletedSubscription = await deleteEntitySubscription(
    {
      volunteerUserId: 4,
      entityId: 9,
    },
    {
      prisma: prismaMock,
    },
  );

  assert.equal(transactionUsed, true);
  assert.deepEqual(deletedWhere, {
    volunteerUserId_entityId: {
      volunteerUserId: 4,
      entityId: 9,
    },
  });
  assert.deepEqual(deletedNotificationWhere, {
    recipientUserId: 12,
    actorUserId: 4,
    entityId: 9,
    type: "ENTITY_FOLLOWED",
  });
  assert.equal(deletedSubscription.id, 7);
}

async function testDeleteEntitySubscriptionReturnsNullWhenSubscriptionDoesNotExist() {
  let deleteCalled = false;
  const prismaMock = {
    entitySubscription: {
      findUnique: async () => null,
      delete: async () => {
        deleteCalled = true;
        throw new Error("No deberia eliminar");
      },
    },
  };

  const deletedSubscription = await deleteEntitySubscription(
    {
      volunteerUserId: 4,
      entityId: 9,
    },
    {
      prisma: prismaMock,
    },
  );

  assert.equal(deletedSubscription, null);
  assert.equal(deleteCalled, false);
}

module.exports = {
  testDeleteEntitySubscriptionDeletesExistingSubscription,
  testDeleteEntitySubscriptionReturnsNullWhenSubscriptionDoesNotExist,
};
