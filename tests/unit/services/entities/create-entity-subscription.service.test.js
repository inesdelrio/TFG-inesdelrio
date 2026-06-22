const assert = require("node:assert/strict");

const createEntitySubscription = require("../../../../src/services/entities/create-entity-subscription.service");

async function testCreateEntitySubscriptionCreatesSubscriptionWithoutDuplicates() {
  let createdPayload = null;
  let notificationPayload = null;
  let transactionUsed = false;
  const transaction = {
    entitySubscription: {
      create: async ({ data }) => {
        createdPayload = data;
        return { id: 3, ...data };
      },
    },
  };
  const prismaMock = {
    $transaction: async (callback) => {
      transactionUsed = true;
      return callback(transaction);
    },
    entity: {
      findUnique: async () => ({ id: 9, requestedByUserId: 12 }),
    },
    entitySubscription: {
      findUnique: async () => null,
    },
  };

  const subscription = await createEntitySubscription(
    {
      volunteerUserId: 4,
      entityId: 9,
    },
    {
      prisma: prismaMock,
      createEntityFollowedNotification: async (input, dependencies) => {
        notificationPayload = input;
        assert.equal(dependencies.prisma, transaction);
      },
    },
  );

  assert.equal(transactionUsed, true);
  assert.deepEqual(createdPayload, {
    volunteerUserId: 4,
    entityId: 9,
  });
  assert.deepEqual(notificationPayload, {
    recipientUserId: 12,
    actorUserId: 4,
    entityId: 9,
  });
  assert.equal(subscription.entityId, 9);
}

async function testCreateEntitySubscriptionRejectsDuplicateSubscription() {
  let notificationCalls = 0;
  const prismaMock = {
    entity: {
      findUnique: async () => ({ id: 9, requestedByUserId: 12 }),
    },
    entitySubscription: {
      findUnique: async () => ({ id: 1 }),
      create: async () => {
        throw new Error("No deberia crear");
      },
    },
  };

  await assert.rejects(
    () =>
      createEntitySubscription(
        {
          volunteerUserId: 4,
          entityId: 9,
        },
        {
          prisma: prismaMock,
          createEntityFollowedNotification: async () => {
            notificationCalls += 1;
          },
        },
      ),
    (error) => error && error.code === "ENTITY_SUBSCRIPTION_ALREADY_EXISTS",
  );

  assert.equal(notificationCalls, 0);
}

module.exports = {
  testCreateEntitySubscriptionCreatesSubscriptionWithoutDuplicates,
  testCreateEntitySubscriptionRejectsDuplicateSubscription,
};
