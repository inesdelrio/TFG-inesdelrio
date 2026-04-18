require("dotenv").config();

const prisma = require("../src/config/prisma");
const { hashPassword } = require("../src/utils/password");

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL || "admin@tfg.local";
  const password = process.env.ADMIN_SEED_PASSWORD || "Admin1234!";

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
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
