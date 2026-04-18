const assert = require("node:assert/strict");

const registerVolunteer = require("../../../../src/services/auth/register-volunteer.service");

async function testRegisterVolunteerCreatesVolunteerUser() {
  const createdUsers = [];
  const prismaMock = {
    user: {
      findUnique: async () => null,
      create: async ({ data }) => {
        createdUsers.push(data);
        return { id: 1, ...data };
      },
    },
  };

  const user = await registerVolunteer(
    {
      firstName: "Ines",
      lastName: "Del Rio",
      email: "ines@example.com",
      phone: "612345678",
      password: "password123",
    },
    {
      prisma: prismaMock,
      hashPassword: async (password) => `hashed:${password}`,
    },
  );

  assert.equal(user.role, "VOLUNTARIO");
  assert.equal(user.passwordHash, "hashed:password123");
  assert.equal(createdUsers[0].email, "ines@example.com");
}

module.exports = {
  testRegisterVolunteerCreatesVolunteerUser,
};
