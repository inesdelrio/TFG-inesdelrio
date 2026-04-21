const assert = require("node:assert/strict");

const deleteEventRegistration = require("../../../../src/services/events/delete-event-registration.service");

async function testDeleteEventRegistrationDeletesOwnedRegistration() {
  let deletedId = null;
  const prismaMock = {
    eventRegistration: {
      findUnique: async () => ({
        id: 21,
      }),
      delete: async ({ where }) => {
        deletedId = where.id;
        return { id: where.id };
      },
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

  assert.equal(deletedId, 21);
  assert.equal(deletedRegistration.id, 21);
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
