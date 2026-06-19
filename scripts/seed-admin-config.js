function resolveAdminSeedConfig(env = process.env) {
  const email = typeof env.ADMIN_EMAIL === "string" ? env.ADMIN_EMAIL.trim() : "";
  const password = typeof env.ADMIN_PASSWORD === "string" ? env.ADMIN_PASSWORD : "";

  const missingVariables = [];

  if (!email) {
    missingVariables.push("ADMIN_EMAIL");
  }

  if (!password) {
    missingVariables.push("ADMIN_PASSWORD");
  }

  if (missingVariables.length > 0) {
    throw new Error(
      `Faltan variables de entorno para crear el administrador: ${missingVariables.join(
        ", ",
      )}. Configuralas en .env antes de ejecutar npm run seed:admin.`,
    );
  }

  return {
    email,
    password,
  };
}

module.exports = {
  resolveAdminSeedConfig,
};
