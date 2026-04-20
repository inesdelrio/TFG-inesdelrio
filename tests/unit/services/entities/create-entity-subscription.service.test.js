const assert = require("node:assert/strict");

const createEntitySubscription = require("../../../../src/services/entities/create-entity-subscription.service");

async function testCreateEntitySubscriptionCreatesSubscriptionWithoutDuplicates() {
  let createdPayload = null;
  const prismaMock = {
    entity: {
      findUnique: async () => ({ id: 9 }),
    },
    entitySubscription: {
      findUnique: async () => null,
      create: async ({ data }) => {
        createdPayload = data;
        return { id: 3, ...data };
      },
    },
  };

  const subscription = await createEntitySubscription(
    {
      volunteerUserId: 4,
      entityId: 9,
    },
    {
      prisma: prismaMock,
    },
  );

  assert.deepEqual(createdPayload, {
    volunteerUserId: 4,
    entityId: 9,
  });
  assert.equal(subscription.entityId, 9);
}

async function testCreateEntitySubscriptionRejectsDuplicateSubscription() {
  const prismaMock = {
    entity: {
      findUnique: async () => ({ id: 9 }),
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
        },
      ),
    (error) => error && error.code === "ENTITY_SUBSCRIPTION_ALREADY_EXISTS",
  );
}

module.exports = {
  testCreateEntitySubscriptionCreatesSubscriptionWithoutDuplicates,
  testCreateEntitySubscriptionRejectsDuplicateSubscription,
};
