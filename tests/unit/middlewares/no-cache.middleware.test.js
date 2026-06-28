const assert = require("node:assert/strict");

const noCacheHtmlMiddleware = require("../../../src/middlewares/no-cache.middleware");

function createResponseRecorder() {
  const headers = {};

  return {
    headers,
    set(name, value) {
      headers[name] = value;
    },
  };
}

function testNoCacheMiddlewareAddsHeadersToHtmlRequests() {
  const req = {
    method: "GET",
    path: "/eventos/7",
    accepts: () => "html",
  };
  const res = createResponseRecorder();
  let nextCalled = false;

  noCacheHtmlMiddleware(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.equal(
    res.headers["Cache-Control"],
    "no-store, no-cache, must-revalidate, private",
  );
  assert.equal(res.headers.Pragma, "no-cache");
  assert.equal(res.headers.Expires, "0");
}

function testNoCacheMiddlewareSkipsStaticAssets() {
  const req = {
    method: "GET",
    path: "/css/main.css",
    accepts: () => "css",
  };
  const res = createResponseRecorder();
  let nextCalled = false;

  noCacheHtmlMiddleware(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.deepEqual(res.headers, {});
}

module.exports = {
  testNoCacheMiddlewareAddsHeadersToHtmlRequests,
  testNoCacheMiddlewareSkipsStaticAssets,
};
