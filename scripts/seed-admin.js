require("dotenv").config();

const prisma = require("../src/config/prisma");
const { hashPassword } = require("../src/utils/password");
const { resolveAdminSeedConfig } = require("./seed-admin-config");

async function main() {
  const { email, password } = resolveAdminSeedConfig();

  const existingAdmin = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const passwordHash = await hashPassword(password);

  if (existingAdmin) {
    await prisma.user.update({
      where: {
        id: existingAdmin.id,
      },
      data: {
        firstName: "Admin",
        lastName: "TFG",
        phone: "600000000",
        passwordHash,
        role: "ADMIN",
      },
    });

    console.log(`Admin actualizado: ${email}`);
    return;
  }

  await prisma.user.create({
    data: {
      firstName: "Admin",
      lastName: "TFG",
      email,
      phone: "600000000",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log(`Admin creado: ${email}`);
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
