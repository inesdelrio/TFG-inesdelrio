const assert = require("node:assert/strict");

const deleteOwnedEvent = require("../../../../src/services/events/delete-owned-event.service");

async function testDeleteOwnedEventDeletesEventForOwnerEntity() {
  let deletedId = null;
  const prismaMock = {
    event: {
      delete: async ({ where }) => {
        deletedId = where.id;
        return { id: where.id };
      },
    },
  };

  const deletedEvent = await deleteOwnedEvent(
    {
      userId: 4,
      eventId: 15,
    },
    {
      prisma: prismaMock,
      getOwnedEventById: async () => ({
        event: {
          id: 15,
        },
      }),
    },
  );

  assert.equal(deletedId, 15);
  assert.equal(deletedEvent.id, 15);
}

async function testDeleteOwnedEventRejectsEventFromAnotherEntity() {
  await assert.rejects(
    () =>
      deleteOwnedEvent(
        {
          userId: 4,
          eventId: 16,
        },
        {
          prisma: {
            event: {
              delete: async () => {
                throw new Error("No deberia eliminar");
              },
            },
          },
          getOwnedEventById: async () => {
            const error = new Error("Event does not belong to current entity.");
            error.code = "EVENT_NOT_OWNED_BY_ENTITY";
            throw error;
          },
        },
      ),
    (error) => error && error.code === "EVENT_NOT_OWNED_BY_ENTITY",
  );
}

module.exports = {
  testDeleteOwnedEventDeletesEventForOwnerEntity,
  testDeleteOwnedEventRejectsEventFromAnotherEntity,
};
