const assert = require("node:assert/strict");

const deleteEntitySubscription = require("../../../../src/services/entities/delete-entity-subscription.service");

async function testDeleteEntitySubscriptionDeletesExistingSubscription() {
  let deletedWhere = null;
  const prismaMock = {
    entitySubscription: {
      findUnique: async () => ({ id: 7, volunteerUserId: 4, entityId: 9 }),
      delete: async ({ where }) => {
        deletedWhere = where;
        return { id: 7, volunteerUserId: 4, entityId: 9 };
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

  assert.deepEqual(deletedWhere, {
    volunteerUserId_entityId: {
      volunteerUserId: 4,
      entityId: 9,
    },
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
