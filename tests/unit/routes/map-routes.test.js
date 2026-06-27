const assert = require("node:assert/strict");

const adminRouter = require("../../../src/routes/admin");
const entityRouter = require("../../../src/routes/entities");
const eventRouter = require("../../../src/routes/events");

function findRoute(router, path, method) {
  return router.stack.find(
    (layer) => layer.route && layer.route.path === path && layer.route.methods[method],
  ).route;
}

function assertProtectedMapRoute(router, path, method, controllerName) {
  const route = findRoute(router, path, method);
  const handlers = route.stack.map((layer) => layer.handle);

  assert.equal(handlers[0].name, "requireAuth");
  assert.equal(handlers.length >= 3, true);
  assert.equal(handlers.at(-1).name, controllerName);
}

function testVolunteerMapRouteIsProtected() {
  assertProtectedMapRoute(
    eventRouter,
    "/eventos/mapa",
    "get",
    "renderVolunteerEventMap",
  );
}

function testEntityMapRouteIsProtected() {
  assertProtectedMapRoute(entityRouter, "/entidad/mapa", "get", "renderEntityMap");
}

function testAdminMapRouteIsProtected() {
  assertProtectedMapRoute(adminRouter, "/admin/mapa", "get", "renderAdminMap");
}

module.exports = {
  testAdminMapRouteIsProtected,
  testEntityMapRouteIsProtected,
  testVolunteerMapRouteIsProtected,
};
