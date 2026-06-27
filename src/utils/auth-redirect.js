const prisma = require("../config/prisma");

function getRedirectPathForRole(role) {
  switch (role) {
    case "ADMIN":
      return "/admin/perfil";
    case "ENTIDAD":
      return "/entidad/estado";
    case "VOLUNTARIO":
    default:
      return "/voluntariado/perfil";
  }
}

async function getEntityLoginRedirectPath(user, dependencies = {}) {
  const prismaClient = dependencies.prisma || prisma;

  if (!user || user.role !== "ENTIDAD") {
    return getRedirectPathForRole(user ? user.role : undefined);
  }

  const entity = await prismaClient.entity.findUnique({
    where: {
      requestedByUserId: user.id,
    },
    select: {
      validationStatus: true,
    },
  });

  if (entity && entity.validationStatus === "VERIFICADA") {
    return "/entidad/perfil";
  }

  return "/entidad/estado";
}

module.exports = {
  getEntityLoginRedirectPath,
  getRedirectPathForRole,
};
