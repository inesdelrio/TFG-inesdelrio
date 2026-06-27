const assert = require("node:assert/strict");

const { getRedirectPathForRole } = require("../../../src/utils/auth-redirect");

function testGetRedirectPathForRoleSendsAdminToProfile() {
  assert.equal(getRedirectPathForRole("ADMIN"), "/admin/perfil");
}

module.exports = {
  testGetRedirectPathForRoleSendsAdminToProfile,
};
