const assert = require("node:assert/strict");

const { getEntityLoginRedirectPath } = require("../../../src/utils/auth-redirect");

async function getRedirectForStatus(status) {
  return getEntityLoginRedirectPath(
    {
      id: 9,
      role: "ENTIDAD",
    },
    {
      prisma: {
        entity: {
          findUnique: async () => ({
            validationStatus: status,
          }),
        },
      },
    },
  );
}

async function testGetEntityLoginRedirectPathSendsPendingEntityToStatus() {
  assert.equal(await getRedirectForStatus("PENDIENTE"), "/entidad/estado");
}

async function testGetEntityLoginRedirectPathSendsRejectedEntityToStatus() {
  assert.equal(await getRedirectForStatus("RECHAZADA"), "/entidad/estado");
}

async function testGetEntityLoginRedirectPathSendsSuspendedEntityToStatus() {
  assert.equal(await getRedirectForStatus("SUSPENDIDA"), "/entidad/estado");
}

async function testGetEntityLoginRedirectPathSendsVerifiedEntityToProfile() {
  assert.equal(await getRedirectForStatus("VERIFICADA"), "/entidad/perfil");
}

function testGetRedirectPathForRoleSendsAdminToProfile() {
  const { getRedirectPathForRole } = require("../../../src/utils/auth-redirect");

  assert.equal(getRedirectPathForRole("ADMIN"), "/admin/perfil");
}

module.exports = {
  testGetEntityLoginRedirectPathSendsPendingEntityToStatus,
  testGetEntityLoginRedirectPathSendsRejectedEntityToStatus,
  testGetEntityLoginRedirectPathSendsSuspendedEntityToStatus,
  testGetEntityLoginRedirectPathSendsVerifiedEntityToProfile,
  testGetRedirectPathForRoleSendsAdminToProfile,
};
