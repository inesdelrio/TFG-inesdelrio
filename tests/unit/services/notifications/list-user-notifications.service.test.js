const assert = require("node:assert/strict");

const listUserNotifications = require("../../../../src/services/notifications/list-user-notifications.service");

async function testListUserNotificationsReturnsOwnNotificationsOrderedByDate() {
  let receivedQuery = null;
  const prismaMock = {
    internalNotification: {
      findMany: async (query) => {
        receivedQuery = query;
        return [
          {
            id: 3,
            title: "Actividad actualizada",
            actorUserId: null,
            isRead: false,
          },
        ];
      },
    },
  };

  const result = await listUserNotifications(9, {
    prisma: prismaMock,
  });

  assert.equal(receivedQuery.where.recipientUserId, 9);
  assert.deepEqual(receivedQuery.orderBy, { createdAt: "desc" });
  assert.equal(result[0].id, 3);
  assert.equal(result[0].actorUserId, null);
}

module.exports = {
  testListUserNotificationsReturnsOwnNotificationsOrderedByDate,
};
