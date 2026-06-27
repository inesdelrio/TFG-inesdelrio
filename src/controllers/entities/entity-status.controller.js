const prisma = require("../../config/prisma");

const STATUS_MESSAGES = {
  PENDIENTE: "Tu solicitud está pendiente de revisión por un administrador.",
  RECHAZADA: "Tu solicitud de entidad ha sido rechazada. Revisa los datos o contacta con la administración.",
  SUSPENDIDA: "Tu entidad está suspendida y no puede operar actualmente en VolunRed.",
  VERIFICADA: "Tu entidad está verificada y puede acceder a su cuenta.",
};

async function renderEntityStatus(req, res, next) {
  try {
    const entity = await prisma.entity.findUnique({
      where: {
        requestedByUserId: req.currentUser.id,
      },
      select: {
        organizationName: true,
        validationStatus: true,
      },
    });

    if (!entity) {
      return res.status(404).render("pages/errors/404", {
        pageTitle: "Entidad no encontrada",
      });
    }

    return res.render("pages/entities/status", {
      pageTitle: "Estado de entidad",
      entity,
      statusMessage: STATUS_MESSAGES[entity.validationStatus],
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  renderEntityStatus,
};
