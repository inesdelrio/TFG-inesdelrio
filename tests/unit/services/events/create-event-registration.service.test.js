const assert = require("node:assert/strict");

const createEventRegistration = require("../../../../src/services/events/create-event-registration.service");

async function testCreateEventRegistrationCreatesRegistrationWhenSlotsAvailable() {
  let createdPayload = null;
  const prismaMock = {
    event: {
      findUnique: async () => ({
        id: 5,
        totalSlots: 10,
        startsAt: new Date("2099-12-20T10:00:00Z"),
        _count: {
          registrations: 3,
        },
      }),
    },
    eventRegistration: {
      findUnique: async () => null,
      create: async ({ data }) => {
        createdPayload = data;
        return { id: 2, ...data };
      },
    },
  };

  const registration = await createEventRegistration(
    {
      volunteerUserId: 7,
      eventId: 5,
    },
    {
      prisma: prismaMock,
    },
  );

  assert.deepEqual(createdPayload, {
    volunteerUserId: 7,
    eventId: 5,
  });
  assert.equal(registration.eventId, 5);
}

async function testCreateEventRegistrationRejectsDuplicateRegistration() {
  const prismaMock = {
    event: {
      findUnique: async () => ({
        id: 5,
        totalSlots: 10,
        startsAt: new Date("2099-12-20T10:00:00Z"),
        _count: {
          registrations: 3,
        },
      }),
    },
    eventRegistration: {
      findUnique: async () => ({ id: 9 }),
      create: async () => {
        throw new Error("No deberia crear");
      },
    },
  };

  await assert.rejects(
    () =>
      createEventRegistration(
        {
          volunteerUserId: 7,
          eventId: 5,
        },
        {
          prisma: prismaMock,
        },
      ),
    (error) => error && error.code === "EVENT_REGISTRATION_ALREADY_EXISTS",
  );
}

async function testCreateEventRegistrationRejectsWhenEventIsFull() {
  const prismaMock = {
    event: {
      findUnique: async () => ({
        id: 5,
        totalSlots: 2,
        startsAt: new Date("2099-12-20T10:00:00Z"),
        _count: {
          registrations: 2,
        },
      }),
    },
    eventRegistration: {
      findUnique: async () => null,
      create: async () => {
        throw new Error("No deberia crear");
      },
    },
  };

  await assert.rejects(
    () =>
      createEventRegistration(
        {
          volunteerUserId: 7,
          eventId: 5,
        },
        {
          prisma: prismaMock,
        },
      ),
    (error) => error && error.code === "EVENT_FULL",
  );
}

module.exports = {
  testCreateEventRegistrationCreatesRegistrationWhenSlotsAvailable,
  testCreateEventRegistrationRejectsDuplicateRegistration,
  testCreateEventRegistrationRejectsWhenEventIsFull,
};
