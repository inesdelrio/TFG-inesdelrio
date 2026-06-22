const assert = require("node:assert/strict");

const deleteNotification = require("../../../../src/services/notifications/delete-notification.service");

async function testDeleteNotificationDeletesOwnedNotification() {
  let deletedId = null;
  const result = await deleteNotification(
    {
      notificationId: 7,
      recipientUserId: 4,
    },
    {
      prisma: {
        internalNotification: {
          findUnique: async () => ({
            id: 7,
            recipientUserId: 4,
          }),
          delete: async ({ where }) => {
            deletedId = where.id;
            return { id: where.id };
          },
        },
      },
    },
  );

  assert.equal(deletedId, 7);
  assert.equal(result.id, 7);
}

async function testDeleteNotificationRejectsForeignNotification() {
  let deleteCalled = false;

  await assert.rejects(
    () =>
      deleteNotification(
        {
          notificationId: 7,
          recipientUserId: 4,
        },
        {
          prisma: {
            internalNotification: {
              findUnique: async () => ({
                id: 7,
                recipientUserId: 8,
              }),
              delete: async () => {
                deleteCalled = true;
              },
            },
          },
        },
      ),
    (error) => error && error.code === "NOTIFICATION_FORBIDDEN",
  );

  assert.equal(deleteCalled, false);
}

async function testDeleteNotificationRemovesItFromSubsequentListing() {
  const notifications = [
    { id: 7, recipientUserId: 4 },
    { id: 8, recipientUserId: 4 },
  ];
  const prismaMock = {
    internalNotification: {
      findUnique: async ({ where }) =>
        notifications.find((notification) => notification.id === where.id),
      delete: async ({ where }) => {
        const index = notifications.findIndex(
          (notification) => notification.id === where.id,
        );
        return notifications.splice(index, 1)[0];
      },
      findMany: async ({ where }) =>
        notifications.filter(
          (notification) =>
            notification.recipientUserId === where.recipientUserId,
        ),
    },
  };

  await deleteNotification(
    {
      notificationId: 7,
      recipientUserId: 4,
    },
    {
      prisma: prismaMock,
    },
  );

  const remaining = await prismaMock.internalNotification.findMany({
    where: { recipientUserId: 4 },
  });
  assert.deepEqual(remaining.map((notification) => notification.id), [8]);
}

module.exports = {
  testDeleteNotificationDeletesOwnedNotification,
  testDeleteNotificationRejectsForeignNotification,
  testDeleteNotificationRemovesItFromSubsequentListing,
};
