const assert = require("node:assert/strict");

const {
  requireAuth,
  requireRole,
  requireVerifiedEntity,
} = require("../../../src/middlewares/auth.middleware");

async function testRequireAuthRefreshesActiveUserFromDatabase() {
  const req = {
    currentUser: { id: 8, email: "stale@example.com", role: "VOLUNTARIO" },
    session: {
      user: { id: 8, email: "stale@example.com", role: "VOLUNTARIO" },
    },
  };
  const res = {
    locals: {},
    redirect() {
      throw new Error("Active user should not be redirected.");
    },
  };
  let nextCalled = false;

  await requireAuth(
    req,
    res,
    () => {
      nextCalled = true;
    },
    {
      prisma: {
        user: {
          findUnique: async () => ({
            id: 8,
            firstName: "Ana",
            lastName: "Lopez",
            email: "ana@example.com",
            role: "VOLUNTARIO",
          }),
        },
      },
    },
  );

  assert.equal(nextCalled, true);
  assert.equal(req.currentUser.email, "ana@example.com");
  assert.equal(req.session.user.email, "ana@example.com");
}

async function testRequireAuthRejectsAnonymizedUserFromStaleSession() {
  let redirectedTo = null;
  let destroyed = false;
  const req = {
    currentUser: { id: 8, email: "old@example.com", role: "VOLUNTARIO" },
    session: {
      user: { id: 8, email: "old@example.com", role: "VOLUNTARIO" },
      destroy(callback) {
        destroyed = true;
        callback(null);
      },
    },
  };

  await requireAuth(
    req,
    {
      locals: {},
      redirect(path) {
        redirectedTo = path;
      },
    },
    () => {
      throw new Error("Deleted user must not continue.");
    },
    {
      prisma: {
        user: {
          findUnique: async () => ({
            id: 8,
            email: "deleted-user-8@volunred.local",
            role: "VOLUNTARIO",
          }),
        },
      },
    },
  );

  assert.equal(destroyed, true);
  assert.equal(redirectedTo, "/login");
}

function testRequireRoleRedirectsUnauthenticatedUsers() {
  let redirectedTo = null;
  const middleware = requireRole("ADMIN");

  middleware(
    {},
    {
      redirect(path) {
        redirectedTo = path;
      },
    },
    () => {
      throw new Error("Unauthenticated users must not continue.");
    },
  );

  assert.equal(redirectedTo, "/login");
}

function testRequireRoleRedirectsNonAdminUsers() {
  let redirectedTo = null;
  const middleware = requireRole("ADMIN");

  middleware(
    {
      currentUser: {
        id: 7,
        role: "VOLUNTARIO",
      },
    },
    {
      redirect(path) {
        redirectedTo = path;
      },
    },
    () => {
      throw new Error("Non-admin users must not continue.");
    },
  );

  assert.equal(redirectedTo, "/voluntariado/perfil");
}

async function testRequireVerifiedEntityRedirectsPendingEntityToStatus() {
  let redirectedTo = null;
  const middleware = requireVerifiedEntity({
    prisma: {
      entity: {
        findUnique: async () => ({
          validationStatus: "PENDIENTE",
        }),
      },
    },
  });

  await middleware(
    {
      currentUser: {
        id: 7,
        role: "ENTIDAD",
      },
    },
    {
      redirect(path) {
        redirectedTo = path;
      },
    },
    () => {
      throw new Error("Pending entities must not access operative routes.");
    },
  );

  assert.equal(redirectedTo, "/entidad/estado");
}

async function testRequireVerifiedEntityAllowsVerifiedEntity() {
  let nextCalled = false;
  const middleware = requireVerifiedEntity({
    prisma: {
      entity: {
        findUnique: async () => ({
          validationStatus: "VERIFICADA",
        }),
      },
    },
  });

  await middleware(
    {
      currentUser: {
        id: 7,
        role: "ENTIDAD",
      },
    },
    {
      redirect() {
        throw new Error("Verified entities should not be redirected.");
      },
    },
    () => {
      nextCalled = true;
    },
  );

  assert.equal(nextCalled, true);
}

module.exports = {
  testRequireRoleRedirectsNonAdminUsers,
  testRequireRoleRedirectsUnauthenticatedUsers,
  testRequireAuthRefreshesActiveUserFromDatabase,
  testRequireAuthRejectsAnonymizedUserFromStaleSession,
  testRequireVerifiedEntityAllowsVerifiedEntity,
  testRequireVerifiedEntityRedirectsPendingEntityToStatus,
};
