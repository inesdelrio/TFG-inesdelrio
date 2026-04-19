const assert = require("node:assert/strict");

const updateOwnedEvent = require("../../../../src/services/events/update-owned-event.service");

async function testUpdateOwnedEventUpdatesEventForOwnerEntity() {
  let updatedPayload = null;
  const prismaMock = {
    event: {
      update: async ({ data }) => {
        updatedPayload = data;
        return { id: 12, ...data };
      },
    },
  };

  const event = await updateOwnedEvent(
    {
      userId: 4,
      eventId: 12,
      title: "Evento editado",
      description: "Descripcion actualizada para el evento de prueba con suficiente longitud.",
      city: "Leganes",
      address: "Calle Sur 99",
      eventDate: "2099-08-10",
      eventTime: "18:00",
      totalSlots: "40",
    },
    {
      prisma: prismaMock,
      getOwnedEventById: async () => ({
        event: {
          id: 12,
        },
      }),
    },
  );

  assert.equal(updatedPayload.title, "Evento editado");
  assert.equal(updatedPayload.totalSlots, 40);
  assert.equal(event.city, "Leganes");
}

module.exports = {
  testUpdateOwnedEventUpdatesEventForOwnerEntity,
};
