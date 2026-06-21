const assert = require("node:assert/strict");

const {
  renderEventDetail,
} = require("../../../../src/controllers/events/event-publication.controller");

function createResponseRecorder() {
  return {
    renderedView: null,
    renderedModel: null,
    statusCode: 200,
    status(code) {
      this.statusCode = code;
      return this;
    },
    render(view, model) {
      this.renderedView = view;
      this.renderedModel = model;
      return this;
    },
  };
}

function createEvent() {
  return {
    id: 9,
    title: "Evento prueba",
    totalSlots: 10,
    entity: {
      id: 4,
      organizationName: "Entidad prueba",
    },
    _count: {
      registrations: 1,
    },
  };
}

async function testRenderEventDetailIncludesRegistrationsForOwnerEntity() {
  const res = createResponseRecorder();
  let registrationsInput = null;

  await renderEventDetail(
    {
      params: { eventId: "9" },
      query: {},
      currentUser: { id: 3, role: "ENTIDAD" },
    },
    res,
    (error) => {
      throw error;
    },
    {
      getEventDetail: async () => createEvent(),
      listOwnedEventRegistrations: async (input) => {
        registrationsInput = input;
        return {
          registrations: [
            {
              volunteerUser: {
                firstName: "Ana",
                lastName: "Lopez",
                email: "ana@example.com",
                phone: "600111222",
              },
            },
          ],
        };
      },
    },
  );

  assert.deepEqual(registrationsInput, {
    userId: 3,
    eventId: 9,
  });
  assert.equal(res.renderedView, "pages/events/detail");
  assert.equal(res.renderedModel.registrations.length, 1);
}

async function testRenderEventDetailHidesRegistrationsFromUnauthorizedUsers() {
  const scenarios = [
    { currentUser: null, ownershipError: false },
    { currentUser: { id: 7, role: "VOLUNTARIO" }, ownershipError: false },
    { currentUser: { id: 8, role: "ENTIDAD" }, ownershipError: true },
  ];

  for (const scenario of scenarios) {
    const res = createResponseRecorder();
    let registrationsCalls = 0;

    await renderEventDetail(
      {
        params: { eventId: "9" },
        query: {},
        currentUser: scenario.currentUser,
      },
      res,
      (error) => {
        throw error;
      },
      {
        getEventDetail: async () => createEvent(),
        getEntitySubscriptionStatus: async () => false,
        getEventRegistrationStatus: async () => false,
        listOwnedEventRegistrations: async () => {
          registrationsCalls += 1;

          if (scenario.ownershipError) {
            const error = new Error("Event does not belong to current entity.");
            error.code = "EVENT_NOT_OWNED_BY_ENTITY";
            throw error;
          }

          return { registrations: [] };
        },
      },
    );

    assert.equal(res.renderedView, "pages/events/detail");
    assert.equal(res.renderedModel.registrations, null);
    assert.equal(
      registrationsCalls,
      scenario.currentUser?.role === "ENTIDAD" ? 1 : 0,
    );
  }
}

module.exports = {
  testRenderEventDetailHidesRegistrationsFromUnauthorizedUsers,
  testRenderEventDetailIncludesRegistrationsForOwnerEntity,
};
