const assert = require("node:assert/strict");

const listVolunteerNotifications = require("../../../../src/services/notifications/list-volunteer-notifications.service");

async function testListVolunteerNotificationsReturnsNotificationsOrderedByDate() {
  let receivedQuery = null;
  const prismaMock = {
    internalNotification: {
      findMany: async (query) => {
        receivedQuery = query;
        return [{ id: 3, title: "Actividad actualizada", isRead: false }];
      },
    },
  };

  const result = await listVolunteerNotifications(9, {
    prisma: prismaMock,
  });

  assert.equal(receivedQuery.where.volunteerUserId, 9);
  assert.deepEqual(receivedQuery.orderBy, { createdAt: "desc" });
  assert.equal(result[0].id, 3);
}

module.exports = {
  testListVolunteerNotificationsReturnsNotificationsOrderedByDate,
};
