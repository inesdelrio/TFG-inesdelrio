const assert = require("node:assert/strict");

const createEventNotifications = require("../../../../src/services/notifications/create-event-notifications.service");

async function testCreateEventNotificationsCreatesOneNotificationPerSubscriber() {
  let createdData = null;
  const prismaMock = {
    entitySubscription: {
      findMany: async () => [{ volunteerUserId: 2 }, { volunteerUserId: 4 }],
    },
    internalNotification: {
      createMany: async ({ data }) => {
        createdData = data;
        return { count: data.length };
      },
    },
  };

  const result = await createEventNotifications(
    {
      entityId: 6,
      entityName: "Fundacion Horizonte",
      eventId: 14,
      eventTitle: "Reparto solidario",
      type: "EVENT_PUBLISHED",
    },
    {
      prisma: prismaMock,
    },
  );

  assert.equal(result.createdCount, 2);
  assert.equal(createdData.length, 2);
  assert.equal(createdData[0].entityId, 6);
  assert.equal(createdData[0].eventId, 14);
  assert.equal(createdData[0].type, "EVENT_PUBLISHED");
  assert.match(createdData[0].title, /Nueva actividad/);
}

async function testCreateEventNotificationsReturnsZeroWhenThereAreNoSubscribers() {
  const prismaMock = {
    entitySubscription: {
      findMany: async () => [],
    },
    internalNotification: {
      createMany: async () => {
        throw new Error("No deberia intentar crear notificaciones");
      },
    },
  };

  const result = await createEventNotifications(
    {
      entityId: 6,
      entityName: "Fundacion Horizonte",
      eventId: 14,
      eventTitle: "Reparto solidario",
      type: "EVENT_PUBLISHED",
    },
    {
      prisma: prismaMock,
    },
  );

  assert.equal(result.createdCount, 0);
}

module.exports = {
  testCreateEventNotificationsCreatesOneNotificationPerSubscriber,
  testCreateEventNotificationsReturnsZeroWhenThereAreNoSubscribers,
};
