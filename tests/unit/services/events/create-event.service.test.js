const assert = require("node:assert/strict");

const createEvent = require("../../../../src/services/events/create-event.service");

async function testCreateEventCreatesEventForVerifiedEntity() {
  let createdPayload = null;
  let notificationsPayload = null;
  const prismaMock = {
    entity: {
      findUnique: async () => ({
        id: 3,
        validationStatus: "VERIFICADA",
        organizationName: "Fundacion Horizonte",
      }),
    },
    event: {
      create: async ({ data }) => {
        createdPayload = data;
        return { id: 10, ...data };
      },
    },
  };

  const event = await createEvent(
    {
      userId: 8,
      title: "Recogida solidaria",
      description: "Jornada de apoyo logistico para recogida y clasificacion de alimentos.",
      city: "Madrid",
      address: "Calle Luna 8",
      startDate: "2099-05-20",
      endDate: "2099-05-22",
      startTime: "10:30",
      endTime: "12:00",
      totalSlots: "25",
      latitude: 40.4168,
      longitude: -3.7038,
      normalizedAddress: "Calle Luna 8, Madrid",
    },
    {
      prisma: prismaMock,
      createEventNotifications: async (payload) => {
        notificationsPayload = payload;
        return { createdCount: 2 };
      },
    },
  );

  assert.equal(createdPayload.entityId, 3);
  assert.equal(createdPayload.totalSlots, 25);
  assert.equal(createdPayload.latitude, 40.4168);
  assert.equal(createdPayload.longitude, -3.7038);
  assert.equal(createdPayload.normalizedAddress, "Calle Luna 8, Madrid");
  assert.equal(createdPayload.startsAt.getTime(), new Date("2099-05-20T10:30:00").getTime());
  assert.equal(createdPayload.endsAt.getTime(), new Date("2099-05-22T12:00:00").getTime());
  assert.equal(event.title, "Recogida solidaria");
  assert.deepEqual(notificationsPayload, {
    entityId: 3,
    entityName: "Fundacion Horizonte",
    eventId: 10,
    eventTitle: "Recogida solidaria",
    type: "EVENT_PUBLISHED",
  });
}

async function testCreateEventRejectsUnverifiedEntity() {
  const prismaMock = {
    entity: {
      findUnique: async () => ({
        id: 3,
        validationStatus: "PENDIENTE",
      }),
    },
    event: {
      create: async () => {
        throw new Error("No deberia crear el evento");
      },
    },
  };

  await assert.rejects(
    () =>
      createEvent(
        {
          userId: 8,
          title: "Evento bloqueado",
          description: "Descripcion suficientemente larga para el test.",
          city: "Madrid",
          address: "Calle Luna 8",
          eventDate: "2099-05-20",
          eventTime: "10:30",
          totalSlots: "25",
        },
        {
          prisma: prismaMock,
        },
      ),
    (error) => error && error.code === "ENTITY_NOT_VERIFIED_FOR_PUBLISHING",
  );
}

module.exports = {
  testCreateEventCreatesEventForVerifiedEntity,
  testCreateEventRejectsUnverifiedEntity,
};
