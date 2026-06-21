const crypto = require("node:crypto");

const { hashPassword } = require("../../utils/password");

function buildDeletedUserEmail(userId) {
  return `deleted-user-${userId}@volunred.local`;
}

function isDeletedUserAccount(user) {
  if (!user || !Number.isInteger(user.id) || typeof user.email !== "string") {
    return false;
  }

  return user.email === buildDeletedUserEmail(user.id);
}

async function createAnonymizedUserData(userId, dependencies = {}) {
  const passwordHasher = dependencies.hashPassword || hashPassword;
  const randomBytes = dependencies.randomBytes || crypto.randomBytes;
  const unusablePassword = randomBytes(48).toString("hex");

  return {
    firstName: "Usuario",
    lastName: "eliminado",
    email: buildDeletedUserEmail(userId),
    phone: null,
    passwordHash: await passwordHasher(unusablePassword),
  };
}

module.exports = {
  buildDeletedUserEmail,
  createAnonymizedUserData,
  isDeletedUserAccount,
};
