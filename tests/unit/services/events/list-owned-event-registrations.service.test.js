const assert = require("node:assert/strict");

const listOwnedEventRegistrations = require("../../../../src/services/events/list-owned-event-registrations.service");

async function testListOwnedEventRegistrationsReturnsVolunteerDataForOwnedEvent() {
  const prismaMock = {
    eventRegistration: {
      findMany: async () => [
        {
          id: 1,
          createdAt: new Date("2099-01-01T10:00:00Z"),
          volunteerUser: {
            id: 7,
            firstName: "Ana",
            lastName: "Lopez",
            email: "ana@example.com",
            phone: "600111222",
          },
        },
      ],
    },
  };

  const result = await listOwnedEventRegistrations(
    {
      userId: 3,
      eventId: 9,
    },
    {
      prisma: prismaMock,
      getOwnedEventById: async () => ({
        entity: {
          id: 4,
          organizationName: "Entidad prueba",
        },
        event: {
          id: 9,
          title: "Evento prueba",
        },
      }),
    },
  );

  assert.equal(result.event.id, 9);
  assert.equal(result.registrations.length, 1);
  assert.equal(result.registrations[0].volunteerUser.email, "ana@example.com");
}

async function testListOwnedEventRegistrationsPropagatesOwnershipErrors() {
  await assert.rejects(
    () =>
      listOwnedEventRegistrations(
        {
          userId: 3,
          eventId: 9,
        },
        {
          prisma: {
            eventRegistration: {
              findMany: async () => [],
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
  testListOwnedEventRegistrationsPropagatesOwnershipErrors,
  testListOwnedEventRegistrationsReturnsVolunteerDataForOwnedEvent,
};
