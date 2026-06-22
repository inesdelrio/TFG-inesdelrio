const assert = require("node:assert/strict");

const createEventRegistration = require("../../../../src/services/events/create-event-registration.service");

async function testCreateEventRegistrationCreatesRegistrationWhenSlotsAvailable() {
  let createdPayload = null;
  let notificationPayload = null;
  let fullNotificationCalls = 0;
  let transactionUsed = false;
  const transaction = {
    eventRegistration: {
      create: async ({ data }) => {
        createdPayload = data;
        return { id: 2, ...data };
      },
    },
  };
  const prismaMock = {
    $transaction: async (callback) => {
      transactionUsed = true;
      return callback(transaction);
    },
    event: {
      findUnique: async () => ({
        id: 5,
        title: "Banco de alimentos",
        totalSlots: 10,
        startsAt: new Date("2099-12-20T10:00:00Z"),
        publicationStatus: "ACTIVO",
        entity: {
          id: 3,
          requestedByUserId: 12,
          validationStatus: "VERIFICADA",
        },
        _count: {
          registrations: 3,
        },
      }),
    },
    eventRegistration: {
      findUnique: async () => null,
    },
  };

  const registration = await createEventRegistration(
    {
      volunteerUserId: 7,
      eventId: 5,
    },
    {
      prisma: prismaMock,
      createEntityRegistrationNotification: async (input, dependencies) => {
        notificationPayload = input;
        assert.equal(dependencies.prisma, transaction);
      },
      createEventFullNotification: async () => {
        fullNotificationCalls += 1;
      },
    },
  );

  assert.equal(transactionUsed, true);
  assert.deepEqual(createdPayload, {
    volunteerUserId: 7,
    eventId: 5,
  });
  assert.deepEqual(notificationPayload, {
    recipientUserId: 12,
    actorUserId: 7,
    entityId: 3,
    eventId: 5,
    eventTitle: "Banco de alimentos",
  });
  assert.equal(fullNotificationCalls, 0);
  assert.equal(registration.eventId, 5);
}

async function testCreateEventRegistrationNotifiesWhenLastSlotIsFilled() {
  const notifications = [];
  const transaction = {
    eventRegistration: {
      create: async ({ data }) => ({ id: 2, ...data }),
    },
  };
  const prismaMock = {
    $transaction: async (callback) => callback(transaction),
    event: {
      findUnique: async () => ({
        id: 5,
        title: "Banco de alimentos",
        totalSlots: 4,
        startsAt: new Date("2099-12-20T10:00:00Z"),
        publicationStatus: "ACTIVO",
        entity: {
          id: 3,
          requestedByUserId: 12,
          validationStatus: "VERIFICADA",
        },
        _count: {
          registrations: 3,
        },
      }),
    },
    eventRegistration: {
      findUnique: async () => null,
    },
  };

  await createEventRegistration(
    {
      volunteerUserId: 7,
      eventId: 5,
    },
    {
      prisma: prismaMock,
      createEntityRegistrationNotification: async () => {
        notifications.push("registration");
      },
      createEventFullNotification: async (input, dependencies) => {
        notifications.push({ type: "full", input });
        assert.equal(dependencies.prisma, transaction);
      },
    },
  );

  assert.deepEqual(notifications, [
    "registration",
    {
      type: "full",
      input: {
        recipientUserId: 12,
        actorUserId: null,
        entityId: 3,
        eventId: 5,
        eventTitle: "Banco de alimentos",
      },
    },
  ]);
}

async function testCreateEventRegistrationRejectsDuplicateRegistration() {
  let notificationCalls = 0;
  const prismaMock = {
    event: {
      findUnique: async () => ({
        id: 5,
        totalSlots: 10,
        startsAt: new Date("2099-12-20T10:00:00Z"),
        publicationStatus: "ACTIVO",
        entity: {
          validationStatus: "VERIFICADA",
        },
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
          createEntityRegistrationNotification: async () => {
            notificationCalls += 1;
          },
          createEventFullNotification: async () => {
            notificationCalls += 1;
          },
        },
      ),
    (error) => error && error.code === "EVENT_REGISTRATION_ALREADY_EXISTS",
  );
  assert.equal(notificationCalls, 0);
}

async function testCreateEventRegistrationRejectsWhenEventIsFull() {
  let notificationCalls = 0;
  const prismaMock = {
    event: {
      findUnique: async () => ({
        id: 5,
        totalSlots: 2,
        startsAt: new Date("2099-12-20T10:00:00Z"),
        publicationStatus: "ACTIVO",
        entity: {
          validationStatus: "VERIFICADA",
        },
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
          createEntityRegistrationNotification: async () => {
            notificationCalls += 1;
          },
          createEventFullNotification: async () => {
            notificationCalls += 1;
          },
        },
      ),
    (error) => error && error.code === "EVENT_FULL",
  );
  assert.equal(notificationCalls, 0);
}

module.exports = {
  testCreateEventRegistrationCreatesRegistrationWhenSlotsAvailable,
  testCreateEventRegistrationNotifiesWhenLastSlotIsFilled,
  testCreateEventRegistrationRejectsDuplicateRegistration,
  testCreateEventRegistrationRejectsWhenEventIsFull,
};
