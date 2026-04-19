const assert = require("node:assert/strict");

const createEvent = require("../../../../src/services/events/create-event.service");

async function testCreateEventCreatesEventForVerifiedEntity() {
  let createdPayload = null;
  const prismaMock = {
    entity: {
      findUnique: async () => ({
        id: 3,
        validationStatus: "VERIFICADA",
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
      eventDate: "2099-05-20",
      eventTime: "10:30",
      totalSlots: "25",
    },
    {
      prisma: prismaMock,
    },
  );

  assert.equal(createdPayload.entityId, 3);
  assert.equal(createdPayload.totalSlots, 25);
  assert.equal(event.title, "Recogida solidaria");
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
