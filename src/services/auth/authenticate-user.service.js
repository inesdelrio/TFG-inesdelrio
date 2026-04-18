const prisma = require("../../config/prisma");
const { comparePassword } = require("../../utils/password");

async function authenticateUser(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;
  const passwordComparer = dependencies.comparePassword || comparePassword;

  const user = await prismaClient.user.findUnique({
    where: {
      email: input.email,
    },
  });

  if (!user) {
    const error = new Error("Invalid credentials.");
    error.code = "INVALID_CREDENTIALS";
    throw error;
  }

  const isValidPassword = await passwordComparer(input.password, user.passwordHash);

  if (!isValidPassword) {
    const error = new Error("Invalid credentials.");
    error.code = "INVALID_CREDENTIALS";
    throw error;
  }

  return user;
}

module.exports = authenticateUser;
