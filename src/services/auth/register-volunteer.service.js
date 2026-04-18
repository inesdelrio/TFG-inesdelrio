const prisma = require("../../config/prisma");
const { hashPassword } = require("../../utils/password");

async function registerVolunteer(input, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;
  const passwordHasher = dependencies.hashPassword || hashPassword;

  const existingUser = await prismaClient.user.findUnique({
    where: {
      email: input.email,
    },
  });

  if (existingUser) {
    const error = new Error("Email already exists.");
    error.code = "EMAIL_ALREADY_EXISTS";
    throw error;
  }

  const passwordHash = await passwordHasher(input.password);

  return prismaClient.user.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone || null,
      passwordHash,
      role: "VOLUNTARIO",
    },
  });
}

module.exports = registerVolunteer;
