const assert = require("node:assert/strict");

function loadControllerWithMocks(mocks = {}) {
  const controllerPath = require.resolve("../../../../src/controllers/events/event-registration.controller");
  const createServicePath = require.resolve("../../../../src/services/events/create-event-registration.service");
  const deleteServicePath = require.resolve("../../../../src/services/events/delete-event-registration.service");
  const previousCreateService = require.cache[createServicePath];
  const previousDeleteService = require.cache[deleteServicePath];

  require.cache[createServicePath] = {
    exports: mocks.createEventRegistration || (async () => ({})),
  };
  require.cache[deleteServicePath] = {
    exports: mocks.deleteEventRegistration || (async () => ({})),
  };
  delete require.cache[controllerPath];

  const controller = require(controllerPath);

  if (previousCreateService) {
    require.cache[createServicePath] = previousCreateService;
  } else {
    delete require.cache[createServicePath];
  }

  if (previousDeleteService) {
    require.cache[deleteServicePath] = previousDeleteService;
  } else {
    delete require.cache[deleteServicePath];
  }

  delete require.cache[controllerPath];

  return controller;
}

async function testRegisterForEventRedirectsToDetailWithBackToEventsFlagAfterSuccess() {
  const redirects = [];
  const { registerForEvent } = loadControllerWithMocks({
    createEventRegistration: async () => ({ id: 1 }),
  });

  await registerForEvent(
    {
      params: {
        eventId: "5",
      },
      body: {
        redirectTo: "/eventos/5",
      },
      currentUser: {
        id: 7,
      },
    },
    {
      redirect: (path) => redirects.push(path),
    },
    (error) => {
      throw error;
    },
  );

  assert.deepEqual(redirects, ["/eventos/5?registered=1&backToEvents=1"]);
}

async function testCancelEventRegistrationRedirectsToDetailWithBackToEventsFlagAfterSuccess() {
  const redirects = [];
  const { cancelEventRegistration } = loadControllerWithMocks({
    deleteEventRegistration: async () => ({ id: 1 }),
  });

  await cancelEventRegistration(
    {
      params: {
        eventId: "5",
      },
      body: {
        redirectTo: "/eventos/5",
      },
      currentUser: {
        id: 7,
      },
    },
    {
      redirect: (path) => redirects.push(path),
    },
    (error) => {
      throw error;
    },
  );

  assert.deepEqual(redirects, ["/eventos/5?cancelled=1&backToEvents=1"]);
}

module.exports = {
  testCancelEventRegistrationRedirectsToDetailWithBackToEventsFlagAfterSuccess,
  testRegisterForEventRedirectsToDetailWithBackToEventsFlagAfterSuccess,
};
