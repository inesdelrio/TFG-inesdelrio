const assert = require("node:assert/strict");

const getEntitySubscriptionStatus = require("../../../../src/services/entities/get-entity-subscription-status.service");

async function testGetEntitySubscriptionStatusReturnsTrueWhenSubscriptionExists() {
  const prismaMock = {
    entitySubscription: {
      findUnique: async () => ({ id: 8 }),
    },
  };

  const isSubscribed = await getEntitySubscriptionStatus(
    {
      volunteerUserId: 5,
      entityId: 12,
    },
    {
      prisma: prismaMock,
    },
  );

  assert.equal(isSubscribed, true);
}

module.exports = {
  testGetEntitySubscriptionStatusReturnsTrueWhenSubscriptionExists,
};
