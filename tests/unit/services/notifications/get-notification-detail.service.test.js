const assert = require("node:assert/strict");

const getNotificationDetail = require("../../../../src/services/notifications/get-notification-detail.service");

async function testGetNotificationDetailReturnsOnlyStoredActorAndEvent() {
  let receivedQuery = null;
  const result = await getNotificationDetail(
    {
      notificationId: 7,
      recipientUserId: 12,
    },
    {
      prisma: {
        internalNotification: {
          findUnique: async (query) => {
            receivedQuery = query;
            return {
              id: 7,
              recipientUserId: 12,
              actorUser: {
                id: 4,
                firstName: "Ana",
                lastName: "Lopez",
                email: "ana@example.com",
                phone: "600111222",
              },
              event: {
                id: 5,
                title: "Banco de alimentos",
                startsAt: new Date("2099-12-20T10:00:00Z"),
                city: "Madrid",
              },
            };
          },
        },
      },
    },
  );

  assert.equal(receivedQuery.where.id, 7);
  assert.equal(receivedQuery.include.actorUser.select.email, true);
  assert.equal(receivedQuery.include.event.select.title, true);
  assert.equal(result.actorUser.id, 4);
  assert.equal(result.event.id, 5);
}

async function testGetNotificationDetailRejectsForeignNotification() {
  await assert.rejects(
    () =>
      getNotificationDetail(
        {
          notificationId: 7,
          recipientUserId: 12,
        },
        {
          prisma: {
            internalNotification: {
              findUnique: async () => ({
                id: 7,
                recipientUserId: 99,
              }),
            },
          },
        },
      ),
    (error) => error && error.code === "NOTIFICATION_FORBIDDEN",
  );
}

module.exports = {
  testGetNotificationDetailRejectsForeignNotification,
  testGetNotificationDetailReturnsOnlyStoredActorAndEvent,
};
