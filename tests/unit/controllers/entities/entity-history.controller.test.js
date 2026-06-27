const assert = require("node:assert/strict");

function loadControllerWithMocks(mocks = {}) {
  const controllerPath = require.resolve("../../../../src/controllers/entities/entity-history.controller");
  const servicePath = require.resolve("../../../../src/services/entities/get-entity-history.service");
  const previousService = require.cache[servicePath];

  require.cache[servicePath] = {
    exports:
      mocks.getEntityHistory ||
      (async () => ({
        entity: {},
        futureEvents: [],
        pastEvents: [],
      })),
  };
  delete require.cache[controllerPath];

  const controller = require(controllerPath);

  if (previousService) {
    require.cache[servicePath] = previousService;
  } else {
    delete require.cache[servicePath];
  }

  delete require.cache[controllerPath];

  return controller;
}

async function testRenderEntityHistoryLoadsHistoryForCurrentEntityUser() {
  let receivedInput = null;
  let renderedView = null;
  let renderedData = null;
  const { renderEntityHistory } = loadControllerWithMocks({
    getEntityHistory: async (input) => {
      receivedInput = input;
      return {
        entity: {
          organizationName: "Entidad prueba",
        },
        futureEvents: [],
        pastEvents: [],
      };
    },
  });

  await renderEntityHistory(
    {
      currentUser: {
        id: 8,
      },
    },
    {
      render: (view, data) => {
        renderedView = view;
        renderedData = data;
      },
    },
    (error) => {
      throw error;
    },
  );

  assert.deepEqual(receivedInput, { userId: 8 });
  assert.equal(renderedView, "pages/entities/history");
  assert.equal(renderedData.pageTitle, "Historial de eventos");
  assert.equal(renderedData.history.entity.organizationName, "Entidad prueba");
}

module.exports = {
  testRenderEntityHistoryLoadsHistoryForCurrentEntityUser,
};
