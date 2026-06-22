const assert = require("node:assert/strict");

const createEventFullNotification = require("../../../../src/services/notifications/create-event-full-notification.service");

async function testCreateEventFullNotificationTargetsEntityOwner() {
  let createdData = null;

  const result = await createEventFullNotification(
    {
      recipientUserId: 12,
      entityId: 3,
      eventId: 5,
      eventTitle: "Banco de alimentos",
    },
    {
      prisma: {
        internalNotification: {
          create: async ({ data }) => {
            createdData = data;
            return { id: 23, ...data };
          },
        },
      },
    },
  );

  assert.deepEqual(createdData, {
    recipientUserId: 12,
    actorUserId: null,
    entityId: 3,
    eventId: 5,
    type: "EVENT_FULL",
    title: "Evento completo: Banco de alimentos",
    message:
      "Tu evento ha completado todas sus plazas: Banco de alimentos",
  });
  assert.equal(result.eventId, 5);
}

module.exports = {
  testCreateEventFullNotificationTargetsEntityOwner,
};
