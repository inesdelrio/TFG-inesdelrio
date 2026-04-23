const assert = require("node:assert/strict");

const markNotificationAsRead = require("../../../../src/services/notifications/mark-notification-as-read.service");

async function testMarkNotificationAsReadUpdatesUnreadOwnedNotification() {
  let updatedPayload = null;
  const prismaMock = {
    internalNotification: {
      findUnique: async () => ({
        id: 7,
        volunteerUserId: 4,
        isRead: false,
      }),
      update: async ({ where, data }) => {
        updatedPayload = { where, data };
        return {
          id: where.id,
          volunteerUserId: 4,
          isRead: data.isRead,
        };
      },
    },
  };

  const result = await markNotificationAsRead(
    {
      notificationId: 7,
      volunteerUserId: 4,
    },
    {
      prisma: prismaMock,
    },
  );

  assert.deepEqual(updatedPayload, {
    where: { id: 7 },
    data: { isRead: true },
  });
  assert.equal(result.isRead, true);
}

async function testMarkNotificationAsReadRejectsForeignNotification() {
  const prismaMock = {
    internalNotification: {
      findUnique: async () => ({
        id: 7,
        volunteerUserId: 8,
        isRead: false,
      }),
    },
  };

  await assert.rejects(
    () =>
      markNotificationAsRead(
        {
          notificationId: 7,
          volunteerUserId: 4,
        },
        {
          prisma: prismaMock,
        },
      ),
    (error) => error && error.code === "NOTIFICATION_FORBIDDEN",
  );
}

module.exports = {
  testMarkNotificationAsReadRejectsForeignNotification,
  testMarkNotificationAsReadUpdatesUnreadOwnedNotification,
};
