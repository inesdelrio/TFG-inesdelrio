const assert = require("node:assert/strict");

const { requireAuth } = require("../../../src/middlewares/auth.middleware");

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

module.exports = {
  testRequireAuthRefreshesActiveUserFromDatabase,
  testRequireAuthRejectsAnonymizedUserFromStaleSession,
};
