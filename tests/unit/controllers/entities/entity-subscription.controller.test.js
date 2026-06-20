const assert = require("node:assert/strict");

function loadControllerWithMocks(mocks = {}) {
  const controllerPath = require.resolve("../../../../src/controllers/entities/entity-subscription.controller");
  const createServicePath = require.resolve("../../../../src/services/entities/create-entity-subscription.service");
  const deleteServicePath = require.resolve("../../../../src/services/entities/delete-entity-subscription.service");
  const previousCreateService = require.cache[createServicePath];
  const previousDeleteService = require.cache[deleteServicePath];

  require.cache[createServicePath] = {
    exports: mocks.createEntitySubscription || (async () => ({})),
  };
  require.cache[deleteServicePath] = {
    exports: mocks.deleteEntitySubscription || (async () => ({})),
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

async function testSubscribeToEntityRedirectsToDetailWithBackToEventsFlagAfterSuccess() {
  const redirects = [];
  const { subscribeToEntity } = loadControllerWithMocks({
    createEntitySubscription: async () => ({ id: 1 }),
  });

  await subscribeToEntity(
    {
      params: {
        entityId: "9",
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

  assert.deepEqual(redirects, ["/eventos/5?subscribed=1&backToEvents=1"]);
}

async function testUnsubscribeFromEntityRedirectsToDetailWithBackToEventsFlagAfterSuccess() {
  const redirects = [];
  const { unsubscribeFromEntity } = loadControllerWithMocks({
    deleteEntitySubscription: async () => ({ id: 1 }),
  });

  await unsubscribeFromEntity(
    {
      params: {
        entityId: "9",
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

  assert.deepEqual(redirects, ["/eventos/5?unsubscribed=1&backToEvents=1"]);
}

module.exports = {
  testSubscribeToEntityRedirectsToDetailWithBackToEventsFlagAfterSuccess,
  testUnsubscribeFromEntityRedirectsToDetailWithBackToEventsFlagAfterSuccess,
};
