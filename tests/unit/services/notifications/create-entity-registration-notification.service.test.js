const assert = require("node:assert/strict");

const createEntityRegistrationNotification = require("../../../../src/services/notifications/create-entity-registration-notification.service");

async function testCreateEntityRegistrationNotificationTargetsEntityOwner() {
  let createdData = null;
  const result = await createEntityRegistrationNotification(
    {
      recipientUserId: 12,
      actorUserId: 7,
      entityId: 3,
      eventId: 5,
      eventTitle: "Banco de alimentos",
    },
    {
      prisma: {
        internalNotification: {
          create: async ({ data }) => {
            createdData = data;
            return { id: 21, ...data };
          },
        },
      },
    },
  );

  assert.deepEqual(createdData, {
    recipientUserId: 12,
    actorUserId: 7,
    entityId: 3,
    eventId: 5,
    type: "EVENT_REGISTRATION_CREATED",
    title: "Nueva inscripcion: Banco de alimentos",
    message:
      "Un voluntario se ha inscrito en tu evento: Banco de alimentos",
  });
  assert.equal(result.recipientUserId, 12);
}

module.exports = {
  testCreateEntityRegistrationNotificationTargetsEntityOwner,
};
