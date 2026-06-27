const assert = require("node:assert/strict");

const { resolveSessionSecret } = require("../../../src/config/session");

function testResolveSessionSecretRequiresSecretInProduction() {
  assert.throws(
    () => resolveSessionSecret({ NODE_ENV: "production" }),
    (error) =>
      error.message.includes("SESSION_SECRET") &&
      error.message.includes("production") &&
      !error.message.includes("change-this-session-secret"),
  );
}

function testResolveSessionSecretUsesDevelopmentFallback() {
  const secret = resolveSessionSecret({ NODE_ENV: "development" });

  assert.equal(secret, "change-this-session-secret");
}

function testResolveSessionSecretReturnsConfiguredSecret() {
  const secret = resolveSessionSecret({
    NODE_ENV: "production",
    SESSION_SECRET: "production-secret",
  });

  assert.equal(secret, "production-secret");
}

module.exports = {
  testResolveSessionSecretRequiresSecretInProduction,
  testResolveSessionSecretReturnsConfiguredSecret,
  testResolveSessionSecretUsesDevelopmentFallback,
};
