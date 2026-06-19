const assert = require("node:assert/strict");

const { resolveAdminSeedConfig } = require("../../../scripts/seed-admin-config");

function testResolveAdminSeedConfigRequiresAdminEmailAndPassword() {
  assert.throws(
    () => resolveAdminSeedConfig({}),
    (error) =>
      error.message.includes("ADMIN_EMAIL") &&
      error.message.includes("ADMIN_PASSWORD") &&
      !error.message.includes("password:"),
  );
}

function testResolveAdminSeedConfigReturnsEnvironmentValues() {
  const config = resolveAdminSeedConfig({
    ADMIN_EMAIL: " admin@example.test ",
    ADMIN_PASSWORD: "example-password",
  });

  assert.deepEqual(config, {
    email: "admin@example.test",
    password: "example-password",
  });
}

module.exports = {
  testResolveAdminSeedConfigRequiresAdminEmailAndPassword,
  testResolveAdminSeedConfigReturnsEnvironmentValues,
};
