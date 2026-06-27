const assert = require("node:assert/strict");

function createResponseRecorder() {
  return {
    renderedView: null,
    renderedModel: null,
    render(view, model) {
      this.renderedView = view;
      this.renderedModel = model;
      return this;
    },
  };
}

function loadControllerWithMock(controllerPath, servicePath, serviceMock) {
  const resolvedControllerPath = require.resolve(controllerPath);
  const resolvedServicePath = require.resolve(servicePath);
  const previousService = require.cache[resolvedServicePath];

  require.cache[resolvedServicePath] = {
    exports: serviceMock,
  };
  delete require.cache[resolvedControllerPath];

  const controller = require(resolvedControllerPath);

  if (previousService) {
    require.cache[resolvedServicePath] = previousService;
  } else {
    delete require.cache[resolvedServicePath];
  }

  delete require.cache[resolvedControllerPath];

  return controller;
}

async function testRenderVolunteerEventMapRendersMapView() {
  const res = createResponseRecorder();
  const controller = loadControllerWithMock(
    "../../../../src/controllers/maps/event-map.controller",
    "../../../../src/services/maps/list-volunteer-event-map-markers.service",
    async () => [{ id: 1, type: "EVENT" }],
  );

  await controller.renderVolunteerEventMap({}, res, (error) => {
    throw error;
  });

  assert.equal(res.renderedView, "pages/events/map");
  assert.equal(res.renderedModel.markers.length, 1);
}

async function testRenderEntityMapRendersMapView() {
  const res = createResponseRecorder();
  let receivedInput = null;
  const controller = loadControllerWithMock(
    "../../../../src/controllers/maps/entity-map.controller",
    "../../../../src/services/maps/list-entity-map-markers.service",
    async (input) => {
      receivedInput = input;
      return [];
    },
  );

  await controller.renderEntityMap(
    { currentUser: { id: 8 } },
    res,
    (error) => {
      throw error;
    },
  );

  assert.deepEqual(receivedInput, { userId: 8 });
  assert.equal(res.renderedView, "pages/entities/map");
}

async function testRenderAdminMapRendersMapView() {
  const res = createResponseRecorder();
  const controller = loadControllerWithMock(
    "../../../../src/controllers/maps/admin-map.controller",
    "../../../../src/services/maps/list-admin-map-markers.service",
    async () => [],
  );

  await controller.renderAdminMap({}, res, (error) => {
    throw error;
  });

  assert.equal(res.renderedView, "pages/admin/map");
}

module.exports = {
  testRenderAdminMapRendersMapView,
  testRenderEntityMapRendersMapView,
  testRenderVolunteerEventMapRendersMapView,
};
