const assert = require("node:assert/strict");

const authenticateUser = require("../../../../src/services/auth/authenticate-user.service");

async function testAuthenticateUserReturnsUserWithValidCredentials() {
  const user = await authenticateUser(
    {
      email: "ines@example.com",
      password: "password123",
    },
    {
      prisma: {
        user: {
          findUnique: async () => ({
            id: 1,
            firstName: "Ines",
            lastName: "Del Rio",
            email: "ines@example.com",
            passwordHash: "stored-hash",
            role: "VOLUNTARIO",
          }),
        },
      },
      comparePassword: async (password, hash) =>
        password === "password123" && hash === "stored-hash",
    },
  );

  assert.equal(user.email, "ines@example.com");
  assert.equal(user.role, "VOLUNTARIO");
}

async function testAuthenticateUserRejectsInvalidCredentials() {
  await assert.rejects(
    () =>
      authenticateUser(
        {
          email: "ines@example.com",
          password: "bad-password",
        },
        {
          prisma: {
            user: {
              findUnique: async () => ({
                id: 1,
                email: "ines@example.com",
                passwordHash: "stored-hash",
                role: "VOLUNTARIO",
              }),
            },
          },
          comparePassword: async () => false,
        },
      ),
    (error) => error.code === "INVALID_CREDENTIALS",
  );
}

module.exports = {
  testAuthenticateUserRejectsInvalidCredentials,
  testAuthenticateUserReturnsUserWithValidCredentials,
};
