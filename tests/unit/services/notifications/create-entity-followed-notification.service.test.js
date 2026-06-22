const assert = require("node:assert/strict");

const createEntityFollowedNotification = require("../../../../src/services/notifications/create-entity-followed-notification.service");

async function testCreateEntityFollowedNotificationTargetsEntityOwner() {
  let createdData = null;

  const result = await createEntityFollowedNotification(
    {
      recipientUserId: 12,
      actorUserId: 7,
      entityId: 3,
    },
    {
      prisma: {
        internalNotification: {
          create: async ({ data }) => {
            createdData = data;
            return { id: 22, ...data };
          },
        },
      },
    },
  );

  assert.deepEqual(createdData, {
    recipientUserId: 12,
    actorUserId: 7,
    entityId: 3,
    eventId: null,
    type: "ENTITY_FOLLOWED",
    title: "Nuevo seguidor",
    message: "Un voluntario ha empezado a seguir tu entidad.",
  });
  assert.equal(result.recipientUserId, 12);
}

module.exports = {
  testCreateEntityFollowedNotificationTargetsEntityOwner,
};
