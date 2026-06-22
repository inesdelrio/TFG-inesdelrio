const assert = require("node:assert/strict");

const deleteEventRegistration = require("../../../../src/services/events/delete-event-registration.service");

async function testDeleteEventRegistrationDeletesOwnedRegistration() {
  let deletedId = null;
  const deletedNotificationFilters = [];
  let transactionUsed = false;
  const transaction = {
    eventRegistration: {
      delete: async ({ where }) => {
        deletedId = where.id;
        return { id: where.id };
      },
    },
    internalNotification: {
      deleteMany: async ({ where }) => {
        deletedNotificationFilters.push(where);
        return { count: 1 };
      },
    },
  };
  const prismaMock = {
    $transaction: async (callback) => {
      transactionUsed = true;
      return callback(transaction);
    },
    eventRegistration: {
      findUnique: async () => ({
        id: 21,
        volunteerUserId: 7,
        eventId: 4,
        event: {
          entity: {
            requestedByUserId: 12,
          },
        },
      }),
    },
  };

  const deletedRegistration = await deleteEventRegistration(
    {
      volunteerUserId: 7,
      eventId: 4,
    },
    {
      prisma: prismaMock,
    },
  );

  assert.equal(transactionUsed, true);
  assert.equal(deletedId, 21);
  assert.equal(deletedRegistration.id, 21);
  assert.deepEqual(deletedNotificationFilters, [
    {
      recipientUserId: 12,
      actorUserId: 7,
      eventId: 4,
      type: "EVENT_REGISTRATION_CREATED",
    },
    {
      recipientUserId: 12,
      eventId: 4,
      type: "EVENT_FULL",
    },
  ]);
}

async function testDeleteEventRegistrationRejectsWhenRegistrationDoesNotExist() {
  const prismaMock = {
    eventRegistration: {
      findUnique: async () => null,
      delete: async () => {
        throw new Error("No deberia borrar");
      },
    },
  };

  await assert.rejects(
    () =>
      deleteEventRegistration(
        {
          volunteerUserId: 7,
          eventId: 4,
        },
        {
          prisma: prismaMock,
        },
      ),
    (error) => error && error.code === "EVENT_REGISTRATION_NOT_FOUND",
  );
}

module.exports = {
  testDeleteEventRegistrationDeletesOwnedRegistration,
  testDeleteEventRegistrationRejectsWhenRegistrationDoesNotExist,
};
